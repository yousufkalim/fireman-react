
import { Grid, Paper } from "@mui/material"
import { styled } from "@mui/material/styles";
import logo from '../../assets/LoginfromLogo.png'



const Login = () => {
    return (
        <Grid container spacing={0} columns={20}>
            <Grid item xs={9}>
                <div className="left-form">
                <img src={logo} />
                </div>
            </Grid>
            <Grid item xs={11}>
                <div className="login-form">
                    <p className="topHeading">Retour à la page d’accueil</p>
                    <div className="mainform">
                        <div style={{ textAlign: "start" ,width:"80%"}}>
                            <h4>Connectez-vous à votre compte</h4>
                            <div className="input-field">
                                <label>Adresse e-mail</label>
                                <input placeholder="Fireman@company.com" type="text" />
                            </div>
                            <div className="input-field">
                                <label>Mot de passe</label>
                                <input placeholder="+1 234 567890" type="text" />
                            </div>
                            <a>Mot de passe oublié ?</a>
                            <button>Se connecter</button>
                        </div>
                    </div>
                </div>
            </Grid>

        </Grid>
    )
}

export default Login