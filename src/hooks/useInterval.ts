import { useRef, useEffect } from 'react'

function useInterval(callback: () => void, delay: number | null): void {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) {
            return;
        }
        const id = setInterval(() => savedCallback.current(), delay);
        // eslint-disable-next-line consistent-return
        return () => clearInterval(id);
    }, [delay]);
}

export default useInterval;