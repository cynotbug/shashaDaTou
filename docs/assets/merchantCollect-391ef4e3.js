import{C as p,_ as C,u as I,s as S,K as d,z as i,o as a,c as n,f as k,e as c,A as T,h as b,M as B,x as z,p as M,k as E,E as u}from"./index-3f2c23ac.js";function O(e){return p.post("/user/trace/insert",e)}function w(e){return p.post("/user/trace/delete",e)}const l=e=>(M("data-v-07df6bfb"),e=e(),E(),e),R=l(()=>c("div",{class:"collect-not-icon"},null,-1)),N={class:"collect-not-name"},U=l(()=>c("div",{class:"collect-has-icon"},null,-1)),V=l(()=>c("div",{class:"collect-has-name"},"已收藏",-1)),j=[U,V],A={__name:"merchantCollect",props:{size:{type:String,default:"large"}},setup(e){const r=e,_=I(),{userInfo:h}=S(_),o=d("detail",{}),s=d("updateFn"),f=t=>{O({businessId:t,type:3,userId:h.value.userId}).then(()=>{u({message:"收藏成功",type:"success"}),s&&s()})},m=t=>{w({type:3,userTractId:t}).then(()=>{u({message:"取消收藏成功",type:"success"}),s&&s()})},v=()=>{f(o.value.id)},g=()=>{z.confirm("是否确认取消收藏?","确认",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{m(o.value.userTractId)}).catch(()=>{})},x=i(()=>r.size=="large"?"196px":"116px"),y=i(()=>r.size=="large"?"34px":"24px");return(t,D)=>(a(),n("div",{class:"collect-container",style:B({width:x.value,height:y.value})},[k(o).userTractId?(a(),n("div",{key:1,class:"collect-has",onClick:g},j)):(a(),n("div",{key:0,class:"collect-not",onClick:v},[R,c("div",N,[T(t.$slots,"default",{},()=>[b("收藏供应商")],!0)])]))],4))}},H=C(A,[["__scopeId","data-v-07df6bfb"]]);export{H as M,O as a,w as d};
