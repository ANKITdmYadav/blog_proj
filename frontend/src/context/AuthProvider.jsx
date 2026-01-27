import axios from 'axios'
import React,{createContext, useEffect, useContext,useState} from 'react'
import Cookies from 'js-cookie'

export const AuthContext=createContext()

export const AuthProvider=({children})=> {
    const [blogs,setBlogs]=useState()
    const [profile, setProfile] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
              // token should be let type variable because its value will change in every login. (in backend also)
              // const cook=Cookies.get('jwt')
              // console.log(cook);
              
              let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage (Go to login.jsx)
              // console.log("come here token",token);
              if (token) {
                const {data} = await axios.get(
                  "http://localhost:3000/api/users/my-profile",
                  {
                    withCredentials: true,
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                // console.log(response)
                console.log(data.user);
                setProfile(data.user);
                setIsAuthenticated(true);
              }
            } catch (error) {
              console.log(error);
            }
          };

      const fetchBlogs=async()=>{
        try{
            console.log("logintoken")
            const response=await axios.get(
                "http://localhost:3000/api/blogs/all-blogs",
            )
            console.log(response)
            setBlogs(response.data)
        }
        catch(error){
            console.log(error);
        }
      }
      fetchBlogs()
      fetchProfile()
    }, [])
    

    return (
        <AuthContext.Provider
          value={{
            blogs,
            profile,
            setProfile,
            isAuthenticated,
            setIsAuthenticated,
          }}
        >
          {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext)
