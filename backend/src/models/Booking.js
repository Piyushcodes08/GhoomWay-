const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      index: true,
    },
    customerName: {
      type: String,
      required: [true, 'Please add a customer name'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please add a phone number'],
      index: true,
      match: [/^\d{10}$/, 'Please add a valid 10-digit phone number'],
    },
    tripCategory: {
      type: String,
      required: [true, 'Please add a trip category'],
      trim: true,
    },
    tripType: {
      type: String,
      required: [true, 'Please add a trip type'],
      trim: true,
    },
    pickupCity: {
      type: String,
      required: [true, 'Please add a pickup city'],
      trim: true,
    },
    dropCity: {
      type: String,
      trim: true,
    },
    rentalPackage: {
      type: String,
      trim: true,
    },
    pickupDate: {
      type: Date,
      required: [true, 'Please add a pickup date'],
    },
    returnDate: {
      type: Date,
    },
    pickupTime: {
      type: String,
      required: [true, 'Please add a pickup time'],
    },
    cabCategory: {
      type: String,
      required: [true, 'Please add a cab category'],
      trim: true,
    },
    passengers: {
      type: String,
      required: [true, 'Please add number of passengers'],
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'Accepted', 'Rejected', 'Completed', 'Cancelled'],
        message: '{VALUE} is not a valid booking status',
      },
      default: 'Pending',
      index: true,
    },
    adminRemark: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate a human-readable booking ID before first save
bookingSchema.pre('save', async function () {
  if (!this.bookingId) {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    this.bookingId = `GW-${randomNum}`;
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
