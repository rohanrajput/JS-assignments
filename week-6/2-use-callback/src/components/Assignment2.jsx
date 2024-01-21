import React, { useState, useCallback, memo, useEffect } from 'react';

// Create a component with a text input field and a button. The goal is to display an alert with the text entered when the button is clicked. 
// Use useCallback to memoize the event handler function that triggers the alert, ensuring it's not recreated on every render.
// Currently we only have inputText as a state variable and hence you might not see the benefits of 
// useCallback. We're also not passing it down to another component as a prop which is another reason for you to not see it's benefits immedietely.

export function Assignment2() {
    const [inputText, setInputText] = useState('');
    // const [render, setRender] = useState(0);     // example to show that changing a different state does not re-render alert component

    // Your code starts here
    const showAlert = useCallback( () => {
        alert("You entered: " + inputText);
    }, [inputText]);
    // Your code ends here

    // useEffect(() => {
    //     setInterval(() => {
    //         console.log("running setInterval");
    //         setRender(prevRender => prevRender + 1);
    //     }, 5000);
    // });

    return (
        <div>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter some text"
            />
            <Alert showAlert={showAlert} />
        </div>
    );
};

const Alert = memo(function Alert({showAlert}) {
// function Alert({showAlert}) {
    console.log("alert rendering");
    return <button onClick={showAlert}>Show Alert</button>
// }
});

