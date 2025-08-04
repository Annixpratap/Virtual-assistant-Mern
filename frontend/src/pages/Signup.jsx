import React, { useContext, useState } from "react";
import bg from "../assets/authBG.png";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";

function Signup() {
  const [showpassword, setshowpassword] = useState(false);

  const {serverurl,UserData,setUserData} = useContext(userDataContext)
  const navigate = useNavigate()
  const[name,setName] =useState("")
  const[email,setEmail] =useState("")
  const[password,setPassword] =useState("")

  const [errorMsg, setErrorMsg] = useState("");

  const handlesignup = async (e) =>{
    e.preventDefault()
    try {
        let result = await axios.post(`${serverurl}/api/auth/signup`,{name,email,password},{withCredentials:true})
        setUserData(result.data)
        navigate("/Customize")
        
    } catch (error) {
        console.log(error);
        setUserData(null)
        setErrorMsg(error.response.data.message)
        setTimeout(() => setErrorMsg(""), 3000); // Clears after 3 seconds
    }
    
  }

  

  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form className="w-[90%] h-[600px] max-w-[500px] bg-[#0000003e] backdrop-blur-md shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px]" onSubmit={handlesignup}>
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          Register to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        <input
          type="text"
          placeholder="Enter your Name"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder:text-gray-300 px-[20px] py-[10px] rounded-3xl " required onChange={(e) => setName(e.target.value)} value = {name}
        />

        <input
          type="text"
          placeholder="Email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder:text-gray-300 px-[20px] py-[10px] rounded-3xl"
           required onChange={(e) => setEmail(e.target.value)} value = {email}
        />

        <div className="w-full h-[60px] border-2 border-white bg-transparent text-white rounded-3xl relative">
          <input
            type={showpassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full bg-transparent text-white px-[20px] rounded-3xl"
             required onChange={(e) => setPassword(e.target.value)} value = {password}
          />
          {showpassword ? (
            <FaRegEye
              className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer"
              onClick={() => setshowpassword(false)}
            />
          ) : (
            <FaRegEyeSlash
              className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer"
              onClick={() => setshowpassword(true)}
            />
          )}
        </div>

      { errorMsg.length > 0 && <p className="text-red-500">* {errorMsg}</p> }

        <button
          type="submit"
          className="min-w-[150px] h-[60px] bg-white text-black font-semibold rounded-3xl transition duration-300 hover:bg-blue-500 hover:text-white mt-[10px] text-[18px]"
        >
          Sign Up
        </button>
        <p
          className="text-white text-[18px] cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account?{" "}
          <span className="text-blue-800">Sign in</span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
