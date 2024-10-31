import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import { Link } from 'react-router-dom';



export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className=" text-center mt-5 col-4 mx-auto">

			<Link to="/login" className="btn btn-success" type="button" >Login</Link>


			<Link to="/register" className="btn btn-primary mx-3" type="button" >Register</Link>

		</div>
	);
};
