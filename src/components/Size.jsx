export default function Size(){

  return (
    <div className="h-screen w-full sticky top-0 bg-white px-20 py-4 flex flex-col justify-between">
      <div className="absolute top-28 right-20 z-10">
          <button
            //onClick={startAnimation}
            className="p-4 bg-black text-white hover:bg-white hover:text-black hover:border-black border-2"
          >
            Mesh Structure
          </button>
        {/* {!isAnimated && (
        )} */}
      </div>
      <nav className="border-b-2 border-black flex items-center justify-end gap-4">
        <p className="text-black">SU-35</p>
        <p className="text-white bg-black px-4 py-2">Flanker</p>
      </nav>
      <div className="flex justify-start items-center flex-row-reverse">
        <div className="flex-center flex-col">
          <img src="/jetMesh2.png" className=" w-[350rem] h-full" alt="" />
          <p className="text-blue-500 font-medium">Figure 3: Su-33 drawings</p>
        </div>
        <div className="flex flex-col justify-between items-start h-full">
          <h1 className="saira-stencil-one-regular font-bold text-4xl">GENERAL DIMENTIONS</h1>
          <p>The fairings of the chassis smoothly transition into the tail beams, serving as platforms for the installation of: all-moving stabilizer panels with a straight axis of rotation, two-kilo tail fins spaced apart from the outer edges of the tail stinger, and underside fins. The panels of the all-moving front canards, installed on the leading edge root extension of the wing, serve to increase the load-bearing properties of the airframe and improve the flight characteristics of the aircraft at large angles of attack. To reduce the size of the aircraft during storage in the ship hangar and parking at the technical positions of the upper deck, the wing and horizontal tail units can be folded. The aircraft is equipped with a retractable three-point undercarriage with telescopic struts on the main and front </p>
        </div>
      </div>
      <footer className="border-t-2 border-black flex items-center justify-end gap-4">
        <p className="text-black">Size</p>
        <p className="text-white bg-black px-4 py-2">2</p>
      </footer>
    </div>
  )
}