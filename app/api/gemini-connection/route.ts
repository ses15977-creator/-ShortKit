import {getSiteUser} from '../../site-auth';
import {getSharedGeminiConnection,publicConnection} from '@/lib/shortkit/gemini-server';
export const dynamic='force-dynamic';
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(){try{const user=await getSiteUser();if(process.env.SHORTKIT_REQUIRE_LOGIN==='1'&&user?.provider!=='google')return json({error:'로그인이 필요합니다.'},401);return json(publicConnection(await getSharedGeminiConnection(user?.userId,user?.email)));}catch{return json({error:'연결 상태를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.'},503);}}
// The public editor only reads the owner's shared connection. Key rotation is
// deliberately outside the public browser API.
export async function POST(){return json({error:'이 사이트의 AI 연결은 공용으로 고정되어 있습니다.'},405);}
export async function DELETE(){return json({error:'이 사이트의 AI 연결은 공용으로 고정되어 있습니다.'},405);}
