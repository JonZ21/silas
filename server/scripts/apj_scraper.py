import requests
from bs4 import BeautifulSoup
import time

base_url = "https://www.desiringgod.org"
episodes_url = f"{base_url}/ask-pastor-john"
headers = {
    "User-Agent": "Mozilla/5.0"
}  # Add a User-Agent header to mimic a real browser


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

    print(date)
    print(episode_number)
    print(text)
    print(episode_title)


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
            print(episode_url)
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
