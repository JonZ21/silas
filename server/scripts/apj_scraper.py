import requests
from bs4 import BeautifulSoup
import time
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()


base_url = "https://www.desiringgod.org"
episodes_url = f"{base_url}/ask-pastor-john"
headers = {"User-Agent": "Mozilla/5.0"}

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def get_soup(url):
    response = requests.get(url, headers=headers)
    # The User-Agent header is used to identify the browser making the request. Some websites block requests that don't have a User-Agent header, so adding one can help avoid this issue.
    return BeautifulSoup(response.content, "html.parser")


def scrape_episode_data(episode_url, episode_title):
    soup = get_soup(episode_url)
    episode = soup.find("div", class_="episode-number").text.strip()
    episode_number = episode.split(" ")[1].strip()
    date = soup.find("time").text.strip()
    text = soup.find("div", class_="resource__body").text.strip()

    # print(date)
    # print(episode_number)
    # print(text)
    # print(episode_title)

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

    print("Content: " + completion.choices[0].message.content)


def scrape_all_episodes():
    all_episodes = []
    soup = get_soup(episodes_url)
    while True:
        # Extract episode URLs and scrape each episode
        episode_links = soup.select(".tile-title")
        for link in episode_links:
            href = link.a.get("href")
            episode_url = base_url + href
            title = link.a.text.strip()
            episode_data = scrape_episode_data(episode_url, title)
            all_episodes.append(episode_url)
        # Check if there's a "more episodes" button and click it
        next_button = soup.find("a", {"id": "load_more_link"})
        if next_button:
            next_button_url = base_url + next_button["href"]
            soup = get_soup(next_button_url)
            time.sleep(2)  # Add a delay to avoid hitting the server too frequently
        else:
            break
    return all_episodes


episodes_data = scrape_all_episodes()
# print("size: " + str(len(episodes_data)))
# scrape_episode_data("https://www.desiringgod.org/interviews/am-i-confident-or-arrogant")

# Process episodes_data as needed (e.g., save to a file)


# stream = client.chat.completions.create(
#     model="gpt-3.5-turbo",
#     messages=[{"role": "user", "content": "Say this is a test"}],
#     stream=True,
# )
# for chunk in stream:
#     if chunk.choices[0].delta.content is not None:
#         print(chunk.choices[0].delta.content, end="")
