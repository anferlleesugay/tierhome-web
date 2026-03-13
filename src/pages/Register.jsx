import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
    const [form, setForm] = useState({ name:'', email:'', password:'', password_confirmation:'', role:'tenant' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/register', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/properties');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        }
        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.left}>
                <div style={styles.leftContent}>
                    <h1 style={styles.brand}>🏠 TierHome</h1>
                    <h2 style={styles.tagline}>Join thousands finding their perfect home.</h2>
                    <p style={styles.description}>Whether you're a tenant looking for a place or a landlord listing your property — TierHome has you covered.</p>
                    <div style={styles.roles}>
                        <div style={styles.roleCard}>
                            <span style={styles.roleIcon}>👤</span>
                            <div>
                                <div style={styles.roleTitle}>Tenant</div>
                                <div style={styles.roleDesc}>Search and find ranked properties within your budget</div>
                            </div>
                        </div>
                        <div style={styles.roleCard}>
                            <span style={styles.roleIcon}>🏘️</span>
                            <div>
                                <div style={styles.roleTitle}>Landlord</div>
                                <div style={styles.roleDesc}>List and manage your rental properties easily</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={styles.right}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Create Account</h2>
                    <p style={styles.subtitle}>Start your journey with TierHome</p>

                    {error && (
                        <div style={styles.errorBox}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Full Name</label>
                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Juan Dela Cruz"
                                value={form.name}
                                onChange={e => setForm({...form, name: e.target.value})}
                                required
                            />
                        </div>
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
                        <div style={styles.row}>
                            <div style={{...styles.inputGroup, flex:1}}>
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
                            <div style={{...styles.inputGroup, flex:1}}>
                                <label style={styles.label}>Confirm Password</label>
                                <input
                                    style={styles.input}
                                    type="password"
                                    placeholder="••••••••"
                                    value={form.password_confirmation}
                                    onChange={e => setForm({...form, password_confirmation: e.target.value})}
                                    required
                                />
                            </div>
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>I am a...</label>
                            <div style={styles.roleSelector}>
                                <div
                                    style={{...styles.roleOption, ...(form.role === 'tenant' ? styles.roleSelected : {})}}
                                    onClick={() => setForm({...form, role: 'tenant'})}
                                >
                                    👤 Tenant
                                </div>
                                <div
                                    style={{...styles.roleOption, ...(form.role === 'landlord' ? styles.roleSelected : {})}}
                                    onClick={() => setForm({...form, role: 'landlord'})}
                                >
                                    🏘️ Landlord
                                </div>
                            </div>
                        </div>
                        <button style={{...styles.button, opacity: loading ? 0.7 : 1}} type="submit" disabled={loading}>
                            {loading ? 'Creating account...' : 'Create Account →'}
                        </button>
                    </form>

                    <p style={styles.loginLink}>
                        Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
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
    tagline: { fontSize:'1.8rem', fontWeight:'700', margin:'0 0 1rem 0', lineHeight:'1.3' },
    description: { opacity:0.85, lineHeight:'1.7', margin:'0 0 2rem 0' },
    roles: { display:'flex', flexDirection:'column', gap:'1rem' },
    roleCard: { display:'flex', alignItems:'center', gap:'1rem', background:'rgba(255,255,255,0.15)', padding:'1rem', borderRadius:'12px' },
    roleIcon: { fontSize:'2rem' },
    roleTitle: { fontWeight:'700', marginBottom:'0.2rem' },
    roleDesc: { fontSize:'0.85rem', opacity:0.85 },
    right: { flex:1, display:'flex', alignItems:'center', justifyContent:'center', background:'#f8fafc', padding:'2rem', overflowY:'auto' },
    card: { background:'white', padding:'2.5rem', borderRadius:'16px', width:'100%', maxWidth:'480px', boxShadow:'0 4px 30px rgba(0,0,0,0.08)' },
    title: { fontSize:'1.8rem', fontWeight:'700', color:'#1a1a2e', margin:'0 0 0.25rem 0' },
    subtitle: { color:'#888', margin:'0 0 1.5rem 0' },
    errorBox: { background:'#fff0f0', border:'1px solid #ffcccc', color:'#cc0000', padding:'0.75rem 1rem', borderRadius:'8px', marginBottom:'1rem', fontSize:'0.9rem' },
    inputGroup: { marginBottom:'1.25rem' },
    row: { display:'flex', gap:'1rem' },
    label: { display:'block', fontSize:'0.85rem', fontWeight:'600', color:'#444', marginBottom:'0.4rem' },
    input: { width:'100%', padding:'0.75rem 1rem', borderRadius:'8px', border:'1px solid #e2e8f0', fontSize:'1rem', boxSizing:'border-box', outline:'none', background:'#f8fafc' },
    roleSelector: { display:'flex', gap:'1rem' },
    roleOption: { flex:1, padding:'0.75rem', border:'2px solid #e2e8f0', borderRadius:'8px', textAlign:'center', cursor:'pointer', fontWeight:'600', color:'#666', fontSize:'0.95rem' },
    roleSelected: { border:'2px solid #2d6a4f', color:'#2d6a4f', background:'#f0faf4' },
    button: { width:'100%', padding:'0.85rem', background:'#2d6a4f', color:'white', border:'none', borderRadius:'8px', fontSize:'1rem', fontWeight:'600', cursor:'pointer', marginTop:'0.5rem' },
    loginLink: { textAlign:'center', marginTop:'1.5rem', color:'#666', fontSize:'0.9rem' },
    link: { color:'#2d6a4f', fontWeight:'600', textDecoration:'none' },
};