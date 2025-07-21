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
                    Create an account
                    </div>
                <div className="text-slate-400">
                    Already have an account 
                    <Link to={'/signin'} className="underline pl-2 ">Login</Link>
                </div>
                <div>
                    <div>
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
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> {label}</label>
            <input onChange={onChange} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </div>
}