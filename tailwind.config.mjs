/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,md}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#1d4ed8',
              '&:hover': {
                color: '#1e3a8a',
              },
            },
            blockquote: {
              borderLeftColor: '#d1d5db',
              color: '#4b5563',
            },
            code: {
              backgroundColor: '#f3f4f6',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            strong: {
              color: '#111827',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
