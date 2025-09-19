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
//     rotation: new THREE.Euler(Math.PI/2+0.4, Math.PI+0.4, -0.7),
//     position: new THREE.Vector3(-20, -20, 0),
//   },
//   supercruise: {
//     rotation: new THREE.Euler(0, 3* Math.PI/4, 0),
//     position: new THREE.Vector3(0, 0, 0),
//   },
//   electronic: {
//     rotation: new THREE.Euler(0.5, Math.PI / 2 - 0.8, 0),
//     position: new THREE.Vector3(-40, 0, 0),
//   },
// };

// export default function Features() {
//   const mountRef = useRef(null);
//   const jetRef = useRef(null);
//   const missileRef = useRef(null); // Ref to hold the missile object group
//   const videoRef = useRef(null);
//   const targetRotation = useRef(new THREE.Quaternion());
//   const targetPosition = useRef(new THREE.Vector3());
//   const directionalLightRef = useRef(null);
//   const targetMissilePosition = useRef(new THREE.Vector3(0, 0, 0));

//   const [activeFeature, setActiveFeature] = useState("default");

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       25,
//       mountRef.current.clientWidth / mountRef.current.clientHeight,
//       0.1,
//       10000
//     );
//     camera.position.set(200, 150, -200);
//     camera.lookAt(0, 0, 0);

//     const light = new THREE.AmbientLight(0xadbcff, 2);
//     scene.add(light);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
//     directionalLight.position.set(50, 50, 50);
//     directionalLight.target.position.set(20, 0, 0);
//     scene.add(directionalLight);
//     scene.add(directionalLight.target);
//     directionalLightRef.current = directionalLight;

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setClearColor(0x000000, 0);

//     if (mountRef.current.firstChild) {
//       mountRef.current.removeChild(mountRef.current.firstChild);
//     }
//     mountRef.current.appendChild(renderer.domElement);

//     getModel("/newJetWithoutLanding2.glb").then((gltf) => {
//       const jetModel = gltf.scene;
//       jetRef.current = jetModel;
//       jetModel.position.set(0, 0, 0);
//       jetModel.rotation.y = Math.PI / 2;
//       scene.add(jetModel);

//       const missilesGroup = jetModel.getObjectByName("missiles");
//       if (missilesGroup) {
//         missileRef.current = missilesGroup;
//       }

//       // We need to set up the materials here as well since the model is loaded here
//       // Call the logic from useEffect
//       handleMaterialChange(activeFeature, jetRef.current);
//     });

//     let frameId;
//     const animate = () => {
//       frameId = requestAnimationFrame(animate);

//       if (jetRef.current) {
//         // Interpolate main jet's rotation
//         const currentQuaternion = new THREE.Quaternion().copy(jetRef.current.quaternion);
//         currentQuaternion.slerp(targetRotation.current, 0.05);
//         jetRef.current.quaternion.copy(currentQuaternion);

//         // Interpolate main jet's position
//         jetRef.current.position.lerp(targetPosition.current, 0.05);
//       }
      
//       // Animate the missile's position if it's visible
//       if (missileRef.current && missileRef.current.visible) {
//         missileRef.current.position.lerp(targetMissilePosition.current, 0.04);
//       }

//       renderer.render(scene, camera);
//     };
//     animate();

