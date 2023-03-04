import { useState } from 'react'
import './index.scss'

export default function InputArea(props) {
  //props
  const { setSlots, setIndex, currentIndex, slots } = props;

  // const [loopIsOn, setLoopIsOn] = useState(false);
  // const [tempCode, setTempCode] = useState('');
  const [execCode, setExecCode] = useState('+++');
  const [rawCode, setRawCode] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [output, setOutput] = useState('');

  //control
  const [isPanelLock, setPanelLock] = useState(false);

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
        // setLoopIsOn(true);
        // setTempCode('[');
        break;
      case ']':
        // setLoopIsOn(false);

        // if (slots[currentIndex] > 0) {
        //   setRawCode(`${tempCode}${rawCode}`);
        // } else {
        //   setTempCode('');
        // }

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
    if (execCode.length > 0 && isPanelLock) {
      const current = execCode.charAt(0);
      const newCode = execCode.slice(1);
      setExecCode(newCode);
      compileChar(current);

      // if (loopIsOn) {
      //   const newTemp = tempCode + current;
      //   setTempCode(newTemp);
      // }
    }
  }

  const clearAll = () => {
    // setLoopIsOn(false);
    // setTempCode('');
    setExecCode('');
    setRawCode('');
    setOutput('');
    //props
    setIndex(0);
    setSlots(new Array(10).fill(0));
  }

  const lockInsertion = () => {
    setPanelLock(!isPanelLock);
    setRawCode(execCode);
  }

  return (
    <div className='input-area'>
      <span className="output text-warning fs-5 mb-3">
        OUTPUT : {
          output
        }
        <span className='bg-warning cursor'></span>
      </span>
      <div className="d-flex">
        <div className="form-floating w-50">
          <textarea onChange={(e) => { setExecCode(e.target.value) }} value={execCode} disabled={isPanelLock} className="form-control code-input" id="codeInput"></textarea>
          <label className='text-light' htmlFor="codeInput">Code Here</label>
        </div>
        <div className="border border-warning rounded ms-3 py-2 px-3 w-50">
          <label className='text-light' htmlFor="codeInput">The code Executing</label>
          <div className='text-warning'>
            {rawCode}
          </div>
        </div>
      </div>
      <button onClick={popCode} className="btn btn-primary my-3">Execute Step by Step</button>
      <button onClick={lockInsertion} className="btn btn-outline-warning ms-3 my-3">
        {
          isPanelLock ? 'UNLOCK CODE' : 'LOCK CODE'
        }
      </button>
      <button onClick={clearAll} className="btn btn-outline-warning ms-3 my-3">CLEAR</button>
    </div>
  )
}
