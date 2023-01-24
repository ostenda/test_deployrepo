import type { NextApiResponse } from "next";
import dbConnect from "lib/dbConnect";
import User from "models/User";

export default async function addUser(req, res: NextApiResponse){
    try{

        await dbConnect();

        const user = await User.create(req.body)

        const message = 'User Succesfully Registered'

        res.status(201).json({success: true, result: user, message:message})

    }catch (e){

        const message = 'Something went wrong, please try again'

        res.status(400).json({success: false, error: e.toString(), message:message})
    }

}