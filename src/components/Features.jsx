import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { getModel } from "../models/model";

// Define the target rotations for each feature
const featureRotations = {
  default: { x: 0, y: Math.PI / 2, z: 0 },
  vectorSystem: { x: 0.2, y: Math.PI / 2 + 0.5, z: 0.1 },
  // Add rotations for the other features
  anotherFeature: { x: -0.1, y: Math.PI / 2 - 0.5, z: 0.2 },
  thirdFeature: { x: 0.3, y: Math.PI / 2, z: -0.1 },
};

export default function Features() {
  const mountRef = useRef(null);
  const jetRef = useRef(null);
  const targetRotation = useRef(new THREE.Quaternion());

  const [activeFeature, setActiveFeature] = useState("default");

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      25,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      10000
    );
    camera.position.set(200, 150, -200);
    camera.lookAt(0, 0, 0);

    const light = new THREE.AmbientLight(0xadbcff, 2);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 50, 50);
    directionalLight.target.position.set(20, 0, 0);
    scene.add(directionalLight);
    scene.add(directionalLight.target);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);

    if (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    getModel("/jetWithoutLanding.glb").then((gltf) => {
      const jetModel = gltf.scene;
      jetRef.current = jetModel;
      jetModel.position.set(0, 0, 0);
      jetModel.rotation.y = Math.PI / 2;
      scene.add(jetModel);
    });

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (jetRef.current) {
        // Create a Quaternion from the current rotation
        const currentQuaternion = new THREE.Quaternion().copy(jetRef.current.quaternion);
        // Interpolate between the current and target quaternions
        currentQuaternion.slerp(targetRotation.current, 0.05);
        // Apply the new interpolated rotation
        jetRef.current.quaternion.copy(currentQuaternion);
      }

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

  // Use a second useEffect to handle rotation changes
  useEffect(() => {
    // Get the target Euler angles from our predefined rotations
    const targetEuler = new THREE.Euler().setFromVector3(
      new THREE.Vector3(
        featureRotations[activeFeature].x,
        featureRotations[activeFeature].y,
        featureRotations[activeFeature].z
      )
    );
    // Convert Euler to Quaternion and store in the ref
    targetRotation.current.setFromEuler(targetEuler);
  }, [activeFeature]);

  const handleFeatureClick = (feature) => {
    // If the same button is clicked, reset to default view
    if (activeFeature === feature) {
      setActiveFeature("default");
    } else {
      setActiveFeature(feature);
    }
  };

  return (
    <div className="h-screen w-full relative">
      <div className="flex flex-col justify-center items-start gap-8 h-screen z-20 absolute px-12">
        {/* Vector System Button */}
        <div
          id="id1"
          onClick={() => handleFeatureClick("vectorSystem")}
          className={`feature-button bg-black border border-white text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out ${
            activeFeature === "vectorSystem" ? "active" : ""
          }`}
        >
          <p className="text-xl">Vector system</p>
          <p className="description text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
            performance and battery. Aluminium alloy is remarkably light and has
            exceptional thermal conductivity.
          </p>
        </div>

        {/* Another Feature Button */}
        <div
          id="id2"
          onClick={() => handleFeatureClick("anotherFeature")}
          className={`feature-button bg-black border border-white text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out ${
            activeFeature === "anotherFeature" ? "active" : ""
          }`}
        >
          <p className="text-xl">Another Feature</p>
          <p className="description text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
            This is the description for another cool feature. It has a lot of
            text to show the transition.
          </p>
        </div>

        {/* Third Feature Button */}
        <div
          id="id3"
          onClick={() => handleFeatureClick("thirdFeature")}
          className={`feature-button bg-black border border-white text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out ${
            activeFeature === "thirdFeature" ? "active" : ""
          }`}
        >
          <p className="text-xl">Third Feature</p>
          <p className="description text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
            And here is a third feature with its own detailed information.
          </p>
        </div>
      </div>
      <div ref={mountRef} className="h-screen w-full z-10 sticky" />
      <div className="absolute inset-0 w-full h-full z-0">
        <img src="/figmaBg.jpg" className="w-full h-full object-cover" alt="" />
      </div>
    </div>
  );
}