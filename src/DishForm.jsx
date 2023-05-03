import { formValueSelector } from 'redux-form'
import {Field, reduxForm} from 'redux-form'
import {useSelector} from 'react-redux'

function DishFieldText ({input, label, meta: {touched, error}}) {
    return (
        <div className='dishform__field'>
            <label className='dishform__label'>{label}</label>
            <input {...input}></input>
        </div>
    )
}

function DishFieldPreptime ({input, label, meta: {touched, error}}) {
    return (
        <div className='dishform__field'>
            <label className='dishform__label'>{label}</label>
            <input {...input} placeholder='00:00:00'></input>
        </div>
    )
}

function DishFieldOption ({input, options, label, meta: {touched, error}}) {
    return (
        <div className='dishform__field'>
            <label className='dishform__label'>{label}</label>
            <select {...input}>
                <option>None selected</option>
                {options.map(({label, value}) => (<option key={value} value={value}>{label}</option>))}
            </select>
        </div>
    )
}

function DishForm (props) {
    const {handleSubmit} = props
    const formSelector = formValueSelector('dish')
    const type = useSelector(state => formSelector(state, "type"))

    const typeOptions = [
        {label: "Pizza", value: "pizza"},
        {label: "Soup", value: "soup"},
        {label: "Sandwich", value: "sandwich"}
    ]

    return (
        <form onSubmit={handleSubmit} className='dishform'>
            <Field name="name" label="Name" component={DishFieldText}></Field>
            <Field name="preparation_time" label="Preparation Time" component={DishFieldPreptime}></Field>
            <Field name="type" label="Dish type" options={typeOptions} component={DishFieldOption}></Field>
        </form>
    )
}

const validate = data => {

}

export default reduxForm({
    form: 'dish',
    validate
})(DishForm)