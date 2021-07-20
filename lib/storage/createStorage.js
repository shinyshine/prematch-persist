
export default function createStorage(type = 'local', _mergeStorage = {}) {
    const storage = window[`${type}Storage`];

    return {
        getItem: key => new Promise((resolve, reject) => {
            resolve(storage.getItem(key))
        }),

        setItem: (key, string) => new Promise((resolve, reject) => {
            resolve(storage.setItem(key, string))
        }),

        removeItem: key => new Promise((resolve, reject) => {
            resolve(storage.removeItem(key))
        }),
        ..._mergeStorage
    }
}