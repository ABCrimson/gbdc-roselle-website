/**
 * 🐦 Twitter Card Image Generator
 *
 * 🎯 What does this do?
 * Creates optimized preview images specifically for Twitter/X sharing
 *
 * 🧒 Kid-Friendly Explanation:
 * This makes a special picture just for Twitter that looks perfect when
 * someone tweets about our daycare - like a mini poster!
 *
 * 🏗️ Modern Patterns:
 * - Next.js 15.5.2 Image Generation
 * - Twitter Card optimization
 * - Edge Runtime
 * - Dynamic content
 */

import { ImageResponse } from 'next/og';

/**
 * Image configuration (Twitter prefers 2:1 ratio)
 */
export const runtime = 'edge';
export const alt = 'Great Beginnings Day Care - Premier Childcare in Roselle, IL';
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = 'image/png';

/**
 * Generate Twitter Card image
 */
export default async function Image() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            position: 'relative',
          }}
        >
          {/* Left Side - Content */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '60px',
              backgroundColor: '#f3f4f6',
            }}
          >
            {/* Icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 30,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#1e40af',
                  borderRadius: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 20,
                }}
              >
                <span style={{ fontSize: 40 }}>🏫</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: '#6b7280',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                  }}
                >
                  Since 2014
                </span>
                <span
                  style={{
                    fontSize: 18,
                    color: '#1e40af',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontWeight: 'bold',
                  }}
                >
                  Roselle, Illinois
                </span>
              </div>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: 56,
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: 20,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                lineHeight: 1.1,
              }}
            >
              Great Beginnings
              <br />
              Day Care
            </h1>

            {/* Tagline */}
            <p
              style={{
                fontSize: 24,
                color: '#4b5563',
                marginBottom: 30,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              Where Learning Begins
            </p>

            {/* Features */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {[
                '✅ Ages 6 Weeks to 12 Years',
                '✅ Licensed & Accredited',
                '✅ Experienced Educators',
              ].map((feature) => (
                <span
                  key={feature}
                  style={{
                    fontSize: 18,
                    color: '#374151',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side - Visual */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1e40af',
              backgroundImage: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative circles */}
            <div
              style={{
                position: 'absolute',
                width: 400,
                height: 400,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                top: -100,
                right: -100,
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: 300,
                height: 300,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                bottom: -50,
                left: -50,
              }}
            />

            {/* Call to Action */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 20,
                zIndex: 1,
              }}
            >
              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '20px 40px',
                  borderRadius: 50,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                }}
              >
                <span style={{ fontSize: 24 }}>📞</span>
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: '#1e40af',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  (630) 894-3440
                </span>
              </div>

              <span
                style={{
                  fontSize: 20,
                  color: '#ffffff',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                Enroll Today!
              </span>
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (e: any) {
    console.error('Twitter image generation failed:', e);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}