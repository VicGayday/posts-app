import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../button/MyButton'
import {AuthContext} from '../../../context'

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext)

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }
  return (
    <div className="navbar">
      <MyButton onClick={logout}>Log out</MyButton>
      <div className="navbar__links">
        <Link className="navbar__links">About</Link>
        <Link className="navbar__links" to="/posts">
          Posts
        </Link>
      </div>
    </div>
  );
}

export default Navbar