from dotenv import load_dotenv
from openai import OpenAI
import os
import numpy as np

load_dotenv()


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


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


def get_top_10(vector, collection):

    results = collection.aggregate(
        [
            {
                "$vectorSearch": {
                    "index": "vector_index_source",
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
        print(result)
        response.append(
            {
                "title": result.get("title"),
                "date": result.get("date"),
                "url": result.get("url"),
                "author": result["author"],
                "similarity": similarity,
            }
        )

    return response
