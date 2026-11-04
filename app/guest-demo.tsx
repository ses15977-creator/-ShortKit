'use client';
import {useEffect,useState} from 'react';

type Mode='quick'|'caption'|'manual';
type Mood='food'|'travel'|'product';
type Style='bold'|'clean'|'outline';
const data={
 food:{title:'오늘의 맛집',captions:['여기, 진짜 괜찮을까?','한 입 먹자마자 반했어요','오늘의 맛집으로 저장!'],emoji:'🍽️',tag:'맛집'},
 travel:{title:'주말 여행',captions:['이번 주말 어디 갈까?','눈앞에 펼쳐지는 멋진 풍경','다음 여행지로 저장!'],emoji:'🏝️',tag:'여행'},
 product:{title:'새로 찾은 아이템',captions:['이 아이템 알고 있었나요?','하나로 달라지는 일상','자세한 내용은 프로필에서!'],emoji:'📦',tag:'상품'}
} as const;
const modes:{id:Mode;name:string;description:string}[]=[
 {id:'quick',name:'AI 빠른 제작',description:'자료를 준비하고 AI 구성 결과를 살펴보는 흐름'},
 {id:'caption',name:'쇼츠 영상 자막',description:'영상에 자막을 넣고 스타일과 타이밍을 조정하는 흐름'},
 {id:'manual',name:'직접 제작',description:'장면과 자막, 미리보기를 직접 조절하는 흐름'}
];
const styles:{id:Style;label:string}[]=[{id:'bold',label:'강조형'},{id:'clean',label:'심플형'},{id:'outline',label:'테두리형'}];

