function WithoutId() {
    const id = "name";

    console.log(`{label}`, id );
    return (
        <div style={{margin: "20px"}}>
            <h3>{label}</h3>
            <input id={id} />
        </div>
    );
}

import {useId} from "react"
function UseId() {
    const id = useId();

    console.log(`Generated ID:`, id );

    return (
        <div>
            <h2>useId example</h2>
            <label htmlFor={id}>Name: </label>
            <input id={id} />
        </div>
    )
}
export default UseId;