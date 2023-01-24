import {model, Model, models, Schema, Types} from "mongoose";

export interface StepInterface {
    _id:string;
    recipe_id: Schema.Types.ObjectId;
    title:string;
    content: string;
    
    
}

const stepSchema = new Schema<StepInterface, Model<StepInterface>>({
    recipe_id: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    
})
export default (models.Step as Model<StepInterface>) || model<StepInterface>("Step", stepSchema)

