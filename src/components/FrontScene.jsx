import { useEffect, useRef, useState } from "react";

export default function FrontScene(){
  const [activeNav, setActiveNav] = useState('Home');

  // Placeholder for any animations or state logic
  useEffect(() => {
    // This could be used for a smooth scrolling effect or other UI animations
  }, []);

  return (
    <div className="h-screen w-full relative bg-cover bg-center overflow-hidden">

      <img src="/bgImg2.png" alt="" className="w-full h-full object-cover absolute inset-0" />

      {/* Main Content & Navigation Container */}
      <div className="flex flex-col w-full h-full z-20">

        {/* Navigation */}
        <nav className="flex justify-center w-full py-4 px-8">
            <div className="text-white text-lg sm:text-2xl font-light pt-4 flex gap-8">
                {['Home', 'Fly By', 'Engine', 'Cockpit'].map(item => (
                    <button
                        key={item}
                        onClick={() => setActiveNav(item)}
                        className={`transition-colors duration-300 ${activeNav === item ? 'font-bold text-white' : 'text-gray-400 hover:text-white'} focus:outline-none`}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </nav>

        {/* Content Section */}
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
    </div>
  )
}
