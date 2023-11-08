import ApexCharts from 'apexcharts'
import  { useState, useEffect } from 'react';
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap';
import './style_Root.css';


function FalsePosition() {
    var Parser = require('expr-eval').Parser;
    var fx = 'x';
    var er = 'e';
    var l = 'l';
    var r = 'r';
    
    //input string function
    const [func, setfunc] = useState('')
    const [err, seterr] = useState('')
    const [xl, setxl] = useState('')
    const [xr, setxr] = useState('')
    const ansround = []
    const ansxl = []
    const ansfxl = []
    const ansxr = []
    const ansfxr = []
    const ansx1 = []
    const ansfx1 = []
    const anser = [] 
  
    const submit = e => {
      e.preventDefault()
      fx = func
      er = err
      l = xl
      r = xr

      ansround.splice(0)
      ansxl.splice(0)
      ansfxl.splice(0)
      ansxr.splice(0)
      ansfxr.splice(0)
      ansx1.splice(0)
      ansfx1.splice(0)
      anser.splice(0)
  
      let ER = parseFloat(er);
      let L = parseFloat(l);
      let R = parseFloat(r);
      falsep(fx,ER,L,R)
  
      //MATH Graph
      var options = {
        series: [{
          name: "Value",
          data: ansx1
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
        curve: 'smooth'
      },
      title: {
        text: 'Graph',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], 
          opacity: 1
        },
      },
      xaxis: {
        categories: anser
      }
      };
    
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render()
    }

    // คำนวณ
    function falsep(Func,Err,Xl,Xr){
      var parser = new Parser();
      var expr = parser.parse(Func);
  
      let Er = 100.0
      let xnew = 0
      let i=0
      let t=""
  
      while(Er>Err){
        let fxl =  expr.evaluate({ x: Xl }) 
        let fxr =  expr.evaluate({ x: Xr })
        let x1 = ((Xl*fxr)-(Xr*fxl))/(fxr-fxl);
        let fx1 =  expr.evaluate({ x: x1 })

        //เพิ่มข้อมูล
        ansround.push(i)
        ansxl.push(Xl.toFixed(6))
        ansfxl.push(fxl.toFixed(6))
        ansxr.push(Xr.toFixed(6))
        ansfxr.push(fxr.toFixed(6))
        ansx1.push(x1.toFixed(6))
        ansfx1.push(fx1.toFixed(6))
  
        if((fxr*fx1)<0){
          xnew=Xl
          Xl=x1
        }
        else{ 
          xnew=Xr
          Xr=x1 
        }
        Er = Math.abs((x1-xnew)/x1)*100.0
        
        anser.push(Er.toFixed(6))
        t += "Iteration: "+ansround[i]+" X=" +ansxl[i]+", Error="+anser[i]+"%";
        t += "<br /><br />"
        document.getElementById("ans").innerHTML = t;
        i++

      }
    }
  
  
    return (
      <div className='form'>
        <br /><br />
        <h1>FalsePosition Method</h1>
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
          <label for="xl" >Enter xl = </label>
          <Form.Control
            name="xl"
            type="xl"
            onChange={event => setxl(event.target.value)}
            value={xl}
          />
        </div>

        <div className="form-group">
          <label for="xr" >Enter xr = </label>
          <Form.Control
            name="xr"
            type="xr"
            onChange={event => setxr(event.target.value)}
            value={xr}
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
  
  export default FalsePosition;