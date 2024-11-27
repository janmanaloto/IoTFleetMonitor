const iothub = require('azure-iothub');
const { connectionString } = require('../config');

const registry = iothub.Registry.fromConnectionString(connectionString);

async function checkDeviceStatus(deviceId) {
    return new Promise((resolve, reject) => {
        registry.getTwin(deviceId, (err, twin) => {
            if (err) {
                reject(err);
            } else {
                resolve({ deviceId, isConnected: twin.connectionState === 'Connected', lastActivityTime: twin.lastActivityTime });
            }
        });
    });
}

module.exports = {
    checkDeviceStatus,
};
