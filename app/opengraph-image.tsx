/**
 * 🖼️ Dynamic OpenGraph Image Generator
 *
 * 🎯 What does this do?
 * Creates beautiful social media preview images that show when our website is shared
 *
 * 🧒 Kid-Friendly Explanation:
 * When someone shares our website on Facebook or Twitter, this makes a pretty
 * picture that shows up with the link - like a preview of what's inside!
 *
 * 🏗️ Modern Patterns:
 * - Next.js 15.5.2 Image Generation
 * - Dynamic OpenGraph images
 * - Edge Runtime for fast generation
 * - Vercel OG library
 */

import { ImageResponse } from 'next/og';

/**
 * Image configuration
 */
export const runtime = 'edge';
export const alt = 'Great Beginnings Day Care - Where Learning Begins';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

/**
 * Generate OpenGraph image
 */
export default async function Image() {
  try {
    // Fetch font if needed (using default system fonts for now)

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1e40af',
            backgroundImage: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 35px,
                  rgba(255, 255, 255, 0.05) 35px,
                  rgba(255, 255, 255, 0.05) 70px
                )
              `,
            }}
          />

          {/* Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 60,
              textAlign: 'center',
            }}
          >
            {/* Logo/Icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 120,
                height: 120,
                backgroundColor: '#ffffff',
                borderRadius: 60,
                marginBottom: 30,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              }}
            >
              <span style={{ fontSize: 60 }}>🏫</span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: 72,
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: 20,
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              Great Beginnings
            </h1>

            {/* Subtitle */}
            <h2
              style={{
                fontSize: 48,
                fontWeight: 'normal',
                color: '#fbbf24',
                marginBottom: 30,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              Day Care Center
            </h2>

            {/* Tagline */}
            <p
              style={{
                fontSize: 28,
                color: '#ffffff',
                opacity: 0.9,
                marginBottom: 40,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              Where Learning Begins with Love & Laughter
            </p>

            {/* Features */}
            <div
              style={{
                display: 'flex',
                gap: 30,
                marginTop: 20,
              }}
            >
              {['6 Weeks - 12 Years', 'Roselle, IL', 'Est. 2014'].map((feature) => (
                <div
                  key={feature}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    padding: '12px 24px',
                    borderRadius: 30,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 20,
                      color: '#ffffff',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 60px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span
              style={{
                fontSize: 22,
                color: '#ffffff',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              📞 (630) 894-3440
            </span>
            <span
              style={{
                fontSize: 22,
                color: '#ffffff',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              greatbeginningsdaycare.com
            </span>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (e: any) {
    console.error('OpenGraph image generation failed:', e);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}