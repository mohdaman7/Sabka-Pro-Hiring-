import mongoose from 'mongoose';

export async function connectToDatabase(mongoUri: string): Promise<typeof mongoose> {
  mongoose.set('strictQuery', true);
  return mongoose.connect(mongoUri);
}

export function disconnectFromDatabase(): Promise<void> {
  return mongoose.disconnect();
}
