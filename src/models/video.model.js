import mongoose , {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const videoSchema = new Schema(
{
    videoFile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String, // cloudinary url
        required: true
    },
    description: {
        type: String, // cloudinary url
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        typr: Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
})


videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("video", videoSchema)