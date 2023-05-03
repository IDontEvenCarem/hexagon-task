import './App.css'
import DishForm from './DishForm'

function App() {
  const dishSubmitHandler = data => {

  }

  return (
    <div class="center-content">
      <DishForm onSubmit={dishSubmitHandler}></DishForm>
    </div>
  )
}

export default App
