import { useEffect, useRef } from "react";

// Create a component with a text input field and a button. 
// When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {
    const inputRef = useRef();

    useEffect(() => {
        // Calling `focus()` on the `current` property of the ref object refers to the
        // DOM node that this reference points to. In this case, it's our `<input
        // type="text" />`.
        inputRef.current.focus();
    }, []);

    const handleButtonClick = () => {
        inputRef.current.focus();
    };

    return (
        <div>
            <input type="text" placeholder="Enter text here" ref={inputRef} />
            <button onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
};
