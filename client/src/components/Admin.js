import Layout from './layout/Layout';
import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles  } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Redirect,useHistory} from 'react-router-dom';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3498db',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  container:{
    maxHeight:400,
    width:900
  },
  
  edit_button:{
    borderRadius: '5px',
    border:'1px solid #3498db',
    padding:'0.3rem 1.5rem',
    fontSize: '1.25rem',
    color:'#fff',
    backgroundColor: '#3498db',
    '&:hover': {
      background: "#1f74ac",
    } 
  },
  
  del_button:{
    borderRadius: '5px',
    border:'1px solid #3498db',
    padding:'0.3rem 1.5rem',
    fontSize: '1.25rem',
    color:'#fff',
    backgroundColor: '#e74c3c',
    '&:hover': {
      background: "#c72918",
    } 
  }
});


export default function Admin() {
  const history=useHistory();
  const classes = useStyles();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadUsers = async () => {
      setLoading(true)
    const res= await fetch("/admingetdata");
    const body=await res.json();
    console.log(body)
    
          setData(body);
          setLoading(false);
  };  
    useEffect(() => {

    loadUsers();
  }, []);
    
  const handleClickEdit=(email)=>{
      console.log(email)
        history.push(`/editEmployee/${email}`);

      
  }
  const handleClickDelete=async(email)=>{
    console.log(email)
    try{
     const res=await fetch(`/deletebyadmin/${email}`,{
       method:'DELETE'
     })
     const data=await res.json();
     console.log(data)
     if(res.status===400){
       throw new Error(data.error);
     }

     alert("successfully");
     loadUsers();

    }catch(e){
       alert(e)
     }
  }

  
  return (
    <Layout>
        {loading && <p text-align="center">loading...</p>}
    <TableContainer className={classes.container} component={Paper}>
      <Table stickyHeader  aria-label="simple table">
        <TableHead className={classes.header}>
          <StyledTableRow>
            <StyledTableCell >Id</StyledTableCell>
            <StyledTableCell  align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        
        {!loading &&<TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row._id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right" >{row.email}</StyledTableCell>
              <StyledTableCell hover align="right"><button className={classes.edit_button} onClick={()=>handleClickEdit(row.email)}>Edit</button></StyledTableCell>
              <StyledTableCell align="right"><button className={classes.del_button} onClick={()=> handleClickDelete(row.email)}>Delete</button></StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>}
      </Table>
    </TableContainer>
            
    </Layout>
  );
}