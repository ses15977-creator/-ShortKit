import Studio from './studio';
import {getSiteUser,registerMember} from './site-auth';
import GuideWelcome from './welcome-guide';
import Link from 'next/link';
import {googleEnabled} from '@/lib/shortkit/google-auth';
export const dynamic='force-dynamic';
export default async function Page(){const user=await getSiteUser();if(user)await registerMember(user);return <><div className="member-strip">{user?<><span>{user.displayName}님 · {user.email}</span>{user.provider==='google'&&<a href="/api/auth/logout">로그아웃</a>}</>:<Link href="/login">{(await googleEnabled())?'Google 로그인 · 회원가입':'Google 로그인 준비 중'}</Link>}<a href="/signin-with-chatgpt?return_to=/" target="_top">ChatGPT 계정 로그인</a></div><Studio scope={user?.userId||'device'}/><GuideWelcome/></>; }
