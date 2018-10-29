import React, {Component} from 'react';
import axios from 'axios';

import PageHeader from '../template/pageHeader';
import TodoForm from './todoForm';
import TodoList from './todoList';

const API = 'http://localhost:3000/api/todos';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { description: '', list: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
    this.handleMarkAsPending = this.handleMarkAsPending.bind(this);

    this.refresh();
  };

  refresh(description = '') {
    const search = description ? `&description__regex/${description}/` : ''
    axios.get(`${API}?sort=-createdAt${search}`).then(res => {
      this.setState({...this.state, description, list: res.data});
    });
  };

  handleSearch() {
    this.refresh(this.state.description);
  };

  handleChange(e) {
    this.setState({...this.state, description: e.target.value})
  };

  handleAdd() {
    const description = this.state.description;
    axios.post(API, { description }).then(res => {
      this.refresh();
    })
  };

  handleRemove(todo) {
    axios.delete(`${API}/${todo._id}`).then(res => {
      this.refresh(this.state.description);
    });
  };

  handleMarkAsDone(todo) {
    axios.put(`${API}/${todo._id}`, {...todo, done: true}).then(res => {
      this.refresh();
    });
  };

  handleMarkAsPending(todo) {
    axios.put(`${API}/${todo._id}`, {...todo, done: false}).then(res => {
      this.refresh();
    });
  };

  render() {
    return (
      <div>
        <PageHeader name='Tasks' small='Create'></PageHeader>
        <TodoForm 
          description={this.state.description} 
          handleAdd={this.handleAdd}
          handleChange={this.handleChange} 
          handleSearch={this.handleSearch} />
        <TodoList list={this.state.list}
          handleRemove={this.handleRemove}
          handleMarkAsDone={this.handleMarkAsDone}
          handleMarkAsPending={this.handleMarkAsPending}>
        </TodoList>
      </div>
    );
  };
};