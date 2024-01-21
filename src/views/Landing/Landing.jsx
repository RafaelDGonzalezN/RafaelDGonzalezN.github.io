import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css"


const Landing = () => {
    return (
        <div className={style.Landing}>
            <div>
            <h1 className={style.title}>Dogs</h1>
            <Link to="/home">
                <button>Bienvenido!</button>
            </Link>
            </div>
        </div>
    )
}

export default Landing;