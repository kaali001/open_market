
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";



const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
     
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/users/login";
			const { data: res } = await axios.post(url, data,{ withCredentials: true });

			if (!res.isAdmin) {
				localStorage.setItem("token", res.token);
			}
	
			localStorage.setItem("user_id", res.user_id);
			window.localStorage.setItem("isLoggedIn", true);
			window.location = "/";
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
		<div className={"login_container"}>
			<div className={"login_form_container"}>
				<div className={"left"}>
					<form className={"form_container"} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
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
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={"input"}
						/>
						{error && <div className={"error_msg"}>{error}</div>}
						<button type="submit" className={"green_btn"}>
							Sign In
						</button>
						<Link to="/forgot-password" className="forgot_password_link">
                                Forgot Password?
                        </Link>
					</form>
				</div>
				<div className={"right"}>
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

  .forgot_password_link {
        display: block;
        margin-top: 10px;
        color: #007bff;
        text-decoration: none;
        font-size: 14px;
    }

    .forgot_password_link:hover {
        text-decoration: underline;
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

export default Login;