

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import config from './config';
import styled from "styled-components";

const Signup = () => {
	const [data, setData] = useState({
		Name: "",
		email: "",
		phone: "",
		password: "",
		address: "",
		pincode:"",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${config.backendUrl}/api/users/signup`;
			const response = await axios.post(url, data);

			const { user_id } = response.data;
      
			// Store the token in sessionStorage
			sessionStorage.setItem('signupToken', user_id);
			navigate("/verify-otp");
			console.log(response.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (

    <Wrapper>
		{error && <div className={"error_msg"}>{error}</div>}
		<div className={"signup_container"}>
			<div className={"signup_form_container"}>
				<div className={"left"}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={"white_btn"}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={"right"}>
					<form className={"form_container"} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="Name"
							name="Name"
							onChange={handleChange}
							value={data.Name}
							required
							className={"input"}
						/>
						
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={"input"}
						/>
                        <input
							type="Numeric"
							placeholder="Phone"
							name="phone"
							onChange={handleChange}
							value={data.phone}
							required
							className={"input"}
						/>
						
						<input
							type="text"
							placeholder="Address"
							name="address"
							onChange={handleChange}
							value={data.address}
							required
							className={"input"}
						/>
						  <input
							type="Numeric"
							placeholder="Pincode"
							name="pincode"
							onChange={handleChange}
							value={data.pincode}
							required
							className={"input"}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={"input"}
						/>
						
						<button type="submit" className={"green_btn"}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
    </Wrapper>
	);
};

const Wrapper = styled.section`



.signup_container {
	
	display: flex;
	align-items: center;
	justify-content: center;
}

.signup_form_container {
	width: 900px;
	height: 450px;
  margin-top:5rem;
	display: flex;
	border-radius: 10px;
	box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
		0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
}

.left {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: rgb(54, 156, 54);
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
}

.left h1 {
	margin-top: 0;
	color: white;
	font-size: 35px;
	align-self: center;
}

.right {
	flex: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: white;
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;
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
	${'' /* //font-size: 14px; */}
}

.error_msg {
	width: 370px;
	padding: 10px;
	margin-top: 5px;
	margin-left:40%;
	font-size: 14px;
	background-color: #f34646;
	color: white;
	border-radius: 5px;
	text-align: center;
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
	background-color:  rgb(98 84 243);
	color: white;
	margin: 10px;
}


`

export default Signup;