const express = require('express');
const cors = require('cors');
const config = require('./config');
const checkoutRouter = require('./routes/checkout');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ── Middleware ──
app.use(cors());
app.use(express.json());

// ── Health Check ──
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'cart-service' });
});

// ── Prometheus Metrics (Unit V: Monitoring) ──
let requestCount = 0;
let checkoutCount = 0;
app.use((req, res, next) => { requestCount++; next(); });
app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send([
    `# HELP http_requests_total Total HTTP requests`,
    `# TYPE http_requests_total counter`,
    `http_requests_total ${requestCount}`,
    `# HELP checkout_total Total checkout orders processed`,
    `# TYPE checkout_total counter`,
    `checkout_total ${checkoutCount}`,
    `# HELP up Service health (1=up, 0=down)`,
    `# TYPE up gauge`,
    `up 1`,
  ].join('\n') + '\n');
});

// ── Routes ──
app.use('/', checkoutRouter);

// ── Error Handler (must be last) ──
app.use(errorHandler);

// ── Start Server ──
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.PORT, () => {
    console.log(`[CART-SERVICE] ${new Date().toISOString()} Running on port ${config.PORT}`);
  });
}

module.exports = app; // Export for testing with supertest