//     const handleResize = () => {
//       if (mountRef.current) {
//         camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//       }
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       if (mountRef.current && mountRef.current.firstChild) {
//         mountRef.current.removeChild(mountRef.current.firstChild);
//       }
//       cancelAnimationFrame(frameId);
//     };
//   }, []);

//   // Use a second useEffect to handle rotation, position, and material changes
//   useEffect(() => {
//     let missilesDelay;

//     const transform = featureTransforms[activeFeature];
//     // Convert Euler to Quaternion and store in the ref
//     targetRotation.current.setFromEuler(transform.rotation);
//     // Store the target position in the ref
//     targetPosition.current.copy(transform.position);

//     // Logic to control the directional light for the stealth feature
//     if (directionalLightRef.current) {
//       directionalLightRef.current.visible = activeFeature !== "stealth";
//     }

//     // New logic for missile animation
//     if (missileRef.current) {
//       if (activeFeature === "missiles") {
//         missileRef.current.visible = true;
//         // Animate the missile outwards
//         missilesDelay = setTimeout(()=>{
//           targetMissilePosition.current.set(40, 0, 0);
//         },1000)
//       } else {
//         targetMissilePosition.current.set(0,0,0)
//       }
//     }

//     if (videoRef.current) {
//       if (activeFeature === "supercruise") {
//           videoRef.current.play();
//       } else {
//           videoRef.current.pause();
//           videoRef.current.currentTime = 0; // Rewind the video
//       }
//     }

//     // Call a separate function to handle material changes to avoid repetition
//     if (jetRef.current) {
//       handleMaterialChange(activeFeature, jetRef.current);
//     }
    
//     return ()=> clearTimeout(missilesDelay) 
//   }, [activeFeature]);

//   // Separate function to manage material changes
//   const handleMaterialChange = (feature, model) => {
//     if (!model) return;

//     // Reset materials first
//     model.traverse((child) => {
//       if (child.isMesh && child.userData.originalMaterial) {
//         child.material = child.userData.originalMaterial;
//       }
//     });

//     // Apply new materials based on the active feature
//     if (feature === "stealth") {
//       model.traverse((child) => {
//         if (child.isMesh) {
//           // Store the original material to revert later
//           if (!child.userData.originalMaterial) {
//             child.userData.originalMaterial = child.material;
//           }
//           // Create a new glowing material for stealth
//           const newMaterial = child.material.clone();
//           newMaterial.emissive = new THREE.Color(0x2b2b2b); // Dark emissive
//           newMaterial.emissiveIntensity = 2;
//           child.material = newMaterial;
//         }
//       });
//     } else if (feature === "electronic") {
//       model.traverse((child) => {
//         if (child.isMesh) {
//           // Store the original material to revert later
//           if (!child.userData.originalMaterial) {
//             child.userData.originalMaterial = child.material;
//           }
//           // Create a new glowing material for electronic
//           const newMaterial = child.material.clone();
//           newMaterial.emissive = new THREE.Color(0x00ff00); // A bright green glow
//           newMaterial.emissiveIntensity = 1;
//           child.material = newMaterial;
//         }
//       });
//     }
//   };

//   const handleFeatureClick = (feature) => {
//     if (activeFeature === feature) {
//       setActiveFeature("default");
//     } else {
//       setActiveFeature(feature);
//     }
//   };

//   return (
//     <div className="relative h-[160vh]">
//       <div className="h-screen w-full sticky top-0">
//         <div className="flex flex-col justify-center items-start gap-8 h-screen z-0 absolute px-12">
//           {/* All feature buttons */}
//           <div
//             id="id1"
//             onClick={() => handleFeatureClick("vectorSystem")}
//             className={`feature-button font-light text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 bg-white ${
//               activeFeature === "vectorSystem" ? "active" : ""
//             }`}
//           >
//             <p className="text-xl font-medium">Vector Thrust Engine</p>
//             <p className="description text-gray-300 text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
//               Experience agility previously thought impossible. Vector Thrust Engines give the SU-35 the ability to perform radical, gravity-defying maneuvers, turning it into an extension of the pilot's will.
//             </p>
//           </div>

//           <div
//             id="id2"
//             onClick={() => handleFeatureClick("stealth")}
//             className={`feature-button font-light text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 bg-white ${
//               activeFeature === "stealth" ? "active" : ""
//             }`}
//           >
//             <p className="text-xl font-medium">Stealth Technology</p>
//             <p className="description text-gray-300 text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
//               In a world of ever-advancing radar, the SU-35 maintains a critical advantage. Advanced stealth technology dramatically reduces its radar cross-section, making it a whisper in a field of thunder.
//             </p>
//           </div>

//           <div
//             id="id3"
//             onClick={() => handleFeatureClick("missiles")}
//             className={`feature-button font-light text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 bg-white ${
//               activeFeature === "missiles" ? "active" : ""
//             }`}
//           >
//             <p className="text-xl font-medium">Air-to-Air Missiles</p>
//             <p className="description text-gray-300 text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
//               The SU-35 is a hunter, and its weapons are its ultimate tools. With the R-77 and R-73 air-to-air missiles, you gain beyond-visual-range "fire-and-forget" capabilities and unmatched accuracy in close-quarters combat.
//             </p>
//           </div>

//           <div
//             id="id4"
//             onClick={() => {
//               handleFeatureClick("supercruise")
//             }}
//             className={`feature-button font-light text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 bg-white ${
//               activeFeature === "supercruise" ? "active" : ""
//             }`}
//           >
//             <p className="text-xl font-medium">Supercruise Capability</p>
//             <p className="description text-gray-300 text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
//               Leave afterburners behind. Supercruise capability allows for sustained supersonic flight without the immense fuel consumption and obvious infrared signature of a typical fighter, extending range and maintaining a stealthy profile.
//             </p>
//           </div>

//           <div
//             id="id5"
//             onClick={() => handleFeatureClick("electronic")}
//             className={`feature-button font-light text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 bg-white ${
//               activeFeature === "electronic" ? "active" : ""
//             }`}
//           >
//             <p className="text-xl font-medium">Electronic Warfare</p>
//             <p className="description text-gray-300 text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
//               The battlespace is also an electromagnetic one. The SU-35's advanced Electronic Warfare Suite provides a comprehensive picture of the environment, giving you the power to manipulate the very rules of the engagement.
//             </p>
//           </div>
//         </div>
//         <div ref={mountRef} className="h-screen w-full z-10 absolute" />
//         <div className="absolute inset-0 w-full h-full z-0">
//           <video ref={videoRef} src="bgVid.mp4" muted loop className="w-full h-full object-cover"/>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { getModel } from "../models/model";

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
    rotation: new THREE.Euler(Math.PI/2+0.4, Math.PI+0.4, -0.7),
    position: new THREE.Vector3(-20, -20, 0),
  },
  supercruise: {
    rotation: new THREE.Euler(0, 3* Math.PI/4, 0),
    position: new THREE.Vector3(0, 0, 0),
  },
  electronic: {
    rotation: new THREE.Euler(0.5, Math.PI / 2 - 0.8, 0),
    position: new THREE.Vector3(-40, 0, 0),
  },
};

