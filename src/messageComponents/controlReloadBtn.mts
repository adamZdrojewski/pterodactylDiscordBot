import "dotenv/config";
import {ButtonStyleTypes, InteractionResponseType, MessageComponentTypes} from "discord-interactions";
import {getServerResourceUsage, getServerResourceUsageEmbed} from "../PterodactylManager.mjs";

// Load environment variables
const PTERODACTYL_URL = process.env.PTERODACTYL_URL;

export default {
    custom_id: "controlReloadBtn",
    interaction: async (req: any, res: any, data: any) => {
        // Get server
        const serverIdentifier = req.body.message.embeds[0].url.replace(`${PTERODACTYL_URL}/server/`,"");

        // Get server usage
        const serverData = await getServerResourceUsage(serverIdentifier);

        // Send updated interaction to Discord
        return res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                embeds: [
                    await getServerResourceUsageEmbed(serverIdentifier)
                ],
                components: [
                    {
                        type: MessageComponentTypes.ACTION_ROW,
                        components: [
                            {
                                type: MessageComponentTypes.BUTTON,
                                custom_id: serverData.status === "running" ? "controlRestartBtn" : "controlStartBtn",
                                label: serverData.status === "running" ? "Restart" : "Start",
                                style: ButtonStyleTypes.SUCCESS,
                            },
                            {
                                type: MessageComponentTypes.BUTTON,
                                custom_id: "controlStopBtn",
                                label: "Stop",
                                style: ButtonStyleTypes.DANGER,
                            },
                            {
                                type: MessageComponentTypes.BUTTON,
                                custom_id: "controlReloadBtn",
                                label: "Reload",
                                style: ButtonStyleTypes.PRIMARY
                            },
                            {
                                type: MessageComponentTypes.BUTTON,
                                custom_id: "controlMenu",
                                label: "Back",
                                style: ButtonStyleTypes.SECONDARY
                            }
                        ]
                    }
                ]
            }
        });
    }
};