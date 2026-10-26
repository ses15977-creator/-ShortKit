const encoder=new TextEncoder();
async function cryptoKey(secret:string){if(!/^[a-f0-9]{64}$/i.test(secret))throw new Error('연결 저장 설정이 준비되지 않았습니다.');const raw=new Uint8Array(secret.match(/../g)!.map(h=>parseInt(h,16)));return crypto.subtle.importKey('raw',raw,{name:'AES-GCM'},false,['encrypt','decrypt']);}
function b64(bytes:Uint8Array){return btoa(Array.from(bytes,b=>String.fromCharCode(b)).join(''));}
function unb64(text:string){return Uint8Array.from(atob(text),c=>c.charCodeAt(0));}
export async function sealKey(apiKey:string,userId:string,secret:string){const iv=crypto.getRandomValues(new Uint8Array(12));const encrypted=await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:encoder.encode('shortkit:gemini:'+userId)},await cryptoKey(secret),encoder.encode(apiKey));return {ciphertext:b64(new Uint8Array(encrypted)),iv:b64(iv)};}
export async function openKey(ciphertext:string,iv:string,userId:string,secret:string){const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:unb64(iv),additionalData:encoder.encode('shortkit:gemini:'+userId)},await cryptoKey(secret),unb64(ciphertext));return new TextDecoder().decode(plain);}
