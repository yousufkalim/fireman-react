// Init
import React,{useEffect} from "react";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SetAuthToken from "./utils/SetAuthToken";
import {UpdateStore} from './StoreContext'
// Files
import Index from "./routes/index";
import "./css/index.css";
// Component
function App() {
  
  let userdata = localStorage.getItem("userData");
  userdata = JSON.parse(userdata);
  if (userdata?.usertoken) {
    SetAuthToken(userdata?.usertoken);
  }
 
  
  
  return (
    <div className="App">
      {/* toastify Container for Notification */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        transition={Flip}
        limit={1}
      />
      {/* Routes */}
      <Index />
    </div>
  );
}

// Export
export default App;
