const { checkDeviceStatus } = require('./services/iothubService');
const { sendNotificationToTeams } = require('./services/teamsService');
const { adjustTimeZone } = require('./utils/timeUtils');
const { deviceIds, intervalMinutes } = require('./config');

async function monitorDevices() {
    const devicesStatus = [];
    for (const deviceId of deviceIds) {
        try {
            const deviceStatus = await checkDeviceStatus(deviceId);
            devicesStatus.push(deviceStatus);
        } catch (error) {
            console.error(`Error checking device ${deviceId}:`, error.message);
        }
    }

    const message = devicesStatus.map(({ deviceId, isConnected, lastActivityTime }) => {
        const adjustedTime = adjustTimeZone(lastActivityTime);
        return `${deviceId}: ${isConnected ? 'Connected ✅' : 'Not Connected ❌'} LA: ${adjustedTime.toLocaleString()}`;
    }).join('\n');

    const allConnected = devicesStatus.every(device => device.isConnected);
    const someDisconnected = devicesStatus.some(device => !device.isConnected);
    const themeColor = allConnected ? '00FF00' : someDisconnected ? 'FFFF00' : 'FF0000';
    const mentionTeam = !allConnected;

    await sendNotificationToTeams(message, themeColor, mentionTeam);
}

monitorDevices();
setInterval(monitorDevices, intervalMinutes * 60 * 1000);
