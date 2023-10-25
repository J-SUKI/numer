import React from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap';
import './template.css';

function Home() {
    return (
        <div>
            <div className="main-one">  
                <h2>Roots of Equations</h2> 
                <div className="d-grid gap-2">         
                <Link to="/Bisection"><Button className="btn btn-info" size="lg" active>Bisection</Button></Link>
                <Link to="/FalsePosition"><Button className="btn btn-info" size="lg">False-Position</Button></Link>         
                <Link to="/OnePointIteration"><Button className="btn btn-info" size="lg">One-Point Iteration</Button></Link>
                <Link to="/NewtonRaphson"><Button className="btn btn-info" size="lg">Newton-Raphson</Button></Link>     
                <Link to="/Secant"><Button className="btn btn-info" size="lg">Secant</Button></Link>
                <br/><br/>


                <h2>Linear Algebraic Equation</h2>         
                <Link to="/CramerRule"><Button className="btn btn-info" size="lg" active>Cramer Rule</Button></Link>
                <Link to="/GaussElimination"><Button className="btn btn-info" size="lg">Gauss Elimination</Button></Link>
                <Link to="/GaussJordan"><Button className="btn btn-info" size="lg">Gauss-Jordan</Button></Link>
                <Link to="/MatrixInvertion"><Button className="btn btn-info" size="lg">Matrix Invertion</Button></Link>
                <Link to="/LuDecomposition"><Button className="btn btn-info" size="lg">Lu Decomposition</Button></Link>
                <Link to="/JacobiIteration"><Button className="btn btn-info" size="lg">Jacobi Iteration</Button></Link>
                <Link to="/GaussSeidel"><Button className="btn btn-info" size="lg">Gauss-Seidel Iteration</Button></Link>
                <Link to="/ConjugateGradient"><Button className="btn btn-info" size="lg">Conjugate Gradient</Button></Link>
                <br/><br/>

                <h2>Newton’s Divided-Difference</h2>  
                <Link to="/LinearInterpolation_N"><Button className="btn btn-info" size="lg" active>Linear Interpolation</Button></Link>
                <Link to="/QuadraticInterpolation_N"><Button className="btn btn-info" size="lg">Quadratic Interpolation</Button></Link>
                <Link to="/PolynomialInterpolation_N"><Button className="btn btn-info" size="lg">Polynomial Interpolation</Button></Link>
                <br/><br/>
                
                <h2>Lagrange Interpolating Polynomial</h2> 
                <Link to="/LinearInterpolation_L"><Button className="btn btn-info" size="lg" active>Linear Interpolation</Button></Link>
                <Link to="/QuadraticInterpolation_L"><Button className="btn btn-info" size="lg">Quadratic Interpolation</Button></Link>
                <Link to="/PolynomialInterpolation_L"><Button className="btn btn-info" size="lg">Polynomial Interpolation</Button></Link>
                <br/><br/>

                <h2>Spline Interpolation</h2> 
                <Link to="/LinearSpline"><Button className="btn btn-info" size="lg" active>Linear Spline</Button></Link>
                <Link to="/QuadraticSpline"><Button className="btn btn-info" size="lg">Quadratic Spline</Button></Link>
                <Link to="/CubicSpline"><Button className="btn btn-info" size="lg">Cubic Spline</Button></Link>
                <br/><br/>

                <h2>Least-Squares Regression</h2>
                <Link to="/LinearRegression"><Button className="btn btn-info" size="lg" active>Linear Regression</Button></Link>
                <Link to="/PolynomialRegression"><Button className="btn btn-info" size="lg">Polynomial Regression</Button></Link>
                <Link to="/MultipleLineaRegression"><Button className="btn btn-info" size="lg">Multiple Linear Regression</Button></Link>
                <br/><br/>

                <h2>Numerical Integration </h2>
                <Link to="/SingleTrapezoidal"><Button className="btn btn-info" size="lg" active>Single Trapezoidal Rule</Button></Link>
                <Link to="/CompositeTrapezoidal"><Button className="btn btn-info" size="lg">Composite Trapezoidal Rule</Button></Link>
                <Link to="/Simpson "><Button className="btn btn-info" size="lg">Simpson's Rule</Button></Link>
                <Link to="/CompositeSimpson"><Button className="btn btn-info" size="lg">Composite Simpson's Rule</Button></Link>
                <br/><br/>

                <h2>Numerical Differentiation </h2>
                </div> 
            </div>       
        </div>
    );
}

export default Home;