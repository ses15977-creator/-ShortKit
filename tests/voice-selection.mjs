import assert from 'node:assert/strict';
import {selectVoice,voiceStyle} from '../lib/shortkit/voice-selection.ts';

const catalog=[
 {id:'Kore',gender:'female',pitch:'low',type:'prebuilt'},
 {id:'Aoede',gender:'female',pitch:'medium',type:'prebuilt'},
 {id:'Callirrhoe',gender:'female',pitch:'low',type:'prebuilt'},
 {id:'Charon',gender:'male',pitch:'low',type:'prebuilt'},
];
assert.equal(selectVoice(catalog,'female','dark'),'Aoede');
assert.equal(selectVoice(catalog,'female','normal'),'Aoede');
assert.equal(selectVoice(catalog,'male','dark'),'Charon');
assert.throws(()=>selectVoice([{id:'Charon',gender:'male',type:'prebuilt'}],'female','dark'),/성별/);
assert.doesNotMatch(voiceStyle('dark'),/낮/);
console.log('voice selection: ok');
