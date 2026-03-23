const { z } = require('zod');

const createBookingSchema = z.object({
  body: z.object({
    tripCategory: z.string(),
    tripType: z.string(),
    pickupCity: z.string(),
    dropCity: z.string().optional(),
    rentalPackage: z.string().optional(),
    pickupDate: z.string(),
    returnDate: z.string().optional(),
    pickupTime: z.string(),
    cabCategory: z.string(),
    passengers: z.string(),
    customerName: z.string(),
    phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  }),
});

const updateStatusSchema = z.object({
  body: z.object({
    status: z.enum(['Pending', 'In-Review', 'Accepted', 'Rejected', 'Completed']),
  }),
  params: z.object({
    id: z.string(),
  }),
});

module.exports = {
  createBookingSchema,
  updateStatusSchema,
};
