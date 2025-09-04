import gsap,{Power1} from 'gsap'
import { useEffect, useRef } from 'react';
import TopDownScene from './components/TopDownScene';

export default function App() {

    const wrapperRef = useRef(null)

    // useEffect(()=>{
    //     const tl = gsap.timeline()

    //     tl.to("#textBox1", {
    //     opacity: 0,              
    //     delay: 0.5,
    //     duration: 1.5,
    //     ease: Power1.out,
    //     onComplete: () => {
    //         gsap.set("#textBox1", { display: "none" }) 
    //     }
    //     })
    //     .to("#textBox2", {
    //     opacity: 1, 
    //     duration: 1.5,
    //     ease: Power1.out
    //     })
    //     .to("#TextScene", {
    //     opacity: 0,
    //     duration: 1.5,
    //     ease: Power1.out,
    //     onComplete: ()=>{
    //         gsap.set("#TextScene",{ display: none })
    //     }
    //     }, "+=2")
    // },[])

    return (
        <div className="w-full relative">
            <div className='h-[200vh] w-full relative border border-blue-500'>
                {/* <div id='TextScene' className='h-screen w-full bg-black flex-col flex-center z-[999] absolute top-0'>
                    <div id='textBox1' className='flex-col flex-center'>
                        <p className="text-white text-7xl font-bold">ARYAN BOLA</p>
                        <p className="text-white text-3xl font-regular">Presents</p>
                    </div>
                    <div id='textBox2' className='opacity-0 flex-col flex-center'>
                        <p className="text-white text-9xl font-bold">FLY HIGH</p>
                    </div>
                </div> */}
                <TopDownScene wrapperRef={wrapperRef} />
            </div>
        </div>
    );
};