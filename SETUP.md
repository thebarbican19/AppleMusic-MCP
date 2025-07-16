# Setup Guide for Apple Music MCP Server

## Prerequisites

### 1. Install Node.js

You need Node.js version 14 or higher to run this MCP server. Here are several ways to install it:

#### Option A: Using Homebrew (Recommended)
```bash
# Install Homebrew first if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

#### Option B: Using Node Version Manager (nvm)
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart your terminal or run:
source ~/.zshrc

# Install the latest LTS version of Node.js
nvm install --lts
nvm use --lts
```

#### Option C: Download from Official Website
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS version for macOS
3. Run the installer

### 2. Verify Installation
```bash
node --version
npm --version
```

Both commands should return version numbers if Node.js is installed correctly.

## Installation Steps

1. **Clone or download this repository**
   ```bash
   git clone <repository-url>
   cd apple-music-mcp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Make scripts executable**
   ```bash
   chmod +x index.js
   chmod +x test-applescript.js
   ```

4. **Test AppleScript integration**
   ```bash
   node test-applescript.js
   ```

## Configuration

### For Cursor IDE

Add this to your `.cursorrules` file:

```json
{
  "mcpServers": {
    "apple-music": {
      "command": "node",
      "args": ["/Users/your-username/path/to/apple-music-mcp/index.js"],
      "env": {}
    }
  }
}
```

Replace `/Users/your-username/path/to/apple-music-mcp/` with the actual path to this directory.

### For Other MCP Clients

Refer to your MCP client's documentation for configuration format. The command should be:
- **Command**: `node`
- **Arguments**: `["/path/to/apple-music-mcp/index.js"]`

## Troubleshooting

### Node.js Installation Issues

1. **"command not found: node"**
   - Make sure Node.js is installed (see installation options above)
   - Restart your terminal after installation
   - Check your PATH environment variable

2. **"command not found: npm"**
   - npm comes with Node.js, so if you have Node.js but not npm, try reinstalling Node.js
   - On some systems, you might need to install npm separately: `brew install npm`

### AppleScript Issues

1. **"Application 'Music' got an error"**
   - Make sure Apple Music app is installed and running
   - Check if you have an active Apple Music subscription (for streaming content)

2. **Permission Denied**
   - Go to System Preferences > Security & Privacy > Privacy > Automation
   - Make sure Terminal (or your terminal app) has permission to control Music

3. **AppleScript Execution Disabled**
   - Go to System Preferences > Security & Privacy > General
   - Look for any blocked AppleScript executions and allow them

### MCP Server Issues

1. **Server won't start**
   - Check that all dependencies are installed: `npm install`
   - Verify the script is executable: `chmod +x index.js`
   - Check the file path in your MCP configuration

2. **Tools not appearing**
   - Restart your MCP client after configuration changes
   - Check the server logs for error messages
   - Verify the server is running by checking the console output

## Testing

After setup, you can test the server by running:

```bash
node index.js
```

You should see: "Apple Music MCP server running on stdio"

If you see any errors, check the troubleshooting section above.

## Next Steps

Once everything is set up and working:

1. Restart your MCP client (Cursor, etc.)
2. Try using Apple Music commands like:
   - "What's currently playing?"
   - "Play the next track"
   - "Set volume to 50%"

The MCP server should now be available in your AI assistant! 