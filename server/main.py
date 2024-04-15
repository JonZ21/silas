import os
from dotenv import load_dotenv
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env file
load_dotenv()

# Get the ESV API key from the environment variables
esv_api_key = os.getenv("ESV_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update with your React app's URL during development
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/get_esv/{book}/{chapter}")
async def get_esv(book: str, chapter: int):
    url = "https://api.esv.org/v3/passage/text/"
    params = {
        "q": f"{book} {chapter}",
        "include-passage-references": "false",
        "include-verse-numbers": "false",
        "include-footnotes": "false",
        "include-footnote-body": "false",
        "include-headings": "false",
        "include-subheadings": "false",
        "include-surrounding-chapters": "false",
        "include-word-ids": "false",
        "include-chapter-numbers": "false",
        "include-verse-ids": "true",
        "include-section-headings": "false",
        "include-short-copyright": "false"
    }
    headers = {
        "Authorization": f"Token {esv_api_key}"
    }
    response = requests.get(url, params=params, headers=headers)
    if response.status_code == 200:
        return response.json()  # Return the JSON response from the ESV API
    else:
        raise HTTPException(status_code=response.status_code, detail="Failed to retrieve ESV passage")

@app.get("/")
async def root():
    return {"message": "Hello World"}