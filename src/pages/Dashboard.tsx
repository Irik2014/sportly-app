import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, ChevronRight, Activity, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface Registration {
    id: string;
    created_at: string;
    status: string;
    event: {
        title: string;
        date: string;
        time: string;
        location: string;
    };
}

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/auth');
            return;
        }

        async function fetchDashboardData() {
            // Fetch profile
            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            setProfile(profileData);

            // Fetch registrations with event details
            const { data: regData, error } = await supabase
                .from('registrations')
                .select(`
          id,
          created_at,
          status,
          event:event_id (
            title,
            date,
            time,
            location
          )
        `)
                .eq('user_id', user.id);

            if (error) {
                console.error('Error fetching registrations:', error);
            } else {
                setRegistrations(regData as any || []);
            }
            setLoading(false);
        }

        fetchDashboardData();
    }, [user, navigate]);

    const handleSignOut = async () => {
        await signOut();
        navigate('/auth');
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8rem' }}>
                <Loader2 className="animate-spin" size={48} color="var(--primary)" />
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800 }}>
                            {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{profile?.full_name || 'Sports Enthusiast'}</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Pro Member</p>

                        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <button className="glass-panel" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'rgba(59, 130, 246, 0.1)', color: 'white', textAlign: 'left', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Activity size={18} className="text-primary" /> Overview
                            </button>
                            <button style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'none', color: 'var(--text-secondary)', textAlign: 'left', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <User size={18} /> Profile
                            </button>
                            <button style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'none', color: 'var(--text-secondary)', textAlign: 'left', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Settings size={18} /> Settings
                            </button>
                            <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '1rem 0' }} />
                            <button
                                onClick={handleSignOut}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'none', color: '#ef4444', textAlign: 'left', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
                            >
                                <LogOut size={18} /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>Dashboard</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>Manage your activities, track progress and view upcoming games.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>Active Bookings</p>
                            <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>{registrations.length}</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>Completed Events</p>
                            <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>12</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>Achievements</p>
                            <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>5</p>
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Upcoming Activities</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {registrations.length === 0 ? (
                                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                                    <p style={{ color: 'var(--text-secondary)' }}>You haven't registered for any events yet.</p>
                                    <button onClick={() => navigate('/')} className="btn-primary" style={{ marginTop: '1rem' }}>Discover Events</button>
                                </div>
                            ) : (
                                registrations.map((reg) => (
                                    <motion.div
                                        key={reg.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="glass-panel"
                                        style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Activity size={24} className="text-primary" />
                                            </div>
                                            <div>
                                                <h4 style={{ fontWeight: 700, fontSize: '1.125rem' }}>{reg.event.title}</h4>
                                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                                    {reg.event.date} • {reg.event.location}
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronRight size={20} style={{ color: 'var(--text-secondary)' }} />
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
