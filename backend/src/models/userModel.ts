import mongoose, { Schema } from 'mongoose';

type UserSchema = {
    name: string;
    email: string;
    password: string;
};

const userSchema = new Schema<UserSchema>(
    {
        name: {
            type: Schema.Types.String,
            required: [true, 'Name is required!'],
        },
        email: {
            type: Schema.Types.String,
            required: [true, 'Email is required!'],
            unique: true,
        },
        password: {
            type: Schema.Types.String,
            required: [true, 'Password is required!'],
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
