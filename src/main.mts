import "dotenv/config";
import express from "express";
import Commands from "./commands/Commands.mjs";
import MessageComponents from "./messageComponents/MessageComponents.mjs";
import {verifyKeyMiddleware, InteractionType} from "discord-interactions";
import {DiscordRequest} from "./utility.mjs";

// Load environment variables
const DISCORD_APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;
const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;

// Create and configure express app
const app = express();

// Interactions end point
app.post("/interactions", verifyKeyMiddleware(DISCORD_PUBLIC_KEY), (req: any, res: any) => {
    // Interaction type and data
    const {type, data} = req.body;

    // Handle interactions based on type
    if(type === InteractionType.APPLICATION_COMMAND) {
        // Handle slash command requests
        // Execute command interaction function
        for(const command in Commands) {
            if(Commands[command].info.name === data.name) {
                Commands[command].interaction(res);
            }
        }
    } else if(type === InteractionType.MESSAGE_COMPONENT) {
        // Handle message component requests
        // Execute message interaction function
        for(const messageComponent in MessageComponents) {
            if(MessageComponents[messageComponent].custom_id === data.custom_id) {
                MessageComponents[messageComponent].interaction(req, res, data);
            }
        }
    }
});

// Register commands
async function registerCommands() {
    for(const command in Commands) {
        try {
            await DiscordRequest(`applications/${DISCORD_APPLICATION_ID}/commands`, {
                method: "POST",
                body: Commands[command].info
            });
        } catch(err) {
            console.error(`Error while registering command ${Commands[command].info.name}: `, err);
        }
    }
}

// Listen on port 3000
app.listen(3000, () => {
    console.log("Listening on port 3000");

    registerCommands();
});