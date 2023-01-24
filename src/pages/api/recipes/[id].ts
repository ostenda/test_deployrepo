import dbConnect from "lib/dbConnect";
import Recipe from "models/Recipe";

export default async function handler(req, res) {

    const {query:{id}, method } = req;

     await dbConnect();

    switch(method){
        case 'PUT':
            try {
                const recipe = await Recipe.findByIdAndUpdate(id, req.body)

                if(!recipe){
                    res.status(400).json({success: false})
                }
                
                const message = 'Repice Updated'
                res.status(201).json({success: true, result: recipe, message:message})

            } catch (error) {
                res.status(400).json({success: false, error: error, message: ' Something went wrong'})
            }
            
        break;
        case 'DELETE':
            try {
                const recipe = await Recipe.findByIdAndDelete(id)

                if(!recipe){
                    res.status(400).json({success: false})
                }
                
                const message = 'Repice  Deleted'
                res.status(201).json({success: true, result: recipe, message:message})

            } catch (error) {
                res.status(400).json({success: false, error: error, message: ' Something went wrong'})
            }
            
        break;
        default:

            res.status(400).json({success: false, message: 'Something went wrong'})
        break;
    }
    
}