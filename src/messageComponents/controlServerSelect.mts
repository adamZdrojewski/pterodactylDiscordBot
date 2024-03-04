import "dotenv/config";
import {ButtonStyleTypes, InteractionResponseType, MessageComponentTypes} from "discord-interactions";
import {getServerResourceUsage, getServerResourceUsageEmbed} from "../PterodactylManager.mjs";

// Load environment variables
const PTERODACTYL_URL = process.env.PTERODACTYL_URL;

export default {
    custom_id: "controlServerSelect",
    interaction: async (req: any, res: any, data: any) => {
        const serverData = await getServerResourceUsage(data.values[0]);

        res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                content: "",
                embeds: [
                    // Check if serverData exists and then conditionally use getServerResourceUsageEmbed
                    await getServerResourceUsageEmbed(data.values[0])
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
                                style: ButtonStyleTypes.SECONDARY,
                            }
                        ]
                    }
                ]
            }
        });
    }
};