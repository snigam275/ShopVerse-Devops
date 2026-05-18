FROM nginx:1.25-alpine

# Remove default nginx site
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static frontend files
COPY index.html products.html product-detail.html cart.html style.css script.js /usr/share/nginx/html/

EXPOSE 3000
