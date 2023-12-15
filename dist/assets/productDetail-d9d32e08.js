import{a as T,d as Z}from"./merchantCollect-2be16563.js";import{_ as Q,u as E,s as J,b as x,D as G,z as O,o,c as n,e as t,A as Y,M as X,x as D,h as H,p as L,k as K,E as V,K as M,l as $,m as q,r as S,t as _,g as m,F as W,i as tt,a as h,w as b,f as z,I as et}from"./index-d3737174.js";import{M as ot}from"./merchantDetail-886a5334.js";import{c as F}from"./product-d7d914fb.js";const B=u=>(L("data-v-ded7bf47"),u=u(),K(),u),st=B(()=>t("div",{class:"collect-not-icon"},null,-1)),ct={class:"collect-not-name"},nt=B(()=>t("div",{class:"collect-has-icon"},null,-1)),at=B(()=>t("div",{class:"collect-has-name"},"已收藏",-1)),lt=[nt,at],it={__name:"productCollect",props:{detail:{type:Object,required:!0},size:{type:String,default:"large"}},emits:["update"],setup(u,{emit:f}){const v=u,U=E(),{userInfo:A}=J(U),y=p=>{T({businessId:p,type:2,userId:A.value.userId}).then(()=>{V({message:"收藏成功",type:"success"}),f("update")})},w=p=>{Z({type:2,userTractId:p}).then(()=>{V({message:"取消收藏成功",type:"success"}),f("update")})},g=()=>{y(e.value.id)},I=()=>{D.confirm("是否确认取消收藏?","确认",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{w(e.value.userTractId)}).catch(()=>{})},e=x({});G(()=>v.detail,()=>{e.value=v.detail},{deep:!0,immediate:!0});const k=O(()=>v.size=="large"?"132px":"116px"),C=O(()=>v.size=="large"?"34px":"24px");return(p,N)=>(o(),n("div",{class:"collect-container",style:X({width:k.value,height:C.value})},[e.value.userTractId?(o(),n("div",{key:1,class:"collect-has",onClick:I},lt)):(o(),n("div",{key:0,class:"collect-not",onClick:g},[st,t("div",ct,[Y(p.$slots,"default",{},()=>[H("收藏产品")],!0)])]))],4))}},rt=Q(it,[["__scopeId","data-v-ded7bf47"]]);const a=u=>(L("data-v-0ddf26d2"),u=u(),K(),u),dt={class:"product-detail"},ut={class:"product-crumb"},pt=a(()=>t("div",{class:"product-crumb-item"},[t("span",null,"产品列表"),t("span",{class:"iconfont icon-youbian"})],-1)),_t={class:"product-crumb-item"},ht=a(()=>t("span",{class:"iconfont icon-youbian"},null,-1)),vt={class:"product-crumb-item"},At={class:"product-info"},ft={class:"product-info-left"},gt={class:"product-info-img"},mt={key:0,class:"product-info-img-tag"},yt=["src"],wt=["src"],Ut={class:"product-info-right"},It={class:"product-info-name"},kt={class:"product-info-name-text"},Ct={class:"product-info-name-img"},Rt=["src"],St=["src"],bt=["src"],xt={class:"product-info-content"},Bt={class:"product-info-content-top"},Nt={class:"product-info-content-item"},Ot=a(()=>t("div",{class:"product-info-content-item-key"},"依据标准",-1)),Vt={class:"product-info-content-item-value"},zt={class:"product-info-content-bottom"},Ft={class:"product-info-content-report"},Tt=a(()=>t("div",{class:"product-info-content-report-key"},"检测报告",-1)),Qt={key:0,class:"product-info-content-report-value"},Et=a(()=>t("span",{class:"product-info-content-report-value-text"},"暂无报告",-1)),Jt=[Et],Dt=a(()=>t("span",{class:"product-info-content-report-value-text"},"查看报告",-1)),Lt={class:"product-info-content-report"},Kt=a(()=>t("div",{class:"product-info-content-report-key"},"材型报告",-1)),Pt={key:0,class:"product-info-content-report-value"},jt=a(()=>t("span",{class:"product-info-content-report-value-text"},"暂无报告",-1)),Zt=[jt],Gt=a(()=>t("span",{class:"product-info-content-report-value-text"},"查看报告",-1)),Yt={class:"product-info-content-report"},Xt=a(()=>t("div",{class:"product-info-content-report-key"}," 绿色建材评审报告 ",-1)),Ht={key:0,class:"product-info-content-report-value"},Mt=a(()=>t("span",{class:"product-info-content-report-value-text"},"暂无报告",-1)),$t=[Mt],qt=a(()=>t("span",{class:"product-info-content-report-value-text"},"查看报告",-1)),Wt={class:"product-info-operate"},te=["src"],ee=a(()=>t("span",null,"交换联系方式",-1)),oe={class:"product-info-chat"},se=["src"],ce=a(()=>t("span",null,"询价",-1)),ne={class:"other-info"},ae={class:"other-info-left"},le={class:"other-info-right"},ie={class:"detail-container"},re=a(()=>t("div",{class:"detail-head"},[t("div",{class:"detail-head-active"},"产品详情")],-1)),de={class:"detail-body"},ue={__name:"productDetail",setup(u){const f=x(!1),v=()=>{f.value=!0,D.alert("".concat(w.value.principalPhone),"联系方式",{confirmButtonText:"确认",callback:()=>{}})},U=E(),{userInfo:A,isLogin:y}=J(U),w=M("detail",{}),g=i=>({1:new URL(""+new URL("product_star_1-18081443.png",import.meta.url).href,self.location).href,2:new URL(""+new URL("product_star_2-16047c80.png",import.meta.url).href,self.location).href,3:new URL(""+new URL("product_star_3-5bcb355f.png",import.meta.url).href,self.location).href})[i],I=$(),e=x({}),k=async()=>{let i=A.value.userId||"";const s=await F({id:e.value.id,userId:i});let{detectionUrl:c,evaluateUrl:l,woodTypeUrl:r}=s;c=c?JSON.parse(c):"",l=l?JSON.parse(l):"",r=r?JSON.parse(r):"",s.detectionUrl=c,s.evaluateUrl=l,s.woodTypeUrl=r,e.value=s};q(async()=>{const{productId:i}=I.params;let s=A.value?A.value.userId:"";try{const c=await F({id:i,userId:s});let{detectionUrl:l,evaluateUrl:r,woodTypeUrl:d}=c;l=l?JSON.parse(l):"",r=r?JSON.parse(r):"",d=d?JSON.parse(d):"",c.detectionUrl=l,c.evaluateUrl=r,c.woodTypeUrl=d,e.value=c,y.value&&C(c.id)}catch(c){console.log(c)}});const C=i=>{T({businessId:i,type:1,userId:A.value.userId}).then(()=>{})},p=i=>{const s={1:"一星",2:"二星",3:"三星"};return"绿色建材".concat(s[i])},N=()=>new URL(""+new URL("product_default-06c28a50.png",import.meta.url).href,self.location).href,P=()=>new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAGjSURBVFiF7ZZRdoJADEVvbBeEbEBcUDnsQNyBhy5I3IC6oZJ+yNA4wAg61h/zxwROLm/eJAPveHFIKJkUmvlr553UTwdICs3khw1CDwBAF6xjgSz8hTTXUhr2Y8UB5IdNjOIAn8GsUotw6B6VFUKGkCWFZjFU6AG0RQA4fcva5pJCM2kuykjDnhsemhK9LQjFeSe1wNYCRQfQj3CBYyVl93Ez7pO7Aey+DpktzbX016ICAKBcIFqzXaf+oKwaUQHsNlgV7N9bL0QHOO+kHlJBlZV7p1m0+WcAwLAKdi2GAeHGOV5+adcRXftd5qodZISWHOwDQyrYvQ+15KTQnoGH4mYnsyoIbI+VlGmupT0Nbt0VvhpkbTsfOzGTWqmVfQzCFRsbYhbSxqRWrAu6maCwSXMtj5WUvaNoiytXbVths8xV/W2ZPExCstuc/6eud7i8b9xZ0ywEEYp2iu6Hvpk1DX3ZnayPzIdZAA7iVInEApkNYEF8E1qQqXeFh2800PeGIapFOHRXOR404d0gBsi/5kUFsCCXegZmoPi/xNSZ8I6XxS+9IO57sTs/UwAAAABJRU5ErkJggg==",self.location).href,j=()=>new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAFzSURBVFiF7ZYxbsJAEEX/J5Q5R9pwAzYlqaKcImU4AeYE9ByCFikN5gahzR0ipUgb/TQDjBbv2jE4RApPQvbOGM/3zuzsAv8dbm8khc6CkGXK13fBV10JgPvQmJ5dJx0Gz85uv8J2d6K4AQ0+7EBALl8/QRKaCOjVPdA1FwFVRbhD0gjANYA3khtJVwAezb0g+SXpFsANgE+Sy1YqJK1k+ODa8262ubPNzeYZuf8HZw+p2E1TsBWWbChtSaaA5FLSPSwFZn4C8GL3C7sOUJ+CmaQPN16TLHajqhQci6Rn5VkBf2AV/JaAMY1zCUhyUIR+ycT7QrScBjXvfmglAO5cIGlKsujyvLBNwTrhn1i1Hhv8NeVIHckCqrfSKYASwAz7FIzrgvtUuqVekkyfPSQV0botnK9134j7QK4TFvb+IeLOdW78DOQ6nW1IIfF8fgZOQLBfijVwxO5mNTGsEeAp/SBbgKcgKuKi02A1IsJZgl9oyjfIE1soe4I5twAAAABJRU5ErkJggg==",self.location).href,R=i=>{let c=e.value[i][0].response.data;window.open(c)};return(i,s)=>{const c=S("View"),l=S("el-icon"),r=S("Download");return o(),n("div",dt,[t("div",ut,[pt,t("div",_t,[t("span",null,_(e.value.productType),1),ht]),t("div",vt,[t("span",null,_(e.value.productName),1)])]),t("div",At,[t("div",ft,[t("div",gt,[e.value.starRate?(o(),n("div",mt,_(p(e.value.starRate)),1)):m("",!0),e.value.image?(o(),n("img",{key:1,src:e.value.image.url,alt:"",style:{width:"100%",height:"100%"}},null,8,yt)):(o(),n("img",{key:2,src:N(),alt:"",style:{width:"100%",height:"100%"}},null,8,wt))])]),t("div",Ut,[t("div",It,[t("div",kt,_(e.value.name||""),1),t("div",Ct,[e.value.starRate==1?(o(),n("img",{key:0,src:g(1),alt:"",style:{width:"100%",height:"100%"}},null,8,Rt)):m("",!0),e.value.starRate==2?(o(),n("img",{key:1,src:g(2),alt:"",style:{width:"100%",height:"100%"}},null,8,St)):m("",!0),e.value.starRate==3?(o(),n("img",{key:2,src:g(3),alt:"",style:{width:"100%",height:"100%"}},null,8,bt)):m("",!0)])]),t("div",xt,[t("div",Bt,[t("div",Nt,[Ot,t("div",Vt,[(o(!0),n(W,null,tt(e.value.baseParam,d=>(o(),n("div",{key:d.code},_(d.name)+"("+_(d.code)+") ",1))),128))])])]),t("div",zt,[t("div",Ft,[Tt,e.value.detectionUrl?(o(),n("div",{key:1,class:"product-info-content-report-value",onClick:s[0]||(s[0]=d=>R("detectionUrl"))},[Dt,h(l,{size:16,color:"#316EFF"},{default:b(()=>[h(c)]),_:1})])):(o(),n("div",Qt,Jt))]),t("div",Lt,[Kt,e.value.woodTypeUrl?(o(),n("div",{key:1,class:"product-info-content-report-value",onClick:s[1]||(s[1]=d=>R("woodTypeUrl"))},[Gt,h(l,{size:16},{default:b(()=>[h(r)]),_:1})])):(o(),n("div",Pt,Zt))]),t("div",Yt,[Xt,e.value.evaluateUrl?(o(),n("div",{key:1,class:"product-info-content-report-value",onClick:s[2]||(s[2]=d=>R("evaluateUrl"))},[qt,h(l,{size:16},{default:b(()=>[h(r)]),_:1})])):(o(),n("div",Ht,$t))])])]),t("div",Wt,[z(y)?(o(),et(rt,{key:0,detail:e.value,onUpdate:k},null,8,["detail"])):m("",!0),t("div",{class:"product-info-phone",onClick:v},[t("img",{src:P(),alt:"",style:{width:"16px",height:"16px"}},null,8,te),ee]),t("div",oe,[t("img",{src:j(),alt:"",style:{width:"16px",height:"16px"}},null,8,se),ce])])])]),t("div",ne,[t("div",ae,[h(ot,{detail:z(w),isPhoneShow:f.value},null,8,["detail","isPhoneShow"])]),t("div",le,[t("div",ie,[re,t("div",de,_(e.value.introduce||"--"),1)])])])])}}},Ae=Q(ue,[["__scopeId","data-v-0ddf26d2"]]);export{Ae as default};