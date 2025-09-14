/**
 * 🖼️ Programs Page OpenGraph Image
 *
 * 🎯 What does this do?
 * Creates a custom social media preview image for the Programs page
 *
 * 🧒 Kid-Friendly Explanation:
 * This makes a special picture that shows all our different classrooms
 * when someone shares our programs page on social media!
 *
 * 🏗️ Modern Patterns:
 * - Next.js 15.5.2 Dynamic OG Images
 * - Edge Runtime optimization
 * - Program-specific content
 */

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Our Programs - Great Beginnings Day Care';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const programs = [
    { name: 'Infant', age: '6 wks - 15 mo', icon: '👶', color: '#fde68a' },
    { name: 'Toddler', age: '15 mo - 3 yrs', icon: '🧒', color: '#bfdbfe' },
    { name: 'Preschool', age: '3 - 5 yrs', icon: '🎨', color: '#c7d2fe' },
    { name: 'Pre-K', age: '4 - 5 yrs', icon: '📚', color: '#fecaca' },
    { name: 'School Age', age: '5 - 12 yrs', icon: '🎒', color: '#d9f99d' },
  ];

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
          backgroundColor: '#f9fafb',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 200,
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: 10,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            Our Programs
          </h1>
          <p
            style={{
              fontSize: 24,
              color: '#fbbf24',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            Age-Appropriate Learning for Every Stage
          </p>
        </div>

        {/* Programs Grid */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            marginTop: 100,
            padding: '0 40px',
          }}
        >
          {programs.map((program) => (
            <div
              key={program.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderRadius: 20,
                padding: '30px 20px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: `3px solid ${program.color}`,
                minWidth: 180,
              }}
            >
              <span style={{ fontSize: 48, marginBottom: 15 }}>{program.icon}</span>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: 5,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {program.name}
              </h3>
              <span
                style={{
                  fontSize: 16,
                  color: '#6b7280',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {program.age}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 30,
          }}
        >
          <span
            style={{
              fontSize: 20,
              color: '#4b5563',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            📞 (630) 894-3440
          </span>
          <span
            style={{
              fontSize: 20,
              color: '#4b5563',
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
}