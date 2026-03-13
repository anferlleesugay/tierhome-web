import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 100);
        setTimeout(() => setFade(true), 2200);
        setTimeout(() => navigate('/login'), 3000);
    }, []);

    return (
        <div style={{...styles.page, opacity: fade ? 0 : 1}}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,600&family=DM+Sans:wght@300;400;500&display=swap');
                @keyframes floatUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.08); opacity: 0.8; }
                }
                @keyframes dotBounce {
                    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
                    40% { transform: translateY(-8px); opacity: 1; }
                }
            `}</style>

            <div style={{...styles.content, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)'}}>
                <div style={styles.logoMark}>
                    <span style={styles.logoIcon}>🏠</span>
                </div>
                <h1 style={styles.title}>
                    Tier<span style={styles.titleAccent}>Home</span>
                </h1>
                <p style={styles.tagline}>Your budget, <em>perfectly matched.</em></p>
                <div style={styles.dots}>
                    <span style={{...styles.dot, animationDelay: '0s'}}></span>
                    <span style={{...styles.dot, animationDelay: '0.18s'}}></span>
                    <span style={{...styles.dot, animationDelay: '0.36s'}}></span>
                </div>
            </div>

            <p style={styles.footer}>Smart Housing · Budget Rankings · Angeles City</p>
        </div>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        background: '#0a1628',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'DM Sans', sans-serif",
        transition: 'opacity 0.8s ease',
        position: 'relative',
        overflow: 'hidden',
    },
    content: {
        textAlign: 'center',
        zIndex: 1,
    },
    logoMark: {
        width: '80px',
        height: '80px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #1D9E75, #0F6E56)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 24px',
        animation: 'pulse 2s ease-in-out infinite',
        boxShadow: '0 20px 60px rgba(29,158,117,0.4)',
    },
    logoIcon: {
        fontSize: '36px',
    },
    title: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '52px',
        fontWeight: '600',
        color: '#ffffff',
        margin: '0 0 12px',
        letterSpacing: '-1px',
    },
    titleAccent: {
        color: '#1D9E75',
        fontStyle: 'italic',
    },
    tagline: {
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '16px',
        color: 'rgba(255,255,255,0.55)',
        fontWeight: '300',
        margin: '0 0 40px',
        letterSpacing: '0.3px',
    },
    dots: {
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
    },
    dot: {
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#1D9E75',
        animation: 'dotBounce 1.4s infinite ease-in-out',
    },
    footer: {
        position: 'absolute',
        bottom: '28px',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.25)',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        fontFamily: "'DM Sans', sans-serif",
    },
};