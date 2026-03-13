import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/login', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/properties');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password.');
        }
        setLoading(false);
    };

    return (
        <div style={styles.page}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,600&family=DM+Sans:wght@300;400;500&display=swap');
                @keyframes fadeIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
                .th-input:focus { border-color: #1D9E75 !important; outline: none; }
                .th-btn-primary:hover { background: #0F6E56 !important; }
            `}</style>

            {/* Left Panel */}
            <div style={styles.left}>
                <div style={styles.leftInner}>
                    <div style={styles.logoRow}>
                        <div style={styles.logoBox}>🏠</div>
                        <span style={styles.logoText}>Tier<em>Home</em></span>
                    </div>
                    <h1 style={styles.heroTitle}>Find your perfect home, within your budget.</h1>
                    <p style={styles.heroSub}>TierHome ranks every listing against your budget — so you always see what truly fits first.</p>

                    <div style={styles.featureList}>
                        {[
                            { icon: '💸', title: 'Budget Matching', desc: 'See only what fits your price range.' },
                            { icon: '🏆', title: 'Tier Rankings', desc: 'Optimal Fit, Budget Stretch, High Risk.' },
                            { icon: '⚡', title: 'Fast Decisions', desc: 'Compare and move with confidence.' },
                        ].map((f, i) => (
                            <div key={i} style={styles.featureItem}>
                                <div style={styles.featureIcon}>{f.icon}</div>
                                <div>
                                    <div style={styles.featureTitle}>{f.title}</div>
                                    <div style={styles.featureDesc}>{f.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={styles.tierPills}>
                        <span style={styles.pillGreen}>● Optimal Fit</span>
                        <span style={styles.pillAmber}>● Budget Stretch</span>
                        <span style={styles.pillRed}>● High Risk</span>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div style={styles.right}>
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Welcome back</h2>
                    <p style={styles.cardSub}>Sign in to your TierHome account</p>

                    {error && <div style={styles.errorBox}>⚠ {error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Email address</label>
                            <input
                                className="th-input"
                                style={styles.input}
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={e => setForm({...form, email: e.target.value})}
                                required
                            />
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Password</label>
                            <div style={styles.passwordWrap}>
                                <input
                                    className="th-input"
                                    style={{...styles.input, border: 'none', flex: 1, marginBottom: 0}}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={e => setForm({...form, password: e.target.value})}
                                    required
                                />
                                <button type="button" style={styles.showBtn} onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <button
                            className="th-btn-primary"
                            style={{...styles.submitBtn, opacity: loading ? 0.75 : 1}}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign in →'}
                        </button>
                    </form>

                    <div style={styles.divider}><span style={styles.dividerText}>or</span></div>

                    <p style={styles.registerLine}>
                        Don't have an account?{' '}
                        <Link to="/register" style={styles.link}>Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        display: 'flex',
        minHeight: '100vh',
        fontFamily: "'DM Sans', sans-serif",
    },
    left: {
        flex: 1.1,
        background: '#0a1628',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px',
    },
    leftInner: {
        maxWidth: '480px',
        animation: 'fadeIn 0.8s ease both',
    },
    logoRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '40px',
    },
    logoBox: {
        width: '44px',
        height: '44px',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, #1D9E75, #0F6E56)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        boxShadow: '0 8px 24px rgba(29,158,117,0.35)',
    },
    logoText: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '24px',
        color: '#ffffff',
        fontWeight: '600',
        letterSpacing: '-0.5px',
    },
    heroTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '38px',
        color: '#ffffff',
        fontWeight: '600',
        lineHeight: '1.15',
        margin: '0 0 16px',
        letterSpacing: '-0.5px',
    },
    heroSub: {
        fontSize: '15px',
        color: 'rgba(255,255,255,0.55)',
        fontWeight: '300',
        lineHeight: '1.7',
        margin: '0 0 32px',
    },
    featureList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '32px',
    },
    featureItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        padding: '14px 16px',
        borderRadius: '14px',
        background: 'rgba(255,255,255,0.05)',
        border: '0.5px solid rgba(255,255,255,0.08)',
    },
    featureIcon: {
        fontSize: '20px',
        lineHeight: 1,
        marginTop: '2px',
    },
    featureTitle: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#ffffff',
        marginBottom: '3px',
    },
    featureDesc: {
        fontSize: '13px',
        color: 'rgba(255,255,255,0.5)',
        fontWeight: '300',
    },
    tierPills: {
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
    },
    pillGreen: {
        fontSize: '12px',
        color: '#1D9E75',
        fontWeight: '500',
    },
    pillAmber: {
        fontSize: '12px',
        color: '#EF9F27',
        fontWeight: '500',
    },
    pillRed: {
        fontSize: '12px',
        color: '#E24B4A',
        fontWeight: '500',
    },
    right: {
        flex: 0.9,
        background: '#f4f6f8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 32px',
    },
    card: {
        background: '#ffffff',
        borderRadius: '24px',
        padding: '40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
        animation: 'fadeIn 0.8s 0.1s ease both',
    },
    cardTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '28px',
        fontWeight: '600',
        color: '#0a1628',
        margin: '0 0 6px',
        letterSpacing: '-0.5px',
    },
    cardSub: {
        fontSize: '14px',
        color: '#8a96a3',
        fontWeight: '300',
        margin: '0 0 28px',
    },
    errorBox: {
        background: '#fef2f2',
        border: '0.5px solid #fecaca',
        color: '#b91c1c',
        padding: '12px 16px',
        borderRadius: '12px',
        marginBottom: '20px',
        fontSize: '13px',
        fontWeight: '500',
    },
    fieldGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        fontSize: '13px',
        fontWeight: '500',
        color: '#3d4a56',
        marginBottom: '8px',
    },
    input: {
        width: '100%',
        padding: '13px 16px',
        borderRadius: '12px',
        border: '0.5px solid #dde3ea',
        background: '#f8fafc',
        fontSize: '14px',
        color: '#0a1628',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
        fontFamily: "'DM Sans', sans-serif",
    },
    passwordWrap: {
        display: 'flex',
        alignItems: 'center',
        border: '0.5px solid #dde3ea',
        borderRadius: '12px',
        background: '#f8fafc',
        overflow: 'hidden',
        padding: '0 12px 0 0',
    },
    showBtn: {
        border: 'none',
        background: 'transparent',
        color: '#1D9E75',
        fontWeight: '500',
        fontSize: '13px',
        cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: 'nowrap',
    },
    submitBtn: {
        width: '100%',
        padding: '14px',
        background: '#1D9E75',
        color: '#ffffff',
        border: 'none',
        borderRadius: '12px',
        fontSize: '15px',
        fontWeight: '500',
        cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif",
        transition: 'background 0.2s',
        marginTop: '4px',
    },
    divider: {
        textAlign: 'center',
        borderTop: '0.5px solid #eaecef',
        margin: '24px 0 16px',
        position: 'relative',
    },
    dividerText: {
        position: 'relative',
        top: '-11px',
        background: '#fff',
        padding: '0 12px',
        fontSize: '12px',
        color: '#aab0b8',
    },
    registerLine: {
        textAlign: 'center',
        fontSize: '14px',
        color: '#8a96a3',
        margin: 0,
    },
    link: {
        color: '#1D9E75',
        fontWeight: '500',
        textDecoration: 'none',
    },
};