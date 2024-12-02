import allowSetCreation from '../../../src/functions/sets/AllowSetCreation';
import getSetCreationLimitConfig from '../../../src/queries/system-config/GetSetCreationLimitConfig';
import { db } from '../../../src/Server';
import JWTData from '../../../src/types/JWTData';
import SystemConfig from '../../../src/types/SystemConfig';

jest.mock('../../../src/queries/system-config/GetSetCreationLimitConfig', () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock('../../../src/Server');

const getSetCreationLimitConfigMock = getSetCreationLimitConfig as jest.MockedFunction<typeof getSetCreationLimitConfig>;

describe('allowSetCreation', () => {
    const mockUserDate: JWTData = {
        isAdmin: false,
        uuid: 'test-user-id',
        username: 'test-user',
    };
    const mockAdminDate: JWTData = {
        isAdmin: true,
        uuid: 'admin-user-id',
        username: 'admin-user',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 200 if user is an admin', async () => {
        const result = await allowSetCreation(mockAdminDate);
        expect(result).toBe(200);
    });

    it('should return 404 if set limit config is not found', async () => {
        getSetCreationLimitConfigMock.mockResolvedValue(null);
        const result = await allowSetCreation(mockUserDate);
        expect(getSetCreationLimitConfigMock).toHaveBeenCalled();
        expect(result).toBe(404);
    });

    it('should return 429 if creation counter has reached the limit for today', async () => {
        const mockConfig: SystemConfig = {
            configUUID: 'config-id',
            currentDate: new Date(),
            creationCounter: 10,
            setCreationLimit: 10,
        };
        (getSetCreationLimitConfig as jest.Mock).mockResolvedValue(mockConfig);
        const result = await allowSetCreation(mockUserDate);
        expect(result).toBe(429);
    });

    it('should return 500 if there is an error updating the creation counter', async () => {
        const mockConfig: SystemConfig = {
            configUUID: 'config-id',
            currentDate: new Date(),
            creationCounter: 5,
            setCreationLimit: 10,
        };
        (getSetCreationLimitConfig as jest.Mock).mockResolvedValue(mockConfig);
        (db.systemConfig.update as jest.Mock).mockRejectedValue(new Error('Update error'));
        const result = await allowSetCreation(mockUserDate);
        expect(result).toBe(500);
    });

    it('should return 200 and increment the creation counter if under the limit', async () => {
        const mockConfig: SystemConfig = {
            configUUID: 'config-id',
            currentDate: new Date(),
            creationCounter: 5,
            setCreationLimit: 10,
        };
        (getSetCreationLimitConfig as jest.Mock).mockResolvedValue(mockConfig);
        (db.systemConfig.update as jest.Mock).mockResolvedValue({});
        const result = await allowSetCreation(mockUserDate);
        expect(result).toBe(200);
        expect(db.systemConfig.update).toHaveBeenCalledWith({
            where: { configUUID: '7d6456e7-53f9-4d23-a547-a2590dd5bc30' },
            data: { creationCounter: 6 },
        });
    });

    it('should return 500 if there is an error resetting the creation counter', async () => {
        const mockConfig: SystemConfig = {
            configUUID: 'config-id',
            currentDate: new Date(new Date().setDate(new Date().getDate() - 1)),
            creationCounter: 5,
            setCreationLimit: 10,
        };
        (getSetCreationLimitConfig as jest.Mock).mockResolvedValue(mockConfig);
        (db.systemConfig.update as jest.Mock).mockRejectedValue(new Error('Update error'));
        const result = await allowSetCreation(mockUserDate);
        expect(result).toBe(500);
    });

    it('should return 200 and reset the creation counter for a new day', async () => {
        const mockConfig: SystemConfig = {
            configUUID: 'config-id',
            currentDate: new Date(new Date().setDate(new Date().getDate() - 1)),
            creationCounter: 5,
            setCreationLimit: 10,
        };
        (getSetCreationLimitConfig as jest.Mock).mockResolvedValue(mockConfig);
        (db.systemConfig.update as jest.Mock).mockResolvedValue({});
        const result = await allowSetCreation(mockUserDate);
        expect(result).toBe(200);
        expect(db.systemConfig.update).toHaveBeenCalledWith({
            where: { configUUID: '7d6456e7-53f9-4d23-a547-a2590dd5bc30' },
            data: { creationCounter: 1, currentDate: new Date() },
        });
    });
});
