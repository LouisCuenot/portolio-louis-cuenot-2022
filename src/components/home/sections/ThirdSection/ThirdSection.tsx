import { Html, Image } from '@react-three/drei'
import { PlaneGeometry, DoubleSide, BackSide, Vector3 } from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { GalleryList } from '../../../../GalleryList'
import { useFrame, useThree } from '@react-three/fiber'
import { group } from 'console'


const ThirdSection = (props:{
  tl:GSAPTimeline
}) => {

  const {tl} = props

  const state = useThree()

  const [imgPositionFactor,setImgPositionFactor] = useState<number>(Math.PI/(GalleryList.length*0.5))


  const [titleAnimFactor, setTitleAnimFactor] = useState<number>(window.innerWidth<901?window.innerWidth*0.07:window.innerWidth<1101?window.innerWidth*0.1:window.innerWidth*0.12)

  const [imsSizeFactor, setImgSizeFactor] = useState<number>(window.innerWidth<901?0.3:window.innerWidth<1101?0.5:0.7)
  

  useEffect(()=>{
    tl.to(
      '.galleryTitle',
      {
        rotate:-90,
        translateY:-titleAnimFactor,
        duration:.5
      },
      'SecondSection+=1.1'
    )  

      tl.to(
        imgGrpRef.current.scale,
        {
          x:imsSizeFactor,
          y:imsSizeFactor,
          z:imsSizeFactor,
          duration:1,
          ease:'power1.easeout'
        },
        'SecondSection+=1.1'
      )
  },[])

  const imgGrpRef = useRef<THREE.Group>(null!)

  useFrame(()=>{
    imgGrpRef.current.rotateOnAxis(new Vector3(0,1,0),0.004)
  })




  return (
    <group position={[0,-20,0]}>
        <Html
          fullscreen
          className='galleryClass'

        >
          <h2 className='galleryTitle'>Gallery</h2>
        </Html>
        <group 
          ref={imgGrpRef}
          rotation={[0,0,-Math.PI*0.25]}
          scale={[0,0,0]}
        >
          
          {
            GalleryList.map((image, id)=>(
              <group
                rotation={[0,imgPositionFactor*id,0]}
                position={[Math.sin(imgPositionFactor*id)*4,0,Math.cos(imgPositionFactor*id)*4]} 
                key={id} 
              >
                <Image 
                  url={`./img/${image}`}
                  rotation={[0,0,Math.PI*0.25]} 
                >
                  <planeGeometry args={[imgPositionFactor*2,imgPositionFactor*2,1,1]} />
                </Image>
              </group>
            ))
          }
          {
            GalleryList.map((image,id)=>(
              <group
                rotation={[0,imgPositionFactor*id+Math.PI,0]}
                position={[Math.sin(imgPositionFactor*id)*3.99,0,Math.cos(imgPositionFactor*id)*3.99]} 
                key={id}
              >
                <Image 
                  url={`./img/bgGallery.png`}
                  rotation={[0,0,Math.PI*0.25]} 
                >
                  <planeGeometry args={[imgPositionFactor*2,imgPositionFactor*2,1,1]} />
                </Image>
              </group>
            ))
          }
        </group>
    </group>
  )
}

export default ThirdSection