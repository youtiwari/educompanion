import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Adjust the import path as necessary
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ClickableGrid from './pages/ClickableGrid';
import LearningPath from './pages/LearningPath';
// import ChapterDetails from '../Gemini 1.5 PDF';
import ChapterDetail from './pages/sample';
import LearningPath_test from './pages/LearningPath_test';
import Test_Generator from './pages/Test_Generator';
import Idiom_Generator from './pages/Idiom_Generator';
import EduBot from './pages/EduBot';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<ClickableGrid />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/mylearningpath" element={<LearningPath />} />
                    <Route path="/chapterdetails" element={<ChapterDetail />}     />
                    <Route path="/mytest" element={<LearningPath_test />}   />
                    <Route path="/mytest_bot" element={<Test_Generator />}   />
                    <Route path="/myidiom" element={<Idiom_Generator />}   />
                    <Route path="/mybot" element={<EduBot />}   />

                
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
