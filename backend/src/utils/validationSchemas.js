const { z } = require('zod');

const createBookingSchema = z.object({
  body: z.object({
    customerName: z.string().min(2, 'Customer name must be at least 2 characters'),
    phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    tripCategory: z.string().min(1, 'Trip category is required'),
    tripType: z.string().min(1, 'Trip type is required'),
    pickupCity: z.string().min(1, 'Pickup city is required'),
    dropCity: z.string().optional(),
    rentalPackage: z.string().optional(),
    pickupDate: z.string().min(1, 'Pickup date is required'),
    returnDate: z.string().optional(),
    pickupTime: z.string().min(1, 'Pickup time is required'),
    cabCategory: z.string().min(1, 'Cab category is required'),
    passengers: z.string().min(1, 'Passengers count is required'),
  }),
});

const updateStatusSchema = z.object({
  body: z.object({
    status: z.enum(
      ['Pending', 'Accepted', 'Rejected', 'Completed', 'Cancelled'],
      { errorMap: () => ({ message: 'Invalid status value' }) }
    ),
    adminRemark: z.string().max(500, 'Admin remark cannot exceed 500 characters').optional(),
  }),
  params: z.object({
    id: z.string().min(1, 'Booking ID is required'),
  }),
});

module.exports = {
  createBookingSchema,
  updateStatusSchema,
};
