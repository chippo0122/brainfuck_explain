import {useState} from 'react'
import './index.scss'

export default function InputArea(props) {
    //props
    const {setSlots, setIndex, currentIndex, slots} = props;
    
    const [loopStartAt, setLoopStartAt] = useState([]);
    //const [loopContainer, setLoopContainer] = useState([]);
    const [rawCode, setRawCode] = useState('+++');

    const compileChar = (str) => {
        console.log(str);
        switch (str) {
            case '+':
                const plusSlots = [...slots];
                plusSlots[currentIndex] ++;
                setSlots(plusSlots);
                break;
            case '-':
                const minusSlots = [...slots];
                minusSlots[currentIndex] --;
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
                const addStarts = [...loopStartAt.push(currentIndex)];
                setLoopStartAt(addStarts);
                break;
            case ']':
                const pop = loopStartAt.pop();
                const popStarts = [...loopStartAt];
                setLoopStartAt(popStarts);
                setIndex(pop);
                break;
            // case ',':
            // case '.':
            // case '\n':
            // case ' ':
        }
    }

    const popCode = () => {
        if(rawCode.length > 0) {
            const current = rawCode.charAt(0);
            const newCode = rawCode.slice(1);
            setRawCode(newCode);
            compileChar(current);
        }
    }

    return (
        <div className='input-area'>
            <div className="form-floating">
                <textarea onChange={(e) => {setRawCode(e.target.value)}} value={rawCode} className="form-control code-input" id="codeInput"></textarea>
                <label className='text-light' htmlFor="codeInput">Code Here</label>
            </div>
            <button onClick={popCode} className="btn btn-primary my-3">Execute Step by Step</button>
            {/* <button className="btn btn-outline-warning my-3 ms-3">Execute Automatically</button> */}
        </div>
    )
}
