import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div style={{ marginTop: '50px', marginBottom: '140px' }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: '14px', color: '#808080', marginBottom: '60px' }}>
        <Link to="/" style={{ color: '#808080', textDecoration: 'none' }}>Home</Link> / <span style={{ color: '#000' }}>Contact</span>
      </div>

      <div style={{
        display: 'flex',
        gap: '40px',
        alignItems: 'stretch',
        flexWrap: 'wrap'
      }}>
        {/* Left Side: Contact Info Card */}
        <div style={{
          flex: '1',
          minWidth: '300px',
          maxWidth: '340px',
          padding: '40px 35px',
          boxShadow: '0 1px 13px rgba(0,0,0,0.05)',
          borderRadius: '4px'
        }}>
          {/* Call To Us */}
          <div style={{ borderBottom: '1px solid #c1c0c1', paddingBottom: '32px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#DB4444',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '18px'
              }}>
                📞
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Call To Us</h3>
            </div>
            <p style={{ fontSize: '14px', margin: '0 0 16px 0', lineHeight: '22px' }}>We are available 24/7, 7 days a week.</p>
            <p style={{ fontSize: '14px', margin: 0 }}>Phone: +8801611112222</p>
          </div>

          {/* Write To Us */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#DB4444',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '18px'
              }}>
                ✉️
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Write To Us</h3>
            </div>
            <p style={{ fontSize: '14px', margin: '0 0 16px 0', lineHeight: '22px' }}>Fill out our form and we will contact you within 24 hours.</p>
            <p style={{ fontSize: '14px', margin: '0 0 16px 0' }}>Emails: customer@exclusive.com</p>
            <p style={{ fontSize: '14px', margin: 0 }}>Emails: support@exclusive.com</p>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div style={{
          flex: '2',
          minWidth: '340px',
          padding: '40px 32px',
          boxShadow: '0 1px 13px rgba(0,0,0,0.05)',
          borderRadius: '4px'
        }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* 3 Top Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <input
                type="text"
                placeholder="Your Name *"
                style={{
                  backgroundColor: '#F5F5F5',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '14px 16px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <input
                type="email"
                placeholder="Your Email *"
                style={{
                  backgroundColor: '#F5F5F5',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '14px 16px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <input
                type="tel"
                placeholder="Your Phone *"
                style={{
                  backgroundColor: '#F5F5F5',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '14px 16px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Textarea */}
            <textarea
              rows={8}
              placeholder="Your Message"
              style={{
                backgroundColor: '#F5F5F5',
                border: 'none',
                borderRadius: '4px',
                padding: '16px',
                fontSize: '14px',
                outline: 'none',
                resize: 'none'
              }}
            ></textarea>

            {/* Send Button */}
            <div style={{ textAlign: 'right' }}>
              <button
                type="button"
                style={{
                  backgroundColor: '#DB4444',
                  color: '#fff',
                  border: 'none',
                  padding: '16px 48px',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}