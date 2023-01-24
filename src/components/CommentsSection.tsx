import { useState } from "react";
import { useMutation } from "react-query"
import axios from "axios";
import useSession from "../hooks/useNextAuth"

export default function CommentsSection({recipe, comments}) {

    const {isSuccess, isError, mutate} = useMutation(
        (recipe : unknown) => {
            return axios.post("/api/recipes/comment", recipe, {
                withCredentials: true});
        }
    )

    const [commentContent, setCommentContent] = useState("");
    const [commentError, setCommentError] = useState(false);

    function publishComment(object){
        if(object.text.length < 10){
            setCommentError(true)
        }else{
            setCommentError(false)
            mutate(object)
        }
           
    }
    
    const {data: session} = useSession()


    return(
        <div className='p-5 m-5 bg-orange-300 rounded-lg box-border md:box-content mx-auto w-7/12'>
            <h1 className="font-bold m-8">Comments Section</h1>
            {session && (<>
                <div>      
                    <textarea 
                        className='rounded-lg w-full' 
                        data-test="steps-content-input"
                        placeholder="Write a comment"
                        rows={5}
                        onChange={(e) => setCommentContent(e.target.value)}
                    ></textarea>
                    <h3 className="font-bold">
                        {commentError && (
                            <span data-test="name-error">Too short, please use more characters!</span>
                        )}
                    </h3>
                    <button 
                        onClick={() => 
                        publishComment({
                            recipe_id: recipe._id,
                            text: commentContent
                        })}  
                        className="m-auto flex rounded-2xl bg-white-400 w-full">
                        <div className="mb-1 mt-1 m-auto text-black font-bold">Share </div>
                    </button>

                
                </div>
            </>)}
            {!session && (<>
                <h1 className="m-5 p-5 font-bold">You have to log In to make a comments</h1>
            </>)}
            {comments.length >= 1 && (<>
                <div className="m-5 p-5 border-2 border-black rounded-2xl	">
                    {comments.map((comment, i) => {           
                    return (
                        <div key={i} className="">
                            <div className="flex mt-10">
                                <div className=""><img src={comment.user_id.image} className="w-12 rounded-3xl"/></div>
                                <div className="m-3 font-semibold">{comment.user_id.name}</div>
                            </div>
                            <div className="p-5">{comment.text}</div>
                            {i+1 != comments.length && (<>    
                                <hr className="mt-5"/>
                            </>)}
                        </div>
                        
                    )
                    })}
                </div> 
            </>)}      
        </div>
        
    )
}
