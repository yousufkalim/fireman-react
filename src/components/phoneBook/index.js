import profileImage from '../../assets/profile.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from 'react';
import api from "../../api/index";
import { toast } from "react-toastify";
import ProfileImage from '../../assets/profileicon.png';
import { Store, UpdateStore } from "../../StoreContext";
import { useTranslation, Trans } from "react-i18next";





const TeamManagement = () => {
    let [sdis, setSdis] = useState([])
    let [groups, setGroups] = useState([])
    let [services, setServices] = useState([])
    let [roles, setroles] = useState([])
    let [team, setTeam] = useState({ email: "", cellNo: "", password: "", roleId: "", groupId: "", serviceId: "", empFirstName: "", empLastName: "" })
    const update = UpdateStore();
    const { t, i18n } = useTranslation();
    const store = Store()




    useEffect(() => {
        return function cleanup() {
            update({phoneBook:false});
        };
    }, [])
  console.log(store)
    return (
         <>
         <p className='profile_heading'>{t("PHONE BOOK")}</p>
        <div className='team_management'>
        <p className='phonebook_heading1'>{store.phonebookData?.name} – Fiche contact</p>

            <div className='team_management_row'>
                <div className='input_cont'>
                    <img className='avatar' src={ProfileImage} />

                </div>
                <div className='input_cont'>
                    <label>Adresse établissement </label>
                    <input disabled value="23 Rue D'ANJOU 45600 BEAULIEU SUR LOIRE" />
                </div>

            </div>


            <div className='team_management_row'>
            <div className='input_cont'>
                    <label>Nom</label>
                    <input  disabled value={store.phonebookData?.securityManagerLastName} />
                </div>
                <div className='input_cont'>
                    <label>Prénom</label>
                    <input  disabled value={store.phonebookData?.securityManagerName} />

                </div>
               
            </div>
            <div className='field_seprator' ></div>

            <div className='team_management_row'>
                <div className='input_cont'>
                    <label>Email</label>
                    <input  disabled value={store.phonebookData?.securityManagerEmail} />

                </div>
                <div className='input_cont'>
                    <label>Mobile</label>
                    <input disabled value={store.phonebookData?.securityManagerMobile}  />
                </div>
            </div>

        </div>
         </>
    )  
}

export default TeamManagement;