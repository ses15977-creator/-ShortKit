'use client';
import {useEffect,useState} from 'react';

type Kind='quick'|'captions'|'manual';
type Step={title:string;caption:string;detail:string;screen:string;hint:string};
const flows:Record<Kind,{name:string;subtitle:string;steps:Step[]}>={
 quick:{name:'AI 빠른 제작',subtitle:'사진과 영상을 준비하면 AI가 구성과 대본을 도와줘요.',steps:[
  {title:'제작 방식 선택',caption:'AI 빠른 제작을 선택하세요',detail:'첫 화면에서 「AI 빠른 제작」을 누르면 빠른 제작 화면으로 이동합니다.',screen:'AI 빠른 제작',hint:'시작 화면'},
  {title:'콘텐츠와 자료 준비',caption:'주제와 사진·영상을 추가하세요',detail:'맛집·상품·여행·정보 중 주제를 고르고 사진이나 동영상을 넣으세요. 실제 자료가 많을수록 구성이 구체적이 됩니다.',screen:'사진 · 영상 업로드',hint:'콘텐츠 준비'},
  {title:'AI로 장면 구성',caption:'AI가 대본과 장면 흐름을 제안해요',detail:'입력한 정보와 자료를 바탕으로 장면 순서, 화면 문구와 대본의 초안을 만듭니다. 생성된 내용은 직접 확인하고 수정하세요.',screen:'AI 장면 구성',hint:'대본 생성'},
  {title:'미리보기와 수정',caption:'장면과 자막을 확인하세요',detail:'재생하면서 장면 전환과 문구, 타이밍을 확인하고 원하는 부분을 다시 편집할 수 있습니다.',screen:'장면 · 자막 확인',hint:'미리보기'},
  {title:'영상 파일 완성',caption:'결과를 확인하고 저장하세요',detail:'최종 결과를 미리 본 뒤 제공되는 저장·내보내기 기능으로 파일을 내려받으세요.',screen:'영상 완성',hint:'내보내기'}
 ]},
 captions:{name:'쇼츠 영상 자막',subtitle:'기존 영상에 자막을 넣고 싱크를 조절하는 3단계예요.',steps:[
  {title:'영상·자막',caption:'내 동영상을 선택하고 자막을 입력하세요',detail:'「쇼츠 영상 자막」을 선택하고 90초 이하의 동영상 파일을 준비하세요. 자막 문구를 입력한 뒤 구간별로 나눌 수 있습니다.',screen:'영상 / 자막',hint:'1단계'},
  {title:'자막 타이밍 조절',caption:'시작·종료 시각을 맞추세요',detail:'재생 위치를 보면서 각 자막이 나타날 시작 시각과 사라질 종료 시각을 조절하세요. 필요하면 위치도 선택합니다.',screen:'0:03.2 — 0:06.8',hint:'싱크 맞추기'},
  {title:'자막 스타일',caption:'글꼴과 강조 효과를 선택하세요',detail:'자막 스타일 화면에서 글꼴과 강조 표현을 고르고, 휴대폰 화면에서도 읽기 좋은지 확인하세요.',screen:'자막 스타일',hint:'2단계'},
  {title:'미리보기',caption:'원본 영상과 자막을 함께 확인하세요',detail:'실제 영상 재생에 맞춰 자막이 자연스럽게 등장하는지 확인하세요. 어긋난 부분은 다시 수정할 수 있습니다.',screen:'영상 + 자막',hint:'3단계'},
  {title:'완성 영상 저장',caption:'결과 영상을 내보내세요',detail:'미리보기 결과를 확인한 뒤 영상 파일로 내보내기 하세요. 이 모드는 기존 영상에 자막을 넣는 작업에 집중합니다.',screen:'영상 저장',hint:'완료'}
 ]},
 manual:{name:'직접 제작',subtitle:'콘텐츠부터 미리보기까지 5단계를 직접 설정해요.',steps:[
  {title:'콘텐츠',caption:'어떤 영상을 만들지 선택하세요',detail:'직접 제작에 들어가 맛집·상품·여행·정보 등 영상의 콘텐츠 종류를 선택하세요.',screen:'콘텐츠',hint:'1단계'},
  {title:'자막',caption:'문구와 자막 표현을 설정하세요',detail:'자막 문구, 디자인과 표시 위치를 선택해 영상에 어울리는 스타일을 만드세요.',screen:'자막 설정',hint:'2단계'},
  {title:'음성·배경음',caption:'목소리와 음악을 설정하세요',detail:'필요한 경우 AI 음성이나 배경음을 선택하고 영상 분위기에 맞춰 조절하세요.',screen:'음성 / 배경음',hint:'3단계'},
  {title:'자료 추가',caption:'장면에 사용할 자료를 넣으세요',detail:'사진과 영상 파일을 추가하고 필요한 장면을 구성하세요.',screen:'사진 / 영상',hint:'4단계'},
  {title:'미리보기·저장',caption:'최종 결과를 확인하세요',detail:'장면과 소리, 자막을 점검하고 영상 파일로 저장하세요.',screen:'미리보기',hint:'5단계'}
 ]}
};

