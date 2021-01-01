const DiscordRPC = require('discord-rpc');
const log = require("fancy-log");

const keys = require('./keys.json');

const rpc = new DiscordRPC.Client({transport: 'ipc'});
const appClient = keys.fireworkId;
const largeImageKey = keys.imageKeys.firework;

rpc.on('ready', () => {
    log(`Connected to Discord! (${appClient})`);
    setAc();
});

function setAc() {
    const newYear = getNewYearTime();
    const currentTime = getCurrentTime();

    log(`time set to: (${newYear.getFullYear()})`);

    if (currentTime >= newYear) {
        rpc.setActivity({
            details: `It's ${newYear.getFullYear()}!!!! (GMT)`,
            state: "Happy new year",
            startTimestamp: currentTime,
            endTimestamp: newYear,
            largeImageKey: largeImageKey,
            smallImageKey: undefined,
            largeImageText: "Local Time: " + (new Date()).toLocaleTimeString(),
            smallImageText: undefined,
            instance: true,
        });

        return;
    }

    rpc.setActivity({
        details: `Counting down to ${newYear.getFullYear()}`,
        state: "Local Time: " + (new Date()).toLocaleTimeString(),
        startTimestamp: currentTime,
        endTimestamp: newYear,
        largeImageKey: largeImageKey,
        smallImageKey: undefined,
        largeImageText: `It's almost ${newYear.getFullYear()}`,
        smallImageText: undefined,
        instance: true,
    });
}


function getNewYearTime() {
    var date = new Date()

    date.setHours(0, 0, 0, 0);
    date.setDate(1);
    date.setMonth(1);
    date.setFullYear(2021);
    
    return date;
}

function getCurrentTime() {

    return new Date().getTime();
}



async function connect() {
    const client = await rpc.login({
        clientId: appClient
    });

    client.connect(appClient);
}
connect();

setInterval(setAc, 2 * 1000);

setInterval(() => {
    // setAc();
    connect();
}, 5 * 1000 * 60); // 5 minutes in ms
