import profile from '../../assets/profile.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';





const Profile=()=>{
    return(
     <div className="profile">
         <div>
             <img src={profile}/>
             <p className='profile_name'>John Smith</p>
             <div className='profile_location'>
            <LocationOnIcon color='error'/>
            <p>Paris, France</p>
             </div>
            <hr className='seprator'/>
            <h5 className='des_heading'>A propos de moi</h5>
            <p className='des'>Nam suscipit felis sit amet convallis condimentum. Interdum et malesuada</p>
         </div>
         <div class="vl"></div>
         <div className='profile_form'>
             <form>
                 <div className='input_row'>
                 <div className='input_container'>
                     <label>Prénom</label>
                    <input value='John' />
                 </div>
                 <div className='input_container'>
                     <label>Nom</label>
                    <input value='Smith' />
                 </div>
                 </div>
                 <div className='field_seprator' ></div>
                 <div className='input_row'>
                 <div className='input_container'>
                     <label>Adresse e-mail</label>
                    <input value='johnsmith@company.com' />
                 </div>
                 <div className='input_container'>
                     <label>Numéro de téléphone</label>
                    <input value='06 54 23 11 55' />
                 </div>
                 </div>
                 <div  className='field_seprator'></div>
                 <div className='input_row'>
                 <div className='input_container'>
                     <label>SDIS</label>
                    <input value='SDIS 78' />
                 </div>
                 <div className='input_container'>
                     <label>Groupement</label>
                    <input value='Groupement Préventionniste' />
                 </div>
                 </div>
                 <div  className='field_seprator'></div>
                 <div style={{marginLeft: "104px"}} className='input_container'>
                     <label>Service</label>
                    <input value='Service Achat' />
                 </div>
                 <div  className='field_seprator'></div>

               <button className='profile_form_button'>Modifier le profil</button>
             </form>
         </div>

     </div>
    )
}

export default Profile