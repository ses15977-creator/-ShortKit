'use client';
import {useEffect,useState} from 'react';
import {Monitor, X, ZoomIn, ZoomOut} from 'lucide-react';

const WIDTH=1366;
const HEIGHT=900;
export default function DesktopPreview(){
 const [open,setOpen]=useState(false);
 const [scale,setScale]=useState(.3);
 useEffect(()=>{
  const params=new URLSearchParams(window.location.search);
  if(params.has('sk-desktop-preview'))return;
  const sync=()=>setScale(Math.min(.75,Math.max(.19,(window.innerWidth-28)/WIDTH)));
  sync();window.addEventListener('resize',sync);return()=>window.removeEventListener('resize',sync);
 },[]);
 useEffect(()=>{
  if(!open)return;
  const old=document.body.style.overflow;
  document.body.style.overflow='hidden';
  const esc=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};
  window.addEventListener('keydown',esc);
  return()=>{document.body.style.overflow=old;window.removeEventListener('keydown',esc)};
 },[open]);
 return <>
  <button type="button" className="sk-desktop-preview-open" onClick={()=>setOpen(true)} aria-label="PC 화면 미리보기"><Monitor size={17}/><span>PC 화면 미리보기</span></button>
  {open&&<div className="sk-desktop-preview-overlay" role="dialog" aria-modal="true" aria-label="PC 화면 미리보기">
   <div className="sk-desktop-preview-toolbar">
    <div><Monitor size={18}/><strong>PC 화면 미리보기</strong><small>1366px 데스크톱 · 읽기 전용</small></div>
    <div className="sk-desktop-preview-controls">
     <button type="button" onClick={()=>setScale(v=>Math.max(.18,Math.round((v-.1)*100)/100))} aria-label="축소"><ZoomOut size={18}/></button>
     <span>{Math.round(scale*100)}%</span>
     <button type="button" onClick={()=>setScale(v=>Math.min(1,Math.round((v+.1)*100)/100))} aria-label="확대"><ZoomIn size={18}/></button>
     <button type="button" onClick={()=>setOpen(false)} className="sk-desktop-preview-close" aria-label="미리보기 닫기"><X size={19}/></button>
    </div>
   </div>
   <p className="sk-desktop-preview-help">PC 편집 화면을 축소해 보여줘요. 확대 후 좌우로 스크롤할 수 있어요. 미리보기에서는 저장하거나 수정할 수 없어요.</p>
   <div className="sk-desktop-preview-viewport">
    <div className="sk-desktop-preview-frame" style={{width:WIDTH*scale,height:HEIGHT*scale}}>
     <iframe title="ShortKit PC 편집 화면 (읽기 전용)" src="/editor?sk-desktop-preview=1" style={{width:WIDTH,height:HEIGHT,transform:`scale(${scale})`,transformOrigin:'top left',pointerEvents:'none'}} tabIndex={-1}/>
    </div>
   </div>
  </div>}
 </>;
}
