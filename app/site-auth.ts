import {cookies} from 'next/headers';
import {getChatGPTUser} from './chatgpt-auth';
import {readSession,sessionCookieName} from '@/lib/shortkit/google-auth';
import {isShortkitOwner} from '@/lib/shortkit/gemini-server';
import {runtimeEnv as env} from '@/lib/shortkit/runtime-env';
import {memberVisitorId} from '@/lib/shortkit/shared-quota';
export type SiteUser={userId:string;email:string;displayName:string;provider:'google'|'chatgpt'};
export async function getSiteUser():Promise<SiteUser|null>{const chatgpt=await getChatGPTUser();if(isShortkitOwner(chatgpt?.userId,chatgpt?.email))return chatgpt?{...chatgpt,provider:'chatgpt'}:null;const store=await cookies();const google=await readSession(store.get(sessionCookieName())?.value);if(google)return google;return chatgpt?{...chatgpt,provider:'chatgpt'}:null;}
export async function registerMember(user:SiteUser){const db=(env as unknown as {DB?:D1Database}).DB;if(!db)return;const visitor=await memberVisitorId(user.userId);await db.prepare('INSERT INTO site_members(user_id,provider,email,display_name,usage_visitor,created_at,last_seen_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET email=excluded.email,display_name=excluded.display_name,usage_visitor=excluded.usage_visitor,last_seen_at=excluded.last_seen_at').bind(user.userId,user.provider,user.email,user.displayName,visitor,Date.now(),Date.now()).run();}
