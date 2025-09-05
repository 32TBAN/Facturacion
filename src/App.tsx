import { Outlet } from 'react-router-dom'
import './App.css'
import Header from '#components/Header/Header.tsx'


function App() {
  return (
    <div className="App">
      <Header/>
      <Outlet />
    </div>
  )
}

export default App
