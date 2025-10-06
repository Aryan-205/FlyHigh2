// import { Canvas } from '@react-three/fiber';
// import { Suspense, useEffect } from 'react';
// import {FlankerModel1} from './FlankerModel';
// import gsap from 'gsap'
// import ScrollTrigger from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger)

// export default function FlyingScene(){

//   useEffect(()=>{

//     const tl = gsap.timeline({scrollTrigger:{
//       trigger:"#section",
//       start:"top bottom",
//       end:"bottom bottom",
//       scrub:true
//     }})

//     gsap.set("#canvas",{
//       y:200,
//       rotateX:0.4
//     })

//     tl.to("#canvas",{
//       y:0,
//       rotateX:0
//     })

//   },[])
//   return (
//     <>
//       <div id='section' className="h-screen w-full relative">
//         <div className='sticky top-0 w-full h-screen'>
//           <Canvas
//               id='canvas'
//               camera={{ position: [0, 20, -200], fov: 45}}
//             >
//               <ambientLight color={"#c7ceff"} intensity={1} /> 
//               <directionalLight 
//                 position={[-10, 10, 0]} 
//                 intensity={1} 
//               />
//               <directionalLight 
//                 position={[10, 10, 0]} 
//                 intensity={1} 
//               />
//               <Suspense fallback={null}>
//                 <FlankerModel1 
//                     position={[30, 0, 0]} 
//                     rotation={[0, Math.PI, 0]}
//                     scale={1} 
//                 />  
//               </Suspense>
//           </Canvas>
//         </div>
//       </div>
//     </>
//   )
// }

import { Canvas, useThree } from '@react-three/fiber'; // Need useThree
import { Suspense, useEffect, useRef } from 'react'; // Need useRef
import { FlankerModel2 } from './FlankerModel';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ------------------------------------------------------------------
// NEW: A component to hold the camera and connect it to GSAP
// ------------------------------------------------------------------
function CameraAnimator() {
  // 1. Get the actual camera instance from R3F state
  const camera = useThree((state) => state.camera);
  
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true
      }
    });

    // 2. Set the starting position (Must match the Canvas camera prop!)
    // We are animating the actual 3D camera object here.
    gsap.set(camera.position, { 
        y: 20, 
        z: -200, 
        x: 0 // Ensure X matches the start position
    });
    
    // 3. Animate the camera's 3D position to the end state
    tl.to(camera.position, {
        y: 50, 
        z: -200,
        duration: 1 
    });
    
    // Optional: Animate the model's position as well
    // If you had a ref on the model, you could animate it too.

  }, [camera]);

  return null; // This component doesn't render anything, just runs effects
}
// ------------------------------------------------------------------


export default function FlyingScene(){
  return (
    <>
      <div id='section' className="h-screen w-full relative">
        <div className='sticky top-0 w-full h-screen'>
          <Canvas
              // Update the camera prop to be the STARTING point for the GSAP animation
              camera={{ position: [0, 20, -200], fov: 45}}
              // Removed id='canvas' as we don't need to target the DOM element anymore
            >
              {/* Add the animator component inside the Canvas */}
              <CameraAnimator /> 
              
              <ambientLight color={"#c7ceff"} intensity={1} /> 
              <directionalLight position={[-10, 10, 0]} intensity={1} />
              <directionalLight position={[10, 10, 0]} intensity={1} />
              
              <Suspense fallback={null}>
                <FlankerModel2 
                    position={[30, 0, 0]} 
                    rotation={[0, Math.PI, 0]}
                    scale={1} 
                />  
              </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  );
}