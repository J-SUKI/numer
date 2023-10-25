import ApexCharts from 'apexcharts'
import  { useState, useEffect } from 'react';
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap';
import './style_Root.css';

function Secant() {
  var Parser = require('expr-eval').Parser;
  var fx = 'x';
  var er = 'e';
  var X0 = 'x0';
  var X1 = 'x1';
  
  //input string function
  const [func, setfunc] = useState('')
  const [err, seterr] = useState('')
  const [x0, setx0] = useState('')
  const [x1, setx1] = useState('')
  const ansround = []
  const ansx0 = []
  const ansx1 = []
  const ansfx0 = []
  const ansfx1 = []
  const ansxn = []
  const anser = [] 

  const submit = e => {
    e.preventDefault()
    fx = func
    er = err
    X0 = x0
    X1 = x1

    let ER = parseFloat(er);
    let xx0 = parseFloat(X0);
    let xx1 = parseFloat(X1);
    Seca(fx,ER,xx0,xx1)
    
    //MATH Graph
    var options = {
      series: [{
        name: "Value",
        data: ansxn
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
      enabled: true
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Xnew (Graph)',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: anser
    }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render()
  }
  
  function Seca(Func,Err,X0,X1){
    var parser = new Parser();
    var expr = parser.parse(Func);
    let Er = 100.0
    let xnew = 0
    let i=0
    let t=""

    
    while(Er>Err){
      let fxx0 = expr.evaluate({x:X0})
      let fxx1 = expr.evaluate({x:X1})
      ansround.push(i)
      ansx0.push(X0.toFixed(6))
      ansx1.push(X1.toFixed(6))
      ansfx0.push(fxx0.toFixed(6))
      ansfx1.push(fxx1.toFixed(6))

      xnew = X0-((fxx0*(X0-X1))/(fxx0-fxx1))
      Er = Math.abs((xnew-X0)/xnew)*100.0
      X0=X1
      X1=xnew
      ansxn.push(xnew.toFixed(6))
      anser.push(Er.toFixed(6))
      t+="Iteration:"+i+ " X"+(i+1)+" = "+ansx1[i]+" Error= " +anser[i]+" %"
      t+="<br/>"
      document.getElementById("ans").innerHTML = t
      i++

    }
  }
  
  return (
    <div className='form'>
      <h1>Secant Method</h1>
      <br /><br />
        <div className="input-container">
        <div className="form-group">
          <label for="function" c>Enter function = </label>
          <Form.Control
            name="function"
            type="function"
            onChange={event => setfunc(event.target.value)}
            value={func}
          />
        </div>

        <div className="form-group">
          <label for="error">Enter error = </label>
          <Form.Control
            name="error"
            type="error"
            onChange={event => seterr(event.target.value)}
            value={err}
          />
        </div>

        <div className="form-group">
          <label for="error">Enter x0 = </label>
          <Form.Control
            name="x0" 
            type="x0" 
            onChange={event => setx0(event.target.value)} 
            value={x0}
          />
        </div>

        <div className="form-group">
          <label for="error">Enter x1 = </label>
          <Form.Control
            name="x1" 
            type="x1" 
            onChange={event => setx1(event.target.value)} 
            value={x1}
          />
        </div>

        <br /><br />
        <Button onClick={submit} variant="info">submit</Button>        
        </div>
        <p id='ans'></p>
        <p id='chart'></p>

    </div>

  )
}

export default Secant;