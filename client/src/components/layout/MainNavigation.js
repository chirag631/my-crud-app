import { useEffect, useState } from 'react';
import { NavLink ,Link, Redirect,useHistory} from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const history = useHistory();
  var token = localStorage.getItem('token');
  const logoutHandler = async() => {

    try {
      const res = await fetch('/logout/me', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization':`Bearer ${token}`
        }
      })
      const data = await res.json();
      if (res.status===500) {
        throw new Error(data.error);
      }
      alert('Logout successfully.')
      localStorage.removeItem('token')
      localStorage.removeItem('userEmail')
      token = null
      
      history.push('/login');
    } catch(e) {   
      alert(e);
    }
  }
  const homeHandler = () => {
    
  }
  
    if (token == null) {
      <Redirect to='/login' />
    }
 
  
  return (
    <header className={classes.header}>
      <div className={classes.logo}><img  src="/img/mainlogo.jpg" /></div>
      <nav className={classes.nav}>
        <ul>
        <li>
            
            {/* <button onClick={logoutHandler} className={classes.button}> */}
              <NavLink  to='/admin' activeClassName={classes.active}>Adminpage
              </NavLink>
            {/* </button> */}
            
          </li>
          {!token && (<li>
            
            {/* <button onClick={logoutHandler} className={classes.button}> */}
              <NavLink  to='/login' activeClassName={classes.active}>Login
              </NavLink>
            {/* </button> */}
            
          </li>)}
          {!token && (<li>
            {/* <button onClick={logoutHandler} className={classes.button}> */}
            <NavLink to='/register' activeClassName={classes.active}>
              Register
            </NavLink>
            {/* </button> */}
          </li>)}
          {token && (<li>
            {/* <button onClick={homeHandler} className={classes.button}> */}
              <NavLink to='/homepage' onClick={homeHandler} activeClassName={classes.active}> Home</NavLink> 
              {/* </button> */}
          </li>)}
          {token && (<li>
            {/* <button onClick={homeHandler} className={classes.button}> */}
              <NavLink to='/updateprofile' activeClassName={classes.active}> Update Profile</NavLink> 
              {/* </button> */}
          </li>)}
          {token && (<li>
            {/* <button onClick={logoutHandler} className={classes.button}> */}
              <NavLink to='/login' onClick={logoutHandler} activeClassName={classes.active}> Logout</NavLink> 
              {/* </button> */}
          </li>)}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;