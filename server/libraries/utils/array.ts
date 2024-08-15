/**
 * @func remove
 * @description remove a element if it exists
 * @param {Array} [array]
 * @param {any} [element]
 * @returns {Boolean}
 */

export function remove(array: Array<any>, element: any): Boolean {
   const indexOf = array.indexOf(element);
   if (indexOf !== -1) {
      array.splice(indexOf, 1);
      return true;
   } else {
      return false;
   }
}

/**
 * @func chunk
 * @description chunk a array into smaller arrays
 * @example
 * utils.array.chunk([1,2,3,4], 2) // [[1, 2], [3, 4]]
 * @param {array} [array=[]] to chunk up
 * @param {number} [size=2] the amount of element into each smaller array
 * @returns {array}
 */

export function chunk(array: Array<any>, size = 2) {
   return Array.from(
      {
         length: Math.ceil(array.length / size),
      },
      (v, i) => array.slice(i * size, i * size + size)
   );
}

/**
 * @function paginate
 * @description get the values of a array paginate
 * @param {Array} array to paginate
 * @param {Number} index
 * @param {Number} size
 */

export function paginate(array: Array<any>, index: number, size: number) {
   // transform values
   index = Math.abs(index);
   index = index > 0 ? index - 1 : index;
   size = size;
   size = size < 1 ? 1 : size;

   // filter
   return [
      ...array.filter((value: any, n) => {
         return n >= index * size && n < (index + 1) * size;
      }),
   ];
}

/**
 * @function shuffle
 * @description random sort the array
 * @param {Array} array
 */

export function shuffle(value: Array<any>): Array<any> {
   try {
      let array = [...value];
      for (let i = array.length - 1; i > 0; i--) {
         let j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
   } catch (error) {
      return value;
   }
}

/**
 * @function average
 * @description get the average value of a array
 * @param {Array} array
 */

export function average(arr: Array<any>): Number {
   return [...arr].reduce((p, c) => p + c, 0) / arr.length;
}

/**
 * @function common
 * @description get the most common value from array
 * @param {Array} array
 */

export function common(arr: any[]): any {
   let o = {},
      maxCount = 0,
      maxValue,
      m;
   for (let i = 0, iLen = arr.length; i < iLen; i++) {
      m = arr[i];

      if (!o.hasOwnProperty(m)) {
         o[m] = 0;
      }
      ++o[m];

      if (o[m] > maxCount) {
         maxCount = o[m];
         maxValue = m;
      }
   }
   return maxValue;
}
