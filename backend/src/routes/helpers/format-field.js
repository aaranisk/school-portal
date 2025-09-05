const formatField = (field) => {
    const words = field.replace(/([A-Z])/g, ' $1').split(' ');

    return words.map((word, idx) => {
        if (idx === 0) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        return word.toLowerCase();
    }).join(' ');
}

export default formatField