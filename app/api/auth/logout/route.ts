import {sessionCookie} from '@/lib/shortkit/google-auth';
export async function GET(request:Request){const response=Response.redirect(new URL('/',request.url),302);response.headers.set('Set-Cookie',sessionCookie('',0));response.headers.set('Cache-Control','no-store');return response;}
