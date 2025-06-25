import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OTPModal from '../components/OTPModal';
import '../styles/auth.css';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
    });
    const [otpOpen, setOtpOpen] = useState(false);

    const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const submitHandler = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
                name: form.name,
                email: form.email,
                password: form.password,
                phoneNumber: form.phoneNumber,
                role: 'user',
            });
            setOtpOpen(true);
        } catch (err) {
            alert(err?.response?.data?.message || 'Sign-up failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Sign up</h2>
                <form onSubmit={submitHandler}>
                    <input className="auth-input" type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                    <input className="auth-input" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <input className="auth-input" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                    <input className="auth-input" type="password" name="confirmPassword" placeholder="Retype Password" value={form.confirmPassword} onChange={handleChange} required />
                    <input className="auth-input" type="tel" name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} required />
                    <button className="auth-btn" type="submit">Sign up</button>
                </form>
                <p className="auth-text-center" style={{ marginTop: '1rem' }}>
                    Already have an account? <Link className="auth-link" to="/login">Sign in</Link>
                </p>
            </div>
            <OTPModal open={otpOpen} email={form.email} onClose={() => setOtpOpen(false)} />
        </div>
    );
};

export default Register;