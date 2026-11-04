import Studio from './studio';
import {getSiteUser,registerMember} from './site-auth';
import GuideWelcome from './welcome-guide';
import {redirect} from 'next/navigation';
export const dynamic='force-dynamic';

export default async function Page(){
  const user=await getSiteUser();
  if(process.env.SHORTKIT_REQUIRE_LOGIN==='1'&&user?.provider!=='google')redirect('/login');
  if(user)await registerMember(user);
  const enabled=!user;
  return <>
    {(user||enabled)&&<div className="member-strip">
      {user?<>
        <span>{user.displayName}님 · {user.email}</span>
        {user.provider==='google'&&<a href="/api/auth/logout">로그아웃</a>}
      </>:<a href="https://shortkit.kr/login">로그인 · 회원가입</a>}
    </div>}
    {!user&&enabled&&<div className="mobile-login-notice"><strong>ShortKit을 시작하려면 Google 계정으로 로그인해 주세요.</strong><a href="https://shortkit.kr/login">Google 로그인 · 회원가입</a></div>}
    <Studio scope={user?.userId||'device'}/>
    {user&&<GuideWelcome/>}
  </>;
}
