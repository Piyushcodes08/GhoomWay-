const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { 
    type: String, 
    unique: true,
    index: true
  },
  tripCategory: { 
    type: String, 
    required: [true, 'Please add a trip category'] 
  },
  tripType: { 
    type: String, 
    required: [true, 'Please add a trip type'] 
  },
  pickupCity: { 
    type: String, 
    required: [true, 'Please add a pickup city'] 
  },
  dropCity: { type: String },
  rentalPackage: { type: String },
  pickupDate: { 
    type: Date, 
    required: [true, 'Please add a pickup date'] 
  },
  returnDate: { type: Date },
  pickupTime: { 
    type: String, 
    required: [true, 'Please add a pickup time'] 
  },
  cabCategory: { 
    type: String, 
    required: [true, 'Please add a cab category'] 
  },
  passengers: { 
    type: String, 
    required: [true, 'Please add number of passengers'] 
  },
  customerName: { 
    type: String, 
    required: [true, 'Please add customer name'] 
  },
  phoneNumber: { 
    type: String, 
    required: [true, 'Please add a phone number'],
    index: true,
    match: [/^\d{10}$/, 'Please add a 10-digit phone number']
  },
  status: { 
    type: String, 
    enum: ['Pending', 'In-Review', 'Accepted', 'Rejected', 'Completed'], 
    default: 'Pending' 
  }
}, { timestamps: true });

// Auto-generate booking ID
bookingSchema.pre('save', async function() {
  if (!this.bookingId) {
    const prefix = 'GW';
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    this.bookingId = `${prefix}-${randomNum}`;
  }
});


module.exports = mongoose.model('Booking', bookingSchema);

