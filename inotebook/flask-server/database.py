from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database 

MONGO_URI = "dbStr"

DATABASE_NAME = "test"

class DatabaseColletion :
    def __init__(self) -> None:
        self.client = MongoClient(MONGO_URI)
        self.db = self.client[DATABASE_NAME]

    def get_collection(self,colletion_name : str) -> Collection :
        return self.db[colletion_name]

db_connection = DatabaseColletion()