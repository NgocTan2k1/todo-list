/** @type {import('tailwindcss').Config} */

module.exports = {
    // mode: 'jit',
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
            backgroundImage: {
                'custom-gradient': 'linear-gradient(45deg, #ff6ec4, #7873f5, #36d1dc, #5b86e5)',
            },
            fontWeight: {
                normal: '400',
            },
            fontSize: {
                normal: '1.6rem',
            },
            colors: {
                pending: '#FBFF00',
                done: '#49FF00',
                fail: '#FF0000',
                important: '#FF9300',
            },
        },
    },
    plugins: [],
};
