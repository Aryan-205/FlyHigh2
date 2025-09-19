import Intro from './components/Intro';
import FrontScene from './components/FrontScene';
import Features from './components/Features';
import CockpitScene from './components/Cockpit';

export default function App() {    

    return (
        <div className="w-full">
            <div className='w-full relative'>
                <nav className="flex-center w-full">
                    <div className="text-white text-2xl font-light flex gap-20 pt-20 fixed z-[998]">
                        <p>Hanger</p>
                        <p>Ability</p>
                        <p>Cockpit</p>
                        <p>About</p>
                    </div>
                </nav>
                {/* <Intro/> */}
                <FrontScene/>
                <Features/>
                <CockpitScene/>
            </div>
        </div>
    );
};
// //no church in the wild


// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);

// import { getModel } from './models/model'

// // Feature transforms for different sections
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

// // Single Scene Manager for the entire website
// class UnifiedSceneManager {
//     constructor(canvas) {
//         this.canvas = canvas;
//         this.scene = new THREE.Scene();
//         this.camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 10000);
//         this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
//         this.jet = null;
//         this.missileRef = null;
//         this.lights = [];
//         this.directionalLightRef = null;
        
//         // Animation targets
//         this.targetRotation = new THREE.Quaternion();
//         this.targetPosition = new THREE.Vector3();
//         this.targetMissilePosition = new THREE.Vector3(0, 0, 0);
        
//         // Current section state
//         this.activeFeature = "default";
        
//         this.init();
//         this.setupLights();
//         this.loadJet();
//         this.animate();
//     }

//     init() {
//         this.renderer.setSize(window.innerWidth, window.innerHeight);
//         this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//         this.renderer.shadowMap.enabled = true;
//         this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//         this.renderer.setClearColor(0x000000, 0);
        
//         this.camera.position.set(0, 24, -300); 
//         this.camera.lookAt(0, 0, 0);
        
//         // Handle resize
//         window.addEventListener('resize', () => {
//             this.camera.aspect = window.innerWidth / window.innerHeight;
//             this.camera.updateProjectionMatrix();
//             this.renderer.setSize(window.innerWidth, window.innerHeight);
//         });
//     }

//     setupLights() {
//         // Ambient light
//         const ambientLight = new THREE.AmbientLight(0xdeebfa, 1);
//         this.scene.add(ambientLight);
        
//         // Main directional light
//         const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//         directionalLight.position.set(50, 50, 50);
//         directionalLight.target.position.set(20, 0, 0);
//         directionalLight.castShadow = true;
//         this.scene.add(directionalLight);
//         this.scene.add(directionalLight.target);
//         this.directionalLightRef = directionalLight;
        
//         // Secondary lights
//         const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
//         directionalLight2.position.set(-50, 50, 50);
//         directionalLight2.target.position.set(-20, 0, 0);
//         this.scene.add(directionalLight2);
//         this.scene.add(directionalLight2.target);
        
//         const directionalLight3 = new THREE.DirectionalLight(0xffcc8a, 0.51);
//         directionalLight3.position.set(-50, 0, -100);
//         directionalLight3.target.position.set(-20, 0, 0);
//         this.scene.add(directionalLight3);
//         this.scene.add(directionalLight3.target);
//     }

//     async loadJet() {
//         const gltf = await getModel("/jetWithLanding.glb");
//         this.jet = gltf.scene;
//         this.jet.position.set(0, 0, 0);
//         this.jet.rotation.y = Math.PI / 2 ;
//         this.scene.add(this.jet);
        
//         // Find missiles group
//         const missilesGroup = this.jet.getObjectByName("missiles");
//         if (missilesGroup) {
//         this.missileRef = missilesGroup;
//         }
//     }

//     animate() {
//         requestAnimationFrame(() => this.animate());
        
//         if (this.jet) {
//         // Smooth interpolation for jet rotation and position
//         const currentQuaternion = new THREE.Quaternion().copy(this.jet.quaternion);
//         currentQuaternion.slerp(this.targetRotation, 0.05);
//         this.jet.quaternion.copy(currentQuaternion);
        
//         this.jet.position.lerp(this.targetPosition, 0.05);
        
//         // Animate missiles if visible
//         if (this.missileRef && this.missileRef.visible) {
//             this.missileRef.position.lerp(this.targetMissilePosition, 0.04);
//         }
//         }
        
//         this.renderer.render(this.scene, this.camera);
//     }

//   // Update jet based on scroll section
//     updateSection(section) {
//         if (!this.jet) return;
        
//         this.activeFeature = section;
//         const transform = featureTransforms[section] || featureTransforms.default;
        
//         // Set target rotation and position
//         this.targetRotation.setFromEuler(transform.rotation);
//         this.targetPosition.copy(transform.position);
        
//         // Handle special features
//         this.handleFeatureEffects(section);
//     }

//     handleFeatureEffects(feature) {
//         if (!this.jet) return;
        
//         // Reset materials first
//         this.jet.traverse((child) => {
//         if (child.isMesh && child.userData.originalMaterial) {
//             child.material = child.userData.originalMaterial;
//         }
//         });
        
