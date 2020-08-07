import React, {useContext, useState} from 'react'
import {CategoriasContext} from '../context/CategoriasContext';
import {RecetasContext} from '../context/RecetasContext';


const Formulario = () => {

    //* extraemos lo que tenemos disponible en value y ya lo podemos usar
    const {categorias} = useContext(CategoriasContext);
    const {guardarBusquedaRecetas, guardarConsultar} = useContext(RecetasContext);

    //* state local
    const [busqueda, guardarBusqueda] = useState({
        nombre: '',
        categoria: ''
    });

    //* funcion obtener los datos de los inputs cada vez que cambien
    const obtenerDatoInputs = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    console.log(categorias);

    return ( 
        <form 
            className="col-12"
            onSubmit={e => {
                e.preventDefault();
                guardarBusquedaRecetas(busqueda);
                guardarConsultar(true);
            }}        
        >
            <fieldset className="text-center">
                <legend>Busca Bebidas por Categoria o Con Ingredientes En Casa</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input type="text"
                    className="form-control"
                    placeholder="Ingresa tu Ingrediente"
                    name="nombre"
                    onChange={obtenerDatoInputs}
                    />
                </div>

                <div className="col-md-4">
                    <select
                    className="form-control"
                    name="categoria"
                    onChange={obtenerDatoInputs}
                    >
                        <option value="">--Selecciona la Categoria--</option>
                        {categorias.map(categoria => (
                            <option
                            key={categoria.strCategory}
                            value={categoria.strCategory}
                            >{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <input type="submit"
                    className="btn btn-block btn-primary"
                    value="Buscar Bebidas"/>
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;