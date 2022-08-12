import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmpList from '../emp-list/emp-list';
import EmpForm from '../emp-add-form/emp-add-form';

import './app.css';




class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: "John S.",salary: 800, increase: false, rise: false, id: 1},
                {name: "Alex M.",salary: 1000, increase: false, rise: false, id: 2},
                {name: "Mike R.",salary: 1500, increase: false, rise: false, id:3}
            ],
            maxId : 4,
            term: '',
            filter: 'all'
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name,salary) => {
        this.setState(({maxId}) => ({
            maxId : maxId +1
        }))
        const newElem = {name, salary, increase: false,rise: false, id: this.state.maxId};
        this.setState(({data}) => {
            const newArr = [...data,newElem];
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id,prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items,term) => {
        if (term === '') {
            return items;
        } 
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

   

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items,filter) => {
        switch(filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case '1000':
                return items.filter(item => +item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }


    render() {
        const {data,term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data,term), filter);
        return (
            <div className="app">
                <AppInfo employees = {employees} increased = {increased}/>
                <div className="search-panel">
                    <SearchPanel onUpdateSearch = {this.onUpdateSearch}/>
                    <AppFilter filter = {this.state.filter} onFilterSelect = {this.onFilterSelect}/>
                </div>
                <EmpList data={visibleData} onDelete={this.deleteItem} onToggleProp={this.onToggleProp}/>
                <EmpForm data={this.state.data} onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;