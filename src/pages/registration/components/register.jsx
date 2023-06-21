import React, { useState, useCallback } from "react";
import '../styles/register.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import chattingPicture from '../../../assets/chatting.jpg'
import { useNavigate } from "react-router-dom";
import '../styles/otpVerification.css'

function Register(){
    const[otpConfirmationStatusMessage, setOtpConfirmationStatusMessage] = useState("");
    const successfulOtpConfirmationMessage = "Account has been registered successfully.";
    const failedOtpConfirmationMessage = "Incorrect otp provided. Please try again.";
    const navigate = useNavigate();
    const[username, setUsername] = useState(()=>{
        const user = localStorage.getItem('username');
        return user ? user: "";
    });
    const[password, setPassword] = useState("");
    const[confirmedPassword, setConfirmedPassword] = useState("");
    const[buttonIsDisabled, setbuttonIsDisabled] = useState(true);
    const[passwordMatchingColor, setPasswordMatchingColor] = useState("error");
    const[usernameTextColor, setUsernameTextColor] = useState("success");
    const[registerResponse, setRegisterResponse] = useState({});
    const[registrationResponseMessage, setRegistrationResponseMessage] = useState("");
    const[otp, setOtp] = useState(()=>{
        const otpNumber = localStorage.getItem('otp');
        return otpNumber ? otpNumber: 0;
    });
    const[email, setEmail] = useState(()=>{
        const emailAddress = localStorage.getItem('email');
        return emailAddress ? emailAddress: "";
    });
    const[otpStatusPageButtonPlaceHolder, setOtpStatusPageButtonPlaceHolder]=useState("");

    const handleRegistration = ()=>{
        setbuttonIsDisabled(true)
        let registerRequest = {
            "username": username,
            "email": email,
            "password": password
        }
        localStorage.setItem('email', email)
        fetchData(registerRequest);
    }
    
    const fetchData= useCallback(async (request)=>{
        let url = "http://127.0.0.1:8000/register/";
        try{
            const res = await fetch(url,{
                method:'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(request)
            });
            if(res.ok){
                const data = await res.json();
                setRegisterResponse(data);
                setUsernameTextColor("success")
                popUpOtpPage();
            }
            else{
                if (res.status === 400) {
                    setUsernameTextColor("error")
                    setRegistrationResponseMessage("Account with given username already exists.");
                    let regRespElement = document.createElement("div");
                    regRespElement.className = "registrationResponseMessage";
                    let msg = document.createTextNode("Account with given username already exists.")
                    regRespElement.appendChild(msg);
                    document.getElementsByClassName("username")[0].append(regRespElement);
                }
            }
        } catch(err){
            console.log(err.message)
        }
        },[]);

    const edit = (input)=>{
        let inputName = input.target.name;
        let inputValue = input.target.value;
        if (inputName === "username") {
            setUsername(inputValue);
            localStorage.setItem("username", inputValue);
            setUsernameTextColor("success");
            setRegistrationResponseMessage("");
        }
        else if (inputName === "email") {
            setEmail(inputValue)
        }
        else if (inputName === "password") {
            setPassword(inputValue)
            if(inputValue === confirmedPassword){
                setbuttonIsDisabled(false);
                setPasswordMatchingColor("success")
            }
            else{
                setbuttonIsDisabled(true);
            }
        }
        else if (inputName === "confirmedPassword") {
            setConfirmedPassword(inputValue);
            if(inputValue === password){
                setbuttonIsDisabled(false);
                setPasswordMatchingColor("success")
            }
            else{
                setbuttonIsDisabled(true);
            }
        }
        else if(inputName === "otpBox"){
            setOtp(inputValue);
            localStorage.setItem("otp", inputValue);
        }
    }


    function popUpOtpPage(){        
        let otpPage = document.getElementsByClassName("otpPage")[0];
        otpPage.style.display = "block";
        let mainContainer = document.getElementsByClassName("mainContainer")[0];
        mainContainer.style.pointerEvents = "none";
        mainContainer.style.filter = "blur(90px)";
        mainContainer.style.backgroundcolor = "#d7dff3";
        mainContainer.style.backgroundColor = "black";
    } 
    
    const handleOtpConfirmation = useCallback(async ()=>{
        const otpConfirmationRequest = {
            'email': email,
            'otp': localStorage.getItem("otp") 
        }
        const url = "http://127.0.0.1:8000/completeRegistration/";
        try {
            const response = await fetch(url,{
                method:'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(otpConfirmationRequest)
            });
            if (response.ok) {
                setOtpConfirmationStatusMessage(successfulOtpConfirmationMessage);
                setOtpStatusPageButtonPlaceHolder("Goto Dashboard")
            }
            else{
                setOtpConfirmationStatusMessage(failedOtpConfirmationMessage);
                setOtpStatusPageButtonPlaceHolder("Try again")
            }
            popUpOtpConfirmationStatusMessagePage();
        } catch (error) {
            console.log(error.message)
        }
    },[]);

    const handleOtpConfirmationStatus = ()=>{
        let otpConfirmationStatusPage = document.getElementsByClassName("otpConfirmationStatusPage")[0];
        otpConfirmationStatusPage.style.display = "none";
        if (otpConfirmationStatusMessage === successfulOtpConfirmationMessage) {
            navigate("/dashboard");
        }
        else{
            popUpOtpPage();
        }
    }

    const popUpOtpConfirmationStatusMessagePage = ()=>{
        let otpPage = document.getElementsByClassName("otpPage")[0];
        otpPage.style.display = "none";
        let otpConfirmationStatusPage = document.getElementsByClassName("otpConfirmationStatusPage")[0];
        otpConfirmationStatusPage.style.display = "block";
    }


    return(
        <React.Fragment>
            <div className="mainContainer">
                <div className="leftContainer">
                    <img src={chattingPicture} alt="" className="chattingPicture"/>
                </div>
                <div className="rightContainer">
                    <div className="fieldsBox">
                        <div className="fields">
                            <div className="username">
                                <TextField name="username" id="standard-basic" label="Username" variant="standard" onChange={edit} color={usernameTextColor}/>
                            </div>
                            <div>
                                <TextField name="email" id="standard-basic" label="Email address" variant="standard" onChange={edit}/>
                            </div>
                            <div>
                                <TextField type="password" name="password" id="standard-basic" label="Password" variant="standard" onChange={edit} color={passwordMatchingColor}/>
                            </div>
                            <div>
                                <TextField type="password" name="confirmedPassword" id="standard-basic" label="Confirm password" variant="standard" onChange={edit} color={passwordMatchingColor}/>
                            </div>
                        </div>
                            <div className="submitBox">
                                <Button className="button" variant="contained" onClick={handleRegistration} disabled={buttonIsDisabled} >Register</Button> 
                            </div>
                    </div>
                    <div className="loginRef">
                        Do you have a registered account?<a href="http://localhost:3000/authenticate">Login</a>
                    </div>
                </div>
            </div>
            <div className="otpPage">                    
                <h6 className="otpPageText">An otp has been sent to your email. Kindly enter the otp below to complete your registration.</h6>                    
                <TextField type="number" name="otpBox" id="standard-basic" label="Enter your otp" variant="standard" onChange={edit}/><br /><br />
                <Button onClick={handleOtpConfirmation}>SUBMIT</Button>
            </div>
            <div className="otpConfirmationStatusPage">
                <br />
                <h6 className="otpPageText">{otpConfirmationStatusMessage}</h6> 
                <br />
                <Button onClick={handleOtpConfirmationStatus}>{otpStatusPageButtonPlaceHolder}</Button>
            </div>
            <button type="submit" onClick={popUpOtpPage}>Enter</button>
        </React.Fragment>
    )
}

export default Register