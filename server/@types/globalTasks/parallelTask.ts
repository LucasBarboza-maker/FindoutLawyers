export interface ParallelTaskBaseClassInstances_Constructor {
   maxAttempts?: number;
   puppeteerLaunchTimeout?: number;
}


export interface ParallelTaskBaseClassInstances {
   isAtMaxAttempts: () => boolean;
   setAttemptsToMax: () => void;
}
