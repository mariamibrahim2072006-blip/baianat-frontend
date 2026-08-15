export default function Categories() {
  const categories = [
    {
      id: 1,
      name: 'Phones',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      ),
      active: false
    },
    {
      id: 2,
      name: 'Computers',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      active: false
    },
    {
      id: 3,
      name: 'SmartWatch',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="7" width="12" height="10" rx="2"></rect>
          <polyline points="9 23 9 17 15 17 15 23"></polyline>
          <polyline points="9 1 9 7 15 7 15 1"></polyline>
        </svg>
      ),
      active: false
    },
    {
      id: 4,
      name: 'Camera',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
          <circle cx="12" cy="13" r="4"></circle>
        </svg>
      ),
      active: true // Active State (اللون الأحمر زي الفيجما)
    },
    {
      id: 5,
      name: 'HeadPhones',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      ),
      active: false
    },
    {
      id: 6,
      name: 'Gaming',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" y1="12" x2="10" y2="12"></line>
          <line x1="8" y1="10" x2="8" y2="14"></line>
          <line x1="15" y1="13" x2="15.01" y2="13"></line>
          <line x1="18" y1="11" x2="18.01" y2="11"></line>
          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
        </svg>
      ),
      active: false
    }
  ];

  return (
    <div style={{ marginTop: '80px', borderBottom: '1px solid #e5e5e5', paddingBottom: '70px' }}>
      {/* Red Tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '20px', height: '40px', backgroundColor: '#DB4444', borderRadius: '4px' }}></div>
        <span style={{ color: '#DB4444', fontWeight: '600', fontSize: '16px' }}>Categories</span>
      </div>

      {/* Header & Arrows */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', marginBottom: '50px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '600', margin: 0 }}>Browse By Category</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ width: '46px', height: '46px', borderRadius: '50%', border: 'none', backgroundColor: '#F5F5F5', cursor: 'pointer', fontSize: '18px' }}>&larr;</button>
          <button style={{ width: '46px', height: '46px', borderRadius: '50%', border: 'none', backgroundColor: '#F5F5F5', cursor: 'pointer', fontSize: '18px' }}>&rarr;</button>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '30px'
      }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            style={{
              height: '145px',
              border: cat.active ? 'none' : '1px solid rgba(0, 0, 0, 0.3)',
              borderRadius: '4px',
              backgroundColor: cat.active ? '#DB4444' : 'transparent',
              color: cat.active ? '#fff' : '#000',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div>{cat.icon}</div>
            <span style={{ fontSize: '16px', fontWeight: '400' }}>{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}