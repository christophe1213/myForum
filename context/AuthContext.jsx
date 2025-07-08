import { createContext, useContext, useState } from "react";

const AuthContext= createContext({
    user:{
        id:'ss',
        name:'',
        
    },
    logIn:()=>{},
    logout:()=>{}
})

export const useAuth=()=>{
   return useContext(AuthContext)
}
   



const  AuthProvider=({children})=>{
    const [user,setUser]=useState({
        id:'',
        name:'non inti',
    })
    const logIn=(u)=>{
        console.log(u)
        setUser(u)
    }
    const logout=()=>{
        setUser({
               id:'',
        name:'',
        })
    }

    return(
        <>
            <AuthContext.Provider value={{user:user,logIn,logout}}>
                {children}
            </AuthContext.Provider>
        </>

    )

}
export default AuthProvider