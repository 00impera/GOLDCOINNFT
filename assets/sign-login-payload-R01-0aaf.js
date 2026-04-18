import{r as e}from"./chunk-CFjPhJqf.js";function t(e){let t=[`${e.domain} wants you to sign in with your Ethereum account:`,e.address].join(`
`);t=[t,e.statement].join(`

`),e.statement&&(t+=`
`);let n=[];if(e.uri){let t=`URI: ${e.uri}`;n.push(t)}let r=`Version: ${e.version}`;if(n.push(r),e.chain_id){let t=`Chain ID: ${e.chain_id}`||`1`;n.push(t)}let i=`Nonce: ${e.nonce}`;n.push(i);let a=`Issued At: ${e.issued_at}`;n.push(a);let o=`Expiration Time: ${e.expiration_time}`;if(n.push(o),e.invalid_before){let t=`Not Before: ${e.invalid_before}`;n.push(t)}e.resources&&n.push([`Resources:`,...e.resources.map(e=>`- ${e}`)].join(`
`));let s=n.join(`
`);return[t,s].join(`
`)}var n=e({signLoginPayload:()=>r});async function r(e){let{payload:n,account:r}=e;return{payload:n,signature:await r.signMessage({message:t(n)})}}export{n,r as t};