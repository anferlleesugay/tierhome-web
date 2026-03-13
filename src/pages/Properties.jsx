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
        if (tier === 'Optimal Fit') return { color:'#0F6E56', bg:'#E1F5EE', label:'Optimal Fit' };
        if (tier === 'Budget Stretch') return { color:'#854F0B', bg:'#FAEEDA', label:'Budget Stretch' };
        return { color:'#A32D2D', bg:'#FCEBEB', label:'High Risk' };
    };

    const scoreColor = (tier) => {
        if (tier === 'Optimal Fit') return '#1D9E75';
        if (tier === 'Budget Stretch') return '#EF9F27';
        return '#E24B4A';
    };

    return (
        <div style={styles.page}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,600&family=DM+Sans:wght@300;400;500&display=swap');
                @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
                @keyframes spin { to { transform: rotate(360deg); } }
                .th-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.12) !important; }
                .th-search-input:focus { outline: none; }
                .th-logout:hover { background: #fef2f2 !important; color: #b91c1c !important; }
            `}</style>

            {/* Navbar */}
            <nav style={styles.navbar}>
                <div style={styles.navBrand}>
                    <div style={styles.navLogoBox}>🏠</div>
                    <span style={styles.navLogoText}>Tier<em>Home</em></span>
                </div>

                <div style={styles.navCenter}>
                    <div style={styles.navSearchBar}>
                        <span style={styles.navSearchIcon}>₱</span>
                        <input
                            className="th-search-input"
                            style={styles.navSearchInput}
                            type="number"
                            placeholder="Monthly budget..."
                            value={budget}
                            onChange={e => setBudget(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && fetchProperties()}
                        />
                        <button style={styles.navSearchBtn} onClick={fetchProperties}>
                            Search
                        </button>
                    </div>
                </div>

                <div style={styles.navRight}>
                    <div style={styles.userPill}>
                        <div style={styles.userAvatar}>{user?.name?.charAt(0)?.toUpperCase()}</div>
                        <div style={styles.userInfo}>
                            <div style={styles.userName}>{user?.name}</div>
                            <div style={styles.userRole}>{user?.role}</div>
                        </div>
                    </div>
                    <button className="th-logout" style={styles.logoutBtn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <div style={styles.hero}>
                <div style={styles.heroInner}>
                    <h1 style={styles.heroTitle}>
                        Your budget,{' '}
                        <span style={styles.heroAccent}>perfectly matched.</span>
                    </h1>
                    <p style={styles.heroSub}>
                        {budget
                            ? `Showing ${properties.length} properties ranked for ₱${Number(budget).toLocaleString()} / month`
                            : 'Enter your budget above to see personalized rankings'}
                    </p>
                    <div style={styles.tierLegend}>
                        <span style={styles.legendItem}>
                            <span style={{...styles.legendDot, background:'#1D9E75'}}></span>Optimal Fit
                        </span>
                        <span style={styles.legendItem}>
                            <span style={{...styles.legendDot, background:'#EF9F27'}}></span>Budget Stretch
                        </span>
                        <span style={styles.legendItem}>
                            <span style={{...styles.legendDot, background:'#E24B4A'}}></span>High Risk
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={styles.content}>
                {loading ? (
                    <div style={styles.loadingWrap}>
                        <div style={styles.spinner}></div>
                        <p style={styles.loadingText}>Finding your perfect match...</p>
                    </div>
                ) : properties.length === 0 ? (
                    <div style={styles.emptyWrap}>
                        <div style={styles.emptyIcon}>🏚️</div>
                        <h3 style={styles.emptyTitle}>No properties found</h3>
                        <p style={styles.emptyText}>Try a different budget or check back later.</p>
                    </div>
                ) : (
                    <div style={styles.grid}>
                        {properties.map((p, index) => {
                            const tier = tierConfig(p.tier);
                            const sc = scoreColor(p.tier);
                            return (
                                <div key={p.id} className="th-card" style={{...styles.card, transition:'all 0.25s ease'}}>

                                    {/* Card Image Area */}
                                    <div style={{...styles.cardImg, background: tier.bg}}>
                                        <span style={styles.cardImgIcon}>
                                            {p.type === 'studio' ? '🏢' : p.type === 'condo' ? '🏙️' : p.type === 'house' ? '🏡' : p.type === 'room' ? '🚪' : '🏠'}
                                        </span>
                                        <div style={styles.cardRank}>#{index + 1}</div>
                                        <div style={{...styles.tierBadge, background: tier.bg, color: tier.color, border: `0.5px solid ${tier.color}30`}}>
                                            {tier.label}
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div style={styles.cardBody}>
                                        <div style={styles.cardHeader}>
                                            <h3 style={styles.cardTitle}>{p.title}</h3>
                                            {p.ranking_score && (
                                                <span style={{...styles.cardScore, color: sc}}>{p.ranking_score}/100</span>
                                            )}
                                        </div>

                                        <p style={styles.cardLocation}>
                                            📍 {p.barangay ? `${p.barangay}, ` : ''}{p.city}
                                        </p>

                                        <div style={styles.cardPrice}>
                                            ₱{Number(p.monthly_rent).toLocaleString()}
                                            <span style={styles.perMonth}> / month</span>
                                        </div>

                                        <div style={styles.cardMeta}>
                                            <span style={styles.metaItem}>🛏 {p.bedrooms} bed</span>
                                            <span style={styles.metaDot}></span>
                                            <span style={styles.metaItem}>🚿 {p.bathrooms} bath</span>
                                            <span style={styles.metaDot}></span>
                                            <span style={styles.metaItem}>🏠 {p.type}</span>
                                        </div>

                                        <div style={styles.cardDivider}></div>

                                        <div style={styles.amenities}>
                                            {p.has_wifi && <span style={styles.tag}>📶 WiFi</span>}
                                            {p.has_water && <span style={styles.tag}>💧 Water</span>}
                                            {p.has_electricity && <span style={styles.tag}>⚡ Electric</span>}
                                            {p.has_aircon && <span style={styles.tag}>❄️ Aircon</span>}
                                            {p.is_furnished && <span style={styles.tag}>🛋️ Furnished</span>}
                                            {p.has_parking && <span style={styles.tag}>🚗 Parking</span>}
                                            {p.is_pet_friendly && <span style={styles.tag}>🐾 Pets OK</span>}
                                        </div>

                                        {p.ranking_score && (
                                            <div style={styles.scoreWrap}>
                                                <div style={styles.scoreBar}>
                                                    <div style={{...styles.scoreFill, width:`${p.ranking_score}%`, background: sc}}></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer style={styles.footer}>
                <span style={styles.footerLogo}>TierHome</span>
                <span style={styles.footerText}>Smart Housing · Budget-Based Rankings · Angeles City</span>
            </footer>
        </div>
    );
}

const styles = {
    page: { minHeight:'100vh', background:'#f4f6f8', fontFamily:"'DM Sans', sans-serif", display:'flex', flexDirection:'column' },
    navbar: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 32px', background:'#ffffff', borderBottom:'0.5px solid #eaecef', position:'sticky', top:0, zIndex:100, gap:'16px' },
    navBrand: { display:'flex', alignItems:'center', gap:'10px', flexShrink:0 },
    navLogoBox: { width:'36px', height:'36px', borderRadius:'10px', background:'linear-gradient(135deg, #1D9E75, #0F6E56)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', boxShadow:'0 4px 12px rgba(29,158,117,0.3)' },
    navLogoText: { fontFamily:"'Playfair Display', serif", fontSize:'20px', color:'#0a1628', fontWeight:'600', letterSpacing:'-0.5px' },
    navCenter: { flex:1, display:'flex', justifyContent:'center', maxWidth:'500px', margin:'0 auto' },
    navSearchBar: { display:'flex', alignItems:'center', border:'0.5px solid #dde3ea', borderRadius:'40px', overflow:'hidden', background:'#f8fafc', width:'100%' },
    navSearchIcon: { padding:'0 12px', color:'#1D9E75', fontWeight:'500', fontSize:'15px' },
    navSearchInput: { flex:1, border:'none', background:'transparent', padding:'10px 8px', fontSize:'14px', color:'#0a1628', fontFamily:"'DM Sans', sans-serif" },
    navSearchBtn: { background:'#1D9E75', border:'none', color:'white', padding:'10px 20px', fontWeight:'500', fontSize:'13px', cursor:'pointer', fontFamily:"'DM Sans', sans-serif", borderRadius:'40px', margin:'4px' },
    navRight: { display:'flex', alignItems:'center', gap:'12px', flexShrink:0 },
    userPill: { display:'flex', alignItems:'center', gap:'10px' },
    userAvatar: { width:'34px', height:'34px', borderRadius:'50%', background:'#0a1628', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', fontWeight:'500' },
    userInfo: { display:'flex', flexDirection:'column' },
    userName: { fontSize:'13px', fontWeight:'500', color:'#0a1628', lineHeight:1.2 },
    userRole: { fontSize:'11px', color:'#8a96a3', textTransform:'capitalize' },
    logoutBtn: { padding:'8px 16px', background:'white', color:'#8a96a3', border:'0.5px solid #dde3ea', borderRadius:'8px', cursor:'pointer', fontSize:'13px', fontWeight:'500', fontFamily:"'DM Sans', sans-serif", transition:'all 0.2s' },
    hero: { background:'#0a1628', padding:'40px 32px' },
    heroInner: { maxWidth:'800px', margin:'0 auto', animation:'fadeIn 0.8s ease both' },
    heroTitle: { fontFamily:"'Playfair Display', serif", fontSize:'36px', color:'#ffffff', fontWeight:'600', margin:'0 0 10px', letterSpacing:'-0.5px', lineHeight:1.2 },
    heroAccent: { color:'#1D9E75', fontStyle:'italic' },
    heroSub: { fontSize:'15px', color:'rgba(255,255,255,0.5)', fontWeight:'300', margin:'0 0 20px' },
    tierLegend: { display:'flex', gap:'24px', flexWrap:'wrap' },
    legendItem: { display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', color:'rgba(255,255,255,0.6)' },
    legendDot: { width:'8px', height:'8px', borderRadius:'50%', display:'inline-block' },
    content: { flex:1, padding:'32px', maxWidth:'1280px', width:'100%', margin:'0 auto', boxSizing:'border-box' },
    loadingWrap: { textAlign:'center', padding:'80px 0' },
    spinner: { width:'36px', height:'36px', border:'3px solid #eaecef', borderTop:'3px solid #1D9E75', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' },
    loadingText: { color:'#8a96a3', fontSize:'14px', fontWeight:'300' },
    emptyWrap: { textAlign:'center', padding:'80px 0' },
    emptyIcon: { fontSize:'48px', marginBottom:'16px' },
    emptyTitle: { fontFamily:"'Playfair Display', serif", fontSize:'22px', color:'#0a1628', margin:'0 0 8px' },
    emptyText: { color:'#8a96a3', fontSize:'14px', fontWeight:'300' },
    grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'20px' },
    card: { background:'#ffffff', borderRadius:'20px', overflow:'hidden', border:'0.5px solid #eaecef', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' },
    cardImg: { height:'140px', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' },
    cardImgIcon: { fontSize:'48px' },
    cardRank: { position:'absolute', top:'12px', right:'12px', width:'26px', height:'26px', borderRadius:'50%', background:'rgba(10,22,40,0.7)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'500' },
    tierBadge: { position:'absolute', top:'12px', left:'12px', padding:'4px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:'500' },
    cardBody: { padding:'16px 18px 18px' },
    cardHeader: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px' },
    cardTitle: { fontSize:'15px', fontWeight:'500', color:'#0a1628', margin:0, flex:1, paddingRight:'8px' },
    cardScore: { fontSize:'13px', fontWeight:'500', flexShrink:0 },
    cardLocation: { fontSize:'12px', color:'#8a96a3', margin:'0 0 10px', fontWeight:'300' },
    cardPrice: { fontSize:'18px', fontWeight:'500', color:'#0a1628', margin:'0 0 10px' },
    perMonth: { fontSize:'13px', fontWeight:'300', color:'#8a96a3' },
    cardMeta: { display:'flex', alignItems:'center', gap:'8px', fontSize:'12px', color:'#8a96a3', marginBottom:'12px' },
    metaItem: { whiteSpace:'nowrap' },
    metaDot: { width:'3px', height:'3px', borderRadius:'50%', background:'#dde3ea', flexShrink:0 },
    cardDivider: { height:'0.5px', background:'#f0f2f4', margin:'12px 0' },
    amenities: { display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'12px' },
    tag: { fontSize:'11px', color:'#5a6472', background:'#f4f6f8', padding:'4px 8px', borderRadius:'20px', border:'0.5px solid #eaecef' },
    scoreWrap: { marginTop:'4px' },
    scoreBar: { height:'4px', background:'#f0f2f4', borderRadius:'4px' },
    scoreFill: { height:'4px', borderRadius:'4px', transition:'width 0.6s ease' },
    footer: { padding:'24px 32px', borderTop:'0.5px solid #eaecef', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#ffffff', marginTop:'auto' },
    footerLogo: { fontFamily:"'Playfair Display', serif", fontSize:'16px', color:'#0a1628', fontWeight:'600' },
    footerText: { fontSize:'12px', color:'#aab0b8', fontWeight:'300' },
};