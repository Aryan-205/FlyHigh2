import FlyingScene from './components/FlyingScene';
import LandingPage from './components/LandingPage';
import Table from './components/Table';

export default function App() {    

    return (
        <div className="w-full relative bg-white">
          <div>
            {/* <Intro/> */}
            <LandingPage/>
            <FlyingScene/>
            <Table/>
          </div>
        </div>
    );
};

