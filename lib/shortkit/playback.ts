import type {Project,Scene} from './model';
export const OUTPUT_FPS=30;

export type PhotoMotionTransform={scale:number;x:number;y:number};
export function photoMotionTransform(motion:string|undefined,progress:number,w:number,h:number):PhotoMotionTransform{
 const p=Math.max(0,Math.min(1,progress));
 switch(motion){
  case'none':return {scale:1,x:0,y:0};
  case'zoom-out':return {scale:1.20-p*.18,x:0,y:0};
  case'pan-left':return {scale:1.14,x:w*(.035-.07*p),y:0};
  case'pan-right':return {scale:1.14,x:w*(-.035+.07*p),y:0};
  case'zoom-in':
  case'auto':
  default:return {scale:1.02+p*.18,x:w*.018*p,y:-h*.025*p};
 }
}
export function sceneFrames(offset:number,sceneDuration:number){const start=Math.ceil(offset*OUTPUT_FPS-1e-7),end=Math.ceil((offset+sceneDuration)*OUTPUT_FPS-1e-7);return Array.from({length:end-start},(_,i)=>({timestamp:(start+i)/OUTPUT_FPS,local:Math.max(0,(start+i)/OUTPUT_FPS-offset)}));}
export function videoPlaybackRate(scene:Scene,assetDuration:number){return Math.min(1,Math.max(0.01,assetDuration-scene.start-.04)/Math.max(.01,scene.duration));}
export function videoSourceTime(scene:Scene,assetDuration:number,local:number){return Math.min(Math.max(0,assetDuration-.04),scene.start+(scene.role==='cover'?0:local*videoPlaybackRate(scene,assetDuration)));}
export function transitionAmount(p:Project,s:Scene,local:number){if(p.smoothTransitions===false||p.transitionStyle==='cut')return 1;const length=Math.min(.25,s.duration/4);const x=Math.max(0,Math.min(1,local/length));return x*x*(3-2*x);}
// Both preview and export blend the outgoing last frame over the incoming frame.
const transitionBuffers=new WeakMap<CanvasRenderingContext2D,HTMLCanvasElement>();
export function blendTransition(ctx:CanvasRenderingContext2D,previous:HTMLCanvasElement,p:Project,s:Scene,local:number){const amount=transitionAmount(p,s,local);if(amount>=1)return;const style=p.transitionStyle||'fade';if(style==='fade'){ctx.save();ctx.globalAlpha=1-amount;ctx.drawImage(previous,0,0,ctx.canvas.width,ctx.canvas.height);ctx.restore();return;}let current=transitionBuffers.get(ctx);if(!current){current=document.createElement('canvas');transitionBuffers.set(ctx,current);}current.width=ctx.canvas.width;current.height=ctx.canvas.height;current.getContext('2d')!.drawImage(ctx.canvas,0,0);ctx.save();ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);if(style==='slide'){const w=ctx.canvas.width;ctx.drawImage(previous,-w*amount,0,w,ctx.canvas.height);ctx.drawImage(current,w*(1-amount),0,w,ctx.canvas.height);}else{ctx.drawImage(previous,0,0);const scale=.92+.08*amount;const w=ctx.canvas.width*scale,h=ctx.canvas.height*scale;ctx.globalAlpha=amount;ctx.drawImage(current,(ctx.canvas.width-w)/2,(ctx.canvas.height-h)/2,w,h);}ctx.restore();}
