import Studio from './studio';
import {getSiteUser,registerMember} from './site-auth';
import GuideWelcome from './welcome-guide';
export const dynamic='force-dynamic';

function PublicHome(){
 return <main className="landing-page">
  <header className="landing-nav"><a className="landing-logo" href="/" aria-label="숏킷 홈">숏킷 <span>SHORTKIT</span></a><nav aria-label="메인 메뉴"><a href="#features">주요 기능</a><a href="#preview">제작 화면 미리보기</a><a href="#guide">사용 방법</a><a className="landing-signin" href="/login">로그인 · 회원가입</a></nav></header>
  <section className="landing-hero"><div className="landing-hero-copy"><span className="landing-kicker">SHORTKIT · AI SHORT-FORM STUDIO</span><h1>짧은 영상도<br/><em>완성도 있게, 더 쉽게.</em></h1><p>사진과 영상만 준비하세요. AI가 장면 구성과 대본을 돕고, 자막과 미리보기까지 한곳에서 완성할 수 있어요.</p><div className="landing-hero-actions"><a className="landing-primary" href="/login">Google 계정으로 무료 시작하기 <span aria-hidden="true">→</span></a><a className="landing-secondary" href="#preview">먼저 둘러보기</a></div><p className="landing-hero-note">기능 소개는 로그인 없이 확인할 수 있어요. 실제 제작은 로그인 후 이용합니다.</p></div>
  <div className="landing-hero-art" aria-label="숏킷 편집 흐름 미리보기"><div className="landing-window-bar"><span></span><span></span><span></span><strong>SHORTKIT STUDIO</strong></div><div className="landing-mock-body"><div className="landing-mock-controls"><span>01 · 영상 선택</span><span>02 · 자막 편집</span><span>03 · 미리보기</span></div><div className="landing-mock-screen"><div className="landing-mock-glow"></div><div className="landing-mock-play">▶</div><strong>당신의 이야기가<br/>쇼츠가 되는 순간</strong><small>9:16 · SHORTS</small></div><div className="landing-mock-caption">자막 타이밍 &amp; 스타일 <span>편집 가능</span></div><div className="landing-mock-line"><i></i><i></i><i></i></div></div></div></section>
  <section className="landing-section" id="features"><div className="landing-section-heading"><span>WHAT YOU CAN MAKE</span><h2>내 영상에 맞는 제작 방식</h2><p>처음 시작해도 어렵지 않도록, 필요한 작업만 고를 수 있어요.</p></div><div className="landing-features"><article><div className="landing-feature-icon">✦</div><h3>AI 빠른 제작</h3><p>사진·영상을 올리면 AI가 장면 흐름과 대본 구성에 도움을 줘요.</p><span>콘텐츠 구성 · 대본 · 미리보기</span></article><article><div className="landing-feature-icon">▤</div><h3>쇼츠 영상 자막</h3><p>기존 영상에 자막을 넣고 시간과 스타일을 맞춰 자연스럽게 완성해요.</p><span>영상 업로드 · 자막 스타일 · 싱크</span></article><article><div className="landing-feature-icon">▣</div><h3>직접 제작·편집</h3><p>장면과 음성, 배경음 등 원하는 요소를 직접 조절해요.</p><span>세부 편집 · 미리보기 · 파일 저장</span></article></div></section>
  <section className="landing-section landing-preview-section" id="preview"><div className="landing-section-heading"><span>EDITOR PREVIEW</span><h2>가입 전에 제작 화면부터 살펴보세요</h2><p>실제 편집 흐름을 소개하는 미리보기입니다. 로그인 없이 기능을 확인하고, 제작은 회원으로 시작하세요.</p></div><div className="landing-preview"><div className="landing-preview-steps"><div><b>1</b><span><strong>영상·사진 준비</strong><small>촬영한 콘텐츠를 업로드</small></span></div><div><b>2</b><span><strong>AI 구성 또는 자막 편집</strong><small>원하는 제작 방식 선택</small></span></div><div><b>3</b><span><strong>미리보고 완성</strong><small>확인한 뒤 영상 파일 저장</small></span></div><a className="landing-primary" href="/login">편집기 사용하기 →</a></div><div className="landing-preview-window"><div className="landing-preview-top"><span>SHORTKIT · 편집 미리보기</span><span>9:16</span></div><div className="landing-preview-video"><span className="landing-preview-shape">▶</span><strong>이런 영상도<br/>직접 만들 수 있어요</strong><span className="landing-preview-subtitle">한눈에 보이는 자막 미리보기</span></div><div className="landing-preview-timeline"><span></span><span></span><span></span><span></span></div><small>※ 기능 소개용 예시 화면이며, 실제 편집기가 아닙니다.</small></div></div></section>
  <section className="landing-section landing-guide-section" id="guide"><div className="landing-section-heading"><span>HOW IT WORKS</span><h2>만드는 방법, 영상으로 먼저 확인하세요</h2><p>기존 ShortKit 사용 안내 영상을 로그인 없이 볼 수 있어요.</p></div><div className="landing-guide-layout"><div className="landing-guide-video"><video controls playsInline preload="metadata" poster="/guide/shortkit-quick-guide.png"><source src="/guide/shortkit-guide.mp4" type="video/mp4"/>이 브라우저는 영상 재생을 지원하지 않습니다.</video></div><div className="landing-guide-text"><span>SHORTKIT GUIDE</span><h3>처음이어도 괜찮아요</h3><p>콘텐츠 선택부터 자막, 미리보기와 저장까지 사용 방법을 영상으로 확인할 수 있어요.</p><a className="landing-secondary" href="/guide">자세한 사용 방법 보기 →</a></div></div></section>
  <section className="landing-cta"><h2>이제 내 영상으로 시작해 볼까요?</h2><p>Google 계정으로 로그인하고 ShortKit 영상 편집기를 사용하세요.</p><a className="landing-primary" href="/login">Google 로그인 · 무료 시작하기 →</a></section>
  <footer className="landing-footer"><strong>숏킷 <span>SHORTKIT</span></strong><span>AI 쇼츠·영상 제작을 더 간편하게</span><a href="/guide">사용 방법</a></footer>
 </main>;
}

export default async function Page(){
 const user=await getSiteUser();
 if(!user || (process.env.SHORTKIT_REQUIRE_LOGIN==='1'&&user.provider!=='google'))return <PublicHome/>;
 await registerMember(user);
 return <>
  <div className="member-strip"><span>{user.displayName}님 · {user.email}</span>{user.provider==='google'&&<a href="/api/auth/logout">로그아웃</a>}</div>
  <Studio scope={user.userId}/>
  <GuideWelcome/>
 </>;
}
