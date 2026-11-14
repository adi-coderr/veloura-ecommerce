#!/bin/bash
# Veloura Skincare - Launch Script
cd "$(dirname "$0")"

echo "✦ Starting Veloura Botanical Skincare..."

if command -v python3 >/dev/null 2>&1; then
    python3 server.py
elif command -v node >/dev/null 2>&1; then
    node server.js
else
    echo "Opening index.html in your default browser..."
    open index.html
fi
