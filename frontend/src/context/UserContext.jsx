import React, { createContext, useEffect, useState } from 'react'
export const userDataContext = createContext()
import axios from 'axios'

function UserContext({children}) {
    const serverurl = "http://localhost:8000"
    const [userData,setUserData] = useState(null)
     const [frontendImage, setFrontendImage] = useState(null);
      const [backendImage, setBackendImage] = useState(null);
      const [selectedImage,setSelectedImage] =useState(null);
    const handlecurrentUser=async () => {
        try {
            const result = await axios.get(`${serverurl}/api/user/current`,{withCredentials: true})
            setUserData(result.data)
            console.log(result.data)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const getGeminiResponse=async (command)=>{
try {
  const result=await axios.post(`${serverurl}/api/user/asktoassistant`,{command},{withCredentials:true})
  return result.data
} catch (error) {
  console.log(error)
}
    }
    useEffect(() => {
      handlecurrentUser()
    }, [])
    
    const value = {
        serverurl,userData,setUserData,frontendImage, setFrontendImage,backendImage, setBackendImage,selectedImage,setSelectedImage,getGeminiResponse
    }
  return (
    <div>
        <userDataContext.Provider value = {value}>
  {children}
  </userDataContext.Provider>

    </div>
  )
}

export default UserContext