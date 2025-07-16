#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const OSASCRIPT_TIMEOUT = 30000;

class AppleMusicServer {
  constructor() {
    this.server = new Server(
      {
        name: "apple-music",
        version: "0.0.1",
      },
      {
        capabilities: {
          tools: {},
        },
      },
    );

    this.setupHandlers();
  }

  async executeAppleScript(script) {
    try {
      const { stdout, stderr } = await execFileAsync("osascript", ["-e", script], {
        timeout: OSASCRIPT_TIMEOUT,
        maxBuffer: 1024 * 1024,
      });
      if (stderr) {
        console.error("AppleScript stderr:", stderr);
      }
      return stdout.trim();
    } catch (error) {
      console.error("Failed to execute AppleScript:", error);
      throw error;
    }
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "apple_music_play",
          description: "Resume playback",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "apple_music_pause",
          description: "Pause playback",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "apple_music_playpause",
          description: "Toggle play/pause",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "apple_music_next_track",
          description: "Skip to the next track",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "apple_music_previous_track",
          description: "Skip to the previous track",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "apple_music_play_track",
          description: "Start playback of a track by name and artist",
          inputSchema: {
            type: "object",
            properties: {
              track_name: {
                type: "string",
                description: "The name of the track to play",
              },
              artist_name: {
                type: "string",
                description: "The artist of the track to play",
              },
            },
            required: ["track_name", "artist_name"],
          },
        },
        {
          name: "apple_music_play_album",
          description: "Start playback of an album by name and artist",
          inputSchema: {
            type: "object",
            properties: {
              album_name: {
                type: "string",
                description: "The name of the album to play",
              },
              artist_name: {
                type: "string",
                description: "The artist of the album to play",
              },
            },
            required: ["album_name", "artist_name"],
          },
        },
        {
          name: "apple_music_play_playlist",
          description: "Start playback of a playlist by name",
          inputSchema: {
            type: "object",
            properties: {
              playlist_name: {
                type: "string",
                description: "The name of the playlist to play",
              },
            },
            required: ["playlist_name"],
          },
        },
        {
          name: "apple_music_get_current_track",
          description: "Get information about the current playing track",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "apple_music_get_player_state",
          description: "Get the current player state (playing, paused, stopped)",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "apple_music_set_volume",
          description: "Set the sound output volume (0-100)",
          inputSchema: {
            type: "object",
            properties: {
              volume: {
                type: "integer",
                description: "Volume level (0-100)",
                minimum: 0,
                maximum: 100,
              },
            },
            required: ["volume"],
          },
        },
        {
          name: "apple_music_get_volume",
          description: "Get the current volume",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "apple_music_set_position",
          description: "Set the player position within the current track",
          inputSchema: {
            type: "object",
            properties: {
              position: {
                type: "number",
                description: "Position in seconds",
                minimum: 0,
              },
            },
            required: ["position"],
          },
        },
        {
          name: "apple_music_get_position",
          description: "Get the player position within the current track",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "apple_music_set_repeat",
          description: "Turn repeat on or off",
          inputSchema: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
                description: "Enable or disable repeat",
              },
            },
            required: ["enabled"],
          },
        },
        {
          name: "apple_music_get_repeat",
          description: "Get repeat status",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "apple_music_set_shuffle",
          description: "Turn shuffle on or off",
          inputSchema: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
                description: "Enable or disable shuffle",
              },
            },
            required: ["enabled"],
          },
        },
        {
          name: "apple_music_get_shuffle",
          description: "Get shuffle status",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "apple_music_like_track",
          description: "Like the current track",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "apple_music_dislike_track",
          description: "Dislike the current track",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "apple_music_get_liked_status",
          description: "Get the liked status of the current track",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "apple_music_search_and_play",
          description: "Search for a track and play it",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search query for track, artist, or album",
              },
            },
            required: ["query"],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (!request.params.name) {
        throw new Error("Tool name is required");
      }

      const toolName = request.params.name;
      const args = request.params.arguments || {};

      try {
        let result;

        switch (toolName) {
          case "apple_music_play":
            result = await this.executeAppleScript('tell application "Music" to play');
            break;

          case "apple_music_pause":
            result = await this.executeAppleScript('tell application "Music" to pause');
            break;

          case "apple_music_playpause":
            result = await this.executeAppleScript('tell application "Music" to playpause');
            break;

          case "apple_music_next_track":
            result = await this.executeAppleScript('tell application "Music" to next track');
            break;

          case "apple_music_previous_track":
            result = await this.executeAppleScript('tell application "Music" to previous track');
            break;

          case "apple_music_play_track":
            const playTrackScript = `tell application "Music"
              set trackList to (every track whose name contains "${args.track_name}" and artist contains "${args.artist_name}")
              if (count of trackList) > 0 then
                play item 1 of trackList
                return "Now playing: ${args.track_name} by ${args.artist_name}"
              else
                return "Track not found: ${args.track_name} by ${args.artist_name}"
              end if
            end tell`;
            result = await this.executeAppleScript(playTrackScript);
            break;

          case "apple_music_play_album":
            const playAlbumScript = `tell application "Music"
              set albumList to (every album whose name contains "${args.album_name}" and artist contains "${args.artist_name}")
              if (count of albumList) > 0 then
                play item 1 of albumList
                return "Now playing album: ${args.album_name} by ${args.artist_name}"
              else
                return "Album not found: ${args.album_name} by ${args.artist_name}"
              end if
            end tell`;
            result = await this.executeAppleScript(playAlbumScript);
            break;

          case "apple_music_play_playlist":
            const playPlaylistScript = `tell application "Music"
              set playlistList to (every playlist whose name contains "${args.playlist_name}")
              if (count of playlistList) > 0 then
                play item 1 of playlistList
                return "Now playing playlist: ${args.playlist_name}"
              else
                return "Playlist not found: ${args.playlist_name}"
              end if
            end tell`;
            result = await this.executeAppleScript(playPlaylistScript);
            break;

          case "apple_music_get_current_track":
            const trackInfo = await this.executeAppleScript(`tell application "Music"
              if player state is not stopped then
                set trackName to name of current track
                set trackArtist to artist of current track
                set trackAlbum to album of current track
                set trackDuration to duration of current track
                set trackYear to year of current track
                set trackGenre to genre of current track
                return "Name: " & trackName & "\\nArtist: " & trackArtist & "\\nAlbum: " & trackAlbum & "\\nDuration: " & trackDuration & " seconds\\nYear: " & trackYear & "\\nGenre: " & trackGenre
              else
                return "No track is currently playing"
              end if
            end tell`);
            result = trackInfo;
            break;

          case "apple_music_get_player_state":
            const state = await this.executeAppleScript('tell application "Music" to return player state as string');
            result = state;
            break;

          case "apple_music_set_volume":
            result = await this.executeAppleScript(`tell application "Music" to set sound volume to ${args.volume}`);
            break;

          case "apple_music_get_volume":
            result = await this.executeAppleScript('tell application "Music" to return sound volume');
            break;

          case "apple_music_set_position":
            result = await this.executeAppleScript(`tell application "Music" to set player position to ${args.position}`);
            break;

          case "apple_music_get_position":
            result = await this.executeAppleScript('tell application "Music" to return player position');
            break;

          case "apple_music_set_repeat":
            result = await this.executeAppleScript(`tell application "Music" to set song repeat to ${args.enabled}`);
            break;

          case "apple_music_get_repeat":
            result = await this.executeAppleScript('tell application "Music" to return song repeat');
            break;

          case "apple_music_set_shuffle":
            result = await this.executeAppleScript(`tell application "Music" to set shuffle enabled to ${args.enabled}`);
            break;

          case "apple_music_get_shuffle":
            result = await this.executeAppleScript('tell application "Music" to return shuffle enabled');
            break;

          case "apple_music_like_track":
            result = await this.executeAppleScript(`tell application "Music"
              if player state is not stopped then
                set loved of current track to true
                return "Liked current track"
              else
                return "No track is currently playing"
              end if
            end tell`);
            break;

          case "apple_music_dislike_track":
            result = await this.executeAppleScript(`tell application "Music"
              if player state is not stopped then
                set loved of current track to false
                return "Disliked current track"
              else
                return "No track is currently playing"
              end if
            end tell`);
            break;

          case "apple_music_get_liked_status":
            result = await this.executeAppleScript(`tell application "Music"
              if player state is not stopped then
                set lovedStatus to loved of current track
                if lovedStatus then
                  return "Current track is liked"
                else
                  return "Current track is not liked"
                end if
              else
                return "No track is currently playing"
              end if
            end tell`);
            break;

          case "apple_music_search_and_play":
            const searchScript = `tell application "Music"
              set searchResults to search for "${args.query}" only songs
              if (count of searchResults) > 0 then
                play item 1 of searchResults
                set trackName to name of item 1 of searchResults
                set trackArtist to artist of item 1 of searchResults
                return "Now playing: " & trackName & " by " & trackArtist
              else
                return "No results found for: ${args.query}"
              end if
            end tell`;
            result = await this.executeAppleScript(searchScript);
            break;

          default:
            throw new Error(`Unknown tool: ${toolName}`);
        }

        return {
          content: [
            {
              type: "text",
              text: result,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Apple Music MCP server running on stdio");
  }
}

const server = new AppleMusicServer();
server.run().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
}); 