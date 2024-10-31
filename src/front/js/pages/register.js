import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";



const Register = () => {
    const { store, actions } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario

        const result = await actions.register(email, password);
        if (result) {

            setEmail("");
            setPassword("");


            navigate("/login"); // Redirigir después del registro
            return alert("Usuario registrado con éxito");
        }
        alert("No se pudo registrar el usuario");

    };

    useEffect(() => {
        if (store.user) {
            navigate("/private");
        }
    }, [store.user]);

    return (
        <div className="container">
            <h1 className="text-center">Registrate!</h1>
            <div className="row">

                <div className="col-m-12">
                    {/* <form onSubmit={handleSubmit}> */}
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>





                        <button type="submit" className="btn btn-primary w-100" >
                            Register
                        </button>
                    </form>



                </div>
            </div>
        </div>
    );
};

export default Register;
