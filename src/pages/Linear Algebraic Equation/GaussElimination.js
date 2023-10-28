import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { create, all } from 'mathjs';
import './style_Linear.css';

function GaussElimination() {
  const [size, setSize] = useState(2);
  const [matrix, setmatrix] = useState({ a: [], b: [] });
  const config = {};
  const math = create(all, config);

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
            id={"column" + i + "row" + j} className="input-cell"
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

  
  const cal = (e) => {
    e.preventDefault();
    let calmatrix = [];
    let tmpa = [];
    let tempb = [];
    let calstep = [];

    for (let i = 0; i < size; i++) {
      calmatrix[i] = [];
      tmpa[i] = [];
      calstep[i] = [];
      // setmatrixb
      tempb.push(Number(document.getElementById('column' + i + 'row' + size).value) || 0);
      // setmatrixa
      for (let k = 0; k < size; k++) {
        tmpa[i].push(Number(document.getElementById('column' + i + 'row' + k).value) || 0);
      }
      // setmatrix a|b
      for (let j = 0; j <= size; j++) {
        calmatrix[i].push(Number(document.getElementById('column' + i + 'row' + j).value) || 0);
      }
    }
    let roundtri = 1;
    let matrixA = calmatrix.map((a) => a.slice());
    let tempa = calmatrix.map((a) => a.slice());

    for (let i = 0; i < size; i++) {
      for (let j = i + 1; j < size; j++) {
        let temp = tempa[j][i] / tempa[i][i];
        for (let k = 0; k <= size; k++) {
          let sol = temp * tempa[i][k];
          tempa[j][k] = tempa[j][k] - sol;
        }
        calmatrix[i] = tempa;
        let tmpstep = [];
        for (let a = 0; a < size; a++) {
          tmpstep.push(<div>{calmatrix[i][a] + ' '}</div>);
        }
        calstep[i].push(
          <div className={'step'}>
            step{roundtri++}
            {tmpstep}
          </div>
        );
      }
    }

    let arrans = [];
    arrans[size] = tempa[size - 1][size] / tempa[size - 1][size - 1];

    for (let i = size - 1; i >= 1; i--) {
      arrans[i] = tempa[i - 1][size];
      for (let j = i + 1; j <= size; j++) {
        let tempind = tempa[i - 1][j - 1] * arrans[j];
        arrans[i] = arrans[i] - tempind;
      }
      arrans[i] = arrans[i] / tempa[i - 1][i - 1];
    }

    let ind = 0;
    let listans = [];
    for (let i = 1; i <= size; i++) {
      listans[ind] = arrans[i].toFixed(2);
      ind++;
    }

    let checkans = math.multiply(tmpa, listans);

    let ans = [];
    for (let i = 1; i < arrans.length; i++) {
      ans.push(<div>x{i} = {arrans[i].toFixed(6)} </div>);
    }
    setmatrix({ a: matrix.a, b: ans, c: calmatrix, d: calstep, e: matrixA, f: tempb, g: listans, z: checkans });
  }
  

  return (
    <div className="form">
      <h1>GaussElimination</h1>
      <br /><br />
      <div className="input-container">
        <div className="form-group">
          <label htmlFor="function">Enter Size = </label>
          <Form.Control name="size" type="number" onChange={(event) => setSize(parseInt(event.target.value) || 2)} value={size} />
        </div>
        <br />

        <Button onClick={submit} variant="info">Create</Button>
        <br />

          <div className="a">{matrix.a}</div>
        </div><br />

        <Button onClick={cal} variant="info">Calculate</Button>
        <div><br /><br />
          {matrix.b}
        </div>
      </div>
  );
}

export default GaussElimination;
