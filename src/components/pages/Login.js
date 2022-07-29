import React , {useEffect} from "react";
import './login.css';
import profile from "../../images/gatestone2.png";
import email from "../../images/abc.jpg";
import lock from "../../images/pass.png";
import { useHistory } from "react-router-dom";
import {authenticated, isAuthenticated} from "../../Auth";

const Login = () => {
 const history = useHistory();
  
    useEffect(() => {
        if(isAuthenticated()) {
            history.push('/home', { login: true });
        }
    })
  const login = () =>{ 
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    if(email && pass){
       authenticated(email,pass).then((res) => {
        if(res.status === true) {
            history.push('/home', { login: true });
        }else {
            alert(res.msg)
        }
       })
      
    }else {
        alert('Please enter yout username and password')
    }
  }
   return (
       <div className="main">
         <div className="sub-main">
             <div>
                 <div className="imgs">
                     <div className="container-image">
                        <img src={profile} alt="profile" className="profiles"/>

                     </div>
                 </div>
                 <div>
                     <h1>Admin Login</h1>
                     <div>
                         <img src={email} alt="email" className="email" ></img>
                         <input type="text" id="email" placeholder="user name" className="name"/>
                     </div>
                     <div className="second-input">
                         <img src={lock} alt="pass" className="email" />
                         <input type="password" id="password" placeholder="Password" className="name" />
                     </div>
                     <div className="login-button">
                         <button className="button1" onClick={login}>Login</button>
                     </div>
                     
                         <p >
                             <a href="/forgot">Change Password</a>
                         </p>
                    
                 </div>
             </div>

         </div>
       </div>
   ) 
}

export default Login;