export default function Features() {
  const mountRef = useRef(null);
  const jetRef = useRef(null);
  const missileRef = useRef(null);
  const videoRef = useRef(null);
  const targetRotation = useRef(new THREE.Quaternion());
  const targetPosition = useRef(new THREE.Vector3());
  const directionalLightRef = useRef(null);
  const targetMissilePosition = useRef(new THREE.Vector3(0, 0, 0));

  const [activeFeature, setActiveFeature] = useState("default");
  const activeFeatureRef = useRef("default"); // New ref to track activeFeature

  useEffect(() => {
    // Update the ref whenever activeFeature state changes
    activeFeatureRef.current = activeFeature;

    let missilesDelay;

    const transform = featureTransforms[activeFeature];
    targetRotation.current.setFromEuler(transform.rotation);
    targetPosition.current.copy(transform.position);

    if (directionalLightRef.current) {
      directionalLightRef.current.visible = activeFeature !== "stealth";
    }

    if (missileRef.current) {
      if (activeFeature === "missiles") {
        missileRef.current.visible = true;
        missilesDelay = setTimeout(() => {
          targetMissilePosition.current.set(40, 0, 0);
        }, 1000);
      } else {
        targetMissilePosition.current.set(0,0,0)
      }
    }

    if (videoRef.current) {
      if (activeFeature === "supercruise") {
          videoRef.current.play();
      } else {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
      }
    }

    if (jetRef.current) {
      handleMaterialChange(activeFeature, jetRef.current);
    }
    
    return ()=> clearTimeout(missilesDelay) 
  }, [activeFeature]);

  // The main useEffect for setting up the scene, which runs only once
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

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(50, 50, 50);
    directionalLight.target.position.set(20, 0, 0);
    scene.add(directionalLight);
    scene.add(directionalLight.target);
    directionalLightRef.current = directionalLight;

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

      const missilesGroup = jetModel.getObjectByName("missiles");
      if (missilesGroup) {
        missileRef.current = missilesGroup;
      }
      handleMaterialChange(activeFeatureRef.current, jetRef.current);
    });

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (jetRef.current) {
        const currentQuaternion = new THREE.Quaternion().copy(jetRef.current.quaternion);
        currentQuaternion.slerp(targetRotation.current, 0.05);
        jetRef.current.quaternion.copy(currentQuaternion);
        jetRef.current.position.lerp(targetPosition.current, 0.05);
      }
      
      if (missileRef.current && missileRef.current.visible) {
        missileRef.current.position.lerp(targetMissilePosition.current, 0.04);
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

  const handleMaterialChange = (feature, model) => {
    if (!model) return;

    model.traverse((child) => {
      if (child.isMesh && child.userData.originalMaterial) {
        child.material = child.userData.originalMaterial;
      }
    });

    if (feature === "stealth") {
      model.traverse((child) => {
        if (child.isMesh) {
          if (!child.userData.originalMaterial) {
            child.userData.originalMaterial = child.material;
          }
          const newMaterial = child.material.clone();
          newMaterial.emissive = new THREE.Color(0x2b2b2b);
          newMaterial.emissiveIntensity = 2;
          child.material = newMaterial;
        }
      });
    } else if (feature === "electronic") {
      model.traverse((child) => {
        if (child.isMesh) {
          if (!child.userData.originalMaterial) {
            child.userData.originalMaterial = child.material;
          }
          const newMaterial = child.material.clone();
          newMaterial.emissive = new THREE.Color(0x00ff00);
          newMaterial.emissiveIntensity = 1;
          child.material = newMaterial;
        }
      });
    }
  };

  const handleFeatureClick = (feature) => {
    // Only update the state if the new feature is different from the current one
    // or if we're "un-selecting" a feature
    if (activeFeature === feature) {
      setActiveFeature("default");
    } else {
      setActiveFeature(feature);
    }
  };

  return (
    <div className="relative h-[160vh]">
      <div className="h-screen w-full sticky top-0">
        <div className="flex flex-col justify-center items-start gap-8 h-screen z-20 absolute px-12">
          <div
            id="id1"
            onClick={() => handleFeatureClick("vectorSystem")}
            className={`feature-button font-light text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 bg-white ${
              activeFeature === "vectorSystem" ? "active" : ""
            }`}
          >
            <p className="text-xl font-medium">Vector Thrust Engine</p>
            <p className="description text-gray-300 text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
              Experience agility previously thought impossible. Vector Thrust Engines give the SU-35 the ability to perform radical, gravity-defying maneuvers, turning it into an extension of the pilot's will.
            </p>
          </div>

          <div
            id="id2"
            onClick={() => handleFeatureClick("stealth")}
            className={`feature-button font-light text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 bg-white ${
              activeFeature === "stealth" ? "active" : ""
            }`}
          >
            <p className="text-xl font-medium">Stealth Technology</p>
            <p className="description text-gray-300 text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
              In a world of ever-advancing radar, the SU-35 maintains a critical advantage. Advanced stealth technology dramatically reduces its radar cross-section, making it a whisper in a field of thunder.
            </p>
          </div>

          <div
            id="id3"
            onClick={() => handleFeatureClick("missiles")}
            className={`feature-button font-light text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 bg-white ${
              activeFeature === "missiles" ? "active" : ""
            }`}
          >
            <p className="text-xl font-medium">Air-to-Air Missiles</p>
            <p className="description text-gray-300 text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
              The SU-35 is a hunter, and its weapons are its ultimate tools. With the R-77 and R-73 air-to-air missiles, you gain beyond-visual-range "fire-and-forget" capabilities and unmatched accuracy in close-quarters combat.
            </p>
          </div>

          <div
            id="id4"
            onClick={() => {
              handleFeatureClick("supercruise")
            }}
            className={`feature-button font-light text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 bg-white ${
              activeFeature === "supercruise" ? "active" : ""
            }`}
          >
            <p className="text-xl font-medium">Supercruise Capability</p>
            <p className="description text-gray-300 text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
              Leave afterburners behind. Supercruise capability allows for sustained supersonic flight without the immense fuel consumption and obvious infrared signature of a typical fighter, extending range and maintaining a stealthy profile.
            </p>
          </div>

          <div
            id="id5"
            onClick={() => handleFeatureClick("electronic")}
            className={`feature-button font-light text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 bg-white ${
              activeFeature === "electronic" ? "active" : ""
            }`}
          >
            <p className="text-xl font-medium">Electronic Warfare</p>
            <p className="description text-gray-300 text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
              The battlespace is also an electromagnetic one. The SU-35's advanced Electronic Warfare Suite provides a comprehensive picture of the environment, giving you the power to manipulate the very rules of the engagement.
            </p>
          </div>
        </div>
        <div ref={mountRef} className="h-screen w-full z-10 absolute" />
        <div className="absolute inset-0 w-full h-full z-0">
          <video ref={videoRef} src="bgVid.mp4" muted loop className="w-full h-full object-cover"/>
        </div>
      </div>
    </div>
  );
}