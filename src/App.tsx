import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import EventDetail from './pages/EventDetail';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen">
                    <Navbar />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/event/:id" element={<EventDetail />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
