import { formValueSelector } from 'redux-form'
import { Field, reduxForm } from 'redux-form'
import { useSelector } from 'react-redux'
import './DishForm.css'
import ReactInputMask from 'react-input-mask'


// Create the label and error fields for the wrapped component
const DishFieldWrapper = Fncomp => props => (
    <div className='dishform__field'>
        <label className='dishform__label'>{props.label}:</label>
        <Fncomp {...props}></Fncomp>
        {props.meta.touched && props.meta.error && (
            <div className='dishform__error'>{props.meta.error}</div>
        )}
    </div>
)

function BasicTextField({ input, placeholder }) {
    return (
        <input {...input} placeholder={placeholder}></input>
    )
}

function PreptimeField({ input, placeholder }) {
    return (
        <ReactInputMask mask={'99:99:99'} alwaysShowMask={!placeholder} {...input} placeholder={placeholder}></ReactInputMask>
    )
}

function OptionsField({ input, options }) {
    return (
        <select {...input}>
            {options.map(({ label, value }) => <option key={value || "__NoKey"} value={value}>{label}</option>)}
        </select>
    )
}

function NumberField({ input, min, max, step, placeholder }) {
    return (
        <input {...input} min={min} max={max} step={step} placeholder={placeholder} type="number"></input>
    )
}


// We have to compute it once, outside the render function, to make the component identity unique
// if we try to use the function in the render function, the inputs get replaced too often
const WrappedBasicTextField = DishFieldWrapper(BasicTextField)
const WrappedPreptimeField = DishFieldWrapper(PreptimeField)
const WrappedOptionsField = DishFieldWrapper(OptionsField)
const WrappedNumberField = DishFieldWrapper(NumberField)

function DishForm(props) {
    const { handleSubmit } = props
    const formSelector = formValueSelector('dish')
    const type = useSelector(state => formSelector(state, "type"))

    const typeOptions = [
        { label: "None selected" },
        { label: "Pizza", value: "pizza" },
        { label: "Soup", value: "soup" },
        { label: "Sandwich", value: "sandwich" }
    ]

    return (
        <form onSubmit={handleSubmit} className='dishform'>
            <p className='dishform__header'>
                Submit-a-dish
            </p>
            <div className='dishform__fields-container'>
                <div className='dishform__fields'>
                    <Field name="name" label="Name" placeholder='Chilli con Saturne' component={WrappedBasicTextField}></Field>
                    <Field name="preparation_time" label="Preparation Time" placeholder='01:45:00' component={WrappedPreptimeField}></Field>
                    <Field name="type" label="Dish type" options={typeOptions} component={WrappedOptionsField}></Field>
                    {type === 'pizza' && (
                        <>
                            <Field name='no_of_slices' label="Number of slices" min={1} placeholder='8' component={WrappedNumberField}></Field>
                            <Field name='diameter' label="Diameter" step={0.1} placeholder='15.6' component={WrappedNumberField}></Field>
                        </>
                    )}
                    {type === 'soup' && (
                        <Field name='spiciness_scale' label="Spiciness Scale" min={1} max={10} placeholder='7' component={WrappedNumberField}></Field>
                    )}
                    {type === 'sandwich' && (
                        <Field name='slices_of_bread' label="Slices of Bread" min={1} placeholder='2' component={WrappedNumberField}></Field>
                    )}
                </div>
            </div>
            <input type="submit" value="Send!" className='dishform__button'></input>
        </form>
    )
}

const validate = data => {
    const errors = {}

    // validating common fields
    if (!data.name) {
        errors.name = "Name is required"
    }
    if (!data.preparation_time) {
        errors.preparation_time = "Preparation time is required"
    } else {
        if (/^\d{2}:\d{2}:\d{2}$/.test(data.preparation_time) === false) {
            errors.preparation_time = "Invalid preparation time - use the HH:MM:SS format, and fill out every field"
        }
    }
    if (!data.type) {
        errors.type = "You must select a type for the dish"
    }

    // validating type specific fields
    if (data.type) {
        // validating pizza
        if (data.type === 'pizza') {
            if (!data.no_of_slices) {
                errors.no_of_slices = "Number of slices is required"
            } else if (false === /^\d+$/.test(data.no_of_slices)) { // weird test cos ! and then a regex is hard to read
                errors.no_of_slices = "Invalid number, must be an integer"
            }
            
            if (!data.diameter) {
                errors.diameter = "Diameter is required"
            }
        }

        // validating soup
        if (data.type === 'soup') {
            if (!data.spiciness_scale) {
                errors.spiciness_scale = 'Spiciness scale is required'
            } else {
                const nspicy = parseInt(data.spiciness_scale)
                if (nspicy < 1 || nspicy > 10) {
                    errors.spiciness_scale = 'Spiciness scale goes from 1 to 10'
                }
            }
        }

        // validating sandwiches
        if (data.type === 'sandwich') {
            if (!data.slices_of_bread) {
                errors.slices_of_bread = "Number of slices is required"
            } else {
                if (parseInt(data.slices_of_bread) < 1) {
                    errors.slices_of_bread = "A sandwitch has to have at least one slice"
                }
            }
        }
    }

    return errors
}

export default reduxForm({
    form: 'dish',
    validate
})(DishForm)