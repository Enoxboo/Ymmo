window.tailwindColors = {
    indigo: '#002446',
    amber: '#dfa408',
    snow: '#F9FAFA'
};

if (window.tailwind) {
    window.tailwind.config = {
        theme: {
            extend: {
                colors: window.tailwindColors
            }
        }
    };
}