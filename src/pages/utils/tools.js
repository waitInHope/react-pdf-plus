
export function bufferToUnit8Array(buf) {
    let ab = new ArrayBuffer(buf.length);
    let view = new Uint8Array(ab);
    for(let i = 0; i < buf.length; i++) {
        view[i] = buf[i];
    }
    return view;
}