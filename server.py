#!/usr/bin/env python3
"""
Veloura Botanical Skincare - Python Development Server & API
Zero-dependency static server and REST API handler with security hardening.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import json
import time
import hmac
import shutil
from urllib.parse import urlparse, parse_qs

ASSET_SRC_DIR = os.path.join(
    os.path.expanduser("~"),
    ".gemini",
    "antigravity",
    "brain",
    "df165c36-facd-415a-85ab-ee81557da11d",
)
IMAGE_ASSET_MAP = [
    ("hero-editorial.jpg", "hero_editorial_1795718436530.jpg"),
    ("serum-dropper.jpg", "serum_dropper_1795718441219.jpg"),
    ("cream-jar.jpg", "cream_jar_1795718440675.jpg"),
    ("mist-bottle.jpg", "mist_bottle_1795718444096.jpg"),
    ("oil-flacon.jpg", "oil_flacon_1795718443056.jpg"),
    ("gift-ritual-set.jpg", "gift_ritual_set_v2_1795718470167.jpg"),
    ("hair-collection.jpg", "hair_collection_v2_1795718468113.jpg"),
    ("hair-duo-studio.jpg", "hair_collection_1795718453608.jpg"),
    ("gift-ceremony-edit.jpg", "gift_ritual_set_1795718450458.jpg"),
    ("editorial-texture.jpg", "editorial_texture_1795718454517.jpg"),
    ("atelier-about.jpg", "atelier_about_v2_1795718474065.jpg"),
    ("ritual-vanity.jpg", "ritual_vanity_1795718459704.jpg"),
]

def ensure_frontend_images():
    """Copy missing studio images from the local artifact folder into frontend/images/."""
    target_dir = os.path.join(FRONTEND_DIR, "images")
    os.makedirs(target_dir, exist_ok=True)
    copied = 0
    for target_name, src_name in IMAGE_ASSET_MAP:
        dest_path = os.path.join(target_dir, target_name)
        if os.path.exists(dest_path):
            continue
        src_path = os.path.join(ASSET_SRC_DIR, src_name)
        if os.path.exists(src_path):
            shutil.copy2(src_path, dest_path)
            copied += 1
    if copied > 0:
        print(f"  ✓ Prepared {copied} studio beauty images in frontend/images/")

DEFAULT_PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(DIRECTORY, "frontend")
DATA_DIR = os.path.join(DIRECTORY, "backend", "data")
STORAGE_DIR = os.path.join(DATA_DIR, "storage")
ADMIN_API_KEY = os.environ.get("ADMIN_API_KEY", "veloura_admin_secret_2026")

os.makedirs(STORAGE_DIR, exist_ok=True)

def load_json(filepath, default=None):
    if default is None:
        default = []
    if not os.path.exists(filepath):
        return default
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default

def save_json(filepath, data):
    try:
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Error saving {filepath}: {e}")

class VelouraAPIHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=FRONTEND_DIR, **kwargs)

    def check_admin_auth(self):
        auth_header = self.headers.get("x-admin-key") or ""
        if not auth_header:
            auth = self.headers.get("authorization") or ""
            if auth.startswith("Bearer "):
                auth_header = auth[7:].strip()
        return bool(auth_header) and hmac.compare_digest(auth_header, ADMIN_API_KEY)

    def end_headers(self):
        # Security headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def send_json(self, status_code, data):
        payload = json.dumps(data).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, x-admin-key")
        self.end_headers()
        self.wfile.write(payload)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, x-admin-key")
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)

        # API: Health Check
        if path == "/api/health":
            return self.send_json(200, {
                "status": "healthy",
                "service": "Veloura Python Engine",
                "version": "1.0.0"
            })

        # API: Products
        if path == "/api/products":
            products = load_json(os.path.join(DATA_DIR, "products.json"), [])
            category = query.get("category", [None])[0]
            if category and category.lower() != "all":
                products = [p for p in products if p.get("category", "").lower() == category.lower()]
            return self.send_json(200, {"success": True, "count": len(products), "data": products})

        # API: Product categories
        if path == "/api/products/categories":
            products = load_json(os.path.join(DATA_DIR, "products.json"), [])
            counts = {}
            for p in products:
                c = p.get("category", "other")
                counts[c] = counts.get(c, 0) + 1
            cats = [{"name": "all", "count": len(products)}] + [{"name": k, "count": v} for k, v in counts.items()]
            return self.send_json(200, {"success": True, "data": cats})

        # API: Single Product
        if path.startswith("/api/products/"):
            prod_id = path.split("/")[-1]
            products = load_json(os.path.join(DATA_DIR, "products.json"), [])
            product = next((p for p in products if p.get("id") == prod_id), None)
            if product:
                return self.send_json(200, {"success": True, "data": product})
            return self.send_json(404, {"success": False, "error": "Product not found"})

        # API: Orders list (Protected: requires x-admin-key)
        if path == "/api/orders":
            if not self.check_admin_auth():
                return self.send_json(401, {"success": False, "error": "Unauthorized. Valid x-admin-key required."})
            orders = load_json(os.path.join(STORAGE_DIR, "orders.json"), [])
            return self.send_json(200, {"success": True, "count": len(orders), "data": orders})

        # API: Subscribers list (Protected: requires x-admin-key)
        if path == "/api/newsletter/subscribers":
            if not self.check_admin_auth():
                return self.send_json(401, {"success": False, "error": "Unauthorized. Valid x-admin-key required."})
            subs = load_json(os.path.join(STORAGE_DIR, "subscribers.json"), [])
            return self.send_json(200, {"success": True, "count": len(subs), "data": subs})

        # API: Stats (Protected: requires x-admin-key)
        if path == "/api/stats":
            if not self.check_admin_auth():
                return self.send_json(401, {"success": False, "error": "Unauthorized. Valid x-admin-key required."})
            orders = load_json(os.path.join(STORAGE_DIR, "orders.json"), [])
            subs = load_json(os.path.join(STORAGE_DIR, "subscribers.json"), [])
            products = load_json(os.path.join(DATA_DIR, "products.json"), [])
            revenue = sum(o.get("total", 0) for o in orders)
            aov = revenue / len(orders) if orders else 0
            return self.send_json(200, {
                "success": True,
                "data": {
                    "totalRevenue": round(revenue, 2),
                    "totalOrders": len(orders),
                    "averageOrderValue": round(aov, 2),
                    "totalProducts": len(products),
                    "totalSubscribers": len(subs)
                }
            })

        # Otherwise serve static files normally
        super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        content_length = int(self.headers.get("Content-Length", 0))

        # Payload boundary limit (100KB max)
        if content_length > 102400:
            return self.send_json(413, {"success": False, "error": "Payload Too Large"})

        body_bytes = self.rfile.read(content_length)
        body = {}
        try:
            body = json.loads(body_bytes.decode("utf-8")) if body_bytes else {}
        except Exception:
            pass

        # API: Order placement
        if path == "/api/orders":
            items = body.get("items", [])
            customer = body.get("customer", {})
            if not items or not customer.get("firstName") or not customer.get("email"):
                return self.send_json(400, {"success": False, "error": "Missing required items or customer details"})

            products_catalog = load_json(os.path.join(DATA_DIR, "products.json"), [])
            catalog_map = {p["id"]: p for p in products_catalog}

            verified_items = []
            subtotal = 0.0

            # Server-side price verification and quantity clamping
            for item in items:
                prod_id = item.get("id")
                prod = catalog_map.get(prod_id)
                if not prod:
                    return self.send_json(400, {"success": False, "error": f"Invalid product id '{prod_id}'"})

                qty = max(1, min(50, int(item.get("qty", 1))))
                price = float(prod.get("price", 0))
                line_total = round(price * qty, 2)
                subtotal += line_total

                verified_items.append({
                    "id": prod["id"],
                    "name": prod["name"],
                    "price": price,
                    "qty": qty,
                    "variant": item.get("variant", "Standard"),
                    "lineTotal": line_total
                })

            subtotal = round(subtotal, 2)
            shipping = 0.0 if subtotal >= 50.0 else 4.95
            total = round(subtotal + shipping, 2)

            orders_file = os.path.join(STORAGE_DIR, "orders.json")
            orders = load_json(orders_file, [])
            order_id = f"VEL-{int(time.time() * 1000) % 900000 + 100000}"

            new_order = {
                "orderId": order_id,
                "createdAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "status": "confirmed",
                "customer": {
                    "firstName": str(customer.get("firstName", ""))[:50],
                    "lastName": str(customer.get("lastName", ""))[:50],
                    "email": str(customer.get("email", "")).strip().lower()[:150],
                    "address": str(customer.get("address", ""))[:150]
                },
                "items": verified_items,
                "subtotal": subtotal,
                "shippingFee": shipping,
                "total": total,
                "currency": "USD"
            }
            orders.insert(0, new_order)
            save_json(orders_file, orders)
            return self.send_json(201, {"success": True, "data": new_order})

        # API: Promo apply
        if path == "/api/promo/apply":
            code = (body.get("code") or "").strip().upper()[:30]
            subtotal = max(0.0, float(body.get("subtotal") or 0))
            promos = load_json(os.path.join(DATA_DIR, "promoCodes.json"), [])
            promo = next((p for p in promos if p.get("code") == code and p.get("isActive")), None)

            if not promo:
                return self.send_json(404, {"success": False, "error": "Invalid promo code."})

            discount = round(subtotal * promo.get("value", 0), 2) if promo.get("type") == "percentage" else promo.get("value", 0)
            return self.send_json(200, {
                "success": True,
                "data": {
                    "code": promo["code"],
                    "description": promo["description"],
                    "discountAmount": discount
                }
            })

        # API: Newsletter subscribe
        if path == "/api/newsletter/subscribe":
            email = (body.get("email") or "").strip().lower()[:150]
            if not email or "@" not in email:
                return self.send_json(400, {"success": False, "error": "Valid email required."})

            subs_file = os.path.join(STORAGE_DIR, "subscribers.json")
            subs = load_json(subs_file, [])
            if not any(s.get("email") == email for s in subs):
                subs.insert(0, {
                    "email": email,
                    "subscribedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                    "couponCode": "VELOURA10"
                })
                save_json(subs_file, subs)
            return self.send_json(200, {"success": True, "message": "Welcome to the Veloura VIP circle!"})

        return self.send_json(404, {"success": False, "error": "Not Found"})

def find_available_port(start_port):
    import socket
    port = start_port
    while port < start_port + 50:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('127.0.0.1', port)) != 0:
                return port
            port += 1
    return start_port

def run_server():
    ensure_frontend_images()
    port = find_available_port(DEFAULT_PORT)
    url = f"http://localhost:{port}/index.html"

    print("=" * 64)
    print("  ✦ VELOURA BOTANICAL SKINCARE — DEV SERVER & API ✦")
    print("=" * 64)
    if port != DEFAULT_PORT:
        print(f"  ⚠ Port {DEFAULT_PORT} is already in use by an older process!")
        print(f"  ⚠ Open {url}, or stop the old server on port {DEFAULT_PORT}.")
        print("-" * 64)
    print(f"  Storefront      : {url}")
    print(f"  Admin Dashboard : http://localhost:{port}/admin.html")
    print(f"  Products API    : http://localhost:{port}/api/products")
    print(f"  Health Check    : http://localhost:{port}/api/health")
    print("  Press Ctrl+C to stop the server.")
    print("=" * 64)

    try:
        webbrowser.open(url)
    except Exception:
        pass

    try:
        with socketserver.TCPServer(("", port), VelouraAPIHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n  Server stopped. Thank you for using Veloura!")
        sys.exit(0)

if __name__ == '__main__':
    run_server()
