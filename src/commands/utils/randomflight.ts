import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const SIMBRIEF_BASE_URL = 'http://www.simbrief.com/system/dispatch.php?type=A20N&orig=';
const airports = require('../../lib/lists/randomflight.json');

export const randomFlight: CommandDefinition = {
    name: ['destinations', 'dest', 'random', 'randomflight'],
    description: 'Provides an idea for a random flight',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const query = msg.content.replace(/\.(destinations|dest|random|randomflight)/, ' ').toLowerCase().split(' ').join('');

        const random = airports.eu.concat(airports.na, airports.af, airports.as, airports.au, airports.sa);
        const randomFlight = (random[Math.floor(Math.random() * random.length)]).split(' ');
        const europe = (airports.eu[Math.floor(Math.random() * airports.eu.length)]).split(' ');
        const northAmerica = (airports.na[Math.floor(Math.random() * airports.na.length)]).split(' ');
        const africa = (airports.af[Math.floor(Math.random() * airports.af.length)]).split(' ');
        const asia = (airports.as[Math.floor(Math.random() * airports.as.length)]).split(' ');
        const australia = (airports.au[Math.floor(Math.random() * airports.au.length)]).split(' ');
        const southAmerica = (airports.sa[Math.floor(Math.random() * airports.sa.length)]).split(' ');

        //change emoji ID to FBW server
        const randomFlightEmbed = makeEmbed({
            title: 'Random Flight',
            description: makeLines([
                '\u200b',
                '\u200b \u200b \u200b \u200b <:pulldown:1010015265196617891><:pulllevel:1010015314257383514><:pullup:1010015293080338504>',
                `\`${randomFlight[0]} - ${randomFlight[2]}\``,
                ' ',
                `Dispatch via [SimBrief](${SIMBRIEF_BASE_URL}${randomFlight[0]}&dest=${randomFlight[2]})`,
            ]),
        });
        const europeFlightEmbed = makeEmbed({
            title: 'Random European Flight',
            description: makeLines([
                '\u200b',
                '\u200b \u200b \u200b \u200b <:pulldown:1010015265196617891><:pulllevel:1010015314257383514><:pullup:1010015293080338504>',
                `\`${europe[0]} - ${europe[2]}\``,
                ' ',
                `Dispatch via [SimBrief](${SIMBRIEF_BASE_URL}${europe[0]}&dest=${europe[2]})`,
            ]),
        });
        const northAmericaFlightEmbed = makeEmbed({
            title: 'Random North American Flight',
            description: makeLines([
                '\u200b',
                '\u200b \u200b \u200b \u200b <:pulldown:1010015265196617891><:pulllevel:1010015314257383514><:pullup:1010015293080338504>',
                `\`${northAmerica[0]} - ${northAmerica[2]}\``,
                ' ',
                `Dispatch via [SimBrief](${SIMBRIEF_BASE_URL}${northAmerica[0]}&dest=${northAmerica[2]})`,
            ]),
        });
        const africaFlightEmbed = makeEmbed({
            title: 'Random African Flight',
            description: makeLines([
                '\u200b',
                '\u200b \u200b \u200b \u200b <:pulldown:1010015265196617891><:pulllevel:1010015314257383514><:pullup:1010015293080338504>',
                `\`${africa[0]} - ${africa[2]}\``,
                ' ',
                `Dispatch via [SimBrief](${SIMBRIEF_BASE_URL}${africa[0]}&dest=${africa[2]})`,
            ]),
        });
        const asiaFlightEmbed = makeEmbed({
            title: 'Random Asian Flight',
            description: makeLines([
                '\u200b',
                '\u200b \u200b \u200b \u200b <:pulldown:1010015265196617891><:pulllevel:1010015314257383514><:pullup:1010015293080338504>',
                `\`${asia[0]} - ${asia[2]}\``,
                ' ',
                `Dispatch via [SimBrief](${SIMBRIEF_BASE_URL}${asia[0]}&dest=${asia[2]})`,
            ]),
        });
        const australiaFlightEmbed = makeEmbed({
            title: 'Random Australian Flight',
            description: makeLines([
                '\u200b',
                '\u200b \u200b \u200b \u200b <:pulldown:1010015265196617891><:pulllevel:1010015314257383514><:pullup:1010015293080338504>',
                `\`${australia[0]} - ${australia[2]}\``,
                ' ',
                `Dispatch via [SimBrief](${SIMBRIEF_BASE_URL}${australia[0]}&dest=${australia[2]})`,
            ]),
        });
        const southAmericaFlightEmbed = makeEmbed({
            title: 'Random South American Flight',
            description: makeLines([
                '\u200b',
                '\u200b \u200b \u200b \u200b <:pulldown:1010015265196617891><:pulllevel:1010015314257383514><:pullup:1010015293080338504>',
                `\`${southAmerica[0]} - ${southAmerica[2]}\``,
                ' ',
                `Dispatch via [SimBrief](${SIMBRIEF_BASE_URL}${southAmerica[0]}&dest=${southAmerica[2]})`,
            ]),
        });

        if (query.length === 0) {
            await msg.channel.send({ embeds: [randomFlightEmbed] });
        } else if (query === 'europe' || query === 'eu') {
            await msg.channel.send({ embeds: [europeFlightEmbed] });
        } else if (query === 'northamerica' || query === 'na') {
            await msg.channel.send({ embeds: [northAmericaFlightEmbed] });
        } else if (query === 'africa' || query === 'af') {
            await msg.channel.send({ embeds: [africaFlightEmbed] });
        } else if (query === 'asia' || query === 'as') {
            await msg.channel.send({ embeds: [asiaFlightEmbed] });
        } else if (query === 'australia' || query === 'au') {
            await msg.channel.send({ embeds: [australiaFlightEmbed] });
        } else if (query === 'southamerica' || query === 'sa') {
            await msg.channel.send({ embeds: [southAmericaFlightEmbed] });
        } else {
            //return msg.reply(`"${randomFlight}" is not a valid continent!`);
            return msg.reply('Use .dest or .dest <continent>');
        }
        return Promise.resolve();
    },
};
