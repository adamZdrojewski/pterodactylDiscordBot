import "dotenv/config";
import {changeServerPowerState} from "../PterodactylManager.mjs";
import PowerState from "../PowerState.mjs";
import { InteractionResponseType } from "discord-interactions";

// Load environment variables
const PTERODACTYL_URL = process.env.PTERODACTYL_URL;

export default {
    custom_id: "controlStopBtn",
    interaction: async (req:any, res:any, data:any) => {
        // Get server identifier
        const serverIdentifier = req.body.message.embeds[0].url.replace(`${PTERODACTYL_URL}/server/`, "");

        try {
            // Send server power state request
            await changeServerPowerState(serverIdentifier, PowerState.STOP);

            // Send response to Discord
            res.send({
                type: InteractionResponseType.DEFERRED_UPDATE_MESSAGE
            });
        } catch(err) {
            if(err.message === "ERROR: Pterodactyl user does not have access to requested resource.") {
                // 403 error
                res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: "Could not complete command!  The Pterodactyl user does not have access to change the power state of this server.",
                        flags: 64
                    }
                });
            } else {
                // Other error
                res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: "Could not complete command!  Check the console for more details.",
                        flags: 64
                    }
                });
            }
        }
    }
};