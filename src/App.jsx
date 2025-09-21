import FrontScene from './components/FrontScene';
import Table from './components/Table';

export default function App() {    

    return (
        <div className="w-full relative bg-white">
          {/* <div className='fixed top-0 h-screen w-full z-10'>
            <ThreeJs/>
          </div> */}
          <div>
            {/* <Intro/> */}
            <FrontScene/>
            <Table/>
            {/* <Design/>
            <Size/>
            <Cockpit/>
            <Engine/> */}
          </div>
        </div>
    );
};
// //no church in the wild

