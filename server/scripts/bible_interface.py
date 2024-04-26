from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os

load_dotenv()

uri = os.getenv("MONGO_URI")
client = MongoClient(uri)

db = client["silas"]
collection = db["apj"]


def add_episode(data):
    collection.insert_one(data)
