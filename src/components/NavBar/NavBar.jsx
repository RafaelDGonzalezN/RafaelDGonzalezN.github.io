import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css"
import { logoBack } from "../../img/logos";

const NavBar = ({pagination}) => {
    const dispatch = useDispatch();
    const [searchDog, setSearchDog] = useState("");

    const handleInput = (event) => {
        setSearchDog(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchDog) {
            dispatch(getByName(searchDog))}
        setSearchDog("")
        pagination(1)
    }

    return(
        <nav className={style.navbar}>
            <div className={style.back}>
                <Link to = "/">
                        <img className={style.logo} src={logoBack} alt=""/>
                </Link>
            </div>
            <form onSubmit={handleSubmit} className={style.search} >
                <input 
                    className={style.input}
                    type="text" 
                    onChange={handleInput} 
                    value={searchDog} 
                    placeholder="Name of a dog..."/>
                <button className={style.searchButton} type="submit">Search</button>
            </form>
            
            <div>
                <Link to="/form">
                    <button className={style.create}>Create DOG</button>
                </Link>
            </div>
        </nav>
    )
}

export default NavBar;