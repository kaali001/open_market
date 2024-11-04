import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import config from '../config';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setEmail( input.value );
		setError("");
		setMessage("");
	};

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${config.backendUrl}/api/users/forgot-password`;
            const { data: res } = await axios.post(url, { email });
            setMessage(res);
			
            setError("");
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data);
                setMessage("");
            }
        }
    };

    return (
        <Wrapper>
            <div className="login_container">
                <div className="login_form_container">
                    <div className="left">
                        <form className="form_container" onSubmit={handleSubmit}>
                            <h1>Forgot Password</h1>

							{error && <div className="error_msg">{error}</div>}
                            {message && <div className="success_msg">{message}</div>}
                            <input
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                onChange={handleChange}
                                value={email}
                                required
                                className="input"
                            />
                        
                            <button type="submit" className="green_btn">
                                Reset Password
                            </button>
                        </form>
                    </div>
                    <div className="right">
                    <h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={"white_btn"}>
							Sign Up
						</button>
					</Link>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`



.login_container {
	
	
	display: flex;
	align-items: center;
	justify-content: center;
  
}

.login_form_container {
	width: 900px;
	height: 45rem;
    margin-top:5rem;
	display: flex;
	border-radius: 10px;
	box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
		0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
}

.left {
	flex: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: white;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
}

.form_container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.form_container h1 {
	font-size: 40px;
	margin-top: 0;
}


.input {
	outline: none;
	border: none;
	width: 370px;
	padding: 15px;
	border-radius: 10px;
	background-color: #edf5f3;
	margin: 15px 0 5px 0;
	font-size: 14px;
}

.error_msg{
	width: 370px;
	padding: 10px;
	margin: 10px 0;
	font-size: 14px;
	background-color:#f7eea67d;
	border: 1px solid #af6d05;
	color: #af6d05;
	border-radius: 5px;
	text-align: center;
}

.success_msg {
	width: 370px;
	padding: 10px;
	margin: 10px 0;
	font-size: 14px;
	background-color:#dafbe1;
	color: green;
	border-radius: 5px;
	border: 1px solid green;
	text-align: center;
}
.right {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: rgb(54, 156, 54);
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;
}

.right h1 {
	margin-top: 0;
	color: white;
	font-size: 40px;
	align-self: center;
}

.white_btn,
.green_btn {
	border: none;
	outline: none;
	padding: 12px 0;
	background-color: white;
	border-radius: 20px;
	width: 180px;
	font-weight: bold;
	font-size: 14px;
	cursor: pointer;
}

.green_btn {
	background-color: rgb(98 84 243);
	color: white;
	margin: 10px;
}


`;


export default ForgotPassword;
