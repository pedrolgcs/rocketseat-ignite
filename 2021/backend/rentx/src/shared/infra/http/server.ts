import { app } from './app';

const { PORT = 3333 } = process.env;

app.listen(PORT, () =>
  console.log(`🔥 server running on http://localhost:${PORT}`),
);
