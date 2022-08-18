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
            'LJLJ - LYTV', 'LYTV - LJLJ', 'LDZA - LDDU', 'LDDU - LDZA',
            'LJLJ - LDDU', 'LDDU - LJLJ', 'LDZA - EDDF', 'EDDF - LDZA',
            'LJLJ - LSZH', 'LSZH - LJLJ', 'LDZA - LIRF', 'LIRF - LDZA',
            'LJLJ - LFKJ', 'LFKJ - LJLJ', 'LDZA - LYTV', 'LYTV - LDZA',
            'LJLJ - LIRF', 'LIRF - LJLJ', 'LDZA - LSZH', 'LSZH - LDZA',
            'LJLJ - EDDF', 'EDDF - LJLJ', 'LDZA - LFKJ', 'LFKJ - LDZA',
            'LJLJ - LYPG', 'LYPG - LJLJ', 'LDZA - LOWW', 'LOWW - LDZA',
            'LJLJ - LYBE', 'LYBE - LJLJ', 'LDZA - LYBE', 'LYBE - LDZA',
            'LJLJ - LOWW', 'LOWW - LJLJ', 'LDZA - LYPG', 'LYPG - LDZA',
        ];
        const northAmerica = [
            'KLAS - KLAX', 'KLAX - KLAS', 'KLAX - KSEA', 'KSEA - KLAX',
            'KLAS - KSJC', 'KSJC - KLAS', 'KLAX - KPDX', 'KPDX - KLAX',
            'KLAS - KPDX', 'KPDX - KLAS', 'KLAX - MMLT', 'MMLT - KLAX',
            'KLAS - KBOI', 'KBOI - KLAS', 'KLAX - KABQ', 'KABQ - KLAX',
            'KLAS - KMIA', 'KMIA - KLAS', 'KLAX - KDEN', 'KDEN - KLAX',
            'KLAS - KATL', 'KATL - KLAS', 'KLAX - KGEG', 'KGEG - KLAX',
            'KLAS - KSAN', 'KSAN - KLAS', 'KLAX - KSMF', 'KSMF - KLAX',
            'KLAS - CYYC', 'CYYC - KLAS', 'KLAX - KELP', 'KELP - KLAX',
            'KLAS - KSEA', 'KSEA - KLAS', 'KLAX - KSLC', 'KSLC - KLAX',
        ];
        const africa = [
            'HECA - OEJN', 'OEJN - HECA', 'HEGN - OEJN', 'OEJN - HEGN',
            'HECA - OMDB', 'OMDB - HECA', 'HEGN - OERK', 'OERK - HEGN',
            'HECA - DTTA', 'DTTA - HECA', 'HEGN - HEBA', 'HEBA - HEGN',
            'HECA - OERK', 'OERK - HECA', 'HEGN - UDYZ', 'UDYZ - HEGN',
            'HECA - HESH', 'HESH - HECA', 'HEGN - LTFJ', 'LTFJ - HEGN',
            'HECA - HEGN', 'HEGN - HECA', 'HEGN - LTFM', 'LTFM - HEGN',
            'HECA - HAAB', 'HAAB - HECA', 'HEGN - URMM', 'URMM - HEGN',
            'HECA - FTTJ', 'FTTJ - HECA', 'HEGN - LWSK', 'LWSK - HEGN',
        ];
        const asia = [
            'RJTT - RJCC', 'RJCC - RJTT', 'RJOO - RJSS', 'RJSS - RJOO',
            'RJTT - RJFF', 'RJFF - RJTT', 'RJOO - RJFK', 'RJFK - RJOO',
            'RJTT - RJFK', 'RJFK - RJTT', 'RJOO - RJFM', 'RJFM - RJOO',
            'RJTT - RJFM', 'RJFM - RJTT', 'RJOO - RJCC', 'RJCC - RJOO',
            'RJTT - RJOA', 'RJOA - RJTT', 'RJOO - RJFT', 'RJFT - RJOO',
            'RJTT - ROAH', 'ROAH - RJTT', 'RJOO - RJSN', 'RJSN - RJOO',
            'RJTT - RKSS', 'RKSS - RJTT', 'RJOO - RJOM', 'RJOM - RJOO',
            'RJTT - RJOO', 'RJOO - RJTT', 'RJOO - RJFF', 'RJFF - RJOO',
        ];
        const australia = [
            'YSSY - YBNA', 'YBNA - YSSY', 'YMML - YCFS', 'YCFS - YMML',
            'YSSY - YMML', 'YMML - YSSY', 'YMML - YBCG', 'YBCG - YMML',
            'YSSY - YBBN', 'YBBN - YSSY', 'YMML - YPAD', 'YPAD - YMML',
            'YSSY - YSCB', 'YSCB - YSSY', 'YMML - YMHB', 'YMHB - YMML',
            'YSSY - YPAD', 'YPAD - YSSY', 'YMML - YSCB', 'YSCB - YMML',
            'YSSY - YPPH', 'YPPH - YSSY', 'YMML - NZAA', 'NZAA - YMML',
            'YSSY - YCFS', 'YCFS - YSSY', 'YMML - YBBN', 'YBBN - YMML',
            'YSSY - YBSU', 'YBSU - YSSY', 'YMML - YPPH', 'YPPH - YMML',
            'YSSY - YBCG', 'YBCG - YSSY', 'YMML - YBCS', 'YBCS - YMML',
            'YSSY - YMHB', 'YMHB - YSSY', 'YMML - YBAS', 'YBAS - YMML',
            'YSSY - NZAA', 'NZAA - YSSY', 'YMML - YAYE', 'YAYE - YMML',
            'YSSY - YBCS', 'YBCS - YSSY', 'YMML - YBRM', 'YBRM - YMML',
            'YSSY - YBAS', 'YBAS - YSSY', 'YMML - YPDN', 'YPDN - YMML',
            'YSSY - YAYE', 'YAYE - YSSY', 'YMML - YBTL', 'YBTL - YMML',
            'YSSY - YBTL', 'YBTL - YSSY', 'YMML - YBPN', 'YBPN - YMML',
            'YSSY - YBPN', 'YBPN - YSSY', 'YMML - YBHM', 'YBHM - YMML',
        ];
        const random = europe.concat(northAmerica, africa, asia, australia);

        const randomFlight = (random[Math.floor(Math.random() * random.length)]);
        const europanFlight = (europe[Math.floor(Math.random() * europe.length)]);
        const naFlight = (northAmerica[Math.floor(Math.random() * northAmerica.length)]);
        const africanFlight = (africa[Math.floor(Math.random() * africa.length)]);
        const asianFlight = (asia[Math.floor(Math.random() * asia.length)]);
        const australianFlight = (australia[Math.floor(Math.random() * australia.length)]);

        const randomFlightSelected = randomFlight.split(' ');
        const europanFlightSelected = europanFlight.split(' ');
        const naFlightSelected = naFlight.split(' ');
        const africanFlightSelected = africanFlight.split(' ');
        const asianFlightSelected = asianFlight.split(' ');
        const australianFlightSelected = australianFlight.split(' ');

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
                `Dispatch via [SimBrief](${SIMBRIEF_BASE_URL}${africanFlightSelected[0]}&dest=${africanFlightSelected[2]})`,
            ]),
        });
        const asiaFlightEmbed = makeEmbed({
            title: 'Random Asian Flight',
            description: makeLines([
                (asianFlight),
                ' ',
                `Dispatch via [SimBrief](${SIMBRIEF_BASE_URL}${asianFlightSelected[0]}&dest=${asianFlightSelected[2]})`,
            ]),
        });
        const australianFlightEmbed = makeEmbed({
            title: 'Random Australian Flight',
            description: makeLines([
                (australianFlight),
                ' ',
                `Dispatch via [SimBrief](${SIMBRIEF_BASE_URL}${australianFlightSelected[0]}&dest=${australianFlightSelected[2]})`,
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
            await msg.channel.send({ embeds: [australianFlightEmbed] });
        } else {
            return msg.reply(`"${randomFlightSelected[0]}" is not a valid continent!`);
        }
        return Promise.resolve();
    },
};
