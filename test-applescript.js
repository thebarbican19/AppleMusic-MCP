#!/usr/bin/env node

import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

async function testAppleScript() {
  try {
    console.log("Testing Apple Music AppleScript integration...");
    
    // Test basic AppleScript execution
    const { stdout } = await execFileAsync("osascript", ["-e", 'tell application "Music" to return player state as string']);
    console.log("Player state:", stdout.trim());
    
    // Test getting current track info
    const trackInfo = await execFileAsync("osascript", ["-e", `tell application "Music"
      if player state is not stopped then
        set trackName to name of current track
        set trackArtist to artist of current track
        return "Now playing: " & trackName & " by " & trackArtist
      else
        return "No track is currently playing"
      end if
    end tell`]);
    console.log("Current track:", trackInfo.stdout.trim());
    
    console.log("✅ AppleScript integration test completed successfully!");
    
  } catch (error) {
    console.error("❌ AppleScript test failed:", error.message);
    console.log("\nPossible issues:");
    console.log("1. Apple Music app is not installed or not running");
    console.log("2. macOS permissions need to be granted for terminal access");
    console.log("3. AppleScript execution is disabled");
  }
}

testAppleScript(); 