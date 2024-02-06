import "dotenv/config";
import {ButtonStyleTypes, InteractionResponseType, MessageComponentTypes} from "discord-interactions";
import {getServerResourceUsageEmbed} from "../PterodactylManager.mjs";

// Load environment variables
const PTERODACTYL_URL = process.env.PTERODACTYL_URL;

export default {
    custom_id: "controlServerSelect",
    interaction: async (req:any, res:any, data:any) => {
        res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                content: "",
                embeds: [
                    await getServerResourceUsageEmbed(data.values[0])
                ],
                components: [
                    {
                        type: MessageComponentTypes.ACTION_ROW,
                        components: [
                            {
                                type: MessageComponentTypes.BUTTON,
                                custom_id: "controlStartBtn",
                                label: "Start",
                                style: ButtonStyleTypes.SUCCESS
                            },
                            {
                                type: MessageComponentTypes.BUTTON,
                                custom_id: "controlStopBtn",
                                label: "Stop",
                                style: ButtonStyleTypes.DANGER
                            },
                            {
                                type: MessageComponentTypes.BUTTON,
                                custom_id: "controlKillBtn",
                                label: "Kill",
                                style: ButtonStyleTypes.DANGER
                            },
                            {
                                type: MessageComponentTypes.BUTTON,
                                custom_id: "controlReloadBtn",
                                label: "Reload",
                                style: ButtonStyleTypes.PRIMARY
                            }
                        ]
                    }
                ]
            }
        });
    }
};