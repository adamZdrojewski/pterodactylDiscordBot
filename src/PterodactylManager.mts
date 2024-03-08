import "dotenv/config";
import {roundTo2DecimalPlaces} from "./utility.mjs";
import PowerState from "./PowerState.mjs";

// Load environment variables
const PTERODACTYL_URL = process.env.PTERODACTYL_URL;
const PTERODACTYL_API_KEY = process.env.PTERODACTYL_API_KEY;

// Pterodactyl request
export async function PterodactylRequest(endpoint: string, options: any) {
    // Append endpoint to root API URL
    const url = `${PTERODACTYL_URL}/api/${endpoint}`;

    // Stringify payloads
    if(options.body) {
        options.body = JSON.stringify(options.body);
    }

    // Use node-fetch to make requests
    const response = await fetch(url, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${PTERODACTYL_API_KEY}`,
            "Content-Type": "application/json"
        },
        ...options
    });

    // Throw API errors
    if(!response.ok) {
        // Check for 403 (forbidden)
        if(response.status === 403) {
            // 403 error
            throw new Error("ERROR: Pterodactyl user does not have access to requested resource.");
        } else {
            // Other error
            console.error(response);
            throw new Error("ERROR while making Pterodactyl request.");
        }
    }

    // Return origional response
    return response;
};

// Get server list from API
export async function getServerList() {
    const data = await PterodactylRequest("client", {
        method: "GET"
    });

    let serverList = await data.json();
    serverList = serverList.data;

    return serverList;
};

// Get server resource usage from API
export async function getServerResourceUsage(serverID: string) {
        // Get data from API
    const serverData = await (await PterodactylRequest(`client/servers/${serverID}`, {
        method: "GET"
    })).json();
    const serverResourcesData = await (await PterodactylRequest(`client/servers/${serverID}/resources`, {
        method: "GET"
    })).json();

    // Organize data
    return {
        name: serverData.attributes.name.length >= 100 ? serverData.attributes.name.substring(0, 96) + "..." : serverData.attributes.name,
        status: serverResourcesData.attributes.current_state,
        ram: {
            used: roundTo2DecimalPlaces(serverResourcesData.attributes.resources.memory_bytes/1000000),
            total: roundTo2DecimalPlaces(serverData.attributes.limits.memory)
        },
        disk: {
            used: roundTo2DecimalPlaces(serverResourcesData.attributes.resources.disk_bytes/1000000),
            total: roundTo2DecimalPlaces(serverData.attributes.limits.disk)
        },
        cpu: roundTo2DecimalPlaces(serverResourcesData.attributes.resources.cpu_absolute)
    };
}


// Create embed object
export async function getServerResourceUsageEmbed(serverID:string) {

    const serverUsage = await getServerResourceUsage(serverID)

    // Return embed object
    return {
        title: `[Controlling: ${serverUsage.name}]\n[Status: ${serverUsage.status}]`,
        description: `\`[RAM Usage: ${serverUsage.ram.used}/${serverUsage.ram.total}MB]\`\n\`[Disk Usage: ${serverUsage.disk.used}/${serverUsage.disk.total}MB]\`\n\`[CPU Usage: ${serverUsage.cpu}%]\``,
        color: 0x0099FF,
        url: `${PTERODACTYL_URL}/server/${serverID}`
    }
};

// Send command to server
export async function changeServerPowerState(serverIdentifier:string, powerState:PowerState) {
    await PterodactylRequest(`client/servers/${serverIdentifier}/power`, {
        method: "POST",
        body: {
            signal: powerState
        }
    });
};