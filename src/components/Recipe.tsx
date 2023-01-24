
import { ArrowLongRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useMutation } from "react-query"
import axios from "axios";
import useCloudinary from "../hooks/useCloudinary";
import { AdvancedImage } from "@cloudinary/react"

export default function RecipeShow({ recipe }) {


    const { Cloudinary } = useCloudinary()

    //So just registered users can like recipes!



    return (

        <div className="rounded-3xl bg-orange-300 w-full p-8 m-5">
            <div className="flex items-center justify-center">
                <div>
                    <h1 className="mt-1 font-sans text-sm text-Black-400 font-bold">Author: {recipe.author.name}</h1>
                </div>
            </div>
            {recipe.photo && (<>
                <AdvancedImage className='rounded-3xl w-full ml-2 mt-4 mb-4 flex object-centre' cldImg={Cloudinary.image(recipe.photo)} />
            </>)}
            <div className="flex items-center justify-center align-bottom">
                {recipe.categories && recipe.categories.map((category, i) => {
                    return (
                        <div key={i}>
                            <div className="rounded-2xl text-black p-1 m-2">{category.name}</div>
                        </div>
                    )
                })}
            </div>
            <Link href={`recipes/${recipe._id}`}>
                <button className="flex text-black font-bold items-center justify-center">
                    <div className=""></div><ArrowLongRightIcon className="w-10 ml-5" />
                </button>
            </Link>
        </div>

    )
}
