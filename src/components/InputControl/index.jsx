import { useState } from 'react'
import './index.scss'

export default function InputArea(props) {
    //props
    const { setSlots, setIndex, currentIndex, slots } = props;

    const [loopIsOn, setLoopIsOn] = useState(false);
    const [tempCode, setTempCode] = useState('');
    const [rawCode, setRawCode] = useState('+++');
    const [output, setOutput] = useState('');

    const compileChar = (str) => {
        switch (str) {
            case '+':
                const plusSlots = [...slots];
                plusSlots[currentIndex]++;
                setSlots(plusSlots);
                break;
            case '-':
                const minusSlots = [...slots];
                minusSlots[currentIndex]--;
                setSlots(minusSlots);
                break;
            case '>':
                const forward = currentIndex + 1;
                setIndex(forward);
                break;
            case '<':
                const backword = currentIndex - 1;
                setIndex(backword);
                break;
            case '[':
                setLoopIsOn(true);
                setTempCode('[');
                break;
            case ']':
                setLoopIsOn(false);

                if (slots[currentIndex] > 0) {
                    setRawCode(`${tempCode}${rawCode}`);
                } else {
                    setTempCode('');
                }

                break;
            case '.':
                const newChar = output + String.fromCharCode(slots[currentIndex]);
                setOutput(newChar);
                break;
            // case ',':
            default:
                break;
        }
    }

    const popCode = () => {
        if (rawCode.length > 0) {
            const current = rawCode.charAt(0);
            const newCode = rawCode.slice(1);
            setRawCode(newCode);
            compileChar(current);

            if (loopIsOn) {
                const newTemp = tempCode + current;
                setTempCode(newTemp);
            }
        }
    }

    const clearAll = () => {
        setLoopIsOn(false);
        setTempCode('');
        setRawCode('');
        setOutput('');
        //props
        setIndex(0);
        setSlots(new Array(10).fill(0));
    }

    return (
        <div className='input-area'>
            <span className="output text-warning fs-5 mb-3">
                OUTPUT : {
                    output
                }
                <span className='bg-warning cursor'></span>
            </span>
            <div className="form-floating">
                <textarea onChange={(e) => { setRawCode(e.target.value) }} value={rawCode} className="form-control code-input" id="codeInput"></textarea>
                <label className='text-light' htmlFor="codeInput">Code Here</label>
            </div>
            <button onClick={popCode} className="btn btn-primary my-3">Execute Step by Step</button>
            <button onClick={clearAll} className="btn btn-outline-warning ms-3 my-3">CLEAR</button>
        </div>
    )
}
