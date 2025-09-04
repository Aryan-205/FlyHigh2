import { useEffect, useRef } from 'react';
import { state } from './state.js';
import * as THREE from 'three';
import { getModel } from '../models/model.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

export default function LandingPage() {
    const mountRef = useRef(null);
    const jetRef = useRef(null);
    const animateRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene, Camera, and Renderer Setup
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 100000);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);

        if (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
        }
        mountRef.current.appendChild(renderer.domElement);

        const light = new THREE.AmbientLight(0xffffff, 2);
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
                getModel('/ocean2.glb')
            ]);

            const jetModel = jetGltf.scene;
            jetModel.position.copy(state[0].jet.jetStartPosition);
            jetModel.scale.setScalar(0.23);
            jetModel.rotation.y = -Math.PI / 2;
            jetRef.current = jetModel;
            scene.add(jetModel);

            const shipModel = shipGltf.scene;
            shipModel.position.set(0, 16, 0);
            shipModel.rotation.y = -(Math.PI + 0.1);
            scene.add(shipModel);

            const oceanModel = oceanGltf.scene;
            oceanModel.position.set(0, -20, 0);
            scene.add(oceanModel);

            camera.position.copy(state[0].camera.cameraStartPosition);
        };

        // Animation Loop using lerp
        let progressP = 0;
        const animate = () => {
            animateRef.current = requestAnimationFrame(animate);

            if (renderer && scene && camera && jetRef.current) {
                // Increment progress, but don't let it go past 1
                progressP = Math.min(progressP + 0.003, 1);

                // Lerp the camera and jet positions
                camera.position.lerpVectors(state[0].camera.cameraStartPosition, state[0].camera.cameraEndPosition, progressP);
                jetRef.current.position.lerpVectors(state[0].jet.jetStartPosition, state[0].jet.jetEndPosition, progressP);
                camera.lookAt(0,0,-50)

                renderer.render(scene, camera);
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