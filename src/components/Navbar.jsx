import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser, setUser } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';

axios.defaults.withCredentials = true;

const Navbar = () => {
  const url = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const getUser = async () => {

      const res = await axios.get(`${url}api/auth/user`);
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        dispatch(loginUser());
      }

    }

    getUser()
  }, [isAuth]);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${url}api/auth/logout`);
      if (res.data.success) {
        dispatch(logoutUser());
        toast.success("Logout Successful.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-dark d-flex align-items-center justify-content-center gap-3 p-3">
      <Link to={'/'}>Home</Link>
      {isAuth && user && user.role === 'admin' && <Link to={'/dashboard'}>Dashboard</Link>}
      {isAuth ? (
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <>
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
