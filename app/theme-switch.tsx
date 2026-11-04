'use client';
import {useEffect,useState} from 'react';
import {Moon,Sun} from 'lucide-react';

type Theme='light'|'dark';
const storageKey='shortkit:color-theme';

export default function ThemeSwitch(){
 const [theme,setTheme]=useState<Theme>('light');
 useEffect(()=>{
  const read=()=>{
   try{return localStorage.getItem(storageKey)==='dark'?'dark':'light';}catch{return 'light';}
  };
  const initial=read();
  setTheme(initial);
  document.documentElement.setAttribute('data-sk-theme',initial);
  const sync=(event:StorageEvent)=>{
   if(event.key!==storageKey)return;
   const next=event.newValue==='dark'?'dark':'light';
   setTheme(next);
   document.documentElement.setAttribute('data-sk-theme',next);
  };
  window.addEventListener('storage',sync);
  return()=>window.removeEventListener('storage',sync);
 },[]);
 const change=()=>{
  const next:Theme=theme==='light'?'dark':'light';
  setTheme(next);
  document.documentElement.setAttribute('data-sk-theme',next);
  try{localStorage.setItem(storageKey,next);}catch{}
 };
 return <button type="button" className="sk-theme-toggle" onClick={change} aria-label={theme==='light'?'야간모드로 전환':'주간모드로 전환'} title={theme==='light'?'야간모드로 전환':'주간모드로 전환'}>
  {theme==='light'?<Moon size={17} aria-hidden="true"/>:<Sun size={17} aria-hidden="true"/>}
  <span>{theme==='light'?'야간모드':'주간모드'}</span>
 </button>;
}
