import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

const connectDB = async (URI: string): Promise<void> => {
  console.log('[Database] Establishing a connection...');

  return mongoose
    .connect(URI)
    .then(() => console.log('[Database]: Connection established!'))
    .catch((err) => {
      throw err;
    });
};

export default connectDB;
