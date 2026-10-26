import assert from 'node:assert/strict';
import {sceneFrames,transitionAmount,OUTPUT_FPS,blendTransition,photoMotionTransform} from '../lib/shortkit/playback.ts';
const durations=[1.25,4.1,3.77,2.03,.95];let offset=0;const frames=[];
for(const duration of durations){const scene=sceneFrames(offset,duration);assert(scene.every(f=>f.local>=0&&f.local<duration));frames.push(...scene);offset+=duration;}
assert.equal(frames.length,Math.ceil(offset*OUTPUT_FPS));assert.equal(frames[0].timestamp,0);
for(let i=1;i<frames.length;i++)assert(Math.abs(frames[i].timestamp-frames[i-1].timestamp-1/OUTPUT_FPS)<1e-10,'no gaps or duplicated boundary frames');
const scene={duration:4};assert.equal(transitionAmount({},scene,0),0);assert.equal(transitionAmount({},scene,.125),.5);assert.equal(transitionAmount({},scene,.25),1);assert.equal(transitionAmount({smoothTransitions:false},scene,0),1);assert.equal(transitionAmount({transitionStyle:'cut'},scene,0),1);
let calls=0,balance=0;const ctx={canvas:{width:720,height:1280},save(){balance++},restore(){balance--},drawImage(){calls++}};blendTransition(ctx,{}, {},scene,.125);assert.equal(calls,1);assert.equal(ctx.globalAlpha,.5);assert.equal(balance,0);blendTransition(ctx,{}, {smoothTransitions:false},scene,.125);assert.equal(calls,1);

const autoStart=photoMotionTransform(undefined,0,720,1280),autoEnd=photoMotionTransform('auto',1,720,1280);
assert.equal(autoStart.scale,1.02);assert.equal(autoEnd.scale,1.2);assert(autoEnd.x>0&&autoEnd.y<0);
const zoomOut=photoMotionTransform('zoom-out',1,720,1280);assert.equal(zoomOut.scale,1.02);
const panLeftStart=photoMotionTransform('pan-left',0,720,1280),panLeftEnd=photoMotionTransform('pan-left',1,720,1280);assert(panLeftStart.x>0&&panLeftEnd.x<0);
assert.deepEqual(photoMotionTransform('none',.5,720,1280),{scale:1,x:0,y:0});
console.log('PASS: frame cadence, dissolve, and photo motion transforms.');
