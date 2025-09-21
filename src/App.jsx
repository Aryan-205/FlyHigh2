import Intro from './components/Intro';
import FrontScene from './components/FrontScene';
import ThreeJs from './components/ThreeJs';
import Table from './components/Table';
import Design from './components/Design';
import Size from './components/Size';
import Cockpit from './components/Cockpit';
import Engine from './components/Engine';

export default function App() {    

    return (
        <div className="w-full h-[600vh] relative bg-white">
          <div className='fixed top-0 h-screen w-full z-10 pointer-events-none'>
            <ThreeJs/>
          </div>
          <div>
            <Intro/>
            <FrontScene/>
            <Table/>
            <Design/>
            <Size/>
            <Cockpit/>
            <Engine/>
          </div>
        </div>
    );
};
// //no church in the wild

