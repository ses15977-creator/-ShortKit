'use client';
import type {ShoppingInfo,ShoppingType} from '@/lib/shortkit/model';
import {defaultShoppingInfo} from '@/lib/shortkit/model';
type Props={name:string;shopping?:ShoppingInfo;cta:'profile'|'comment';onChange:(patch:{subject?:string;shopping?:ShoppingInfo;cta?:'profile'|'comment'})=>void};
const types:{value:ShoppingType;label:string;desc:string}[]=[
 {value:'promo',label:'상품 소개',desc:'특징·장점 중심'},
 {value:'review',label:'사용 후기',desc:'제공한 실제 후기만'},
 {value:'sale',label:'할인·특가',desc:'입력한 가격·기간만'},
];
export default function ShoppingFields({name,shopping,cta,onChange}:Props){
 const info=shopping||defaultShoppingInfo();
 const set=(patch:Partial<ShoppingInfo>)=>onChange({shopping:{...info,...patch}});
 const price=(v:string)=>v.replace(/[^0-9]/g,'').slice(0,12);
 return <section className="sk-shopping-fields" aria-label="쇼핑 쇼츠 상품 정보">
  <div className="sk-shopping-heading"><strong>쇼핑 쇼츠 상품 정보</strong><small>AI 빠른 제작과 직접 제작에 공통으로 저장됩니다.</small></div>
  <div className="sk-shopping-types" role="group" aria-label="쇼핑 영상 유형">{types.map(t=><button key={t.value} type="button" aria-pressed={info.type===t.value} className={info.type===t.value?'selected':''} onClick={()=>set({type:t.value})}><b>{t.label}</b><small>{t.desc}</small></button>)}</div>
  <div className="sk-shopping-inputs">
   <label>상품명 <span>필수</span><input required value={name} maxLength={100} placeholder="예: 휴대용 미니 선풍기" onChange={e=>onChange({subject:e.target.value})}/></label>
   <label>판매가 (원)<input inputMode="numeric" value={info.price} maxLength={12} placeholder="예: 29900" onChange={e=>set({price:price(e.target.value)})}/></label>
   <label>할인가 (원)<input inputMode="numeric" value={info.salePrice} maxLength={12} placeholder="할인 중인 경우만" onChange={e=>set({salePrice:price(e.target.value)})}/></label>
   <label>할인 종료일 (선택)<input type="date" value={info.promotionEnds} onChange={e=>set({promotionEnds:e.target.value})}/></label>
   <label className="sk-shopping-wide">핵심 특징 / 제공받은 실제 후기<textarea rows={3} maxLength={1000} value={info.features} placeholder="실제 확인된 특징을 줄마다 입력해 주세요. AI가 임의의 후기나 효능을 만들지 않아요." onChange={e=>set({features:e.target.value})}/></label>
   <label className="sk-shopping-wide">구매 링크 (선택)<input type="url" maxLength={600} value={info.purchaseLink} placeholder="https://example.com/product" onChange={e=>set({purchaseLink:e.target.value})}/></label>
   <label className="sk-shopping-wide">구매 안내 위치<select value={cta} onChange={e=>onChange({cta:e.target.value as 'profile'|'comment'})}><option value="profile">프로필 링크</option><option value="comment">고정댓글</option></select></label>
  </div>
  <p className="sk-shopping-notice">가격·혜택은 입력한 내용만 사용합니다. 구매 링크는 게시글에 포함할 수 있으며, 영상에는 구매 안내 문구로 표시됩니다. 실제 확인되지 않은 성능이나 후기는 생성하지 않아요.</p>
 </section>;
}
