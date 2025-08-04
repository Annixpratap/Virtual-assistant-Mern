import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';

function Customize2() {
  const { userData, backendImage, selectedImage, serverurl, setUserData } = useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(userData?.assistantName || "");
  const navigate = useNavigate();

  const handleupdateassitant = async () => {
    try {
      let formData = new FormData();
      formData.append("assistantName", assistantName);

      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }

      const result = await axios.post(`${serverurl}/api/user/update`, formData, {
        withCredentials: true
      });

      console.log("Update successful:", result.data);
      setUserData(result.data); // Optionally update context
      
    } catch (error) {
      console.error("Update assistant failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col p-5">
      <h1 className="text-white mb-10 text-2xl sm:text-3xl text-center">
        Enter Your <span className="text-blue-200">Assistant Name</span>
      </h1>

      <input
        type="text"
        placeholder="eg. Jarvis"
        className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 py-2 rounded-full text-lg"
        required
        value={assistantName}
        onChange={(e) => setAssistantName(e.target.value)}
      />

      {assistantName && (
        <button
          className="min-w-[300px] h-[60px] mt-[30px] bg-white text-black font-semibold cursor-pointer rounded-full text-lg transition duration-300 hover:bg-blue-500 hover:text-white"
          onClick={handleupdateassitant}
        >
          Finally Create Your Assistant
        </button>
      )}
    </div>
  );
}

export default Customize2;
