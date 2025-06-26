import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        
        try {

            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, { email });
            setMessage('Password reset instructions have been sent to your email.');
        } catch (err) {
            setMessage(err?.response?.data?.message || 'Failed to send reset instructions. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
            
                <h2>Forgot Password</h2>
                <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
                    Enter your email address and we'll send you instructions to reset your password.
                </p>
                <form onSubmit={handleSubmit}>
                    <input 
                        className="auth-input" 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    {message && (
                        <div style={{ 
                            padding: '0.5rem', 
                            marginBottom: '1rem', 
                            borderRadius: '0.375rem',
                            backgroundColor: message.includes('sent') ? '#d4edda' : '#f8d7da',
                            color: message.includes('sent') ? '#155724' : '#721c24',
                            fontSize: '0.9rem'
                        }}>
                            {message}
                        </div>
                    )}
                    <button className="auth-btn" type="submit" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                    </button>
                </form>
                <p className="auth-text-center" style={{ marginTop: '1rem' }}>
                    Remember your password? <Link className="auth-link" to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword; 