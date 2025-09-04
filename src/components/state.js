import * as THREE from 'three';

export const state = [
  {
    name: "scene1",
    camera: {
      cameraStartPosition: new THREE.Vector3(200, 150, 250),
      cameraEndPosition: new THREE.Vector3(50, 50, -230),
    },
    jet: {
      jetStartPosition: new THREE.Vector3(50, 100, -500),
      jetEndPosition: new THREE.Vector3(0, 50, 0),
    },
    lights: {
      ambientLight: new THREE.Vector3(0, 0, 0),
      directionalLight: new THREE.Vector3(0, 0, 0),
    },
  },
  {
    name: "scene2",
    camera: {
      cameraStartPosition: new THREE.Vector3(0, 0, 0),
      cameraEndPosition: new THREE.Vector3(0, 0, 0),
    },
    jet: {
      jetStartPosition: new THREE.Vector3(0, 0, 0),
      jetEndPosition: new THREE.Vector3(0, 0, 0),
    },
    lights: {
      ambientLight: new THREE.Vector3(0, 0, 0),
      directionalLight: new THREE.Vector3(0, 0, 0),
    },
  },
];