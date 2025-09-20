import Intro from './components/Intro';
import FrontScene from './components/FrontScene';
import Features from './components/Features';
import CockpitScene from './components/Cockpit';
import { div } from 'three/src/nodes/TSL.js';

export default function App() {    

    return (
        <div className="w-full">
            <div className='w-full relative'>
                <Intro/>
                <FrontScene/>
                <Features/>
                <CockpitScene/>
            </div>
        </div>
    );
};
// //no church in the wild

