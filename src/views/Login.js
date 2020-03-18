import React, { useEffect, useState } from 'react';
import { Assets } from '../config/Asset-Config';
import { useHistory } from 'react-router-dom';
import api from '../apiCalls/api';
import { ToastContainer, createNotification } from '../components/Toast';
export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	useEffect(() => {
		const isAuth = localStorage.getItem('token');
		if (isAuth) {
			history.push('/');
		}
	}, [history]);
	const login = () => {
		if (email === '' || password === '') {
			createNotification('error', 'Please enter email and password');
		} else {
			setLoading(true);
			api.signIn({ email: email, password: password })
				.then(res => {
					createNotification('success', 'Login Successfully');
					localStorage.setItem('token', res.data.token);
					setTimeout(() => {
						setLoading(false);
						history.push('/');
					}, 1500);
				})
				.catch(err => {
					setLoading(false);
					createNotification('error', err.data.message);
					console.log(err);
				});
		}
	};
	return (
		<div className="container h-100vh d-flex flex-column justify-content-center align-items-center">
			<ToastContainer />
			<div className="flex-2 d-flex justify-content-center align-items-center">
				<div className="login-logo">
					<img src={Assets.loginLogo} alt="" />
				</div>
			</div>
			<div className="flex-1 d-flex flex-column justify-content-around align-items-center">
				<input
					type="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder="Admin"
					className="text-center border-0 border-bottom-custom"
				/>
				<input
					type="password"
					value={password}
					onChange={e => {
						setPassword(e.target.value);
					}}
					placeholder="Password"
					className="text-center border-0 border-bottom-custom"
				/>
				<button type="submit" className="btn btn-custom" onClick={login} disabled={loading ? true : false}>
					{loading ? (
						<div class="spinner-border text-light" role="status">
							<span class="sr-only">Loading...</span>
						</div>
					) : (
						'Login'
					)}
				</button>
			</div>
		</div>
	);
}
