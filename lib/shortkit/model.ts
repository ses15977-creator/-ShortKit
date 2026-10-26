import type {Watermark} from './watermark';
export const categories = [
 {id:'food',label:'맛집 리뷰',description:'맛있는 순간과 찾아가는 길',icon:'utensils'},
 {id:'product',label:'상품 리뷰',description:'직접 써본 매력과 구매 정보',icon:'package'},
 {id:'travel',label:'여행 리뷰',description:'기억하고 싶은 장소와 순간',icon:'plane'},
 {id:'info',label:'정보성 영상',description:'쉽고 짧게 전하는 유용한 정보',icon:'bulb'},
] as const;
export type Category=typeof categories[number]['id'];
export type SubtitlePosition='top'|'middle'|'bottom';
export type SubtitleStyle='gothic'|'outline'|'fire';
export type PhotoMotion='auto'|'zoom-in'|'zoom-out'|'pan-left'|'pan-right'|'none';
export type SubtitleAnimation='none'|'fade'|'pop'|'slide-up';
export type VideoTemplate='fast-review'|'emotional'|'product-promo'|'info-clean';
export type TransitionStyle='cut'|'fade'|'slide'|'zoom';
export interface Asset {id:string;name:string;kind:'image'|'video';blob:Blob;url:string;duration:number;thumb:string;frames:{time:number;data:string}[];}
export interface Scene {subtitlePosition?:SubtitlePosition;photoMotion?:PhotoMotion;id:string;assetId:string;role:'cover'|'hook'|'body'|'ending';text:string;narration:string;duration:number;start:number;rotation:number;fit:'cover'|'contain';audio?:Blob;audioUrl?:string;}
export interface TimedSubtitle {id:string;text:string;start:number;end:number;position:SubtitlePosition;}
export interface Project {timedSubtitles?:TimedSubtitle[];timedSubtitleMode?:boolean;videoTemplate?:VideoTemplate;smoothTransitions?:boolean;subtitleAnimation?:SubtitleAnimation;watermark?:Watermark;brandName?:string;brandColor?:string;id:string;name:string;category:Category;style:SubtitleStyle;effectPreset?:string;basicFont?:'gothic'|'handwriting'|'cute';outlinePreset?:'black-on-white'|'white-on-black';position:SubtitlePosition;size:number;gender:'female'|'male';tone:'bright'|'dark'|'normal';assets:Asset[];scenes:Scene[];subject:string;address:string;cta:'profile'|'comment';notes:string;caption:string;hookReason:string;originalAudio:boolean;music?:Blob;musicName?:string;musicSource?:'builtin'|'upload';musicTrackId?:string;musicVolume:number;musicDucking?:boolean;transitionStyle?:TransitionStyle;brandIntroEnabled?:boolean;brandOutroEnabled?:boolean;ctaText?:string;publishTitle?:string;thumbnailText?:string;updated:number;}
export function freshProject():Project{return {id:crypto.randomUUID(),subtitleAnimation:'fade',brandName:'',brandColor:'#6d4aff',name:'나의 첫 숏킷',category:'food',style:'outline',effectPreset:'fire',basicFont:'gothic',outlinePreset:'white-on-black',position:'bottom',size:42,gender:'female',tone:'bright',assets:[],scenes:[],subject:'',address:'',cta:'profile',notes:'',caption:'',hookReason:'',originalAudio:false,musicVolume:0.18,musicDucking:true,transitionStyle:'fade',brandIntroEnabled:false,brandOutroEnabled:false,ctaText:'',publishTitle:'',thumbnailText:'',updated:Date.now()};}
export function ending(p:Pick<Project,'category'|'subject'|'address'|'cta'>){switch(p.category){case'food':return [p.subject,p.address].filter(Boolean).join('\n')||'가게 이름과 주소를 입력해 주세요';case'product':return p.cta==='profile'?'프로필 링크에서 확인하세요':'고정댓글에서 확인하세요';case'travel':return '고정댓글에서 자세한 정보를 확인하세요';default:return '궁금한 점은 댓글로 알려주세요';}}
export function makeCover(p:Project,hook:Scene):Scene{return {id:crypto.randomUUID(),assetId:hook.assetId,role:'cover',text:(hook.text.trim()||p.subject.trim()||p.name.trim()||'지금 주목할 순간').slice(0,60),narration:'',duration:1.5,start:hook.start,rotation:hook.rotation,fit:'cover'};}
export function localScenes(p:Project):Scene[]{const base=p.assets.map((a,i)=>({id:crypto.randomUUID(),assetId:a.id,role:(i===0?'hook':'body') as Scene['role'],text:'',narration:'',duration:a.kind==='video'?Math.min(5,a.duration):4,start:0,rotation:0,fit:'contain' as const}));if(base.length){base.push({...base[base.length-1],id:crypto.randomUUID(),role:'ending',text:ending(p),narration:ending(p),duration:4});base.unshift(makeCover(p,base[0]));}return base;}
export function duration(p:Project){return p.scenes.reduce((n,s)=>n+s.duration,0);}
export function sceneAt(p:Project,t:number){let offset=0;for(let i=0;i<p.scenes.length;i++){const scene=p.scenes[i];if(t<offset+scene.duration||i===p.scenes.length-1)return {scene,index:i,local:Math.max(0,t-offset),offset};offset+=scene.duration;}return null;}
export function basicCaption(p:Project){const tag={food:'#맛집리뷰 #맛집추천',product:'#상품리뷰 #제품소개',travel:'#여행리뷰 #여행기록',info:'#정보공유 #꿀팁'}[p.category];return [p.subject,p.notes,...p.scenes.filter(s=>s.role!=='ending'&&s.role!=='cover').map(s=>s.text),ending(p),'',tag].filter((s,i,all)=>s===''||!!s&&all.indexOf(s)===i).join('\n');}
export function resetSceneAudio(s:Scene){return {...s,audio:undefined,audioUrl:undefined};}

/** The same final text is used for the preview, clipboard, and text download. */
export function captionForSharing(p:Pick<Project,'category'|'caption'|'subject'|'address'>){
 const body=p.caption.trim();if(p.category!=='food')return body;
 const normalize=(s:string)=>s.normalize('NFC').replace(/\s+/g,'').toLocaleLowerCase('ko-KR');
 const existing=normalize(body);const details:string[]=[];
 const name=p.subject.trim(),address=p.address.trim();
 if(name&&!existing.includes(normalize(name)))details.push(`🍽️ 가게 이름: ${name}`);
 if(address&&!existing.includes(normalize(address)))details.push(`📍 주소: ${address}`);
 return [body,details.join('\n')].filter(Boolean).join('\n\n');
}

export function sceneSubtitlePosition(p:Pick<Project,'position'>,s?:Pick<Scene,'subtitlePosition'>):SubtitlePosition{return s?.subtitlePosition==='top'||s?.subtitlePosition==='middle'||s?.subtitlePosition==='bottom'?s.subtitlePosition:p.position;}
