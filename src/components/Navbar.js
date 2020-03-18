import React from 'react';
import { Assets } from '../config/Asset-Config';
import NavItem from './NavItem';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
	const history = useHistory();
	return (
		<nav className="navbar navbar-light navbar-horizontal  navbar-expand-lg shadow">
			<div className="container">
				<div className="avatar-img" onClick={() => history.push('/login')}>
					<img src={Assets.logo} alt="logo" />
				</div>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ml-auto">
						<NavItem to="/" name="Clients" />
						<NavItem to="/excercise" name="Excercise" />
						<li>
							<div className="d-flex justify-content-center align-items-center ">
								<div className="avatar-img position-relative font-weight-bold" type="button">
									<img src={Assets.userAvatar} alt="avatar" className="img-circle" />
									<div
										type="button"
										className="text-custom-blue p-2 bg-white position-absolute logout"
										onClick={() => {
											localStorage.clear();
											history.push('/login');
										}}
									>
										<i className="fas fa-sign-out-alt mr-1" /> <span>Logout</span>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
