import profileImage from '../../assets/profileicon.png';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from 'react';
import api from "../../api/index";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Input } from '@mui/material';
import { display } from '@mui/system';
import { toast } from "react-toastify";



const Profile = () => {
    let [profile, setProfile] = useState({})
    let [image, setImage] = useState("")
    let[FirstName,setFirstName]=useState("")
    let[LastName,setlastName]=useState("")
    let[PhoneNo,setPhoneNo]=useState("")
    let[Email,setEmail]=useState("")





    useEffect(() => {
        let userId = localStorage.getItem("userData");
        userId = JSON.parse(userId);
        api("get", `/api/v1/Users/userprofile/${userId?.userid}`)
            .then((res) => {
                if (res.status == 200) {
                    setProfile(res.data)
                    setFirstName(res.data.firstName);
                    setlastName(res.data.lastName);
                    setPhoneNo(res.data.phoneNo);
                    setEmail(res.data.email);
                }
            })
            .catch((err) => console.log(err));
    }, [])

 const chnageProfileImage=(e)=>{
     if(e.target.files){
        let objectURL = URL.createObjectURL(e.target.files[0])
        setImage(objectURL)
        console.log(image)

     }
 }
 const updateProfile=(e)=>{
    e.preventDefault()
    let formData = new FormData();
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    formData.append('UserId',userId?.userid)
    formData.append('FirstName',FirstName)
    formData.append('LastName',LastName)
    formData.append('Email',Email)
    formData.append('PhoneNo',PhoneNo)

    api("put", `/api/v1/Users/updateprofile`,formData).then((res)=>{
        if(res.data.message=="Record updated"){
            toast.success("Record updated");
        }
    })

 }
    console.log("profile", profile)
    return (

        <div style={{ width: "91%" }} >
            <p className='profile_heading'>PROFIL D’UTILISATEUR</p>
            <div className="profile">
                <div >
                    <div className='image_container'>
                        <img src={profile.profileImage ? profile.profileImage : image ? image:profileImage} />
                        <div class="overlay">
                            <a class="icon" title="User Profile">
                                <label htmlFor="icon-button-file">
                                    <Input onChange={chnageProfileImage} style={{ display: "none" }} accept="image/*" id="icon-button-file" type="file" />
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </a>
                        </div>
                    </div>

                    <p className='profile_name'>{profile.firstName} {profile.lastName}</p>
                    <div className='profile_location'>
                        <LocationOnIcon color='error' />
                        <p>Paris, France</p>
                    </div>
                    <hr className='seprator' />
                    <h5 className='des_heading'>A propos de moi</h5>
                    <p className='des'>Nam suscipit felis sit amet convallis condimentum. Interdum et malesuada</p>
                </div>
                <div class="vl"></div>
                <div className='profile_form'>
                    <form>
                        <div className='input_row'>
                            <div className='input_container'>
                                <label>Prénom</label>
                                <input onChange={(e)=>{setFirstName(e.target.value)}} value={FirstName} />
                            </div>
                            <div className='input_container'>
                                <label>Nom</label>
                                <input onChange={(e)=>{setlastName(e.target.value)}} value={LastName} />
                            </div>
                        </div>
                        <div className='field_seprator' ></div>
                        <div className='input_row'>
                            <div className='input_container'>
                                <label>Adresse e-mail</label>
                                <input onChange={(e)=>{setEmail(e.target.value)}} value={Email} />
                            </div>
                            <div className='input_container'>
                                <label>Numéro de téléphone</label>
                                <input onChange={(e)=>{setPhoneNo(e.target.value)}} value={PhoneNo} />
                            </div>
                        </div>
                        <div className='field_seprator'></div>
                        <div className='input_row'>
                            <div className='input_container'>
                                <label>SDIS</label>
                                <input disabled value='SDIS 78' />
                            </div>
                            <div className='input_container'>
                                <label>Groupement</label>
                                <input disabled value={profile.group} />
                            </div>
                        </div>
                        <div className='field_seprator'></div>
                        <div className='input_row'>
                            <div className='input_container'>
                                <label>Service</label>
                                <input disabled value={profile.service} />
                            </div>
                            <div style={{ visibility: "hidden" }} className='input_container'>
                                <label>Groupement</label>
                                <input value={profile.group} />
                            </div>
                        </div>

                        <div className='field_seprator'></div>

                        <button onClick={updateProfile} className='profile_form_button'>Modifier le profil</button>
                    </form>
                </div>
            </div>


        </div>

    )
}

export default Profile