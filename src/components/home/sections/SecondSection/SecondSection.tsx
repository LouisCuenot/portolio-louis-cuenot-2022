import { useThree, useLoader, useFrame } from '@react-three/fiber'
import React, { HTMLProps, useEffect, useRef, useState } from 'react'

import { TextureLoader } from 'three/src/loaders/TextureLoader'
import gsap from 'gsap'
import { MeshStandardMaterial, Vector3 } from 'three'
import ProjectTemplate from './ProjectTemplate/ProjectTemplate'
import { Html } from '@react-three/drei'
import { HtmlProps } from '@react-three/drei/web/Html'

import { ProjectsList } from '../../../../ProjectsList'



const SecondSection = (props:{
    tl:GSAPTimeline,
    killTimeline:(kill:boolean)=>void
}) => {




    const [windowWidthFactor, setWindowWidthFactor] = useState<number>(1)

    

    const handleResize = () => {
        if(window.innerWidth >= 1300){
            setWindowWidthFactor(1)
        }else if( window.innerWidth < 1300 && window.innerWidth >= 1100){
            setWindowWidthFactor(0.85)
        }else if(window.innerWidth < 1100 && window.innerWidth >= 900){
            setWindowWidthFactor(0.65)
        }else if(window.innerWidth<900 && window.innerWidth>= 600){
            setWindowWidthFactor(0.5)
        }else if(window.innerWidth<600 && window.innerWidth>= 300){
            setWindowWidthFactor(0.25)
        }else if(window.innerWidth<300){
            setWindowWidthFactor(0.15)
        }
    }

    const animationDivTimeline = useRef<GSAPTimeline>(gsap.timeline({paused:true})).current
    

    useEffect(()=>{
        handleResize()
        window.addEventListener('resize', ()=>handleResize())
        animationDivTimeline.addLabel("changeName", 0.3)
        animationDivTimeline.to(
            '.animationDiv',
            {
                height:'0',
                duration:.1  
            }
        )
        
        animationDivTimeline.to(
            '.animationDiv',
            {
                height:'12vw',
                duration:.1
            },
            'changeName'
        )
        
        
    },[])

    const [tName, setTname] = useState<string>('PROJECTS')


    
    
    const changeProjectNameAnim = (name:string)=>{
        setTimeout(()=>{
            setTname(name)
        },100)
        if(name === 'PROJECTS'){
            animationDivTimeline.reverse()
        }else{
            animationDivTimeline.play()
        }
        
    }

    



    return(
        <group
            position={[0,-10,0]}
            scale={[windowWidthFactor,windowWidthFactor,windowWidthFactor]}
            name={'secondSectionGroup'}
        >   
            {
                ProjectsList.map((project)=>(
                    <ProjectTemplate
                        key={project.id}
                        path={project.path}
                        position={{
                            x:project.homepageInfos.position.x,
                            y:project.homepageInfos.position.y
                        }}
                        projectID={project.id}
                        scale={project.homepageInfos.scale}
                        tl={props.tl}
                        setActiveProject={
                            (name)=>changeProjectNameAnim(name)
                        }
                        projectName={project.name}
                        urlName={project.urlName}
                        killTimeline={(kill:boolean)=>props.killTimeline(kill)}
                    />
                ))
            }

           
            
            
            <Html
                center
                name='HTMLGroup'    
                className='HTMLSecondSection'           
            >   
                <div 
                    className='animationDiv'
                >
                    <h1 
                        className='projectTitle'
                    >
                        {tName}
                    </h1>  
                </div>            
            </Html>
        </group>
    )

}

export default SecondSection