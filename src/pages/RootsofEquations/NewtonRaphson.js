import ApexCharts from 'apexcharts'
import  { useState, useEffect } from 'react';
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap';
import { create, all } from 'mathjs'
import './style_Root.css';

function NewtonRaphson() {
  var Parser = require('expr-eval').Parser;
  var fx = 'x';
  var er = 'e';
  var x = 'x';
  
  //input string function
  const [func, setfunc] = useState('')
  const [err, seterr] = useState('')
  const [x1, setx1] = useState('')
  const ansround = []
  const ansx = []
  const ansxn = []
  const ansfx = []
  const ansdfx = []
  const anser = []
  const config = { }
  const math = create(all, config)
  const submit = e => {
    e.preventDefault()
    fx = func
    er = err
    x = x1

    let ER = parseFloat(er);
    let X = parseFloat(x);
    Newtonrap(fx,ER,X)
    
    //MATH Graph
    var options = {
      series: [{
        name: "Value",
        data: ansx
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
      text: 'X (Graph)',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], 
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

  function Newtonrap(Func,Err,X){
    var parser = new Parser();
    var expr = parser.parse(Func);
    let Er = 100.0
    let dfx = math.derivative(Func,'x')
    let xnew = 0
    let i=0
    let t=""
    while(Er>Err){
      ansround.push(i)
      ansx.push(X.toFixed(6))

      let fxx = expr.evaluate({x:X})
      let Dx = dfx.evaluate({x:X})
      xnew = X-(fxx/Dx)
      Er = Math.abs((xnew-X)/xnew)*100.0
      X=xnew
            
      ansfx.push(fxx.toFixed(6))
      ansdfx.push(Dx.toFixed(6))
      ansxn.push(xnew.toFixed(6))
      anser.push(Er.toFixed(6))

      t+="Iteration: "+ansround[i]+" X= "+ansx[i]+ "  Error= " +anser[i]+ " %"
      t+="<br/>"
      document.getElementById("ans").innerHTML = t
      
      i++

    }
  }
  return (
    <div className='form'>
      <h1>Newton-Raphson Method</h1>
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
          <label for="x1" >Enter x = </label>
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

export default NewtonRaphson