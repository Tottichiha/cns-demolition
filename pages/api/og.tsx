import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const config = { runtime: 'edge' };

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title') || 'Demolition Contractor in Southern California';
  const subtitle = searchParams.get('sub') || 'Licensed · Insured · Free Estimates';
  const type = searchParams.get('type') || 'page'; // 'city', 'blog', 'service', 'home', 'page'

  // Accent color per content type
  const accent = type === 'city' ? '#f97316' : type === 'blog' ? '#f97316' : '#f97316';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#1a1a2e',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              backgroundColor: accent,
              color: 'white',
              fontWeight: 900,
              fontSize: '28px',
              padding: '6px 16px',
              borderRadius: '6px',
            }}
          >
            C&S
          </div>
          <span style={{ color: 'white', fontSize: '24px', fontWeight: 700 }}>Demolition</span>
          <span style={{ color: '#9ca3af', fontSize: '16px', marginLeft: '8px' }}>CA Lic #1126325</span>
        </div>

        {/* Main title */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingTop: '30px', paddingBottom: '30px' }}>
          <h1
            style={{
              color: 'white',
              fontSize: title.length > 60 ? '42px' : title.length > 40 ? '50px' : '58px',
              fontWeight: 900,
              lineHeight: 1.15,
              margin: 0,
              maxWidth: '1000px',
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `3px solid ${accent}`,
            paddingTop: '20px',
          }}
        >
          <span style={{ color: '#9ca3af', fontSize: '18px' }}>{subtitle}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                backgroundColor: accent,
                color: 'white',
                fontWeight: 700,
                fontSize: '18px',
                padding: '8px 20px',
                borderRadius: '6px',
              }}
            >
              (562) 204-6335
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
