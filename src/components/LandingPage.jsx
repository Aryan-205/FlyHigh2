// import { useEffect, useRef } from 'react';
// import { gsap, Power1 } from 'gsap';
// import { state } from './state.js';
// import * as THREE from 'three';
// import { getModel } from '../models/model.js';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { progress } from 'motion/react';

// gsap.registerPlugin(ScrollTrigger);

// export default function LandingPage() {
//     const mountRef = useRef(null);
//     const jetRef = useRef(null);
//     const sceneRef = useRef(null);
//     const cameraRef = useRef(null);
//     const rendererRef = useRef(null);
//     const animateRef = useRef(null);

//     useEffect(() => {
//         if (!mountRef.current) return;

//         // Scene, Camera, and Renderer Setup
//         const scene = new THREE.Scene();
//         sceneRef.current = scene;

//         const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 100000);
//         cameraRef.current = camera;
//         camera.lookAt(0, 0, 0);

//         const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//         renderer.setPixelRatio(window.devicePixelRatio);
//         renderer.setClearColor(0x000000, 0);
//         rendererRef.current = renderer;

//         if (mountRef.current.firstChild) {
//             mountRef.current.removeChild(mountRef.current.firstChild);
//         }
//         mountRef.current.appendChild(renderer.domElement);

//         // Lighting Setup
//         const light = new THREE.AmbientLight(0xffffff, 1);
//         scene.add(light);

//         // Load HDR environment map
//         const pmremGenerator = new THREE.PMREMGenerator(renderer);
//         pmremGenerator.compileEquirectangularShader();
//         new RGBELoader().setPath('/hdrs/').load('citrus_orchard_road_puresky_2k.hdr', (texture) => {
//             const envMap = pmremGenerator.fromEquirectangular(texture).texture;
//             scene.background = envMap;
//             scene.environment = envMap;
//             texture.dispose();
//             pmremGenerator.dispose();
//         });

//         // Load 3D Models and setup GSAP animation
//         const loadModels = async () => {
//             const jetGltf = await getModel('/jetWithLanding.glb');
//             const shipGltf = await getModel('/aircraftCarrier3.glb');
//             const oceanGltf = await getModel('/ocean.glb');

//             const jetModel = jetGltf.scene;
//             jetModel.position.set(0, 50, 0);
//             jetModel.scale.setScalar(0.23);
//             jetModel.rotation.y = -Math.PI / 2;
//             jetRef.current = jetModel;
//             scene.add(jetModel);

//             const shipModel = shipGltf.scene;
//             shipModel.position.set(0, 16, 0);
//             shipModel.rotation.y = -(Math.PI + 0.1);
//             scene.add(shipModel);

//             const oceanModel = oceanGltf.scene;
//             oceanModel.position.set(0, 0, 0);
//             scene.add(oceanModel);
//         };

//         let progressP = 0;

//         // Animation Loop
//         const animate = () => {
//             animateRef.current = requestAnimationFrame(animate);

//             progressP += 0.01

//             if (rendererRef.current && sceneRef.current && cameraRef.current) {

//               cameraRef.current.position.lerpVectors(state[1].camera.cameraStartPosition, state[1].camera.cameraEndPosition, progressP)
//               jetRef.current.position.lerpVectors(state[1].jet.jetStartPosition, state[1].jet.jetEndPosition, progressP)

//                 rendererRef.current.render(sceneRef.current, cameraRef.current);
//             }
//         };

//         loadModels().then(() => {
//             animate();
//         });

//         // Handle window resize
//         const handleResize = () => {
//             if (mountRef.current && cameraRef.current && rendererRef.current) {
//                 cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
//                 cameraRef.current.updateProjectionMatrix();
//                 rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//             }
//         };
//         window.addEventListener('resize', handleResize);

//         // Cleanup function for Three.js
//         return () => {
//             window.removeEventListener('resize', handleResize);
//             if (mountRef.current && mountRef.current.firstChild) {
//                 mountRef.current.removeChild(mountRef.current.firstChild);
//             }
//             if (animateRef.current) {
//                 cancelAnimationFrame(animateRef.current);
//             }
//             // Kill ScrollTrigger and its associated animations
//             ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//         };
//     }, []);

