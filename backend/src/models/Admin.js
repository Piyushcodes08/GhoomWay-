const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    role: {
      type: String,
      enum: ['admin', 'super-admin'],
      default: 'admin',
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false, // 🔒 hidden by default
    },
  },
  {
    timestamps: true,
  }
);

// 🔐 HASH PASSWORD (FIXED - NO NEXT IN ASYNC HOOK)
adminSchema.pre('save', async function () {
  // ❗ IMPORTANT: stop if password not modified
  if (!this.isModified('password')) {
    return;
  }

  // hash password
  this.password = await bcrypt.hash(this.password, 10);
});

// 🔑 MATCH PASSWORD
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);