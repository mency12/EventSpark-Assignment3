const express = require("express");
const { body, validationResult } = require("express-validator");
const authService = require("../services/authService");
const auth = require("../middleware/auth");

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }
  next();
};

// Sign up route
router.post(
  "/signup",
  [
    body("name")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("phoneNumber")
      .matches(/^\+?[\d\s-()]+$/)
      .withMessage("Please provide a valid phone number"),
    body("role")
      .isIn(["user", "admin", "organizer"])
      .withMessage("Role must be user, admin, or organizer"),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const { name, email, password, phoneNumber, role } = req.body;

      const result = await authService.registerUser({
        name,
        email,
        password,
        phoneNumber,
        role,
      });

      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Sign in route
router.post(
  "/signin",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await authService.loginUser(email, password);

      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Forgot password route
router.post(
  "/forgot-password",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email"),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const { email } = req.body;

      const result = await authService.forgotPassword(email);

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Reset password route
router.post(
  "/reset-password",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email"),
    body("otp")
      .isLength({ min: 6, max: 6 })
      .isNumeric()
      .withMessage("OTP must be 6 digits"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long"),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;

      const result = await authService.resetPassword(email, otp, newPassword);

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Verify OTP route
router.post(
  "/verify-otp",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email"),
    body("otp")
      .isLength({ min: 6, max: 6 })
      .isNumeric()
      .withMessage("OTP must be 6 digits"),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const { email, otp } = req.body;
      const result = await authService.verifyOTP(email, otp);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Verify email OTP route
router.post(
  "/verify-email",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email"),
    body("otp")
      .isLength({ min: 6, max: 6 })
      .isNumeric()
      .withMessage("OTP must be 6 digits"),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const { email, otp } = req.body;
      const result = await authService.verifyEmailOTP(email, otp);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Get user profile route (protected)
router.get("/profile", auth, async (req, res) => {
  try {
    const result = await authService.getUserProfile(req.user._id);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
