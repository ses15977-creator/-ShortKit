import assert from 'node:assert/strict';
import ts from 'typescript';
import {readFileSync} from 'node:fs';
const source=ts.transpileModule(readFileSync('lib/shortkit/kakao-places.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const {kakaoPlaces}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const result=kakaoPlaces({documents:[{id:'123',place_name:'우리식당',road_address_name:'진주시 도로 1',address_name:'지번 주소'}, {id:'123',place_name:'중복',address_name:'주소'}, {id:'456',place_name:'지번식당',address_name:'진주시 지번 2'}, {id:'javascript:bad',place_name:'잘못된 결과',address_name:'주소'}]});
assert.equal(result.places.length,2);assert.equal(result.places[0].address,'진주시 도로 1');assert.equal(result.places[1].address,'진주시 지번 2');assert.equal(result.places[0].sources[0].url,'https://place.map.kakao.com/123');assert.equal(kakaoPlaces(null).places.length,0);assert.equal(kakaoPlaces({documents:[{id:'1',place_name:'주소없음'}]}).places.length,0);console.log('PASS: Kakao road/address fallback, deduplication, source safety, invalid results.');
