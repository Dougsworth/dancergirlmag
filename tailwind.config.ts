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
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					soft: 'hsl(var(--primary-soft))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					dark: 'hsl(var(--secondary-dark))'
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
				dance: {
					gold: 'hsl(var(--stage-gold))',
					red: 'hsl(var(--dramatic-red))',
					teal: 'hsl(var(--costume-teal))',
					amber: 'hsl(var(--warm-amber))',
					black: 'hsl(var(--theatre-black))',
					cream: 'hsl(var(--spotlight-cream))'
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
				},
				'caribbean-orange': '#FB9E32',
				'caribbean-gold': '#FBC86D',
				'caribbean-coral': '#D26059',
				'caribbean-dark': '#3A151C',
				'caribbean-burgundy': '#81414B',
				fuchsia: {
					DEFAULT: '#D946EF',  
					light: '#F0ABFC',    
					dark: '#A21CAF',     
				},
				'mocha-brown': '#9A5843', 
				'ballet-white': '#FEFEFE',
			},
			fontFamily: {
				// Brand Guide Typography
				'logo': ['Dancing Script', 'cursive'], // Logo Font
				'primary': ['Times New Roman', 'Times', 'serif'], // Primary Font - H1 titles
				'secondary': ['Playfair Display', 'Georgia', 'serif'], // Secondary Font - H2 subheads
				'body': ['Cambria', 'Georgia', 'serif'], // Body Text Font
				'caption': ['Open Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'], // Caption Font
				// Fallback fonts
				sans: ['Cambria', 'Georgia', 'serif'],
				heading: ['Times New Roman', 'Times', 'serif'],
				serif: ['Cambria', 'Georgia', 'serif'],
				// Keep existing for compatibility
				proxima: ['Times New Roman', 'Times', 'serif'],
				raleway: ['Cambria', 'Georgia', 'serif'],
				darlington: ['Dancing Script', 'cursive'],
			},
			backgroundImage: {
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-subtle': 'var(--gradient-subtle)',
				'gradient-accent': 'var(--gradient-accent)',
			},
			boxShadow: {
				'soft': 'var(--shadow-soft)',
				'magazine': 'var(--shadow-magazine)',
				'elegant': 'var(--shadow-elegant)',
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
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-up': 'slide-up 0.8s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
