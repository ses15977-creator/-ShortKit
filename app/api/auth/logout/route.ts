import {sessionCookie} from '@/lib/shortkit/google-auth';
export async function GET(request:Request){const response=new Response(null,{status:302,headers:{Location:'https://shortkit.kr/'}});response.headers.set('Set-Cookie',sessionCookie('',0));response.headers.set('Cache-Control','no-store');return response;}
