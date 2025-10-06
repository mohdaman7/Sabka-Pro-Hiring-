import mongoose, { Document, Schema } from 'mongoose';

export type UserRole = 'student' | 'employer' | 'admin';

export interface UserDocument extends Document {
  email: string;
  passwordHash: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['student', 'employer', 'admin'], required: true },
    firstName: { type: String },
    lastName: { type: String },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
