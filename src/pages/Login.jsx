import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../provider/AuthProvider";



function Login() {

    const history = useNavigate()
    const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async(e)=>{
    e.preventDefault()
    setError('');

    try {
        const response = await axios.post('http://localhost:3000/login',{
            username,password
        });
        localStorage.setItem('token', response.data.token);
        console.log('Login successful:', response.data.token);

        login({
            id: response.data.user.user,
            username: response.data.user.username,
        });
        history('/products')
    } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
    }
  }

  


  return (
    <>
      <div className="relative flex justify-center items-center h-96 w-96 rounded-xl border-2 border-gray-500">
        <div className="flex flex-col justify-center items-center h-56 w-80">
          <h1 className="absolute top-14 left-32 text-blue-500 text-2xl">
            Login page
          </h1>
          <form onSubmit={handleLogin}>
          <div className="h-14 w-72">
            <input 
            type="text" 
            placeholder="username..." 
            className="input"
            value={username}
             onChange={(e) => setUsername(e.target.value)}
             required
              />
          </div>
          <div className="h-14 w-72">
            <input 
            type="password" 
            placeholder="password"
             className="input"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
             />
          </div>
          <div className="flex justify-center items-center h-14 w-72">
            <button className="btn btn-success">Login</button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
