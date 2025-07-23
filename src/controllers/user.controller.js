import { asyncHandler } from '../utils/asyncHandler.js';
import {apierror} from "../utils/apierror.js"

// to check if the user already exists we imported user 
import {User} from  "../models/user.model.js"

//importing for uploading images on clodinary for this
// we had written code already in clodinary.js folder 
import {uploadOnCloudinary} from "../utils/cloudinary.js"
 
// importing api response to return response
import {apiresponse} from "../utils/apierror.js"



const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation(email correct hai ya nhi and more)
    // check if user already exsists: username, email
    // check for images, check for avtar
    // upload them on cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

// get user details from frontend
    const {fullName, email, password} = req.body
    console.log("email :", email);


// 1st method to check or validate
    // if(fullName === ""){
    //     throw new apierror(400, "fullName is required")
    // }

// another method to check and the better one
    if(
        [fullName, email, userName, password].some((field)=>
        field?.trim() === "")
    ){
        throw new apierror(400, " all fields are required") 
    }

// check if user already exists
    const existedUser = User.findOne({
        $or: [{ userName }, { email }]
    })

    if(existedUser){
        throw new apierror(409, "user with username or email aready exists" )
    }

// check for image, check for avatar
   const avatarLocalPath =  req.files?.avatar[0]?.path
   const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new apierror(400, "Avatar file is required")
    }

// upload them to cloudinary
// in the below command we had user await because without 
// await it will take time to upload for that we had applied
   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath) 

   if(!avatar){
        throw new apierror(400, "Avatar file is required")
    }

// create an object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase
    })

// remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )


// check for user creation
    if(!createdUser){
        throw new apierror(500, "Something went wrong while registering the user")
    }

// return response
    return res.status(201).json(
        new apiresponse(200, createdUser, "User registered succesfully")
    )


})



export {registerUser}  