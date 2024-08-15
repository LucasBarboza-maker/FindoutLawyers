/**
 * Convert X min to secs
 * @param sec
 */

export function min(sec: number): number {
    return sec * 60;
}

/**
 * @description Convert X hour to seconds
 * @param value
 */

export function hour(value: number): number {
    return value * 60 * 60;
}

/**
 * Convert the X sec to Y mili
 * @param value
 */

export function secToMs(value: number): number {
    return value * 1000;
}

/**
 * Convert the X min to Y mili
 * @param value
 */

export function minToMs(value: number): number {
    return value * 60000;
}

/**
 * Convert the X hours to Y mili
 * @param value
 */

export function hourToMs(value: number): number {
    return value * 3.6e6;
}

/**
 * Convert the X days to Y mili
 * @param value
 */

export function dayToMs(value: number): number {
    return value * 8.64e7;
}

/**
 * Convert the X weeks to Y mili
 * @param value
 */

export function weekToMs(value: number): number {
    return value * 6.048e8;
}

/**
 * Convert the X months to Y mili
 * @param value
 */

export function monthToMs(value: number): number {
    return value * 2.628e9;
}

/**
 * Convert string into number
 */

export function textToMs(str: string): number {
    const value = str.trim();
    if (!/^((\d+)\s?(\w+))/iu.test(value)) return 0;
    if (/((\d+)\s?d)/iu.test(value)) {
        const exec = /((\d+)\s?d)/iu.exec(value);
        if (!exec) return 0;
        const n = +exec[2];
        return dayToMs(n);
    }
    if (/((\d+)\s?h)/iu.test(value)) {
        const exec = /((\d+)\s?h)/iu.exec(value);
        if (!exec) return 0;
        const n = +exec[2];
        return hourToMs(n);
    }
    if (/((\d+)\s?min)/iu.test(value)) {
        const exec = /((\d+)\s?min)/iu.exec(value);
        if (!exec) return 0;
        const n = +exec[2];
        return minToMs(n);
    }
    if (/((\d+)\s?sec)/iu.test(value)) {
        const exec = /((\d+)\s?sec)/iu.exec(value);
        if (!exec) return 0;
        const n = +exec[2];
        return secToMs(n);
    }
    if (/((\d+)\s?w)/iu.test(value)) {
        const exec = /((\d+)\s?w)/iu.exec(value);
        if (!exec) return 0;
        const n = +exec[2];
        return weekToMs(n);
    }
    if (/((\d+)\s?m)/iu.test(value)) {
        const exec = /((\d+)\s?m)/iu.exec(value);
        if (!exec) return 0;
        const n = +exec[2];
        return monthToMs(n);
    }
    return 0;
}

export interface PickDatetimeResult {
    day: number;
    month: number;
    year: number;
    hour: number;
    min: number;
}

export function pickDatetime(date: Date): PickDatetimeResult {
    try {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour = date.getHours();
        const min = date.getMinutes();
        return {
            day,
            month,
            year,
            hour,
            min,
        };
    } catch (error) {
        return pickDatetime(new Date());
    }
}

/**
 * @description Utilizes it in Stripe Datetime
 */

export function unixDateTime(seconds: number): Date {
    const date = new Date('1970-01-01T00:30:00Z');
    date.setSeconds(seconds);
    return date;
}
