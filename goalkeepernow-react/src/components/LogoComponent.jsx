import React from 'react'

export function GoalkeeperLogo({ height = 48, showText = true, className = '', lightText = false, vertical = false }) {
  return (
    <div 
      className={`goalkeeper-logo-wrapper ${className}`} 
      style={{ 
        display: 'inline-flex', 
        flexDirection: vertical ? 'column' : 'row',
        alignItems: 'center', 
        gap: vertical ? '8px' : '12px' 
      }}
    >
      <svg viewBox="0 0 500 360" height={height} style={{ width: 'auto', height: `${height}px`, flexShrink: 0 }}>
        <defs>
          <filter id="logoGlowComp" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.25"/>
          </filter>
        </defs>
        <g filter="url(#logoGlowComp)">
          {/* Ball Outer Gold Circle */}
          <circle cx="250" cy="115" r="46" fill="#111827" stroke="#F5B041" strokeWidth="12"/>
          <circle cx="250" cy="115" r="40" fill="#FFFFFF"/>
          
          {/* Soccer Ball Hexagons / Pattern */}
          <polygon points="250,96 264,106 259,122 241,122 236,106" fill="#111827"/>
          <polygon points="250,96 236,106 220,100 216,84 233,78" fill="#111827"/>
          <polygon points="250,96 264,106 280,100 284,84 267,78" fill="#111827"/>
          <polygon points="259,122 241,122 236,138 250,148 264,138" fill="#111827"/>
          <polygon points="264,106 280,100 290,113 285,130 264,122" fill="#111827" opacity="0.9"/>
          <polygon points="236,106 220,100 210,113 215,130 236,122" fill="#111827" opacity="0.9"/>

          {/* Outer Thick Gold Outline of Goalkeeper */}
          <path d="M 215 345 L 140 270 C 130 250 135 220 160 170 L 170 145 C 173 138 182 135 188 140 C 192 143 192 150 188 158 L 180 175 L 195 145 C 198 138 206 137 212 142 C 215 145 215 152 210 162 L 200 182 L 217 155 C 221 149 229 148 234 154 C 238 158 237 165 231 175 L 222 195 L 235 180 C 240 174 248 175 252 181 C 255 186 253 193 245 203 L 220 232 C 210 244 210 255 215 270 C 220 285 280 285 285 270 C 290 255 290 244 280 232 L 255 203 C 247 193 245 186 248 181 C 252 175 260 174 265 180 L 278 195 L 269 175 C 263 165 262 158 266 154 C 271 148 279 149 283 155 L 300 182 L 290 162 C 285 152 285 145 288 142 C 294 137 302 138 305 145 L 320 175 L 312 158 C 308 150 308 143 312 140 C 318 135 327 138 330 145 L 340 170 C 365 220 370 250 360 270 L 285 345 Z" 
                fill="#F5B041" stroke="#F5B041" strokeWidth="14" strokeLinejoin="round" strokeLinecap="round"/>

          {/* Goalkeeper Torso (Red/Burgundy) */}
          <path d="M 215 345 L 152 268 C 146 250 152 230 172 190 L 205 240 C 210 258 215 275 230 285 L 250 292 L 270 285 C 285 275 290 258 295 240 L 328 190 C 348 230 354 250 348 268 L 285 345 Z" 
                fill="#942A2F"/>

          {/* Head / Neck Hole Silhouette (Dark Burgundy Collar) */}
          <path d="M 220 268 C 210 240 225 210 250 210 C 275 210 290 240 280 268 C 272 280 262 288 250 288 C 238 288 228 280 220 268 Z" fill="#942A2F"/>

          {/* Yellow Gloves Layer */}
          <path d="M 152 205 C 146 190 155 170 175 148 C 190 138 215 140 228 152 C 238 162 242 180 230 200 C 218 215 195 220 178 218 Z" fill="#F5B041"/>
          <path d="M 348 205 C 354 190 345 170 325 148 C 310 138 285 140 272 152 C 262 162 258 180 270 200 C 282 215 305 220 322 218 Z" fill="#F5B041"/>
        </g>
      </svg>
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: vertical ? 'center' : 'left', lineHeight: 1.1 }}>
          <span style={{ 
            fontFamily: "'Oswald', sans-serif", 
            fontWeight: 700, 
            fontSize: vertical ? `${height * 0.5}px` : `${height * 0.45}px`, 
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: lightText ? '#FFFFFF' : 'var(--azul-marino, #1B2028)'
          }}>
            GoalKeeper<span style={{ color: '#F5B041' }}>Now</span>
          </span>
          <small style={{ 
            fontSize: vertical ? `${height * 0.26}px` : `${height * 0.24}px`, 
            color: lightText ? 'rgba(255,255,255,0.75)' : '#5B6470', 
            marginTop: '3px',
            fontWeight: 500
          }}>
            Tu arquero cuando lo necesites
          </small>
        </div>
      )}
    </div>
  )
}

export default GoalkeeperLogo
