import { Edges, Text3D, useGLTF } from '@react-three/drei'
import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
import { GLTF } from "three-stdlib";
import * as THREE from 'three'
import { MeshStandardMaterial } from 'three';
import { useFrame, useThree } from '@react-three/fiber';


type GLTFResult = GLTF & {
  nodes: {}
  materials: {}
}



const FirstSection = (props:{
  tl:GSAPTimeline,
}) => {

    const state = useThree()
  
    const wholeGroup = useRef<THREE.Group>(null!)

    const {tl} = props

    const name = "- LOUIS CUENOT - CREATIVE DEVELOPER "
    let nameIndice = -(name.length/2 - 0.5)
    const nameTable:string[] = []
    for(let i =0; i< name.length; i++){
      nameTable.push(name[i])
    }

    useEffect(()=>{
      //gsap.to(
      //  wholeGroup.current.position,
      //  {
      //    y:0,
      //    duration:1.6,
      //    delay:.8
      //  }
      //)

      tl.to(
        wholeGroup.current.position,
        {
          y:0,
          duration:1
        },
        0
      )

      tl.to(
        wholeGroup.current.scale,
        {
          x:1,
          y:1,
          z:1,
          duration:1,
        },
        0
      )
    },[])

    
    

    const logoRef = useRef<THREE.Group>(null!)
    const lettersGroup = useRef<THREE.Group>(null!)

    const {nodes} = useGLTF('./models/Logo.glb') as GLTFResult
    
    let logoGeometry:THREE.Mesh = new THREE.Mesh()

    for(const [key, value] of Object.entries(nodes)){
      if(key.indexOf('Logo') === 0){
        logoGeometry = value as THREE.Mesh
      }
    }

    useFrame((state)=>{
      logoRef.current.position.y = (Math.sin(state.clock.elapsedTime) * 0.2) + 0.3
      lettersGroup.current.rotation.y =  - state.clock.elapsedTime * 0.5
    })

    

    

    

  return (
    <group
      ref={wholeGroup}
      scale={[0,0,0]}
      position={[0,-5,0]}
    >
      <group
        ref={logoRef}
        rotation={[-0.3,-0.4,0]}
      >
        <mesh
          geometry={logoGeometry.geometry}
          rotation={[-Math.PI/2 ,Math.PI/2 ,0]}
          scale={[0.75,0.75,0.75]}
        >
          <Edges/>
          <meshStandardMaterial color={0x493423} />
        </mesh>
      </group>
      <group
        rotation={[0,0,-0.4]}
      >
        <group 
          ref={lettersGroup}
          scale={[1.5,1.5,1.5]}
        >
          {
          nameTable.map((letter, index)=>(
            <mesh 
              key={index} 
              position={[Math.cos(Math.PI/2 + (index - nameIndice) * 0.175), 0, - Math.sin(Math.PI/2 + (index - nameIndice) * 0.175)]}
              rotation={[0,(index - nameIndice) * 0.175 + Math.PI,0]}
            >
              <Text3D 
                font={'/fonts/Humane.json'} 
                bevelSegments={0} 
                height={0.03}
                size={0.5} 
                onBeforeRender={(renderer, scene, camera, geometry)=>{
                  geometry.center()
                }}
              >
                  {letter}
                  <meshStandardMaterial color={0xF5DBB4} />
                  <Edges
                    onBeforeRender={(renderer, scene, camera, geometry)=>{
                      geometry.center()
                    }}
                  /> 
              </Text3D>
            </mesh>
          ))
          }
        </group>
      </group>
    </group>
  )
}

export default FirstSection