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
        setError('');
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
                    <h1 style={styles.heroTitle}>Join thousands finding their perfect home.</h1>
                    <p style={styles.heroSub}>Whether you're searching for a place or listing one — TierHome makes it smarter and simpler.</p>

                    <div style={styles.roleCards}>
                        <div style={styles.roleCard}>
                            <div style={styles.roleIcon}>👤</div>
                            <div>
                                <div style={styles.roleTitle}>Tenant</div>
                                <div style={styles.roleDesc}>Search budget-ranked properties that truly fit your lifestyle.</div>
                            </div>
                        </div>
                        <div style={styles.roleCard}>
                            <div style={styles.roleIcon}>🏘️</div>
                            <div>
                                <div style={styles.roleTitle}>Landlord</div>
                                <div style={styles.roleDesc}>List and manage your rental properties with ease.</div>
                            </div>
                        </div>
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
                    <h2 style={styles.cardTitle}>Create account</h2>
                    <p style={styles.cardSub}>Start your TierHome journey today</p>

                    {error && <div style={styles.errorBox}>⚠ {error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Full name</label>
                            <input
                                className="th-input"
                                style={styles.input}
                                type="text"
                                placeholder="Juan Dela Cruz"
                                value={form.name}
                                onChange={e => setForm({...form, name: e.target.value})}
                                required
                            />
                        </div>

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

                        <div style={styles.row}>
                            <div style={{...styles.fieldGroup, flex: 1}}>
                                <label style={styles.label}>Password</label>
                                <input
                                    className="th-input"
                                    style={styles.input}
                                    type="password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={e => setForm({...form, password: e.target.value})}
                                    required
                                />
                            </div>
                            <div style={{...styles.fieldGroup, flex: 1}}>
                                <label style={styles.label}>Confirm password</label>
                                <input
                                    className="th-input"
                                    style={styles.input}
                                    type="password"
                                    placeholder="••••••••"
                                    value={form.password_confirmation}
                                    onChange={e => setForm({...form, password_confirmation: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div style={styles.fieldGroup}>
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

                        <button
                            className="th-btn-primary"
                            style={{...styles.submitBtn, opacity: loading ? 0.75 : 1}}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Creating account...' : 'Create account →'}
                        </button>
                    </form>

                    <div style={styles.divider}><span style={styles.dividerText}>or</span></div>

                    <p style={styles.loginLine}>
                        Already have an account?{' '}
                        <Link to="/login" style={styles.link}>Sign in</Link>
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
        fontSize: '36px',
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
    roleCards: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '32px',
    },
    roleCard: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        padding: '14px 16px',
        borderRadius: '14px',
        background: 'rgba(255,255,255,0.05)',
        border: '0.5px solid rgba(255,255,255,0.08)',
    },
    roleIcon: {
        fontSize: '20px',
        lineHeight: 1,
        marginTop: '2px',
    },
    roleTitle: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#ffffff',
        marginBottom: '3px',
    },
    roleDesc: {
        fontSize: '13px',
        color: 'rgba(255,255,255,0.5)',
        fontWeight: '300',
    },
    tierPills: {
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
    },
    pillGreen: { fontSize: '12px', color: '#1D9E75', fontWeight: '500' },
    pillAmber: { fontSize: '12px', color: '#EF9F27', fontWeight: '500' },
    pillRed: { fontSize: '12px', color: '#E24B4A', fontWeight: '500' },
    right: {
        flex: 0.9,
        background: '#f4f6f8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 32px',
        overflowY: 'auto',
    },
    card: {
        background: '#ffffff',
        borderRadius: '24px',
        padding: '40px',
        width: '100%',
        maxWidth: '440px',
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
    fieldGroup: { marginBottom: '18px' },
    row: { display: 'flex', gap: '12px' },
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
    roleSelector: {
        display: 'flex',
        gap: '10px',
    },
    roleOption: {
        flex: 1,
        padding: '12px',
        border: '0.5px solid #dde3ea',
        borderRadius: '12px',
        textAlign: 'center',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        color: '#8a96a3',
        background: '#f8fafc',
        transition: 'all 0.2s',
    },
    roleSelected: {
        border: '1.5px solid #1D9E75',
        color: '#1D9E75',
        background: '#f0fdf8',
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
    loginLine: {
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