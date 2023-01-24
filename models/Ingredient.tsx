import {model, Model, models, Schema, Types} from "mongoose";


export interface IngredientInterface {
    _id:string;
    recipe_id: Schema.Types.ObjectId;
    amount:number;    
    unit:string;    
    ingredient:string;    
}

const ingredientSchema = new Schema<IngredientInterface, Model<IngredientInterface>>({
    recipe_id: {ref: 'Recipe' ,type: Schema.Types.ObjectId},
    amount: {type: Number, required: true},
    unit: {type: String},
    ingredient: {type: String},
    
})
export default (models.Ingredient as Model<IngredientInterface>) || model<IngredientInterface>("Ingredient", ingredientSchema)

