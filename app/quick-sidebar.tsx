'use client';
import {Check, Film, FolderOpen, Lightbulb, Plus, RotateCcw, WandSparkles} from 'lucide-react';
type Recent={id:string;name:string;updated:number};
type Props={locked?:boolean;mode:'choose'|'quick'|'result';stage:number;status:string;connected:boolean|null;online:boolean;draft:Recent|null;recent:Recent[];onQuick:()=>void;onManual:()=>void;onNew:()=>void;onLoad:()=>void;onResume:()=>void;onRecent:(id:string)=>void};
const labels=['자료 업로드','AI 분석','초안 생성','영상 수정','게시 준비'];
const hints=['사진·영상 선택','주제와 장면 파악','대본·자막 구성','결과 확인·다듬기','최종 점검 및 내보내기'];
export default function QuickSidebar({mode,stage,status,connected,online,draft,recent,onQuick,onManual,onNew,onLoad,onResume,onRecent,locked=false}:Props){
 return <section className="sk-ai-sidebar" aria-label="AI 빠른 제작 메뉴">
  <div className="sk-ai-sidebar-menu">
   <button type="button" disabled={locked} className={mode==='quick'||mode==='result'?'is-selected':''} onClick={onQuick}><WandSparkles size={17}/>AI 빠른 제작</button>
   <button type="button" disabled={locked} onClick={onManual}><Film size={17}/>직접 제작</button>
   <a href="/guide" aria-disabled={locked} onClick={e=>{if(locked)e.preventDefault();}}><Lightbulb size={17}/>사용 방법</a>
   <button type="button" disabled={locked} onClick={onNew}><Plus size={17}/>새 프로젝트</button>
   <button type="button" disabled={locked} onClick={onLoad}><FolderOpen size={17}/>프로젝트 불러오기</button>
  </div>
  {mode==='choose'?<div className="sk-ai-sidebar-history"><strong>최근 작업</strong>
   {draft?<button type="button" disabled={locked} onClick={onResume}><RotateCcw size={16}/><span>이어서 편집<small>{new Date(draft.updated).toLocaleDateString('ko-KR')}</small></span></button>:<p>이 기기의 자동 저장 작업이 없어요.</p>}
   {recent.map(project=><button type="button" disabled={locked} key={project.id} onClick={()=>onRecent(project.id)}><FolderOpen size={16}/><span>{project.name||'이름 없는 프로젝트'}<small>{new Date(project.updated).toLocaleDateString('ko-KR')}</small></span></button>)}
  </div>:<div className="sk-ai-sidebar-flow"><strong>AI 제작 진행 단계</strong><ol>{labels.map((label,index)=><li key={label} className={index+1===stage?'is-current':index+1<stage?'is-done':'is-upcoming'} aria-current={index+1===stage?'step':undefined}><span className="sk-ai-step-index">{index+1<stage?<Check size={14}/>:index+1}</span><span className="sk-ai-step-copy"><b>{label}</b><small>{hints[index]}</small></span></li>)}</ol>
   <div className="sk-ai-sidebar-progress"><div><b>진행 상황</b><span>{stage} / 5 단계</span></div><div className="sk-ai-sidebar-meter" role="progressbar" aria-valuemin={0} aria-valuemax={5} aria-valuenow={stage}><span style={{width:(stage*20)+'%'}}/></div><p role="status">{status}</p></div>
  </div>}
  <div className="sk-ai-sidebar-footer"><span className={online&&connected?'is-connected':'is-disconnected'}><i/>{!online?'오프라인':connected===null?'AI 연결 확인 중':connected?'AI 연결됨':'AI 연결 필요'}</span>
   {mode!=='choose'&&draft&&<button type="button" disabled={locked} onClick={onResume}><RotateCcw size={16}/>이어서 편집</button>}
   {mode!=='choose'&&recent.length>0&&<button type="button" disabled={locked} onClick={()=>onRecent(recent[0].id)}><FolderOpen size={16}/><span>{recent[0].name||'최근 프로젝트 열기'}</span></button>}
  </div>
 </section>;
}
