import { useRef } from 'react';

export function useInitialValue(value, condition = true) {
    const initialValue = useRef(value).current;

    return condition ? initialValue : value;
}
