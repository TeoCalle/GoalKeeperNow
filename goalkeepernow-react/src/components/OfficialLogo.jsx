import logoImg from '../assets/logo.png'

export function OfficialLogo({ height = 44, showText = true, lightText = false, className = '', style = {} }) {
  return (
    <div 
      className={`official-logo-brand ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        ...style
      }}
    >
      <img
        src={logoImg}
        alt="GoalKeeperNow Logo"
        style={{
          height: `${height}px`,
          width: 'auto',
          maxHeight: `${height}px`,
          borderRadius: '10px',
          objectFit: 'contain',
          boxShadow: '0 3px 10px rgba(0,0,0,0.18)',
          flexShrink: 0,
          transition: 'transform 0.25s ease'
        }}
      />
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, textAlign: 'left' }}>
          <span style={{ 
            fontFamily: "'Oswald', sans-serif", 
            fontWeight: 700, 
            fontSize: `${Math.max(16, height * 0.44)}px`, 
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: lightText ? '#FFFFFF' : 'var(--azul-marino, #1B2028)'
          }}>
            GoalKeeper<span style={{ color: 'var(--dorado, #C6FF3D)' }}>Now</span>
          </span>
          <small style={{ 
            fontSize: `${Math.max(10, height * 0.23)}px`, 
            color: lightText ? '#CBD5E1' : 'var(--texto-suave, #5B6470)', 
            marginTop: '2px',
            fontWeight: 500
          }}>
            Tu arquero cuando lo necesites
          </small>
        </div>
      )}
    </div>
  )
}

export default OfficialLogo
