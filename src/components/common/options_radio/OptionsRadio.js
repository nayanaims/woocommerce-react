import React from 'react'
import { Radio, FormControl, FormControlLabel, RadioGroup } from '@mui/material';
const OptionsRadio = (props) => {
    const { value, setAnswer } = props
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    // const [selectedVal, setSelectedVal] = useState(value); 
    return (
        <>
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={value}
                    onChange={(e) => setAnswer(e.target.value)}
                >
                    {
                        options.map((data, index) => ( <FormControlLabel value={data} control={<Radio />} key={index} label={data} />))
                    }
                </RadioGroup>
            </FormControl>
        </>
    )
}
export default OptionsRadio;