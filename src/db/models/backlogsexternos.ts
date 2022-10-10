import { Schema } from 'mongoose';
const { String, Number, ObjectId, Boolean, Date, Mixed } = Schema.Types;

const schema = new Schema(
    {
        api: { type: String, required: false, default: '' },
        logDate: { type: Date, required: false, default: null },
        request: { type: Mixed, required: false, default: {} },
        response: { type: Mixed, required: false, default: {} },
        app: { type: String, required: false, default: 'externa' },
        statusCode: { type: String, required: false, default: '' },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default schema;