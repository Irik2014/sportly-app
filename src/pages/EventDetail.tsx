import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MapPin, Clock, Users, ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface Event {
    id: string;
    title: string;
    type: string;
    date: string;
    time: string;
    location: string;
    price: number;
    image: string;
    description: string;
    ages: string;
}

export default function EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);

    useEffect(() => {
        async function fetchEvent() {
            if (!id) return;
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching event:', error);
            } else {
                setEvent(data);
            }
            setLoading(false);
        }

        fetchEvent();
    }, [id]);

    const handleBooking = async () => {
        if (!user) {
            navigate('/auth');
            return;
        }

        setBooking(true);
        try {
            const { error } = await supabase
                .from('registrations')
                .insert({
                    user_id: user.id,
                    event_id: id,
                    status: 'confirmed'
                });

            if (error) throw error;
            navigate('/dashboard');
        } catch (err: any) {
            alert('Error booking event: ' + err.message);
        } finally {
            setBooking(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8rem' }}>
                <Loader2 className="animate-spin" size={48} color="var(--primary)" />
            </div>
        );
    }

    if (!event) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Event not found</div>;

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <button
                onClick={() => navigate(-1)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '2rem' }}
            >
                <ArrowLeft size={20} /> Back
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2.5rem' }}>
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel"
                        style={{ overflow: 'hidden', marginBottom: '2rem' }}
                    >
                        <div style={{ height: '350px', background: `url(${event.image}) center/cover` }} />
                        <div style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', background: 'rgba(59, 130, 246, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                    {event.type}
                                </span>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                    Verified
                                </span>
                            </div>

                            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>{event.title}</h1>

                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                                {event.description}
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div className="glass-panel" style={{ padding: '0.75rem', borderRadius: '12px' }}>
                                        <MapPin size={24} className="text-primary" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Location</div>
                                        <div style={{ fontWeight: 600 }}>{event.location}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div className="glass-panel" style={{ padding: '0.75rem', borderRadius: '12px' }}>
                                        <Clock size={24} className="text-primary" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Date & Time</div>
                                        <div style={{ fontWeight: 600 }}>{event.date}, {event.time}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div className="glass-panel" style={{ padding: '0.75rem', borderRadius: '12px' }}>
                                        <Users size={24} className="text-primary" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Eligibility</div>
                                        <div style={{ fontWeight: 600 }}>{event.ages}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div className="glass-panel" style={{ padding: '0.75rem', borderRadius: '12px' }}>
                                        <ShieldCheck size={24} className="text-primary" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Host</div>
                                        <div style={{ fontWeight: 600 }}>Sportly Verified</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <aside>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-panel"
                        style={{ padding: '2rem', position: 'sticky', top: '6rem' }}
                    >
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Full Price</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800 }}>${event.price} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/ player</span></div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Registration Fee</span>
                                <span>${event.price}.00</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Processing Fee</span>
                                <span>$0.00</span>
                            </div>
                            <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '1rem 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.125rem' }}>
                                <span>Total</span>
                                <span className="text-primary">${event.price}.00</span>
                            </div>
                        </div>

                        <button
                            disabled={booking}
                            onClick={handleBooking}
                            className="btn-primary"
                            style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', opacity: booking ? 0.7 : 1 }}
                        >
                            {booking ? 'Booking...' : (user ? 'Confirm & Book' : 'Sign in to Book')}
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                            Secure checkout powered by Stripe
                        </p>
                    </motion.div>
                </aside>
            </div>
        </div>
    );
}
