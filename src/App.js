import React, {useState} from 'react'
import './styles/App.css'
import {BrowserRouter} from 'react-router-dom'
import Navbar from './components/UI/Navbar/Navbar.jsx'
import AppRouter from './components/AppRouter.jsx'
import { AuthContext } from './context'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
