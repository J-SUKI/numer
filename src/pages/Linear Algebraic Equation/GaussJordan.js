import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './style_Linear.css';

function GaussJordan() {
  const [size, setSize] = useState('2');
  const [matrix, setmatrix] = useState('');

  const submit = (e) => {
    e.preventDefault();
    genarate();
  };

  function genarate() {
    let array = [];
    for (let i = 0; i < size; i++) {
      let temp = [];
      for (let j = 0; j <= size; j++) {
        temp.push(
          <input
            id={"column" + i + "row" + j} className="short-input"
            type="number"
          />
        );
      }
      array.push(
        <div key={`matrixA${i}`} className='matrix-row'>
          {temp}
        </div>
      );
    }
    setmatrix({ a: array });
  }

  const cal = e =>{
    e.preventDefault()

    let calmatrix = []

    //setmatrix a&b
    for(let i=0 ; i<size ; i++){
      calmatrix[i] = []
      for(let j=0 ; j<=size ; j++){
        calmatrix[i].push(Number(document.getElementById('column'+i+'row'+j).value)) 
      }
    }


    //Forward Elimination
    for(let i=0 ; i<=size ; i++){
      for(let j=i+1 ; j<size ; j++){
        let soltemp = calmatrix[j][i]/calmatrix[i][i]
        for(let k=0 ; k<=size ; k++){
          let tem = (soltemp*calmatrix[i][k])
          calmatrix[j][k] -= tem
        }
      }
    }

    let arrans = []
    arrans[size] = calmatrix[size-1][size]/calmatrix[size-1][size-1]
    //Backward Subsitution
    for(let i=size-1 ; i>=1 ; i--){
      arrans[i] = calmatrix[i-1][size]
      for(let j=i+1 ; j<=size ; j++){
        let tempind = calmatrix[i-1][j-1]*arrans[j]
        arrans[i] -= tempind
      }
      arrans[i] = arrans[i]/calmatrix[i-1][i-1]
    }
    console.log(calmatrix)

    //output on page
    let ans = []
    for(let i=1 ; i<arrans.length ; i++){
      ans.push(<div>x{i}={arrans[i].toFixed(6)}</div>)
    }
    setmatrix({a:matrix.a,b:ans})
  }

  return (
    <div className="form">
      <h1>Gauss Jordan</h1>
      <br /><br />
      <div className="input-container">
        <div className="form-group">
          <label htmlFor="function">Enter Size = </label>
          <Form.Control name="size" type="number" onChange={(event) => setSize(parseInt(event.target.value) || 2)} value={size} />
        </div>
        <br />

        <Button onClick={submit} variant="info">Create</Button>
        <br /><br />
          <div className="a">{matrix.a}</div>
        </div><br />

        <Button onClick={cal} variant="info">Calculate</Button>
        <div><br /><br />
          {matrix.b}
        </div>
      </div>

  );
}

export default GaussJordan