//

/**
 * @function isBetween
 * @desc Check out if the value is between 'min' and 'max'
 * @param {number} value to be checked
 * @param {number} min minumum value
 * @param {number} max maximum value
 * @param {boolean} equalTo default is false
 *  [true] will check based on '<' and '>'
 *  [false] will check based on '<=' and '>='
 * @return {boolean}
 */
export function isBetween(
    value: number,
    min: number,
    max: number,
    equalTo = false
): Boolean {
    return equalTo ? value <= max && value >= min : value < max && value > min;
}

/**
 * @func isOdd
 * @desc check out if the current value is odd
 * @return {boolean}
 */

export function isOdd(value: number): Boolean {
    return (value & 1) === 1;
}

/**
 * @func isEvan
 * @desc check out if the current value is evan
 * @return {boolean}
 */

export function isEvan(value: number): Boolean {
    return (value & 1) === 0;
}

/**
 * Wait a certain random amount of seconds to continue
 * @param {Number} min
 * @param {Number} max
 * @example
 * await rand(1, 3)
 */

export function randInt(min: number, max: number): number {
    const minValue: number = Math.ceil(min);
    const maxValue: number = Math.floor(max);
    let value: number =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    return value;
}
