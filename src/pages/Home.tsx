import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MapPin, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Event {
    id: string;
    title: string;
    type: string;
    date: string;
    time: string;
    location: string;
    price: number;
    image: string;
}

export default function Home() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching events:', error);
            } else {
                setEvents(data || []);
            }
            setLoading(false);
        }

        fetchEvents();
    }, []);

    return (
        <div className="container" style={{ paddingBottom: '5rem' }}>
            <header style={{ padding: '3rem 0', textAlign: 'center' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}
                >
                    Elevate Your <span style={{ color: 'var(--primary)' }}>Game</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem' }}
                >
                    Discover elite sports activities, training sessions, and tournaments in your area.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <a href="#events" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        Explore Events <ArrowRight size={20} />
                    </a>
                </motion.div>
            </header>

            <section id="events" style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Upcoming Events</h2>
                    <Link to="/events" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}>View All</Link>
                </div>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                        <Loader2 className="animate-spin" size={32} color="var(--primary)" />
                    </div>
                ) : events.length === 0 ? (
                    <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>No events found. Check back later!</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {events.map((event, idx) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-panel"
                                style={{ overflow: 'hidden' }}
                            >
                                <div style={{ height: '180px', background: `url(${event.image}) center/cover` }} />
                                <div style={{ padding: '1.25rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', background: 'rgba(59, 130, 246, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                            {event.type}
                                        </span>
                                        <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>${event.price}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>{event.title}</h3>

                                    <div style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                            <MapPin size={14} /> {event.location}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.4rem' }}>
                                            <Clock size={14} /> {event.date} • {event.time}
                                        </div>
                                    </div>

                                    <Link to={`/event/${event.id}`} className="btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                                        Register Now
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
