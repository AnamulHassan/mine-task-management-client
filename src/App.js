import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Routes';

function App() {
  return (
    <section className="overflow-x-hidden">
      <RouterProvider router={router}></RouterProvider>
    </section>
  );
}

export default App;
