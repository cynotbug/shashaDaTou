import{_ as re,L as de,b as d,D as J,m as ue,z as pe,d as ve,r as L,o as l,c,e,t as m,f as N,I as _e,w as z,a as f,g as w,F as P,i as R,n as x,q,p as he,k as me}from"./index-7d372581.js";import{g as ye,b as fe}from"./product-691d5e20.js";const u=k=>(he("data-v-3a96e3c2"),k=k(),me(),k),ge={class:"product"},Ie={class:"condition-result"},xe=u(()=>e("div",{class:"condition-result-key"},"已选条件",-1)),Pe={class:"condition-result-value"},ke={class:"condition-result-item"},Ce=u(()=>e("div",{class:"condition-result-item-type"},"产品大类：",-1)),Se={class:"condition-result-item-name"},we={key:0,class:"condition-result-item"},Re=u(()=>e("div",{class:"condition-result-item-type"},"二级分类：",-1)),be={class:"condition-result-item-name"},Le={class:"condition-result-total"},Ne=u(()=>e("span",null,"共找到",-1)),ze={class:"condition-result-total-num"},Fe=u(()=>e("span",null,"条",-1)),Be={class:"search-condition"},De={class:"search-condition-item"},Te=u(()=>e("div",{class:"search-condition-item-key"},"产品大类",-1)),$e={class:"search-condition-item-value"},Ae={class:"search-condition-item-children-inner"},Ee=["onClick"],Ue=u(()=>e("span",null,"更多",-1)),Ve={class:"search-condition-item"},Je=u(()=>e("div",{class:"search-condition-item-key"},"二级分类",-1)),Me={class:"search-condition-item-value"},Oe={class:"search-condition-item-children-inner"},qe=["onClick"],Ge=u(()=>e("span",null,"更多",-1)),We={class:"search-condition-item"},je=u(()=>e("div",{class:"search-condition-item-key"},"绿色建材",-1)),He={class:"search-condition-item-value"},Ke={class:"search-condition-item-children"},Qe=["onClick"],Xe=u(()=>e("div",{class:"search-condition-item-more"},[e("span",null,"多选")],-1)),Ye={key:0,class:"material-item-empty"},Ze={class:"material-item-empty-img"},et=["src"],tt=u(()=>e("div",{class:"material-item-empty-text"},"暂无商品",-1)),st={key:1,class:"material-item-list-margin"},ot=["onClick"],nt={key:0,class:"material-item-list-item-label"},it={class:"material-item-list-item-img"},at=u(()=>e("div",{class:"material-item-list-item-img-detail"},"查看详情",-1)),lt=["src"],ct=["src"],rt={class:"material-item-list-item-name"},dt={class:"material-item-list-item-footer"},ut=u(()=>e("div",{class:"material-item-list-item-footer-icon"},null,-1)),pt={class:"material-item-list-item-footer-merchant"},vt={class:"result-pagination"},_t={__name:"index",props:{count:{type:Number,default:5},firstCategory:{type:[String,Number],default:""},secondCategory:{type:[String,Number],default:""},searchValue:{type:String,default:""},enterpriseId:{type:[String,Number],default:""},scopeType:{type:[String,Number],default:1}},setup(k,{expose:G}){const p=k;de(t=>({"06cde716":N(se)}));let v=d({producePropertyId:""}),r=d([{producePropertyId:""}]);J(()=>p.secondCategory,()=>{console.log(p.firstCategory,p.secondCategory);let t=g.value.findIndex(o=>o.producePropertyId==p.firstCategory);v.value=g.value[t],b();let s=y.value.findIndex(o=>o.producePropertyId==p.secondCategory);s!==-1&&(r.value=[y.value[s]]),I()});const g=d([]),y=d([]),W=d([{value:"",label:"全部"},{value:"1",label:"一星"},{value:"2",label:"二星"},{value:"3",label:"三星"}]),_=d([""]),j=t=>{let{value:s}=t,o=_.value.findIndex(i=>i==s);if(o!==-1)_.value.splice(o,1);else if(s=="")_.value=[""];else{let i=_.value.findIndex(a=>a=="");i!==-1&&_.value.splice(i,1),_.value.push(s)}_.value.length==0&&(_.value=[""]),I()},H=t=>{const{producePropertyId:s}=t;s!=v.value.producePropertyId&&(v.value={...t},b(),I())},K=t=>{const{producePropertyId:s}=t;let o=r.value.findIndex(i=>i.producePropertyId==s);if(o!==-1)r.value.splice(o,1);else if(s=="")r.value=[{name:"全部",secondInfo:null,producePropertyId:""}];else{let i=r.value.findIndex(a=>a.producePropertyId=="");i!==-1&&r.value.splice(i,1),r.value.push({...t})}r.value.length==0&&(r.value=[{name:"全部",secondInfo:null,producePropertyId:""}]),I()},Q=()=>{v.value={name:"全部",secondInfo:null,producePropertyId:""},b(),I()},X=t=>{r.value.splice(t,1),r.value.length==0&&(r.value=[{name:"全部",secondInfo:null,producePropertyId:""}]),I()},Y=t=>_.value.findIndex(o=>o==t.value)!==-1,Z=t=>t.producePropertyId==v.value.producePropertyId,ee=t=>r.value.findIndex(o=>o.producePropertyId==t.producePropertyId)!==-1,b=()=>{let t=JSON.parse(JSON.stringify(g.value));if(t=t.filter(s=>s.producePropertyId),v.value.producePropertyId){let s=t.filter(o=>o.producePropertyId==v.value.producePropertyId);if(s.length>0){let o=s[0].secondInfo||[];o.unshift({name:"全部",secondInfo:null,producePropertyId:""}),y.value=o}}else{let s=t.reduce((o,i)=>{let{secondInfo:a}=i;return a=a||[],[...o,...a]},[]);s.unshift({name:"全部",secondInfo:null,producePropertyId:""}),y.value=s}r.value=[{name:"全部",secondInfo:null,producePropertyId:""}]},F=d(100),B=d(1),M=d(20),te=t=>{B.value=t},D=d([]),I=()=>{B.value=1,O()},O=()=>{let t={...v.value};t=t.producePropertyId;let s=[...r.value];s=s.filter(a=>!!a),s=s.map(a=>a.producePropertyId),s=s.findIndex(a=>a=="")!==-1?[]:s;let o=[..._.value];o=o.filter(a=>!!a),o=o.length>0?o:[];const i={content:p.searchValue,contentType:2,enterpriseId:p.enterpriseId,firstProId:t,scopeType:p.scopeType,secondProIds:s,starRates:o,page:B.value,size:M.value};fe(i).then(a=>{const{total:V,records:n}=a;F.value=V,n.forEach(h=>{h.image=h.image?JSON.parse(h.image):""}),D.value=n})};ue(async()=>{try{let t=await ye();t.unshift({name:"全部",secondInfo:[],producePropertyId:""}),g.value=t;let s=t.findIndex(i=>i.producePropertyId==p.firstCategory);v.value=g.value[s],b();let o=y.value.findIndex(i=>i.producePropertyId==p.secondCategory);o!==-1&&(r.value=[y.value[o]]),O()}catch{}});const T=d(null);let se=pe(()=>{let t=1200;return T.value&&(t=T.value.getBoundingClientRect().width),`${parseFloat((t-12*(p.count-1))/p.count)}px`});const $=d(null),A=d(null);J(()=>y.value,async()=>{C.value=!0,await q(),$.value&&($.value.getBoundingClientRect().height>42?E.value=!0:E.value=!1)},{}),J(()=>g.value,async()=>{S.value=!0,await q(),A.value&&(A.value.getBoundingClientRect().height>42?U.value=!0:U.value=!1)},{});const E=d(!1),U=d(!1),C=d(!1),S=d(!1),oe=()=>{C.value=!C.value},ne=()=>{S.value=!S.value},ie=()=>new URL(""+new URL("product_default-06c28a50.png",import.meta.url).href,self.location).href,ae=()=>new URL(""+new URL("no_data_product-9baa24c6.png",import.meta.url).href,self.location).href,le=ve(),ce=t=>{const{enterpriseId:s,id:o}=t;le.push({path:`/shop/merchant/${s}/product/detail/${o}`})};return G({resetAndGetData:I}),(t,s)=>{const o=L("CloseBold"),i=L("el-icon"),a=L("ArrowDown"),V=L("el-pagination");return l(),c("div",ge,[e("div",Ie,[xe,e("div",Pe,[e("div",ke,[Ce,e("div",Se,m(N(v).name),1),N(v).producePropertyId!==""?(l(),_e(i,{key:0,size:12,style:{color:"#999999"},onClick:Q},{default:z(()=>[f(o)]),_:1})):w("",!0)]),(l(!0),c(P,null,R(N(r),(n,h)=>(l(),c(P,{key:n.producePropertyId},[n.producePropertyId!==""?(l(),c("div",we,[Re,e("div",be,m(n.name),1),f(i,{size:12,style:{color:"#999999"},onClick:ht=>X(h)},{default:z(()=>[f(o)]),_:2},1032,["onClick"])])):w("",!0)],64))),128)),e("div",Le,[Ne,e("span",ze,m(F.value),1),Fe])])]),e("div",Be,[e("div",De,[Te,e("div",$e,[e("div",{class:x(["search-condition-item-children",[S.value?"expand":"unexpand"]]),ref_key:"firstRef",ref:A},[e("div",Ae,[(l(!0),c(P,null,R(g.value,n=>(l(),c("div",{class:x(["search-condition-item-child",{active:Z(n)}]),key:n.producePropertyId,onClick:h=>H(n)},m(n.name),11,Ee))),128))])],2),U.value?(l(),c("div",{key:0,class:"search-condition-item-more",onClick:ne},[Ue,f(i,{size:12,style:{color:"#666666"},class:x(["search-condition-item-more-icon",[S.value?"expand":"unexpand"]])},{default:z(()=>[f(a)]),_:1},8,["class"])])):w("",!0)])]),e("div",Ve,[Je,e("div",Me,[e("div",{class:x(["search-condition-item-children",[C.value?"expand":"unexpand"]]),ref_key:"secondRef",ref:$},[e("div",Oe,[(l(!0),c(P,null,R(y.value,n=>(l(),c("div",{class:x(["search-condition-item-child",{active:ee(n)}]),key:n.producePropertyId,onClick:h=>K(n)},m(n.name),11,qe))),128))])],2),E.value?(l(),c("div",{key:0,class:"search-condition-item-more",onClick:oe},[Ge,f(i,{size:12,style:{color:"#666666"},class:x(["search-condition-item-more-icon",[C.value?"expand":"unexpand"]])},{default:z(()=>[f(a)]),_:1},8,["class"])])):w("",!0)])]),e("div",We,[je,e("div",He,[e("div",Ke,[(l(!0),c(P,null,R(W.value,n=>(l(),c("div",{class:x(["search-condition-item-child",{active:Y(n)}]),key:n.value,onClick:h=>j(n)},m(n.label),11,Qe))),128))]),Xe])])]),e("div",{class:"material-item-list",ref_key:"listRef",ref:T},[D.value.length==0?(l(),c("div",Ye,[e("div",Ze,[e("img",{src:ae(),alt:"",style:{width:"100%",height:"100%"}},null,8,et)]),tt])):(l(),c("div",st,[(l(!0),c(P,null,R(D.value,n=>(l(),c("div",{class:"material-item-list-item",key:n.id,onClick:h=>ce(n)},[n.startRateDesc?(l(),c("div",nt,m(n.startRateDesc),1)):w("",!0),e("div",it,[at,n.image?(l(),c("img",{key:1,src:n.image.url,alt:"",style:{width:"100%",height:"100%"}},null,8,ct)):(l(),c("img",{key:0,src:ie(),alt:"",style:{width:"100%",height:"100%"}},null,8,lt))]),e("div",rt,m(n.name),1),e("div",dt,[ut,e("div",pt,m(n.enterpriseName),1)])],8,ot))),128))]))],512),e("div",vt,[f(V,{background:"",layout:"prev, pager, next",total:F.value,"page-size":M.value,onCurrentChange:te},null,8,["total","page-size"])])])}}},ft=re(_t,[["__scopeId","data-v-3a96e3c2"]]);export{ft as C};
