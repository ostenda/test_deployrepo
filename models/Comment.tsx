import {model, Model, models, Schema, Types} from "mongoose";


export interface CommentInterface {
    _id:string;
    user_id: Schema.Types.ObjectId;
    recipe_id: Schema.Types.ObjectId;
    text: string;
       
}

const commentSchema = new Schema<CommentInterface, Model<CommentInterface>>({
    user_id: {ref: 'User' ,type: Schema.Types.ObjectId},
    recipe_id: {ref: 'Recipe' ,type: Schema.Types.ObjectId},
    text: {type: String},
    
})
export default (models.Comment as Model<CommentInterface>) || model<CommentInterface>("Comment", commentSchema)

