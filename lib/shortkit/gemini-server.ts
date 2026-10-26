import {env} from 'cloudflare:workers';
import {openKey,sealKey} from './key-crypto';
export type GeminiConnection={apiKey:string;textModel:string;ttsModel:string|null;source:'account'|'server'|'shared'};
type Bindings={DB?:D1Database;SHORTKIT_KEY_ENCRYPTION_SECRET?:string;GEMINI_API_KEY?:string;GEMINI_MODEL?:string;GEMINI_TTS_MODEL?:string;SHORTKIT_OWNER_USER_ID?:string};
const bindings=()=>env as unknown as Bindings;
function db(){const d=bindings().DB;if(!d)throw new Error('연결 저장 공간을 준비 중입니다. 잠시 후 다시 시도해 주세요.');return d;}
export async function getGeminiConnection(userId:string):Promise<GeminiConnection|null>{const b=bindings();if(b.DB){const row=await db().prepare('SELECT ciphertext, iv, text_model, tts_model FROM gemini_connections WHERE user_id = ?').bind(userId).first<{ciphertext:string;iv:string;text_model:string;tts_model:string|null}>();if(row){if(!b.SHORTKIT_KEY_ENCRYPTION_SECRET)throw new Error('연결 저장 설정을 확인해 주세요.');const apiKey=await openKey(row.ciphertext,row.iv,userId,b.SHORTKIT_KEY_ENCRYPTION_SECRET);return {apiKey,textModel:row.text_model,ttsModel:row.tts_model,source:'account'};}}return b.GEMINI_API_KEY?{apiKey:b.GEMINI_API_KEY,textModel:b.GEMINI_MODEL||'gemini-3.8-flash',ttsModel:b.GEMINI_TTS_MODEL||'gemini-3.8-flash-tts',source:'server'}:null;}
export async function verifyGeminiKey(apiKey:string){const models:{name:string;supportedGenerationMethods?:string[]}[]=[];let token:string|undefined;for(let page=0;page<5;page++){const url=new URL('https://generativelanguage.googleapis.com/v1beta/models');url.searchParams.set('pageSize','1000');if(token)url.searchParams.set('pageToken',token);const response=await fetch(url,{headers:{'x-goog-api-key':apiKey},signal:AbortSignal.timeout(20000)});if(!response.ok)throw new Error(response.status===429?'Gemini 요청 한도에 도달했습니다. 잠시 후 다시 확인해 주세요.':response.status>=500?'Google 연결에 일시적인 문제가 있습니다. 다시 시도해 주세요.':'키를 확인하지 못했습니다. Google AI Studio의 Gemini API 키와 권한을 확인해 주세요.');const data=await response.json() as {models?:typeof models;nextPageToken?:string};models.push(...(data.models||[]));token=data.nextPageToken;if(!token)break;}
const names=models.filter(m=>m.supportedGenerationMethods?.includes('generateContent')).map(m=>m.name.replace(/^models\//,''));const prefer=(options:string[])=>options.find(m=>names.includes(m));const textModel=prefer(['gemini-3.8-flash','gemini-3.6-flash','gemini-3-flash-preview','gemini-2.5-flash']);const ttsModel=prefer(['gemini-3.8-flash-tts','gemini-3.8-flash-lite-tts','gemini-3.1-flash-tts-preview','gemini-2.5-flash-preview-tts'])||null;if(!textModel)throw new Error('이 키에서 숏킷이 지원하는 영상 분석 모델을 찾지 못했습니다. Gemini 모델 권한을 확인해 주세요.');return {textModel,ttsModel};}
export async function saveGeminiConnection(userId:string,apiKey:string,models:{textModel:string;ttsModel:string|null}){const secret=bindings().SHORTKIT_KEY_ENCRYPTION_SECRET;if(!secret)throw new Error('연결 저장 설정을 준비 중입니다.');const sealed=await sealKey(apiKey,userId,secret);await db().prepare('INSERT INTO gemini_connections (user_id, ciphertext, iv, text_model, tts_model, verified_at) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(user_id) DO UPDATE SET ciphertext=excluded.ciphertext, iv=excluded.iv, text_model=excluded.text_model, tts_model=excluded.tts_model, verified_at=excluded.verified_at').bind(userId,sealed.ciphertext,sealed.iv,models.textModel,models.ttsModel,Date.now()).run();}
export async function deleteGeminiConnection(userId:string){await db().prepare('DELETE FROM gemini_connections WHERE user_id = ?').bind(userId).run();}
export function publicConnection(connection:GeminiConnection|null){return {connected:!!connection,voiceAvailable:!!connection?.ttsModel,source:connection?.source||null};}

// Emails must come only from a server-verified Google or ChatGPT session.
const administratorEmails=new Set(['ses15977@gmail.com','kimhj1307@gmail.com']);
export function isShortkitOwner(userId:string|undefined,email?:string){return !!userId&&((!!bindings().SHORTKIT_OWNER_USER_ID&&userId===bindings().SHORTKIT_OWNER_USER_ID)||administratorEmails.has(email?.trim().toLowerCase()||''));}
export async function getSharedGeminiConnection(userId?:string,email?:string):Promise<GeminiConnection|null>{
 const ownerId=bindings().SHORTKIT_OWNER_USER_ID;
 if(!ownerId)return userId?getGeminiConnection(userId):null;
 const key=await getGeminiConnection(ownerId);
 if(!key)return null;
 // Google rejects Gemini 2.5 Flash for new users; retain the verified saved model.
 return {...key,source:isShortkitOwner(userId,email)?'account':'shared'};
}
