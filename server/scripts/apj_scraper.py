import requests
from bs4 import BeautifulSoup
import time
from openai import OpenAI
import os
from dotenv import load_dotenv
import sys

sys.path.append("server")


from bible.bible_interface import add_episode, add_episodes_bulk


load_dotenv()

base_url = "https://www.desiringgod.org"
episodes_url = f"{base_url}/ask-pastor-john"
headers = {"User-Agent": "Mozilla/5.0"}

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
prev_episode = 0


def get_soup(url):
    try:
        response = requests.get(url, headers=headers, timeout=30)
        return BeautifulSoup(response.content, "html.parser")
    except requests.Timeout:
        print("Request timed out")
        return None
    except Exception as e:
        print(f"Error fetching URL: {url}. Error: {e}")
        return None


def scrape_episode_data(episode_url, episode_title):
    try:
        soup = get_soup(episode_url)
        if soup is None:
            print(f"Failed to get content for URL: {episode_url}")
            return None

        episode = soup.find("div", class_="episode-number").text.strip()
        episode_number = episode.split(" ")[1].strip()
        date = soup.find("time").text.strip()
        text = soup.find("div", class_="resource__body").text.strip()

        is_special_episode = False
        if episode_number == "Episode":
            is_special_episode = True
            episode_number = "0"

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

        data = {
            "embeddings": response.data[0].embedding,
            "title": episode_title,
            "url": episode_url,
            "date": date,
            "episode_number": int(episode_number),
            "special_episode": is_special_episode,
            "type": "podcast",
            "author": "John Piper",
        }
        return data
    except Exception as e:
        print(e)
        print(f"Error processing episode: {episode_url}")
        return None


def scrape_all_episodes():
    all_episodes = []
    soup = get_soup(episodes_url)
    if soup is None:
        return all_episodes

    count = 0  # Counter to track episodes
    while True:
        episode_links = soup.select(".tile-title")
        for link in episode_links:
            href = link.a.get("href")
            episode_url = base_url + href
            title = link.a.text.strip()
            episode_data = scrape_episode_data(episode_url, title)
            if episode_data:
                print(f"Scraped episode: {episode_data['episode_number']}")
                all_episodes.append(episode_data)
                count += 1
                if count % 20 == 0:  # Update MongoDB every 20 episodes
                    update_mongo_with_episodes(all_episodes)
                    all_episodes = []  # Reset episodes list
                    print(f"Updated MongoDB with {count} episodes")

        next_button = soup.find("a", {"id": "load_more_link"})
        if next_button:
            next_button_url = base_url + next_button["href"]
            soup = get_soup(next_button_url)
            time.sleep(2)
        else:
            break

    return all_episodes


def update_mongo_with_episodes(episodes):
    if episodes:
        add_episodes_bulk(episodes)
        print("Bulk update to MongoDB completed")


# Assuming bible_interface.add_episodes_bulk(episodes) is a function to bulk add episodes to MongoDB
# You need to implement this function or use a suitable method provided by your MongoDB client.

# Scrape all episodes
all_episodes_data = scrape_all_episodes()

# Update MongoDB with remaining episodes (if any)
update_mongo_with_episodes(all_episodes_data)
