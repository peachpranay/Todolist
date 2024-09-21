from pydantic import BaseModel

class  Todo(BaseModel):
    title: str
    description: str 

class TodoUpdate(BaseModel):
    description: str