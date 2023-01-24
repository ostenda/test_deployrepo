import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import useCloudinary from "../hooks/useCloudinary";

export interface RecipeValues {
    name: string;
    dificulty: string;
    time_hours: number;
    time_minutes: number;
    number_people: number;
    categories: string[];
    ingredient_amounts: number[];
    ingredient_units: string[];
    ingredient_ingredients: string[];
    step_titles: string[];
    step_contents: string[];
    step_images: string[];
}

export interface RecipeFormProps {
    onSubmit: SubmitHandler<RecipeValues>;
    isLoading?: boolean;
    triggerReset?: boolean;
    values?: DatabaseRecipeValues;
    label?: string;
}



export interface DatabaseRecipeValues extends RecipeValues {
    _id?: string;
}

export default function RecipeCreateForm(props: RecipeFormProps) {

    const { onSubmit, isLoading, triggerReset, values } = props;
    const {
        register,
        unregister,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RecipeValues>({
        defaultValues: { ...values },
    });

    useEffect(() => {
        triggerReset && reset();
    }, [triggerReset, reset]);




    //Category
    const category = {
        id: 0,
        category: '',
    };

    const [categories, setCategories] = useState([]);

    const addCategory = () => {
        setCategories([...categories, category]);
    };

    const removeCategory = () => {
        const newArray = categories.slice(0, -1);
        setCategories(newArray)
    };

    //Ingredients
    const ingredient = {
        id: 0,
        amount: '',
        unit: '',
        ingredient: '',
    };

    const [ingredients, setIngredients] = useState([]);

    const addIngredient = () => {
        setIngredients([...ingredients, ingredient]);
    };

    const removeIngredient = () => {
        const newArray = ingredients.slice(0, -1);
        setIngredients(newArray)
    };

    //Steps

    const step = {
        id: 0,
        amount: '',
        unit: '',
        ingredient: '',
    };

    const [steps, setSteps] = useState([]);

    const addStep = () => {
        setSteps([...steps, step]);
    };

    const removeStep = () => {
        const newArray = steps.slice(0, -1);
        setSteps(newArray)
    };

    const [thumb, setThumb] = useState(values?.step_images[0] ? values?.step_images[0] : "")

    const { data: { user } } = useSession();

    const { Cloudinary } = useCloudinary();

    const handleUpload = (event) => {
        event.preventDefault()
        if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.NEXT_PUBLIC_CLOUDINARY_PRESET) {
            console.log("Enviroment variables are missing")
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const myWidget = cloudinary.createUploadWidget({
                cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
                sources: ['local', 'camera'],
                folder: "recipify" + "/" + user.email + "/"
            },
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        console.log('Done! Here is the image info: ', result.info);
                        setThumb(result.info.public_id)
                    }
                }
            )
            myWidget.open()
        }
    };


    return (
        <div className=' bg-orange-300 flex roundeditems-center justify-center '>
            <form
                onSubmit={handleSubmit((data) =>
                    onSubmit({
                        ...data,
                        ...{
                            ...{ photo: thumb }
                        }
                    })
                )}
            >
                {errors && (
                    <span data-test="building-error"> {Object.keys(errors)}</span>
                )}
                <h1 className='m-3 font-extrabold text-2xl text-black-200'>Recipe Creator</h1>
                <div className='m-3'>
                    <label htmlFor='name'><b>Name of recipe:</b></label>
                    <input
                        disabled={isLoading}
                        {...register("name", { required: true })}
                        type='text'
                        className='rounded-lg ml-12'
                        id='name'
                        name='name'
                        data-test="name-input"
                    />
                </div>


            
                <div className='m-3'>
                    
                    
                    <div className="p-2">
                        <h3 className="font-bold text-grey-600">
                            {errors.time_hours && (
                                <span data-test="hours-error"> Hours is required</span>
                            )}
                        </h3>
                        <h3 className="font-bold text-grey-600">
                            {errors.time_minutes && (
                                <span data-test="minute-error"> Minutes is required</span>
                            )}
                        </h3>
                    </div>
                </div>
                <div className='m-3 flex my-8'>
                    <label htmlFor='people' className='mt-2'><b>Number Of People:</b></label>
                    <input
                        type='number'
                        className='rounded-lg ml-5'
                        id='people'
                        name='people'
                        data-test="NoP-input"
                        disabled={isLoading}
                        {...register("number_people", { required: true })}
                    />
                </div>
                <h3 className="font-bold text-grey-600 p-2">
                    {errors.number_people && (
                        <span data-test="NoP-error"> Number of people is required</span>
                    )}
                </h3>
                <div>
                    <label htmlFor='category[]' className="m-4 flex centre"><b>Category:</b></label>
                    <div className="mt-4">
                        {categories.map((category, i) => (
                            <div key={category.id} className="m-2">
                                <div className="flex">
                                    <input
                                        type='text'
                                        className='rounded-lg '
                                        name='category'
                                        data-test="category-input"
                                        {...register(`categories.${i}`, { required: true })}
                                    />
                                    {i == categories.length - 1 &&
                                        <div onClick={() => { removeCategory(); unregister(`categories`) }}>
                                            <button><MinusCircleIcon className="m-3 font-extrabold text-2xl text-black-200" /></button>
                                        </div>
                                    }
                                </div>
                                <h3 className="m-3 font-extrabold text-2xl text-black-200">
                                    {errors.categories?.[i] && (
                                        <span data-test="category-error"> Category is required</span>
                                    )}
                                </h3>
                            </div>
                        ))}
                    </div>
                    <div onClick={addCategory} className="m-auto flex rounded-2xl bg-black-400 w-3/5">
                        <div className="m-3 font-extrabold text-2xl text-black-200" data-test="category-button">Add Category </div>
                    </div>
                    <h3 className="font-bold text-black-600 p-2">
                        {errors.categories && (
                            <span data-test="category-error">Category is required</span>
                        )}
                    </h3>
                </div>
                <div className='m-3'>
                    <label htmlFor='dificulty'><b>Dificulty:</b></label>
                    <select name='dificulty' className='rounded-lg ml-8' id='dificulty' data-test="difficulty-input"
                        disabled={isLoading}
                        {...register("dificulty", { required: true })}
                    >
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>
                </div>
                <label htmlFor='time'><b>Time:</b></label>
                    <div className='flex m-3'>
                        <input
                            type='number'
                            className='rounded-lg w-24'
                            id='time_hours'
                            name='time_hours'
                            disabled={isLoading}
                            data-test="hours-input"
                            {...register("time_hours", { required: true })}
                        /><div className='m-2'>hours</div>

                        <input
                            type='number'
                            className='rounded-lg w-24'
                            id='time_mins'
                            name='time_mins'
                            data-test="minute-input"
                            disabled={isLoading}
                            {...register("time_minutes", { required: true })}

                        /><div className='m-2'>minutes</div>
                    </div>
                <div className='m-3'>
                    <b>Ingredients:</b>
                    {ingredients.map((category, i) => (
                        <div key={category.id}>
                            <div className='m-3 flex'>
                                <input
                                    type='number'
                                    className='rounded-lg my-2 mr-1 w-24'
                                    name='ingredient_amounts[]'
                                    placeholder='Amount'
                                    data-test="ingredients-amount-input"
                                    {...register(`ingredient_amounts.${i}`, { required: true })}

                                ></input>
                                <select
                                    name='ingredient_units[]'
                                    className='rounded-lg  my-2 mr-1  w-24'
                                    data-test="ingredients-units-input"
                                    {...register(`ingredient_units.${i}`, { required: true })}
                                >
                                    <option value={null}>Units</option>
                                    <option value={"gr"}>Gr</option>
                                    <option value={"ml"}>Ml</option>
                                    <option value={"any amount"}>Any Amount</option>
                                </select>
                                <input
                                    type='text'
                                    className='rounded-lg  my-2 mr-1  w-24'
                                    name='ingredient_ingredients[]'
                                    placeholder='Ingredient'
                                    data-test="ingredient-input"
                                    {...register(`ingredient_ingredients.${i}`, { required: true })}
                                ></input>
                                {i == ingredients.length - 1 &&
                                    <div onClick={() => { removeIngredient(); unregister([`ingredient_amounts`, `ingredient_units`, `ingredient_ingredients`]) }}>
                                        <button><MinusCircleIcon className="w-8 m-2 text-rose-500" /></button>
                                    </div>
                                }
                            </div>

                        </div>
                    ))}
                    <div>
                        <h3 className="font-bold text-grey-600 p-2">
                            {errors.ingredient_amounts && (
                                <span data-test="ingredient-error"> Ingredient amounts are required</span>
                            )}
                        </h3>
                        <h3 className="font-bold text-grey-600 p-2">
                            {errors.ingredient_ingredients && (
                                <span data-test="ingredient-error"> Ingredients can´t be empty</span>
                            )}
                        </h3>
                        <h3 className="font-bold text-grey-600 p-2">
                            {errors.ingredient_units && (
                                <span data-test="ingredient-error"> Ingredient units are required</span>
                            )}
                        </h3>
                    </div>
                    <div onClick={addIngredient} className="m-auto flex rounded-2xl bg-grey-400 w-3/5">
                        <div className="m-3 font-extrabold text-2xl text-black-200" data-test="ingredients-button">Add Ingredient </div>
                    </div>
                </div>
                <div className='m-3'>
                    
                    <hr />
                    <label htmlFor='thumb' className="ml-3"><b>Photo:</b></label>
                    {thumb && (<>
                        <div className="flex border-2 border-black rounded-2xl p-2 w-2/3 m-auto mb-6 mt-6">
                            <AdvancedImage className="rounded-2xl" cldImg={Cloudinary.image(thumb).resize(thumbnail().width(150).height(150))} />
                            <TrashIcon className="w-8 h-8 cursor-pointer m-5 mt-14" onClick={() => setThumb("")} />
                        </div>
                        <hr />
                    </>)}
                    {!thumb && (<>
                        <div className='m-2 flex'>
                            <div className="flex justify-center items-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-rose-100 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-rose-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mt-5">
                                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" onClick={handleUpload} />
                                </label>
                            </div>
                        </div>
                    </>)}
                    <hr />
                    <h3 className="m-3 font-extrabold text-2xl text-black-200">
                        {errors.step_titles && (
                            <span data-test="ingredient-error"> Can´t be empty</span>
                        )}
                    </h3>
                    <h3 className="m-3 font-extrabold text-2xl text-black-200">
                        {errors.step_contents && (
                            <span data-test="ingredient-error"> Can´t be empty</span>
                        )}
                    </h3>

                   
                </div>
                <b>Steps</b>
                    {steps.map((step, i) => (
                        <div key={step.id}>
                            <div className='m-3'>
                                <div className='m-2'>
                                    <label>Title:</label>
                                    <input
                                        type='text'
                                        className='rounded-lg ml-6'
                                        name='category[]'
                                        data-test="steps-title-input"
                                        {...register(`step_titles.${i}`, { required: true })}
                                    />
                                </div>
                                <div className='m-2 mt-6 flex'>
                                    <label>Content:</label>
                                    <textarea
                                        className='rounded-lg ml-6'
                                        data-test="steps-content-input"
                                        {...register(`step_contents.${i}`, { required: true })}
                                    ></textarea>
                                </div>
                                <hr />
                                {i == steps.length - 1 &&
                                    <div onClick={() => { removeStep(); unregister([`step_titles`, `step_contents`, `step_images`]) }}>
                                        <button><MinusCircleIcon className="w-8 m-2 text-grey-500" /></button>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                <div onClick={addStep} className="m-auto flex rounded-2xl bg-grey-400 w-3/5">
                        <div className="m-3 font-extrabold text-2xl text-black-200" data-test="steps-button">Add Step </div>
                        <PlusCircleIcon className="w-8 m-2 text-black" />
                    </div>
                <input className="m-3 font-extrabold text-2xl text-black-200" type='submit' data-test="submit-button" value='Share Recipe!'></input>
            </form>



        </div>
    )
}