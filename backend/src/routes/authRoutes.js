const express = require('express');
const { z } = require('zod');
const { loginAdmin, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');

const router = express.Router();

// Validation Schema for Login
const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

router.post('/login', validate(loginSchema), loginAdmin);
router.get('/me', protect, getMe);

module.exports = router;
