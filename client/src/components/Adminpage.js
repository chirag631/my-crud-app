import React, { useState, useEffect } from 'react';
import { useHistory,Redirect } from 'react-router-dom'
import classes from './Adminpage.module.css';
import Layout from './layout/Layout';
import Card from './UI/Card.js';

const Adminpage = () => {
    





    // let token = '';
    // token = localStorage.getItem('token');

    // const history = useHistory();
    
    
    // const submitHandler = async(e) => {
    //     e.preventDefault();
       
    //     try {
    //         const res =await fetch('/login', {
    //             method: 'POST',
    //             headers: {
    //                 "content-type":"application/json"
    //             },
    //             body:JSON.stringify({email,password})
    //         })
    //         const data = await res.json();
            
    //         if (res.status === 400) {
    //             throw new Error(data.error)
    //         }
    //         console.log(data)
    //         token = localStorage.setItem("token", data.token);
    //         localStorage.setItem("userEmail", email);
    //         alert("User Login Successfully!!")
    //         handleReset()
    //         history.push('/homepage')
    //     } catch (e)
    //     {
    //         alert(e)
    //     }
    // }
    
    // if (token) {
    //     return <Redirect to="/homepage" />
    // }
    return (
        <Layout >
            <div className={classes.card} >
                <tabel className={classes.table}>
                    <tr>
                        <th>Id</th>
                        <th>Employee Name</th>
                        <th>Email</th>
                        <th >
                            Edit
                        </th>
                        <th >
                            Delete
                        </th>
                        
                    </tr>
                    <tr>
                        <td>Id</td>
                        <td>Employee Name</td>
                        <td>Email</td>
                        <td className={classes.editbtn}>
                            <button>Edit</button>
                        </td>
                        <td className={classes.delbtn}>
                            <button>Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Id</td>
                        <td>Employee Name</td>
                        <td>Email</td>
                        <td className={classes.editbtn}>
                            <button>Edit</button>
                        </td>
                        <td className={classes.delbtn}>
                            <button>Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Id</td>
                        <td>Employee Name</td>
                        <td>Email</td>
                        <td className={classes.editbtn}>
                            <button>Edit</button>
                        </td>
                        <td className={classes.delbtn}>
                            <button>Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Id</td>
                        <td>Employee Name</td>
                        <td>Email</td>
                        <td className={classes.editbtn}>
                            <button>Edit</button>
                        </td>
                        <td className={classes.delbtn}>
                            <button>Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Id</td>
                        <td>Employee Name</td>
                        <td>Email</td>
                        <td className={classes.editbtn}>
                            <button>Edit</button>
                        </td>
                        <td className={classes.delbtn}>
                            <button>Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Id</td>
                        <td>Employee Name</td>
                        <td>Email</td>
                        <td className={classes.editbtn}>
                            <button>Edit</button>
                        </td>
                        <td className={classes.delbtn}>
                            <button>Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Id</td>
                        <td>Employee Name</td>
                        <td>Email</td>
                        <td className={classes.editbtn}>
                            <button>Edit</button>
                        </td>
                        <td className={classes.delbtn}>
                            <button>Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Id</td>
                        <td>Employee Name</td>
                        <td>Email</td>
                        <td className={classes.editbtn}>
                            <button>Edit</button>
                        </td>
                        <td className={classes.delbtn}>
                            <button>Delete</button>
                        </td>
                    </tr>
            </tabel>
        </div>
        </Layout>
   ) 
}
export default Adminpage;