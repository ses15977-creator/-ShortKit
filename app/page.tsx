import Studio from './studio';
import {getSiteUser,registerMember} from './site-auth';
import GuideWelcome from './welcome-guide';
import GuestDemo from './guest-demo';
export const dynamic='force-dynamic';

function PublicHome(){
 return <main className="landing-page">
  <header className="landing-nav"><a className="landing-logo" href="/" aria-label="숏킷 홈">숏킷 <span>SHORTKIT</span></a><nav aria-label="메인 메뉴"><a href="#features">주요 기능</a><a href="#preview">제작 화면 미리보기</a><a href="#guide">사용 방법</a><a className="landing-signin" href="/login">로그인 · 회원가입</a></nav></header>
  <section className="landing-hero"><div className="landing-hero-copy"><span className="landing-kicker">SHORTKIT · AI SHORT-FORM STUDIO</span><h1>짧은 영상도<br/><em>완성도 있게, 더 쉽게.</em></h1><p>사진과 영상만 준비하세요. AI가 장면 구성과 대본을 돕고, 자막과 미리보기까지 한곳에서 완성할 수 있어요.</p><div className="landing-hero-actions"><a className="landing-primary" href="/login">Google 계정으로 무료 시작하기 <span aria-hidden="true">→</span></a><a className="landing-secondary" href="#preview">먼저 둘러보기</a></div><p className="landing-hero-note">기능 소개는 로그인 없이 확인할 수 있어요. 실제 제작은 로그인 후 이용합니다.</p></div>
  <div className="landing-hero-art" aria-label="숏킷 편집 흐름 미리보기"><div className="landing-window-bar"><span></span><span></span><span></span><strong>SHORTKIT STUDIO</strong></div><div className="landing-mock-body"><div className="landing-mock-controls"><span>01 · 영상 선택</span><span>02 · 자막 편집</span><span>03 · 미리보기</span></div><a className="landing-mock-screen landing-tour-hero-link" href="#preview" aria-label="최신 숏킷 제작 설명 가이드로 이동"><span className="landing-tour-hero-icon">✦</span><strong>새로운 숏킷<br/>제작 가이드</strong><span className="landing-tour-hero-cta">단계별로 둘러보기 →</span></a><div className="landing-mock-caption">자막 타이밍 &amp; 스타일 <span>편집 가능</span></div><div className="landing-mock-line"><i></i><i></i><i></i></div></div></div></section>
  <section className="landing-section" id="features"><div className="landing-section-heading"><span>WHAT YOU CAN MAKE</span><h2>내 영상에 맞는 제작 방식</h2><p>처음 시작해도 어렵지 않도록, 필요한 작업만 고를 수 있어요.</p></div><div className="landing-features"><article><div className="landing-feature-icon">✦</div><h3>AI 빠른 제작</h3><p>사진·영상을 올리면 AI가 장면 흐름과 대본 구성에 도움을 줘요.</p><span>콘텐츠 구성 · 대본 · 미리보기</span></article><article><div className="landing-feature-icon">▤</div><h3>쇼츠 영상 자막</h3><p>기존 영상에 자막을 넣고 시간과 스타일을 맞춰 자연스럽게 완성해요.</p><span>영상 업로드 · 자막 스타일 · 싱크</span></article><article><div className="landing-feature-icon">▣</div><h3>직접 제작·편집</h3><p>장면과 음성, 배경음 등 원하는 요소를 직접 조절해요.</p><span>세부 편집 · 미리보기 · 파일 저장</span></article></div></section>
  <section className="landing-section landing-preview-section" id="preview"><div className="landing-section-heading"><span>EDITOR WALKTHROUGH</span><h2>로그인 없이 직접 눌러보세요</h2><p>샘플 콘텐츠를 고르고 자막을 바꿔보며 편집기의 주요 기능을 체험할 수 있어요. 실제 제작은 로그인 후 이용합니다.</p></div><GuestDemo/><div className="landing-tour-after-demo"><h3>설명도 함께 보고 싶으세요?</h3><p>가이드에서 제작 흐름을 단계별로 익힐 수 있어요.</p><a className="landing-secondary" href="/guide">단계별 설명 가이드 보기 →</a></div></section>
  <section className="landing-section landing-guide-section" id="guide"><div className="landing-section-heading"><span>HOW IT WORKS</span><h2>처음이라면 가이드부터 시작하세요</h2><p>예전 녹화 영상 대신 지금 ShortKit 기능에 맞춰 설명하는 단계별 가이드입니다.</p></div><div className="landing-guide-new"><div><span className="landing-kicker">SHORTKIT GUIDE</span><h3>세 가지 제작 방식을 한눈에</h3><p>제작 모드를 고르고 단계별 설명을 읽으며 흐름을 익혀보세요. 자동 설명 재생도 가능해요.</p><a className="landing-primary" href="/guide">전체 설명 가이드 보기 →</a></div><div className="landing-guide-summary"><span>01 · AI 빠른 제작</span><span>02 · 쇼츠 영상 자막</span><span>03 · 직접 제작</span></div></div></section>
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
