import './App.css'
import DishForm from './DishForm'

function App() {
    const dishSubmitHandler = (data) => {
        alert(JSON.stringify(data, undefined, 2))
    }

    return (
        <div className="center-content">
            <DishForm onSubmit={dishSubmitHandler}></DishForm>
        </div>
    )
}

export default App
