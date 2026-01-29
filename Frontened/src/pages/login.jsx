import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { post } from '../../Services/ApiEndPoint';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [value, setValue] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setValue((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    const request = await post('/Auth/login', value);
    const response = request.data;
    
    if (response?.message) {
      toast.success(response.message);
      navigate('/');
    }

   console.log("object",response);

   } catch (error) {
    if (error.response) {
      toast.error(error.response.data.error);
    }
    console.log('Login error:', error);
   }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome back</h1>
        <p className="subtitle">Sign in to continue to your notes</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="input"
              name="email"
              type="text"
              placeholder="Email"
              value={value.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              className="input"
              name="password"
              type="password"
              placeholder="Password"
              value={value.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <button className="button" type="submit">Sign in</button>
          </div>
          <div className="form-foot">
            <a href="#!">Forgot password?</a>
          </div>

        <div className="form-foot">Don't have an account? <Link to="/SignUp" style={{color: '#2563eb', textDecoration: 'none', fontWeight: 600}}>Sign up</Link></div>
        </form>
      </div>
    </div>
  );
};

export default Login;