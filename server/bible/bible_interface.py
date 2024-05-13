from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os


load_dotenv()

uri = os.getenv("MONGO_URI")
client = MongoClient(uri)

db = client["silas"]
collection = db["source"]


from pymongo.errors import ConnectionFailure

try:
    # The ismaster command is cheap and does not require auth.
    client.admin.command("ismaster")
    print("MongoDB is connected")
except ConnectionFailure:
    print("Server not available")


def add_episode(data):
    collection.insert_one(data)


def spread_metadata():
    result = collection.update_many(
        {},
        [
            {
                "$set": {
                    "type": "podcast",
                    "author": "John Piper",
                    "title": "$metadata.title",
                    "url": "$metadata.url",
                    "date": "$metadata.date",
                    "episode": "$metadata.episode",
                }
            },
            {"$unset": "metadata"},
        ],
    )
    return result.modified_count


def add_episodes_bulk(episodes):
    """
    Bulk insert episodes into MongoDB collection.

    Args:
    - episodes (list): List of episode data dictionaries.
      Each dictionary should have keys corresponding to MongoDB document fields.
    """
    try:
        if episodes:
            result = collection.insert_many(episodes)
            print(f"Inserted {len(result.inserted_ids)} episodes")
        else:
            print("No episodes to insert")
    except Exception as e:
        print(f"Error inserting episodes: {e}")


def duplicate_collection(original_collection, new_collection_name):
    """
    Duplicate a MongoDB collection using aggregation.

    Args:
    - original_collection (str): Name of the original collection.
    - new_collection_name (str): Name for the duplicated collection.
    """
    pipeline = [
        {"$match": {}},  # Match all documents in the original collection
        {"$out": new_collection_name},  # Create a new collection with the same data
    ]
    db[original_collection].aggregate(pipeline)
