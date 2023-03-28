import { Html, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProjectsList } from '../../ProjectsList'
import {GLTF} from 'three-stdlib'
import * as THREE from 'three'
import gsap from 'gsap'
import './Project.scss'


type GLTFResult = GLTF & {
  nodes:{},
  materials:{}
}

const VerifiedProject = (
  props:{
    scrolling:React.WheelEvent<HTMLDivElement>|undefined,
    touchEvent:number|undefined,
    activePj:{
      id: number
      name: string
      path: string
      link:string,
      homepageInfos: {
          position: {
              x: number
              y: number
          }
          scale: number
      },
      projectInfos:{
          date:string,
          type:string,
          resume:string
          languages:{
              element:()=>JSX.Element,
              name:string
          }[]
      }
    }
  }
) => {

  const {nodes} = useGLTF(props.activePj.path) as GLTFResult

  const [currentScroll, setCurrentScroll] = useState<React.WheelEvent<HTMLDivElement>|undefined>(undefined)

  const [objectIsHovered, setObjectIsHovered] = useState<boolean>(false)

  const [viewpjCoord, setViewpjCoord] = useState<{x:number,y:number}>({x:0,y:0})

  const state = useThree()

  const navigate = useNavigate()

  const VPjTimeline = useRef<GSAPTimeline>(gsap.timeline({paused:true})
    .addLabel('pjPause',props.activePj.name.length*0.05+2.05)
    .addPause('pjPause')
    ).current

  let WireframeGeometry:THREE.Mesh = new THREE.Mesh()
  let HoverGeometry:THREE.Mesh = new THREE.Mesh()
  for(const [key, value]  of Object.entries(nodes)){
      if(key.indexOf('Wireframe') === key.length-9){
        WireframeGeometry = value as THREE.Mesh
      }else if(key.indexOf('Hover') === key.length - 5){
        HoverGeometry = value as THREE.Mesh
      }
  }

  const ref = useRef<THREE.Mesh>(null!)

  useFrame(()=>{
    ref.current.rotation.y -=0.01
  })

  let letterArray:string[] = []

  const [lettersOfName,setLettersOfName] = useState<string[]>([])

  useEffect(()=>{

    
    handleResize()
    window.addEventListener('resize', ()=>handleResize())

    for(let i = 0; i<props.activePj.name.length;i++){
      letterArray.push(props.activePj.name[i])
      setTimeout(()=>{
        VPjTimeline.to(
          `.letter${i}`,
          {
            marginTop:0,
            duration:1,
            ease:"power3.out"
          },
          0.05*i
        )
        VPjTimeline.to(
          `.letter${i}`,
          {
            opacity:1,
            duration:2.5,
            ease:"power3.out"
          },
          0.05*i
        )
      },10)
    }
    setLettersOfName(letterArray)
    setTimeout(()=>{
      let pjType = document.getElementById('pjType')
      let pjDate = document.getElementById('pjDate')
      let pjResume = document.getElementById('pjResume')
      let pjLanguages = document.getElementsByClassName('pjLanguage')

      VPjTimeline.to(
        pjType,
        {
          translateX:0,
          duration:.5
        },
        props.activePj.name.length*0.05+0.2
      )
      VPjTimeline.to(
        pjDate,
        {
          translateX:0,
          duration:.2
        },
        props.activePj.name.length*0.05+0.4
      )
      VPjTimeline.to(
        pjResume,
        {
          opacity:1,
          duration:.7
        },
        props.activePj.name.length*0.05+0.7
      )

      for(let i =0;i<pjLanguages.length;i++){
        VPjTimeline.to(
          pjLanguages[i],
          {
            translate:0,
            duration:.2+.2*i
          },
          props.activePj.name.length*0.05+1
        )
        VPjTimeline.to(
          pjLanguages[i],
          {
            opacity:1,
            duration:1
          },
          props.activePj.name.length*0.05+1
        )
      }
      
    },10)
    
    VPjTimeline.to(
      state.camera.position,
      {
        y:-7,
        duration:2,
        ease:'back.inOut(1.3)'
      },
      props.activePj.name.length*0.05+2.1
    )

    VPjTimeline.to(
      'html',
        {
            "--bg":"#493423",
            duration:1,
            ease:"power2.out"
        },
        props.activePj.name.length*0.05+3.1
    )
    
    window.addEventListener('mousemove',(e)=>{
      setViewpjCoord({
        x:e.clientX,
        y:e.clientY
      })
    })
  },[])

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



  useEffect(()=>{
    if(lettersOfName[0]){
      VPjTimeline.play()      
    }
  },[lettersOfName])

  useEffect(()=>{
    
    if(currentScroll && VPjTimeline.time() >= props.activePj.name.length*0.05+2){
      if(currentScroll.deltaY>0){
        VPjTimeline.play()
        setTimeout(()=>{
          navigate('/')
        },2000)
      }
    }
  },[currentScroll])

  useEffect(()=>{
    setCurrentScroll(props.scrolling)
  },[props.scrolling])

  useEffect(()=>{
    
    if(props.touchEvent === 1 && VPjTimeline.time() >= props.activePj.name.length*0.05+2){
      VPjTimeline.play()
        setTimeout(()=>{
          navigate('/')
        },2000)
    }
  },[props.touchEvent])

  const onHover = () => {
    setObjectIsHovered(true)
    setTimeout(()=>{
      const viewpj = document.getElementById('viewproject')
      if(viewpj){
        gsap.fromTo(viewpj,
          {
            opacity:0
          },
          {
            opacity:1,
            duration:0.15
          }
        )
      }
    },50)
    
  }


  return(
    <group
      scale={[windowWidthFactor,windowWidthFactor,windowWidthFactor]}
    >
      <mesh
          geometry={WireframeGeometry.geometry}
          ref={ref}
          scale={0.5}
          position={[3,0,1]}
          onPointerEnter={()=>{onHover()}}
          onPointerLeave={()=>setObjectIsHovered(false)}
          onClick={()=>window.location.href = props.activePj.link}
      >
          <meshStandardMaterial color={0x493423}/>
          <mesh
              geometry={HoverGeometry.geometry}
          >
              <meshBasicMaterial transparent opacity={0}/>
          </mesh>
      </mesh>
      <Html
        fullscreen
        className='projectDiv'
      >
        <div className="projectDivContent">
          <div className='titleHolder'> 
            {
              lettersOfName.map((letter,id)=>(
                <h1 key={id} className={`letter${id} letter ${letter === ' '? 'space' : ''}`}>{letter}</h1>
              ))
            }
          </div>
          <div className='dateHolder'> 
              <div>
                <h2 id='pjType'>{props.activePj.projectInfos.type}</h2>
              </div>
              <div>
                <h2 id='pjDate'>{props.activePj.projectInfos.date}</h2>
              </div>
          </div>
          <div className='resumeHolder'> 
            <p id='pjResume'>{props.activePj.projectInfos.resume}</p>
          </div>
          <div className='technoHolder'> 
            
                {
                  props.activePj.projectInfos.languages.map((language,id)=>(
                    <div className='pjLanguage' key={language.name} style={{translate:-(50+50*id+30*id)}}>
                      <language.element />
                    </div>
                  ))
                }
            
          </div>
          
        </div>
          {
            objectIsHovered &&
            <span 
              id='viewproject'
              style={{
                left:viewpjCoord.x,
                top:viewpjCoord.y
              }}
            >View project</span>
          }
      </Html>
    </group>
  )
}



