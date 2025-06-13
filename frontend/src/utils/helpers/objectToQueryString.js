export function objectToQueryString(obj) {
    const params = [];

    for (const key in obj) {
        const value = obj[key];

        if (Array.isArray(value)) {
            value.forEach(v => {
                if (v) params.push(`${key}=${encodeURIComponent(v)}`);
            });
        } else if (typeof value === 'object' && value !== null) {
            for (const subKey in value) {
                const subVal = value[subKey];
                if (subVal !== undefined && subVal !== null && subVal !== '') {
                    params.push(`${key}[${subKey}]=${encodeURIComponent(subVal)}`);
                }
            }
        } else if (value !== undefined && value !== null && value !== '') {
            params.push(`${key}=${encodeURIComponent(value)}`);
        }
    }

    return params.join('&');
}
