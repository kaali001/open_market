import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import config from '../config';

const ResetPassword = () => {
    const [data, setData] = useState({ password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const { token } = useParams();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
		setError("");
		setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match");
			setMessage("");
            return;
        }
        try {
            const url = `${config.backendUrl}/api/users/reset-password/${token}`;
            const { data: res } = await axios.post(url, { password: data.password });
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
                            <h1>Reset Password</h1>

							{message && <div className="success_msg">{message}</div>}
                            <input
                                type="password"
                                placeholder="Enter new password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                                className="input"
                            />
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                name="confirmPassword"
                                onChange={handleChange}
                                value={data.confirmPassword}
                                required
                                className="input"
                            />
                            {error && <div className="error_msg">{error}</div>}
                           
                            <button type="submit" className="green_btn">
                                Reset Password
                            </button>
                        </form>
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
	margin: 5px 0;
	font-size: 14px;
}

.error_msg {
	width: 370px;
	padding: 15px;
	margin: 5px 0;
	font-size: 14px;
	background-color: #f34646;
	color: white;
	border-radius: 5px;
	text-align: center;
}

.success_msg {
	width: 370px;
	padding: 10px;
	margin: 10px 0;
	font-size: 14px;
	background-color:#97c79e;
	color: #1a7326;
	border-radius: 5px;
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

export default ResetPassword;
