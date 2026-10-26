import {getSiteUser} from '../../site-auth';
import {usageStatus} from '@/lib/shortkit/shared-quota';
export const dynamic='force-dynamic';
export async function GET(request:Request){try{const user=await getSiteUser();const status=await usageStatus(request,user?.userId,user?.email);return Response.json(status.owner?status:{owner:false},{headers:{'Cache-Control':'no-store'}});}catch{return Response.json({error:'사용량을 확인하지 못했습니다.'},{status:503,headers:{'Cache-Control':'no-store'}});}}
