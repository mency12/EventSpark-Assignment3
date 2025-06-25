const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const {
  generateOTP,
  sendOTPEmail,
  sendWelcomeEmail,
} = require("./emailService");

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register new user
const registerUser = async (userData) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Generate OTP for email verification
    const otp = generateOTP();
    const verificationToken = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");
    const verificationExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Create new user
    const user = new User({
      ...userData,
      isEmailVerified: false,
      resetPasswordToken: verificationToken,
      resetPasswordExpires: verificationExpires,
    });
    await user.save();

    // Send OTP email for verification
    await sendOTPEmail(user.email, otp, "verify");
    // Optionally, send welcome email after verification
    // await sendWelcomeEmail(user.email, user.name);

    // Generate token
    const token = generateToken(user._id);

    return {
      success: true,
      message:
        "User registered successfully. Please verify your email with the OTP sent.",
      data: {
        user: user.toJSON(),
        token,
      },
    };
  } catch (error) {
    throw error;
  }
};

// Login user
const loginUser = async (email, password) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate token
    const token = generateToken(user._id);

    return {
      success: true,
      message: "Login successful",
      data: {
        user: user.toJSON(),
        token,
      },
    };
  } catch (error) {
    throw error;
  }
};

// Forgot password - send OTP
const forgotPassword = async (email) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User with this email does not exist");
    }

    // Generate OTP
    const otp = generateOTP();

    // Hash OTP and store in user document
    const resetToken = crypto.createHash("sha256").update(otp).digest("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send OTP email
    const emailSent = await sendOTPEmail(email, otp, "reset");
    if (!emailSent) {
      throw new Error("Failed to send OTP email");
    }

    return {
      success: true,
      message: "OTP sent to your email successfully",
    };
  } catch (error) {
    throw error;
  }
};

// Reset password with OTP
const resetPassword = async (email, otp, newPassword) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User with this email does not exist");
    }

    // Check if reset token exists and is not expired
    if (!user.resetPasswordToken || !user.resetPasswordExpires) {
      throw new Error("No password reset request found");
    }

    if (Date.now() > user.resetPasswordExpires) {
      throw new Error("OTP has expired. Please request a new one");
    }

    // Verify OTP
    const resetToken = crypto.createHash("sha256").update(otp).digest("hex");
    if (user.resetPasswordToken !== resetToken) {
      throw new Error("Invalid OTP");
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return {
      success: true,
      message: "Password reset successfully",
    };
  } catch (error) {
    throw error;
  }
};

// Get user profile
const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      success: true,
      data: {
        user: user.toJSON(),
      },
    };
  } catch (error) {
    throw error;
  }
};

// Verify OTP
const verifyOTP = async (email, otp) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User with this email does not exist");
    }

    // Check if reset token exists and is not expired
    if (!user.resetPasswordToken || !user.resetPasswordExpires) {
      throw new Error("No password reset request found");
    }

    if (Date.now() > user.resetPasswordExpires) {
      throw new Error("OTP has expired. Please request a new one");
    }

    // Verify OTP
    const resetToken = crypto.createHash("sha256").update(otp).digest("hex");
    if (user.resetPasswordToken !== resetToken) {
      throw new Error("Invalid OTP");
    }

    return {
      success: true,
      message: "OTP is valid",
    };
  } catch (error) {
    throw error;
  }
};

// Verify email OTP
const verifyEmailOTP = async (email, otp) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User with this email does not exist");
    }
    if (!user.resetPasswordToken || !user.resetPasswordExpires) {
      throw new Error("No verification request found");
    }
    if (Date.now() > user.resetPasswordExpires) {
      throw new Error("OTP has expired. Please request a new one");
    }
    const crypto = require("crypto");
    const verificationToken = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");
    if (user.resetPasswordToken !== verificationToken) {
      throw new Error("Invalid OTP");
    }
    user.isEmailVerified = true;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return {
      success: true,
      message: "Email verified successfully",
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  verifyOTP,
  verifyEmailOTP,
};
