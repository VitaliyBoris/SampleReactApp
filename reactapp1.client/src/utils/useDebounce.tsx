import { useState } from "react";

type Timer = ReturnType<typeof setTimeout>;
type Action = (...args: any[]) => void; // eslint-disable-line @typescript-eslint/no-explicit-any

export default function useDebounce<Func extends Action>(func: Func, timeOut = 500) {
    const [timer, setTimer] = useState<Timer>();

    const debounced = ((...args) => {
        const newTimer = setTimeout(() => {
            func(...args);
        }, timeOut);
        clearTimeout(timer);
        setTimer(newTimer);
    }) as Func;

    return debounced;
}
