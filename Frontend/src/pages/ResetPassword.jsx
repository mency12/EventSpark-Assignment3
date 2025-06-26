import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/auth.css';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const [form, setForm] = useState({
        email: searchParams.get('email') || '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (form.newPassword !== form.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (form.newPassword.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        setIsLoading(true);
        
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/reset-password`, {
                email: form.email,
                otp: form.otp,
                newPassword: form.newPassword
            });
            alert('Password reset successful! You can now sign in with your new password.');
        } catch (err) {
            alert(err?.response?.data?.message || 'Failed to reset password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Reset Password</h2>
                <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
                    Enter the OTP sent to your email and your new password.
                </p>
                <form onSubmit={handleSubmit}>
                    <input className="auth-input" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <input className="auth-input" type="text" name="otp" placeholder="OTP (6 digits)" value={form.otp} onChange={handleChange} maxLength="6" required />
                    <input className="auth-input" type="password" name="newPassword" placeholder="New Password" value={form.newPassword} onChange={handleChange} required />
                    <input className="auth-input" type="password" name="confirmPassword" placeholder="Confirm New Password" value={form.confirmPassword} onChange={handleChange} required />
                    <button className="auth-btn" type="submit" disabled={isLoading}>
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
                <p className="auth-text-center" style={{ marginTop: '1rem' }}>
                    <Link className="auth-link" to="/login">Back to Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword; 