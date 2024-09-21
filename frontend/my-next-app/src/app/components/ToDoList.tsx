'use client';
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { Modal } from './Modal';

export const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/todo');
                if (!response.ok) throw new Error('Failed to fetch todos');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setTodos(data);
                } else {
                    console.error('Fetched data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    const handleEditClick = (todo) => {
        setCurrentTodo(todo);
        setIsEditing(true);
        setModalOpen(true);
    };

    const handleDeleteClick = (todo) => {
        setCurrentTodo(todo);
        setIsEditing(false);
        setModalOpen(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!currentTodo || !currentTodo.title || !currentTodo.description) return;
            const encodedTitle = encodeURIComponent(currentTodo.title);
            const response = await fetch(`http://127.0.0.1:8000/api/todo/${encodedTitle}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ description: currentTodo.description }),
            });
            if (response.ok) {
                console.log("Task updated successfully");
                setModalOpen(false);
                const updatedTodos = await response.json();
                if (Array.isArray(updatedTodos)) {
                    setTodos(updatedTodos);
                }
            } else {
                console.error("Failed to update task");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            if (!currentTodo || !currentTodo.title) return;
            const encodedTitle = encodeURIComponent(currentTodo.title);
            const response = await fetch(`http://127.0.0.1:8000/api/todo/${encodedTitle}`, {
                method: "DELETE",
            });
            if (response.ok) {
                console.log("Task deleted successfully");
                setModalOpen(false);
                // Remove the deleted todo from the state
                setTodos(todos.filter(todo => todo.title !== currentTodo.title));
            } else {
                console.error("Failed to delete task");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table-fixed w-full">
                    <thead>
                        <tr>
                            <th className="w-1/3">TITLE</th>
                            <th className="w-1/3 px-4 py-2">DESCRIPTION</th>
                            <th className="w-1/12 px-1 py-2"></th>
                            <th className="w-1/12 px-1 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(todos) && todos.map((todo, index) => (
                            <tr key={index}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>
                                    <button className="btn" onClick={() => handleEditClick(todo)}>
                                        <FaRegEdit />
                                    </button>
                                </td>
                                <td>
                                    <button className='btn' onClick={() => handleDeleteClick(todo)}>
                                        <RiDeleteBin5Line />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalOpen && currentTodo && (
                <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                    {isEditing ? (
                        // Edit Form
                        <div className="p-4">
                            <h4 className="font-bold text-lg">Edit Task</h4>
                            <form onSubmit={handleUpdateSubmit}>
                                <div className="flex flex-col space-y-4">
                                    <div className="flex flex-col">
                                        <label className="font-bold">Title</label>
                                        <input
                                            type='text'
                                            value={currentTodo.title}
                                            onChange={(e) => setCurrentTodo({ ...currentTodo, title: e.target.value })}
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-bold">Description</label>
                                        <input
                                            type='text'
                                            value={currentTodo.description}
                                            onChange={(e) => setCurrentTodo({ ...currentTodo, description: e.target.value })}
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        
                        <div className="p-4">
                            <h4 className="font-bold text-lg">Delete Task</h4>
                            <p>Are you sure you want to delete the task titled "{currentTodo.title}"?</p>
                            <div className="flex justify-end">

                            <button onClick={handleDeleteConfirm} className="btn btn-danger">Confirm Delete</button>
                            </div>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    )
}