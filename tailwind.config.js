/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{html,jsx,js,tsx,ts}'],
    theme: {
        extend: {
            justifyContent: {
                initial: 'initial',
            },
            flex: {
                0: '0',
                full: '1',
            },
        },
    },
    plugins: [],
};
