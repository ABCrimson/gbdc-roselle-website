/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Tailwind CSS 4.0 with Lightning CSS
    '@tailwindcss/postcss': {},
    
    // Autoprefixer for browser compatibility
    'autoprefixer': {},
    
    // CSS nano for production optimization
    ...(process.env.NODE_ENV === 'production' ? { 
      'cssnano': {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }]
      }
    } : {})
  },
};

export default config;