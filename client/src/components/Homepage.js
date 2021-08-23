import { Redirect, Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import classes from './Homepage.module.css';
import Card from './UI/Card.js';
import Layout from './layout/Layout';
const Homepage = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    
    let token=localStorage.getItem('token')
    let userEmail = localStorage.getItem('userEmail');
    const fetchData = async () => {
        try{
            const res = await fetch(`/getUsers/me`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            
        const data = await res.json();
        console.log(data)
        setName(data.name);
            
        }catch(e){
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            alert(e);
            history.push('/login');
        }
           
    }
    useEffect(() => {
        fetchData();
    },[])    
    if (token === null) {
        return <Redirect to="/login" />
    }
    
    return (
        <Layout>
            
            <Card>
                <div className={classes.typography}>
                    <h1>Welcome { name}</h1>
                </div>
            </Card>
           
        </Layout>
    );
}
export default Homepage;