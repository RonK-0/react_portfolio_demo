/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
export default {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'selector',
  theme: {
    extend: {
      screens: {
        // 'sm': '640px',
        // 'md': '768px',
        // 'lg': '1024px',
        // 'xl': '1280px',
        // '2xl': '1536px',
      },
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        content: 'rgb(var(--content) / <alpha-value>)',
        line:'rgb(var(--line) / <alpha-value>)',
        alert:'rgb(var(--alert) / <alpha-value>)',
        cancel:'rgb(var(--cancel) / <alpha-value>)',
        info:'rgb(var(--info) / <alpha-value>)',
        warning:'rgb(var(--warning) / <alpha-value>)',
      },

      // backgroundColor: {
      //   primary: 'rgb(var(--primary) / <alpha-value>)',
      //   secondary: 'rgb(var(--secondary) / <alpha-value>)',
      //   accent: 'rgb(var(--accent) / <alpha-value>)',
      //   content: 'rgb(var(--content) / <alpha-value>)',
      //   line:'rgb(var(--line) / <alpha-value>)'
      // },

      // fill: {
      //   primary: 'rgb(var(--primary) / <alpha-value>)',
      //   secondary: 'rgb(var(--secondary) / <alpha-value>)',
      //   accent: 'rgb(var(--accent) / <alpha-value>)',
      //   content: 'rgb(var(--content) / <alpha-value>)',
      //   line:'rgb(var(--line) / <alpha-value>)'
      // },
      
      backgroundImage:{
        // transparent_bg: "url('../dist/img/transparent.png')",
        // down_arrow: `url('data:image/svg+xml,<svg fill="%23000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs/><polygon style="fill-rule: evenodd; clip-rule: evenodd; fill: rgb(171, 171, 171); transform-origin: 12px 11.999px;" points="1.066 4.954 22.934 4.954 12.001 19.046"/></svg>')`,
      },
      backgroundSize: {
        // auto: 'auto',
        // cover: 'cover',
        // contain: 'contain',
        // '400%': '400% 400%'
      },
      aspectRatio: {
        // auto: 'auto',
        // square: '1 / 1',
        // video: '16 / 9',
      },
      gridTemplateColumns: {
        // 'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
        'auto-fill': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      fontFamily: {
        // 'text-inter': ["Inter", "sans-serif"],
        regular: ["Roboto Regular", "Helvetica", "Arial", "sans-serif"],
        thick: ["Roboto Medium", "Helvetica", "Arial", "sans-serif"],
        thicker: ["Roboto Bold", "Helvetica", "Arial", "sans-serif"]
      },
      fontSize: {
        // 'button' : 'clamp(16px, 1vw, 24px) !important',
      },
      listStyleType: {
      //   none: 'none',
      //   circle: 'circle',
      //   disc: 'disc',
      //   decimal: 'decimal',
      //   square: 'square',
      //   roman: 'upper-roman',
      },
      animation: {
        // 'bannerSlide': 'bannerSlide 15s ease forwards',
        // 'onCheck': 'onCheck 0.2s ease',
        'rotate': "rotate 2s linear infinite",
        'loading' : "loading 1.5s ease-in infinite",
        'logo_spinno' : "wiggle 2s ease-in-out infinite",
      },
      keyframes: {
        // better to use direct CSS keyframes on input file base
        // 'bannerSlide': {
        //   '0%' : {'background-position': '25% 0%'},
        //   '100%' : {'background-position': '40% 80%'}
        // },
        'rotate' : {
          "100%" : {"transform":"rotate(360deg)"}
        },
        "loading": {
            "0%" : { "transform": "translateX(-100%)" },
          "100%" : { "transform": "translateX(100%)" },
        },
        "wiggle": {
            // "0%" : { "transform": "rotate(0deg) translateY(-20px) translateX(-15px)" },
            // "25%" : { "transform": "rotate(-10deg) translateY(20px) translateX(15px)" },
            // "50%" : { "transform": "rotate(5deg) translateY(20px) translateX(10px)" },
            // "75%" : { "transform": "rotate(-15deg) translateY(20px) translateX(15px)" },
            // "100%" : { "transform": "rotate(0deg) translateY(-20px) translateX(-15px)" },

            "0%" : { "transform": "translate(-50%, -50%);", "opacity": "0" },
            "50%" : { "transform": "translate(50%, 50%)", "opacity": "0" },
            "100%" : { "transform": "translate(150%, 150%);", "opacity": "0" },
        },

      },
      boxShadow:{
        // 'top_button_shadow'     : '4px 4px 10px rgba(15, 15, 15, 0.2)',
      },
      dropShadow:{
        // 'top_button_shadow'     : '4px 4px 10px rgba(0, 0, 0, 0.2)',
        
      },
      textShadow: {
        sm: '1px 1px 2px var(--tw-shadow-color)',
        DEFAULT: '2px 2px 4px var(--tw-shadow-color)',
        lg: '4px 4px 8px var(--tw-shadow-color)',
        xl: '4px 4px 16px var(--tw-shadow-color)',
        top_num_shadow: "2px 2px 0 #888,-2px -2px 0 #888, 2px -2px 0 #888, -2px 2px 0 #888, 2px 2px 0 #888;"
      },
      padding:{
        // 'container_p' : 'calc(1.5rem * 0.5)',
        // 'propertySolution_p' : 'clamp(40px, 3.3vw, 90px) clamp(24px, 1.66vw, 48px)',
      },
      margin:{
        // 'heading_margin_bottom' : 'clamp(32px, 2.5vw, 64px)',
      },
      width:{
        // 'bannerSlider_card_bg' : 'calc(100% + calc(1.5 * calc(1.5rem * 0.5)))',
        // 'tel_icon' : 'clamp(24px, 10vw, 38px)',
        15: "3.75rem",
        18: "4.5rem"
      },
      maxWidth:{
        // 'bannerSlider_card_bg' : 'calc(85% + calc(1.5rem * 0.5))',
      },
      height:{
        // 'insidePageBanner' : 'clamp(350px, 26.042vw, 600px)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}

