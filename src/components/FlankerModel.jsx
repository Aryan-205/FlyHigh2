import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const MODEL_PATH1 = '/jetWithLanding.glb'; 
const MODEL_PATH2 = '/newJetWithoutLanding2.glb'; 

function FlankerModel1(props) {
  // Model data is loaded and cached
  const gltf = useLoader(GLTFLoader, MODEL_PATH1);
  const modelScene = React.useMemo(() => gltf.scene.clone(), [gltf.scene]);
  return <primitive object={modelScene} {...props} />; 
}

function FlankerModel2(props) {
  // Model data is loaded and cached
  const gltf = useLoader(GLTFLoader, MODEL_PATH2);
  const modelScene = React.useMemo(() => gltf.scene.clone(), [gltf.scene]);
  return <primitive object={modelScene} {...props} />; 
}

export { FlankerModel1, FlankerModel2 };