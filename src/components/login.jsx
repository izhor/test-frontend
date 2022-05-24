import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

function LoginModal(){
    const [getEmailLogin,setEmailLogin] = useState("");
    const [getPasswordLogin, setPasswordLogin] = useState("");
    var urlBase = "http://backend-dev.cakra-tech.co.id/api";
    
    const dispatch = useDispatch();

    const verifyCredentials = async(e)=>{
        e.preventDefault();
        try {
            await axios.post(urlBase+"/login",{
                email: getEmailLogin,
                password: getPasswordLogin
            }).then(()=>{
                dispatch(login({
                    email:getEmailLogin,
                    loggedIn : true
                }));
            })
        } catch (e) {
            console.log(e);
            swal({
                title : "Failed",
                text : "Credential invalid",
                icon : 'error'
            })
        }
    }

    return(
        <div className="">
            <form>
                <div className="input-group m-2">
                    <div className="input-group">
                        <input type="email" onChange={(e)=>{setEmailLogin(e.target.value)}} placeholder="email" className="form-control" />
                    </div>
                </div>
                <div className="input-group m-2">
                    <div className="input-group">
                        <input type="password" onChange={(e)=>{setPasswordLogin(e.target.value)}} placeholder="password" className="form-control" />
                    </div>
                </div>    
                <button type="submit" className="btn btn-success m-2" onClick={(e)=>{verifyCredentials(e)}}>Login</button>               
            </form>
        </div>
    )
}

export default LoginModal;