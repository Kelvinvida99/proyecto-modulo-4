import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { beforeEach } from 'node:test';
import { Users } from '../entities/users.entity';

describe('UsersService', () => {
  let service: UsersService;

  const mockUser: Partial<Users> = {
    name: 'John Doe88',
    email: 'johndoe88@example.com',
    password: '#Secure123',
    phone: 1234567891,
    country: 'Estados Unidos',
    address: '1234 Elm Street',
    city: 'Springfield',
    birthday: '1990-01-01',
  };

  beforeEach(async () => {
    const mockUsersRepository = {
      find: jest
        .fn()
        .mockResolvedValue([
          { ...mockUser, id: 'sfjlsjfs-4s65f4s6s-s4f65s16f' },
        ]),
      findOne: jest.fn().mockResolvedValue({
        ...mockUser,
        id: 'sfjlsjfs-4s65f4s6s-s4f65s16f',
        isAdmin: false,
        orders: ['s4f5s64f65s-4s564f6s4f6s-s13fw9fs4'],
      }),
      save: jest.fn().mockResolvedValue({ ...mockUser, id: 'new-id' }),
      update: jest.fn().mockResolvedValue(undefined),
      delete: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockUsersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('it should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get user by id', async () => {
    const result = await service.getUserById('sfjlsjfs-4s65f4s6s-s4f65s16f');
    expect(result).toBeDefined();
    expect(result).toHaveProperty('name', 'John Doe88');
    expect(result).toHaveProperty('email', 'johndoe88@example.com');
  });
});
