
import EventEmitter from 'events';

const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); // không giới hạn số listener

export const emitter = _emitter;
