// src/pages/Home.jsx
import backgroundImage from '../assets/bg1.jpeg';

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '60px',
        position: 'relative'
      }}
    >
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        minHeight: '100vh',
        marginTop: '-60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Content Container */}
        <div style={{
          maxWidth: 'min(800px, 90vw)',
          padding: 'min(2rem, 5vw)',
          textAlign: 'center',
          color: 'white'
        }}>
          {/* Blue Accented Heading */}
          <div style={{
            position: 'relative',
            textAlign: 'center',
            padding: 'min(40px, 5vw) 0'
          }}>
            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 50px)',
              fontWeight: '400',
              fontFamily: '"Italiana", serif',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: 'clamp(4px, 1.5vw, 8px)',
              lineHeight: 'clamp(1.2, 1.5, 1.8)',
              margin: '0 auto',
              padding: '0',
              position: 'relative',
              display: 'inline-block',
              textShadow: `
                0 0 32px rgba(63, 7, 231, 0.7),
                0 0 8px rgba(6, 39, 253, 0.7)`,
              filter: 'drop-shadow(0 0 4px rgba(11, 7, 232, 0.7))'
            }}>
              WELCOME TO OUR ESTABLISHMENT
            </h1>
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(200px, 50vw)',
              height: '1px',
              background: 'rgb(10, 18, 246)'
            }}></div>
          </div>
          
          {/* Description with Blue Highlights */}
          <p style={{
            fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
            lineHeight: '1.6',
            marginBottom: 'min(2.5rem, 5vw)'
          }}>
            Experience our <span style={{ color: '#0796EF', fontWeight: '600' }}>award-winning</span> cuisine in an 
            <span style={{ color: '#0796EF', fontWeight: '600' }}> elegant atmosphere</span> that combines 
            modern luxury with timeless comfort.
          </p>
          
          {/* Blue Accented Buttons */}
          <div style={{
            display: 'flex',
            gap: 'min(1rem, 3vw)',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button style={{
              padding: 'clamp(10px, 1.5vw, 12px) clamp(20px, 3vw, 30px)',
              backgroundColor: '#0796EF',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
              ':hover': {
                backgroundColor: '#0a7bc8',
                transform: 'translateY(-2px)'
              }
            }} onClick={() => window.location.href = '/'}>
              View Menu
            </button>
            <button style={{
              padding: 'clamp(10px, 1.5vw, 12px) clamp(20px, 3vw, 30px)',
              backgroundColor: 'transparent',
              color: '#0796EF',
              border: '2px solid #0796EF',
              borderRadius: '4px',
              fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
              ':hover': {
                backgroundColor: 'rgba(7, 150, 239, 0.1)',
                transform: 'translateY(-2px)'
              }
            }}>
              Make Reservation
            </button>
          </div>
          
          {/* Blue Accented Features */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 40vw), 1fr))',
            gap: 'min(2rem, 5vw)',
            marginTop: 'min(3rem, 6vw)'
          }}>
            {[
              { icon: '⏱️', title: 'Fast Service', desc: 'Quick seating & dining' },
              { icon: '🍽️', title: 'Fresh Menu', desc: 'Daily specials available' },
              { icon: '🍷', title: 'Full Bar', desc: 'Premium cocktails & wine' }
            ].map((item, index) => (
              <div key={index} style={{ padding: 'min(1rem, 2vw)' }}>
                <div style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  marginBottom: 'min(0.5rem, 1vw)',
                  color: '#0796EF'
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  color: '#0796EF',
                  marginBottom: 'min(0.5rem, 1vw)',
                  fontSize: 'clamp(1rem, 1.2vw, 1.2rem)'
                }}>
                  {item.title}
                </h3>
                <p style={{ 
                  fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
                  lineHeight: '1.4'
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}