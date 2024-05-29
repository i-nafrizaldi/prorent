import App from '../../app';
import { prismaMock } from '../prisma';
import request from 'supertest';

const requestBody = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'user@mail.com',
  password: 'SecurePassword',
};

describe('POST /auth/register', () => {
  const { app } = new App();
  it('should register successfully', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);
    prismaMock.user.create.mockResolvedValueOnce({
      id: 1,
      firstName: 'mock firstName',
      lastName: 'mock lastName',
      role: 'USER',
      email: 'mock email',
      password: 'mock password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post('/api/auth/register')
      .send(requestBody);

    expect(response.status).toBe(200);
  });

  it('should return eror if email already exist', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      id: 1,
      firstName: 'mock firstName',
      lastName: 'mock lastName',
      role: 'USER',
      email: 'mock email',
      password: 'mock password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post('/api/auth/register')
      .send(requestBody);

    expect(response.status).toBe(500);
  });
});
