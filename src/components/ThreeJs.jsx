// import { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { getModel } from "../models/model";

// const featureTransforms = {
//   default: {
//     rotation: new THREE.Euler(0, Math.PI / 2, 0),
//     position: new THREE.Vector3(0, 0, 0),
//   },
//   vectorSystem: {
//     rotation: new THREE.Euler(0, Math.PI, 0),
//     position: new THREE.Vector3(40, 80, -100),
//   },
//   stealth: {
//     rotation: new THREE.Euler(-1, Math.PI, 0.3),
//     position: new THREE.Vector3(-30, -10, 0),
//   },
//   missiles: {
//     rotation: new THREE.Euler(Math.PI / 2 + 0.4, Math.PI + 0.4, -0.7),
//     position: new THREE.Vector3(-20, -20, 0),
//   },
//   supercruise: {
//     rotation: new THREE.Euler(0, (3 * Math.PI) / 4, 0),
//     position: new THREE.Vector3(0, 0, 0),
//   },
//   electronic: {
//     rotation: new THREE.Euler(0.5, Math.PI / 2 - 0.8, 0),
//     position: new THREE.Vector3(-40, 0, 0),
//   },
// };

// export default function ThreeJs() {
//   const mountRef = useRef(null);
//   const jetRef = useRef(null);
//   const missileRef = useRef(null);
//   const videoRef = useRef(null);
//   const landingRef = useRef(null)

//   const [activeFeature, setActiveFeature] = useState("default");
//   const [showWireframe, setShowWireframe] = useState(false);
//   const [showXRay, setShowXRay] = useState(false);

//   const targetRotation = useRef(new THREE.Quaternion());
//   const targetPosition = useRef(new THREE.Vector3());
//   const targetMissilePosition = useRef(new THREE.Vector3(0, 0, 0));
//   const directionalLightRef = useRef(null);
//   const jetWireframeRef = useRef(null);

//   // Function to apply material changes
//   const handleMaterialChange = (feature, model, isXRay) => {
//     if (!model) return;

//     model.traverse((child) => {
//       if (child.isMesh) {
//         if (!child.userData.originalMaterial) {
//           child.userData.originalMaterial = child.material.clone();
//         }

//         const originalMaterial = child.userData.originalMaterial;
//         const newMaterial = originalMaterial.clone();

//         // X-ray properties
//         if (isXRay) {
//           newMaterial.transparent = true;
//           newMaterial.opacity = 0.2;
//           newMaterial.depthWrite = false;
//           newMaterial.blending = THREE.AdditiveBlending;
//           newMaterial.side = THREE.DoubleSide;
//           newMaterial.color.set(0xffffff);
//           newMaterial.emissive.set(0xffffff);
//           newMaterial.emissiveIntensity = 0.5;
//         } else {
//           // Revert to original properties
//           newMaterial.transparent = originalMaterial.transparent;
//           newMaterial.opacity = originalMaterial.opacity;
//           newMaterial.depthWrite = originalMaterial.depthWrite;
//           newMaterial.blending = originalMaterial.blending;
//           newMaterial.side = originalMaterial.side;
//           newMaterial.color.copy(originalMaterial.color);
//           newMaterial.emissive.copy(originalMaterial.emissive);
//           newMaterial.emissiveIntensity = originalMaterial.emissiveIntensity;

//           // Apply feature-specific effects if not in X-ray mode
//           if (feature === "stealth" || feature === "electronic") {
//             const color = feature === "stealth" ? 0x2b2b2b : 0x00ff00;
//             const intensity = feature === "stealth" ? 2 : 1;
//             newMaterial.emissive.set(color);
//             newMaterial.emissiveIntensity = intensity;
//           }
//         }
//         child.material = newMaterial;
//       }
//     });
//   };

//   useEffect(() => {
//     if (!mountRef.current) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       25,
//       mountRef.current.clientWidth / mountRef.current.clientHeight,
//       0.1,
//       10000
//     );
//     camera.position.set(0, 20, -300);
//     camera.lookAt(0, 0, 0);

