import React from 'react';
import ApexCharts from 'apexcharts';
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap';
import { Parser } from 'expr-eval';
import './style_Root.css';

class Bisection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      func: '',
      err: '',
      xl: '',
      xr: '',
    };
    this.ansround = [];
    this.ansxl = [];
    this.ansfxl = [];
    this.ansxr = [];
    this.ansfxr = [];
    this.ansxm = [];
    this.ansfxm = [];
    this.anser = [];
    this.fx = 'x';
    this.er = 'e';
    this.l = 'l';
    this.r = 'r';
  }

  submit = (e) => {
    e.preventDefault();
    this.fx = this.state.func;
    this.er = this.state.err;
    this.l = this.state.xl;
    this.r = this.state.xr;
    this.ansround.splice(0);
    this.ansxl.splice(0);
    this.ansfxl.splice(0);
    this.ansxr.splice(0);
    this.ansfxr.splice(0);
    this.ansxm.splice(0);
    this.ansfxm.splice(0);
    this.anser.splice(0);

    let ER = parseFloat(this.er);
    let L = parseFloat(this.l);
    let R = parseFloat(this.r);
    this.Bisec(this.fx, ER, L, R);

    //MATH Graph
    var options = {
      series: [
        {
          name: 'Value',
          data: this.ansxm,
        },
      ],
      chart: {
        height: 350,
        width: 800,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Xm (Graph)',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: this.anser,
      },
    };

    var chart = new ApexCharts(document.querySelector('#chart'), options);
    chart.render();
  };

  //Calculator
  Bisec(Func, Err, Xl, Xr) {
    var parser = new Parser();
    var expr = parser.parse(Func);
    let Er = 100.0;
    let xnew = 0;
    let i = 0;
    let t = '';
    while (Er > Err) {
      let xm = (Xl + Xr) / 2.0;
      let fxm = expr.evaluate({ x: xm });
      let fxl = expr.evaluate({ x: Xl });
      let fxr = expr.evaluate({ x: Xr });
      this.ansround.push(i);
      this.ansxl.push(Xl.toFixed(6));
      this.ansfxl.push(fxl.toFixed(6));
      this.ansxr.push(Xr.toFixed(6));
      this.ansfxr.push(fxr.toFixed(6));
      this.ansxm.push(xm.toFixed(6));
      this.ansfxm.push(fxm.toFixed(6));

      if (fxr * fxm < 0) {
        xnew = Xl;
        Xl = xm;
      } else {
        xnew = Xr;
        Xr = xm;
      }
      Er = Math.abs((xm - xnew) / xm) * 100.0;

      this.anser.push(Er.toFixed(6));
      t += 'Iteration: ' + this.ansround[i] + "   X=" + this.ansxl[i] + '    Error= ' + this.anser[i] + '%';
      t += '<br /><br />';
      document.getElementById('ans').innerHTML = t;
      i++;

      if (Er === 0) {
        break;
      }
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className='form'>
        <br />
        <br />
        <h1>Bisection Method</h1>
        <br />
        <br />
        <div className='input-container'>
          <div className='form-group'>
            <label for='function'>Enter function = </label>
            <Form.Control name='func' type='text' onChange={this.handleChange} value={this.state.func} />
          </div>

          <div className='form-group'>
            <label for='error'>Enter error = </label>
            <Form.Control name='err' type='text' onChange={this.handleChange} value={this.state.err} />
          </div>

          <div className='form-group'>
            <label for='xl'>Enter xl = </label>
            <Form.Control name='xl' type='text' onChange={this.handleChange} value={this.state.xl} />
          </div>

          <div className='form-group'>
            <label for='xr'>Enter xr = </label>
            <Form.Control name='xr' type='text' onChange={this.handleChange} value={this.state.xr} />
          </div>

          <br />
          <br />
          <Button onClick={this.submit} variant='info'>
            submit
          </Button>
        </div>
        <p id='ans'></p>
        <p id='chart'></p>
      </div>
    );
  }
}

export default Bisection;
