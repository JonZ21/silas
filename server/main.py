import os
from dotenv import load_dotenv
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import re
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


load_dotenv()

uri = os.getenv("MONGO_URI")

client = MongoClient(uri, server_api=ServerApi("1"))

# Get the ESV API key from the environment variables
esv_api_key = os.getenv("ESV_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],  # Update with your React app's URL during development
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/get_esv/{book}/{chapter}")
async def get_esv(book: str, chapter: str):
    url = "https://api.esv.org/v3/passage/text/"
    params = {
        "q": f"{book} {chapter}",
        "include-passage-references": False,
        "include-footnotes": False,
    }
    headers = {"Authorization": f"Token {esv_api_key}"}
    response = requests.get(url, params=params, headers=headers)
    pattern = re.compile(r"\]\s*([^][]+)(?=\s*\[|$)")

    if response.status_code == 200:
        response = response.json()
        # Find all matches and store them in a list
        verses = pattern.findall(response["passages"][0])
        return {"data": verses}
    else:
        raise HTTPException(
            status_code=response.status_code, detail="Failed to retrieve ESV passage"
        )
