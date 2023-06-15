/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./assets/**/*.js",
        "./assets/**/*.vue",
        "./templates/**/*.html.twig",
    ],
    prefix: "tw-",
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                'white': '#ffffff',
                'purple': '#3f3cbb',
                'green-darker': '#0f5b01',
                'green-dark': '#27ae60',
                'green-light': '#2ecc71',
                'green-dark-transparent': '#27ae5f6d',
                'yellow-darker': '#df7a0e',
                'yellow-dark-transparent': '#f39d1258',
                'yellow-dark': '#f39c12',
                'yellow-light': '#f1c40f',
            },
        },
    },
    plugins: [
        require('tailwindcss-animated'),
        require('tailwindcss-animate'),
    ],
}
