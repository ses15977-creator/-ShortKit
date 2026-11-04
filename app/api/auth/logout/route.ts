import {sessionCookie} from '@/lib/shortkit/google-auth';
export const dynamic='force-dynamic';
export async function GET(){
 const response=new Response(null,{status:303,headers:{Location:'https://shortkit.kr/login', 'Cache-Control':'no-store, no-cache, must-revalidate'}});
 response.headers.append('Set-Cookie',sessionCookie('',0));
 response.headers.append('Set-Cookie','shortkit_oauth=; Path=/api/auth/google; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
 return response;
}
