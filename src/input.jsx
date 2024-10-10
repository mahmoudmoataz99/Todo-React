import React, { useState } from 'react';

function Input({ addNewTask }) {
  const [task, setTask] = useState("");
  const [error, setError] = useState(null);
  
  const submitTask = (e) => {
    e.preventDefault();

    if (task.trim().length != 0 && task.trim().length <= 100) {
      addNewTask(task);
      setTask("");
      setError(null);
    }else if (task.trim().length >= 100){
      setError('maximum length exceeded');
      setTimeout(() => setError(null), 1000);
      return;
    } else {
      setError("A task can't be empty");
      setTimeout(() => setError(null), 1000);
    }
  };

  return (
    <section className='mb-8'>
      <form className='flex gap-10 justify-center mb-10' onSubmit={submitTask}>
        <input value={task} type='text' onChange={(e) => setTask(e.target.value)}
          className='w-1/4 p-4 border-2 rounded-md border-sky-600 outline-none'
          placeholder='enter new task...' />
        <button className='cursor-pointer p-2 rounded-md text-white bg-sky-400 hover:bg-sky-500'>
          Add Task
        </button>
      </form>
      <h1 className={error != null && 'text-xl font-semibold text-white bg-red-500 inline rounded-xl p-3'}>{error}</h1>
    </section>
  );
}

export default Input;
