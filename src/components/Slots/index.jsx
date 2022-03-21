import { useEffect, useRef, useState } from 'react';
import './index.scss'

export default function Slots(props) {
    //props
    const {slots, currentIndex} = props;
    //state
    const [slotWidth, setSlotWidth] = useState(0);
    //ref
    const slotsContainer = useRef();

    const adjustSlotWidth = () => {
        const width = slotsContainer.current.children[0].offsetWidth;
        setSlotWidth(width);
    }

    useEffect(() => {
        adjustSlotWidth();
        window.addEventListener('resize', adjustSlotWidth);

        return () => {
            window.removeEventListener('resize', adjustSlotWidth);
        }
    }, []);

    return (
        <div ref={slotsContainer} className='slots d-flex justify-content-center mx-auto mt-5 position-relative'>
            {
                slots.map((el, index) => {
                    return (
                        <div className="slot border border-light" key={index}>
                            <p className='text-light fs-1 text-center m-0'>
                                {el}
                            </p>
                        </div>
                    )
                })
            }
            <div style={{width: `${slotWidth}px`, transform: `translateX(${slotWidth * currentIndex}px)`}} className="pointer display-3 text-light text-center position-absolute">↑</div>
        </div>
    )
}
