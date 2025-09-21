import { useState } from "react";
import {animate, motion} from 'motion/react'
export default function Table() {

  const containerVariants = {
    initial: {},
    hover: {},
  };

  const childVariants = {
    initial: {
      y: "0%",
    },
    hover: {
      y: "-100%",
      transition: {
        type: "tween",
        duration: 0.4,  
        ease: "easeInOut"
      }
    },
  };

  const [activeFeature, setActiveFeature] = useState("default")

  return (
    <div className="h-screen w-full sticky top-0 bg-white px-20 py-4 flex flex-col">
      <nav className="border-b-2 border-black flex items-center justify-end gap-4">
        <p className="text-black">SU-35</p>
        <p className="text-white bg-black px-4 py-2">Flanker</p>
      </nav>
      <div className="h-full w-full flex justify items-center">
        <motion.div
          whileHover="hover"
          variants={containerVariants}
          className={`w-[25%] h-[100%] border-r overflow-hidden`}
          onClick={()=>setActiveFeature("stealth")}
        >
          <motion.div
            variants={childVariants}
            className="h-[100%] w-full bg-white flex flex-col justify-between items-center px-8 py-12 relative"
          >
            <p className="text-4xl font-bold">01</p>
            <img src="/whitestealth.png" className="w-80 top-32 -right-20 h-auto absolute" alt="" />
            <p className="text-4xl font-semibold">Stealth</p>
          </motion.div>
          <motion.div
            variants={childVariants}
            className={`${activeFeature === "stealth" ? "h-screen w-screen" : "h-[100%] w-full"} bg-black flex flex-col justify-between items-center px-8 py-12 text-white relative`}
          >
            <p className="text-4xl font-bold">01</p>
            <div className="flex flex-col gap-4">
              <img src="/blackstealth.png" className="w-80 top-32 -right-20 h-auto absolute" alt="" />
              <p className="text-2xl font-bold">Invisible to the Enemy</p>
              <p className="text-xs font-semibold">
                The jet's design uses radar-absorbent materials and unique angles to minimize its radar cross-section. Internal weapons bays and concealed engine exhausts further reduce its signature, allowing it to remain undetected while operating in enemy territory.
              </p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          whileHover="hover"
          variants={containerVariants}
          className={`w-[25%] h-[100%] border-r overflow-hidden`}
        >
          <motion.div
            variants={childVariants}
            className="h-[100%] w-full bg-white flex flex-col justify-between items-center px-8 py-12 relative"
          >
            <p className="text-4xl font-bold">02</p>
            <img src="/whitemissiles.png" className="w-80 top-32 -right-20 h-auto absolute" alt="" />
            <p className="text-4xl font-semibold">Missiles</p>
          </motion.div>
          <motion.div
            variants={childVariants}
            className="h-[100%] w-full bg-black flex flex-col justify-between items-center px-8 py-12 text-white relative"
          >
            <p className="text-4xl font-bold">02</p>
            <div className="flex flex-col gap-4">
              <img src="/blackmissiles.png" className="w-80 top-32 -right-20 h-auto absolute" alt="" />
              <p className="text-2xl font-bold">Lethal Precision</p>
              <p className="text-xs font-semibold">
                The aircraft carries a variety of missiles within its internal weapons bays. This concealed storage maintains the jet's stealth profile while providing it with lethal precision. Advanced targeting systems allow for accurate launches from a safe standoff distance.
              </p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          whileHover="hover"
          variants={containerVariants}
          className={`w-[25%] h-[100%] border-r overflow-hidden`}
        >
          <motion.div
            variants={childVariants}
            className="h-[100%] w-full bg-white flex flex-col justify-between items-center px-8 py-12 relative"
          >
            <p className="text-4xl font-bold">03</p>
            <img src="/whitesuper.png" className="w-80 top-32 -right-20 h-auto absolute" alt="" />
            <p className="text-4xl font-semibold">Supercruise</p>
          </motion.div>
          <motion.div
            variants={childVariants}
            className="h-[100%] w-full bg-black flex flex-col justify-between items-center px-8 py-12 text-white relative"
          >
            <p className="text-4xl font-bold">03</p>
            <div className="flex flex-col gap-4">
              <img src="/blacksuper.png" className="w-80 top-28 -right-20 h-auto absolute" alt="" />
              <p className="text-2xl font-bold">Sustained Supersonic Flight</p>
              <p className="text-xs font-semibold">
                Supercruise is the ability to fly at supersonic speeds without using afterburners. The jet's high-efficiency engines enable this, extending its range and allowing it to cover vast distances quickly.
              </p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          whileHover="hover"
          variants={containerVariants}
          className={`w-[25%] h-[100%] overflow-hidden`}
        >
          <motion.div
            variants={childVariants}
            className="h-[100%] w-full bg-white flex flex-col justify-between items-center px-8 py-12 relative"
          >
            <p className="text-4xl font-bold">04</p>
            <img src="/whiteradar.png" className="w-80 top-32 -right-20 h-auto absolute" alt="" />
            <p className="text-4xl font-semibold">Electronics</p>
          </motion.div>
          <motion.div
            variants={childVariants}
            className="h-[100%] w-full bg-black flex flex-col justify-between items-center px-8 py-12 text-white relative"
          >
            <p className="text-4xl font-bold">04</p>
            <div className="flex flex-col gap-4">
              <img src="/blackradar.png" className="w-80 top-32 -right-20 h-auto absolute" alt="" />
              <p className="text-2xl font-bold">The Eyes and Ears</p>
              <p className="text-xs font-semibold">
                Equipped with an advanced suite of electronics, the jet features an active electronically scanned array (AESA) radar for tracking multiple targets. An integrated electronic warfare system can jam enemy signals, giving the jet a significant advantage in combat.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <footer className="border-t-2 border-black flex items-center justify-end gap-4">
        <p className="text-black">Table</p>
        <p className="text-white bg-black px-4 py-2">0</p>
      </footer>
    </div>
  );
}