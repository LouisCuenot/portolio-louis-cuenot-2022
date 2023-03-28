import React, { useEffect, useState, useRef } from 'react'
import './Homepage.scss'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'

import FirstSection from './sections/FirstSection/FirstSection'
import SecondSection from './sections/SecondSection/SecondSection'
import ThirdSection from './sections/ThirdSection/ThirdSection'



function Homepage(props:{
    scrolling:React.WheelEvent<HTMLDivElement>|undefined,
    touchEvent:number|undefined
}){

    const state = useThree()

    const [killTl, setKillTl] = useState<boolean>(false)   

    const {scrolling, touchEvent} = props

    const [HPScroll, setHPScroll] = useState<React.WheelEvent<HTMLDivElement>|undefined>(undefined)
    const [touchIndicator, setTouchIndicator] = useState<number|undefined>(touchEvent)

    useEffect(()=>{
        setHPScroll(scrolling)
    },[scrolling])

    useEffect(()=>{
        setTouchIndicator(touchEvent)
        
    },[touchEvent])

    

    

    const HPTimeline = useRef<GSAPTimeline>(gsap.timeline({paused:false})
        .addLabel('FirstSection',1)
        .addPause('FirstSection')
        .addLabel('SecondSection',2.7)
        .addPause('SecondSection')
        ).current
    
        
    

   useEffect(()=>{
        
        state.camera.position.set(0,0,5)
        document.documentElement.style.setProperty('--bg','#493423')

       //First Section to Second

       HPTimeline
       .to(
            state.camera.position,
            {
                y:-10,
                duration:.8,
                ease:"back.inOut(1.3)"
            },
            'FirstSection'
       )
       
       HPTimeline.to(
            'html',
            {
                "--bg":"#FFF0D9",
                duration:.9,
                ease:"power2.out"
            },
            'FirstSection+=.3'
       )


       HPTimeline.to(
        state.camera.position,
        {
            y:-20,
            duration:.8,
            ease:"back.inOut(1.3)"
        },
        'SecondSection'
   )

        setHPScroll(undefined)

   },[])

    useEffect(()=>{
        if(!killTl){
            if(HPScroll){
                const {deltaY} = HPScroll
                if(deltaY>0 &&  HPTimeline.time()>0.9){
                    HPTimeline.play()
                }else if(deltaY<0 && HPTimeline.time()>1.1){
                    HPTimeline.reverse()
                }
            }
        }
    },[HPScroll])

    useEffect(()=>{
        if(!killTl){
            if(touchIndicator === undefined){
                return
            }else if(touchIndicator === -1 && HPTimeline.time()>1.1){
                HPTimeline.reverse()
                setTouchIndicator(undefined)
            }else if(touchIndicator === 1 && HPTimeline.time()>0.9){
                HPTimeline.play()
                setTouchIndicator(undefined)
            }
            
        }
    },[touchIndicator])

    

    


  return (
        <> 
            <FirstSection tl={HPTimeline} />
            <SecondSection tl={HPTimeline} killTimeline={(kill:boolean)=>setKillTl(kill)}/>
            <ThirdSection  tl={HPTimeline}/>
        </>
  )
}

export default Homepage