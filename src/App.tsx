import React, { Suspense, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Canvas } from '@react-three/fiber';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './components/home/Homepage';
import Project from './components/projects/Project';
import Arrow from './img/SVG/Arrow.svg'
import Loader from './img/Loader.gif'



const App = () => {

  

  const [scroll, setScroll] = useState<React.WheelEvent<HTMLDivElement>>()
  const [touchIndicator, setTouchIndicator] = useState<number|undefined>(undefined)
  const [hasMouse, setHasMouse] = useState(false)

  const sossur = useRef<HTMLDivElement>(null!)

  const [loadingText, setLoadingText] = useState<string>('Loading website .')

  useEffect(()=>{
    window.addEventListener('resize',()=>window.location.reload())

    setTimeout(()=>{
      sossur.current.classList.remove('mbControls')
    },1000)

    if(window.location.href !== 'https://louiscuenot.com/'){
      window.location.href = 'https://louiscuenot.com/'
    }
    
   
    
    
  },[])

  return (
    <Suspense fallback={(
      <div className='suspenseDiv'>
        <img src={Loader} alt='a loader'/>
      </div>
    )}>
      <>
        {
         hasMouse ?
         null
         :
         <div id='mobileControls' ref={sossur} className='mbControls'>
          <div className='topButton' onClick={(e)=>{
            setTouchIndicator(-1)
            setTimeout(()=>setTouchIndicator(0),100)
          }}>
            <img src={Arrow}/>
          </div>
          <div className='bottomButton'  onClick={(e)=>{
            setTouchIndicator(1)
            setTimeout(()=>setTouchIndicator(0),100)
          }}>
            <img src={Arrow}/>
          </div>
         </div>
        }
        <Canvas onWheel={(e)=>setScroll(e)}>
          <ambientLight intensity={0.5}/>
          <pointLight color={0xffffff} intensity={1} position={[2,2,2]} castShadow/>
           <Router >
              <Routes >
                <Route  path='/' element={<Homepage scrolling={scroll} touchEvent={touchIndicator} />}  />
                <Route path='/project/:projectName' element={<Project scrolling={scroll}  touchEvent={touchIndicator}/>}/>
                <Route path='/*' element={<Homepage scrolling={scroll}  touchEvent={touchIndicator}/> }/>
              </Routes>
           </Router>


        </Canvas>
      </>
    </Suspense>
  );
}

export default App;
