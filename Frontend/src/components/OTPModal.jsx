import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OTPModal = ({ open, email, onClose }) => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");

    const verifyHandler = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/verify-email`, {
                email,
                otp,
            });
            navigate("/dashboard");
        } catch (err) {
            alert(err?.response?.data?.message || "OTP verification failed");
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-center mb-4">Verify Email</h2>
                <p className="text-sm text-gray-600 text-center mb-4">
                    Enter the 6-digit OTP sent to <strong>{email}</strong>
                </p>
                <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full border rounded-md p-2 focus:ring-2 focus:ring-orange-500 mb-4 text-center tracking-widest"
                />
                <button
                    onClick={verifyHandler}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition-colors"
                >
                    Verify
                </button>
                <button
                    onClick={onClose}
                    className="w-full mt-2 text-sm text-gray-500 hover:underline"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default OTPModal;