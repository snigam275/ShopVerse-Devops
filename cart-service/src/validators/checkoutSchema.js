const Joi = require('joi');

/**
 * Joi validation schema for checkout payloads.
 * Ensures items array is non-empty and each item has valid id + qty.
 */
const checkoutSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().positive().required(),
        qty: Joi.number().integer().min(1).max(10).required(),
      })
    )
    .min(1)
    .required()
    .messages({ 'array.min': 'Cart cannot be empty' }),

  coupon: Joi.string().trim().uppercase().optional().allow(''),
});

/**
 * Joi validation schema for coupon validation.
 */
const couponSchema = Joi.object({
  code: Joi.string().trim().uppercase().required(),
});

module.exports = { checkoutSchema, couponSchema };
