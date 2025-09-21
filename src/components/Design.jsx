export default function Design(){

  return (
    <div className="h-screen w-full sticky top-0 bg-white px-20 py-4 flex flex-col justify-between">
      <nav className="border-b-2 border-black flex items-center justify-end gap-4">
        <p className="text-black">SU-35</p>
        <p className="text-white bg-black px-4 py-2">Flanker</p>
      </nav>
        <h1 className="font-bold text-4xl">GENERAL DESIGN</h1>
      <div>
        <p className="font-semibold text-2xl">Design</p>
        <p className="font-medium text-lg w-[36rem]">The Su-33 is built according to a normal aerodynamic scheme with additional front pylons and has an integrated configuration.</p>
        <div className="flex justify-between items-center">
          <div className="flex-center flex-col">
            <img src="/jetMesh.png" className=" w-[300rem]" alt="" />
            <p className="text-blue-500 font-medium">Figure 2: Su-33 cutaway</p>
          </div>
          <p className="text">
            The central trapezoidal wing with a small elongation, equipped with leading-edge extensions,
            smoothly joins with the fuselage, forming a single load-bearing body. Two AL-31F 3rd series twocircuit turbojet engines with afterburners are placed in separate nacelles placed under the aircraft's chassis separately from each other such that it eliminates their aerodynamic interference and allows for the placement of the aircraft's weapons, as well as the buddy refueling system, in the space between. The variable supersonic air intakes are located under the center wing and are equipped with a protective device that prevents foreign object debris from entering the engines during the aircraft's take-off and landing modes.
          </p>
        </div>
      </div>
      <footer className="border-t-2 border-black flex items-center justify-end gap-4">
        <p className="text-black">Design</p>
        <p className="text-white bg-black px-4 py-2">1</p>
      </footer>
    </div>
  )
}
