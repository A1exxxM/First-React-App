import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmpList from '../emp-list/emp-list';
import EmpForm from '../emp-add-form/emp-add-form';
import './app.css';



function App() {

    const data = [
        {name: "John S.",salary: 800, increase: false, id: 1},
        {name: "Alex M.",salary: 1000, increase: true, id: 2},
        {name: "Mike R.",salary: 1500, increase: false, id:3}
    ]

    return (
        <div className="app">
            <AppInfo />
            <div className="search-panel">
                <SearchPanel />
                <AppFilter />
            </div>
            <EmpList data={data}/>
            <EmpForm/>
        </div>
    )
}

export default App;