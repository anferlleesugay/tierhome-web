import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function AddProperty() {
    const [form, setForm] = useState({
        title: '', description: '', address: '', city: '', barangay: '',
        monthly_rent: '', deposit: '', type: 'apartment',
        bedrooms: 1, bathrooms: 1, area_sqm: '',
        has_wifi: false, has_parking: false, has_aircon: false,
        has_water: false, has_electricity: false,
        is_pet_friendly: false, is_furnished: false, is_available: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/properties', form);
            navigate('/properties');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add property.');
        }
        setLoading(false);
    };

    const toggle = (field) => setForm({...form, [field]: !form[field]});

    const amenities = [
        { key: 'has_wifi', label: '📶 WiFi' },
        { key: 'has_water', label: '💧 Water' },
        { key: 'has_electricity', label: '⚡ Electricity' },
        { key: 'has_aircon', label: '❄️ Aircon' },
        { key: 'has_parking', label: '🚗 Parking' },
        { key: 'is_furnished', label: '🛋️ Furnished' },
        { key: 'is_pet_friendly', label: '🐾 Pet Friendly' },
    ];

    return (
        <div style={styles.page}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,600&family=DM+Sans:wght@300;400;500&display=swap');
                @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
                .th-input:focus { border-color: #1D9E75 !important; outline: none; }
                .th-btn:hover { background: #0F6E56 !important; }
            `}</style>

            {/* Navbar */}
            <nav style={styles.navbar}>
                <div style={styles.navBrand}>
                    <div style={styles.navLogoBox}>🏠</div>
                    <span style={styles.navLogoText}>Tier<em>Home</em></span>
                </div>
                <Link to="/properties" style={styles.backBtn}>← Back to listings</Link>
            </nav>

            {/* Form */}
            <div style={styles.content}>
                <div style={styles.formWrap}>
                    <div style={styles.formHeader}>
                        <h1 style={styles.formTitle}>List your property</h1>
                        <p style={styles.formSub}>Fill in the details and your listing will appear in search results.</p>
                    </div>

                    {error && <div style={styles.errorBox}>⚠ {error}</div>}

                    <form onSubmit={handleSubmit}>
                        {/* Basic Info */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>Basic Information</h2>
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Property title</label>
                                <input className="th-input" style={styles.input} type="text" placeholder="e.g. Cozy Studio in Angeles City" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                            </div>
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Description</label>
                                <textarea className="th-input" style={{...styles.input, height:'100px', resize:'vertical'}} placeholder="Describe your property..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                            </div>
                            <div style={styles.row}>
                                <div style={{...styles.fieldGroup, flex:1}}>
                                    <label style={styles.label}>Property type</label>
                                    <select className="th-input" style={styles.input} value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                                        <option value="apartment">Apartment</option>
                                        <option value="house">House</option>
                                        <option value="room">Room</option>
                                        <option value="condo">Condo</option>
                                        <option value="studio">Studio</option>
                                    </select>
                                </div>
                                <div style={{...styles.fieldGroup, flex:1}}>
                                    <label style={styles.label}>Area (sqm)</label>
                                    <input className="th-input" style={styles.input} type="number" placeholder="e.g. 35" value={form.area_sqm} onChange={e => setForm({...form, area_sqm: e.target.value})} />
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>Location</h2>
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Address</label>
                                <input className="th-input" style={styles.input} type="text" placeholder="Street address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} required />
                            </div>
                            <div style={styles.row}>
                                <div style={{...styles.fieldGroup, flex:1}}>
                                    <label style={styles.label}>City</label>
                                    <input className="th-input" style={styles.input} type="text" placeholder="e.g. Angeles City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} required />
                                </div>
                                <div style={{...styles.fieldGroup, flex:1}}>
                                    <label style={styles.label}>Barangay</label>
                                    <input className="th-input" style={styles.input} type="text" placeholder="e.g. Balibago" value={form.barangay} onChange={e => setForm({...form, barangay: e.target.value})} />
                                </div>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>Pricing</h2>
                            <div style={styles.row}>
                                <div style={{...styles.fieldGroup, flex:1}}>
                                    <label style={styles.label}>Monthly rent (₱)</label>
                                    <input className="th-input" style={styles.input} type="number" placeholder="e.g. 5000" value={form.monthly_rent} onChange={e => setForm({...form, monthly_rent: e.target.value})} required />
                                </div>
                                <div style={{...styles.fieldGroup, flex:1}}>
                                    <label style={styles.label}>Deposit (₱)</label>
                                    <input className="th-input" style={styles.input} type="number" placeholder="e.g. 10000" value={form.deposit} onChange={e => setForm({...form, deposit: e.target.value})} />
                                </div>
                            </div>
                        </div>

                        {/* Details */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>Room Details</h2>
                            <div style={styles.row}>
                                <div style={{...styles.fieldGroup, flex:1}}>
                                    <label style={styles.label}>Bedrooms</label>
                                    <input className="th-input" style={styles.input} type="number" min="0" value={form.bedrooms} onChange={e => setForm({...form, bedrooms: e.target.value})} />
                                </div>
                                <div style={{...styles.fieldGroup, flex:1}}>
                                    <label style={styles.label}>Bathrooms</label>
                                    <input className="th-input" style={styles.input} type="number" min="1" value={form.bathrooms} onChange={e => setForm({...form, bathrooms: e.target.value})} />
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>Amenities</h2>
                            <div style={styles.amenitiesGrid}>
                                {amenities.map(a => (
                                    <div
                                        key={a.key}
                                        style={{...styles.amenityToggle, ...(form[a.key] ? styles.amenityOn : {})}}
                                        onClick={() => toggle(a.key)}
                                    >
                                        {a.label}
                                        {form[a.key] && <span style={styles.checkMark}>✓</span>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="th-btn" style={{...styles.submitBtn, opacity: loading ? 0.75 : 1}} type="submit" disabled={loading}>
                            {loading ? 'Publishing...' : 'Publish listing →'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: { minHeight:'100vh', background:'#f4f6f8', fontFamily:"'DM Sans', sans-serif" },
    navbar: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 32px', background:'#ffffff', borderBottom:'0.5px solid #eaecef', position:'sticky', top:0, zIndex:100 },
    navBrand: { display:'flex', alignItems:'center', gap:'10px' },
    navLogoBox: { width:'36px', height:'36px', borderRadius:'10px', background:'linear-gradient(135deg, #1D9E75, #0F6E56)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' },
    navLogoText: { fontFamily:"'Playfair Display', serif", fontSize:'20px', color:'#0a1628', fontWeight:'600', letterSpacing:'-0.5px' },
    backBtn: { fontSize:'14px', color:'#8a96a3', textDecoration:'none', fontWeight:'500' },
    content: { maxWidth:'720px', margin:'0 auto', padding:'40px 32px' },
    formWrap: { animation:'fadeIn 0.8s ease both' },
    formHeader: { marginBottom:'32px' },
    formTitle: { fontFamily:"'Playfair Display', serif", fontSize:'32px', color:'#0a1628', margin:'0 0 8px', letterSpacing:'-0.5px' },
    formSub: { fontSize:'14px', color:'#8a96a3', fontWeight:'300', margin:0 },
    errorBox: { background:'#fef2f2', border:'0.5px solid #fecaca', color:'#b91c1c', padding:'12px 16px', borderRadius:'12px', marginBottom:'24px', fontSize:'13px' },
    section: { background:'#ffffff', borderRadius:'16px', padding:'24px', marginBottom:'16px', border:'0.5px solid #eaecef' },
    sectionTitle: { fontFamily:"'Playfair Display', serif", fontSize:'18px', color:'#0a1628', margin:'0 0 20px', letterSpacing:'-0.3px' },
    fieldGroup: { marginBottom:'16px' },
    row: { display:'flex', gap:'16px' },
    label: { display:'block', fontSize:'13px', fontWeight:'500', color:'#3d4a56', marginBottom:'8px' },
    input: { width:'100%', padding:'12px 14px', borderRadius:'10px', border:'0.5px solid #dde3ea', background:'#f8fafc', fontSize:'14px', color:'#0a1628', boxSizing:'border-box', fontFamily:"'DM Sans', sans-serif", transition:'border-color 0.2s' },
    amenitiesGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))', gap:'10px' },
    amenityToggle: { padding:'10px 14px', borderRadius:'10px', border:'0.5px solid #dde3ea', background:'#f8fafc', fontSize:'13px', color:'#8a96a3', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', transition:'all 0.2s', userSelect:'none' },
    amenityOn: { border:'1.5px solid #1D9E75', background:'#f0fdf8', color:'#0F6E56', fontWeight:'500' },
    checkMark: { color:'#1D9E75', fontWeight:'700' },
    submitBtn: { width:'100%', padding:'15px', background:'#1D9E75', color:'#ffffff', border:'none', borderRadius:'12px', fontSize:'15px', fontWeight:'500', cursor:'pointer', fontFamily:"'DM Sans', sans-serif", transition:'background 0.2s', marginTop:'8px' },
};