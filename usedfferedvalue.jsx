// import {useState} from "react"
// function WtihoutDefferredValue(){
//     const [input, setInput] = useState("");

//     console.log("Input ", input);
//     const list = Array(5000).fill(input);

//     return (
//         <div>
//             <h2>Wtihout useDeferredValue</h2>
//             <input placeholder = "type here.."></input>
//             onChange = {(e) => setInput(e.target.value)}

//             {list.map((item, index) => (
//                 <p key={index}>{item}</p>
//             ))}
//         </div>
//     );
// }
// export default WtihoutDefferredValue;


import {useState, useDeferredValue} from "react"
function WithDefferredValue(){
    const [input, setInput] = useState("");
    const deferredInput = useDeferredValue(input);

    console.log("Input ", input);
    console.log("Deferred Input ", deferredInput);

    const list = Array(5000).fill(deferredInput);

    return (
        <div>
            <h2>With useDeferredValue</h2>
            <input placeholder = "type here.."></input>
            onChange = {(e) => setInput(e.target.value)}
            {list.map((item, index) => (
                <p key={index}>{item}</p>
            ))}
        </div>
    );
}
export default WithDefferredValue;
