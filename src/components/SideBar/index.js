
import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';


const SideBar=()=>{
    return(
        <div className="side_bar">
        <HomeIcon />
        <p>ACCUEIL</p>
        <div className="sidebarIcons">
            <div className="logo"></div>
            <p>EN COURS</p>
        </div>
        <div className="sidebarIcons">
            <div className="termine"></div>
            <p>TERMINÉ</p>
        </div>
        <div className="sidebarIcons">
            <div className="annuaire"></div>
            <p>ANNUAIRE</p>
        </div>
        <SubscriptionsIcon />
        <p>MULTIMÉDIA</p>
    </div>
    )
}

export default SideBar