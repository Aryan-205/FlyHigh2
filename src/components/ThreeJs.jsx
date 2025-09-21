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

  const scrollProgressRef = useRef(0);

  const animationStages = [
    {
      progress: 0,
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(0, Math.PI / 2, 0),
    },
    {
      progress: 0.2,
      position: new THREE.Vector3(0, 40, 150),
      rotation: new THREE.Euler(0, Math.PI/2, -0.3), 
    },
    {
      progress: 0.4,
      position: new THREE.Vector3(50, 20, 80),
      rotation: new THREE.Euler(-0.3, -(Math.PI/2+0.6), 0),
    },
    {
      progress: 0.6,
      position: new THREE.Vector3(50, 20, 250),
      rotation: new THREE.Euler(-Math.PI/2, 0, 0), 
    },
    {
      progress: 0.8,
      position: new THREE.Vector3(0, 5, -384),
      rotation: new THREE.Euler(0.01, -(Math.PI/2), 0),
    },
    {
      progress: 1,
      position: new THREE.Vector3(70, 20, -80),
      rotation: new THREE.Euler(-0.3, -(Math.PI/2-0.6), 0), 
    }
  ];

  // Load the GLTF model
  const gltf = useLoader(GLTFLoader, modelPath);

  // Function to apply material changes
  const handleMaterialChange = useCallback((feature, model, isXRay, isWireframe) => {
    if (!model) return;
    model.traverse((child) => {
      if (child.isMesh) {
        if (!child.userData.originalMaterial) {
          child.userData.originalMaterial = child.material.clone();
        }
        const originalMaterial = child.userData.originalMaterial;
        const newMaterial = originalMaterial.clone();

        // Apply wireframe property
        newMaterial.wireframe = isWireframe;

        if (isXRay) {
          newMaterial.transparent = true;
          newMaterial.opacity = 0.2;
          newMaterial.depthWrite = false;
          newMaterial.blending = THREE.AdditiveBlending;
          newMaterial.side = THREE.DoubleSide;
          newMaterial.color.set(0xffffff);
          newMaterial.emissive.set(0x000000);
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

    handleMaterialChange(activeFeature, jetModel, showXRay, showWireframe);

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
          <ambientLight intensity={2} color={0xffffff} />
          <directionalLight position={[50, 50, 50]} intensity={2} />
          <PlaneScene 
            activeFeature={activeFeature}
            showXRay={showXRay}
            showWireframe={showWireframe}
          />
        </Canvas>
        {/* <img
          src={shadowPath}
          className="absolute top-[60%] left-[20%] opacity-70 h-40 w-[40rem] z-[49]"
          alt=""
        /> */}
        

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