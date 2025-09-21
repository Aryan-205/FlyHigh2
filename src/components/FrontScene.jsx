import { useEffect, useRef } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const modelPath = "/AdvancedJet.glb";

const PlaneScene = () => {
  const jetRef = useRef(null);

  const gltf = useLoader(GLTFLoader, modelPath);

  const { scene } = useThree();

  useEffect(() => {
    const jetModel = gltf.scene.clone();
    jetModel.position.set(0, 0, 0);
    jetModel.rotation.y = Math.PI / 2;
    jetRef.current = jetModel;
    scene.add(jetModel);

    return () => {
      if (jetRef.current) scene.remove(jetRef.current);
    };
  }, [gltf, scene]);

  return null;
};

export default function FrontScene(){

  return (
    <div className="h-screen w-full relative">
      <div className="absolute z-20 inset-0 w-full h-full">
        <Canvas camera={{ position: [0, 20, -300], fov: 25, far: 10000 }}>
          {/* Set up lights and other scene elements */}
          <ambientLight intensity={2} color={0xfff8de} />
          <directionalLight position={[50, 50, 50]} intensity={2} />
          <PlaneScene />
        </Canvas>
        <img
          src="/shadow.png"
          className="absolute top-[60%] left-[30%] opacity-70 h-40 w-[40rem] z-[49]"
          alt=""
        />
      </div>
      <img src="/bgImg.png" className="absolute inset-0 z-0 h-full w-full object-cover" alt="" />
      <div className="flex flex-col w-full h-full overflow-hidden">
        <nav className="flex justify-center w-full">
            <div className="text-white text-3xl font-light pt-4">
                <p>User manual</p>
            </div>
        </nav>
        <div className="flex flex-col justify-between items-center h-full w-full">
          <div className="flex flex-col items-center justify-start font-extrabold text-white/80 gap-12 pt-12">
            <p className='text-4xl text-center tracking-wider'>The SU-35 Super Flanker</p>
            <p className='text-9xl text-center vertical-stretch'>MASTERING SKY</p>
          </div>
          <div className="flex flex-col justify-end items-center text-white text-lg">
            <p>Experience unmatched Thrust, manuverability and state of-strat avionics</p>
            <p>Future of aerial supority</p>
            <img src="down-arrow.png" className="w-auto h-12" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

