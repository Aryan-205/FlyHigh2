export default function FrontScene(){

  return (
    <div className="h-screen w-full sticky top-0">
      <img src="/bgImg.png" className="absolute inset-0 -z-20 h-full w-full object-cover" alt="" />
      <div className="flex flex-col w-full h-full overflow-hidden">
        <nav className="flex justify-center w-full">
            <div className="text-white text-3xl font-light pt-4">
                <p>User manual</p>
            </div>
        </nav>
        <div className="flex flex-col justify-between items-center h-full w-full">
          <div className="flex flex-col items-center justify-start font-extrabold text-white/80 gap-12 pt-12">
            <p className='text-4xl text-center tracking-wider'>The SU-35 Super Flanker</p>
            <p className='text-9xl text-center vertical-stretch'>MASTERING SKY</p>
          </div>
          <div className="flex flex-col justify-end items-center text-white text-lg">
            <p>Experience unmatched Thrust, manuverability and state of-strat avionics</p>
            <p>Future of aerial supority</p>
            <img src="down-arrow.png" className="w-auto h-12" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

