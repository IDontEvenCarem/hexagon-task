import { formValueSelector } from 'redux-form'
import {Field, reduxForm} from 'redux-form'
import {useSelector} from 'react-redux'
import './DishForm.css'

function DishFieldText ({input, label, meta: {touched, error}}) {
    return (
        <div className='dishform__field'>
            <label className='dishform__label'>{label}</label>
            <input {...input}></input>
            {touched && error && (<div className='dishform__error'>{error}</div>)}
        </div>
    )
}

function DishFieldPreptime ({input, label, meta: {touched, error}}) {
    return (
        <div className='dishform__field'>
            <label className='dishform__label'>{label}</label>
            <input {...input} placeholder='00:00:00'></input>
            {touched && error && (<div className='dishform__error'>{error}</div>)}
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
            <Field name="name" label="Name" placeholder='Suflet Mignion' component={DishFieldText}></Field>
            <Field name="preparation_time" label="Preparation Time" component={DishFieldPreptime}></Field>
            <Field name="type" label="Dish type" options={typeOptions} component={DishFieldOption}></Field>
            {type === 'pizza' && (
                <>
                    <Field name='no_of_slices' label="Number of slices" component={DishFieldText}></Field>
                    <Field name='diameter' label="Diameter" component={DishFieldText}></Field>
                </>
            )}
            <input type="submit" value="Save" className='dishform__button'></input>
        </form>
    )
}

const validate = data => {
    const errors = {}
    if (!data.name) {
        errors.name = "Name is required"
    }
    if (!data.preparation_time) {
        errors.preparation_time = "Preparation time is required"
    }
    if (!data.type) {
        errors.type = "You must select a type for the dish"
    }
    if (data.type && data.type === 'pizza') {
        if (!data.no_of_slices) {
            errors.no_of_slices = "Number of slices is required"
        }
        if (!data.diameter) {
            errors.diameter = "Diameter is required"
        }
    }
    return errors
}

export default reduxForm({
    form: 'dish',
    validate
})(DishForm)