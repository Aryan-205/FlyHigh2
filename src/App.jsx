import Intro from './components/Intro';
import FrontScene from './components/FrontScene';
import Features from './components/Features';
import CockpitScene from './components/Cockpit';

export default function App() {    

    return (
        <div className="w-full">
            <div className='w-full relative'>
                <nav className="flex-center w-full">
                    <div className="text-white text-2xl font-light flex gap-20 pt-20 fixed z-[998]">
                        <p>Hanger</p>
                        <p>Ability</p>
                        <p>Cockpit</p>
                        <p>About</p>
                    </div>
                </nav>
                <Intro/>
                <FrontScene/>
                <Features/>
                {/* <CockpitScene/> */}
            </div>
        </div>
    );
};
//no church in the wild