'use client';
import { CiSquarePlus } from "react-icons/ci";
import { Modal } from "./Modal";
import { useState } from "react";

export const AddTask = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description }),
            });
            if (response.ok) {
                console.log("Task created successfully");
                setModalOpen(false);
                setTitle("");
                setDescription("");
            } else {
                console.error("Failed to create task");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
                Add Task <CiSquarePlus className="ml-2" size={18} />
            </button>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmit}>
                    <div className="modal-action flex flex-col space-y-4 p-4">
                        <div className="flex flex-col">
                            <h4 className="font-bold text-lg">Title</h4>
                            <input
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Type here"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h4 className="font-bold text-lg">Description</h4>
                            <input
                                type='text'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Type here"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}