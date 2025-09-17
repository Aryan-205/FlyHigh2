import { useEffect, useRef } from "react"
import * as THREE from 'three' 
import { getModel } from "../models/model"

export default function FrontScene(){
  const mountRef = useRef(null)
  const jetRef = useRef(null)

  useEffect(()=>{
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      25, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      10000
    )
    camera.position.set(0,24,-300)
    camera.lookAt(0,0,0)

    const light = new THREE.AmbientLight(0xffefc7, 1)
    scene.add(light)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 50, 50); // Example position
    directionalLight.target.position.set(20, 0, 0); // Point the light at the center of the scene

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(-50, 50, 50); // Example position
    directionalLight2.target.position.set(-20, 0, 0); // Point the light at the center of the scene

    const timer1 = setTimeout(()=>{
      scene.add(directionalLight);
      scene.add(directionalLight.target);
    },2000)
    const timer2 = setTimeout(()=>{
      scene.add(directionalLight2);
      scene.add(directionalLight2.target);
    },4000)

    // const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
    // scene.add(directionalLightHelper);
    // const directionalLightHelper2 = new THREE.DirectionalLightHelper(directionalLight2, 5);
    // scene.add(directionalLightHelper2);

    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)

    renderer.shadowMap.enabled = true;

    if(mountRef.current.firstChild){
      mountRef.current.removeChild(mountRef.current.firstChild)
    }
    mountRef.current.appendChild(renderer.domElement)

    getModel("/jetWithLanding.glb").then(gltf => {
      const jetModel = gltf.scene
      jetRef.current = jetModel
      jetModel.position.set(0,0,0)
      jetModel.rotation.y = Math.PI / 2
      scene.add(jetModel)
    })

    let frameId
    const animate = () => {
      frameId = requestAnimationFrame(animate)
    
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      cancelAnimationFrame(frameId);
      clearTimeout(timer1)
      clearTimeout(timer2)
    };
  },[])

  return (
    <div className="h-[100vh] w-full">
      <nav className="flex-center w-full py-4">
        <div className="text-white text-2xl font-light flex gap-12 pt-12 fixed z-[999]">
          <p>Hanger</p>
          <p>Ability</p>
          <p>Cockpit</p>
        </div>
      </nav>
      <div className="z-20 flex flex-col justify-between absolute inset-0 w-full h-full">
        <div className="flex flex-col items-center justify-start pt-40 gap-12 font-extrabold text-white/80">
          <p className='text-4xl text-center tracking-wider'>The SU-35 Super Flanker</p>
          <p className='text-9xl text-center vertical-stretch'>MASTERING SKY</p>
        </div>
        <div className="flex flex-col justify-end items-center text-white pb-24 text-lg">
          <p>Experience unmatched Thrust, manuverability and state of-strat avionics</p>
          <p>Future of aerial supority</p>
          <img src="" alt="" />
        </div>
      </div>
      <div ref={mountRef} className='h-screen w-full z-30 fixed'/>
      <img src="/bgImg.png" className="absolute inset-0 h-full w-full z-0" alt="" />
      <img src="/shadow.png" className="absolute top-[60%] left-[28%] opacity-80 h-40 w-[40rem] z-10" 
      alt="" />
    </div>
  )
}