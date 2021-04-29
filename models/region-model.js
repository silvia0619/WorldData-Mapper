const { model, Schema, ObjectId } = require('mongoose');

const regionSchema = new Schema(
    {
        _id: {
            type: ObjectId,
            required: true
        },
        parentId: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        owner: {
            type: String
        },
        capital: {
            type: String
        },
        leader: {
            type: String
        },
	    landmarks: {
            type: [String]
        }
    }, { timestamps: true }
);


const Region = model('Region', regionSchema);
module.exports = Region;