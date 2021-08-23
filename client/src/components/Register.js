import React, { useState, useEffect } from 'react';
import classes from './Form.module.css';
import Card from './UI/Card.js';
import {useHistory} from 'react-router-dom' 
import Layout from './layout/Layout';
const Register = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');

    const nameHandler = (e) => {
        setName(e.target.value)
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }
    const cpasswordHandler = (e) => {
        setCpassword(e.target.value)
    }
    const handleReset = () => {
        setName('');
        setEmail('');
        setPassword('');
        setCpassword('');
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        if (password !== cpassword) {
            return alert("Password must be same!!")
        }
        try {
            const res =await fetch('/register', {
                method: 'POST',
                headers: {
                    "content-type":"application/json"
                },
                body:JSON.stringify({name,email,password})
            })
            // if (!res.ok) {
            //     throw new Error("Error")
            // }
            const data = await res.json();
            if (res.status === 400) {
                throw new Error(data.error)
            }
            
            alert("User Registation Successfully!!")
            handleReset()
            
            history.push('/login')
        } catch (e)
        {
                alert(e)
        }
    }
    
    return (
        <Layout >
        <Card>
            <form onSubmit={submitHandler}>
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
          <div className={classes.control}>
            <label htmlFor='cpassword'>Confirm Password</label>
                    <input
                        required
                        type='password'
                        id='cpassword'
                        value={cpassword}
                        onChange={cpasswordHandler}
                        minLength='7'
                    />
          </div>
          <div className={classes.actions}>
            <button  className='btn'>Register</button>
          </div>
        </form>
        </Card>
        </Layout>
   ) 
}
export default Register;