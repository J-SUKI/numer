import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { create, all } from 'mathjs';
import './style_Linear.css';

function JacobiIteration() {
  const [size, setSize] = useState('2');
  const [matrix, setmatrix] = useState('');
  const config = {};
  const math = create(all, config);

  const submit = (e) => {
    e.preventDefault();
    genarate();
  };

  //create input value matrix
  function genarate(){
    let array = [] //array for create input feilds matrixa
    let arrayb = [] //array for create input feilds matrixb       
    let tempb = [] //template input feild for matrix b
    let er = []

    er.push(
    <div className="form-group">
        <label htmlFor="function">Enter Error </label>
        <Form.Control id="ERROR" />
      </div>
    )

    for (let i = 0; i < size; i++) {
        array[i] = []; // render  arr
        arrayb[i] = []; // render  arr for matrix b
        tempb.push(<input key={`rowb${i}`} id={`rowb${i}`} className="input-cell" type="number" />);
        let temp = []; // template input field for matrix a
        for (let j = 0; j < size; j++) {
          let id = `column${i}row${j}`;
          temp.push(<input key={id} id={id} className="input-cell" type="number" />);
        }
        array[i].push(<div key={`matrixA${i}`} className="matrix-row">{temp}</div>);
        arrayb[i].push(tempb[i]);
      }
    //setmatrix hook
    setmatrix({a:array,b:arrayb,c:er})
  }

  const cal = e =>{
    e.preventDefault()
    let calmatrix = []
    let tempb = []
    let tempx = []
    let temper = []
    let er

    //setmatrix a&b
    //seterror

    er = Number(document.getElementById('ERROR').value)
    for(let i=0 ; i<size ; i++){
      calmatrix[i] = []
      tempx[i] = 0
      temper[i] = 100.0
      tempb.push(Number(document.getElementById('rowb'+i).value))
      //console.log(Number(document.getElementById('rowb'+i).value))
      for(let j=0 ; j<size ; j++){
        //console.log(Number(document.getElementById('column'+j+'row'+j).value))
        calmatrix[i].push(Number(document.getElementById('column'+i+'row'+j).value))
      }
    }
    //console.log(calmatrix)
    //console.log(temper)
    //console.log(tempER) 

    //calculator
    let x = []
    let round = 0
    for(let i=0 ; i<size ; i++){
      while(temper[i]>er){
        for(let i = 0 ;i < size; i++){
          x[i] = tempb[i];
          for(let j = 0 ;j < size; j++){
            if(j!==i)
              x[i] -= tempx[j]*calmatrix[i][j];
          }
          x[i] /= calmatrix[i][i];
          temper[i] = math.abs((x[i]-tempx[i])/x[i])*100.0
          tempx[i] = x[i]
          round++
        }
      }
      //console.log(temper)
      //console.log(x)
    }
    //console.log(x)

    let ansarr = []
    for(let a=0 ; a<x.length ; a++){
      ansarr.push(
        <div>x{a+1}={x[a].toFixed(2)}</div>
      )
    }
    setmatrix({a:matrix.a,b:matrix.b,c:matrix.c,d:ansarr})
  }

  return (
    <div className='form'>
      <h1>Jacobi Iteration</h1>
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
        { matrix.a }
        </div>
        <div className='matrix'>
        {matrix.b}
        </div>

      </div><br/>
      <div>
        {matrix.c }
      </div><br/><br/>

    <Button onClick={cal} variant="info"> Calculate </Button>
    <br/><br/>
        {matrix.d }
       </div>
      </div>
  );
}

export default JacobiIteration;