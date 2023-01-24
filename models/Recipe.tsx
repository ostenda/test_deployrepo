import {model, Model, models, Schema} from "mongoose";
import User from "../models/User"
    // author: string;

export interface RecipeInterface {
    _id:string;
    author: Schema.Types.ObjectId;
    name:string;
    dificulty:string;
    time_hours: number;
    time_minutes: number;
    number_people: number;
    photo: string;
}
 // author: {ref: User ,type: String, required: true},
const recipeSchema = new Schema<RecipeInterface, Model<RecipeInterface>>({
    author: {ref: 'User' ,type: Schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    dificulty: {type: String, required: true},
    time_hours: {type: Number, required: true},
    time_minutes: {type: Number, required: true},
    number_people: {type: Number, required: true},
    photo: {type: String, required: true},

})
export default (models.Recipe as Model<RecipeInterface>) || model<RecipeInterface>("Recipe", recipeSchema)

