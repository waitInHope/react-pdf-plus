
import { useReducer } from 'react';

export function bufferToUnit8Array(buf) {
    let ab = new ArrayBuffer(buf.length);
    let view = new Uint8Array(ab);
    for(let i = 0; i < buf.length; i++) {
        view[i] = buf[i];
    }
    return view;
}

export const useMerge = (initialVal) => {
    const reducer = (state, action) => {
        switch(action.type) {
            case 'push': {
                return initialVal.push(...state);
            }
            case 'replace': {
                return [...state];
            }
            default: {
                throw new Error('type is required');
            }
        }
    }
    const [state, dispatch] = useReducer(reducer, initialVal);
    return [state, dispatch];
}