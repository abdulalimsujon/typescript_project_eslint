import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
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
    PasswordChangeAt: {
      type: Date,
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

userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook we save our data');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(user.password, 10);

  next();
});
// do empty string after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistByCustomId = async function (id: string) {
  const result = await User.findOne({ id });
  return result;
};

userSchema.statics.isPasswordMatched = async function (
  planeTextPassword,
  hashedPassword,
) {
  const isPasswordMatched = await bcrypt.compare(
    planeTextPassword,
    hashedPassword,
  );

  return isPasswordMatched;
};

userSchema.statics.isJWTissuedBeforePasswordChanged = async function (
  passwordChangeTimeStamps,
  jwtIssuedTimeStamps,
) {
  const passwordChangedTime =
    new Date(passwordChangeTimeStamps).getTime() / 1000;

  return passwordChangedTime > jwtIssuedTimeStamps;
};
export const User = model<TUser, UserModel>('User', userSchema);
