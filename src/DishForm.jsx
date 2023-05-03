import { formValueSelector } from 'redux-form'
import { Field, reduxForm } from 'redux-form'
import { useSelector } from 'react-redux'
import './DishForm.css'


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

function BasicTextField({ input }) {
    return (
        <input {...input}></input>
    )
}

function PreptimeField({ input }) {
    return (
        <input {...input} placeholder='00:00:00'></input>
    )
}

function OptionsField({ input, options }) {
    return (
        <select {...input}>
            {options.map(({ label, value }) => <option key={value || "__NoKey"} value={value}>{label}</option>)}
        </select>
    )
}

function NumberRangeField({ input, min, max }) {
    return (
        <input {...input} min={min} max={max} type="number"></input>
    )
}

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
                    <Field name="name" label="Name" placeholder='Suflet Mignion' component={DishFieldWrapper(BasicTextField)}></Field>
                    <Field name="preparation_time" label="Preparation Time" component={DishFieldWrapper(PreptimeField)}></Field>
                    <Field name="type" label="Dish type" options={typeOptions} component={DishFieldWrapper(OptionsField)}></Field>
                    {type === 'pizza' && (
                        <>
                            <Field name='no_of_slices' label="Number of slices" component={DishFieldWrapper(BasicTextField)}></Field>
                            <Field name='diameter' label="Diameter" component={DishFieldWrapper(BasicTextField)}></Field>
                        </>
                    )}
                    {type === 'soup' && (
                        <Field name='spiciness_scale' label="Spiciness Scale" min={1} max={10} component={DishFieldWrapper(NumberRangeField)}></Field>
                        )}
                    {type === 'sandwich' && (
                        <Field name='slices_of_bread' label="Slices of Bread" min={1} component={DishFieldWrapper(NumberRangeField)}></Field>
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
                alert(1)
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