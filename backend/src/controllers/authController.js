const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Authenticate admin & get token
// @route   POST /api/v1/auth/login
// @access  Public
exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return next(new ErrorResponse('Please provide email and password', 400));
    }

    // 2️⃣ Find admin (include password explicitly)
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // 3️⃣ Compare password
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // 4️⃣ Send token
    sendTokenResponse(admin, 200, res);

  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in admin
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id);

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (admin, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
};
