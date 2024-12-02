import React from 'react'

const Footer = ({trip}) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px', borderRadius: '10px' }} className='my-7'>
    <h2 style={{ fontSize: '24px', color: '#333', fontWeight: 'bold' }}>
      Thank You for Visiting Our Website!
    </h2>
    <p style={{ fontSize: '18px', color: '#555' }}>
      We hope you had a great experience, {trip.userName}.
    </p>
    <p style={{ fontSize: '16px', color: '#888' }}>
      Feel free to explore more or reach out to us anytime!
    </p>
  </div>
  
  )
}

export default Footer