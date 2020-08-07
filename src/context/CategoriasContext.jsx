import React, {createContext, useEffect, useState} from 'react'
import Axios from 'axios';

//* se crea el context asignandole un nombre 
export const CategoriasContext = createContext();

//* creamos el provider que es donde estaran nuestras funciones, datos y state
//* siempre es un arrowfunction y siempre se le pasan props para hacer referencia a los componentes hijos
//* se importa en APP para que este disponible para los hijos
const CategoriasProvider = (props) =>{

    const [categorias, guardarCategorias] = useState([]);

    //* como queremos que se ejecute una sola vez declaramos las dependencias vaciasy ejecutamos el llamado a la api
    useEffect(() => {
    const obtenerCategorias = async () => {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        const categorias = await Axios.get(url);
        guardarCategorias(categorias.data.drinks);
    } 
    obtenerCategorias();  
    }, []);

    //* en nuestro return es donde ponemos todo lo que estara disponible para los componentes hijos
    //* EEN VALUE es donde se pasan 
    return(
        <CategoriasContext.Provider
            value={{categorias}}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;