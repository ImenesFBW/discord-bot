import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const SIMBRIEF_BASE_URL = 'http://www.simbrief.com/system/dispatch.php?type=A20N&orig=';

export const randomFlight: CommandDefinition = {
    name: ['destinations', 'dest', 'random', 'randomflight'],
    description: 'Provides an idea for a random flight',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const query = msg.content.replace(/\.(destinations|dest|random|randomflight)/, ' ').toLowerCase().split(' ').join('');

        const europe = [
            'LJLJ - LYTV',
            'LJLJ - LDDU',
            'LJLJ - LSZH',
            'LJLJ - LFKJ',
            'LJLJ - LIRF',
            'LJLJ - EDDF',
            'LJLJ - LYPG',

            'LYTV - LJLJ',
            'LDDU - LJLJ',
            'LSZH - LJLJ',
            'LFKJ - LJLJ',
            'LIRF - LJLJ',
            'EDDF - LJLJ',
        ];
        const northAmerica = [
            'KLAS - KLAX',
            'KLAS - KSJC',
            'KLAS - KPDX',
            'KLAS - KBOI',
            'KLAS - KMIA',
            'KLAS - KATL',

            'KLAX - KLAS',
            'KSJC - KLAS',
            'KPDX - KLAS',
            'KBOI - KLAS',
            'KMIA - KLAS',
            'KATL - KLAS',
        ];
        const africa = [
            'HECA - OEJN',
            'HECA - OMDB',
            'HECA - DTTA',

            'OEJN - HECA',
            'OMDB - HECA',
            'DTTA - HECA',

        ];
        const random = europe.concat(northAmerica, africa);

        const randomFlight = (random[Math.floor(Math.random() * random.length)]);
        const europanFlight = (europe[Math.floor(Math.random() * europe.length)]);
        const naFlight = (northAmerica[Math.floor(Math.random() * northAmerica.length)]);
        const africanFlight = (africa[Math.floor(Math.random() * africa.length)]);

        const randomFlightSelected = randomFlight.split(' ');
        const europanFlightSelected = europanFlight.split(' ');
        const naFlightSelected = naFlight.split(' ');
        const africanSelected = africanFlight.split(' ');

        const randomFlightEmbed = makeEmbed({
            title: 'Random Flight',
            description: makeLines([
                (randomFlight),
                ' ',
                `Dispatch via [SimBrief](${SIMBRIEF_BASE_URL}${randomFlightSelected[0]}&dest=${randomFlightSelected[2]})`,
            ]),
        });
        const europeFlightEmbed = makeEmbed({
            title: 'Random European Flight',
            description: makeLines([
                (europanFlight),
                ' ',
                `Dispatch via [SimBrief](${SIMBRIEF_BASE_URL}${europanFlightSelected[0]}&dest=${europanFlightSelected[2]})`,
            ]),
        });
        const northAmericaFlightEmbed = makeEmbed({
            title: 'Random North American Flight',
            description: makeLines([
                (naFlight),
                ' ',
                `Dispatch via [SimBrief](${SIMBRIEF_BASE_URL}${naFlightSelected[0]}&dest=${naFlightSelected[2]})`,
            ]),
        });
        const africaFlightEmbed = makeEmbed({
            title: 'Random African Flight',
            description: makeLines([
                (africanFlight),
                ' ',
                `Dispatch via [SimBrief](${SIMBRIEF_BASE_URL}${africanSelected[0]}&dest=${africanSelected[2]})`,
            ]),
        });

        //query.shift();
        //const continent = query.join('');
        //const continent = query[1] + query[2];

        if (query.length === 0) {
            await msg.channel.send({ embeds: [randomFlightEmbed] });
        } else if (query === 'europe' || query === 'eu') {
            await msg.channel.send({ embeds: [europeFlightEmbed] });
        } else if (query === 'northamerica' || query === 'na') {
            await msg.channel.send({ embeds: [northAmericaFlightEmbed] });
        } else if (query === 'africa' || query === 'af') {
            await msg.channel.send({ embeds: [africaFlightEmbed] });
        } else {
            return msg.reply(`"${randomFlightSelected[0]}" is not a valid continent!`);
        }
        return Promise.resolve();
    },
};
