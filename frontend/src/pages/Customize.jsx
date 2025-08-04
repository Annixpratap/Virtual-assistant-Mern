import React, { useState, useRef, useContext } from 'react';
import Card from '../components/card';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/authBg.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.jpeg';
import image7 from '../assets/image7.jpeg';
import { FaRegFileImage } from "react-icons/fa";
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Customize() {
  const{ serverurl,UserData,setUserData,frontendImage, setFrontendImage,backendImage, setBackendImage,selectedImage,setSelectedImage} = useContext(userDataContext)
  const inputImage = useRef();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col justify-between items-center py-10 px-4">

      {/* Heading */}
      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center">
        Select your <span className="text-blue-400">Assistant Image</span>
      </h1>

      {/* Image Cards */}
      <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        {/* Upload Image Card */}
        <div
          className={`w-[140px] h-[200px] sm:w-[160px] sm:h-[220px] md:w-[180px] md:h-[250px] bg-[#030313] border-2 border-[#0000ff5b] rounded-2xl hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center ${selectedImage == "input"?"border-4 border-white shadow-2xl shadow-blue-950":null}` }
          onClick={() => {inputImage.current.click()
            setSelectedImage("input")

          }
             
          }
         

        >
          {!frontendImage && <FaRegFileImage className="text-white w-[25px] h-[25px]" />}
          {frontendImage && (<img src={frontendImage} className='h-full object-cover'/>)}
          
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setFrontendImage(URL.createObjectURL(file));
              setBackendImage(file); // store actual file to send to backend later
              console.log("Frontend preview:", URL.createObjectURL(file));
              console.log("Backend file object:", file);
            }
          }}
        />
      </div>

      {/* NEXT Button */}
      {selectedImage && <button className="mt-10 px-8 py-3 bg-white text-black font-semibold rounded-full transition duration-300 hover:bg-blue-500 hover:text-white text-lg" onClick={()=>navigate("/Customize2")}>
        Next
      </button>}
    </div>
  );
}

export default Customize;
