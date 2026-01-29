import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { post } from '../../Services/ApiEndPoint';
import toast from 'react-hot-toast';

const Signup = () => {
  const [value, setValue] = useState({ username: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  
  const handleChange = (e) => {
    setValue((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await post('/Auth/register', value);
      const res = request.data;
      console.log('Signup response:', res);
      if (res?.message) toast.success(res.message);
      setMsg(res?.message || 'Account created');  
    } catch (error) {
      console.error('Signup error:', error?.response || error);
      const serverMsg = error?.response?.data?.error || error?.response?.data?.message || error.message;
      setMsg(serverMsg || 'Signup failed');
      toast.error(serverMsg || 'Signup failed');
    }
    

  }
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Create an account</h1>
        <p className="subtitle">Sign up to get started!</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input className="input" name="username" type="text" placeholder="Username" value={value.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input className="input" name="email" type="email" placeholder="Email" value={value.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input className="input" name="password" type="password" placeholder="Password" value={value.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <button className="button" type="submit">Sign up</button>
          </div>
        </form>
        {msg && <p className="form-foot">{msg}</p>}
        <div className="form-foot">Already have an account? <Link to="/login" style={{color: '#2563eb', textDecoration: 'none', fontWeight: 600}}>Log in</Link></div>
      </div>
    </div>
  )
}



export default Signup