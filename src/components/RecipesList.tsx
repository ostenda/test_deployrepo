import Recipe from "models/Recipe"

export default function RecipeList({recipes}) {

    return(
        <div  className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3" data-test="recipe-item">
            {recipes.map((recipe, i) => {           
                return (
                    <Recipe key={i} recipe={recipe}/>
                ) 
            })}
            
        </div>
    )
}