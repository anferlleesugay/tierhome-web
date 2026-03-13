import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/login', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/properties');
        } catch (err) {
            setError('Invalid email or password.');
        }
        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.left}>
                <div style={styles.leftContent}>
                    <h1 style={styles.brand}>🏠 TierHome</h1>
                    <h2 style={styles.tagline}>Find your perfect home within your budget.</h2>
                    <p style={styles.description}>Budget-based rankings help you discover properties that truly fit your lifestyle.</p>
                    <div style={styles.features}>
                        <div style={styles.feature}>✅ Smart Budget Matching</div>
                        <div style={styles.feature}>✅ Tier-Based Rankings</div>
                        <div style={styles.feature}>✅ Verified Listings</div>
                    </div>
                </div>
            </div>

            <div style={styles.right}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Welcome back</h2>
                    <p style={styles.subtitle}>Login to your account</p>

                    {error && (
                        <div style={styles.errorBox}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email Address</label>
                            <input
                                style={styles.input}
                                type="email"
                                placeholder="you@email.com"
                                value={form.email}
                                onChange={e => setForm({...form, email: e.target.value})}
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password</label>
                            <input
                                style={styles.input}
                                type="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={e => setForm({...form, password: e.target.value})}
                                required
                            />
                        </div>
                        <button style={{...styles.button, opacity: loading ? 0.7 : 1}} type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login →'}
                        </button>
                    </form>

                    <p style={styles.registerLink}>
                        Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: { display:'flex', minHeight:'100vh', fontFamily:"'Segoe UI', sans-serif" },
    left: { flex:1, background:'linear-gradient(160deg, #2d6a4f, #52b788)', display:'flex', alignItems:'center', justifyContent:'center', padding:'3rem' },
    leftContent: { color:'white', maxWidth:'400px' },
    brand: { fontSize:'1.8rem', margin:'0 0 2rem 0', fontWeight:'700' },
    tagline: { fontSize:'2rem', fontWeight:'700', margin:'0 0 1rem 0', lineHeight:'1.3' },
    description: { opacity:0.85, lineHeight:'1.7', margin:'0 0 2rem 0' },
    features: { display:'flex', flexDirection:'column', gap:'0.75rem' },
    feature: { background:'rgba(255,255,255,0.15)', padding:'0.6rem 1rem', borderRadius:'8px', fontSize:'0.95rem' },
    right: { flex:1, display:'flex', alignItems:'center', justifyContent:'center', background:'#f8fafc', padding:'2rem' },
    card: { background:'white', padding:'2.5rem', borderRadius:'16px', width:'100%', maxWidth:'420px', boxShadow:'0 4px 30px rgba(0,0,0,0.08)' },
    title: { fontSize:'1.8rem', fontWeight:'700', color:'#1a1a2e', margin:'0 0 0.25rem 0' },
    subtitle: { color:'#888', margin:'0 0 1.5rem 0' },
    errorBox: { background:'#fff0f0', border:'1px solid #ffcccc', color:'#cc0000', padding:'0.75rem 1rem', borderRadius:'8px', marginBottom:'1rem', fontSize:'0.9rem' },
    inputGroup: { marginBottom:'1.25rem' },
    label: { display:'block', fontSize:'0.85rem', fontWeight:'600', color:'#444', marginBottom:'0.4rem' },
    input: { width:'100%', padding:'0.75rem 1rem', borderRadius:'8px', border:'1px solid #e2e8f0', fontSize:'1rem', boxSizing:'border-box', outline:'none', background:'#f8fafc' },
    button: { width:'100%', padding:'0.85rem', background:'#2d6a4f', color:'white', border:'none', borderRadius:'8px', fontSize:'1rem', fontWeight:'600', cursor:'pointer', marginTop:'0.5rem' },
    registerLink: { textAlign:'center', marginTop:'1.5rem', color:'#666', fontSize:'0.9rem' },
    link: { color:'#2d6a4f', fontWeight:'600', textDecoration:'none' },
};