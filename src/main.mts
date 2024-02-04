import "dotenv/config";
import express from "express";
import Commands from "./commands/Commands.mjs";
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

    // Handle slash command requests
    if(type === InteractionType.APPLICATION_COMMAND) {
        // Execute command interaction function
        for(const command in Commands) {
            if(Commands[command].info.name === data.name) {
                Commands[command].interaction(res);
            }
        }
    }
});

// Register commands
async function registerCommands() {
    const guildId = "830499370935255050";
    for(const command in Commands) {
        try {
            // TODO change to global commands (currently using guild-scoped)
            const res = await DiscordRequest(`applications/${DISCORD_APPLICATION_ID}/guilds/${guildId}/commands`, {
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