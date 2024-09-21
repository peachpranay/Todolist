import asyncio
from database import create_a_todo  # Adjust the import if needed, depending on your directory structure.

# Create a todo item
todo_item = {"title": "Test Todo", "description": "This is a test item"}

# Insert the todo item using the create_a_todo function
asyncio.run(create_a_todo(todo_item))
print("Todo item inserted successfully!")
