import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [budget, setBudget] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/properties${budget ? `?budget=${budget}` : ''}`);
            setProperties(res.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => { fetchProperties(); }, []);

    const handleLogout = async () => {
        await api.post('/logout');
        localStorage.clear();
        navigate('/login');
    };

    const tierConfig = (tier) => {
        if (tier === 'Optimal Fit') return { color:'#2d6a4f', bg:'#f0faf4', icon:'🟢' };
        if (tier === 'Budget Stretch') return { color:'#b45309', bg:'#fffbeb', icon:'🟡' };
        return { color:'#dc2626', bg:'#fff0f0', icon:'🔴' };
    };

    return (
        <div style={styles.page}>
            {/* Navbar */}
            <nav style={styles.navbar}>
                <div style={styles.navBrand}>🏠 TierHome</div>
                <div style={styles.navRight}>
                    <div style={styles.userBadge}>
                        <span style={styles.userAvatar}>{user?.name?.charAt(0)}</span>
                        <div>
                            <div style={styles.userName}>{user?.name}</div>
                            <div style={styles.userRole}>{user?.role}</div>
                        </div>
                    </div>
                    <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
                </div>
            </nav>

            {/* Hero Search */}
            <div style={styles.hero}>
                <h1 style={styles.heroTitle}>Find Your Perfect Home</h1>
                <p style={styles.heroSubtitle}>Enter your budget and we'll rank properties that fit your lifestyle</p>
                <div style={styles.searchBox}>
                    <span style={styles.searchIcon}>₱</span>
                    <input
                        style={styles.searchInput}
                        type="number"
                        placeholder="Enter your monthly budget..."
                        value={budget}
                        onChange={e => setBudget(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && fetchProperties()}
                    />
                    <button style={styles.searchBtn} onClick={fetchProperties}>
                        Search
                    </button>
                </div>

                {/* Tier Legend */}
                <div style={styles.legend}>
                    <span style={styles.legendItem}><span style={{color:'#2d6a4f'}}>🟢</span> Optimal Fit</span>
                    <span style={styles.legendItem}><span style={{color:'#b45309'}}>🟡</span> Budget Stretch</span>
                    <span style={styles.legendItem}><span style={{color:'#dc2626'}}>🔴</span> High Risk</span>
                </div>
            </div>

            {/* Results */}
            <div style={styles.content}>
                {loading ? (
                    <div style={styles.loadingWrapper}>
                        <div style={styles.loadingSpinner}></div>
                        <p style={styles.loadingText}>Finding properties...</p>
                    </div>
                ) : properties.length === 0 ? (
                    <div style={styles.emptyState}>
                        <p style={styles.emptyIcon}>🏚️</p>
                        <h3>No properties found</h3>
                        <p style={{color:'#888'}}>Try adjusting your budget or check back later.</p>
                    </div>
                ) : (
                    <>
                        <p style={styles.resultsCount}>{properties.length} properties found {budget ? `for ₱${Number(budget).toLocaleString()} budget` : ''}</p>
                        <div style={styles.grid}>
                            {properties.map((p, index) => {
                                const tier = tierConfig(p.tier);
                                return (
                                    <div key={p.id} style={styles.card}>
                                        {/* Rank Badge */}
                                        <div style={styles.rankBadge}>#{index + 1}</div>

                                        {/* Tier Badge */}
                                        <div style={{...styles.tierBadge, background: tier.bg, color: tier.color}}>
                                            {tier.icon} {p.tier || 'Unranked'}
                                        </div>

                                        <h3 style={styles.cardTitle}>{p.title}</h3>
                                        <p style={styles.cardLocation}>📍 {p.barangay ? `${p.barangay}, ` : ''}{p.city}</p>

                                        <div style={styles.cardPrice}>
                                            ₱{Number(p.monthly_rent).toLocaleString()}
                                            <span style={styles.perMonth}>/month</span>
                                        </div>

                                        <div style={styles.cardDetails}>
                                            <span style={styles.detail}>🛏 {p.bedrooms} Bed</span>
                                            <span style={styles.detail}>🚿 {p.bathrooms} Bath</span>
                                            <span style={styles.detail}>🏠 {p.type}</span>
                                        </div>

                                        <div style={styles.divider}></div>

                                        <div style={styles.amenities}>
                                            {p.has_wifi && <span style={styles.tag}>📶 WiFi</span>}
                                            {p.has_water && <span style={styles.tag}>💧 Water</span>}
                                            {p.has_electricity && <span style={styles.tag}>⚡ Electric</span>}
                                            {p.has_aircon && <span style={styles.tag}>❄️ Aircon</span>}
                                            {p.is_furnished && <span style={styles.tag}>🛋️ Furnished</span>}
                                            {p.has_parking && <span style={styles.tag}>🚗 Parking</span>}
                                            {p.is_pet_friendly && <span style={styles.tag}>🐾 Pet Friendly</span>}
                                        </div>

                                        {p.ranking_score && (
                                            <div style={styles.scoreSection}>
                                                <div style={styles.scoreHeader}>
                                                    <span style={styles.scoreLabel}>Match Score</span>
                                                    <span style={{...styles.scoreValue, color: tier.color}}>{p.ranking_score}/100</span>
                                                </div>
                                                <div style={styles.barBg}>
                                                    <div style={{
                                                        ...styles.barFill,
                                                        width: `${p.ranking_score}%`,
                                                        background: tier.color
                                                    }}></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

const styles = {
    page: { minHeight:'100vh', background:'#f8fafc', fontFamily:"'Segoe UI', sans-serif" },
    navbar: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem 2rem', background:'white', boxShadow:'0 1px 4px rgba(0,0,0,0.08)', position:'sticky', top:0, zIndex:100 },
    navBrand: { fontSize:'1.4rem', fontWeight:'700', color:'#2d6a4f' },
    navRight: { display:'flex', alignItems:'center', gap:'1.5rem' },
    userBadge: { display:'flex', alignItems:'center', gap:'0.75rem' },
    userAvatar: { width:'36px', height:'36px', background:'#2d6a4f', color:'white', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700', fontSize:'1rem' },
    userName: { fontWeight:'600', fontSize:'0.9rem', color:'#1a1a2e' },
    userRole: { fontSize:'0.75rem', color:'#888', textTransform:'capitalize' },
    logoutBtn: { padding:'0.5rem 1.25rem', background:'white', color:'#dc2626', border:'1px solid #dc2626', borderRadius:'8px', cursor:'pointer', fontWeight:'600', fontSize:'0.9rem' },
    hero: { background:'linear-gradient(160deg, #2d6a4f, #52b788)', padding:'3rem 2rem', textAlign:'center', color:'white' },
    heroTitle: { fontSize:'2.2rem', fontWeight:'700', margin:'0 0 0.5rem 0' },
    heroSubtitle: { opacity:0.85, margin:'0 0 2rem 0', fontSize:'1rem' },
    searchBox: { display:'flex', alignItems:'center', background:'white', borderRadius:'12px', padding:'0.5rem', maxWidth:'560px', margin:'0 auto', boxShadow:'0 4px 20px rgba(0,0,0,0.15)' },
    searchIcon: { padding:'0 0.75rem', color:'#2d6a4f', fontWeight:'700', fontSize:'1.2rem' },
    searchInput: { flex:1, border:'none', outline:'none', fontSize:'1rem', padding:'0.5rem', color:'#333' },
    searchBtn: { padding:'0.65rem 1.5rem', background:'#2d6a4f', color:'white', border:'none', borderRadius:'8px', fontWeight:'600', cursor:'pointer', fontSize:'0.95rem' },
    legend: { display:'flex', justifyContent:'center', gap:'2rem', marginTop:'1.5rem', fontSize:'0.9rem', opacity:0.9 },
    legendItem: { display:'flex', alignItems:'center', gap:'0.4rem' },
    content: { padding:'2rem', maxWidth:'1200px', margin:'0 auto' },
    loadingWrapper: { textAlign:'center', padding:'4rem' },
    loadingSpinner: { width:'40px', height:'40px', border:'4px solid #e2e8f0', borderTop:'4px solid #2d6a4f', borderRadius:'50%', animation:'spin 1s linear infinite', margin:'0 auto 1rem' },
    loadingText: { color:'#888' },
    emptyState: { textAlign:'center', padding:'4rem', color:'#555' },
    emptyIcon: { fontSize:'4rem', margin:'0 0 1rem 0' },
    resultsCount: { color:'#666', marginBottom:'1.5rem', fontSize:'0.95rem' },
    grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'1.5rem' },
    card: { background:'white', borderRadius:'16px', padding:'1.5rem', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', position:'relative', border:'1px solid #f0f0f0' },
    rankBadge: { position:'absolute', top:'1rem', left:'1rem', background:'#1a1a2e', color:'white', width:'28px', height:'28px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.75rem', fontWeight:'700' },
    tierBadge: { display:'inline-block', padding:'0.3rem 0.8rem', borderRadius:'20px', fontSize:'0.8rem', fontWeight:'600', marginBottom:'0.75rem', marginLeft:'2rem' },
    cardTitle: { fontSize:'1.1rem', fontWeight:'700', color:'#1a1a2e', margin:'0 0 0.4rem 0' },
    cardLocation: { color:'#888', fontSize:'0.9rem', margin:'0 0 0.75rem 0' },
    cardPrice: { fontSize:'1.5rem', fontWeight:'700', color:'#2d6a4f', margin:'0 0 0.75rem 0' },
    perMonth: { fontSize:'0.9rem', fontWeight:'400', color:'#888' },
    cardDetails: { display:'flex', gap:'1rem', fontSize:'0.85rem', color:'#555', margin:'0 0 1rem 0' },
    detail: { display:'flex', alignItems:'center', gap:'0.3rem' },
    divider: { height:'1px', background:'#f0f0f0', margin:'1rem 0' },
    amenities: { display:'flex', flexWrap:'wrap', gap:'0.4rem', marginBottom:'1rem' },
    tag: { background:'#f8fafc', border:'1px solid #e2e8f0', padding:'0.2rem 0.6rem', borderRadius:'20px', fontSize:'0.78rem', color:'#555' },
    scoreSection: { marginTop:'0.5rem' },
    scoreHeader: { display:'flex', justifyContent:'space-between', marginBottom:'0.4rem' },
    scoreLabel: { fontSize:'0.85rem', color:'#888' },
    scoreValue: { fontSize:'0.85rem', fontWeight:'700' },
    barBg: { background:'#f0f0f0', borderRadius:'10px', height:'6px' },
    barFill: { height:'6px', borderRadius:'10px', transition:'width 0.5s ease' },
};