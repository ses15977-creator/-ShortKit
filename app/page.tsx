import Studio from './studio';
import {getSiteUser,registerMember} from './site-auth';
import GuideWelcome from './welcome-guide';
import Link from 'next/link';
import {googleEnabled} from '@/lib/shortkit/google-auth';
import {redirect} from 'next/navigation';
export const dynamic='force-dynamic';

export default async function Page(){
  const user=await getSiteUser();
  if(process.env.SHORTKIT_REQUIRE_LOGIN==='1'&&await googleEnabled()&&user?.provider!=='google')redirect('/login');
  if(user)await registerMember(user);
  const enabled=!user&&await googleEnabled();
  return <>
    {(user||enabled)&&<div className="member-strip">
      {user?<>
        <span>{user.displayName}님 · {user.email}</span>
        {user.provider==='google'&&<a href="/api/auth/logout">로그아웃</a>}
      </>:<Link href="/login">로그인 · 회원가입</Link>}
    </div>}
    <Studio scope={user?.userId||'device'}/>
    <GuideWelcome/>
  </>;
}
