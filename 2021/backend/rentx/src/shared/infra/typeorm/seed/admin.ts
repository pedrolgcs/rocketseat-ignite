import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcryptjs';

import { createDatabaseConnection } from '../index';

async function create() {
  const connection = await createDatabaseConnection();

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

  await connection.close();
}

create()
  .then(() => console.log('User admin created!'))
  .catch(err => console.error('Error when saving user', err));
