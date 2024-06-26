import { useState, useCallback, useEffect, memo } from "react";

// Create a counter component with increment and decrement functions. Pass these functions to a child component which has buttons to perform the increment and decrement actions. 
// Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
    const [count, setCount] = useState(0);
    // const [render, setRender] =  useState(0);

    // Your code starts here
    const handleIncrement = useCallback(() => {
        setCount(() => count+1);
    }, [count]);

    const handleDecrement = useCallback(() => {
        setCount(() => count-1);
    }, [count]);
    // Your code ends here

    // useEffect(() => {
    //     setInterval(() => {
    //         console.log("inside useEffect");
    //         setRender(render+1);
    //     }, 5000);
    // })

    return (
        <div>
            <p>Count: {count}</p>
            <CounterButtons onIncrement={handleIncrement} onDecrement={handleDecrement} />
        </div>
    );
};

const CounterButtons = memo(({ onIncrement, onDecrement }) => {
    console.log("counter button");
    return (
    <div>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
    </div>);
});
