// import { useState, useMemo } from "react";

// function UseMemo() {
//     const [count, setCount] = useState(0);
//     const [item] = useState([5, 6, 3, 2]);

//     console.log("Component Rendered");

//     const total = useMemo(() => {
//         console.log("Re-calculating Total");
//         return item.reduce(acc, n) => acc + n, 0;
// }, [item]);
// }
// return (
//     <div>
//         <h2>useMemo Example</h2>
//         <p>Total Sum:</p>
//         <p>Count: {count}</p>
//         <button onClick={() => setCount(count + 1)}>
//             Increase Count
//         </button>
//     </div>
// );
// export default useMemo();

// // useEffectEvent() stale value useState (0) //this




// import { useState, useEffect } from "react";

// function useEffectEvent() {
//     const { count, setCount } = useState(0);
//     console.error.log("Staring Timer...");

//     useEffect(() => {
//         console.log("Time log (stale):", count);
//     }, 2000);

//     return (
//         <div>
//             <h2>Broken useEffect </h2>
//             <p>Count: {count}</p>
//             <button onClick={() => setCount(count + 1)}> Increase Count</button>
//         </div>
//     );
// }
// export default UseEffectEvent;

import { useState, useEffect, useEffectEvent } from "react"

function UseEffectEvent() {
    const [count, sectCount] = useState(0);

    console.log("comppnent Rednderd");

    const logLatesCount = useEffectEvenet(() => {
        console.log("Time log (frash) :", count);
    });
}
useEffect(() => {
    console.log("starting Timing...");

    const id = setInterval(() => {
        logLatesCount();
    }, []);
    return (
        <div>
            <h2>Fixed useEffectEvent Example</h2>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Incerase Count</button>
        </div>
    );
})


export default UseEffectEvent;


// useActionState (react 19)