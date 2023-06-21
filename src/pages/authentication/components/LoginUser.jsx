import React, {useCallback, useState} from "react";
import "../styles/LoginUser.css";
import { useNavigate } from "react-router-dom";


function LoginUser() {

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[buttonInactive, setButtonInactive] = useState((true));
    const[loginResponse, setLoginResponse] = useState({});
    const navigate = useNavigate();

    const handleLogin = ()=>{
        let loginRequest = {
            "username": username,
            "password": password
        }
        fetchData(loginRequest);
    }

    const fetchData = useCallback(async (request) => {

    let url = "http://localhost:8000/auth/jwt/create";
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
            setLoginResponse(data);
            console.log(data)
            localStorage.setItem("username", username);
            navigate("/dashboard");
        }
        else{
            if (res.status === 401) {
                alert("Invalid Login Credentials.")
            }
        }
    } catch(err){
        console.log(err.message)
    }
    },[]);


    const fillIn = (input)=>{
        let inputIdentity = input.target.name;
        let inputValue = input.target.value;

        if(inputIdentity === "username"){
            setUsername(inputValue);
            localStorage.setItem("username", inputValue);
        }
        else if (inputIdentity === "password"){
            setPassword(inputValue)}

        if (username !== null && password !== null)  {
                setButtonInactive( false)
            }


    }
    return(
        <div className= "page-main">
        <div className="user-login-page">
            <h1 className="login-header">
                7 Ate 9 -- (No more a secret 🤐)
            </h1>
            <div className="login-form" >
                <label className="username-label">
                    <input type="text" placeholder="Enter your email address" name="username" onChange={fillIn}/>
                </label>
                <br/>
                <br/>
                <label className="password-label">
                    <input className="login-input" type="password" placeholder="Enter your password" name="password" onChange={fillIn}/>
                </label>
                <br/><br/>
                <button type="submit" onClick={handleLogin} className="login-button" disabled={buttonInactive}>Login</button>
            </div>

        </div>
        </div>
    )
}


export default LoginUser