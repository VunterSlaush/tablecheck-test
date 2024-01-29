import React, {useEffect, useState} from 'react';

const center = {
    textAlign: 'Center'
};

const btnStyle = {
    paddingRight: '20px',
    paddingLeft: '20px'
};

const textStyle = {
    fontSize: '25px',
    padding: '20px',
    verticalAlign: 'Middle',
    color: 'black',
    opacity: '1',
    border: 'none',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none'
};

function Btn({children, onClick, ...rest}) {
    return (
        <button style={btnStyle} onClick={onClick} {...rest}>
            {children}
        </button>
    );
}

type Props = {
    title: string;
    value: number;
    onValueChange: (number: number) => void
    validNextMove: (number: number) => boolean
};

export default function Counter({title, onValueChange, value, validNextMove}: Props) {

    const [val, setValue] = useState(value);
    useEffect(() => {
        setValue(value)
    }, [value]);

    function handleIncrement() {
        console.log("INCREMENTING")
        onValueChange(value + 1);
    }

    function handleDecrement() {
        onValueChange(value <= 0 ? 0 : value - 1);
    }

    return (
        <div style={center} data-testid={title}>
            <span>{title}</span>
            <br/>
            <Btn onClick={handleIncrement} data-testid={"Counter Add Button"}
                 disabled={!validNextMove(value + 1)}>+</Btn>
            <select style={textStyle} value={val} disabled={true} defaultValue={val}>
                <option defaultValue value={val}>{val}</option>
            </select>
            <Btn onClick={handleDecrement} data-testid={"Counter Subtract Button"}
                 disabled={!validNextMove(value - 1)}>-</Btn>
            <br/>
        </div>
    );
}
