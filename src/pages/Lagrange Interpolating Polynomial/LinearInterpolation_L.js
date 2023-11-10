import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import ApexCharts from 'apexcharts';
import './style_Lagrange.css';

function LinearInterpolation() {
    const [point1X, setPoint1X] = useState('');
    const [point1Y, setPoint1Y] = useState('');
    const [point2X, setPoint2X] = useState('');
    const [point2Y, setPoint2Y] = useState('');
    const [xValue, setXValue] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        // Update the chart whenever the result changes
        updateChart();
    }, [result]);

    const handleSubmit = (e) => {
        e.preventDefault();
        calculate();
    };

    const calculate = () => {
        // Convert the input to numbers
        const x1 = parseFloat(point1X);
        const y1 = parseFloat(point1Y);
        const x2 = parseFloat(point2X);
        const y2 = parseFloat(point2Y);
        const x = parseFloat(xValue);

        // Perform Lagrange linear interpolation
        const result = ((((x2 - x) / (x2 - x1)) * y1) + ((x1 - x) / (x1 - x2) * y2));
        setResult(result);
    };

    const updateChart = () => {
        // Chart options
        const options = {
            series: [{
                name: 'Data',
                data: [parseFloat(point1X), parseFloat(point2X)]
            }],
            chart: {
                height: 350,
                width: 800,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Linear Interpolation Chart',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: [parseFloat(point1Y), parseFloat(point2Y)]
            }
        };

        // Render the chart
        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    };

    return (
        <div className='form'>
            <h1>Lagrange Linear Interpolation</h1>
            <br /><br />

            <div className="input-container">
                <div className="form-group">
                    <label htmlFor="point1X">Enter Point 1 X:</label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setPoint1X(e.target.value)}
                        value={point1X}
                    />
                    <label htmlFor="point1Y">Enter Point 1 Y:</label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setPoint1Y(e.target.value)}
                        value={point1Y}
                    />
                </div>
                <br />

                <div className="form-group">
                    <label htmlFor="point2X">Enter Point 2 X:</label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setPoint2X(e.target.value)}
                        value={point2X}
                    />
                    <label htmlFor="point2Y">Enter Point 2 Y:</label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setPoint2Y(e.target.value)}
                        value={point2Y}
                    />
                </div>
                <br />

                <div className="form-group">
                    <label htmlFor="xValue">Enter X Value to Interpolate:</label>
                    <Form.Control
                        name="xValue"
                        type="text"
                        onChange={(e) => setXValue(e.target.value)}
                        value={xValue}
                    />
                </div>
                <br />

                <Button onClick={handleSubmit} variant="info">Calculate</Button>
                <br /><br />

                <div className='result-container'>
                    <div>{result}</div>
                </div>
            </div>

            <div id="chart"></div>
        </div>
    );
}

export default LinearInterpolation;
