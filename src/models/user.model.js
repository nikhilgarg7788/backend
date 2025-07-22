import mongoose, {Schema} from "mongoose";
// question asked in interviews about jwt is below
// what type of token is JWT
// ans: its is a bearer token
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avtar: {
        type: String, //cloudinary url
        required: true
    },
    coverImage: {
        type: String //cloudinary url
    },
    watchHistory: [
        {
          type: Schema.Types.ObjectId,
          ref:"Video"
     }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String
    }
 },
{timestamps: true}
)

// in the below command we have created a middleware 
// which will encrypt our password

userSchema.pre("save",async function (next) {
    if(this.isModified("password")) return next(); 

    this.password = bcrypt.hash(this.password, 10)
    next()
})

// in the below command we have created a method to check 
// if the password is correct or not

userSchema.methods.isPsswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAcessToken = function(){
    jwt.sign(
         {
          _id: this.id,
          email: this.email,
          userName: this.userName,
          fullName: this.fullName
         },
         process.env.ACESS_TOKEN_SECRET,
         {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
         }
    )
}

userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
         {
          _id: this.id,
         },
         process.env.REFRESH_TOKEN_SECRET,
         {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
         }
    )
}

export const User = mongoose.model("User", userSchema)
