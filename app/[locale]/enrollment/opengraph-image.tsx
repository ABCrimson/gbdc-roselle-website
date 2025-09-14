/**
 * 🖼️ Enrollment Page OpenGraph Image
 *
 * 🎯 What does this do?
 * Creates a custom social media preview image for the Enrollment page
 *
 * 🧒 Kid-Friendly Explanation:
 * This makes a special "Join Us!" picture that shows when someone
 * shares our enrollment page - like an invitation card!
 *
 * 🏗️ Modern Patterns:
 * - Next.js 15.5.2 Dynamic OG Images
 * - Edge Runtime optimization
 * - Call-to-action focused
 */

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Enroll Now - Great Beginnings Day Care';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)',
          position: 'relative',
        }}
      >
        {/* Pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 50px,
                rgba(255, 255, 255, 0.1) 50px,
                rgba(255, 255, 255, 0.1) 100px
              )
            `,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 60,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              backgroundColor: '#1e40af',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: 30,
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 30,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            NOW ENROLLING 2025-2026
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: 20,
              textAlign: 'center',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: 1.1,
            }}
          >
            Begin Your Child's
            <br />
            Journey Today
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 28,
              color: '#374151',
              marginBottom: 40,
              textAlign: 'center',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            Limited Spots Available • Ages 6 Weeks - 12 Years
          </p>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: 40,
              marginBottom: 40,
            }}
          >
            {[
              '✅ Licensed & Accredited',
              '✅ Experienced Educators',
              '✅ Flexible Scheduling',
            ].map((feature) => (
              <span
                key={feature}
                style={{
                  fontSize: 20,
                  color: '#1f2937',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {feature}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <div
            style={{
              backgroundColor: '#1e40af',
              color: '#ffffff',
              padding: '20px 48px',
              borderRadius: 12,
              fontSize: 32,
              fontWeight: 'bold',
              boxShadow: '0 10px 30px rgba(30, 64, 175, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            <span>📝</span>
            <span>Start Application</span>
          </div>

          {/* Contact */}
          <div
            style={{
              marginTop: 30,
              display: 'flex',
              gap: 20,
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: 22,
                color: '#4b5563',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              📞 (630) 894-3440
            </span>
            <span
              style={{
                fontSize: 22,
                color: '#9ca3af',
              }}
            >
              •
            </span>
            <span
              style={{
                fontSize: 22,
                color: '#4b5563',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              greatbeginningsdaycare.com
            </span>
          </div>
        </div>

        {/* Logo watermark */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            width: 80,
            height: 80,
            backgroundColor: '#ffffff',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <span style={{ fontSize: 40 }}>🏫</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}