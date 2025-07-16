# Claude Setup Guide for Apple Music MCP

This guide will help you set up the Apple Music MCP server to work with Claude Desktop.

## Prerequisites

- macOS (required for AppleScript support)
- Apple Music app installed
- Node.js (version 14 or higher)

## Quick Installation

### Option 1: Using the Installer Script (Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/thebarbican19/AppleMusic-MCP.git
   cd AppleMusic-MCP
   ```

2. **Run the installer**:
   ```bash
   ./install.sh
   ```

3. **Follow the on-screen instructions**

### Option 2: Manual Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/thebarbican19/AppleMusic-MCP.git
   cd AppleMusic-MCP
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Make scripts executable**:
   ```bash
   chmod +x index.js
   ```

4. **Test the installation**:
   ```bash
   node test-applescript.js
   ```

## Configuring Claude Desktop

1. **Open Claude Desktop**

2. **Go to Settings**:
   - Click the gear icon (⚙️) in the top-right corner
   - Or use `Cmd + ,` (Command + Comma)

3. **Navigate to MCP Settings**:
   - Look for "Model Context Protocol" or "MCP" section
   - Click "Add Server" or similar button

4. **Configure the MCP Server**:
   - **Name**: `apple-music`
   - **Command**: `node`
   - **Arguments**: `["/path/to/your/AppleMusic-MCP/index.js"]`
   - **Environment**: Leave empty

   **Replace `/path/to/your/AppleMusic-MCP/` with the actual path to your cloned repository**

5. **Save the configuration**

6. **Restart Claude Desktop**

## Testing the Setup

Once configured, you can test the MCP server by asking Claude:

- "What's currently playing in Apple Music?"
- "Play the next track"
- "Set the volume to 50%"
- "Search for and play Bohemian Rhapsody"

## Available Commands

Your Apple Music MCP server provides 22 different tools:

### Playback Control
- Play, pause, play/pause toggle
- Next/previous track
- Play specific tracks, albums, or playlists
- Search and play functionality

### Player Information
- Get current track details
- Get player state and volume
- Get track position

### Player Settings
- Set volume (0-100)
- Set track position
- Enable/disable repeat and shuffle

### Track Interaction
- Like/dislike current track
- Get liked status

## Troubleshooting

### "Node.js not found"
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Or use Homebrew: `brew install node`

### "AppleScript test failed"
- Make sure Apple Music app is installed and running
- Grant Terminal permission to control Music:
  - System Preferences > Security & Privacy > Privacy > Automation
  - Enable Terminal for Music

### "MCP server not working in Claude"
- Check that the file path in your MCP configuration is correct
- Make sure you restarted Claude Desktop after configuration
- Verify the server starts by running: `node index.js`

### "Permission denied"
- Make sure the script is executable: `chmod +x index.js`
- Check macOS permissions for terminal automation

## Example Usage

Once set up, you can have conversations like:

**You**: "What's currently playing?"

**Claude**: "Let me check what's currently playing in Apple Music..."

**You**: "Play the album 'Abbey Road' by The Beatles"

**Claude**: "I'll start playing the album 'Abbey Road' by The Beatles for you..."

**You**: "Set the volume to 30% and enable shuffle"

**Claude**: "I'll set the volume to 30% and enable shuffle mode..."

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the main [README.md](README.md) for detailed documentation
3. Open an issue on the [GitHub repository](https://github.com/thebarbican19/AppleMusic-MCP)

## Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests

---

**Enjoy controlling Apple Music with Claude! 🎵** 