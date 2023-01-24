import dbConnect from "lib/dbConnect";
import { unstable_getServerSession } from "next-auth/next"
import {authOptions} from "../auth/[...nextauth]"
import User from "models/User";
import Comment from "models/Comment";

export default async function Handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions)

     if(!session){
        return res.status(401).json({success: false, message:'unauthorized'})
     }
    const { method } = req;

    await dbConnect();

    switch(method){
        case "POST":
            try {
                const user = await User.findOne({ email: session.user.email }).exec();
                               
                req.body.user_id=user._id

                const comment = await Comment.create(req.body)
                const message = "Comment Created"

                res.status(201).json({success: true, result: comment, message:message})
                
            } catch (error) {
                res.status(400).json({success: false, error: error.toString(), message: error.toString()})
            }

        break;
        default:

            res.status(400).json({success: false, message: " Something went wrong"})
        break;
    }
    
}