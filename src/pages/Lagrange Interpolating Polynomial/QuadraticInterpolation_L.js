import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './style_Lagrange.css';

function QuadraticInterpolation_L() {
    const [xValues, setXValues] = useState('');
    const [yValues, setYValues] = useState('');
    const [xTarget, setXTarget] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();


        const xValuesArray = xValues.split(',').map(Number);
        const yValuesArray = yValues.split(',').map(Number);
        const xTargetValue = parseFloat(xTarget);

        const yTarget = QuadraticInterpolation_L(xValuesArray, yValuesArray, xTargetValue);
        setResult(yTarget.toFixed(6));
    };

    const QuadraticInterpolation_L = (x_values, y_values, x_target) => {
        let y_target = 0.0;

        for (let i = 0; i < x_values.length; i++) {
            let L = 1.0;

            for (let j = 0; j < x_values.length; j++) {
                if (i !== j) {
                    L *= (x_target - x_values[j]) / (x_values[i] - x_values[j]);
                }
            }

            y_target += L * y_values[i];
        }

        return y_target;
    };

    return (
        <div className='form'>
            <h1>Lagrange Quadratic Interpolation</h1>
            <br /><br />

            <div className="input-container">
                <div className="form-group">
                    <label htmlFor="xValues">Enter X Values (comma-separated):</label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setXValues(e.target.value)}
                        value={xValues}
                    />
                </div>
                <br />

                <div className="form-group">
                    <label htmlFor="yValues">Enter Y Values (comma-separated):</label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setYValues(e.target.value)}
                        value={yValues}
                    />
                </div>
                <br />

                <div className="form-group">
                    <label htmlFor="xTarget">Enter X Target Value:</label>
                    <Form.Control
                        name="xTarget"
                        type="text"
                        onChange={(e) => setXTarget(e.target.value)}
                        value={xTarget}
                    />
                </div>
                <br />

                <Button onClick={handleSubmit} variant="info">Calculate</Button>
                <br /><br />

                <div className='result-container'>
                    <div>{result}</div>
                </div>
            </div>
        </div>
    );
}

export default QuadraticInterpolation_L;
