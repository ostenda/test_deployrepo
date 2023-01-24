import { useState } from "react";
import useCloudinary from "../hooks/useCloudinary";
import { AdvancedImage } from "@cloudinary/react"

export default function RecipeShow({ recipe, categories, ingredients, steps }) {

    const { Cloudinary } = useCloudinary()

    const [index, setIndex] = useState(0);
    const [title, setTitle] = useState(steps[0].title);
    const [content, setContent] = useState(steps[0].content);


    function NextStep() {
        setIndex(index + 1)
        setTitle(steps[index + 1].title)
        setContent(steps[index + 1].content)
    }
    function StepBack() {
        setIndex(index - 1)
        setTitle(steps[index - 1].title)
        setContent(steps[index - 1].content)
    }

    return (
        <div className='p-5 m-5 bg-orange-300 rounded-lg mx-auto w-8/12'>
            <div id='header' className='bg-orange-300 m-10'>
                <h1 className='mt-1 font-sans text-sm text-Black-400 font-bold '>Recipe {recipe.name}</h1>
                {categories.map((category, i) => {
                    return (
                        <div key={i}>
                            <div className="mt-1 font-sans text-sm text-Black-400 font-bold">{category.name}</div>
                        </div>
                    )
                })}
                <h1>By:  {recipe.author.name}</h1>
                {recipe.photo && (<>
                    <AdvancedImage className='rounded-3xl w-10/12 m-auto mt-4 mb-4' cldImg={Cloudinary.image(recipe.photo)} />
                </>)}
                
            </div>
            <hr />
            <div id='title' className=' m-10 flex-wrap '>
                <h1 className='mt-1 font-sans text-sm text-Black-400 font-bold '>Time: {recipe.time_hours}h {recipe.time_minutes}min</h1>
                <h1 className='mt-1 font-sans text-sm text-Black-400 font-bold'>Dificulty: {recipe.dificulty} </h1>
                <h1 className='mt-1 font-sans text-sm text-Black-400 font-bold'>Ingredients: </h1>
                {ingredients.map((ingredient, i) => {
                    return (
                        <div key={i}>
                            <li className="p-1 m-2 flex-wrap">{ingredient.amount} {ingredient.unit} {ingredient.ingredient}</li>
                        </div>
                    )
                })}
            </div>
            <hr />
            <div id='body' className=' m-10'>
                <div className='p-5 m-5'>
                    <div className="m-5">
                        Step {index + 1} out of {steps.length}
                    </div>
                    <div className="m-5">
                        {title}
                    </div>
                    <div className="m-5">
                        {content}
                    </div>
                    <div className="flex">
                        {index != 0 && (<>
                            <button onClick={StepBack} className="m-auto flex rounded-2xl w-2/5">
                                <div className="mb-1 mt-1 m-autofont-bold">Back </div>
                            </button>
                        </>)}
                        {index + 1 != steps.length && (<>
                            <button onClick={() => NextStep()} className="m-auto flex rounded-2xlw-2/5">
                                <div className="mb-1 mt-1 m-auto font-bold">Next </div>
                            </button>
                        </>)}
                    </div>
                </div>
            </div>
        </div>
    )
}





