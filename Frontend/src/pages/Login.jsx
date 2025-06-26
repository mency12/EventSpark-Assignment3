import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signin`, form);
            navigate('/dashboard');
        } catch (err) {
            alert(err?.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Sign in</h2>
                <form onSubmit={submitHandler}>
                    <input className="auth-input" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <input className="auth-input" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                    <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                        <Link className="auth-link" to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <button className="auth-btn" type="submit">Sign in</button>
                </form>
                <p className="auth-text-center" style={{ marginTop: '1rem' }}>
                    Don't have an account? <Link className="auth-link" to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;