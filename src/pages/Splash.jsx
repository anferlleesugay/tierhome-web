import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
    const navigate = useNavigate();
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => setFade(true), 2000);
        const navTimer = setTimeout(() => navigate('/login'), 3000);
        return () => { clearTimeout(fadeTimer); clearTimeout(navTimer); };
    }, []);

    return (
        <div style={{...styles.container, opacity: fade ? 0 : 1}}>
            <div style={styles.content}>
                <div style={styles.iconWrapper}>
                    <span style={styles.icon}>🏠</span>
                </div>
                <h1 style={styles.title}>Tier<span style={styles.titleAccent}>Home</span></h1>
                <p style={styles.subtitle}>Smart Housing for Every Budget</p>
                <div style={styles.dotsWrapper}>
                    <span style={{...styles.dot, animationDelay:'0s'}}></span>
                    <span style={{...styles.dot, animationDelay:'0.2s'}}></span>
                    <span style={{...styles.dot, animationDelay:'0.4s'}}></span>
                </div>
            </div>
            <p style={styles.footer}>Powered by Budget-Based Ranking</p>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(24px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                @keyframes bounce {
                    0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
                    40% { transform: scale(1); opacity: 1; }
                }
                * { transition: opacity 1s ease; }
            `}</style>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#ffffff',
        fontFamily: "'Segoe UI', sans-serif",
        transition: 'opacity 1s ease',
    },
    content: {
        textAlign: 'center',
        animation: 'fadeInUp 0.8s ease both',
    },
    iconWrapper: {
        width: '90px',
        height: '90px',
        background: '#f0faf4',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem auto',
        boxShadow: '0 4px 20px rgba(45,106,79,0.12)',
    },
    icon: {
        fontSize: '3rem',
    },
    title: {
        fontSize: '2.8rem',
        fontWeight: '700',
        color: '#1a1a2e',
        margin: '0 0 0.5rem 0',
        letterSpacing: '-1px',
    },
    titleAccent: {
        color: '#2d6a4f',
    },
    subtitle: {
        color: '#888',
        fontSize: '1rem',
        margin: '0 0 2.5rem 0',
        letterSpacing: '0.5px',
    },
    dotsWrapper: {
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
    },
    dot: {
        display: 'inline-block',
        width: '10px',
        height: '10px',
        background: '#2d6a4f',
        borderRadius: '50%',
        animation: 'bounce 1.4s infinite ease-in-out both',
    },
    footer: {
        position: 'absolute',
        bottom: '2rem',
        color: '#ccc',
        fontSize: '0.8rem',
        letterSpacing: '1px',
    },
};