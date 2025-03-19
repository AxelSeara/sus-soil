export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			brown: {
  				'20': 'rgba(94, 49, 25, 0.2)',
  				'40': 'rgba(94, 49, 25, 0.4)',
  				'60': 'rgba(94, 49, 25, 0.6)',
  				'80': 'rgba(94, 49, 25, 0.8)',
  				DEFAULT: '#5e3319'
			},
  			darkGreen: {
  				'20': 'rgba(110, 187, 120, 0.2)',
  				'40': 'rgba(110, 187, 120, 0.4)',
  				'60': 'rgba(110, 187, 120, 0.6)',
  				'80': 'rgba(110, 187, 120, 0.8)',
  				DEFAULT: '#6EBB78'
  			},
  			green: {
  				'20': 'rgba(137, 195, 123, 0.2)',
  				'40': 'rgba(137, 195, 123, 0.4)',
  				'60': 'rgba(137, 195, 123, 0.6)',
  				'80': 'rgba(137, 195, 123, 0.8)',
  				DEFAULT: '#89C37B'
  			},
  			lightGreen: {
  				'20': 'rgba(176, 211, 146, 0.2)',
  				'40': 'rgba(176, 211, 146, 0.4)',
  				'60': 'rgba(176, 211, 146, 0.6)',
  				'80': 'rgba(176, 211, 146, 0.8)',
  				DEFAULT: '#B0D392'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
			'pattern-bg': "url('/pattern.svg')"
  		},
  		fontFamily: {
  			serif: [
  				'Merriweather',
  				'serif'
  			]
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					h1: {
  						fontSize: '2.5rem',
  						fontWeight: '700',
  						lineHeight: '1.2'
  					},
  					h2: {
  						fontSize: '2rem',
  						fontWeight: '600',
  						lineHeight: '1.3'
  					},
  					h3: {
  						fontSize: '1.75rem',
  						fontWeight: '500',
  						lineHeight: '1.4'
  					},
  					h4: {
  						fontSize: '1.5rem',
  						fontWeight: '500',
  						lineHeight: '1.5'
  					},
  					body: {
  						fontSize: '1rem',
  						fontWeight: '400',
  						lineHeight: '1.6'
  					},
  					caption: {
  						fontSize: '0.875rem',
  						fontWeight: '300',
  						lineHeight: '1.4'
  					}
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    require('@tailwindcss/typography'),
      require("tailwindcss-animate")
],
};
