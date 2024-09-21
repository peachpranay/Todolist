from model import Todo

#MongoDB driver
# from pymongo import MongoClient
import motor.motor_asyncio

# client = MongoClient("mongodb://localhost:27017")
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')  #for connection between mongo db and the file 
#27017 default host for mongodb

database = client.ToDolist
collection = database.Todo


async def fetch_one_todo(title):
    document = await collection.find_one({"title":title})
    return document

async def fetch_all_todo():
    todos=[]
    cursor = collection.find()
    async for document in cursor:
        todos.append(Todo(**document))
    return todos
async def create_a_todo(todo):
    # Ensure todo is a dictionary before insertion
    result = await collection.insert_one(todo)
    
    # Retrieve and return the inserted document with its generated _id
    inserted_todo = await collection.find_one({"_id": result.inserted_id})
    
    # Ensure all required fields are included in the response
    return Todo(**inserted_todo)
async def update_a_todo(title, desc):
    await collection.update_one({"title":title},{"$set":{
        "description":desc
    }})
    document = await collection.find_one({"title":title})
    return document
async def remove_todo(title):
    await collection.delete_one({"title":title})
    return True