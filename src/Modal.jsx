import React, { useState, useEffect } from 'react';
import { formatDate } from './dateFormat';

function Modal(props) {
    const [editedTask, setEditedTask] = useState({});

    useEffect(() => {
        if (props.taskToEdit) {
            setEditedTask(props.taskToEdit);
        }
    }, [props.taskToEdit]);

    const submitEdit = (e) => {
        e.preventDefault();
        const updatedTask = { ...editedTask, time: formatDate(new Date()) };
        props.editTask(updatedTask);
    };

    return (
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg px-6 pt-6 max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
                <form className='flex flex-col gap-10 justify-center mb-10'>
                    <input
                        value={editedTask.details} className='p-4 border-2 rounded-md border-sky-600 outline-none'
                        type='text' placeholder='Enter new task...' onChange={(e) => setEditedTask({ ...editedTask, details: e.target.value })}
                    />
                    <div className='flex justify-end gap-3'>
                        <button onClick={submitEdit} className='cursor-pointer p-2 rounded-md bg-orange-300 hover:bg-orange-500 hover:text-white'>
                            Edit Task
                        </button>
                        <button onClick={props.closeModal} className='cursor-pointer p-2 rounded-md bg-teal-200 hover:text-white hover:bg-teal-400'>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Modal;
