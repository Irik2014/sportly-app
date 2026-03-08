import { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                const { data, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { full_name: fullName }
                    }
                });
                if (signUpError) throw signUpError;
                if (data.user) {
                    // Create profile in profiles table
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .upsert({ id: data.user.id, full_name: fullName });
                    if (profileError) console.error("Profile creation error:", profileError);
                }
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (signInError) throw signInError;
            }
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '4rem 1rem' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel"
                style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}
            >
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', textAlign: 'center' }}>
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>
                    {isSignUp ? 'Join the community and start playing' : 'Sign in to manage your registrations'}
                </p>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        {error}
                    </div>
                )}

                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleAuth}>
                    {isSignUp && (
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                placeholder="Full Name"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                            />
                        </div>
                    )}

                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-secondary)' }} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-secondary)' }} />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                        style={{ marginTop: '1rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')} <ArrowRight size={18} />
                    </button>
                </form>

                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        style={{ padding: 0, background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
                    >
                        {isSignUp ? 'Sign In' : 'Get Started'}
                    </button>
                </p>
            </motion.div>
        </div>
    );
}
