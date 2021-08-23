import { Redirect, Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import classes from './Form.module.css';
import Card from './UI/Card.js';
import Layout from './layout/Layout';
const UpdateProfile = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [oldpassword, setOldpassword] = useState('');
    let token = localStorage.getItem('token');
    let userEmail = localStorage.getItem('userEmail');
    const fetchData = async () => {
        try {
            const res = await fetch(`/getUsers/me`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.json();
            console.log(data)
            if (res.status === 400) {
                localStorage.removeItem('token');
                localStorage.removeItem('userEmail')
                throw new Error(data.error);
            }
            setName(data.name);
            setEmail(data.email);
            setPassword(data.password);
            setOldpassword(data.password);
        }
    catch (e) {
        alert(e)
        history.push('/login');
    }
    }
    useEffect(() => {

        fetchData();
    
    },[])    
    if (token === null) {
        return <Redirect to="/login" />
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        let body;
        if (password === oldpassword) {
            body = JSON.stringify({ name, email })
        }
        else {
            body=JSON.stringify({ name, email,password })
        }
        
        const setData = async () => {
            try {  
                const res = await fetch(`/updateUser/me`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization':`Bearer ${token}`
                    },
                    body
                })
            const data = await res.json();
                console.log(data)
                if (res.status === 400) {
                    throw new Error(data.error)
                }
                localStorage.setItem('userEmail', email)
                
                alert("User updated successfully")
            } catch (e)
            {
                alert(e)
            }
        }
        
        setData().then(() => {
            fetchData();
            setPassword('')
        }).catch(e => {
            alert(e)
        })
    }
    const handleDelete = (e) => {
        e.preventDefault();
        
        const setData = async () => {
            try {
                const res = await fetch(`/deleteUser/me`, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization':`Bearer ${token}`
                    }, 
                })
            const data = await res.json();
                console.log(data)
                
                if (res.status === 500) {
                    throw new Error("failed to delete user!")
                }
                localStorage.removeItem('userEmail')
                localStorage.removeItem('token')
                
                alert("User deleted successfully")
                history.push('/login')
            } catch (e)
            {
                alert(e)
            }
        }
        
        setData()
    }
    
    const nameHandler = (e) => {
        setName(e.target.value)
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }
   
    return (
        <Layout>
            
        <Card>
        <form >
        <div className={classes.control}>
            <label htmlFor='name'>Name</label>
            <input 
                type='text'
                id='name'
                value={name}
                onChange={nameHandler}
                required        
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
                    <input
                        required
                        type='email'
                        id='email'
                        value={email}
                        onChange={emailHandler}
                    />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
                    <input
                        required
                        type='password'
                        id='password'
                        value={password}
                        onChange={passwordHandler}
                        minLength="7"
                    />
          </div>
          
          <div className={classes.actions}>
            <button onClick={handleUpdate} className='btn'>Update Details</button>
          </div>
          
          <div className={classes.actions_delete  }>
            <button onClick={handleDelete} className='btn' >Delate Account</button>
          </div>
        </form>
      </Card>
           
        </Layout>
    );
}
export default UpdateProfile;