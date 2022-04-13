
import api from "../../api/index";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
const HomeLeft = ({ 
  setProg,
  setActiveBlock, 
  handleOpen,
  open 
}) => {
  let [counts, setCount] = useState({});
  let [projects, setProjects] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState("")
  let [profile, setProfile] = useState({});
  useEffect(() => {
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    api("get", `/api/v1/Users/userprofile/${userId?.userid}`)
      .then((res) => {
        if (res.status == 200) {
          setProfile(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    CountsData();
    getLatest();
  }, []);
  const CountsData = () => {
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    api(
      "get",
      `/api/v1/dashboard/casefiles_userwise_count_frontend/${userId?.userid}`
    ).then((res) => {
      if (res.status == 200) {
        setCount(res.data);
        setProg(res.data.completed);
      }
    });
    api(
      "get",
      `/api/v1/chatting/get_user_unread_messages/${userId?.userid}`
    ).then((res) => {
      if (res.status == 200) {
        setUnreadMessages(res?.data)
      }
    });

    getLatest(userId);
  };
  const getLatest = () => {
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    api(
      "get",
      `/api/v1/dashboard/latest_casefiles_frontend/0/${
        userId && userId?.userid
      }`
    ).then((res) => {
      if (res.status == 200) {
        setProjects(res.data);
      }
    });
  };
  const chatOpen =()=>{
    handleOpen()
  }
  console.log(counts);
  return (
    <>
      <Box className="parent-left-box">
        <Box className="heading1">
          {" "}
          <p>
            Bonjour  {profile?.firstName || profile?.lastName?  profile?.firstName + " " + profile?.lastName:"Chargement..."}, vous avez :{" "}
          </p>{" "}
        </Box>
        <Box className="countData">
          <Box  className="cursor" onClick={() => {
                      setActiveBlock(() => {
                        return {
                          main: false,
                          itemone: true,
                          itemtwo: false,
                          itemthree: false,
                        };
                      });
                    }} sx={{ width: "38%" }}>
            <p className="count">{counts?.completed ? counts?.completed : 0}</p>
            {counts?.completed === 0 ||
            !counts?.completed ||
            counts?.completed === 1 ? (
              <p className="count_des">DOCUMENT TERMINÉ</p>
            ) : (
              <p className="count_des">DOCUMENTS TERMINÉS</p>
            )}
          </Box>
          <Box className="cursor" onClick={chatOpen}  sx={{ width: "38%" }}>
            <p className="count">
              {unreadMessages ? unreadMessages : 0}
            </p>
            {unreadMessages === 0 ||
            !unreadMessages ||
            unreadMessages == 1 ? (
              <p className="count_des">MESSAGE RECU</p>
            ) : (
              <p className="count_des">MESSAGES RECUS</p>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomeLeft;
