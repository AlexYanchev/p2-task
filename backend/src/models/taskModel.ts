import mongoose, { Schema } from 'mongoose';

type TaskSchema = {
    text: string;
    user: Schema.Types.ObjectId;
};

const taskSchema = new Schema<TaskSchema>(
    {
        text: {
            type: Schema.Types.String,
            required: [true, 'Please add a text value'],
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const TaskModel = mongoose.model('Task', taskSchema);

export default TaskModel;
