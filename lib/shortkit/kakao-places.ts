import type {PlaceSearchResult} from './places';
export function kakaoPlaces(data:unknown):PlaceSearchResult{
 const rows=(data as {documents?:unknown[]}|null)?.documents;const result:PlaceSearchResult={places:[],searchSuggestions:''};const seen=new Set<string>();
 for(const raw of Array.isArray(rows)?rows.slice(0,5):[]){if(!raw||typeof raw!=='object')continue;const row=raw as Record<string,unknown>;const name=typeof row.place_name==='string'?row.place_name.trim():'';const address=typeof row.road_address_name==='string'&&row.road_address_name.trim()?row.road_address_name.trim():typeof row.address_name==='string'?row.address_name.trim():'';const id=typeof row.id==='string'?row.id:'';if(!name||!address||!/^\d+$/.test(id)||seen.has(id))continue;seen.add(id);result.places.push({name,address,sources:[{title:'카카오맵',url:'https://place.map.kakao.com/'+id}]});}
 if(!result.places.length)result.message='가게를 찾지 못했습니다. 지역과 지점명을 함께 입력해 주세요.';return result;
}
