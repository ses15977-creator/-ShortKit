import Link from 'next/link';
import {googleEnabled} from '@/lib/shortkit/google-auth';
export const dynamic='force-dynamic';
export const metadata={title:'로그인 | 숏킷'};
export default async function LoginPage({searchParams}:{searchParams:Promise<{error?:string;unavailable?:string}>}){const params=await searchParams;const enabled=await googleEnabled();return <main className="guide-page login-page"><div className="guide-panel login-card"><Link href="/" className="guide-brand">숏킷 <span>SHORTKIT</span></Link><h1>Google 계정으로 시작하기</h1><p>로그인하면 회원별 AI 사용량을 확인할 수 있습니다. 영상 프로젝트는 현재 기기에도 저장됩니다.</p>{params.error&&<p className="login-error" role="alert">{params.error}</p>}{enabled?<a className="guide-download login-button" href="/api/auth/google">Google로 로그인 · 회원가입</a>:<p className="login-error">Google 로그인 준비 중입니다. 연결 완료 전에는 기존 체험 기능을 이용할 수 있습니다.</p>}<Link href="/" className="guide-back">편집기로 돌아가기</Link></div></main>}
