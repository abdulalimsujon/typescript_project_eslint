import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
// import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      default: 'in-progress',
      enum: ['in-progress', 'blocked'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// -----------------pre save middleware:hooks-------------------------------->

// userSchema.pre('save', async function (next) {
//   // console.log(this, 'pre hook we save our data');

//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;

//   console.log('dd', user.password);

//   user.password = await bcrypt.hash(user.password, 10);

//   next();
// });
// do empty string after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
export const User = model<TUser>('User', userSchema);
