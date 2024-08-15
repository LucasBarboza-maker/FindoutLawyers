/**
 * Wait a certain amount of mileseconds to before continue o
 * @param {Number} value
 * @example
 * await utils.ms(1000)
 */

export async function ms(value: number): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(resolve, value));
}

/**
 * Wait a certain amount of seconds to continue
 * @param {Number} value
 * @example
 * await sec(1)
 */

export async function sec(value: number): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(resolve, value * 1000));
}

/**
 * Wait a certain random amount of seconds to continue
 * @param {Number} min
 * @param {Number} max
 * @example
 * await rand(1, 3)
 */

export async function rand(min: number, max: number): Promise<void> {
    const minValue: number = Math.ceil(min);
    const maxValue: number = Math.floor(max);
    let value: number =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    value = value * 1000;
    return new Promise((resolve, reject) => setTimeout(resolve, value));
}
