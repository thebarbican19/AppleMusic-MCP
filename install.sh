#!/bin/bash

echo "🎵 Apple Music MCP Server Installer"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "Please install Node.js first:"
    echo "  - Visit https://nodejs.org/ and download the LTS version"
    echo "  - Or use Homebrew: brew install node"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    echo "Please install npm or reinstall Node.js."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies."
    exit 1
fi

echo "✅ Dependencies installed successfully."

# Make scripts executable
echo "🔧 Making scripts executable..."
chmod +x index.js
chmod +x test-applescript.js

echo "✅ Scripts are now executable."

# Test AppleScript integration
echo "🧪 Testing AppleScript integration..."
node test-applescript.js

if [ $? -ne 0 ]; then
    echo "❌ AppleScript test failed."
    echo "Please make sure:"
    echo "  1. Apple Music app is installed and running"
    echo "  2. Terminal has permission to control Music (System Preferences > Security & Privacy > Privacy > Automation)"
    exit 1
fi

echo ""
echo "🎉 Installation completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your MCP client (Claude Desktop, Cursor, etc.)"
echo "2. Add this MCP server with:"
echo "   - Command: node"
echo "   - Arguments: [\"$(pwd)/index.js\"]"
echo "3. Restart your MCP client"
echo "4. Start using Apple Music commands!"
echo ""
echo "📖 For detailed instructions, see README.md" 