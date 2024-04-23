# import requests
# from bs4 import BeautifulSoup

# # URL of the website to scrape
# url = "https://www.biblestudytools.com/commentaries/matthew-henry-complete/genesis/1.html"

# # Send a GET request to the URL
# response = requests.get(url)

# # Parse the HTML content of the page using Beautiful Soup
# soup = BeautifulSoup(response.text, "html.parser")

# print(soup.prettify())

# # Find all the commentary entries
# commentaries = soup.find_all("div", class_="commentary-entry")

# # Loop through each commentary entry and extract the desired information
# for commentary in commentaries:
#     book_and_chapter = commentary.find("h4").text.strip()
#     subheadings = len(commentary.find_all("h5"))
#     entire_commentary = commentary.find("div", class_="commentary-text").text.strip()

#     # Print or store the extracted information as needed
#     print("Book and Chapter:", book_and_chapter)
#     print("Number of Subheadings:", subheadings)
#     print("Entire Commentary:", entire_commentary)
#     print("-----------------------")
