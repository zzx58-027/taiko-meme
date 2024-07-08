import type { Config } from 'tailwindcss'

import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'
import TailwindAnimate from 'tailwindcss-animate'

const config = {
  darkMode: ['class'],
  // 项目相关文件夹(Components 等)选择不与 src 平级存放, 根路径下文件众多时不太好看, 中间会夹杂非相关文件.
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    // https://tailwind.nodejs.cn/docs/container
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    // https://tailwind.nodejs.cn/docs/responsive-design
    screens: {
      xs: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px'
    },
    // https://tailwind.nodejs.cn/docs/theme#-6
    // theme.extend 键下的值将与现有 theme 值合并, 并自动成为可供使用的新类.
    extend: {
      fontFamily: {
        // https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css
        Montserrat: ['var(--font-montserrat)'],
        MochiyPopPOne: ['var(--font-mochiy-pop-p-one)'],
        CoveredByYourGrace: ['var(--font-covered-by-your-grace)']
        // Another usage's configuration.
        // Montserrat: 'Montserrat',
        // MochiyPopPOne: 'Mochiy Pop P One',
        // CoveredByYourGrace: 'Covered By Your Grace'
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
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  // https://github.com/egoist/tailwindcss-icons
  plugins: [
    // ..require 需要了解一下.
    // require('tailwindcss-animate'),
    TailwindAnimate,
    iconsPlugin({
      // Select the icon collections you want to use
      // You can also ignore this option to automatically discover all individual icon packages you have installed
      // If you install @iconify/json, you should explicitly specify the collections you want to use, like this:
      collections: getIconCollections(['simple-icons', 'lucide'])
      // Custom Collections
      // collections: {}
      // If you want to use all icons from @iconify/json, you can do this:
      // collections: getIconCollections
    })
  ]
} satisfies Config

export default config
