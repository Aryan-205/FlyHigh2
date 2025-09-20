import { useState } from "react";

export default function Page4() {

  const [activeFeature, setActiveFeature] = useState("vector")

  return (
    <div className="h-screen w-full sticky top-0 bg-white px-20 py-4 flex flex-col justify-between">
      <nav className="border-b-2 border-black flex items-center justify-end gap-4">
        <p className="text-black">SU-35</p>
        <p className="text-white bg-black px-4 py-2">Flanker</p>
      </nav>
      <div className="h-full flex justify-start gap-12 items-center ">
        <div>
          <h1 className="font-bold text-4xl pl-4">
            Features
          </h1>
          <div>
            <p className="pl-4 pb-8">SU-25 Abilities</p>
            <div className="h-full flex flex-col justify-center items-start gap-4">
              <button 
                onClick={() => setActiveFeature("vector")} 
                className={`text-xl font-medium hover:underline px-4 ${
                  activeFeature === "vector" ? "text-red-500 font-bold" : ""
                }`}
              >
                Vector System
              </button>
              <button 
                onClick={() => setActiveFeature("stealth")} 
                className={`text-xl font-medium hover:underline px-4 ${
                  activeFeature === "stealth" ? "text-red-500 font-bold" : ""
                }`}
              >
                Stealth Technology
              </button>
              <button 
                onClick={() => setActiveFeature("missiles")} 
                className={`text-xl font-medium hover:underline px-4 ${
                  activeFeature === "missiles" ? "text-red-500 font-bold" : ""
                }`}
              >
                Air-to-Air Missiles
              </button>
              <button 
                onClick={() => setActiveFeature("supercruise")} 
                className={`text-xl font-medium hover:underline px-4 ${
                  activeFeature === "supercruise" ? "text-red-500 font-bold" : ""
                }`}
              >
                Supercruise Cability
              </button>
              <button 
                onClick={() => setActiveFeature("electronic")} 
                className={`text-xl font-medium hover:underline px-4 ${
                  activeFeature === "electronic" ? "text-red-500 font-bold" : ""
                }`}
              >
                Electronic Warfare
              </button>
            </div>
          </div>
        </div>
        <div>
          <p className="text-3xl font-semibold">Vector System</p>
          <p className="w-[20rem]">The AL-31F ser. 3 engine has a modular design and consists of a 4-stage low-pressure (fan)
compressor with variable inlet guide vanes, an intermediate housing with a central drive box, a 9-
stage high-pressure compressor, an external circuit, an annular combustion chamber, an air-to-air
heat exchanger in the turbine cooling </p>
          <img src="/Engine.png" className="w-80 pt-12" alt="" />
        </div>
      </div>
      <footer className="border-t-2 border-black flex items-center justify-end gap-4">
        <p className="text-black">FlyHigh</p>
        <p className="text-white bg-black px-4 py-2">4</p>
      </footer>
    </div>
  );
}