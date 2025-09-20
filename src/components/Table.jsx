import { useState } from "react";

export default function Table() {

  const [activeFeature, setActiveFeature] = useState("vector")

  return (
    <div className="h-screen w-full sticky top-0 bg-white px-20 py-4 flex flex-col justify-between">
      <nav className="border-b-2 border-black flex items-center justify-end gap-4">
        <p className="text-black">SU-35</p>
        <p className="text-white bg-black px-4 py-2">Flanker</p>
      </nav>
      <div className="h-full w-full flex justify-between flex-col py-4">
        <div className="flex justify-between items-center w-full hover:bg-black/10 p-1">
          <p className="text-2xl">1. Design</p>
          <img src="/jetMesh.png" className="w-auto h-32" alt="" />
        </div>
        <div className="flex justify-between items-center w-full hover:bg-black/10 p-1">
          <p className="text-2xl">2. Size</p>
          <img src="/jetMesh2.png" className="w-auto h-32" alt="" />
        </div>
        <div className="flex justify-between items-center w-full hover:bg-black/10 p-1">
          <p className="text-2xl">2. Cockpit</p>
          <img src="/cockpit2.png" className="w-auto h-32" alt="" />
        </div>
        <div className="flex justify-between items-center w-full hover:bg-black/10 p-1">
          <p className="text-2xl">2. Engine</p>
          <img src="/Engine.png" className="w-auto h-32" alt="" />
        </div>
      </div>
      <footer className="border-t-2 border-black flex items-center justify-end gap-4">
        <p className="text-black">Table</p>
        <p className="text-white bg-black px-4 py-2">0</p>
      </footer>
    </div>
  );
}