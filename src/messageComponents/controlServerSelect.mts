import {InteractionResponseType} from "discord-interactions";
import {getServerResourceUsage} from "../PterodactylManager.mjs";

export default {
    custom_id: "controlServerSelect",
    interaction: async (req:any, res:any, data:any) => {
        const serverResourceUsageData = await getServerResourceUsage(data.values[0]);
        res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                content: "",
                components: [],
                embeds: [
                    {
                        title: `[Controlling: ${serverResourceUsageData.name}]\n[Status: ${serverResourceUsageData.status}]`,
                        description: `\`[RAM Usage: ${serverResourceUsageData.ram.used}/${serverResourceUsageData.ram.total}MB]\`\n\`[Disk Usage: ${serverResourceUsageData.disk.used}/${serverResourceUsageData.disk.total}MB]\`\n\`[CPU Usage: ${serverResourceUsageData.cpu}%]\``,
                        color: 0x0099FF
                    }
                ]
            }
        });
    }
};