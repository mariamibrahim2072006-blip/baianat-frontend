export default function TopHeader() {
  return (
    <div style={{
      backgroundColor: '#000',
      color: '#fff',
      fontSize: '14px',
      padding: '10px 5%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ flex: 1, textAlign: 'center' }}>
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        <a href="#" style={{ color: '#fff', fontWeight: 'bold', marginLeft: '8px', textDecoration: 'underline' }}>
          ShopNow
        </a>
      </div>
      <div style={{ fontWeight: '500', cursor: 'default' }}>
        English
      </div>
    </div>
  );
}