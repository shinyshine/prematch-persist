import { pluginName } from "./const";
import persistor from './persistor';


/**
 * 
 * @param {*} options 
 * manualPersist : 默认自动读缓存，可切换手动persist
 * storage
 * keyPrefix
 * 
 * @param {Array<string>} options.blacklist
 * @param {Array<string>} options.whitelist
 */
export default function initPersist(options = {}) {
    // const persistor = new Persistor(options);
    persistor.init(options)
    const { whitelist, blacklist, manualPersist } = options;

    return {
        // config: {
        //     models: persistModel
        // },
        onModel(model) {
            const { name } = model;
            const modelActions = this.dispatch[name];

            if(name === pluginName) {
                persistor.bindStore(this);
                return;
            }

            Object.keys(modelActions).forEach(actionName => {
                const actionPath = `${name}/${actionName}`;
                const action = modelActions[actionName];

                if(action.isEffect === true) return;

                if(!whitelist.includes(actionPath)) return;
                if(blacklist.includes(actionPath)) return;


                if(!manualPersist) {
                    // 自动读取缓存
                    persistor.persist(actionPath);
                }

                modelActions[actionName] = (state, payload) => {
                    persistor.flush(actionPath, payload)
                    return action(state, payload);
                }
            })
        }
    }
}


