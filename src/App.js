import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from './pages/AppHeader';
import Home from './pages/Home';

import Bisection from './pages/RootsofEquations/Bisection';
import FalsePosition from './pages/RootsofEquations/FalsePosition';
import NewtonRaphson from './pages/RootsofEquations/NewtonRaphson';
import OnePointIteration from './pages/RootsofEquations/OnePointIteration';
import Secant from './pages/RootsofEquations/Secant';

import CramerRule from './pages/Linear Algebraic Equation/CramerRule';
import GaussElimination from './pages/Linear Algebraic Equation/GaussElimination';
import GaussJordan from './pages/Linear Algebraic Equation/GaussJordan';
import MatrixInvertion from './pages/Linear Algebraic Equation/MatrixInvertion';
import LuDecomposition from './pages/Linear Algebraic Equation/LuDecomposition';
import CholeskyDecomposition from './pages/Linear Algebraic Equation/CholeskyDecomposition';
import JacobiIteration from './pages/Linear Algebraic Equation/JacobiIteration';
import GaussSeidel from './pages/Linear Algebraic Equation/GaussSeidel';
import ConjugateGradient from './pages/Linear Algebraic Equation/ConjugateGradient';

import LinearInterpolation_L from './pages/Lagrange Interpolating Polynomial/LinearInterpolation_L';
import PolynomialInterpolation_L from './pages/Lagrange Interpolating Polynomial/PolynomialInterpolation_L';
import QuadraticInterpolation_L from './pages/Lagrange Interpolating Polynomial/QuadraticInterpolation_L';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Bisection" element={<Bisection />} />
            <Route path="/FalsePosition" element={<FalsePosition />} />
            <Route path="/NewtonRaphson" element={<NewtonRaphson />} />
            <Route path="/OnePointIteration" element={<OnePointIteration />} />
            <Route path="/Secant" element={<Secant />} /> 

            <Route path="/CramerRule" element={<CramerRule />} />
            <Route path="/GaussElimination" element={<GaussElimination />} />
            <Route path="/GaussJordan" element={<GaussJordan />} />
            <Route path="/MatrixInvertion" element={<MatrixInvertion />} />
            <Route path="/LuDecomposition" element={<LuDecomposition />} />
            <Route path="/CholeskyDecomposition" element={<CholeskyDecomposition />} /> 
            <Route path="/JacobiIteration" element={<JacobiIteration />} />
            <Route path="/GaussSeidel" element={<GaussSeidel />} />
            <Route path="/ConjugateGradient" element={<ConjugateGradient />} /> 

            <Route path="/LinearInterpolation_L" element={<LinearInterpolation_L />} /> 
            <Route path="/PolynomialInterpolation_L" element={<PolynomialInterpolation_L/>} /> 
            <Route path="/QuadraticInterpolation_L" element={<QuadraticInterpolation_L/>} /> 




          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
