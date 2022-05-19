import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/signIn.component";
import { Routes, Route } from "react-router-dom";

const  App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index path='/' element={<Home/>}/>
        <Route index path='/sign-in' element={<SignIn/>}/>
      </Route>
    </Routes>  
  );
}

export default App;
