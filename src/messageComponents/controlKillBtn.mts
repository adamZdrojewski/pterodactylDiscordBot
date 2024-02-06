import "dotenv/config";
import {changeServerPowerState} from "../PterodactylManager.mjs";
import PowerState from "../PowerState.mjs";
import { InteractionResponseType } from "discord-interactions";

// Load environment variables
const PTERODACTYL_URL = process.env.PTERODACTYL_URL;

export default {
    custom_id: "controlKillBtn",
    interaction: async (req:any, res:any, data:any) => {
        // Get server identifier
        const serverIdentifier = req.body.message.embeds[0].url.replace(`${PTERODACTYL_URL}/server/`, "");

        // Send server power state request
        await changeServerPowerState(serverIdentifier, PowerState.KILL);

        // Send response to Discord
        res.send({
            type: InteractionResponseType.DEFERRED_UPDATE_MESSAGE
        });
    }
};