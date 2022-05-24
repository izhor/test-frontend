import axios from "axios";
import React, { useState,setState } from "react";
import swal from "sweetalert";


function RegisterModal() {
    var urlBase = "http://backend-dev.cakra-tech.co.id/api";
    const [getName, setName] = useState("");
    const [getEmail, setEmail] = useState("");
    const [getPassword, setPassword] = useState("");
    const [getPasswordConfirmation, setPasswordConfirmation] = useState("");
    

    function clearRegisterForms(){
        var password = document.getElementById("password");
        var password_confirm = document.getElementById("password_confirm");
        var name = document.getElementById("name");
        var email = document.getElementById("email");
        password.value = "";
        password_confirm.value = "";
        email.value = "";
        name.value = "";
    }

    const register = async (e)=>{
        e.preventDefault()
        if (getPassword === getPasswordConfirmation) {
            if (getPassword.length > 6) {

                try{
                    await axios.post(urlBase+"/register",{
                        name : getName,
                        email: getEmail,
                        password : getPassword,
                        password_confirmation : getPasswordConfirmation
                    }).then(()=>{
                        swal({
                            title : "Success",
                            text : "Your account has been successfully registered",
                            icon : 'success'
                        });
                    });
                }catch(e){
                    console.log(e);
                    swal({
                        title : "Failed",
                        text : "Error ocurred",
                        icon : 'error'
                    })
                }
                
             
                clearRegisterForms();
            }else{
                if (getPassword == "" || getPasswordConfirmation == "") {
                    swal({
                        title : "Warning",
                        text : "password cannot be empty",
                        icon : 'warning'
                    });
                }else{
                    swal({
                        title : "Warning",
                        text : "password must be at least 6 characters long",
                        icon : 'warning'
                    });
                }
            }
           
          
               
          
        }else{
            swal({
                title : "warning",
                text : "password do not match",
                icon : 'warning'
            });
        }
        
    }
       
    
    return(
        <div>
            <form>
                <div className="input-group m-2">
                    <input type="text" 
                    onChange={(e)=>{
                        setName(e.target.value)
                        }} 
                    id="name" className="form-control" maxLength={255} placeholder="name" required/>
                </div>
                <div className="input-group m-2">
                    <input type="email" 
                    onChange={(e)=>{
                        setEmail(e.target.value)
                        }} 
                    id="email" className="form-control" maxLength={255} placeholder="email" required/>
                </div>
                <div className="input-group m-2">
                    <input type="password"
                    onChange={(e)=>{
                        setPassword(e.target.value)
                        }} 
                    id="password" className="form-control" minLength={6} maxLength={255} placeholder="password" required />
                </div>
                <div className="input-group m-2">
                    <input type="password" 
                    onChange={(e)=>{
                        setPasswordConfirmation(e.target.value)
                        }} 
                    id="password_confirm" className="form-control" minLength={6} maxLength={255} placeholder="password confirmation"required/>
                </div>
                <button type="submit" className="btn btn-primary text-white m-2" onClick={register}>Register</button>
            </form>
        </div>
    )
}

export default RegisterModal;