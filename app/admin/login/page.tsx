import Link from 'next/link';
import {googleEnabled} from '@/lib/shortkit/google-auth';
export const dynamic='force-dynamic';
export const metadata={title:'관리자 로그인 | 숏킷'};
export default async function AdminLogin({searchParams}:{searchParams:Promise<{error?:string;unavailable?:string}>}){
 const params=await searchParams;const enabled=await googleEnabled();
 return <main className="guide-page login-page"><div className="guide-panel login-card"><Link href="/" className="guide-brand">숏킷 <span>SHORTKIT</span></Link><h1>관리자 로그인</h1><p>등록된 관리자 Google 계정으로 로그인해 주세요.</p>{params.error&&<p className="login-error" role="alert">{params.error}</p>}{enabled?<a className="guide-download login-button" href="/api/auth/google?admin=1">Google로 관리자 로그인</a>:<p className="login-error">Google 로그인 연결을 준비 중입니다.</p>}<p><a href="/signin-with-chatgpt?return_to=/admin/setup" target="_top">ChatGPT 관리자 계정으로 로그인</a></p><Link href="/" className="guide-back">숏킷으로 돌아가기</Link></div></main>;
}
