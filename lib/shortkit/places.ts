export type PlaceSource={title:string;url:string};
export type PlaceResult={name:string;address:string;sources:PlaceSource[]};
export type PlaceSearchResult={places:PlaceResult[];searchSuggestions:string;message?:string;error?:string};
export type GroundedCandidate={content?:{parts?:{text?:string;thought?:boolean}[]};groundingMetadata?:{webSearchQueries?:string[];searchEntryPoint?:{renderedContent?:string};groundingChunks?:{web?:{uri?:string;title?:string}}[];groundingSupports?:{segment?:{text?:string};groundingChunkIndices?:number[]}[]}};
const normalize=(s:string)=>s.normalize('NFC').replace(/\s+/g,'').toLowerCase();
function sourceUrl(value:unknown){if(typeof value!=='string')return null;try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password?url.href:null;}catch{return null;}}
export function groundedPlaces(candidate:GroundedCandidate|undefined):PlaceSearchResult{
 const metadata=candidate?.groundingMetadata;const suggestions=metadata?.searchEntryPoint?.renderedContent;
 const result:PlaceSearchResult={places:[],searchSuggestions:typeof suggestions==='string'&&suggestions.length<=100000?suggestions:''};
 if(!metadata?.webSearchQueries?.length||!metadata.groundingChunks?.length)return {...result,message:'검색 출처를 확인하지 못했습니다. 지역과 지점명을 함께 입력하거나 직접 입력해 주세요.'};
 const text=candidate?.content?.parts?.filter(p=>!p.thought).map(p=>p.text||'').join('')||'';
 const start=text.indexOf('{'),end=text.lastIndexOf('}');let parsed:unknown;try{parsed=JSON.parse(text.slice(start,end+1));}catch{return {...result,message:'검색 결과를 정리하지 못했습니다. 지역과 가게 이름을 더 구체적으로 입력해 주세요.'};}
 const rows=(parsed as {places?:unknown})?.places;if(!Array.isArray(rows))return result;
 const seen=new Set<string>();for(const row of rows.slice(0,6)){if(!row||typeof row!=='object')continue;const name=typeof row.name==='string'?row.name.trim():'',address=typeof row.address==='string'?row.address.trim():'';if(!name||name.length>100||address.length<5||address.length>200)continue;
 // Only allow addresses explicitly covered by Google's grounding metadata.
 // Model-written URLs are never accepted as citations.
 const indices=new Set<number>();for(const support of metadata.groundingSupports||[]){if(support.segment?.text&&normalize(support.segment.text).includes(normalize(address)))for(const i of support.groundingChunkIndices||[])if(Number.isInteger(i)&&i>=0)indices.add(i);}
 const sources:PlaceSource[]=[];for(const i of indices){const web=metadata.groundingChunks[i]?.web;const url=sourceUrl(web?.uri);if(url&&!sources.some(s=>s.url===url))sources.push({url,title:(web?.title||'검색 출처').slice(0,200)});}
 const key=normalize(name+'|'+address);if(sources.length&&!seen.has(key)){seen.add(key);result.places.push({name,address,sources:sources.slice(0,5)});}}
 if(!result.places.length)result.message='출처가 연결된 주소를 찾지 못했습니다. 지역·지점명을 추가해 검색하거나 직접 입력해 주세요.';return result;
}
