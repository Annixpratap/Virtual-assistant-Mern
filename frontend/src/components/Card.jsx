import React, { useContext } from 'react';
import { userDataContext } from '../context/usercontext';

function Card({ image }) {
  const{ serverurl,UserData,setUserData,frontendImage, setFrontendImage,backendImage, setBackendImage,selectedImage,setSelectedImage} = useContext(userDataContext)
  return (
     
    <div className={`w-[140px] h-[200px] sm:w-[160px] sm:h-[220px] md:w-[180px] md:h-[250px] bg-[#030313] border-2 border-[#0000ff5b] rounded-2xl hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white overflow-hidden ${selectedImage == image?"border-4 border-white shadow-2xl shadow-blue-950":null}`} onClick={() =>{setSelectedImage(image)
      setBackendImage(null)
      setFrontendImage(null)
    }
    }>
      <img src={image} className='w-full h-full object-cover' alt="Assistant" />
    </div>
  );
}

export default Card;
