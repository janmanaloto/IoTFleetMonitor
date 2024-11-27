const { checkDeviceStatus } = require('../../src/services/iothubService');

jest.mock('azure-iothub', () => ({
    Registry: {
        fromConnectionString: jest.fn(() => ({
            getTwin: jest.fn((deviceId, callback) => {
                if (deviceId === 'device1') {
                    callback(null, { connectionState: 'Connected', lastActivityTime: '2024-11-26T12:00:00Z' });
                } else {
                    callback(new Error('Device not found'));
                }
            }),
        })),
    },
}));

describe('checkDeviceStatus', () => {
    it('should return device status if device is found', async () => {
        const result = await checkDeviceStatus('device1');
        expect(result).toEqual({ deviceId: 'device1', isConnected: true, lastActivityTime: '2024-11-26T12:00:00Z' });
    });

    it('should throw an error if device is not found', async () => {
        await expect(checkDeviceStatus('device2')).rejects.toThrow('Device not found');
    });
});
