import { useEffect, useRef, useState } from 'react'
import './index.scss'

export default function InputArea(props) {
  //props
  const { setSlots, setCurrentIndex, currentIndex, slots } = props;
  //data
  const [loopStack, setLoopStack] = useState([]);
  const [execCode, setExecCode] = useState('');
  const [rawCode, setRawCode] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [output, setOutput] = useState('');
  //control
  const [isPanelLock, setPanelLock] = useState(false);
  const [tick, setTick] = useState(false);

  const timer = useRef(null);

  const compileChar = (str) => {
    switch (str) {
      case '+':
        if (slots[currentIndex] < 255) {
          const plusSlots = [...slots];
          plusSlots[currentIndex]++;
          setSlots(plusSlots);
          break;
        }
      case '-':
        if (slots[currentIndex] > 0) {
          const minusSlots = [...slots];
          minusSlots[currentIndex]--;
          setSlots(minusSlots);
          break;
        }
      case '>':
        const forward = currentIndex + 1;
        setCurrentIndex(forward);
        break;
      case '<':
        const backword = currentIndex - 1;
        setCurrentIndex(backword);
        break;
      case '[':
        setLoopStack([...loopStack, currentStep]);
        break;
      case ']':
        if (slots[currentIndex] > 0) {
          const loopLength = loopStack.length;
          const lastStep = loopStack[loopLength - 1];

          setLoopStack(loopStack.filter((el, index) => {
            return index !== loopLength - 1;
          }));

          setCurrentStep(lastStep);

          const codeBeforeLoop = rawCode.substring(lastStep, rawCode.length);
          setExecCode(codeBeforeLoop);
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
    if (execCode.length > 0 && isPanelLock) {
      const current = execCode.charAt(0);
      const newCode = execCode.slice(1);
      const step = currentStep + 1;
      setExecCode(newCode);
      setCurrentStep(step);
      compileChar(current);
    }
  }

  const openTimer = () => {
    setTick(!tick);
  }

  const autoPopCode = () => {
    timer.current = setInterval(() => {
      if (execCode.length > 0 && isPanelLock) {
        document.getElementById('EXEC').click();
      } else {
        clearInterval(timer.current);
        timer.current = null;
        setTick(false);
      }
    }, 100);
  }

  const clearAll = () => {
    //data
    setExecCode('');
    setRawCode('');
    setOutput('');
    setLoopStack([]);
    setCurrentStep(0);
    //props
    setCurrentIndex(0);
    setSlots(new Array(10).fill(0));
    //control
    setPanelLock(false);
    setTick(false);
  }

  const lockInsertion = () => {
    setPanelLock(!isPanelLock);
    setRawCode(execCode);
  }

  useEffect(() => {
    if (tick) {
      autoPopCode();
    } else {
      clearInterval(timer.current);
      timer.current = null;
      setTick(false);
    }
  }, [tick]);

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
            {
              rawCode.split('').map((el, index) => {
                return index === currentStep ?
                  <span
                    key={index}
                    style={{
                      color: '#55efc4',
                      fontSize: '24px',
                      fontWeight: 500,
                      verticalAlign: 'baseline',
                      textShadow: '0 0 20px #eee'
                    }}
                  >
                    {
                      el
                    }
                  </span> :
                  el
              })
            }
          </div>
        </div>
      </div>
      <button onClick={openTimer} className="btn btn-success my-3">
        {
          tick ? 'Pause' : 'Execute Automatically'
        }
      </button>
      <button id="EXEC" onClick={popCode} className="btn btn-primary my-3 ms-3">Execute Step by Step</button>
      <button onClick={lockInsertion} className="btn btn-danger ms-3 my-3">
        {
          isPanelLock ? 'UNLOCK CODE' : 'LOCK CODE'
        }
      </button>
      <button onClick={clearAll} className="btn btn-outline-warning ms-3 my-3">CLEAR</button>
    </div>
  )
}
