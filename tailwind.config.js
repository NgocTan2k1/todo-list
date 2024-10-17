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
            backgroundImage: {
                'custom-gradient': 'linear-gradient(45deg, #ff6ec4, #7873f5, #36d1dc, #5b86e5)',
            },
            maxWidth: {
                custom: 'calc(100% - 57px)',
            },
            width: {
                custom: 'calc(100% - 57px)',
            },
        },
    },
    plugins: [],
};
