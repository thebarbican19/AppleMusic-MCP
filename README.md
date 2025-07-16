# Apple Music MCP Server

A Model Context Protocol (MCP) server that provides tools to control Apple Music via AppleScript on macOS.

## Features

This MCP server provides comprehensive control over Apple Music, including:

### Playback Control
- Play, pause, and toggle play/pause
- Skip to next/previous track
- Play specific tracks, albums, or playlists
- Search and play tracks

### Player Information
- Get current track details (name, artist, album, duration, year, genre)
- Get player state (playing, paused, stopped)
- Get current volume and position

### Player Settings
- Set volume (0-100)
- Set track position
- Enable/disable repeat and shuffle
- Get repeat and shuffle status

### Track Interaction
- Like/dislike current track
- Get liked status of current track

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make the script executable:
   ```bash
   chmod +x index.js
   ```

## Configuration

Add this to your MCP client configuration (e.g., `.cursorrules` for Cursor):

```json
{
  "mcpServers": {
    "apple-music": {
      "command": "node",
      "args": ["/path/to/your/apple-music-mcp/index.js"],
      "env": {}
    }
  }
}
```

Replace `/path/to/your/apple-music-mcp/` with the actual path to this directory.

## Available Tools

### `apple_music_play`
Resume playback.

### `apple_music_pause`
Pause playback.

### `apple_music_playpause`
Toggle play/pause.

### `apple_music_next_track`
Skip to the next track.

### `apple_music_previous_track`
Skip to the previous track.

### `apple_music_play_track`
Start playback of a track by name and artist.

**Parameters:**
- `track_name` (string, required): The name of the track to play
- `artist_name` (string, required): The artist of the track to play

### `apple_music_play_album`
Start playback of an album by name and artist.

**Parameters:**
- `album_name` (string, required): The name of the album to play
- `artist_name` (string, required): The artist of the album to play

### `apple_music_play_playlist`
Start playback of a playlist by name.

**Parameters:**
- `playlist_name` (string, required): The name of the playlist to play

### `apple_music_get_current_track`
Get information about the current playing track.

### `apple_music_get_player_state`
Get the current player state (playing, paused, stopped).

### `apple_music_set_volume`
Set the sound output volume.

**Parameters:**
- `volume` (integer, required): Volume level (0-100)

### `apple_music_get_volume`
Get the current volume.

### `apple_music_set_position`
Set the player position within the current track.

**Parameters:**
- `position` (number, required): Position in seconds

### `apple_music_get_position`
Get the player position within the current track.

### `apple_music_set_repeat`
Turn repeat on or off.

**Parameters:**
- `enabled` (boolean, required): Enable or disable repeat

### `apple_music_get_repeat`
Get repeat status.

### `apple_music_set_shuffle`
Turn shuffle on or off.

**Parameters:**
- `enabled` (boolean, required): Enable or disable shuffle

### `apple_music_get_shuffle`
Get shuffle status.

### `apple_music_like_track`
Like the current track.

### `apple_music_dislike_track`
Dislike the current track.

### `apple_music_get_liked_status`
Get the liked status of the current track.

### `apple_music_search_and_play`
Search for a track and play it.

**Parameters:**
- `query` (string, required): Search query for track, artist, or album

## Usage Examples

Once configured, you can use these tools in your MCP client. For example, in Cursor you might say:

- "Play the next track"
- "What's currently playing?"
- "Set volume to 50%"
- "Play the album 'Abbey Road' by The Beatles"
- "Search for and play 'Bohemian Rhapsody'"

## Requirements

- macOS (required for AppleScript support)
- Apple Music app installed
- Node.js (version 14 or higher)

## Troubleshooting

1. **Permission Issues**: Make sure the script has execute permissions (`chmod +x index.js`)

2. **Apple Music Not Found**: Ensure Apple Music is installed and running on your Mac

3. **AppleScript Errors**: Some AppleScript commands may fail if Apple Music is not in the expected state. The server will return error messages for debugging.

4. **Timeout Issues**: The server has a 30-second timeout for AppleScript execution. If operations take longer, they will fail.

## License

MIT License - feel free to modify and distribute as needed.

## Contributing

Feel free to submit issues and enhancement requests! 