//     const ambient = new THREE.AmbientLight(0xadbcff, 2);
//     scene.add(ambient);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
//     directionalLight.position.set(50, 50, 50);
//     directionalLight.target.position.set(20, 0, 0);
//     scene.add(directionalLight);
//     scene.add(directionalLight.target);
//     directionalLightRef.current = directionalLight;

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setClearColor(0x000000, 0);
//     renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);

//     while (mountRef.current.firstChild) {
//       mountRef.current.removeChild(mountRef.current.firstChild);
//     }
//     mountRef.current.appendChild(renderer.domElement);

//     getModel("/AdvancedJet.glb")
//       .then((gltf) => {
//         if (!gltf || !gltf.scene) {
//           console.error("GLTF not valid", gltf);
//           return;
//         }
//         const jetModel = gltf.scene;
//         jetRef.current = jetModel;
//         jetModel.position.set(0, 0, 0);
//         jetModel.rotation.y = Math.PI / 2;
//         scene.add(jetModel);

//         const missiles = jetModel.getObjectByName("missiles");
//         if (missiles) {
//           missileRef.current = missiles;
//         } else {
//           missileRef.current = null;
//         }

//         const LandingGear = jetModel.getObjectByName("LandingGear");
//         if (LandingGear) {
//           landingRef.current = LandingGear;
//         } else {
//           landingRef.current = null;
//         }

//         const wireframeGroup = new THREE.Group();
//         jetModel.traverse((child) => {
//           if (child.isMesh) {
//             const edges = new THREE.EdgesGeometry(child.geometry);
//             const line = new THREE.LineSegments(
//               edges,
//               new THREE.LineBasicMaterial({
//                 color: 0x000000,
//                 linewidth: 1,
//               })
//             );
//             line.applyMatrix4(child.matrixWorld);
//             wireframeGroup.add(line);
//           }
//         });
//         scene.add(wireframeGroup);
//         jetWireframeRef.current = wireframeGroup;
//         jetWireframeRef.current.visible = showWireframe;

//         handleMaterialChange(activeFeature, jetModel, showXRay);
//       })
//       .catch((err) => {
//         console.error("Model failed to load:", err);
//       });

//     let frameId;
//     const animate = () => {
//       frameId = requestAnimationFrame(animate);

//       if (jetRef.current) {
//         jetRef.current.quaternion.slerp(targetRotation.current, 0.05);
//         jetRef.current.position.lerp(targetPosition.current, 0.05);

//         if (jetWireframeRef.current) {
//           jetWireframeRef.current.position.copy(jetRef.current.position);
//           jetWireframeRef.current.quaternion.copy(jetRef.current.quaternion);
//         }
//       }
//       if (missileRef.current && missileRef.current.visible) {
//         missileRef.current.position.lerp(targetMissilePosition.current, 0.04);
//       }
//       renderer.render(scene, camera);
//     };
//     animate();

//     const handleResize = () => {
//       if (!mountRef.current) return;
//       camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       cancelAnimationFrame(frameId);
//       renderer.dispose?.();
//       if (mountRef.current && mountRef.current.firstChild) {
//         mountRef.current.removeChild(mountRef.current.firstChild);
//       }
//       jetRef.current = null;
//       missileRef.current = null;
//       jetWireframeRef.current = null;
//     };
//     // eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//     if (jetWireframeRef.current) {
//       jetWireframeRef.current.visible = showWireframe;
//     }
//   }, [showWireframe]);

//   useEffect(() => {
//     if (jetRef.current) {
//       handleMaterialChange(activeFeature, jetRef.current, showXRay);
//     }
//   }, [showXRay, activeFeature, handleMaterialChange]);

//   useEffect(() => {
//     const transform = featureTransforms[activeFeature];
//     targetRotation.current.setFromEuler(transform.rotation);
//     targetPosition.current.copy(transform.position);

