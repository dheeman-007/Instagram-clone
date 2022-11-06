import Navbar from "./components/navbar";
import Bottomnavbar from "./components/bottomnavbar"
import Home from "./components/screens/home";
import Feed from "./components/screens/feed"
import Signin from "./components/screens/signin";
import Profile from "./components/screens/profile";
import Signup from "./components/screens/signup";
import UserProfile from "./components/screens/userProfile";
import { UpdateProfilePic } from "./components/screens/updateProfilePic"
import { CreatePost } from "./components/screens/createPost";
import { Routes, BrowserRouter, Route, useNavigate } from "react-router-dom";
import { useEffect, createContext,useReducer,useContext } from "react";
import {initialState, reducer} from './reducers/userReducer'

export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      navigate('/signin')
    }
  },[])
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/createpost" element={<CreatePost />} />
      <Route path="/updateprofile" element={<UpdateProfilePic/>}></Route>
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/feed" element={<Feed/>}></Route>
    </Routes>
  );
};

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state:state,dispatch:dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Bottomnavbar/>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
