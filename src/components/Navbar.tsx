import { Trophy, Calendar, User, Search, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user } = useAuth();

    return (
        <nav className="glass-panel" style={{ margin: '1rem', position: 'sticky', top: '1rem', zIndex: 50, padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
                <Trophy size={24} className="text-primary" />
                <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.025em' }}>Sportly</span>
            </Link>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}><Search size={20} /></Link>
                {user && (
                    <Link to="/create-event" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                        <Plus size={20} />
                    </Link>
                )}
                <Link to="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}><Calendar size={20} /></Link>
                <Link to={user ? "/dashboard" : "/auth"} style={{ color: user ? 'var(--primary)' : 'var(--text-secondary)', textDecoration: 'none' }}>
                    <User size={20} />
                </Link>
            </div>
        </nav>
    );
}
