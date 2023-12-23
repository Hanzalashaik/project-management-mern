function randomString(length) {
    return Array.from({ length }, () =>
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            .charAt(Math.floor(Math.random() * 62))//0 to 61
    ).join('');
}

export default randomString;