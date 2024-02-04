import {InteractionResponseType, MessageComponentTypes, ButtonStyleTypes} from "discord-interactions";

export default {
    info: {
        name: "test",
        description: "Just an average command",
        type: 1
    },
    interaction: (res: any) => {
        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: "A wild message appeared and... with a button!",
                components: [
                    {
                        type: MessageComponentTypes.ACTION_ROW,
                        components: [
                            {
                                type: MessageComponentTypes.BUTTON,
                                custom_id: "my_button",
                                label: "Click",
                                style: ButtonStyleTypes.PRIMARY
                            }
                        ]
                    }
                ]
            }
        });
    }
};