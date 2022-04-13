import React, { useEffect } from "react";
import useState from "react-usestateref";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LeftBarTab from "../components/LeftBarTab";
import RightBarTab from "../components/RightBarTab";
import ActiveTabHeader from "./ActiveTabHeader";
import OpenSearchNewCases from "./openSearch/opensearchleftbar/opensearchnewcases/OpenSearchNewCases";
import OpenSearchCurrentCases from "./openSearch/opensearchleftbar/opensearchcurrentcases/OpenSearchCurrentCases";
import EstablishmentSearchContainer from "./establishmentsearch/EstablishmentSearchContainer";
import Implantation from "./Implantation/index";
import NavbarNew from "./NavbarNew";
import { Store } from "../StoreContext";
import { UpdateStore } from "../StoreContext";
import { toast } from "react-toastify";
import FolderCreationContainer from "./openSearch/opensearchleftbar/opensearchnewcases/FolderCreationContainer";
import EndedCases from "./openSearch/opensearchleftbar/opensearchendedcases/EndedCases";
import Home from "./home";
import Profile from "./profile";
import SideBar from "./SideBar";
import TeamManagement from "../components/TeamManagement";
import NavbarDashBoard from "../components/NavbarDashBoard";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import jwt from "jwt-decode";
import Modal from '@mui/material/Modal';
import CancelPresentationSharpIcon from '@mui/icons-material/CancelPresentationSharp';
import CreateAnEstablishment from "./openSearch/opensearchleftbar/opensearchnewcases/CreateAnEstablishment";
import Chat from './chat/IndexThree'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  margin:"auto",
  bgcolor: 'background.paper',
  borderRadius:'4px',
  boxShadow: "-1px 4px 20px -6px rgba(0, 0, 0, 0.75)"
};
const Body = () => {
  const [responseData, setResponseData] = useState([]);
  const [CompName, setCompName] = useState("");
  const [phoneBookDisplay, setPhoneBookDisplay] = useState(false)
  const [TeamformDisplay, setTeamFormDisplay] = useState(true);
  const [rightBarData, setRightBarData] = useState({
    videoLink: "",
    comments: "",
    assistance: "",
    sectionId: "",
    notes: "",
  });

  const [sideBar, setSideBar] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [connect, setConnect] = useState(null);
  const [state, setState, counterRef] = useState({
    connection: "",
  });
  const getResponse = (data) => {
    setResponseData(data);
  };
  // for chat open and close at dashbaord
  const handleOpen = () =>{ setOpen(true);}
  const handleClose = () => { setOpen(false);}
   ///////////////////////

  const updatestore = UpdateStore();
  const store = Store();

  useEffect(() => {
    var token = localStorage.getItem("userData");
    const userData = jwt(token);
    var roleuser = localStorage.getItem("roleSerial");
    updatestore({
      activeCase: "newcase",
      activeNavbarTab: "termine",
      userId: userData.Id,
      role: roleuser,
    });
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://fireman-chat.falconconsulting.fr/chatHub")
      .withAutomaticReconnect()
      .build();
    console.log("started", newConnection);

    setState((pre) => {
      return {
        ...pre,
        connection: newConnection,
      };
    });
    setConnect(newConnection);
    counterRef.current.connection
      .start()
      .then((res) => {
        updatestore({
          connection: newConnection,
        });
        sendid();
        //receiveNotification();
      })
      .catch((err) =>
        console.log("Error while establishing connection :(", err.message)
      );
     
  }, []);

  const sendid = async () => {
    console.log(counterRef.current.connection);
    var token = localStorage.getItem("userData");
    const userData = jwt(token);

    if (counterRef.current.connection) {
      //if(store.connection){
      try {
        const bool = true;
        const logtime = "";
        await counterRef.current.connection.send(
          "Connectionid",
          parseInt(userData.Id),
          bool,
          logtime
        );
        //store.connection.send("Connectionid",parseInt(userData.Id),bool,logtime)
      } catch (error) {
        console.log("no connection");
      }
    }
  };
  // const receiveNotification = async () => {
  //   if (counterRef.current.connection) {
  //     try {

  //       await counterRef.current.connection.on("RecieveNotification", (message) => {
  //          console.log(message);
  //         if (store.userId == message) {
  //           toast.success("New message received", {
  //             limit: "3",
  //           });
  //         }
  //         console.log("new msg ... => ", message);
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   } else {
  //     // alert("No connection to server yet.");
  //     console.log("No connection to server yet in Admin.js");
  //   }
  // };
  console.log(store);
  return (
    <>
      {store.activeNavbarTab === "termine" ? <NavbarDashBoard /> : null}
      {store.activeNavbarTab === "termine" ? "" : <NavbarNew />}
      <>
        <div
          className={
            store.activeNavbarTab === "termine" ||
            store.activeNavbarTab === 10 ||
            store.activeNavbarTab == "profile"
              ? "mainhome"
              : ""
          }
        >
          <Grid item xs={12} >
          <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{textAlign:"end", position:"relative"}}> 
          <CancelPresentationSharpIcon onClick={()=>handleClose()} sx={{position:"absolute", padding:"8.8px 8px", right:"0%", color:"#fff", background:"#314A6C"}}/> 
          </Box>
       
         <Chat/>
        </Box>
      </Modal>
    </div>
            {store.catTab ? (
              <ActiveTabHeader sideBar={sideBar} />
            ) : (
              <>
                <br />
              </>
            )}
          </Grid>
          <Grid  container >
            <Grid item xs={1} sx={{padding:"2%"}}>
              {/* <SideBar /> */}
              <LeftBarTab 
              CompName={CompName} 
              setCompName={setCompName}
              setPhoneBookDisplay={setPhoneBookDisplay}
              TeamformDisplay={TeamformDisplay} 
              setTeamFormDisplay={setTeamFormDisplay}
               getResponse={getResponse} />
            </Grid>

            {/* <<<<<<< HEAD
            <LeftBarTab
              getResponse={getResponse}
            />
        </Grid>
        <Grid item xs={8}>
          {store.activeNavbarTab===1? <EstablishmentSearchContainer/>:null }
          {store.activeNavbarTab==="currentcases"?  <OpenSearchCurrentCases currentcasesData={responseData} />:null}
          {store.activeNavbarTab===2?  <Implantation/>:null}
          {store.activeNavbarTab===10?  <Dashboard/>:null}
          // {store.activeNavbarTab==="multimedia"? <OpenSearchNewCases/>:null}
          {store.activeNavbarTab==="termine"|| store.activeNavbarTab===0? <FolderCreationSection/>:null}
          {store.activeNavbarTab==="newcases"? <EndedCases endedcases={responseData} />:null}
        </Grid>
        <Grid item xs={3}>
          <RightBarTab />
=======
          <LeftBarTab
            getResponse={getResponse}
          />
>>>>>>> 749d00fb403c9a9bbb61731639dd124743650690
        </Grid> */}
            {store.activeNavbarTab === "termine" ||
            store.activeNavbarTab === 10 ? (
              <Home  handleClose={handleClose} handleOpen={handleOpen} open={open} />
            ) : store.activeNavbarTab == "profile" ? (
              <Profile />
            ) : (
              <>
                <Grid sx={{padding:"1.7% 0%", maxHeight:"85vh", overflow:"scroll"}} className="center-grid-body" item xs={sideBar ? 8 : 10}>
                  {/* {store.activeNavbarTab===0? <FolderCreationSection/>:null} */}
                  {store.activeNavbarTab === 1 ? (
                    <EstablishmentSearchContainer />
                  ) : null}
                  {store.activeNavbarTab === "currentcases" ? (
                    <OpenSearchCurrentCases currentcasesData={responseData} CompName={CompName} setCompName={setCompName}/>
                  ) : null}
                  {store.activeNavbarTab === 2 ? (
                    <Implantation setRightBarData={setRightBarData} />
                  ) : null}
                  {store.activeNavbarTab === 0 ||
                  store.activeNavbarTab === "termine" ? (
                    <FolderCreationContainer />
                  ) : null}
                  {store.activeNavbarTab === "searchestablishment" ? (
                    <OpenSearchNewCases 
                    setPhoneBookDisplay={setPhoneBookDisplay}
                    phoneBookDisplay={phoneBookDisplay}
                    />
                  ) : null}

                  {store.activeNavbarTab === "createanestablishment" ? (
                    <CreateAnEstablishment />
                  ) : null}

                  {store.activeNavbarTab === "multimedia"
                    ? "En cours de développement"
                    : null}
                  {store.activeNavbarTab === "newcases" ? (
                    <EndedCases endedcases={responseData} />
                  ) : null}
                  {store.activeNavbarTab === "annuaire" ? (
                    <OpenSearchNewCases 
                    setPhoneBookDisplay={setPhoneBookDisplay}
                    phoneBookDisplay={phoneBookDisplay}
                    />
                  ) : null}
                  {store.activeNavbarTab === "team" ? <TeamManagement 
                  TeamformDisplay={TeamformDisplay} 
                  setTeamFormDisplay={setTeamFormDisplay}
                  /> 
                  : 
                  null}
                </Grid>
                <Grid sx={{padding:"1.7%"}} item xs={sideBar ? 3 : 1}>
                  <RightBarTab
                    sideBar={sideBar}
                    setSideBar={setSideBar}
                    rightBarData={rightBarData}
                    setRightBarData={setRightBarData}
                    handleClose={handleClose} handleOpen={handleOpen} open={open}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </div>
      </>
    </>
  );
};

export default Body;
