import { useState } from 'react';
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap';
import { create, all } from 'mathjs';
import './style_Linear.css';



function GaussElimination() {
  const [size, setsize] = useState('')
  const [matrix, setmatrix] = useState('')
  const config = { }
  const math = create(all, config)

  const submit = e =>{
    e.preventDefault()
    genarate()
  }

  function genarate(){
      let array = []
      for(let i=0 ; i<size ; i++){
        array[i] = [] //render jsx arr
        let temp = [] 
        for(let j=0 ; j<=size ; j++){ 
          temp.push(
          <input
          id={"column"+i+"row"+j}
          />
          )  
        }
        array[i].push(<div class='matrix a'>{temp}</div>)
        
      }

      //setmatrix hook
      setmatrix({a:array})
  }

  const cal = e =>{
    e.preventDefault()
    let calmatrix = []
    let tmpa = []
    let tempb = []
    let calstep = []

    for(let i=0 ; i<size ; i++){
      calmatrix[i] = []
      tmpa[i] = []
      calstep[i] = []
      //setmatrixb
      tempb.push((Number(document.getElementById('column'+i+'row'+size).value)))
      //setmatrixa
      for(let k=0 ; k<size ; k++){
        tmpa[i].push(Number(document.getElementById('column'+i+'row'+k).value))
      }
      //setmatrix a|b
      for(let j=0 ; j<=size ; j++){
        //console.log(Number(document.getElementById('column'+j+'row'+j).value))
          calmatrix[i].push(Number(document.getElementById('column'+i+'row'+j).value))
      }
    }
    //console.log(tmpa)
    let roundtri = 1
    let matrixA = calmatrix.map(a=>a.slice()) 
    let tempa = calmatrix.map(a=>a.slice()) //line of deep clone array
    //calculator
    //Forward Elimination
    for(let i=0 ; i<=size ; i++){
      for(let j=i+1 ; j<size ; j++){
        let temp = tempa[j][i]/tempa[i][i]  
        for(let k=0 ; k<=size ; k++){
          let sol = temp*tempa[i][k] 
          tempa[j][k] = tempa[j][k]-sol
        }
        //console.log(tempa[j])
        
        //pick up step do triangle 0 down-left
          calmatrix[i] = tempa
          let tmpstep = []
          for(let a=0; a<size ; a++){
            tmpstep.push(<div>{calmatrix[i][a]+" "}</div>)
          }
          calstep[i].push(<div className={"step"}>step{roundtri++}{tmpstep}</div>)
      }
      //console.log(tempa)
    }
    //console.log(calmatrix)
    //console.log(matrixA)
    
    let arrans = []
    arrans[size] = tempa[size-1][size]/tempa[size-1][size-1]
    
    //Backward Subsitution
    for(let i=size-1 ; i>=1 ; i--){
      arrans[i] = tempa[i-1][size]
      for(let j=i+1 ; j<=size ; j++){
        let tempind = tempa[i-1][j-1]*arrans[j]
        //console.log(tempind)
        arrans[i] = arrans[i]-tempind
        //console.log(arrans)
      }
      arrans[i] = arrans[i]/tempa[i-1][i-1]
    }
    //console.log(calmatrix)
    //console.log(arrans)

    //ans(size) = size because ans(size) > size
    let ind = 0
    let listans = []
    for(let i=1 ; i<=size ; i++){
      listans[ind] = arrans[i].toFixed(2)
      ind++
    }
    //console.log(listans)
    console.log(tmpa)
    let checkans = math.multiply(tmpa, listans)
    console.log(checkans)

    //output on page
    let ans = []
    for(let i=1 ; i<arrans.length ; i++){
      ans.push(<div>x{i}={arrans[i].toFixed(6)}</div>)
    }
    setmatrix({a:matrix.a,b:ans,c:calmatrix,d:calstep,e:matrixA,f:tempb,g:listans,z:checkans})
  }


  return (
    <div className='gausselimination'>
      <h1>GaussElimination</h1>
      <form>
        <label for="size">Enter size is here {'->'}</label>
        <input 
        name="size" 
        type="size" 
        onChange={event => setsize(event.target.value)} 
        value={size} /><br/><br/>
        <button onClick={submit}>create</button><br/><br/>
        
      </form><br/><br/>
      <div className='matrix f'>
        <div className='a'>      
        {
          matrix.a
        }
        </div>
      </div><br/><br/>
      <button onClick={cal}>Cal</button><br/><br/>
      <div>
        {
          matrix.b
        }
      </div><br/><br/>
      <div className='matrix f'>
        {
          matrix.d
        }<br/>
      </div><br/><br/>
      <div>
        CHECKRESULT
        <div>
          <br/>
        </div>
        <div className='matrix f'>
          MATRIX A -{'>'}
          {
            matrix.e+""
          }
        </div><br/>
        <div className='matrix f'>
        MATRIX X -{'>'}
          {
            matrix.g+""
          }
        </div><br/>
        <div className='matrix f'>
          RESULT OF CHECKANSWER -{'>'}
          {
            matrix.z+""
          }
        </div>
        <br/>
      </div>
    </div>
  )
}

export default GaussElimination