const UnverifiedProject = (
  props:{
    scrolling:React.WheelEvent<HTMLDivElement>|undefined,
    touchEvent:number|undefined,
    activePj:{
      id: number
      name: string
      path: string
      homepageInfos: {
          position: {
              x: number
              y: number
          }
          scale: number
      },
      projectInfos:{
          date:string,
          type:string,
          resume:string
          languages:{
              path:string,
              name:string
          }[]
      }
    }|null
  }
) => {
  const navigate = useNavigate()
  const state = useThree()
  const sossur = useGLTF('./models/qcq.glb')
  const qcqRef = useRef<THREE.Group>(null!)
  useFrame(()=>{
    qcqRef.current.position.y = Math.sin(state.clock.elapsedTime)*0.3 - 0.8
  })

  const UnVPjTimeline = useRef<GSAPTimeline>(gsap.timeline({paused:true,defaults:{duration:2}})).current
  
  
  useEffect(()=>{
    UnVPjTimeline.to(
      state.camera.position,
      {
        y:-7,
        duration:2,
        ease:'back.inOut(1.3)'
      }
    )
    UnVPjTimeline.to(
      'html',
            {
                "--bg":"#493423",
                duration:1,
                ease:"power2.out"
            },
            0.6
    )
   
    
  },[])


  useEffect(()=>{
    
    if(props.scrolling && props.activePj === null){
      if(props.scrolling.deltaY>0){
        UnVPjTimeline.play()
        setTimeout(()=>{
          navigate('/')
        },2000)
      }
    }
    
  },[props.scrolling])

  useEffect(()=>{
    if(props.touchEvent === 1 && props.activePj === null){
      UnVPjTimeline.play()
        setTimeout(()=>{
          navigate('/')
        },2000)
    }
  },[props.touchEvent])

  return(
    <group
      rotation={[Math.PI/2,0.1,-0.4]}
      scale={[4,4,3]}
      position={[-1.3,0,0]}
      ref={qcqRef}
    >
      <primitive
        object={sossur.scene}
      />
    </group>
  )
}

