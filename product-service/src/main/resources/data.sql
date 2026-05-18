-- ShopVerse Product Seed Data
-- Idempotent: ON CONFLICT (id) DO NOTHING prevents duplicates on restart (Failure Audit F6)

INSERT INTO products (id, name, category, price, original_price, rating, reviews, image, images, description, highlights, badge, brand, material, weight, warranty)
VALUES
(1, 'Wireless Noise-Cancelling Headphones', 'electronics', 4999, 7999, 4.8, 342,
 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
 '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop","https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop","https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop"]',
 'Experience pure audio bliss with our premium wireless headphones featuring active noise cancellation, 30-hour battery life, and ultra-comfortable memory foam ear cushions.',
 '["Active Noise Cancellation","30-hour battery life","Bluetooth 5.2","Memory foam cushions","Foldable design"]',
 'Best Seller', 'SoundMax', 'Premium Plastic & Metal', '250g', '2 Years')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, category, price, original_price, rating, reviews, image, images, description, highlights, badge, brand, material, weight, warranty)
VALUES
(2, 'Smart Fitness Watch Pro', 'electronics', 3499, 5999, 4.6, 218,
 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
 '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop","https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=500&h=500&fit=crop"]',
 'Stay on top of your fitness goals with heart rate monitoring, GPS tracking, sleep analysis, and 7-day battery life. Water-resistant up to 50 meters.',
 '["Heart rate monitoring","Built-in GPS","Sleep tracking","7-day battery","50m water resistance"]',
 'New', 'FitTech', 'Aluminum & Silicone', '45g', '1 Year')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, category, price, original_price, rating, reviews, image, images, description, highlights, badge, brand, material, weight, warranty)
VALUES
(3, 'Classic Leather Jacket', 'fashion', 6999, 9999, 4.7, 156,
 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
 '["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop","https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500&h=500&fit=crop"]',
 'Crafted from genuine leather with a modern slim fit. Features a quilted lining, multiple pockets, and premium YKK zippers.',
 '["Genuine leather","Quilted lining","Slim fit","YKK zippers","Multiple pockets"]',
 'Trending', 'UrbanEdge', 'Genuine Leather', '1.2kg', '6 Months')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, category, price, original_price, rating, reviews, image, images, description, highlights, badge, brand, material, weight, warranty)
VALUES
(4, 'Premium Sunglasses UV400', 'accessories', 1999, 3499, 4.5, 89,
 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
 '["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop","https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop"]',
 'Polarized lenses with UV400 protection. Lightweight titanium frame with anti-scratch coating. Comes with a premium hard case.',
 '["UV400 protection","Polarized lenses","Titanium frame","Anti-scratch coating","Hard case included"]',
 'Sale', 'VisionPro', 'Titanium & Polycarbonate', '28g', '1 Year')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, category, price, original_price, rating, reviews, image, images, description, highlights, badge, brand, material, weight, warranty)
VALUES
(5, 'Minimalist Desk Lamp', 'home', 2499, 3999, 4.4, 123,
 'https://images.unsplash.com/photo-1534105615256-13940a56ff44?w=500&h=500&fit=crop',
 '["https://images.unsplash.com/photo-1534105615256-13940a56ff44?w=500&h=500&fit=crop","https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=500&h=500&fit=crop"]',
 'Scandinavian-inspired LED desk lamp with touch dimming, 3 color temperatures, and a USB charging port. Perfect for your workspace.',
 '["Touch dimming","3 color temperatures","USB charging port","LED technology","Energy efficient"]',
 '', 'LumiHome', 'Aluminum & Wood', '680g', '2 Years')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, category, price, original_price, rating, reviews, image, images, description, highlights, badge, brand, material, weight, warranty)
VALUES
(6, 'Portable Bluetooth Speaker', 'electronics', 2999, 4499, 4.6, 275,
 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop',
 '["https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop","https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=500&h=500&fit=crop"]',
 '360° immersive sound with deep bass. IPX7 waterproof rating, 20-hour playtime, and built-in microphone for hands-free calls.',
 '["360° sound","IPX7 waterproof","20-hour battery","Built-in mic","Dual pairing"]',
 'Hot', 'BassWave', 'Rubberized Plastic', '520g', '1 Year')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, category, price, original_price, rating, reviews, image, images, description, highlights, badge, brand, material, weight, warranty)
VALUES
(7, 'Casual Cotton Sneakers', 'fashion', 2499, 3999, 4.3, 198,
 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop',
 '["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop","https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop"]',
 'Breathable canvas sneakers with cushioned insole and flexible rubber outsole. Perfect for everyday casual wear.',
 '["Breathable canvas","Cushioned insole","Rubber outsole","Lightweight","Machine washable"]',
 '', 'StepEasy', 'Canvas & Rubber', '340g', '3 Months')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, category, price, original_price, rating, reviews, image, images, description, highlights, badge, brand, material, weight, warranty)
