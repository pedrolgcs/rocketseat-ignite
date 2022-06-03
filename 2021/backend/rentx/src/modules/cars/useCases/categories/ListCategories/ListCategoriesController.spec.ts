import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcryptjs';
import request from 'supertest';

// app
import { app } from '@shared/infra/http/app';

// database
import { createDatabaseConnection } from '@shared/infra/typeorm';

let connection: Connection;
let userToken: string;

describe('ListCategoriesController', () => {
  beforeAll(async () => {
    connection = await createDatabaseConnection();
    await connection.runMigrations();

    const passwordHash = await hash('123456', 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password, driver_license, is_admin, created_at, updated_at)
      VALUES
        (
          '${uuidv4()}',
          'admin',
          'admin@rentx.com.br',
          '${passwordHash}',
          '112233',
          true,
          'now()',
          'now()'
        )`,
    );

    const responseToken = await request(app)
      .post('/accounts/sessions/auth')
      .send({
        email: 'admin@rentx.com.br',
        password: '123456',
      });

    userToken = responseToken.body.token;
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all categories', async () => {
    await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${userToken}`,
      });

    const response = await request(app)
      .get('/categories')
      .set({
        Authorization: `Bearer ${userToken}`,
      });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
