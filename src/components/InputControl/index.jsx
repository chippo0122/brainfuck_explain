import {useState} from 'react'
import './index.scss'

export default function InputArea(props) {

    const [rawCode, setRawCode] = useState('+++');

    const popCode = () => {
        const newCode = rawCode.slice(1);
        setRawCode(newCode);
    }

    return (
        <div className='input-area'>
            <div className="form-floating">
                <textarea onChange={(e) => {setRawCode(e.target.value)}} value={rawCode} className="form-control code-input" id="codeInput"></textarea>
                <label className='text-light' htmlFor="codeInput">Code Here</label>
            </div>
            <button onClick={popCode} className="btn btn-primary my-3">Execute Step by Step</button>
            <button className="btn btn-outline-warning my-3 ms-3">Execute Automatically</button>
        </div>
    )
}