//         // Lighting changes for stealth
//         if (this.directionalLightRef) {
//         this.directionalLightRef.visible = feature !== "stealth";
//         }
        
//         // Handle missiles
//         if (this.missileRef) {
//         if (feature === "missiles") {
//             this.missileRef.visible = true;
//             setTimeout(() => {
//             this.targetMissilePosition.set(40, 0, 0);
//             }, 1000);
//         } else {
//             this.targetMissilePosition.set(0, 0, 0);
//         }
//         }
        
//         // Material changes for special effects
//         if (feature === "stealth") {
//         this.jet.traverse((child) => {
//             if (child.isMesh) {
//             if (!child.userData.originalMaterial) {
//                 child.userData.originalMaterial = child.material;
//             }
//             const newMaterial = child.material.clone();
//             newMaterial.emissive = new THREE.Color(0x2b2b2b);
//             newMaterial.emissiveIntensity = 2;
//             child.material = newMaterial;
//             }
//         });
//         } else if (feature === "electronic") {
//         this.jet.traverse((child) => {
//             if (child.isMesh) {
//             if (!child.userData.originalMaterial) {
//                 child.userData.originalMaterial = child.material;
//             }
//             const newMaterial = child.material.clone();
//             newMaterial.emissive = new THREE.Color(0x00ff00);
//             newMaterial.emissiveIntensity = 1;
//             child.material = newMaterial;
//             }
//         });
//         }
//     }

// }

// // GSAP Animation Controller
// class ScrollAnimationController {
//     constructor(sceneManager, setActiveFeature) {
//         this.sceneManager = sceneManager;
//         this.setActiveFeature = setActiveFeature;
//         this.setupScrollAnimations();
//     }

//     setupScrollAnimations() {
//         // Hero to Features transition
//         ScrollTrigger.create({
//             trigger: "#scroll",
//             start: "top top",
//             end: "bottom bottom",
//             scrub: 1,
//             onUpdate: (self) => {
//                 const progress = self.progress;

//                 // Define the plane's transforms for the start and end of the transition
//                 const heroPlanePos = new THREE.Vector3(0, 0, 0);
//                 const heroPlaneRot = new THREE.Euler(0, Math.PI / 2, 0);

//                 const featuresPlanePos = new THREE.Vector3(-20, 0, 0);
//                 const featuresPlaneRot = new THREE.Euler(-0.2, Math.PI/2+0.4, 0);

//                 // Interpolate the plane's position based on scroll progress
//                 this.sceneManager.targetPosition.lerpVectors(heroPlanePos, featuresPlanePos, progress);

//                 // Interpolate the plane's rotation based on scroll progress
//                 const startQuat = new THREE.Quaternion().setFromEuler(heroPlaneRot);
//                 const endQuat = new THREE.Quaternion().setFromEuler(featuresPlaneRot);
//                 this.sceneManager.targetRotation.slerpQuaternions(startQuat, endQuat, progress);
//             }
//         });

//         // Text animations
//         // gsap.from(".hero-title", {
//         //     y: 100,
//         //     opacity: 0,
//         //     duration: 1.5,
//         //     ease: "power2.out",
//         //     scrollTrigger: {
//         //         trigger: "#hero",
//         //         start: "top center",
//         //         end: "bottom center",
//         //         toggleActions: "play none none reverse"
//         //     }
//         // });
//     }
// }

// // Main React Component
// const FighterJetWebsite = () => {
//     const canvasRef = useRef(null);
//     const sceneManagerRef = useRef(null);
//     const animationControllerRef = useRef(null);
//     const [activeFeature, setActiveFeature] = useState("default");

//     useEffect(() => {
//         if (canvasRef.current) {
//             sceneManagerRef.current = new UnifiedSceneManager(canvasRef.current);
//             animationControllerRef.current = new ScrollAnimationController(
//                 sceneManagerRef.current, 
//                 setActiveFeature
//             );
//         }

//         return () => {
//         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//         };
//     }, []);

//     const handleFeatureClick = (feature) => {
//         const newFeature = activeFeature === feature ? "default" : feature;
//         setActiveFeature(newFeature);
//         if (sceneManagerRef.current) {
//         sceneManagerRef.current.updateSection(newFeature);
//         }
//     };

//     return (
//         <div className="relative">
//         {/* Fixed Three.js Canvas */}
//             <canvas
//                 ref={canvasRef}
//                 className="fixed inset-0 w-full h-full z-10"
//             />

//         {/* Scrollable Content */}
//             <div id='scroll' className="relative z-0">
//                 {/* Navigation */}
//                 <nav className="flex justify-center w-full">
//                 <div className="text-white text-2xl font-light flex gap-20 pt-12 fixed z-[998]">
//                     <p className="cursor-pointer hover:text-blue-400 transition-colors">Hanger</p>
//                     <p className="cursor-pointer hover:text-blue-400 transition-colors">Ability</p>
//                     <p className="cursor-pointer hover:text-blue-400 transition-colors">Cockpit</p>
//                     <p className="cursor-pointer hover:text-blue-400 transition-colors">About</p>
//                 </div>
//                 </nav>

