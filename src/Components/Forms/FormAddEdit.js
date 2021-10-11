import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
class AddEditForm extends React.Component {
  state = {
     id: 0,
    nome: '',
    email: '',
    telefone: '',
    id_endereco:0,
    cep:'',
    rua:'',
    bairro:'',
    cidade:'',
    estado:'',
    complemento:''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('https://cortei.herokuapp.com/usuarios', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: this.state.nome,
        email: this.state.email,
        telefone: this.state.telefone,
        cep: this.state.cep,
        rua: this.state.rua,
        bairro: this.state.bairro,
        cidade: this.state.cidade,
        estado: this.state.estado,
        complemento: this.state.complemento
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
      //window.location.reload()
  }

  submitFormEdit = e => {
    e.preventDefault()
    console.log(this.state.id)
    
    
    axios.put('https://cortei.herokuapp.com/usuarios/'+this.state.id, this.state);
    fetch('https://mv-teste.herokuapp.com/employee/', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        nome: this.state.nome,
        email: this.state.email,
        telefone: this.state.telefone,
        id_endereco: this.state.id_endereco,
        cep: this.state.cep,
        rua: this.state.rua,
        bairro: this.state.bairro,
        cidade: this.state.cidade,
        estado: this.state.estado,
        complemento: this.state.complemento
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
      window.location.reload()
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const {  id, nome, email, telefone, id_endereco, cep, rua, bairro, cidade, estado, complemento}  = this.props.item
      this.setState({ id, nome, email, telefone, id_endereco, cep, rua, bairro, cidade, estado, complemento})
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="nome">Nome</Label>
          <Input type="text" name="nome" id="nome" onChange={this.onChange} value={this.state.nome === null ? '' : this.state.nome} />
        </FormGroup>
        <FormGroup>
          <Label for="email">E-mail</Label>
          <Input type="text" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
        </FormGroup>
        <FormGroup>
          <Label for="telefone">Telefone</Label>
          <Input type="text" name="telefone" id="telefone" onChange={this.onChange} value={this.state.telefone === null ? '' : this.state.telefone}  />
        </FormGroup>
        <FormGroup>
          <Label for="cep">Cep</Label>
          <Input type="text" name="cep" id="cep" onChange={this.onChange} value={this.state.cep === null ? '' : this.state.cep}  />
        </FormGroup>
        <FormGroup>
          <Label for="bairro">Bairro</Label>
          <Input type="text" name="bairro" id="bairro" onChange={this.onChange} value={this.state.bairro === null ? '' : this.state.bairro}  />
        </FormGroup>
        <FormGroup>
          <Label for="cidade">Cidade</Label>
          <Input type="text" name="cidade" id="cidade" onChange={this.onChange} value={this.state.cidade === null ? '' : this.state.cidade}  />
        </FormGroup>
        <FormGroup>
          <Label for="estado">Estado</Label>
          <Input type="text" name="estado" id="estado" onChange={this.onChange} value={this.state.estado === null ? '' : this.state.estado}  />
        </FormGroup>
        <FormGroup>
          <Label for="complemento">Complemento</Label>
          <Input type="text" name="complemento" id="complemento" onChange={this.onChange} value={this.state.complemento === null ? '' : this.state.complemento}  />
        </FormGroup>
        <FormGroup>
          <Label for="rua">Rua</Label>
          <Input type="text" name="rua" id="rua" onChange={this.onChange} value={this.state.rua === null ? '' : this.state.rua}  />
        </FormGroup>
        <Button>Salvar</Button>
      </Form>
    );
  }
}

export default AddEditForm