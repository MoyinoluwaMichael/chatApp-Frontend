import React, { useState, useCallback } from "react";
import '../styles/register.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import chattingPicture from '../../../assets/chatting.jpg'

function Register(){

    const[username, setUsername] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[confirmedPassword, setConfirmedPassword] = useState("")
    const[buttonIsDisabled, setbuttonIsDisabled] = useState(true)
    const[passwordMatchingColor, setPasswordMatchingColor] = useState("error")
    const[registerResponse, setRegisterResponse] = useState({})

    const handleRegistration = ()=>{
        let registerRequest = {
            "username": username,
            "email": email,
            "password": password
        }
        fetchData(registerRequest);
    }
    
    const fetchData= useCallback(async (request)=>{
        let url = "http://127.0.0.1:8000/register/"
        // setIsLoading(true);
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
                alert("Account Registered successfully!")
            }
            else{
                if (res.status === 400) {
                    alert("Account with given username or email already exists.")
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
                            <div>
                                <TextField name="username" id="standard-basic" label="Username" variant="standard" onChange={edit}/>
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
                            <div className="submitBox">
                                <Button className="button" variant="contained" onClick={handleRegistration} disabled={buttonIsDisabled} >Register</Button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Register