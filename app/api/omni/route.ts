export const dynamic='force-dynamic';
const paused=()=>Response.json({owner:false,available:false,error:'Omni 테스트는 비용 정책 확정까지 중단되었습니다.'},{status:503,headers:{'Cache-Control':'no-store'}});
export async function GET(){return paused();}
export async function POST(){return paused();}
