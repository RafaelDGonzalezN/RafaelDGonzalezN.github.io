import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ image, name, temperament, temperaments, weight, id }) => {
  return (
    <div className={style.cardContainer}>
      <div>
        <Link className={style.caracteristicas} to={`/home/${id}`}>
          <div className={style.imageContainer}>
            <img className={style.img} src={image} alt="" />
            <h3 className={style.nombre}>{name}</h3>
          </div>
          <div>
            <h2>Weight: {weight}kg</h2>
            <h2 className={style.tempera}>
              Temperaments: {temperaments ? temperaments : temperament}
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
