export const isObject = function (item) {
   return item && typeof item === 'object' && !Array.isArray(item);
};

export const mergeDeep = function (target, source) {
   let output = Object.assign({}, target);
   if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach((key) => {
         if (isObject(source[key])) {
            if (!(key in target))
               Object.assign(output, {
                  [key]: source[key],
               });
            else output[key] = mergeDeep(target[key], source[key]);
         } else {
            Object.assign(output, {
               [key]: source[key],
            });
         }
      });
   }
   return output;
};


export function OmitKeys(keys: string[], object) {
   try {
      const __clone: Record<any, any> = {};
      const objKeys = Object.keys(object);
      objKeys.map((__keys) => {
         if (keys.includes(__keys)) {
            return;
         }
         __clone[__keys] = object[__keys]
         return;
      })
      return __clone
   } catch (error) {
      return object;
   }
}
