import {InteractionResponseType, MessageComponentTypes} from "discord-interactions";
import {getServerList} from "../PterodactylManager.mjs";

export default {
    info: {
        name: "control",
        description: "Displays control dashboard for requested server.",
        type: 1
    },
    interaction: async (res: any) => {
        // Fetch server list
        let serverList = await getServerList();
        
        // Parse data into select menu options
        let serverOptions = [];
        await serverList.map((serverData: any) => {
            serverOptions.push({
                label: serverData.attributes.name,
                value: serverData.attributes.identifier,
                description: serverData.attributes.description != "" ? serverData.attributes.description : "No description..."
            });
        });
        
        // Create & send select menu
        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                flags: 64,
                components: [
                    {
                        type: MessageComponentTypes.ACTION_ROW,
                        components: [
                            {
                                type: MessageComponentTypes.STRING_SELECT,
                                custom_id: "controlServerSelect",
                                placeholder: "Select a server to control",
                                options: serverOptions
                            }
                        ]
                    }
                ]
            }
        });
    }
};