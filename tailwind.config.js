/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nav-background': '#202939',
        'primary-dashboard': '#202939',
        'primary-b-dashboard': '#4B5565',
        'strip-dashboard': '#202939',
        'bck-dashboard': 'white',
        'bck-dashboard-b': '#F7F8FA',
        'text-label-dashboard': '#16a34a',
        'strip2-dashboard': '#F0F0F0',
        'strip2text-dashboard': 'black',
      }
    },
  },
  plugins: [],
}
