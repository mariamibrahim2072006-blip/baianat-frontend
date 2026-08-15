import jblImg from '../assets/jbl.png';

export default function MusicBanner() {
  return (
    <div style={{
      backgroundColor: '#000',
      borderRadius: '4px',
      padding: '60px 50px',
      marginTop: '60px',
      marginBottom: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '40px',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '450px', zIndex: 1 }}>
        <span style={{ color: '#00FF66', fontWeight: '600', fontSize: '16px' }}>Categories</span>
        
        <h2 style={{ fontSize: '48px', fontWeight: '600', margin: '30px 0', lineHeight: '1.2' }}>
          Enhance Your Music Experience
        </h2>

        <div style={{ display: 'flex', gap: '24px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {[
            { label: 'Hours', value: '23' },
            { label: 'Days', value: '05' },
            { label: 'Minutes', value: '59' },
            { label: 'Seconds', value: '35' }
          ].map((item, index) => (
            <div key={index} style={{
              width: '62px',
              height: '62px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              color: '#000',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '16px', fontWeight: '700', lineHeight: '1' }}>{item.value}</span>
              <span style={{ fontSize: '11px', fontWeight: '500', marginTop: '2px' }}>{item.label}</span>
            </div>
          ))}
        </div>

        <button style={{
          backgroundColor: '#00FF66',
          color: '#fff',
          border: 'none',
          padding: '16px 48px',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Buy Now!
        </button>
      </div>

      <div style={{
        flex: 1,
        minWidth: '280px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          zIndex: 0
        }}></div>

        <img 
          src={jblImg} 
          alt="Enhance Music" 
          style={{ width: '100%', maxWidth: '450px', zIndex: 1, objectFit: 'contain' }} 
        />
      </div>
    </div>
  );
}