from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

#app object

app = FastAPI()
from model import Todo
from model import TodoUpdate
from database import (
    fetch_one_todo,
    fetch_all_todo,
    create_a_todo,
    update_a_todo,
    remove_todo
)
origins = [ 'http://localhost:3000/']

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],

)


@app.get('/')   
def read_root():
    return {"ping": " pong"}


@app.get("/api/todo")
async def get_todo():
    response = await fetch_all_todo()
    return response

@app.get("/api/todo{title}", response_model=Todo)
async def get_todo_by_id(title):
    reponse = await fetch_one_todo(title)
    if reponse:
        return reponse
    
    raise HTTPException(404,f"Cannot find todo item with this title: {title}")
    

@app.post("/api/todo", response_model=Todo)
async def post_todo(todo: Todo):
    # Convert the Pydantic model to a dictionary
    todo_dict = todo.dict()
    response = await create_a_todo(todo_dict)
    if response:
        return response
    raise HTTPException(400, "Something went wrong")
    

@app.put("/api/todo/{title}", response_model=Todo)
async def put_todo(title: str, todo_update: TodoUpdate):
    response = await update_a_todo(title, todo_update.description)
    if response:
        return response
    raise HTTPException(status_code=404, detail="Can't find the title")


@app.delete("/api/todo{title}")
async def delete_todo(title):
    response = await remove_todo(title)
    if response:
        return "success"
    raise HTTPException(404,"cant find the title")

