export function parseJSON(srcStr) {
    return source ? JSON.parse(srcStr) : {}
}


export function toJSON(srcObj) {
    return JSON.stringify(srcObj)
}

export const createKey = (prefix, path) => `${prefix}${path}`;