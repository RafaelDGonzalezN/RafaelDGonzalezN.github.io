import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getDogs, 
    filterCreateDog,
    filterTemperament, 
    orderByName, 
    orderWeight, 
    getTemperament } from "../../redux/actions"
import NavBar from "../../components/NavBar/NavBar";
import Card from "../../components/Card/Card"
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading/Loading"
import { logoRefresh } from "../../img/logos";

import styles from "./Home.module.css";

function Home(){

    const dispatch = useDispatch()

    const allDogs = useSelector((state) => state.dogs) || [];

    const allTemperaments = useSelector((state) => {return state.temperament})

    const [searchString, setSearchString] = useState("")
    const [searchFilter, setSearchFilter] = useState("")

    const [currentPage, setCurrentPage] = useState(1);

    const [dogsPerPage, setDogsPerPage] = useState(8);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
        setDogsPerPage(8);
    }

    const currentDogs = allDogs.slice(
        (currentPage - 1) * dogsPerPage,
        currentPage * dogsPerPage
    )

    const handleClick = () => {
        dispatch(getDogs());
        setCurrentPage(1);
        setSearchString("");
    }
    const handlerFilterByName = (event) => {
        dispatch(orderByName(event.target.value))
        setCurrentPage(1)
        setSearchString(`Order by ${event.target.value}`)
    }
    const handlerFilterByWeight = (event) => {
        
        dispatch(orderWeight(event.target.value))
        setCurrentPage(1)
        setSearchString(`Order by ${event.target.value}`)
    }

    const handlerFilterCreated = (event) => {
        dispatch(filterCreateDog(event.target.value))
        setCurrentPage(1)
        setSearchFilter(`Created ${event.target.value}`)
    }

    const handlerFilterTemperament = (event) => {
        dispatch(filterTemperament(event.target.value))
        setCurrentPage(1)
        setSearchFilter(`Filter by ${event.target.value}`)
    }



    useEffect(() => {
        
        dispatch(getDogs())
        dispatch(getTemperament())
 
    },[dispatch]);

    return (
        <div className={styles.home}>
          <header>
            <NavBar pagination={pagination} />
            <div>
              <div className={styles.filtros}>
                <select onChange={(event) => handlerFilterByName(event)}>
                  <option key={1} value="Order">Order by name</option>
                  <option key={3} value="A-Z">A-Z</option>
                  <option key={2} value="Z-A">Z-A</option>
                </select>
    
                <select onChange={(event) => handlerFilterByWeight(event)}>
                  <option key={3} value="Order">Order by weight</option>
                  <option key={1} value="asc">Ascendente</option>
                  <option key={2} value="desc">Descendente</option>
                </select>
    
                <select onChange={(event) => handlerFilterCreated(event)}>
                  <option key={4} value="Order">Order by created</option>
                  <option key={1} value="all">ALL</option>
                  <option key={2} value="true">Created</option>
                  <option key={3} value="false">Api</option>
                </select>
    
                <select onChange={(event) => handlerFilterTemperament(event)}>
                  <option key={2} value="Temperaments">Temperaments</option>
                  <option key={1 + "e"} value="all">All</option>
                  {allTemperaments.map((temp, index) => (
                    <option value={temp.name} key={index}>{temp.name}</option>
                  ))}
                </select>
                <div className={styles.filterBy}>
                  {searchString && <p>{searchString}  -</p>}
                  {searchFilter && <p>- {searchFilter}</p>}
                </div>
                <div onClick={handleClick}>
                <img className={styles.logo} src={logoRefresh} alt="Logo" />
                </div>
              </div>
            </div>
          </header>
          <div className={styles.cardsContainer}>
            {Object.keys(allDogs).length ? (
              <div className={styles.cartaCon}>
                {currentDogs?.map((dog) => (
                  <div className={styles.card} key={dog.id}>
                    <Card
                      id={dog.id}
                      image={dog.image}
                      name={dog.name}
                      temperament={dog.temperament}
                      weight={dog.weight}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <Loading />
              </div>
            )}
          </div>
          <div className={styles.pagina}>
            <Pagination className={styles.pag} dogsPerPage={dogsPerPage} allDogs={allDogs.length} pagination={pagination} currentPage={currentPage} />
          </div>
        </div>
      );
    }

export default Home;