//     if (directionalLightRef.current) {
//       directionalLightRef.current.visible = activeFeature !== "stealth";
//     }

//     let missilesDelay;
//     if (missileRef.current) {
//       if (activeFeature === "missiles") {
//         missileRef.current.visible = true;
//         missilesDelay = setTimeout(() => {
//           targetMissilePosition.current.set(40, 0, 0);
//         }, 1000);
//       } else {
//         missileRef.current.visible = false;
//         targetMissilePosition.current.set(0, 0, 0);
//       }
//     }

//     if (videoRef.current) {
//       if (activeFeature === "supercruise") {
//         videoRef.current.play();
//       } else {
//         videoRef.current.pause();
//         videoRef.current.currentTime = 0;
//       }
//     }

//     handleMaterialChange(activeFeature, jetRef.current, showXRay);

//     return () => {
//       clearTimeout(missilesDelay);
//     };
//   }, [activeFeature, showXRay, handleMaterialChange]);

//   function handleFeatureClick(feature) {
//     setActiveFeature((cur) => (cur === feature ? "default" : feature));
//   }

//   return (
//     <div className="w-full h-screen">
//       <div ref={mountRef} className="h-screen w-full z-50" />
//       <img
//         src="/shadow.png"
//         className="absolute top-[60%] left-[20%] opacity-70 h-40 w-[40rem] z-[49]"
//         alt=""
//       />
//       <button
//         onClick={() => setShowWireframe(!showWireframe)}
//         className="absolute top-4 right-4 bg-gray-700 text-white px-4 py-2 rounded z-[100]"
//       >
//         Toggle Wireframe ({showWireframe ? "ON" : "OFF"})
//       </button>

//       <button
//         onClick={() => setShowXRay(!showXRay)}
//         className="absolute top-16 right-4 bg-purple-700 text-white px-4 py-2 rounded z-[100]"
//         style={{ top: '80px' }}
//       >
//         Toggle X-Ray ({showXRay ? "ON" : "OFF"})
//       </button>

//       <div className="absolute top-16 right-4 flex flex-col space-y-2 z-[100]" style={{ top: '140px' }}>
//         {Object.keys(featureTransforms).map((feature) => (
//           <button
//             key={feature}
//             onClick={() => handleFeatureClick(feature)}
//             className={`px-3 py-1 rounded ${
//               activeFeature === feature ? "bg-blue-600" : "bg-gray-500"
//             } text-white`}
//           >
//             {feature.charAt(0).toUpperCase() + feature.slice(1)}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useProgress } from '@react-three/drei';

// This is the model you are loading. Assuming it's in the public folder.
const modelPath = "/AdvancedJet.glb";
const shadowPath = "/shadow.png";

const featureTransforms = {
  default: {
    rotation: new THREE.Euler(0, Math.PI / 2, 0),
    position: new THREE.Vector3(0, 0, 0),
  },
  vectorSystem: {
    rotation: new THREE.Euler(0, Math.PI, 0),
    position: new THREE.Vector3(40, 80, -100),
  },
  stealth: {
    rotation: new THREE.Euler(-1, Math.PI, 0.3),
    position: new THREE.Vector3(-30, -10, 0),
  },
  missiles: {
    rotation: new THREE.Euler(Math.PI / 2 + 0.4, Math.PI + 0.4, -0.7),
    position: new THREE.Vector3(-20, -20, 0),
  },
  supercruise: {
    rotation: new THREE.Euler(0, (3 * Math.PI) / 4, 0),
    position: new THREE.Vector3(0, 0, 0),
  },
  electronic: {
    rotation: new THREE.Euler(0.5, Math.PI / 2 - 0.8, 0),
    position: new THREE.Vector3(-40, 0, 0),
  },
};

