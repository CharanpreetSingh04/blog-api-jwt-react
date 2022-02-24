import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
function Login() {
    useEffect( () => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              token: "Bearer " + token
            }
        };
        axios.get('http://localhost:5000/login',config).then(function (response) {
            if(response.status === 403){
                console.log('login required')
            }
            console.log(response.data.isRequired)
            if(response.data.isRequired === 0){
                navigate('/dashboard');
            }     
        }).catch(function (error) {
                console.log(error)
        });
    },[]);
    const details = {
        email: '',
        password: '',
    }
    const navigate = useNavigate();
    const inputEmailRef = useRef();
    const inputPasswordRef = useRef();
    const validateCredentials = () => {
        details.email = inputEmailRef.current.value
        details.password = inputPasswordRef.current.value
        const config = {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        };
        axios.post('http://localhost:5000/login',config).then(function (response) {
            console.log(response);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
            
          }).catch(function (error) {
                console.log(error)
          });
    }
    return(
        <div className='Login'>
            <form>
                <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    ref={inputEmailRef}
                />
                </div>
                <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Create Password"
                    ref={inputPasswordRef}
                />
                </div>
                <input type="button" className="btn btn-primary btn-block" value="Login" onClick={validateCredentials}/>
            </form>
            <p className="lead mt-4">Do not have an Account? <Link to="/register">Register Now</Link></p>
        </div>
    )
    
}

export default React.memo(Login);