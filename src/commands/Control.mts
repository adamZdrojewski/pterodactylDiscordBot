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
        await serverList.map((serverData:any, i:number) => {
            // Check if mapped through 25 servers already
            if(i >= 25) {
                return;
            }
            
            // Check if server name is too long (100 chars)
            if(serverData.attributes.name.length >= 100) {
                serverData.attributes.name = serverData.attributes.name.substring(0, 96) + "...";
            }

            // Check if server description is too long (100 chars)
            if(serverData.attributes.description.length >= 100) {
                serverData.attributes.description = serverData.attributes.description.substring(0, 96) + "...";
            }

            // Add server data to select menu options
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