const PlaneScene = ({ activeFeature, showXRay, showWireframe }) => {
  const jetRef = useRef(null);
  const missileRef = useRef(null);
  const landingRef = useRef(null);
  const jetWireframeRef = useRef(null);

  // const targetRotation = useRef(new THREE.Quaternion());
  // const targetPosition = useRef(new THREE.Vector3());
  // const targetMissilePosition = useRef(new THREE.Vector3(0, 0, 0));
  // const directionalLightRef = useRef(null);
  const scrollProgressRef = useRef(0);

  // Define the animation stages based on scroll progress (0 to 1)
  const animationStages = [
    {
      progress: 0,
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(0, Math.PI / 2, 0),
    },
    {
      progress: 0.2,
      position: new THREE.Vector3(0, -50, 150),
      rotation: new THREE.Euler(0, -Math.PI/2, Math.PI/2), // Bank slightly
    },
    {
      progress: 0.4,
      position: new THREE.Vector3(50, 20, 300),
      rotation: new THREE.Euler(-Math.PI/2, 0, 0),
    },
    {
      progress: 0.6,
      position: new THREE.Vector3(-70, 20, -80),
      rotation: new THREE.Euler(-0.3, -(Math.PI/2+0.6), 0), // Dive and turn
    },
    {
      progress: 0.8,
      position: new THREE.Vector3(-0, 20, -80),
      rotation: new THREE.Euler(-0.3, -(Math.PI/2), 0), // Dive and turn
    },
    {
      progress: 1,
      position: new THREE.Vector3(-70, 20, 0),
      rotation: new THREE.Euler(-0.3, -(Math.PI/2+0.6), 0), // Dive and turn
    }
  ];

  // Load the GLTF model
  const gltf = useLoader(GLTFLoader, modelPath);

  // Function to apply material changes
  const handleMaterialChange = useCallback((feature, model, isXRay) => {
    if (!model) return;
    model.traverse((child) => {
      if (child.isMesh) {
        if (!child.userData.originalMaterial) {
          child.userData.originalMaterial = child.material.clone();
        }
        const originalMaterial = child.userData.originalMaterial;
        const newMaterial = originalMaterial.clone();

        if (isXRay) {
          newMaterial.transparent = true;
          newMaterial.opacity = 0.2;
          newMaterial.depthWrite = false;
          newMaterial.blending = THREE.AdditiveBlending;
          newMaterial.side = THREE.DoubleSide;
          newMaterial.color.set(0xffffff);
          newMaterial.emissive.set(0xffffff);
          newMaterial.emissiveIntensity = 0.5;
        } else {
          newMaterial.copy(originalMaterial);
          if (feature === "stealth" || feature === "electronic") {
            const color = feature === "stealth" ? 0x2b2b2b : 0x00ff00;
            const intensity = feature === "stealth" ? 2 : 1;
            newMaterial.emissive.set(color);
            newMaterial.emissiveIntensity = intensity;
          }
        }
        child.material = newMaterial;
      }
    });
  }, []);

  const { scene } = useThree();

  useEffect(() => {
    const jetModel = gltf.scene.clone();
    jetModel.position.set(0, 20, -300);
    jetModel.rotation.y = Math.PI / 2;
    jetRef.current = jetModel;
    scene.add(jetModel);

    const missiles = jetModel.getObjectByName("missiles");
    if (missiles) {
      missileRef.current = missiles;
    } else {
      missileRef.current = null;
    }

    const LandingGear = jetModel.getObjectByName("LandingGear");
    if (LandingGear) {
      landingRef.current = LandingGear;
    } else {
      landingRef.current = null;
    }

    const wireframeGroup = new THREE.Group();
    jetModel.traverse((child) => {
      if (child.isMesh) {
        const edges = new THREE.EdgesGeometry(child.geometry);
        const line = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({
            color: 0x000000,
            linewidth: 1,
          })
        );
        line.applyMatrix4(child.matrixWorld);
        wireframeGroup.add(line);
      }
    });
    scene.add(wireframeGroup);
    jetWireframeRef.current = wireframeGroup;
    jetWireframeRef.current.visible = showWireframe;
    
    handleMaterialChange(activeFeature, jetModel, showXRay);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? scrollY / totalHeight : 0;
      scrollProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount to set initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (jetRef.current) scene.remove(jetRef.current);
      if (jetWireframeRef.current) scene.remove(jetWireframeRef.current);
    };
  }, [gltf, scene, activeFeature, showXRay, showWireframe, handleMaterialChange]);

  useFrame(() => {
    const offset = scrollProgressRef.current;
    
    if (jetRef.current) {
      // Find the current and next stages
      let currentStage = animationStages[0];
      let nextStage = animationStages[0];
      let t = 0; // Interpolation factor

      for (let i = 0; i < animationStages.length - 1; i++) {
        const start = animationStages[i];
        const end = animationStages[i + 1];

        if (offset >= start.progress && offset <= end.progress) {
          currentStage = start;
          nextStage = end;
          // Calculate the interpolation factor (t) for the current segment
          t = (offset - start.progress) / (end.progress - start.progress);
          break;
        }
      }

      // Interpolate position and rotation
      jetRef.current.position.lerpVectors(currentStage.position, nextStage.position, t);
      
      const currentRotationQuaternion = new THREE.Quaternion().setFromEuler(currentStage.rotation);
      const nextRotationQuaternion = new THREE.Quaternion().setFromEuler(nextStage.rotation);
      const interpolatedQuaternion = new THREE.Quaternion();
      interpolatedQuaternion.slerpQuaternions(currentRotationQuaternion, nextRotationQuaternion, t);
      jetRef.current.quaternion.copy(interpolatedQuaternion);
    }
  });

  return null;
};

