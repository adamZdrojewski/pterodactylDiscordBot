import "dotenv/config";
import {InteractionResponseType} from "discord-interactions";
import {getServerResourceUsageEmbed} from "../PterodactylManager.mjs";

// Load environment variables
const PTERODACTYL_URL = process.env.PTERODACTYL_URL;

export default {
    custom_id: "controlReloadBtn",
    interaction: async (req:any, res:any, data:any) => {
        // Get server identifier
        const serverIdentifier = req.body.message.embeds[0].url.replace(`${PTERODACTYL_URL}/server/`, "");
        
        // Send updated embed object to Discord
        res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                embeds: [
                    await getServerResourceUsageEmbed(serverIdentifier)
                ]
            }
        });
    }
};