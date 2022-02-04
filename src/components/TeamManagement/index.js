import profileImage from '../../assets/profile.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from 'react';
import api from "../../api/index";






const TeamManagement = () => {
    let [profile, setProfile] = useState({})

    useEffect(() => {
   
    }, [])


    console.log("profile", profile)
    return (

        <div >
            <div className="profile">
         
                <div class="vl"></div>
                <div className='profile_form'>
                    <form>
                        <div className='input_row'>
                            <div className='input_container'>
                                <label>SDIS</label>
                                <input value="xyz" />
                            </div>
                            <div className='input_container'>
                                <label>Group</label>
                                <input value="xyz"/>
                            </div>
                        </div>
                        <div className='field_seprator' ></div>
                        <div className='input_row'>
                            <div className='input_container'>
                                <label>Service</label>
                                <input value="xyz" />
                            </div>
                            <div className='input_container'>
                                <label>Employee Designation</label>
                                <input value="xyz" />
                            </div>
                        </div>
                        <div className='field_seprator'></div>
                        <div className='input_row'>
                            <div className='input_container'>
                                <label>First Name</label>
                                <input value='SDIS 78' />
                            </div>
                            <div className='input_container'>
                                <label>Last Name</label>
                                <input value="xyz" />
                            </div>
                        </div>
                        <div className='field_seprator'></div>
                        <div className='input_row'>
                            <div className='input_container'>
                            <label>Email</label>
                            <input value="xyz"/>
                            </div>
                            <div  className='input_container'>
                                <label> Cell No</label>
                                <input value="xyz" />
                            </div>
                        </div>
                        <div className='field_seprator'></div>
                        <div className='input_row'>
                            <div className='input_container'>
                            <label>Password</label>
                            <input type="password" value="xyz"/>
                            </div>
                            <div style={{visibility:"hidden"}} className='input_container'>
                                <label>cell No</label>
                                <input value="xyz" />
                            </div>
                        </div>
                      
                        <div className='field_seprator'></div>
                         
                        <button className='team_form_button'>Save</button>
                        <button className='team_form_button'>Clear</button>

                    </form>
                </div>
            </div>


        </div>

    )
}

export default TeamManagement;