//     return (
//         <div id="section1" className="h-[200vh] relative flex justify-center">
//             <div ref={mountRef} className="fixed inset-0 z-10 h-[100vh]"></div>
//             <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-4xl z-20">
//                 Scroll to animate
//             </div>
//         </div>
//     );
// }

import { useEffect, useRef } from 'react';
// Remove GSAP imports
// import { gsap, Power1 } from 'gsap';
import { state } from './state.js';
import * as THREE from 'three';
import { getModel } from '../models/model.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// Remove ScrollTrigger and motion imports
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { progress } from 'motion/react';

export default function LandingPage() {
    const mountRef = useRef(null);
    const jetRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const animateRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene, Camera, and Renderer Setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 100000);
        cameraRef.current = camera;
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        rendererRef.current = renderer;

        if (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
        }
        mountRef.current.appendChild(renderer.domElement);

        // Lighting Setup
        const light = new THREE.AmbientLight(0xffffff, 1);
        scene.add(light);

        // Load HDR environment map
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();
        new RGBELoader().setPath('/hdrs/').load('citrus_orchard_road_puresky_2k.hdr', (texture) => {
            const envMap = pmremGenerator.fromEquirectangular(texture).texture;
            scene.background = envMap;
            scene.environment = envMap;
            texture.dispose();
            pmremGenerator.dispose();
        });

        // Load 3D Models
        const loadModels = async () => {
            const [jetGltf, shipGltf, oceanGltf] = await Promise.all([
                getModel('/jetWithLanding.glb'),
                getModel('/aircraftCarrier3.glb'),
                getModel('/ocean.glb')
            ]);

            const jetModel = jetGltf.scene;
            jetModel.position.set(state[1].jet.jetStartPosition.x, state[1].jet.jetStartPosition.y, state[1].jet.jetStartPosition.z);
            jetModel.scale.setScalar(0.23);
            jetModel.rotation.y = -Math.PI / 2;
            jetRef.current = jetModel;
            scene.add(jetModel);

            const shipModel = shipGltf.scene;
            shipModel.position.set(0, 16, 0);
            shipModel.rotation.y = -(Math.PI + 0.1);
            scene.add(shipModel);

            const oceanModel = oceanGltf.scene;
            oceanModel.position.set(0, 0, 0);
            scene.add(oceanModel);

            // Set initial camera position after models are loaded
            camera.position.set(state[1].camera.cameraStartPosition.x, state[1].camera.cameraStartPosition.y, state[1].camera.cameraStartPosition.z);
        };

        // Animation Loop using lerp
        let progressP = 0;
        const animate = () => {
            animateRef.current = requestAnimationFrame(animate);

            if (rendererRef.current && sceneRef.current && cameraRef.current && jetRef.current) {
                // Increment progress, but don't let it go past 1
                progressP = Math.min(progressP + 0.005, 1);

                // Lerp the camera and jet positions
                cameraRef.current.position.lerpVectors(state[1].camera.cameraStartPosition, state[1].camera.cameraEndPosition, progressP);
                jetRef.current.position.lerpVectors(state[1].jet.jetStartPosition, state[1].jet.jetEndPosition, progressP);

                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };

        // Start loading models, then start the rendering and animation loop
        loadModels().then(() => {
            animate();
        });

        // Handle window resize
        const handleResize = () => {
            if (mountRef.current && cameraRef.current && rendererRef.current) {
                cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        // Cleanup function for Three.js
        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && mountRef.current.firstChild) {
                mountRef.current.removeChild(mountRef.current.firstChild);
            }
            if (animateRef.current) {
                cancelAnimationFrame(animateRef.current);
            }
        };
    }, []);

    return (
        <div id="section1" className="h-[100vh] relative flex justify-center">
            <div ref={mountRef} className="absolute inset-0 z-10 h-[100vh]"></div>
        </div>
    );
}