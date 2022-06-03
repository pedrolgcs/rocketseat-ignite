import { Client } from 'faunadb';

const fauna = new Client({
  secret: process.env.FAUNADB_KEY as string,
  domain: 'db.us.fauna.com',
});

export { fauna };

// https://docs.fauna.com/fauna/current/drivers/javascript
// https://docs.fauna.com/fauna/current/api/fql/region_groups#how-to-use-region-groups
