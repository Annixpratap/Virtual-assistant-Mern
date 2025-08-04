import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Customize from "./pages/customize";
import { userDataContext } from "./context/UserContext";
import Customize2 from "./pages/Customize2";
import Home from "./pages/Home";


function App() {
  const { userData, setUserData } = useContext(userDataContext);
  return (
    <Routes>
     <Route path='/' element={(userData?.assistantImage && userData?.assistantName)? <Home/> :<Navigate to={"/customize"}/>}/>
    <Route path='/signup' element={!userData?<Signup/>:<Navigate to={"/"}/>}/>
     <Route path='/signin' element={!userData?<Signin/>:<Navigate to={"/"}/>}/>
      <Route path='/customize' element={userData?<Customize/>:<Navigate to={"/signup"}/>}/>
       <Route path='/customize2' element={userData?<Customize2/>:<Navigate to={"/signup"}/>}/>
   </Routes>
  );
}

export default App;
