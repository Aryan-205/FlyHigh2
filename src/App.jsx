import gsap,{Power1} from 'gsap'
import { useEffect, useRef } from 'react';
import TopDownScene from './components/TopDownScene';
import LandingPage from './components/LandingPage';
import SplitText from "gsap/SplitText"; // adjust to actual plugin location
gsap.registerPlugin(SplitText);

export default function App() {

    const wrapperRef = useRef(null)

    useEffect(()=>{
        window.scrollTo(0,0)
        const tl = gsap.timeline()

        let split = SplitText.create("#flyHigh", { type: "words, chars" });


        tl.to("#textBox1", {
        opacity: 0,              
        delay: 1,
        duration: 1.5,
        ease: Power1.out,
        onComplete: () => {
            gsap.set("#textBox1", { display: "none" }),
            gsap.set("#textBox2", { opacity: 1, scale:1.5 })
        }
        })
        .to(split.chars, {
            y: -250,
            opacity: 1,
            stagger: {
                from:"center",
                each:0.08
            },
            ease: "power3.out",
            delay:1.2,
            duration: 1.8
        })
        .to("#TextScene > div", {
            y: -window.innerHeight,
            stagger:{
                each:0.08,
                from:'center'
            },
            duration: 1,
            ease: Power1.out
        },">-=1")
    },[])

    return (
        <div className="w-full relative">
            <div className='h-[200vh] w-full relative'>
                <div className='h-screen w-full flex-col justify-center items-center flex z-[999] fixed top-0'>
                    <div id='textBox1' className='flex-col flex-center z-10'>
                        <p className="text-white text-7xl font-bold">ARYAN BOLA</p>
                        <p className="text-white text-3xl font-regular">Presents</p>
                    </div>
                    <div id='textBox2' className='opacity-0 flex-col flex-center z-10'>
                        <p id='flyHigh' className="text-white text-9xl font-bold">FLY HIGH</p>
                    </div>
                    <div id='TextScene' className='h-screen w-full absolute inset-0 z-0 flex-center'>
                        <div className='h-full w-full bg-black'/>
                        <div className='h-full w-full bg-black'/>
                        <div className='h-full w-full bg-black'/>
                        <div className='h-full w-full bg-black'/>
                        <div className='h-full w-full bg-black'/>
                    </div>
                </div>
                <LandingPage/>
            </div>
        </div>
    );
};
