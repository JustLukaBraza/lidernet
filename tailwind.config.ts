import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
				'tv-sm': '1920px',
				'tv-md': '2560px',
				'tv-lg': '3840px',
			}
		},
		extend: {
			screens: {
				'tv-xl': '5120px',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			fontSize: {
				'tv-xs': ['0.75rem', { lineHeight: '1rem' }],
				'tv-sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'tv-base': ['1rem', { lineHeight: '1.5rem' }],
				'tv-lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'tv-xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'tv-2xl': ['1.5rem', { lineHeight: '2rem' }],
				'tv-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'tv-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'tv-5xl': ['3rem', { lineHeight: '1' }],
				'tv-6xl': ['3.75rem', { lineHeight: '1' }],
				'tv-7xl': ['4.5rem', { lineHeight: '1' }],
				'tv-8xl': ['6rem', { lineHeight: '1' }],
				'tv-9xl': ['8rem', { lineHeight: '1' }],
			},
			spacing: {
				'tv-1': '0.25rem',
				'tv-2': '0.5rem',
				'tv-3': '0.75rem',
				'tv-4': '1rem',
				'tv-5': '1.25rem',
				'tv-6': '1.5rem',
				'tv-8': '2rem',
				'tv-10': '2.5rem',
				'tv-12': '3rem',
				'tv-16': '4rem',
				'tv-20': '5rem',
				'tv-24': '6rem',
				'tv-32': '8rem',
				'tv-40': '10rem',
				'tv-48': '12rem',
				'tv-56': '14rem',
				'tv-64': '16rem',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
