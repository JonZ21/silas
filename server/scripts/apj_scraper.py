import requests
from bs4 import BeautifulSoup
import time
from openai import OpenAI
import os
from dotenv import load_dotenv
from bible_interface import add_episode, collection
import numpy as np


load_dotenv()

base_url = "https://www.desiringgod.org"
episodes_url = f"{base_url}/ask-pastor-john"
headers = {"User-Agent": "Mozilla/5.0"}

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
prev_episode = 0


def get_vector(verse, question=""):

    response = client.embeddings.create(
        input=f"{verse} {question}",
        model="text-embedding-3-small",
    )

    return response.data[0].embedding


def cosine_similarity(v1, v2):
    # Normalize the vectors to unit vectors
    v1_u = v1 / np.linalg.norm(v1)
    v2_u = v2 / np.linalg.norm(v2)

    # Compute cosine similarity
    return np.dot(v1_u, v2_u)


def get_top_10(vector):

    results = collection.aggregate(
        [
            {
                "$vectorSearch": {
                    "index": "vector_index",
                    "path": "embeddings",
                    "queryVector": vector,
                    "numCandidates": 100,
                    "limit": 10,
                }
            }
        ]
    )

    response = []

    for result in results:
        similarity = cosine_similarity(vector, result["embeddings"])
        response.append({**result["metadata"], "similarity": similarity})

    return response


def get_soup(url):
    try:
        print(f"Requesting URL: {url}")
        response = requests.get(
            url, headers=headers, timeout=30
        )  # Added timeout of 30 seconds
        print("Response received")
        return BeautifulSoup(response.content, "html.parser")
    except requests.Timeout:
        print("Request timed out")
        return None
    except Exception as e:
        print(f"Error fetching URL: {url}. Error: {e}")
        return None


def scrape_episode_data(episode_url, episode_title):
    print(f"Scraping data for {episode_title}")
    try:
        soup = get_soup(episode_url)
        if soup is None:
            print(f"Failed to get content for URL: {episode_url}")
            return

        episode = soup.find("div", class_="episode-number").text.strip()
        episode_number = episode.split(" ")[1].strip()
        date = soup.find("time").text.strip()
        text = soup.find("div", class_="resource__body").text.strip()

        print(f"Episode: {episode_number}, Date: {date}")

        if episode_number == "Episode":
            if int(prev_episode) >= 630:
                print(f"Skipped special episode {prev_episode}")
                return
            episode_number = "0"
        elif int(episode_number) >= 630:
            prev_episode = episode_number
            print(f"Skipped episode {episode_number}")
            return

        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a Christian Bible Reading assistant. Given the title the audio transcript of a podcast episode, write a concise summary of the episode. Include all the verses referenced in the episode.",
                },
                {"role": "user", "content": f"{text}"},
            ],
        )

        response = client.embeddings.create(
            input=completion.choices[0].message.content,
            model="text-embedding-3-small",
        )

        metadata = {
            "title": episode_title,
            "url": episode_url,
            "date": date,
            "episode_number": episode_number,
        }

        embedding = {"embeddings": response.data[0].embedding, "metadata": metadata}
        if embedding:
            add_episode(embedding)
            print(f"Added episode {episode_number}")
    except Exception as e:
        print(e)
        print(f"Error processing episode: {episode_url}")


def scrape_all_episodes():
    all_episodes = []
    soup = get_soup(episodes_url)
    if soup is None:
        return all_episodes

    while True:
        episode_links = soup.select(".tile-title")
        for link in episode_links:
            href = link.a.get("href")
            episode_url = base_url + href
            title = link.a.text.strip()
            scrape_episode_data(episode_url, title)

        next_button = soup.find("a", {"id": "load_more_link"})
        if next_button:
            next_button_url = base_url + next_button["href"]
            soup = get_soup(next_button_url)
            time.sleep(2)  # Add a delay to avoid hitting the server too frequently
        else:
            break
    return all_episodes


# episodes_data = scrape_all_episodes()
# print("Scraping complete")

topten = get_top_10(get_vector("John 3:16"))

print("top 10 results:" + str(topten))
