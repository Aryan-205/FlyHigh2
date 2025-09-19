import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getModel } from "../utils/getModel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

gsap.registerPlugin(ScrollTrigger);

// A simple helper function to create a basic light setup
const setupLights = (scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(50, 50, 50);
  scene.add(directionalLight);
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight2.position.set(-50, -50, -50);
  scene.add(directionalLight2);
};

export default function Scene() {
  const mountRef = useRef(null);
  const jetRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      25,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 20);

    setupLights(scene);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);

    mountRef.current.appendChild(renderer.domElement);

    // LOAD 3D MODEL
    getModel("/newJetWithoutLanding2.glb").then((gltf) => {
      const jetModel = gltf.scene;
      jetRef.current = jetModel;
      scene.add(jetModel);
    });

    // GSAP ANIMATIONS
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-container", // The container that drives the scroll
        scrub: true,
        start: "top top",
        end: "bottom bottom",
      },
    });

    tl.to(camera.position, {
      x: 5,
      y: 0,
      z: 50,
      onUpdate: () => camera.lookAt(0, 0, 0),
    })
    .to(jetRef.current.rotation, {
      x: Math.PI / 4,
      y: Math.PI,
      z: 0
    }, "<")
    .to(jetRef.current.position, {
      x: 10,
      y: 2,
      z: 0
    }, "<");

    // RENDER LOOP
    const animate = () => {
      requestAnimationFrame(animate);
      if (jetRef.current) {
        // Optional: Add some subtle, continuous animation
        jetRef.current.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    // CLEANUP FUNCTION
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={mountRef} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 10 }} />
  );
}