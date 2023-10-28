import { useState } from 'react';
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap';
import { create, all } from 'mathjs';
import './style_Linear.css';



function CramerRule() {
  const [size, setSize] = useState(2);
  const [matrix, setMatrix] = useState({ a: [], b: [] });
  const config = {};
  const math = create(all, config);

  const submit = (e) => {
    e.preventDefault();
    generate();
  };


  const cal = (e) => {
    e.preventDefault();
    let calMatrix = [];
    let tempB = [];

    // Set matrix a & b
    for (let i = 0; i < size; i++) {
      calMatrix[i] = [];
      tempB.push(Number(document.getElementById(`rowb${i}`).value));
      for (let j = 0; j < size; j++) {
        calMatrix[i].push(Number(document.getElementById(`column${i}row${j}`).value));
      }
    }

    // Calculate
    let detRef = math.det(calMatrix);
    let det = [];
    let tempArr = calMatrix.map((a) => [...a]);

    for (let i = 0; i < size; i++) {
      calMatrix = tempArr.map((a) => [...a]);
      for (let j = 0; j < size; j++) {
        calMatrix[j][i] = tempB[j];
      }
      det[i] = math.det(calMatrix) / detRef;
    }

    // Output on the page
    let tempAns = [];
    for (let i = 0; i < det.length; i++) {
      tempAns.push(<div key={i}>{`x${i + 1} = ${det[i].toFixed(2)}`}</div>);
    }
    setMatrix({ a: matrix.a, b: matrix.b, c: tempAns });

  };

  function generate() {
    let array = [];
    let arrayB = [];
    for (let i = 0; i < size; i++) {
      array[i] = [];
      arrayB.push(<input key={`rowb${i}`} id={`rowb${i}`} className="input-cell" type="number"/>);
      let temp = [];
      for (let j = 0; j < size; j++) {
        let id = `column${i}row${j}`;
        temp.push(<input key={id} id={id} className="input-cell" type="number"/>);
      }
      array[i].push(
        <div key={`matrixA${i}`} className='matrix-row'>
          {temp}
          
        </div>
      );
    }
    setMatrix({ a: array, b: arrayB });
  }

  return (
    <div className='form'>
      <h1>CramerRule</h1>
      <br /><br />
      <div className="input-container">
        <div className="form-group">
          <label htmlFor="function">Enter Size = </label>
          <Form.Control name="size" type="number" onChange={(event) => setSize((event.target.value))} value={size} />
        </div>

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
        <Button onClick={cal} variant="info"> Calculate </Button>
        <br /><br />
          {matrix.c}
      </div>
    </div>
  );
}

export default CramerRule;
