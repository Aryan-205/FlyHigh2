import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function LandingPage(){

  useEffect(() => {

    gsap.to("#plane",{
      y:-20,
      duration:1,
      ease:"power1.out",
      delay:5.2
    })
    gsap.to("#cloud",{
      y:-20,
      duration:1,
      ease:"power1.out",
      delay:5.2
    })
    gsap.to(".vertical-stretch",{
      y:20,
      duration:1,
      ease:"power1.out",
      delay:5.2
    })

      // --- Section 1 Animation ---
      const tl1 = gsap.timeline({
          scrollTrigger: {
              trigger: "#section1",
              start: "top top",
              end: "300px",
              scrub: true,
              pinSpacing: false,
          },
      });

      tl1.to("#cloud", {
          duration: 1,
          y: -200,
      })
      tl1.to(".vertical-stretch",{
          y:60,
          duration:1
      },"<");

      return () => {
        tl1.kill();
      };
    }, []);
    
  return (
    <div id="section1" className="h-screen relative flex justify-center overflow-hidden">
      <video src="/cloudVideo31.mp4" className='absolute inset-0 -z-10 scale-x-[-1]' autoPlay muted loop/>
      <p className='text-4xl font-extrabold text-white text-center top-20 tracking-wider absolute z-0'>The SU-35 Super Flanker</p>
      <p className='text-9xl font-extrabold text-white text-center top-40 absolute z-0 vertical-stretch'>MASTERING SKY</p>
      <img id='plane' src="/landingPageJet.png" className='h-full w-full z-10' alt="" />
      <img id='cloud' src="/cloudimg1.png" className='z-20 absolute -bottom-[30rem] w-full' alt="" />
  </div>
  )
}