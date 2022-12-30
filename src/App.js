import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Routes';
import { useEffect, useState } from 'react';
import LoaderPrimary from './components/LoaderPrimary';

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setInitialLoading(false), 1500);
  }, []);
  if (initialLoading) {
    return (
      <section className="relative pb-12 text-[#e0d4e8] w-screen flex items-center justify-center h-screen">
        <LoaderPrimary></LoaderPrimary>
        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#33085b] -z-40  "></div>
        <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 h-3/4 rounded-full w-3/4 bg-[#6b1d5c] -z-30  blur-[300px] "></div>
      </section>
    );
  }
  return (
    <section className="overflow-x-hidden">
      <RouterProvider router={router}></RouterProvider>
    </section>
  );
}

export default App;
