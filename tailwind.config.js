import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.75',
            fontSize: '1.125rem',
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            h1: {
              fontSize: '2.25rem',
              fontWeight: '700',
              lineHeight: '1.2',
              marginTop: '0',
              marginBottom: '0.8em',
            },
            h2: {
              fontSize: '1.875rem',
              fontWeight: '600',
              lineHeight: '1.3',
              marginTop: '2em',
              marginBottom: '1em',
            },
            h3: {
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '1.4',
              marginTop: '1.6em',
              marginBottom: '0.8em',
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftWidth: '4px',
              borderLeftColor: '#e5e7eb',
              paddingLeft: '1.5rem',
              marginLeft: '0',
              marginRight: '0',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              fontSize: '0.875em',
              fontWeight: '600',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#f9fafb',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              fontSize: '0.875em',
              lineHeight: '1.7',
              overflow: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
            },
            img: {
              borderRadius: '0.5rem',
              margin: '2rem auto',
            },
            a: {
              color: '#059669',
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': {
                color: '#047857',
              },
            },
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      colors: {
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [typography],
}
