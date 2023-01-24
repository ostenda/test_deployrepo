import dbConnect from "lib/dbConnect";
import Category from "models/Category";
import Ingredient from "models/Ingredient";
import Recipe from "models/Recipe";
import Step from "models/Step";
import User from "models/User";
import { unstable_getServerSession } from "next-auth/next"
import {authOptions} from "../auth/[...nextauth]"


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
                console.log( "Creating Recipe")
                console.log( req.body)
                const author = await User.findOne({ email: session.user.email }).exec();

                req.body.author=author._id
             
                const recipe = await Recipe.create(req.body)
                
                req.body.categories.forEach((category) => {
                    Category.create({
                        recipe_id : recipe._id,
                        name: category
                    })
                });

                req.body.ingredient_ingredients.forEach((ingredient, index) => {
                    Ingredient.create({
                        recipe_id : recipe._id,
                        amount: req.body.ingredient_amounts[index],
                        unit: req.body.ingredient_units[index],
                        ingredient: req.body?.ingredient_ingredients[index]
                    })
                });

                req.body.step_titles.forEach((step, index) => {
                    Step.create({
                        recipe_id : recipe._id,
                        title: req.body.step_titles[index],
                        content: req.body.step_contents[index],
                    })
                });
               
                const message = "Recipe Registered"

                res.status(201).json({success: true, result: recipe, message:message})

            } catch (error) {
                res.status(400).json({success: false, error: error.toString(), message: error.toString()})
            }

        break;
        default:
            res.status(400).json({success: false, message: " Something went wrong"})
        break;
    }
    
}