const Project = (props:{scrolling:React.WheelEvent<HTMLDivElement>|undefined,touchEvent:number|undefined,}) => {

    const {projectName} = useParams()
//
//  const PjTimeline = useRef<GSAPTimeline>(gsap.timeline({paused:true,defaults:{duration:2}})).current
//
//  const {nodes} = useGLTF(`/models/${projectName}.glb`) as GLTFResult
//
//  let WireframeGeometry:THREE.Mesh = new THREE.Mesh()
//  let HoverGeometry:THREE.Mesh = new THREE.Mesh()
//
//  for(const [key, value]  of Object.entries(nodes)){
//      if(key.indexOf('Wireframe') === key.length-9){
//        WireframeGeometry = value as THREE.Mesh
//      }else if(key.indexOf('Hover') === key.length - 5){
//        HoverGeometry = value as THREE.Mesh
//      }
//  }
//
  const [activeProject, setActiveProject] = useState<{
    id: number
    name: string
    path: string,
    link:string,
    homepageInfos: {
        position: {
            x: number
            y: number
        }
        scale: number
    },
    projectInfos:{
        date:string,
        type:string,
        resume:string
        languages:{
            element:()=>JSX.Element,
            name:string
        }[]
    }
  }|null|undefined>(undefined)

  useEffect(()=>{

    document.documentElement.style.setProperty('--bg','#FFF0D9')

    for(const project of ProjectsList){
      if(project.urlName === projectName){
        setActiveProject(project)
        return
      }
    }
    setActiveProject(null)
  },[])

  
    

    const state = useThree()
    

    useEffect(()=>{
      
      state.camera.position.set(0,0,5)
      
    },[])

    
    return(
      <>
        {

          activeProject !== undefined
          ?
          <>
            {
              activeProject === null
              ?
              <UnverifiedProject 
              scrolling={props.scrolling}
              activePj={null}
              touchEvent={props.touchEvent}
              />
              :
              <VerifiedProject
              scrolling={props.scrolling}
              activePj={activeProject}
              touchEvent={props.touchEvent}
            />
            }
          </>
          
          :
          
          null
          
          
        }
      </>
    )
  
}

useGLTF.preload('./models/qcq.glb')
useGLTF.preload('./models/Mellowdy.glb')
useGLTF.preload('./models/Nfinite.glb')
useGLTF.preload('./models/PortfolioV1.glb')
useGLTF.preload('./models/Sandbox.glb')
useGLTF.preload('./models/Wellsup.glb')


export default Project