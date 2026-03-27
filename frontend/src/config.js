window.tailwindColors = {
    indigo: '#1A1A2E',
    amber: '#DFA408',
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