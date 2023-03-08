module.exports = {
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
        require('tw-elements/dist/plugin')
    ],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./index.html",
    ],
    theme: {
        colors: {
            'bg-primary': `var(${'--color-bg-primary'})`,
            'bg-secondary': `var(${'--color-bg-secondary'})`,
            'bg-tertiary': `var(${'--color-bg-tertiary'})`,
            'bg-extra': `var(${'--color-bg-extra'})`,
            't-primary': `var(${'--color-text-primary'})`,
            't-secondary': `var(${'--color-text-secondary'})`,
            't-tertiary': `var(${'--color-text-tertiary'})`,
            't-hover': `var(${'--color-text-hover'})`,
        },
        fontFamily: {
            'ff-primary': `var(${'--font-family-primary'})`,
        },
        fontSize: {
            'fs-heading': "20px",
            'fs-primary': "15px",
        },
    }
}