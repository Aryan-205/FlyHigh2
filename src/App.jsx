import Intro from './components/Intro';
import FrontScene from './components/FrontScene';
import Page2 from './components/Page2';
import CockpitScene from './components/Cockpit';
import ThreeJs from './components/ThreeJs';
import Page3 from './components/Page3';
import Page4 from './components/Page4';

export default function App() {    

    return (
        <div className="w-full h-[300vh] relative bg-white">
          {/* <div className='fixed top-0 h-screen w-full z-10'>
            <ThreeJs/>
          </div> */}
          <div>
            {/* <Intro/> */}
            <FrontScene/>
            <Page2/>
            <Page3/>
            <Page4/>
            <CockpitScene/>
          </div>
        </div>
    );
};
// //no church in the wild

