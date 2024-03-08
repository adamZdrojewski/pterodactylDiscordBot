# Pterodactyl Discord Bot
A simple Discord bot that allows you to manage the power state of your servers hosted on a Pterodactyl instance.

![Discord embed with server resource usage information on it.  Buttons to control power state of server located below embed.](https://i.imgur.com/UZPJ7IE.png)

## Setup
To get this bot up and running you will need just a couple of things:
1. A Discord app
2. A server to run the bot code on (easiest way is on a Docker server)
3. Your existing Pterodactyl instance

### Create Discord App
1. Go to https://discord.com/developers/applications and create a new application
2. Save your new application's `Application ID`, `Public Key`, and `Bot Token` somewhere safe (you will need them later)
3. Next, set the `Interactions Endpoint URL` to the endpoint where your bot code will be hosted.  This could be your domain or just a public IP address.  Make sure to add `/interactions` to the end of it.  Example: `https://example.com/interactions`
4. Finally use the following link to add your new bot to your Discord server.  Make sure to replace `<your-client-id>` with the Application ID you saved from earlier.
```
https://discord.com/api/oauth2/authorize?client_id=<your-client-id>&permissions=0&scope=bot
```

### Install Bot Code On Docker
The easiest way to install our Docker image is with a docker-compose file.  Below is an example, make sure to replace the environment variables with your actual values.
```yaml
services:
  app:
    image: adamzdrojewski/pterodactyl-discord-bot
    container_name: pterodactylDiscordBot
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      DISCORD_APPLICATION_ID: ""
      DISCORD_PUBLIC_KEY: ""
      DISCORD_BOT_TOKEN: ""
      PTERODACTYL_URL: ""
      PTERODACTYL_API_KEY: ""
```
| Environment Variable | Description |
| -------------------- | ----------- |
| `DISCORD_APPLICATION_ID` | Found on the `General Information` page of your Discord application's dashboard. |
| `DISCORD_PUBLIC_KEY` | Found on the `General Information` page of your Discord application's dashboard. |
| `DISCORD_BOT_TOKEN` | Found on the `Bot` page of your Discord application's dashboard.  You may need to click the `Reset Token` button. |
| `PTERODACTYL_URL` | The base URL you use to access your Pterodactyl instance.  Ex: `https://example.com` |
| `PTERODACTYL_API_KEY` | Key generated in `Account Settings` under `API Credentials` on your Pterodactyl dashboard.  This should be an account API key and not a global one. |

### Extra Note
The first time you run the bot, it way take up to an hour before the control command appears in your server.  This is perfectly normal, it is just due to the process Discord uses to register global slash commands.

## Usage
To use the bot, run the command `/control` in your Discord server.  This will bring up a select menu where you can pick which server you would like to control.  From there a control menu will appear allowing you to control the power state of the server and monitor it's resource usage.  Please note the control menu does not update it's data automatically, you can refresh the data with the `Reload` button.
