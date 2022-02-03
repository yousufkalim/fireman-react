import profileImage from '../../assets/profile.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from 'react';
import api from "../../api/index";






const Profile = () => {
    let [profile, setProfile] = useState({})

    useEffect(() => {
        let userId = localStorage.getItem("userData");
        userId = JSON.parse(userId);
        api("get", `/api/v1/Users/userprofile/${userId?.userid}`)
            .then((res) => {
                console.log(res);
                // localStorage.setItem('profileuser', res.firstName+ res.lastName);
                if (res.status == 200) {
                    setProfile(res.data)
                }
            })
            .catch((err) => console.log(err));
    }, [])
    return (

        <div style={{ width: "91%" }} >
            <p className='profile_heading'>PROFIL D’UTILISATEUR</p>
            <div className="profile">
                <div >
                    <img src={profile.profileImage ? profile.profileImage : profileImage} />
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
                                <input value={profile.firstName} />
                            </div>
                            <div className='input_container'>
                                <label>Nom</label>
                                <input value={profile.lastName} />
                            </div>
                        </div>
                        <div className='field_seprator' ></div>
                        <div className='input_row'>
                            <div className='input_container'>
                                <label>Adresse e-mail</label>
                                <input value={profile.email} />
                            </div>
                            <div className='input_container'>
                                <label>Numéro de téléphone</label>
                                <input value={profile.phoneNo} />
                            </div>
                        </div>
                        <div className='field_seprator'></div>
                        <div className='input_row'>
                            <div className='input_container'>
                                <label>SDIS</label>
                                <input value='SDIS 78' />
                            </div>
                            <div className='input_container'>
                                <label>Groupement</label>
                                <input value={profile.group} />
                            </div>
                        </div>
                        <div className='field_seprator'></div>
                        <div style={{ marginLeft: "104px" }} className='input_container'>
                            <label>Service</label>
                            <input value={profile.service} />
                        </div>
                        <div className='field_seprator'></div>

                        <button className='profile_form_button'>Modifier le profil</button>
                    </form>
                </div>
            </div>


        </div>

    )
}

export default Profile