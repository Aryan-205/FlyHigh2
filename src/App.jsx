import TopDownScene from './components/TopDownScene';
import LandingPage from './components/LandingPage';
import Intro from './components/Intro';
import FrontScene from './components/FrontScene';

export default function App() {    

    return (
        <div className="w-full">
            <div className='w-full relative'>
                {/* <Intro/> */}
                {/* <LandingPage/> */}
                {/* <TopDownScene/> */}
                <FrontScene/>
            </div>
        </div>
    );
};
