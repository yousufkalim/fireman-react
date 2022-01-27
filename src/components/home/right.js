import Cours1 from "../../assets/cours1.png"
import Cours2 from "../../assets/cours2.png"
import Cours3 from "../../assets/cours3.png"
import Cours4 from "../../assets/cours4.png"
import Folder from "../../assets/Folder.png"
import { useEffect, useState } from "react"
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css"
import {Store} from '../../StoreContext'
import {UpdateStore} from '../../StoreContext'



const HomeRight = () => {
    let [box, setBox] = useState(false)
    const update = UpdateStore();


    return (
        <>
            <div className="accueilHome_right">

                {
                    box ?
                        <>
                            <div style={{ marginRight: "30px" }}>
                                <p className="vertical_text">DOSSIERS EN COURS</p>
                                <div class="vl"></div>
                            </div>
                            <div onMouseLeave={() => { setBox(false) }} className="hoverbox" >

                                {[1, 1, 1, 1, 1].map((data) => {
                                    return (
                                        <div className="recre">
                                            <img src={Folder} />
                                            <div className="text">
                                                <p style={{ fontSize: "14px" }}>Lieusaint - Etude</p>
                                                <p style={{ fontSize: "18px", fontWeight: "600" }}>LA GRANDE RECRE</p>
                                            </div>
                                            <div className="progress">
                                                <Progress
                                                    percent={69}
                                                /></div>

                                        </div>
                                    )
                                })}
                                <div className="voirtout">
                                    <p>Voir Tout</p>
                                </div>
                            </div>

                        </>
                        :
                        <>
                            <div style={{ marginRight: "30px" }}>
                                <p className="vertical_text">AU COEUR DE L’ACTION </p>
                                <div class="vl"></div>
                            </div>
                            <div onMouseEnter={() => { setBox(true) }} className="cours">
                                <div className="coursimages">
                                    <img style={{ display: "block", marginBottom: "10px" }} src={Cours2} />
                                    <img src={Cours1} />
                                </div>
                                <div className="DOSSIERS_text">
                                    <img style={{ height: "465px" }} src={Cours3} />
                                    <div className="text">DOSSIERS EN COURS</div>
                                </div>
                            </div>
                        </>
                }
            </div>

            <div style={{ marginTop: "40px" }} className="accueilHome_right_bottom">
                <div onClick={()=>{update({activeNavbarTab:"newcases"})}} className="allonys">
                    <img style={{ marginLeft: "50px" }} src={Cours4} />
                    <div className="text">UN NOUVEAU DOSSIER ? C’EST PARTI !</div>
                </div>
                <div>
                    <div class="vl"></div>
                    <p style={{ marginLeft: "13px", marginTop: "9px" }} className="vertical_text">ALLONS-Y</p>
                </div>
            </div>

        </>
    )
}

export default HomeRight



