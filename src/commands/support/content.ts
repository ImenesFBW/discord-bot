import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { Channels, CommandCategory } from '../../constants';

const CONTENT_MANAGER_HELP_URL = 'https://media.discordapp.net/attachments/740722295009706034/885966763089625088/unknown.png';

export const content: CommandDefinition = {
    name: ['content', 'contentmanager'],
    description: 'Help to identify aircraft version for support',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        const contentEmbed = makeEmbed({
            title: 'FlyByWire Support | Checking your aircraft version',
            description: makeLines([
                `In order to check which version of the A32NX you have installed, please open the MSFS Content Manager from the second page on the main menu and search for 'flybywire'. Then take a screenshot showing the results and send it here in <#${Channels.A32NX_SUPPORT}> as shown below. `,
                '',
                'If you find old versions or multiple installations, please delete them via the Content Manager and/or your Community folder.',
            ]),
            image: { url: CONTENT_MANAGER_HELP_URL },
        });

        await msg.channel.send({ embeds: [contentEmbed] });
    },
};
