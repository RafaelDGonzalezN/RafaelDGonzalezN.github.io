import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getTemperament, postDog } from "../../redux/actions"
import validation from "./validation"
import styles from "./Form.module.css"
import { logoBack } from "../../img/logos";

function Create(){

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name:"",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span:"",
        image:"",
        temperament:[]    
    })

    const [errors, setErrors] = useState({})

    const allTemperaments = useSelector((state) => state.temperament)
   
    const handleChange = (event) => {
                const { name, value } = event.target;
                
                setInput({
                  ...input,
                  [name]: value,
                });
                
                const input2 = {...input,[name]:value}
                const validations = validation(input2)
                setErrors(validations)
    };

    const handleSelect = (e)=>{
        const selecTemperament = e.target.value;

    setErrors({
        ...errors,
        temperaments: '',
    });
    setInput({
        ...input,
        temperament: [...input.temperament, selecTemperament]
    });
    }

    useEffect(() => {
        dispatch(getTemperament())
    }, [dispatch])

    const handleErase = (tempRemove) => {
                setInput({
                    ...input,
                    temperament: input.temperament.filter(
                    (temp) => temp !== tempRemove
                  ),
                });
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        const validationErrors = validation(input);

        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
            try {
               const newPostDog = {
                    name: input.name,
                    height: `${input.height_min} - ${input.height_max}`,
                    weight: `${input.weight_min} - ${input.weight_max}`,
                    life_span: input.life_span,
                    image:input.image,
                    temperament: input.temperament,
                };
                
                await dispatch(postDog(newPostDog));

                setInput({
                    name: "",
                    height_min: "",
                    height_max: "",
                    weight_min: "",
                    weight_max: "",
                    life_span: "",
                    image:"",  
                    temperament: [],
                });
    
                alert("The dog was created successfully");
            } catch (error) {
                console.error('Error creating the dog:', error);
    
                alert("Error creating the dog");
            }
        }
    }

    return(
        <div className={styles.form}>
        <div className={styles.container}>
        <Link to="/home">
            <img className={styles.logo} src={logoBack} alt="Logo" />
        </Link>
          <h1 className={styles.title}>New Dog</h1>
          <form onSubmit={handleSubmit}>
            <label>Name: </label>
            <input
              className={styles.inputField}
              name="name"
              placeholder="Name..."
              type="text"
              value={input.name}
              onChange={handleChange}
            />
            <h2 className={styles.errorMessage}>{errors.name && <p>{errors.name}</p>}</h2>
  
            <label>Height min: </label>
            <input
              className={styles.inputField}
              name="height_min"
              placeholder=" Minimum height..."
              type="text"
              value={input.height_min}
              onChange={handleChange}
            />
            <h2 className={styles.errorMessage}>{errors.height_min && <p>{errors.height_min}</p>}</h2>
  
            <label>Height max: </label>
            <input
              className={styles.inputField}
              name="height_max"
              placeholder="Maximum height..."
              type="text"
              value={input.height_max}
              onChange={handleChange}
            />
            <h2 className={styles.errorMessage}>{errors.height_max && <p>{errors.height_max}</p>}</h2>
  
            <label>Weight min: </label>
            <input
              className={styles.inputField}
              name="weight_min"
              placeholder="Minimum weight..."
              type="text"
              value={input.weight_min}
              onChange={handleChange}
            />
            <h2 className={styles.errorMessage}>{errors.weight_min && <p>{errors.weight_min}</p>}</h2>
  
            <label>Weight max: </label>
            <input
              className={styles.inputField}
              name="weight_max"
              placeholder="Maximum weight..."
              type="text"
              value={input.weight_max}
              onChange={handleChange}
            />
            <h2 className={styles.errorMessage}>{errors.weight_max && <p>{errors.weight_min}</p>}</h2>
  
            <label>Life Span: </label>
            <input
              className={styles.inputField}
              name="life_span"
              placeholder="Life span..."
              type="text"
              value={input.life_span}
              onChange={handleChange}
            />
            <h2 className={styles.errorMessage}>{errors.life_span && <p>{errors.life_span}</p>}</h2>
  
            <label>Image: </label>
            <input
              className={styles.inputField}
              name="image"
              type="url"
              placeholder="Image..."
              value={input.image}
              onChange={handleChange}
            />
            <h2 className={styles.errorMessage}>{errors.image && <p>{errors.image}</p>}</h2>

            <label>Temperaments: </label>
            <select className={styles.selectField} onChange={handleSelect} defaultValue="all">
              <option value="all" disabled>
                Temperaments
              </option>
              {allTemperaments.map((t) => (
                <option value={t.name} key={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
              <h2 className={styles.errorMessage}>{errors.temperament && <p>{errors.temperament}</p>}</h2>
                
            <div className={styles.temperament}>
            {input.temperament.map((d, i) => (
              <div className={styles.temperamentItem} key={i++}>
                <div>{d}</div>
                <div className={styles.deleteTemperament} onClick={() => handleErase(d)}>X</div>
              </div>
            ))}
            </div>  
  
            {Object.keys(errors).length === 0 ? (
              <div className={styles.errorMessage}>The dog can't be created yet</div>
            ) : (
              <button
                className={styles.createButton}
                type="submit"
                disabled={
                  errors.name ||
                  errors.height_min ||
                  errors.height_max ||
                  errors.weight_min ||
                  errors.weight_max ||
                  errors.life_span ||
                  errors.temperament
                }
              >
                Create
              </button>
            )}
          </form>
        </div>
      </div>
    )
}

export default Create;