import { useEffect, useRef } from "react"
import * as THREE from 'three' 
import { getModel } from "../models/model"
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import ScrollTrigger from "gsap-trial/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

export default function TopDownScene(){
  const mountRef = useRef(null)
  const jetRef = useRef(null)
  let progressQ = 0

  useEffect(()=>{
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      10000
    )
    const startCamPos = new THREE.Vector3(0, 250, 0);
    const endCamPos = new THREE.Vector3(0, 20, 150);
    camera.position.copy(startCamPos) 
    camera.lookAt(0,0,0)

    const light = new THREE.AmbientLight(0xffffff, 1)
    scene.add(light)

    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)

    if(mountRef.current.firstChild){
      mountRef.current.removeChild(mountRef.current.firstChild)
    }
    mountRef.current.appendChild(renderer.domElement)

    getModel("/shipWithRunway.glb").then(gltf => {
      const shipModel = gltf.scene
      shipModel.scale.setScalar(14)
      shipModel.rotation.y = -0.16
      shipModel.position.set(190,-400,-800)
      scene.add(shipModel)
    })

    const startJetPos = new THREE.Vector3(0, 0, 0);
    const endJetPos = new THREE.Vector3(0, 100, 300);

    getModel("/jetWithLanding.glb").then(gltf => {
      const jetModel = gltf.scene
      jetRef.current = jetModel
      jetModel.position.set(0,0,0)
      jetModel.rotation.y = Math.PI / 2
      scene.add(jetModel)
    })

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    new RGBELoader()
      .setPath('/hdrs/') // your folder
      .load('citrus_orchard_road_puresky_2k.hdr', (texture) => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;

        scene.background = envMap;   // optional: shows as skybox
        scene.environment = envMap;  // reflections & lighting

        texture.dispose();
        pmremGenerator.dispose();
      });

    let frameId
    let progressP = 0
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      progressP = Math.min(progressP + 0.005, 1)
      camera.position.lerpVectors(startCamPos, endCamPos, progressP)
      //jetRef.current.position.lerpVectors(startJetPos, endJetPos, progressP)
      camera.lookAt(0,0,0)
    
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
  
  useEffect(()=>{

    ScrollTrigger.create = {
      trigger:mountRef.current,
      start: "top top",
      end:"end end",
      snap:true,
      pinSpacing:false,
      onUpdate:()=>{
        progressQ = Math.min(progressQ + 0.05, 1)
      }
    }
  
  },[])

  return (
    <div ref={mountRef} className='sticky top-0 h-screen w-full z-0'/>
  )
}