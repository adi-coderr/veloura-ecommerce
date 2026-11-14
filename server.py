#!/usr/bin/env python3
"""
Veloura Botanical Skincare - Local Development Server
Zero-dependency static server with automatic browser launch and clean MIME handling.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

DEFAULT_PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class VelouraHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Prevent aggressive caching during development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

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
    port = find_available_port(DEFAULT_PORT)
    url = f"http://localhost:{port}/index.html"

    print("=" * 60)
    print("  ✦ VELOURA BOTANICAL SKINCARE — LOCAL DEV SERVER ✦")
    print("=" * 60)
    print(f"  Serving directory : {DIRECTORY}")
    print(f"  Local URL         : {url}")
    print("  Press Ctrl+C to stop the server.")
    print("=" * 60)

    # Launch browser automatically
    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"  Could not launch browser automatically: {e}")

    try:
        with socketserver.TCPServer(("", port), VelouraHTTPHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n  Server stopped. Thank you for using Veloura!")
        sys.exit(0)

if __name__ == '__main__':
    run_server()
