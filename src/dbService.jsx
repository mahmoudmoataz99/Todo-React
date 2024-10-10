import React, { useEffect, useState } from 'react';
import Task from './task';
import Input from './input';
import Modal from './Modal';

const DataFetcher = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [taskIndex, setTaskIndex] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            try {
                const storedData = localStorage.getItem('tasks');
                const parsedData = storedData ? JSON.parse(storedData) : [];
                setData(parsedData.sort((a, b) => new Date(b.time) - new Date(a.time)));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const addTask = (task) => {
        const newTask = { id: Date.now(), details: task, time: new Date().toLocaleString() };
        const updatedData = [...data, newTask].sort((a, b) => new Date(b.time) - new Date(a.time));
        setData(updatedData);
        localStorage.setItem('tasks', JSON.stringify(updatedData));
    };

    const modalOpenFunc = (index) => {
        setOpenModal(true);
        setTaskIndex(index);
    };

    const closeModal = () => setOpenModal(false);

    const editTask = (updatedTask) => {
        const newData = [...data];
        newData[taskIndex] = updatedTask;
        setData(newData.sort((a, b) => new Date(b.time) - new Date(a.time)));
        localStorage.setItem('tasks', JSON.stringify(newData));
        setOpenModal(false);
        setTaskIndex(null);
    };

    const deleteTask = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData.sort((a, b) => new Date(b.time) - new Date(a.time)));
        localStorage.setItem('tasks', JSON.stringify(newData));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Input addNewTask={addTask} />
            <article className='mx-auto w-3/4'>
            {data.length === 0 ? (
                <h1 className='text-6xl text-red-400 font-extrabold'>No tasks are added,<br /> please add new tasks</h1>
            ) : (
                data.map((task, index) => (
                    <Task key={task.id} details={task.details} time={task.time}
                        deleteTask={() => deleteTask(index)} openModal={() => modalOpenFunc(index)} />
                ))
            )}
            </article>
            {openModal && <Modal closeModal={()=>closeModal} editTask={editTask} taskToEdit={data[taskIndex]} />}
        </>
    );
};

export default DataFetcher;
