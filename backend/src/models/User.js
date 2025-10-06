import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['student', 'employer', 'admin'], required: true },
    firstName: { type: String },
    lastName: { type: String },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('User', userSchema);
