import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Deseja Deletar?')
    if(confirmDelete){
      console.log(id)
      axios.delete('https://cortei.herokuapp.com/usuarios/' + id);
      fetch('https://mv-teste.herokuapp.com/employee', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.id}</td>
          <td>{item.nome}</td>
          <td>{item.email}</td>
          <td>{item.telefone}</td>
          <td>{item.cep}</td>
          <td>{item.bairro}</td>
          <td>{item.cidade}</td>
          <td>{item.estado}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Editar" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Deletar</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
          <th>ID</th>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>TELEFONE</th>
            <th>CEP</th>
            <th>BAIRRO</th>
            <th>CIDADE</th>
            <th>ESTADO</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable