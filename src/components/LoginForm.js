import {useState, useEffect} from 'react';
import axios from 'axios';
import {
  useHistory,
  useLocation, withRouter
} from "react-router-dom";

const LoginForm = () => {
	
	// const history = useHistory();
	const [error, setError] = useState("");
	const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [reg, setReg] = useState(false);
	// const changeRoute = () =>{
	// 	let path = "/register";
	// 	history.push(path)
	// }
	const handleSubmit = async (event) => {
		event.preventDefault();

		const authObject = {
			'Project-ID' : "cf441224-41e9-41cc-8614-a4f80364f2f7",
			"User-Name": username,
			"User-Secret": password
		};
	

		try {
			await axios.get("https://api.chatengine.io/chats", {headers: authObject});
			console.log("inside login")
			localStorage.setItem('username', username);
      		localStorage.setItem('password', password);
			window.location.reload();

			
		} catch(err) {
			console.log(err)
			setError("Oooops... incorrect username or password!")
		}

	}

	const register = () => {
		localStorage.clear();
		localStorage.setItem("register",true)
	
		window.location.reload();
	}
	const login = () => {
		localStorage.clear();
		localStorage.removeItem("register");

		window.location.reload();

	}
	const handleRegSubmit = async (event) => {
		console.log("register",username,password)
		event.preventDefault();
		try {
			await axios.post(
			'https://api.chatengine.io/projects/people/',
			{ 'username': username, 'secret': password, 'first_name': firstName },
			{ headers: { "Private-Key": 'c6a0124c-a7dc-401b-8442-18300c93f8f8 ' } })
			localStorage.setItem('username', username);
      		localStorage.setItem('password', password);
      		window.location.reload();
			
		} catch(err) {
			console.log(err)
			setError("Oooops... error occured!")
		}
	
	}

	return (
		!localStorage.getItem('register')
		 ? 
		<div>
			<div className = "wrapper">
				<div className = "form">
					<h1 className="title"> Welcome Back! </h1>
					<form onSubmit = {handleSubmit}>
						<input type = "text" value = {username} onChange={(e) => setUsername(e.target.value)} className = "input" placeholder = "Username" required />
						<input type = "password" value = {password} onChange={(e) => setPassword(e.target.value)} className = "input" placeholder = "Password" required/>
						<div align = "center">
								<button type = "submit" className = "button">
									<span> Start Chatting! </span>
								</button>
						</div>
						<h2 className="error"> {error} </h2>
					</form>
					<div align = "center">
							
								<button className = "button-additional" onClick= {() => register()}>
									<span> Register </span>
								</button>	
					</div>
				</div>
			</div>
		</div>
		 : 
			<div>
			 
				<div className = "wrapper">
					<div className = "form">
						<h1 className="title"> Join Our Chat! </h1>
						<form onSubmit = {handleRegSubmit}>
							<input type = "text" value = {username} onChange={(e) => setUsername(e.target.value)} className = "input" placeholder = "Username" required />
							<input type = "password" value = {password} onChange={(e) => setPassword(e.target.value)} className = "input" placeholder = "Password" required/>
							<input type = "text" value = {firstName} onChange={(e) => setFirstName(e.target.value)} className = "input" placeholder = "Name" required/>
							<div align = "center">
								<button type = "submit" className = "button">
									<span> Join! </span>
								</button>
							</div>
							<h2 className="error"> {error} </h2>
						</form>
						<div align = "center">
								<button className = "button-additional" onClick= {() => login()} >
										<span>Log In </span>
								</button>
						</div>
					</div>
				</div>
			
			</div>
		
	
	
		);
}

export default LoginForm;