import { Outlet } from 'react-router-dom'
import './App.css'
import Header from '#components/Header/Header.tsx'
import { useAuth } from './utils/auth';

export default function App () {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      {isLoggedIn && <Header />}
      <Outlet />
    </div>
  );
}
