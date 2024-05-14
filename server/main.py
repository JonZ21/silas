import os
from dotenv import load_dotenv
import requests
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import re
import sys

sys.path.append("../utils/")
sys.path.append("../bible/")
from utils import vector_utils
from bible import bible_interface


load_dotenv()

esv_api_key = os.getenv("ESV_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://silas-two.vercel.app/",
    ],
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
        print(verses)
        return {"data": verses}
    else:
        raise HTTPException(
            status_code=response.status_code, detail="Failed to retrieve ESV passage"
        )


@app.get("/related-resources/")
async def get_apj(verse: str = Query(None), question: str = Query(default="")):
    vector = vector_utils.get_vector(verse, question)
    response = vector_utils.get_top_10(vector, bible_interface.collection)
    return {"data": response}
