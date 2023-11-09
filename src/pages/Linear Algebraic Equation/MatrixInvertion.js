import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { create, all } from 'mathjs';
import './style_Linear.css';

function MatrixInvertion() {
    const [size, setSize] = useState('2');
    const [matrix, setMatrix] = useState('');
    const config = {};
    const math = create(all, config);

    const submit = (e) => {
        e.preventDefault();
        generate();
    };

    function generate() {
        let array = [];
        let arrayB = [];
        for (let i = 0; i < size; i++) {
            array[i] = [];
            arrayB.push(<input key={`rowb${i}`} id={`rowb${i}`} className="input-cell" type="number" />);
            let temp = [];
            for (let j = 0; j < size; j++) {
                let id = `column${i}row${j}`;
                temp.push(<input key={id} id={id} className="input-cell" type="number" />);
            }
            array[i].push(
                <div key={`matrixA${i}`} className='matrix-row'>
                    {temp}

                </div>
            );
        }
        setMatrix({ a: array, b: arrayB });
    }


    const cal = (e) => {
        e.preventDefault();
        let calmatrix = [];
        let tempb = [];

        //setmatrix a&b
        for (let i = 0; i < size; i++) {
            calmatrix[i] = [];
            tempb.push(Number(document.getElementById('rowb' + i).value));
            for (let j = 0; j < size; j++) {
                calmatrix[i].push(Number(document.getElementById('column' + i + 'row' + j).value));
            }
        }
        console.log(calmatrix);
        console.log(tempb);

        //inverse matrix
        console.log(math.inv(calmatrix));
        let invmatrix = math.inv(calmatrix);

        //answer
        let ans = math.multiply(invmatrix, tempb);
        console.log(ans);

        let arrans = [];
        for (let i = 0; i < ans.length; i++) {
            arrans.push(
                <div>
                    x{i + 1}={ans[i].toFixed(6)}
                </div>
            );
        }
        setMatrix({ a: matrix.a, b: matrix.b, c: arrans });
    }

    return (
        <div className='form'>
          <h1>MatrixInvertion</h1>
          <br /><br />
      
          <div className="input-container">
            <div className="form-group">
              <label htmlFor="function">Enter Size = </label>
              <Form.Control
                name="size"
                type="number"
                onChange={(event) => setSize(parseInt(event.target.value) || 2)}
                value={size}
              />
            </div>
            <br />
      
            <Button onClick={submit} variant="info">Create</Button>
            <br /><br />
      
            <div className='matrix-container'>
              <div className='matrix'>
                {matrix.a}
              </div>
              <div className='matrix'>
                {matrix.b}
              </div>
            </div>
            <br /><br />
            <div className="button-container">
              <Button onClick={cal} variant="info">Calculate</Button>
            </div><br /><br />
              {matrix.c}
            </div>
          </div>
    );      
}

export default MatrixInvertion;
