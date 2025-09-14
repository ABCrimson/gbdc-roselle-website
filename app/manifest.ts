/**
 * 📱 Progressive Web App Manifest Generator
 *
 * 🎯 What does this do?
 * Creates a web app manifest that allows the website to be installed as an app on phones and computers
 *
 * 🧒 Kid-Friendly Explanation:
 * This makes our website work like a real app on phones - with its own icon
 * and everything, so parents can add it to their home screen!
 *
 * 🏗️ Modern Patterns:
 * - Next.js 15.5.2 Metadata API
 * - PWA configuration
 * - Dynamic icon generation
 * - Theme customization
 */

import { MetadataRoute } from 'next';

/**
 * Generate PWA manifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Great Beginnings Day Care - Roselle, IL',
    short_name: 'GBDC Roselle',
    description: 'Premier childcare and early education center in Roselle, Illinois. Nurturing children aged 6 weeks to 12 years with love, learning, and laughter.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af', // Primary blue color
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    dir: 'ltr',
    categories: [
      'education',
      'kids',
      'lifestyle',
    ],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/home-mobile.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Homepage on mobile',
      },
      {
        src: '/screenshots/programs-mobile.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Programs page on mobile',
      },
      {
        src: '/screenshots/home-desktop.png',
        sizes: '1920x1080',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Homepage on desktop',
      },
    ],
    shortcuts: [
      {
        name: 'Enrollment',
        short_name: 'Enroll',
        description: 'Enroll your child at GBDC',
        url: '/enrollment',
        icons: [
          {
            src: '/shortcuts/enrollment.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Contact Us',
        short_name: 'Contact',
        description: 'Get in touch with Great Beginnings',
        url: '/contact',
        icons: [
          {
            src: '/shortcuts/contact.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Parent Portal',
        short_name: 'Portal',
        description: 'Access the parent portal',
        url: '/portal',
        icons: [
          {
            src: '/shortcuts/portal.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Programs',
        short_name: 'Programs',
        description: 'View our childcare programs',
        url: '/programs',
        icons: [
          {
            src: '/shortcuts/programs.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
    ],
    related_applications: [
      {
        platform: 'webapp',
        url: 'https://greatbeginningsdaycare.com',
      },
    ],
    prefer_related_applications: false,
    iarc_rating_id: 'e84b0d3a-8e4b-47de-b6aa-4e5f5a4e3c99', // Example ID
    display_override: [
      'window-controls-overlay',
      'standalone',
      'browser',
    ],
    edge_side_panel: {
      preferred_width: 400,
    },
    handle_links: 'preferred',
    launch_handler: {
      client_mode: ['navigate-existing', 'auto'],
    },
    file_handlers: [
      {
        action: '/portal/documents',
        accept: {
          'application/pdf': ['.pdf'],
          'image/*': ['.jpg', '.jpeg', '.png'],
        },
      },
    ],
    protocol_handlers: [
      {
        protocol: 'mailto',
        url: '/contact?email=%s',
      },
      {
        protocol: 'tel',
        url: '/contact?phone=%s',
      },
    ],
    share_target: {
      action: '/share',
      method: 'POST',
      enctype: 'multipart/form-data',
      params: {
        title: 'title',
        text: 'text',
        url: 'url',
        files: [
          {
            name: 'image',
            accept: ['image/*'],
          },
        ],
      },
    },
  };
}