VALUES
(8, 'Luxury Leather Wallet', 'accessories', 1499, 2499, 4.7, 312,
 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop',
 '["https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop","https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500&h=500&fit=crop"]',
 'Handcrafted from premium Italian leather with RFID blocking technology. Features 8 card slots, 2 currency compartments, and a coin pocket.',
 '["Italian leather","RFID blocking","8 card slots","Slim design","Gift box included"]',
 'Popular', 'CraftLux', 'Italian Leather', '85g', '1 Year')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, category, price, original_price, rating, reviews, image, images, description, highlights, badge, brand, material, weight, warranty)
VALUES
(9, 'Ceramic Pour-Over Coffee Set', 'home', 1899, 2999, 4.5, 87,
 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop',
 '["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop","https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=500&h=500&fit=crop"]',
 'Artisan-crafted ceramic brew set for the perfect pour-over coffee. Includes dripper, server, and two cups with bamboo accents.',
 '["Hand-glazed ceramic","Bamboo accents","Complete set","Sustainable packaging","Dishwasher safe"]',
 '', 'BrewArt', 'Ceramic & Bamboo', '950g', '6 Months')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, category, price, original_price, rating, reviews, image, images, description, highlights, badge, brand, material, weight, warranty)
VALUES
(10, 'Wireless Charging Pad', 'electronics', 999, 1999, 4.2, 445,
 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop',
 '["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop"]',
 '15W fast wireless charger compatible with all Qi-enabled devices. Features LED indicator and anti-slip surface.',
 '["15W fast charging","Qi compatible","LED indicator","Anti-slip pad","Ultra-thin design"]',
 'Deal', 'ChargePro', 'Aluminum & Silicone', '120g', '1 Year')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, category, price, original_price, rating, reviews, image, images, description, highlights, badge, brand, material, weight, warranty)
VALUES
(11, 'Premium Denim Jeans', 'fashion', 3499, 4999, 4.4, 167,
 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
 '["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop","https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop"]',
 'Japanese selvedge denim with a modern tapered fit. Pre-washed for comfort with authentic distressing details.',
 '["Japanese selvedge denim","Tapered fit","Pre-washed","Authentic distressing","Reinforced stitching"]',
 '', 'DenimCo', '100% Cotton Denim', '700g', '3 Months')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, category, price, original_price, rating, reviews, image, images, description, highlights, badge, brand, material, weight, warranty)
VALUES
(12, 'Stainless Steel Water Bottle', 'accessories', 899, 1499, 4.6, 523,
 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
 '["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop"]',
 'Double-wall vacuum insulated bottle keeps drinks cold for 24 hours or hot for 12. BPA-free with a leak-proof cap.',
 '["24hr cold / 12hr hot","Double-wall insulation","BPA-free","Leak-proof","750ml capacity"]',
 'Eco', 'HydroLife', '18/8 Stainless Steel', '350g', '5 Years')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, category, price, original_price, rating, reviews, image, images, description, highlights, badge, brand, material, weight, warranty)
VALUES
(13, 'Scented Soy Candle Set', 'home', 1299, 1999, 4.8, 234,
 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&h=500&fit=crop',
 '["https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&h=500&fit=crop"]',
 'Set of 3 hand-poured soy wax candles in premium glass jars. Scents: Lavender Dreams, Vanilla Bean, and Ocean Breeze. 45-hour burn time each.',
 '["100% soy wax","Cotton wicks","45-hour burn time","3 scents included","Reusable glass jars"]',
 'Gift Pick', 'GlowCraft', 'Soy Wax & Glass', '900g', 'N/A')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, category, price, original_price, rating, reviews, image, images, description, highlights, badge, brand, material, weight, warranty)
VALUES
(14, 'Ultra-Slim Laptop Backpack', 'accessories', 2799, 4499, 4.5, 178,
 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
 '["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop","https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=500&h=500&fit=crop"]',
 'Water-resistant backpack with padded 15.6" laptop compartment, anti-theft hidden pocket, and USB charging port. Ergonomic design for daily commute.',
 '["Water-resistant","USB charging port","Anti-theft pocket","Padded laptop slot","Ergonomic straps"]',
 '', 'PackPro', 'Nylon & Polyester', '750g', '2 Years')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, category, price, original_price, rating, reviews, image, images, description, highlights, badge, brand, material, weight, warranty)
VALUES
(15, 'Graphic Print T-Shirt', 'fashion', 799, 1299, 4.1, 432,
 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
 '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop","https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=500&fit=crop"]',
 'Soft-touch 100% organic cotton with a unique artist-designed graphic. Pre-shrunk with reinforced collar stitching.',
 '["100% organic cotton","Artist collaboration","Pre-shrunk","Reinforced collar","Eco-friendly dyes"]',
 '', 'ArtWear', 'Organic Cotton', '180g', 'N/A')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, category, price, original_price, rating, reviews, image, images, description, highlights, badge, brand, material, weight, warranty)
VALUES
(16, 'Smart Home LED Strip', 'home', 1599, 2499, 4.3, 301,
 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&h=500&fit=crop',
 '["https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&h=500&fit=crop"]',
 'WiFi-enabled RGB LED strip with 16 million colors, music sync, and voice control via Alexa/Google. 5 meters with adhesive backing.',
 '["16M colors","Music sync","Voice control","5m length","App controlled"]',
 'Smart', 'LumiSmart', 'Flexible PCB', '200g', '1 Year')
ON CONFLICT (id) DO NOTHING;
