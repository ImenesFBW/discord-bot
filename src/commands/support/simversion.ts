import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const SIMVERSION_HELP_URL = 'https://docs.flybywiresim.com/fbw-a32nx/assets/support-guide/MSFS-Version.jpg';

export const simversion: CommandDefinition = {
    name: ['simversion', 'msfsversion'],
    description: 'Help to identify MSFS version for support',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        const simversionEmbed = makeEmbed({
            title: 'FlyByWire Support | Checking your MSFS version',
            description: makeLines([
                'In order to rule out version conflicts and continue with providing support for our aircraft, we need to see a screenshot showing your MSFS version. The version of Microsoft Flight Simulator 2020 you\'re using can be found in several ways:',
                '',
                'In the MSFS main menu you can click on your username in the upper right corner. This will display your version. Further ways to identify and show your sim version can be found [here.](https://docs.flybywiresim.com/fbw-a32nx/support/#msfs-version)',
            ]),
            image: { url: SIMVERSION_HELP_URL },
        });

        await msg.channel.send({ embeds: [simversionEmbed] });
    },
};
