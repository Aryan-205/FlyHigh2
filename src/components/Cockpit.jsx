import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Cockpit() {
  const [isAnimated, setIsAnimated] = useState(false);

  const startAnimation = () => {
    setIsAnimated(true);
  };

  return (
    <div className="h-screen w-full sticky top-0 bg-white px-20 py-4 flex flex-col justify-between overflow-hidden">
      {/* The button to trigger the animations */}
      <div className="absolute top-28 right-20 z-10">
        {!isAnimated && (
          <button
            onClick={startAnimation}
            className="p-4 bg-black text-white hover:bg-white hover:text-black hover:border-black border-2"
          >
            Start Animation
          </button>
        )}
      </div>

      <motion.nav 
        className="border-b-2 border-black flex items-center justify-end gap-4"
        animate={{ y: isAnimated ? -200 : 0 }}
        transition={{ duration:1 }}
      >
        <p className="text-black">SU-35</p>
        <p className="text-white bg-black px-4 py-2">Flanker</p>
      </motion.nav>
      
      <motion.div
        transition={{ duration:1 }}
        animate={{ y: isAnimated ? -500 : 0 }}
        className='flex justify-between'
      >
        <h1 className="saira-stencil-one-regular font-bold text-4xl">
          Cockpit
        </h1>
      </motion.div>

      <div className="flex justify-between overflow-hidden">
        <motion.div
          className="flex flex-col"
          animate={{ x: isAnimated ? -700 : 0 }}
          transition={{ duration:1 }}
        >
          {/* ... (List of P elements) */}
          <p>1. AOA indicator and Accelerometer</p>
          <p>2. Airspeed and Mach indicator</p>
          <p>3. Weapons control panel</p>
          <p>4. Attitude Direction Indicator (ADI)</p>
          <p>5. Horizontal situation indicator (HSI)</p>
          <p>6. Vertical Velocity Indicator (VVI)</p>
          <p>7. Tachometer</p>
          <p>8. Interstage turbine temperature indicators</p>
          <p>9. Fuel quantity indicator</p>
          <p>10. Head Down Display (HDD)</p>
          <p>11. Landing gear control valve</p>
          <p>12. Mechanical devices indicator</p>
          <p>13. Clock</p>
          <p>14. Radio altimeter</p>
          <p>15. Pressure altimeter</p>
          <p>16. Trimming lights neutral position indicator in pitch, roll and yaw channels</p>
          <p>17. Warning lights</p>
          <p>18. "Ecran" integrated information system panel</p>
          <p>19. SPO-15 "Beryoza" radar warning system</p>
        </motion.div>

        <motion.div
          className="h-full w-[40%] flex flex-col gap-4 items-center"
          animate={{ x: isAnimated ? 700 : 0 }}
          transition={{ duration:1 }}
        >
          <img src="/cockpit.png" className="w-full h-full object-fill" alt="" />
          <p className="text-blue-500 font-medium">Figure 4. Cockpit</p>
        </motion.div>
      </div>

      <motion.footer
        className="border-t-2 border-black flex items-center justify-end gap-4"
        animate={{ y: isAnimated ? 200 : 0 }}
        transition={{ duration:1 }}
      >
        <p className="text-black">Cockpit</p>
        <p className="text-white bg-black px-4 py-2">3</p>
      </motion.footer>

      <motion.div
        className='w-screen h-screen inset-0 absolute'
        initial={{ opacity: 0 }}
        animate={{ opacity: isAnimated ? 1 : 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <video src="/cloudVideo21.mp4" className='w-full h-full' autoPlay muted loop/>
      </motion.div>
    </div>
  );
}