export default function GuideTour({compact=false}:{compact?:boolean}){
 const [kind,setKind]=useState<Kind>('quick');
 const [step,setStep]=useState(0);
 const [playing,setPlaying]=useState(false);
 const flow=flows[kind];
 const current=flow.steps[step];
 useEffect(()=>{if(!playing)return;const timer=window.setInterval(()=>setStep(s=>{if(s>=flow.steps.length-1){setPlaying(false);return s;}return s+1;}),6500);return()=>window.clearInterval(timer);},[playing,kind,flow.steps.length]);
 const choose=(k:Kind)=>{setKind(k);setStep(0);setPlaying(false);};
 return <section className={'guide-tour'+(compact?' guide-tour-compact':'')} aria-label="ShortKit 최신 제작 설명 가이드">
  <div className="guide-tour-header"><div><span>SHORTKIT · CURRENT GUIDE</span><h3>직접 안내하는 제작 가이드</h3><p>재생을 누르거나 단계를 눌러 최신 제작 순서를 둘러보세요.</p></div><span className="guide-tour-label">로그인 없이 둘러보기</span></div>
  <div className="guide-tour-tabs" role="group" aria-label="제작 방식 선택">{(Object.keys(flows) as Kind[]).map(k=><button type="button" key={k} className={kind===k?'active':''} aria-pressed={kind===k} onClick={()=>choose(k)}>{flows[k].name}</button>)}</div>
  <div className="guide-tour-body"><div className="guide-tour-screen"><div className="guide-tour-screen-top"><span>● ● ●</span><span>{current.hint} · {step+1}/{flow.steps.length}</span></div><div className="guide-tour-phone"><span className="guide-tour-phone-kicker">SHORTKIT STUDIO</span><div className="guide-tour-screen-icon" aria-hidden="true">{kind==='quick'?'✦':kind==='captions'?'▤':'▣'}</div><strong>{current.screen}</strong><p>{current.caption}</p><div className="guide-tour-progress" aria-label="가이드 진행 단계">{flow.steps.map((_,i)=><span className={i<=step?'active':''} key={i}/>)}</div></div></div>
  <div className="guide-tour-explain"><div className="guide-tour-step-label">{flow.name} · 단계 {step+1}</div><h4>{current.title}</h4><p className="guide-tour-caption">{current.caption}</p><p className="guide-tour-detail">{current.detail}</p><div className="guide-tour-controls"><button type="button" onClick={()=>{setStep(s=>Math.max(0,s-1));setPlaying(false);}} disabled={step===0}>← 이전</button><button type="button" className="guide-tour-play" onClick={()=>{if(step===flow.steps.length-1){setStep(0);setPlaying(true);}else setPlaying(v=>!v);}}>{playing?'Ⅱ 일시정지':step===flow.steps.length-1?'▶ 처음부터 보기':'▶ 자동 설명 재생'}</button><button type="button" onClick={()=>{setStep(s=>Math.min(flow.steps.length-1,s+1));setPlaying(false);}} disabled={step===flow.steps.length-1}>다음 →</button></div><p className="guide-tour-description">화면과 글로 안내하는 단계별 가이드입니다. 실제 편집기 실행이나 음성·동영상 재생은 아닙니다.</p></div></div>
  <div className="guide-tour-foot"><span>{flow.subtitle}</span><a href="/login">Google 로그인 후 직접 제작하기 →</a></div>
 </section>;
}
