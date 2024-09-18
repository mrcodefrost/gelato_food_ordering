import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add/Add.jsx";
import List from "./pages/List/List.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import { url } from "./assets/assets.js";

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {Route, Routes} from "react-router-dom";


const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
        <Route path="/add" element={<Add url={url}/>} />
        <Route path="/list" element={<List url={url}/>} />
        <Route path="/orders" element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  )
};

export default App;