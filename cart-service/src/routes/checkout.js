const express = require('express');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');
const { checkoutSchema, couponSchema } = require('../validators/checkoutSchema');

const router = express.Router();

/**
 * POST /validate-coupon
 * Validates a coupon code and returns the discount percentage.
 */
router.post('/validate-coupon', (req, res) => {
  const { error, value } = couponSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ valid: false, error: error.details[0].message });
  }

  const discount = config.COUPONS[value.code];
  if (discount) {
    return res.json({ valid: true, discount, code: value.code });
  }

  return res.json({ valid: false, error: 'Invalid coupon code' });
});

/**
 * POST /checkout
 * Validates the cart, fetches real prices from Product Service,
 * applies coupon, and returns order confirmation.
 *
 * Failure Audit F7: Product Service call wrapped in try/catch → 503 on failure.
 */
router.post('/checkout', async (req, res, next) => {
  // Validate payload
  const { error, value } = checkoutSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: 'Validation Error',
      details: error.details.map((d) => d.message),
    });
  }

  const { items, coupon } = value;

  // Fetch real prices from Product Service (F7: try/catch)
  let products;
  try {
    const response = await fetch(
      `${config.PRODUCT_SERVICE_URL}/products?limit=100`
    );
    if (!response.ok) {
      throw new Error(`Product Service returned ${response.status}`);
    }
    const data = await response.json();
    products = data.products;
  } catch (err) {
    console.error(`[ERROR] Cannot reach Product Service: ${err.message}`);
    return res.status(503).json({
      error: 'Unable to verify prices. Please try again.',
    });
  }

  // Calculate totals using server-side prices (prevents client-side tampering)
  let subtotal = 0;
  const orderItems = [];

  for (const item of items) {
    const product = products.find((p) => p.id === item.id);
    if (!product) {
      return res.status(400).json({ error: `Product ID ${item.id} not found` });
    }
    const lineTotal = product.price * item.qty;
    subtotal += lineTotal;
    orderItems.push({
      id: product.id,
      name: product.name,
      qty: item.qty,
      unitPrice: product.price,
      lineTotal,
    });
  }

  // Apply coupon discount
  let discount = 0;
  if (coupon && config.COUPONS[coupon]) {
    discount = Math.round(subtotal * (config.COUPONS[coupon] / 100));
  }

  // Calculate final total
  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax - discount;

  console.log(
    `[ORDER] ${new Date().toISOString()} Order placed: ${orderItems.length} items, total ₹${total}`
  );

  res.json({
    orderId: uuidv4(),
    status: 'confirmed',
    items: orderItems,
    subtotal,
    shipping,
    tax,
    discount,
    total,
    couponApplied: coupon && config.COUPONS[coupon] ? coupon : null,
  });
});

module.exports = router;
