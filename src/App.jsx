import { SubmissionError } from 'redux-form'
import './App.css'
import DishForm from './DishForm'
import pick from 'lodash/pick'

const FETCH_URL =
    'https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/'

// The redux-form library leaves in the data the fields that stopped being rendered,
// so we need to manually pick which fields we want
function PrepareData(data) {
    const common_fields = ['name', 'preparation_time', 'type']
    if (data.type === 'pizza') {
        return pick(data, common_fields, 'no_of_slices', 'diameter')
    } else if (data.type === 'soup') {
        return pick(data, common_fields, 'spiciness_scale')
    } else if (data.type === 'sandwich') {
        return pick(data, common_fields, 'slices_of_bread')
    } else {
        // should not happen
        return data
    }
}


function App() {
    const dishSubmitHandler = async (data) => {
        const fixedData = PrepareData(data)
        const response = await fetch(FETCH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fixedData),
        })
        
        // for now on ok, this would probably be a modal of some sorts,
        // but we dont have anywhere to return our succes to, so let's just
        // notify the user
        if (response.status === 200) {
            const txt = await response.text()
            alert(
                'Successfully sent your dish! Response from the server: ' + txt
            )
        }
        // have we had a bad request, we expect validation errors in the response
        else if (response.status === 400) {
            const body = await response.json()
            throw new SubmissionError(
                // the server returns an array of errors, the lib expects a string
                Object.fromEntries(
                    Object.entries(body).map((entry) => [
                        entry[0],
                        entry[1].join('. '),
                    ])
                )
            )
        }
        else {
            alert(`An unexpected status code of ${response.status} was returned from the server.`)
        }
    }

    return (
        <div className="center-content">
            <DishForm onSubmit={dishSubmitHandler}></DishForm>
        </div>
    )
}

export default App
