import Navbar from "./components/navbar";
import Home from "./components/screens/home";
import Signin from "./components/screens/signin";
import Profile from "./components/screens/profile";
import Signup from "./components/screens/signup";
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
      navigate('/')
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
      <Route path="/profile" element={<Profile />} />
      <Route path="/createpost" element={<CreatePost />} />
    </Routes>
  );
};

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state:state,dispatch:dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
