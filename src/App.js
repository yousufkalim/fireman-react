// Init
import React, { useEffect } from "react";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SetAuthToken from "./utils/SetAuthToken";
// Files
import Index from "./routes/index";
import "./css/index.css";

// Component
function App(props) {
  console.log(props);
  let token = localStorage.getItem("UserToken");
  useEffect(() => {
    if (token) {
      SetAuthToken(token);
    }
  }, [token]);

  return (
    <div className="App">
      {/* toastify Container for Notification */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        transition={Flip}
      />

      {/* Routes */}
      <Index />
    </div>
  );
}

// Export
export default App;
