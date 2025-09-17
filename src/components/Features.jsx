import { useEffect, useRef } from "react"
import * as THREE from 'three' 
import { getModel } from "../models/model"

export default function Features(){
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
    camera.position.set(200,150,-200)
    camera.lookAt(0,0,0)

    const light = new THREE.AmbientLight(0xffffff, 1)
    scene.add(light)

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight.position.set(50, 50, 50); // Example position
    // directionalLight.target.position.set(20, 0, 0);
    // scene.add(directionalLight) // Point the light at the center of the scene
    // scene.add(directionalLight.target) // Point the light at the center of the scene
    
    // const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight2.position.set(-50, 50, 50); // Example position
    // directionalLight2.target.position.set(-20, 0, 0); // Point the light at the center of the scene
    // scene.add(directionalLight2) // Point the light at the center of the scene
    // scene.add(directionalLight2.target) // Point the light at the center of the scene

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
    };
  },[])

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col justify-center items-start gap-8 h-screen z-10 absolute px-12">
        <div className="bg-gray-500 text-white w-fit p-4 rounded-3xl">
          <p className="text-xl">Vector system</p>
          <p className="text-md w-80">performance and battery. Aluminium alloy is remarkably light and has exceptional thermal conductivity.</p>
        </div>
        <div className="bg-gray-500 text-white w-fit p-4 rounded-3xl">
          <p className="text-xl">Vector system</p>
          <p className="text-md w-80">performance and battery. Aluminium alloy is remarkably light and has exceptional thermal conductivity.</p>
        </div>
        <div className="bg-gray-500 text-white w-fit p-4 rounded-3xl">
          <p className="text-xl">Vector system</p>
          <p className="text-md w-80">performance and battery. Aluminium alloy is remarkably light and has exceptional thermal conductivity.</p>
        </div>
      </div>
      <div ref={mountRef} className='h-screen w-full border border-yellow-500 z-0 sticky'/>
    </div>
  )
}