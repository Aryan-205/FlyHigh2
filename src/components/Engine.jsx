export default function Engine(){

  return (
    <div className="h-screen w-full sticky top-0 bg-white px-20 py-4 flex flex-col justify-between">
      <nav className="border-b-2 border-black flex items-center justify-end gap-4">
        <p className="text-black">SU-35</p>
        <p className="text-white bg-black px-4 py-2">Flanker</p>
      </nav>
      <div className="h-full w-full flex flex-col justify-between items-end">
        <div className="w-[50rem] flex flex-col justify-between h-full">
          <p className="font-bold text-4xl">Engine</p>
          <div>
            <p className="text-lg font-semibold">Engine Specifications</p>
            <img src="/Engine.png" className="w-[40rem]" alt="" />
            <p className="text-blue-500 font-medium">Figure 5. Engine</p>
          </div>
          <p className="w-[50rem]">The engine produces a booster thrust of 12,500 kgf in the full afterburner mode and 7670 kgf at
  maximum rating. One of the main differences between the AL-31F series 3 engine and the AL-31F
  engines (series 1 and 2) used on other SU-27 aircraft is the introduction of an additional special
  emergency mode, in which engine thrust rises to 12,800 kgf . This mode can be used for a short time
  to ensure successful take-off of the naval fighter with full combat load from the flight deck of the
  carrier, or for emergency missed approaches during landing. The increase in thrust during emergency
  mode is achieved by increasing the temperature of the gases in front of the turbine.</p>
        </div>
      </div>
      <footer className="border-t-2 border-black flex items-center justify-end gap-4">
        <p className="text-black">Engine</p>
        <p className="text-white bg-black px-4 py-2">4</p>
      </footer>
    </div>
  )
}