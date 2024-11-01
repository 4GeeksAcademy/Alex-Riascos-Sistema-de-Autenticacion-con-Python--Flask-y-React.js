import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Private = props => {
	const { store, actions } = useContext(Context);

	const navigate = useNavigate();

	const handleLogout = () => {
		actions.logout();
		navigate("/");
		window.location.reload();
	};





	useEffect(() => {
		if (!store.user) {
			navigate("/login");
		}
	}, [store.user]);

	return (
		<div className="jumbotron">
			<h1 className="display-4">Hello Welcome!, {store.user ? store.user.email : "user"}!</h1>

			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button"
					onClick={handleLogout}
				>
					logout
				</span>
			</Link>
		</div>
	);
};

Private.propTypes = {
	match: PropTypes.object
};
