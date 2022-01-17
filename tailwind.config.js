module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",    
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': {
          100: '#D4EAE7',
          900: '#28978A',
          800: '#3D403F',
        },
        'gray': {
          400: '#C4C4C4',
          600: '#565656',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
