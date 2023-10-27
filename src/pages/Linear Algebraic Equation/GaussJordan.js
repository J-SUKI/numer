import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { create, all } from 'mathjs';
import './style_Linear.css';

function MatrixInversion() {
  const [size, setSize] = useState('2');
  const [matrix, setMatrix] = useState({ a: [], b: [] });
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
      arrayB.push(
        <input
          key={`rowb${i}`}
          className="short-input"
          type="number"
        />
      );
      let temp = [];
      for (let j = 0; j < size; j++) {
        let id = `column${i}row${j}`;
        temp.push(
          <input key={id} id={id} className="short-input" type="number" />
        );
      }
      array[i].push(
        <div key={`matrixA${i}`} className='matrix a'>
          {temp}
        </div>
      );
    }
    setMatrix({ a: array, b: arrayB });
  }

  const calculate = (e) => {
    e.preventDefault();
    let calmatrix = [];
    // Remaining calculation logic
    //setmatrix a&b
    for(let i=0 ; i<size ; i++){
        calmatrix[i] = []
        for(let j=0 ; j<=size ; j++){
          //console.log(Number(document.getElementById('column'+j+'row'+j).value))
          calmatrix[i].push(Number(document.getElementById('column'+i+'row'+j).value)) 
        }
      }
      //console.log(calmatrix)
  
      //Forward Elimination
      for(let i=0 ; i<=size ; i++){
        for(let j=i+1 ; j<size ; j++){
          let soltemp = calmatrix[j][i]/calmatrix[i][i]
          //console.log(soltemp)
          for(let k=0 ; k<=size ; k++){
            let tem = (soltemp*calmatrix[i][k])
            calmatrix[j][k] -= tem
          }
        }
      }
      //console.log(calmatrix)
  
      let arrans = []
      arrans[size] = calmatrix[size-1][size]/calmatrix[size-1][size-1]
      //Backward Subsitution
      for(let i=size-1 ; i>=1 ; i--){
        arrans[i] = calmatrix[i-1][size]
        for(let j=i+1 ; j<=size ; j++){
          let tempind = calmatrix[i-1][j-1]*arrans[j]
          //console.log(tempind)
          arrans[i] -= tempind
          //console.log(arrans)
        }
        arrans[i] = arrans[i]/calmatrix[i-1][i-1]
      }
      console.log(calmatrix)
      //console.log(arrans)
  
    //output on page
    let ans = [];
    for (let i = 1; i < arrans.length; i++) {
      ans.push(<div>x{i}={arrans[i].toFixed(6)}</div>);
    }
    setMatrix({a: matrix.a, b: ans}); 
  };

  
  return (
    <div className='form'>
      <h1>MatrixInversion</h1>
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
        <br />

        <div className="button-container">
          <Button onClick={calculate} variant="info">Calculate</Button>
        </div>
        <div className="result-container">
          {matrix.c}
        </div>
      </div>
    </div>
  );
}

export default MatrixInversion;
