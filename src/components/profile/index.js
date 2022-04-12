import profileImage from "../../assets/profileicon.png";
import dummy from "../../assets/dummy.jpeg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";
import api from "../../api/index";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Input } from "@mui/material";
import { toast } from "react-toastify";
import validator from "validator";
import { Store } from "../../StoreContext";

const Profile = () => {
  let [profile, setProfile] = useState({});
  let [image, setImage] = useState("");
  const [postImage, setPostImage] = useState("");
  let [FirstName, setFirstName] = useState("");
  let [LastName, setlastName] = useState("");
  let [PhoneNo, setPhoneNo] = useState("");
  let [Email, setEmail] = useState("");
  const [postalAddress, setpostalAddress] = useState("");

  useEffect(() => {
    getProfile();
  }, []);
  const store = Store();
  const getProfile = () => {
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    api("get", `/api/v1/Users/userprofile/${userId?.userid}`)
      .then((res) => {
        console.log("resprofile", res.data);

        if (res.status === 401) {
          localStorage.removeItem("userData");
          window.location = "/login";
        }
        if (res?.status == 200) {
          setProfile(res?.data);
          setFirstName(res?.data.firstName);
          setlastName(res?.data.lastName);
          setPhoneNo(res?.data.phoneNo);
          setEmail(res?.data.email);
          setpostalAddress(res?.data.postalAddress);
        }
      })
      .catch((err) => console.log(err));
  };
  const validatePhoneNumber = (e) => {
    const isValidPhoneNumber = validator.isMobilePhone(e.target.value);
    if (isValidPhoneNumber) {
      setPhoneNo(e.target.value);
    }
  };
  const chnageProfileImage = (e) => {
    if (e.target.files) {
      let objectURL = URL.createObjectURL(e.target.files[0]);
      setImage(objectURL);
      setPostImage(e.target.files[0]);
    }
  };

  const updateProfile = (e) => {
    e.preventDefault();
    let formData = new FormData();
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    if (!Email && !FirstName && !LastName && !PhoneNo) {
      toast.error("Please fill all requied fields");
    } else {
      if (validator.isEmail(Email)) {
        formData.append("UserId", userId?.userid);
        formData.append("FirstName", FirstName);
        formData.append("LastName", LastName);
        formData.append("Email", Email);
        formData.append("PhoneNo", PhoneNo);
        formData.append("ProfileImage", postImage);
        formData.append("ProfilePicture", "");
        formData.append("UserProfileImage", "");
        api("put", `/api/v1/Users/updateprofile`, formData).then((res) => {
          if (res.data.message == "Record updated") {
            getProfile();
            toast.success("Record updated");
          }
        });
      } else {
        toast.error("Email is not valid");
      }
    }
  };
  return (
    <div style={{ width: "91%" }}>
      <p className="profile_heading">PROFIL D’UTILISATEUR</p>
      <div className="profile">
        <div style={{ display: "flex" }}>
          <div>
            <div className="image_container">
              <img
                src={
                  profile?.profileImage
                    ? `http://160.153.249.64:6163${profile?.profilePicture?.substr(
                        37
                      )}`
                    : image
                    ? image
                    : `http://160.153.249.64:6163${profile?.profilePicture?.substr(
                        37
                      )}`
                }
              />
              <div class="overlay">
                <a class="icon" title="User Profile">
                  <label htmlFor="icon-button-file">
                    <Input
                      onChange={chnageProfileImage}
                      style={{ display: "none" }}
                      id="icon-button-file"
                      type="file"
                      inputProps={{ accept: "image/*" }}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </a>
              </div>
            </div>

            <p className="profile_name">
              {profile.firstName} {profile.lastName}
            </p>
            <div className="profile_location">
              <LocationOnIcon color="error" />
              <p>{postalAddress}</p>
            </div>
            <hr className="seprator" />
            <h5 className="des_heading">A propos de moi</h5>
            <p className="des">
              Nam suscipit felis sit amet convallis condimentum. Interdum et
              malesuada
            </p>
          </div>
          <div class="vl"></div>
        </div>
        <div className="profile_form">
          <form>
            <div className="input_row">
              <div className="input_container">
                <label>Prénom</label>
                <input
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  value={FirstName}
                />
              </div>
              <div className="input_container">
                <label>Nom</label>
                <input
                  onChange={(e) => {
                    setlastName(e.target.value);
                  }}
                  value={LastName}
                />
              </div>
            </div>
            <div className="field_seprator"></div>
            <div className="input_row">
              <div className="input_container">
                <label>Adresse e-mail</label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={Email}
                />
              </div>
              <div className="input_container">
                <label>Numéro de téléphone</label>
                <input onChange={validatePhoneNumber} value={PhoneNo} />
              </div>
            </div>
            <div className="field_seprator"></div>
            <div className="input_row">
              <div className="input_container">
                <label>SDIS</label>
                <input disabled value="SDIS 78" />
              </div>
              <div className="input_container">
                <label>Groupement</label>
                <input disabled value={profile.group} />
              </div>
            </div>
            <div className="field_seprator"></div>
            {store?.role == 2 ? null : (
              <>
                <div className="input_row">
                  <div className="input_container">
                    <label>Service</label>
                    <input disabled value={profile.service} />
                  </div>

                  <div
                    style={{ visibility: "hidden" }}
                    className="input_container"
                  >
                    <label>Groupement</label>
                    <input value={profile.group} />
                  </div>
                </div>

                <div className="field_seprator"></div>
              </>
            )}
            <button onClick={updateProfile} className="profile_form_button">
              Modifier le profil
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
