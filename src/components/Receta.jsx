import React, {useContext} from 'react'
import {ModalContext} from '../context/ModalContext'; 
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

//* esta funcion es para el posicionamiento
function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

//* este es para darle estilo
const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 300,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'scroll',
        height: '100%',
        maxHeight: 500,
        display: 'block'
        },
        header: {
        padding: '12px 0',
        borderBottom: '1px solid darkgrey'
        },
        content: {
        padding: "12px 0",
        overflow: 'scroll'
        }
}));

const Receta = ({receta}) => {

    //*configurando el modal
    const [ modalStyle ] = useState(getModalStyle);
    const [open,setOpen] =useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    //* extrayendo nuestros context
    const {info, guardarIdreceta, guardarReceta} = useContext(ModalContext);

    //*mostrar ingredientes con sus cantidades
    const mostrarIngredientes = info => {
        let ingredientes = [];
        for(let i = 1; i < 16; i++){
            if(info[`strIngredient${i}`]){
                ingredientes.push(
                    <li>{info[`strIngredient${i}`]}{info[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredientes;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Resultado de ${receta.strDrink}`} />    
            
            <div className="card-body">
                <button type="button" 
                className="btn btn-block btn-primary"
                onClick={() =>{
                    guardarIdreceta(receta.idDrink);
                    handleOpen();
                }}
                >Ver Receta</button>

                <Modal
                open={open}
                onClose={() => {
                    guardarIdreceta(null);
                    guardarReceta({});
                    handleClose();
                }}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <h2>{info.strDrink}</h2>
                        <h3 className="mt-4">Instrucciones:</h3>
                        <p>
                            {info.strInstructions}
                        </p>
                        <img className="img-fluid my-4" alt="imagen" src={info.strDrinkThumb}/>
                        <h3>Ingredientes y Cantidades</h3>
                        <ul>
                            {mostrarIngredientes(info)}
                        </ul>
                    </div>
                </Modal>

            </div>
            </div>
        </div>   );
}
 
export default Receta;