export default function GuestDemo(){
 const [mode,setMode]=useState<Mode>('quick');
 const [mood,setMood]=useState<Mood>('food');
 const [style,setStyle]=useState<Style>('bold');
 const [step,setStep]=useState(0);
 const [playing,setPlaying]=useState(false);
 const [frame,setFrame]=useState(0);
 const [custom,setCustom]=useState('');
 const captions=data[mood].captions;
 const current=custom.trim().slice(0,60)||captions[frame];
 const steps=mode==='quick'?['콘텐츠 선택','AI 구성 체험','미리보기']:mode==='caption'?['영상·자막','자막 스타일','미리보기']:['콘텐츠','자막·장면','미리보기'];
 useEffect(()=>{if(!playing)return;const timer=window.setInterval(()=>setFrame(i=>(i+1)%3),2600);return()=>window.clearInterval(timer);},[playing]);
 const chooseMode=(v:Mode)=>{setMode(v);setStep(0);setPlaying(false);setFrame(0);setCustom('');};
 const next=()=>{setStep(v=>Math.min(2,v+1));setPlaying(false);};
 return <section className="guest-demo" aria-label="로그인 없이 둘러보는 숏킷 체험판">
  <header className="guest-demo-head"><div><span>SHORTKIT · INTERACTIVE PREVIEW</span><h3>로그인 없이 편집기 둘러보기</h3><p>직접 버튼을 눌러보세요. 제작 화면의 주요 조작을 샘플로 체험할 수 있어요.</p></div><span className="guest-demo-pill">체험 모드 · 무료</span></header>
  <div className="guest-demo-mode-tabs" role="group" aria-label="체험할 제작 방식">{modes.map(v=><button key={v.id} type="button" aria-pressed={mode===v.id} className={mode===v.id?'selected':''} onClick={()=>chooseMode(v.id)}>{v.name}</button>)}</div>
  <div className="guest-demo-stage"><div className="guest-demo-controls">
   <div className="guest-demo-steps" aria-label="체험 단계">{steps.map((name,i)=><button type="button" key={name} className={step===i?'active':''} onClick={()=>{setStep(i);setPlaying(false);}}><b>{i+1}</b>{name}</button>)}</div>
   {step===0?<div className="guest-demo-control-group"><h4>{mode==='caption'?'어떤 영상에 자막을 입혀볼까요?':'어떤 콘텐츠로 만들어볼까요?'}</h4><p>아래 예시 콘텐츠 중 하나를 골라보세요.</p><div className="guest-demo-categories">{(Object.keys(data) as Mood[]).map(id=><button key={id} type="button" className={mood===id?'active':''} onClick={()=>{setMood(id);setFrame(0);setPlaying(false);}}><span>{data[id].emoji}</span>{data[id].tag}</button>)}</div><div className="guest-demo-hint">{mode==='quick'?'실제 AI 제작은 업로드한 자료를 분석하지만, 여기서는 예시 콘텐츠로 체험합니다.':mode==='caption'?'샘플 영상 대신 간단한 화면으로 자막 입력 과정을 보여줍니다.':'실제 편집기에서는 사진, 음성, 배경음 등을 추가할 수 있습니다.'}</div></div>:
   step===1?<div className="guest-demo-control-group"><h4>{mode==='quick'?'AI가 제안하는 장면 예시':mode==='caption'?'자막 스타일 미리보기':'자막과 장면 조절'}</h4><p>자막을 선택하거나 직접 바꾸면 미리보기에 바로 반영돼요.</p><div className="guest-demo-caption-list">{captions.map((text,i)=><button type="button" key={i} className={frame===i&&!custom?'active':''} onClick={()=>{setFrame(i);setCustom('');setPlaying(false);}}><span>0{i+1}</span>{text}</button>)}</div><label className="guest-demo-textlabel" htmlFor="guest-demo-caption-input">자막 직접 입력<input id="guest-demo-caption-input" value={custom} onChange={e=>{setCustom(e.target.value);setPlaying(false);}} maxLength={60} placeholder="이곳에 자막을 입력해 보세요"/></label><div className="guest-demo-styles" role="group" aria-label="자막 스타일">{styles.map(v=><button type="button" key={v.id} aria-pressed={style===v.id} className={style===v.id?'active':''} onClick={()=>setStyle(v.id)}>{v.label}</button>)}</div></div>:
   <div className="guest-demo-control-group"><h4>완성 화면 미리보기</h4><p>재생하면 샘플 자막이 순서대로 바뀌어요. 일시정지나 장면 선택도 가능합니다.</p><div className="guest-demo-caption-list">{captions.map((text,i)=><button type="button" key={i} className={frame===i&&!custom?'active':''} onClick={()=>{setFrame(i);setCustom('');setPlaying(false);}}><span>0{i+1}</span>{text}</button>)}</div><p className="guest-demo-hint">영상 파일 생성이나 다운로드는 회원 로그인 후 실제 편집기에서 이용할 수 있어요.</p></div>}
   <div className="guest-demo-actions"><button type="button" onClick={()=>{setStep(v=>Math.max(0,v-1));setPlaying(false);}} disabled={step===0}>← 이전 단계</button>{step<2?<button type="button" className="guest-demo-next" onClick={next}>다음 단계 →</button>:<a href="/login" className="guest-demo-next">로그인하고 실제 제작하기 →</a>}</div>
  </div>
  <div className="guest-demo-preview"><div className="guest-demo-preview-bar"><strong>미리보기</strong><span>샘플 · 9:16</span></div><div className={'guest-demo-phone '+mood}><div className="guest-demo-phone-orb">{data[mood].emoji}</div><div className="guest-demo-phone-top"><span>SHORTKIT</span><span>PREVIEW</span></div><div className="guest-demo-phone-title">{data[mood].title}</div><div className={'guest-demo-phone-caption '+style}>{current}</div><div className="guest-demo-phone-bottom">SAMPLE CONTENT · 실제 영상이 아닙니다</div></div><div className="guest-demo-player"><button type="button" onClick={()=>{if(custom)setCustom('');setPlaying(p=>!p);}} aria-label={playing?'미리보기 일시정지':'미리보기 재생'}>{playing?'Ⅱ 일시정지':'▶ 재생'}</button><div className="guest-demo-player-track">{[0,1,2].map(i=><button type="button" key={i} className={frame===i?'active':''} aria-label={i+1+'번째 샘플 장면'} onClick={()=>{setFrame(i);setPlaying(false);setCustom('');}}/>)}</div><span>{String(frame*3).padStart(2,'0')} / 09초</span></div><p className="guest-demo-preview-note">화면·자막 조작을 체험하는 시뮬레이션입니다. 동영상 파일이나 AI 생성 결과는 아닙니다.</p></div>
  </div>
  <footer className="guest-demo-footer"><span>계정 없이 체험할 수 있어요 · 실제 생성·저장·AI 호출 없음</span><a href="/login">Google 로그인하고 시작하기 →</a></footer>
 </section>;
}
