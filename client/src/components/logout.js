import { Redirect } from 'react-router-dom';
const Logout = () => {
    localStorage.removeItem('token');
    return <h1>logout</h1>
}

export default Logout;