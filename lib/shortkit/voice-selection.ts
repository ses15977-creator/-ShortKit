export type VoiceGender='female'|'male';
export type VoiceTone='bright'|'dark'|'normal';
export type CatalogVoice={id?:string;gender?:string;pitch?:string;type?:string};

const femalePreference=['Aoede','Callirrhoe','Achernar','Vindemiatrix','Despina','Leda'];
const malePreference=['Charon','Orus','Iapetus','Algieba','Fenrir'];

export function selectVoice(voices:CatalogVoice[],gender:VoiceGender,tone:VoiceTone){
 const matching=voices.filter(v=>v.gender?.toLowerCase()===gender&&
  (!v.type||v.type.toLowerCase()==='prebuilt'||v.type==='VOICE_TYPE_PREBUILT')&&
  typeof v.id==='string'&&/^[A-Za-z][A-Za-z0-9_-]{1,79}$/.test(v.id));
 const preference=gender==='female'?femalePreference:malePreference;
 // The previous female default sounded masculine in Korean. Use a different
 // catalog-confirmed female voice, with a calm delivery for the dark tone.
 const eligible=gender==='female'?matching.filter(v=>v.id!=='Kore'):matching;
 const ranked=eligible.sort((a,b)=>{
  const pa=preference.indexOf(a.id!);const pb=preference.indexOf(b.id!);
  const rank=(v:CatalogVoice,index:number)=>(index<0?100:index)*10+(v.pitch==='medium'?0:1);
  return rank(a,pa)-rank(b,pb);
 });
 if(!ranked[0])throw new Error('선택한 성별의 AI 목소리를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.');
 return ranked[0].id!;
}

const cache=new Map<VoiceGender,{expires:number;voices:CatalogVoice[]}>();
export async function getCatalogVoice(apiKey:string,gender:VoiceGender,tone:VoiceTone){
 let item=cache.get(gender);
 if(!item||item.expires<Date.now()){
  const url=new URL('https://generativelanguage.googleapis.com/v1beta/voices');
  url.searchParams.set('type','prebuilt');url.searchParams.set('gender',gender);url.searchParams.set('page_size','100');
  const response=await fetch(url,{headers:{'x-goog-api-key':apiKey},signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw new Error('AI 목소리의 성별을 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.');
  const data=await response.json() as {voices?:CatalogVoice[]};
  item={voices:data.voices||[],expires:Date.now()+30*60*1000};cache.set(gender,item);
 }
 return selectVoice([...item.voices],gender,tone);
}

export function voiceStyle(tone:VoiceTone){return {bright:'밝고 경쾌하고 또렷하게',dark:'차분하고 진중하게, 여유 있는 속도로',normal:'자연스럽고 담백하게'}[tone];}
