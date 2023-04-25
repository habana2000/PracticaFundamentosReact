import React, { Component } from 'react';

class ListaSeleccionMultiple extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opciones: props.opciones || [], // Opciones que se mostrarán en la lista de selección
      seleccionadas: props.seleccionadas || [], // Opciones seleccionadas por el usuario
    };
  }

  // Función que se ejecutará cada vez que el usuario seleccione una opción en la lista
  handleChange = (event) => {
    const { opciones, seleccionadas } = this.state;

    // Obtenemos el valor de la opción seleccionada
    const valor = event.target.value;

    // Verificamos si la opción ya está seleccionada o no
    const index = seleccionadas.indexOf(valor);

    // Si la opción ya está seleccionada, la eliminamos de la lista de opciones seleccionadas
    if (index !== -1) {
      seleccionadas.splice(index, 1);
    } else { // Si la opción no está seleccionada, la agregamos a la lista de opciones seleccionadas
      seleccionadas.push(valor);
    }

    // Actualizamos el estado del componente
    this.setState({ seleccionadas });
  }

  render() {
    const { opciones, seleccionadas } = this.state;

    return (
      <select multiple value={seleccionadas} onChange={this.handleChange}>
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>{opcion}</option>
        ))}
      </select>
    );
  }
}

export default ListaSeleccionMultiple;



import ListaSeleccionMultiple from './ListaSeleccionMultiple';



<form>
  <ListaSeleccionMultiple opciones={['Opción 1', 'Opción 2', 'Opción 3']} />
  <button type="submit">Enviar</button>
</form>





