import Image from "next/image"
import Link from "next/link"
import {ArrowLeftOnRectangleIcon} from "@heroicons/react/24/outline"
import {signIn, signOut} from "next-auth/react"
import useSession from "../hooks/useNextAuth"

export default function Header(){

  const {data: session} = useSession()

  return(<div className='max-w-full relative'>
    <nav className="p-7 bg-orange-300 flex justify-between border-b-2 border-t-2 border-x-orange-800 fix top-0 left-0 right-0 ">
    <Link href="/">
        <Image
          alt="logo"
          layout="fixed"
          src="/img/logo.png"
          width={200}
          height={150}
          className="cursor-pointer"
        ></Image>
      </Link>
      <div className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
        <a href='/'><h1 className='m-2 font-bold transition duration-150 border-b-8 border-transparent'>Recipies</h1></a>
        <a href='/'><h1 className='m-2 font-bold transition duration-150 border-b-8 border-transparent'>Categories</h1></a>
        {session &&(<a href='/recipes/create'><h1 className='m-2 font-bold transition duration-150 border-b-8 border-transparent'>Add a recipe</h1></a>)}
        {session &&(<a href='/'><h1 className='m-2  font-bold transition duration-150 border-b-8 border-transparent'>My Recipes</h1></a>)}
      </div>
    
      <div>
          {!session && (
            <div onClick={() => signIn()} className='flex m-10'>
              <ArrowLeftOnRectangleIcon className="h-5 w-5 mt-0.5" data-test="recipe-ingredients"/>Login
            </div>
          )}
          {session && (
            <div className="p-3">
              
                <div className=""><img src={session.user.image} className="w-12 rounded-3xl"/></div>
                <div className="m-2.5"> Hi {session.user.name}</div>
              
              <div  onClick={() => signOut()} className='text-black'>
              <ArrowLeftOnRectangleIcon className="h-8 w-8 mt-0.5" />
              <h4 className="text-black">Log out</h4>
              </div>
            </div>
          )}
          
          
      </div>
    </nav>

  </div>)
}