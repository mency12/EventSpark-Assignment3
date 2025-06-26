import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import '../styles/auth.css';

const ForgotPassword = () => {
    const [email, setEmail]   = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate            = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/forgot-password`,
                { email }
            );
            navigate(`/reset-password?email=${encodeURIComponent(email)}`);
        } catch (err) {
            alert(err?.response?.data?.message ||
                'Failed to send reset instructions');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            {isLoading && <Loader />}
            <div className="auth-card">
                <h2>Forgot Password</h2>

                <p style={{ textAlign:'center', marginBottom:'1.5rem',
                    color:'#666', fontSize:'0.9rem' }}>
                    Enter your email address and we'll send you an OTP
                    to reset your password.
                </p>

                <form onSubmit={handleSubmit}>
                    <input className="auth-input" type="email"
                           placeholder="Email"
                           value={email}
                           onChange={(e)=>setEmail(e.target.value)}
                           required />

                    <button className="auth-btn" type="submit" disabled={isLoading}>
                        {isLoading ? 'Sending…' : 'Verify Email'}
                    </button>
                </form>

                <p className="auth-text-center" style={{ marginTop:'1rem' }}>
                    Remember your password? <Link className="auth-link" to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
