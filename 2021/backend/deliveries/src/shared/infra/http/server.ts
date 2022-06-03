import { app } from './app';

const { PORT = 3000 } = process.env;

app.listen(PORT, () => console.log(`🚀 server is running on port ${PORT}`));
