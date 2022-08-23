import { BrowserRouter,Route,Routes } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Home from "./Component/Home/Home";
import User from "./Component/User/User";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes >
          <Route path='/' element={<Home/>} />
          <Route path="/users/:userId" element={<User/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
