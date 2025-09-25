import Layout from "./Layout.jsx";

import Onboarding from "./Onboarding";

import Profile from "./Profile";

import Home from "./Home";

import MyCourses from "./MyCourses";

import Auth from "./Auth";

import LandingPage from "./LandingPage";

import Course from "./Course";

import Explore from "./Explore";

import DemoCourse from "./DemoCourse";

import MyPinz from "./MyPinz";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Onboarding: Onboarding,
    
    Profile: Profile,
    
    Home: Home,
    
    MyCourses: MyCourses,
    
    Auth: Auth,
    
    LandingPage: LandingPage,
    
    Course: Course,
    
    Explore: Explore,
    
    DemoCourse: DemoCourse,
    
    MyPinz: MyPinz,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Onboarding />} />
                
                
                <Route path="/Onboarding" element={<Onboarding />} />
                
                <Route path="/Profile" element={<Profile />} />
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/MyCourses" element={<MyCourses />} />
                
                <Route path="/Auth" element={<Auth />} />
                
                <Route path="/LandingPage" element={<LandingPage />} />
                
                <Route path="/Course" element={<Course />} />
                
                <Route path="/Explore" element={<Explore />} />
                
                <Route path="/DemoCourse" element={<DemoCourse />} />
                
                <Route path="/MyPinz" element={<MyPinz />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}