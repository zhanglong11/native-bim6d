export function mirrorTo_ (mirrorSchema) {
    return function (obj) {
        const objKeys = Object.keys(obj);
        return objKeys.reduce((acc, k) => {
            let key = k;
            if (mirrorSchema[k])
                key = mirrorSchema[k]
            return Object.assign({...acc}, {[key]: obj[k]});
        }, {});
    }
}

export function mirrorFrom (mirrorSchema) {
    return function(obj){
        let o={}
        mirrorSchema.map(m=>{
            if(obj.hasOwnProperty(m)){
                o[m]=obj[m]
            }
        })
        return o
    }
}

export function mirrorChange(mirrorRule) {
    return function (ary) {
        return ary.map(a=>mirrorRule[a])
    }
}

export const addFieldsTo_ = addRule => obj => {
    const addKeys = Object.keys(addRule);
    return addKeys.reduce((o, k) => {
        return {
            ...o,
            [k]: addRule[k](obj)
        }
    }, { ...obj });
};


export const extractFrom_ = keys => obj => {
    return keys.reduce((o, k) => ({
        ...o,
        [k]: obj[k]
    }), {})
};