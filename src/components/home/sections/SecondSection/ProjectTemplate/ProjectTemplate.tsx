import { useGLTF } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import {GLTF} from 'three-stdlib'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'

type GLTFResult = GLTF & {
    nodes:{}
}

const ProjectTemplate = (props:{
    path:string,
    position:{
      x:number,
      y:number
    },
    scale:number,
    projectID:number,
    tl:GSAPTimeline,
    projectName:string,
    urlName:string,
    setActiveProject:(name:string)=>void
    killTimeline:(kill:boolean)=>void
}) => {

    const state = useThree()

    const navigate = useNavigate()

    const [stopAnims, setStopAnims] = useState<boolean>(false)
   


    const { path, position, scale, projectID, tl, setActiveProject, projectName, killTimeline,urlName } = props
    const {nodes} = useGLTF(path) as GLTFResult

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
      if(!stopAnims){
        ref.current.rotation.y = state.clock.elapsedTime % (Math.PI*2) * 0.5
      }
    })


    useEffect(()=>{
      
      tl.fromTo(
        ref.current.position,
          {
            x:-20,
            y:0
          },
          {
            x:position.x*5,
            y:position.y*5,
            duration:0
          },
          'FirstSection+=.8'
      )
      tl.fromTo(
        ref.current.scale,
          {
            x:0,
            y:0,
            z:0
          },
          {
            x:scale,
            y:scale,
            z:scale,
            duration:0
          },
          'FirstSection+=.8'
      )
      tl.fromTo(
        ref.current.position,
          {
            x:position.x*5,
            y:position.y * 5
          },
          {
            x:position.x,
            y:position.y,
            duration:0.5
          },
          `FirstSection+=${0.8+0.1*projectID}`
      )
      ref.current.position.x = -20
      ref.current.position.y =0
    },[])

  const hoverAnim = (hovered:boolean) => {
    if(hovered === true){
      gsap.to(
        ref.current.scale,
        {
          x:scale*1.3,
          y:scale*1.3,
          z:scale*1.3,
          duration:.3
        }
      )
    }else{
      gsap.to(
        ref.current.scale,
        {
          x:scale,
          y:scale,
          z:scale,
          duration:.3
        }
      )
    }
  } 

  

  const onClicked = () => {
    killTimeline(true)
    setStopAnims(true)
    for(const obj of state.scene.getObjectByName('secondSectionGroup')!.children){
      if(obj.name === 'HTMLGroup'){
        gsap.to(
          obj.position,
          {
            x:-20,
            duration:1
          }
        )
      }else if(obj === ref.current){
        gsap.to(
          ref.current.position,
          {
            x:3,
            y:0,
            z:1,
            duration:1
          }
        )
        gsap.to(
          ref.current.rotation,
          {
            y:0,
            z:0,
            duration:1  
          }
        )
        gsap.to(
          ref.current.scale,
          {
            x:0.5,
            y:0.5,
            z:0.5,
            duration:1
          }
        )
      }else{
        gsap.to(
          obj.scale,
          {
            x:0,
            y:0,
            z:0,
            duration:.4
          }
        )
      }
      
    }
    setTimeout(()=>{
      navigate(`/project/${urlName}`)
    },1000)
  }
    

  return (
    <mesh
        geometry={WireframeGeometry.geometry}
        scale={[0,0,0]}
        ref={ref}
    >
        <meshStandardMaterial color={0x493423}/>
        <mesh
            geometry={HoverGeometry.geometry}
            onPointerEnter={()=>{
              hoverAnim(true)
              setActiveProject(projectName)
            }}
            onPointerLeave={()=>{
              hoverAnim(false)
              setActiveProject('PROJECTS')
            }}
            onClick={()=>onClicked()}
        >
            <meshBasicMaterial transparent opacity={0}/>
        </mesh>

    </mesh>
  )
}

export default ProjectTemplate