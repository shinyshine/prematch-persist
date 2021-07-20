import { pluginName, keyPrefix } from './const';
import { local } from './storage'
import * as util from './util';


class Persistor {

    init(options) {
        this.dispatch = {};
        this.keyPrefix = options.keyPrefix || keyPrefix;
        this.storage = options.storage || local;
    }

    bindStore(_store) {
        this.dispatch = _store.dispatch;
    }

    persist(actionPath) {
        const _cacheKey = util.createKey(this.keyPrefix, actionPath);

        this.storage.getItem(_cacheKey).then((dataStr) => {
            const data = util.parseJSON(dataStr);
            this.dispatch({
                type: actionPath,
                payload: data
            })
        })
    }

    flush(flushPath, flushData) {
        this.dispatch[pluginName].flush({
            flushPath,
            flushData
        })

        const _cacheKey = util.createKey(this.keyPrefix, flushPath);
        const flushJson = util.toJSON(flushData);

        targetStorage.setItem(_cacheKey, flushJson);
    }

    purge(purgePath) {
        const _cacheKey = util.createKey(this.keyPrefix, purgePath);
        this.storage.removeItem(_cacheKey)
    }


}


export default new Persistor();