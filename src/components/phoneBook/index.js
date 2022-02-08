import profileImage from '../../assets/profile.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from 'react';
import api from "../../api/index";
import { toast } from "react-toastify";
import ProfileImage from '../../assets/profileicon.png';
import { Store, UpdateStore } from "../../StoreContext";






const TeamManagement = () => {
    let [sdis, setSdis] = useState([])
    let [groups, setGroups] = useState([])
    let [services, setServices] = useState([])
    let [roles, setroles] = useState([])
    let [team, setTeam] = useState({ email: "", cellNo: "", password: "", roleId: "", groupId: "", serviceId: "", empFirstName: "", empLastName: "" })
    const update = UpdateStore();



    useEffect(() => {
        return function cleanup() {
            update({phoneBook:false});
        };
    }, [])

    return (

        <div className='team_management'>

            <div className='team_management_row'>
                <div className='input_cont'>
                    <img className='avatar' src={ProfileImage} />

                </div>
                <div className='input_cont'>
                    <label>Establishment Address</label>
                    <input disabled value="23 Rue D'ANJOU 45600 BEAULIEU SUR LOIRE" />
                </div>

            </div>


            <div className='team_management_row'>
                <div className='input_cont'>
                    <label>First Name</label>
                    <input  disabled value="john" />

                </div>
                <div className='input_cont'>
                    <label>Last Name</label>
                    <input  disabled value="john" />
                </div>
            </div>
            <div className='field_seprator' ></div>

            <div className='team_management_row'>
                <div className='input_cont'>
                    <label>Email</label>
                    <input  disabled value="john@gmail.com" />

                </div>
                <div className='input_cont'>
                    <label>Cell No</label>
                    <input disabled value="09076768979"  />
                </div>
            </div>

        </div>

    )
}

export default TeamManagement;