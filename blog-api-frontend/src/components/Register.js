import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
function Register() {
    const details = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const navigate = useNavigate();
    const inputNameRef = useRef();
    const inputEmailRef = useRef();
    const inputPasswordRef = useRef();
    const inputConfirmPasswordRef = useRef();
    const validateCredentials = () => {
        details.name = inputNameRef.current.value
        details.email = inputEmailRef.current.value
        details.password = inputPasswordRef.current.value
        details.confirmPassword = inputConfirmPasswordRef.current.value
        const config = {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        };
        axios.post('http://localhost:5000/register',config).then(function (response) {
            localStorage.setItem('token', response.data.token);
            navigate('/login');
            
          }).catch(function (error) {
                console.log(error)
          });
    }
    return(
        <div className='Register'>
            <form>
                <div className="form-group">
                <label>Name</label>
                <input
                    type="name"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter Name"
                    ref={inputNameRef}
                />
                </div>
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
                <div className="form-group">
                <label>Confirm Password</label>
                <input
                    type="password"
                    id="password2"
                    name="password2"
                    className="form-control"
                    placeholder="Confirm Password"
                    ref={inputConfirmPasswordRef}
                />
                </div>
                <input type="button" className="btn btn-primary btn-block" value="Register" onClick={validateCredentials}/>
            </form>
            <p className="lead mt-4">Have An Account? <Link to="/login">Login</Link></p>
        </div>
    )
    
}

export default React.memo(Register);