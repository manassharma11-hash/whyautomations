import{c as s}from"./index-e35cfc3.js";import{u as a}from"./useQuery-D9YR7ykg-26a8f87.js";import{s as o}from"./client-C_NsMxjx-26a8f87.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n=s("LayoutGrid",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]]),d=r=>a({queryKey:["portfolio-works",r],queryFn:async()=>{let t=o.from("portfolio_works").select("*").order("display_order",{ascending:!0});const{data:i,error:e}=await t;if(e)throw e;return i}}),h=r=>{if(r.startsWith("http")||r.startsWith("/"))return r;const{data:t}=o.storage.from("portfolio-images").getPublicUrl(r);return t.publicUrl};export{n as L,h as g,d as u};
