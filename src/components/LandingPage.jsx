import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import {FlankerModel1} from './FlankerModel';

export default function LandingPage(){
  return(
    <div className="h-screen w-full relative">
      {/* img */}
      <img src="/bgImg2.png" alt="" className="w-full h-full object-cover absolute inset-0" />
      <div className="z-10 absolute inset-0 w-full h-full flex justify-center items-center">
        {/* content section */}
        <div className="flex flex-col justify-between items-center h-full w-full py-8 px-4">
          <div className="flex flex-col items-center justify-start font-extrabold text-white/80 gap-6 sm:gap-12 pt-12 text-center">
            <p className='text-3xl sm:text-4xl tracking-wider'>The SU-35 Super Flanker</p>
            <h1 className='text-6xl sm:text-9xl vertical-stretch leading-none'>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
                    MASTERING SKY
                </span>
            </h1>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col justify-end items-center text-white text-center text-sm sm:text-lg mb-8">
            <p>Experience unmatched thrust, maneuverability and state-of-the-art avionics.</p>
            <p className="mt-2">Future of aerial superiority</p>
            {/* Replaced ChevronDown with an inline SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-12 sm:h-12 mt-4 animate-bounce">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
      {/* 3d model */}
      <div className="z-20 absolute inset-0 w-full h-full flex justify-center items-center">
        <Canvas
          camera={{ position: [0, 20, -250], fov: 45}}
        >
          <ambientLight color={"#c7ceff"} intensity={1} /> 
          <directionalLight 
            position={[-10, 10, 0]} 
            intensity={1} 
          />
          <directionalLight 
            position={[10, 10, 0]} 
            intensity={1} 
          />
          <Suspense fallback={null}>
            <FlankerModel1 
                position={[0, 0, 0]} 
                rotation={[0, Math.PI/2, 0]}
                scale={1} 
            />  
          </Suspense>
        </Canvas>
        <div className='absolute w-80 h-20 bg-black/50 backdrop-blur-xl top-[30rem] left-90 rounded-full'/>
      </div>
    </div>
  )
}