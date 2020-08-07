import React, { createContext, useEffect, useState } from 'react'
import Axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, guardarRecetas] = useState([])
    const [busquedaRecetas, guardarBusquedaRecetas] = useState({
        nombre: '',
        categoria: ''
    })

    const [consultar, guardarConsultar] = useState(false);
    
    //* aqui extraemos cada uno de nuestros valore
    const {nombre, categoria} = busquedaRecetas;


    //* cada que cambie nuestra busqueda se ejecutara
    useEffect(() => {
        if(consultar){
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;

                const resultado = await Axios.get(url);

                guardarRecetas(resultado.data.drinks);
            }
            obtenerRecetas();
        }
    }, [busquedaRecetas, categoria, nombre, consultar]);

    return ( 
        <RecetasContext.Provider
        value={{recetas, guardarBusquedaRecetas, guardarConsultar}}
        >
            {props.children}
        </RecetasContext.Provider>
     );
}
 
export default RecetasProvider;