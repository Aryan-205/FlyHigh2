export default function Cockpit(){

  return (
    <div className="h-screen w-full sticky top-0 bg-white px-20 py-4 flex flex-col justify-between">
      <nav className="border-b-2 border-black flex items-center justify-end gap-4">
        <p className="text-black">SU-35</p>
        <p className="text-white bg-black px-4 py-2">Flanker</p>
      </nav>
        <h1 className="saira-stencil-one-regular font-bold text-4xl">Cockpit</h1>
        <div className="flex justify-between">
          <div className="flex flex-col">
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
          </div>
          <div className="h-full w-[40%] flex flex-col gap-4 items-center">
            <img src="/cockpit.png" className="w-full h-full object-fill" alt="" />
            <p className="text-blue-500 font-medium">Figure 4. Cockpit</p>
          </div>
        </div>
      <footer className="border-t-2 border-black flex items-center justify-end gap-4">
        <p className="text-black">Cockpit</p>
        <p className="text-white bg-black px-4 py-2">4</p>
      </footer>
    </div>
  )
}