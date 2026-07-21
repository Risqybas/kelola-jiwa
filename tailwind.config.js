// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8ba88e',
          container: '#dce6dd',
          on: '#ffffff',
        },
        surface: {
          DEFAULT: '#fbf9f5',
          dim: '#dbdad6',
          container: {
            lowest: '#ffffff',
            low: '#f5f3ef',
            DEFAULT: '#efedeb',
            high: '#e9e7e5',
            highest: '#e4e2e0',
          },
        },
        secondary: {
          DEFAULT: '#55624c',
          container: '#d9e7cb',
        },
        error: '#ba1a1a',
        'error-container': '#f9ebea',
        'on-error-container': '#410002',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        headline: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        '8': '8px',
      },
      boxShadow: {
        'soft-elevation': '0 20px 20px -5px rgba(74,101,78,0.08)',
      },
    },
  },
}