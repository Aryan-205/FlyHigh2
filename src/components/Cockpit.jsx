import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getModel } from "../models/model";
import { div } from "three/src/nodes/TSL.js";

export default function CockPitScene(){

  const mountRef = useRef(null)
  const jetRef = useRef(null)

  useEffect(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        25,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        10000
      );
      camera.position.set(0, 50, 300);
      camera.lookAt(0, 20, 0);
  
      const light = new THREE.AmbientLight(0xadbcff, 1);
      scene.add(light);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
      directionalLight.position.set(0,50, 100)
      directionalLight.target.position.set(0,0,0)

      scene.add(directionalLight)
      scene.add(directionalLight.target)
  
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
  
      if (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      mountRef.current.appendChild(renderer.domElement);
  
      getModel("/newJetWithoutLanding2.glb").then((gltf) => {
        const jetModel = gltf.scene;
        jetRef.current = jetModel;
        jetModel.position.set(0, 0, 0);
        jetModel.rotation.y = Math.PI / 2;
        scene.add(jetModel);
      });
  
      let frameId;
      const animate = () => {
        frameId = requestAnimationFrame(animate);
  
        // if (jetRef.current) {
        //   const currentQuaternion = new THREE.Quaternion().copy(jetRef.current.quaternion);
        //   currentQuaternion.slerp(targetRotation.current, 0.05);
        //   jetRef.current.quaternion.copy(currentQuaternion);
        //   jetRef.current.position.lerp(targetPosition.current, 0.05);
        // }
  
        renderer.render(scene, camera);
      };
      animate();
  
      const handleResize = () => {
        if (mountRef.current) {
          camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        }
      };
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
        if (mountRef.current && mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }
        cancelAnimationFrame(frameId);
      };
    }, []);

  return (
    <div className="w-full h-[200vh] relative">
      <div className="w-full h-screen sticky top-0">
        <div ref={mountRef} className="w-full h-full absolute z-10" />
        <video src="/cloudVideo21.mp4" className="w-full h-full z-0 absolute inset-0 object-fill" muted loop autoPlay/>
      </div>
    </div>
  )
}