//                 {/* Hero Section (FrontScene equivalent) */}
//                 <section id="hero" className="h-screen w-full relative">
//                     <div className="h-screen w-full relative">
//                         <div className="z-20 flex flex-col justify-between absolute inset-0 w-full h-full overflow-hidden">
//                             <div className="flex flex-col items-center justify-start pt-40 gap-12 font-extrabold  text-white/80">
//                             <p className='text-4xl text-center tracking-wider'>The SU-35 Super Flanker</p>
//                             <p className='text-9xl text-center vertical-stretch'>MASTERING SKY</p>
//                             </div>
//                             <div className="flex flex-col justify-end items-center text-white pb-12 text-lg">
//                             <p>Experience unmatched Thrust, manuverability and state of-strat avionics</p>
//                             <p>Future of aerial supority</p>
//                             <img src="down-arrow.png" className="w-auto h-12" alt="" />
//                             </div>
//                         </div>
//                         <img src="/bgImg2.png" className="absolute inset-0 h-full w-full z-0 object-cover" alt="" />
//                         <img src="/shadow.png" className="absolute top-[60%] left-[20%] opacity-70 h-40 w-[40rem] z-10" 
//                         alt="" />
//                     </div>
//                 </section>

//                 {/* Features Section */}
//                 <section id="features" className="min-h-screen w-full relative">
//                     <div className="h-screen w-full relative">
//                         <div className="flex flex-col justify-center items-start gap-8 h-screen absolute px-12 z-20">
//                             {/* All feature buttons */}
//                             <div
//                             id="id1"
//                             onClick={() => handleFeatureClick("vectorSystem")}
//                             className={`feature-button font-light text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 bg-white ${
//                                 activeFeature === "vectorSystem" ? "active" : ""
//                             }`}
//                             >
//                             <p className="text-xl font-medium">Vector Thrust Engine</p>
//                             <p className="description text-gray-300 text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
//                                 Experience agility previously thought impossible. Vector Thrust Engines give the SU-35 the ability to perform radical, gravity-defying maneuvers, turning it into an extension of the pilot's will.
//                             </p>
//                             </div>

//                             <div
//                             id="id2"
//                             onClick={() => handleFeatureClick("stealth")}
//                             className={`feature-button font-light text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 bg-white ${
//                                 activeFeature === "stealth" ? "active" : ""
//                             }`}
//                             >
//                             <p className="text-xl font-medium">Stealth Technology</p>
//                             <p className="description text-gray-300 text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
//                                 In a world of ever-advancing radar, the SU-35 maintains a critical advantage. Advanced stealth technology dramatically reduces its radar cross-section, making it a whisper in a field of thunder.
//                             </p>
//                             </div>

//                             <div
//                             id="id3"
//                             onClick={() => handleFeatureClick("missiles")}
//                             className={`feature-button font-light text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 bg-white ${
//                                 activeFeature === "missiles" ? "active" : ""
//                             }`}
//                             >
//                             <p className="text-xl font-medium">Air-to-Air Missiles</p>
//                             <p className="description text-gray-300 text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
//                                 The SU-35 is a hunter, and its weapons are its ultimate tools. With the R-77 and R-73 air-to-air missiles, you gain beyond-visual-range "fire-and-forget" capabilities and unmatched accuracy in close-quarters combat.
//                             </p>
//                             </div>

//                             <div
//                             id="id4"
//                             onClick={() => {
//                                 handleFeatureClick("supercruise")
//                             }}
//                             className={`feature-button font-light text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 bg-white ${
//                                 activeFeature === "supercruise" ? "active" : ""
//                             }`}
//                             >
//                             <p className="text-xl font-medium">Supercruise Capability</p>
//                             <p className="description text-gray-300 text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
//                                 Leave afterburners behind. Supercruise capability allows for sustained supersonic flight without the immense fuel consumption and obvious infrared signature of a typical fighter, extending range and maintaining a stealthy profile.
//                             </p>
//                             </div>

//                             <div
//                             id="id5"
//                             onClick={() => handleFeatureClick("electronic")}
//                             className={`feature-button font-light text-white w-fit p-4 rounded-3xl cursor-pointer transition-all duration-500 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 bg-white ${
//                                 activeFeature === "electronic" ? "active" : ""
//                             }`}
//                             >
//                             <p className="text-xl font-medium">Electronic Warfare</p>
//                             <p className="description text-gray-300 text-md w-80 mt-2 overflow-hidden transition-all duration-500 ease-in-out">
//                                 The battlespace is also an electromagnetic one. The SU-35's advanced Electronic Warfare Suite provides a comprehensive picture of the environment, giving you the power to manipulate the very rules of the engagement.
//                             </p>
//                             </div>
//                         </div>
//                         <div className="absolute inset-0 w-full h-full z-0">
//                             <video src="bgVid.mp4" muted loop className="w-full h-full object-cover"/>
//                         </div>
//                     </div>
//                 </section>

//             </div>
//         </div>
//     );
// };

// export default FighterJetWebsite;