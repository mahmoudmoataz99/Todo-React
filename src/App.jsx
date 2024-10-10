import DataFetcher from './dbService';

function App() {
  return (
    <main className='text-center py-8'>
      <h1 className='text-3xl text-white p-4 font-bold mb-8'>Todo List</h1>
      <article className='mt-8'>
        <DataFetcher/>
      </article>
    </main>
  )
}

export default App