const request = require('supertest');
const app = require('../src/index');

// Mock fetch globally for Product Service calls
const mockProducts = [
  { id: 1, name: 'Test Headphones', price: 4999, originalPrice: 7999 },
  { id: 2, name: 'Test Watch', price: 3499, originalPrice: 5999 },
];

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ products: mockProducts, total: 2, limit: 50, offset: 0 }),
    })
  );
});

afterAll(() => {
  delete global.fetch;
});

describe('POST /validate-coupon', () => {
  test('valid coupon returns discount', async () => {
    const res = await request(app)
      .post('/validate-coupon')
      .send({ code: 'SAVE10' });

    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(true);
    expect(res.body.discount).toBe(10);
  });

  test('invalid coupon returns valid: false', async () => {
    const res = await request(app)
      .post('/validate-coupon')
      .send({ code: 'FAKECODE' });

    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(false);
  });
});

describe('POST /checkout', () => {
  test('valid checkout returns order confirmation', async () => {
    const res = await request(app)
      .post('/checkout')
      .send({ items: [{ id: 1, qty: 2 }] });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('confirmed');
    expect(res.body.orderId).toBeDefined();
    expect(res.body.subtotal).toBe(9998); // 4999 * 2
    expect(res.body.items).toHaveLength(1);
  });

  test('checkout with coupon applies discount', async () => {
    const res = await request(app)
      .post('/checkout')
      .send({ items: [{ id: 1, qty: 1 }], coupon: 'SAVE10' });

    expect(res.status).toBe(200);
    expect(res.body.couponApplied).toBe('SAVE10');
    expect(res.body.discount).toBeGreaterThan(0);
  });

  test('empty items array returns 400', async () => {
    const res = await request(app)
      .post('/checkout')
      .send({ items: [] });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Validation Error');
  });

  test('missing items field returns 400', async () => {
    const res = await request(app)
      .post('/checkout')
      .send({});

    expect(res.status).toBe(400);
  });

  test('non-existent product ID returns 400', async () => {
    const res = await request(app)
      .post('/checkout')
      .send({ items: [{ id: 999, qty: 1 }] });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('999');
  });
});

describe('GET /health', () => {
  test('returns ok status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
