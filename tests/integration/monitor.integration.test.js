const { monitorDevices } = require('../../src/monitor');

jest.mock('../../src/services/iothubService');
jest.mock('../../src/services/teamsService');

describe('monitorDevices', () => {
    it('should run monitoring without errors', async () => {
        await expect(monitorDevices()).resolves.not.toThrow();
    });
});
