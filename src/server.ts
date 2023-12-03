import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    app.listen(config.port, () => {
      console.log(` app is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