export default function ThreeJs() {
  const [activeFeature, setActiveFeature] = useState("default");
  const [showWireframe, setShowWireframe] = useState(false);
  const [showXRay, setShowXRay] = useState(false);
  
  const handleFeatureClick = (feature) => {
    setActiveFeature((cur) => (cur === feature ? "default" : feature));
  };

  const { progress } = useProgress();
  console.log(progress)

  return (
    <>
      <div className="w-full h-screen">
        {progress < 100 && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-[101]">
            <div className="text-white text-2xl animate-pulse">
              Loading... {progress.toFixed(0)}%
            </div>
          </div>
        )}
        <Canvas camera={{ position: [0, 20, -300], fov: 25, far: 10000 }}>
          {/* Set up lights and other scene elements */}
          <ambientLight intensity={2} color={0xadbcff} />
          <directionalLight position={[50, 50, 50]} intensity={2} />
          <PlaneScene 
            activeFeature={activeFeature}
            showXRay={showXRay}
            showWireframe={showWireframe}
          />
        </Canvas>
        
        <img
          src={shadowPath}
          className="absolute top-[60%] left-[20%] opacity-70 h-40 w-[40rem] z-[49]"
          alt=""
        />

        <div className="absolute top-4 right-4 flex flex-col space-y-2 z-[100]">
          <button
            onClick={() => setShowWireframe(!showWireframe)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg z-[100] transition-all duration-300 transform hover:scale-105"
          >
            Toggle Wireframe ({showWireframe ? "ON" : "OFF"})
          </button>
          <button
            onClick={() => setShowXRay(!showXRay)}
            className="bg-purple-700 text-white px-4 py-2 rounded-lg z-[100] transition-all duration-300 transform hover:scale-105"
          >
            Toggle X-Ray ({showXRay ? "ON" : "OFF"})
          </button>
        </div>

        <div className="absolute top-16 right-4 flex flex-col space-y-2 z-[100]" style={{ top: '140px' }}>
          {Object.keys(featureTransforms).map((feature) => (
            <button
              key={feature}
              onClick={() => handleFeatureClick(feature)}
              className={`px-3 py-1 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                activeFeature === feature ? "bg-blue-600 font-bold" : "bg-gray-500"
              } text-white`}
            >
              {feature.charAt(0).toUpperCase() + feature.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
