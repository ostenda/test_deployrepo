import {model, Model, models, Schema, Types} from "mongoose";

export interface UserInterface {
    _id:string;
    email:string;
    password:string;
    first_name:string;
    last_name:string;
    role:string;
    status:string;
    created_at: Date;
    edited_at: Date;

}

const userSchema = new Schema<UserInterface, Model<UserInterface>>({

    email: {type: String},
    password: {type: String},
    first_name: {type: String},
    last_name: {type: String},
    role: {type: String},
    status: {type: String},
    created_at: {type:Date},
    edited_at: {type:Date},
    
})
export default (models.User as Model<UserInterface>) || model<UserInterface>("User", userSchema)
