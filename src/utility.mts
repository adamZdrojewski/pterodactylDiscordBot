import "dotenv/config";

// Load environment variables
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

// Discord Request
export async function DiscordRequest(endpoint: string, options: any) {
    // Append endpoint to root API URL
    const url = `https://discord.com/api/v10/${endpoint}`;

    // Stringify payloads
    if(options.body) {
        options.body = JSON.stringify(options.body);
    }

    // Use node-fetch to make requests
    const response = await fetch(url, {
        headers: {
            Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
            "Content-Type": "application/json; charset=UTF-8",
            "User-Agent": "DiscordBot"
        },
        ...options
    });

    // Throw API errors
    if(!response.ok) {
        const data = await response.json();
        console.log(response.status);
        throw new Error(JSON.stringify(data));
    }

    // Return origional response
    return response;
};

// Rounding helper
export function roundTo2DecimalPlaces(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}