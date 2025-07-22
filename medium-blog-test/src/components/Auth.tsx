import { useState, type ChangeEvent } from "react"
import { Link } from "react-router-dom"

export const Auth = ({type}:{type: 'signup' | 'signin'}) => {

    const [ postInputs , SetpostInputs ] = useState({
        name:"",
        username: "",
        password: ""
    });

    return(
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center ">
                <div className="px-10 ">
                    <div className="text-3xl font-extrabold">
                    {type === 'signin' ? "login into your account" : "Create an account"}
                    </div>
                <div className="text-slate-600">
                    { type === 'signup' ? "Already have an account" : "Don't have an account"} 
                    <Link to={ type === "signin"?"/signup":"/signin" } className="underline pl-2 ">{ type === 'signin'?"Signup":"login"}</Link>
                </div>
                <div>
                    <div className="pt-4">
                    <Labledinput label="Name" placeholder="Alex..." onChange={(e)=>{
                    SetpostInputs(c =>({
                        ...c,
                        name: e.target.value,
                    }))
                }}/>
                </div>
                <div>
                    <Labledinput type="text" label="username" placeholder="xyz@gmail.com" onChange={
                        (e)=>{
                            SetpostInputs(c=>({
                                ...c,
                                username: e.target.value,
                            }))
                        }
                    }/>
                </div>
                <div>
                    <Labledinput type="password" label="password" placeholder="xyz@123" onChange={(e)=>{
                        SetpostInputs(c=>({
                            ...c,
                            password: e.target.value,
                        }))
                    }} />
                </div>
                <button type="button" className=" mt-3 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{ type === "signin" ? "Sign In" : "Sign Up "}</button>

                </div>
                </div>
                
                
            </div>
        </div>
    )
}

interface LabledinputType {
    label : string,
    placeholder : string,
    onChange : (e: ChangeEvent<HTMLInputElement>)=>void,
    type?: string
}

function Labledinput ({ label , placeholder , onChange , type }: LabledinputType ){
    return <div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-4"> {label}</label>
            <input onChange={onChange} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </div>
}
