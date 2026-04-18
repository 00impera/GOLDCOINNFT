import{t as e}from"./jsx-runtime-D7NWPKSi.js";import{J as t,Q as n,T as r,b as i,ct as a,ft as o,gn as s,h as c,m as l,mn as u,st as d,t as f,vn as p,x as m,y as h}from"./WalletImage-Dq5xAmM-.js";var g=e();function _(e){return(0,g.jsx)(S,{"data-error":e.error,children:(0,g.jsx)(`div`,{"data-container":!0,style:{alignItems:`center`,display:`flex`,justifyContent:`center`,position:`relative`},children:(0,g.jsxs)(`div`,{"data-img-container":!0,children:[!e.hideSpinner&&(0,g.jsx)(`svg`,{role:`presentation`,style:{display:e.error?`none`:`block`},viewBox:`0 0 110 110`,children:(0,g.jsx)(`rect`,{fill:`none`,height:`106`,rx:20,strokeDasharray:`132 261`,strokeDashoffset:-388,strokeLinecap:`round`,strokeWidth:4,width:`106`,x:`2`,y:`2`})}),(0,g.jsx)(v,{children:(0,g.jsx)(f,{client:e.client,id:e.id,size:`68`})})]})})})}var v=n(()=>{let e=o();return{alignItems:`center`,background:e.colors.tertiaryBg,border:`1px solid ${e.colors.borderColor}`,borderRadius:`13px`,display:`flex`,justifyContent:`center`,padding:p.xs}}),y=a`
from {
  stroke-dashoffset: 0px;
}
`,b=a`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
`,x=a`
0% {
  transform: scale(0.95);
}
100% {
  opacity: 0;
  transform: scale(1.3);
}
`,S=n(e=>{let t=o();return{"[data-img-container]":{alignItems:`center`,display:`flex`,justifyContent:`center`,position:`relative`},"&[data-error='true'] [data-container]":{animation:`${b} 0.25s linear`},"&[data-error='true'] [data-img-container]::before":{animation:`${x} 1.5s ease infinite`,background:t.colors.danger,borderRadius:`20px`,content:`""`,inset:0,position:`absolute`,zIndex:-1},borderRadius:s.xl,display:`flex`,img:{zIndex:100},justifyContent:`center`,position:`relative`,rect:{animation:`${y} 1.2s linear infinite`,stroke:t.colors.accentText},svg:{animation:`${d} 400ms ease`,height:`calc(100% + 16px)`,left:`-8px`,position:`absolute`,top:`-8px`,width:`calc(100% + 16px)`}}}),C=e=>{let{locale:n}=e;return(0,g.jsxs)(h,{animate:`fadein`,flex:`column`,fullHeight:!0,className:`tw-connecting-wallet-screen`,children:[(0,g.jsx)(h,{p:`lg`,style:{paddingBottom:0},children:(0,g.jsx)(m,{onBack:e.onBack,title:e.walletName})}),(0,g.jsxs)(h,{center:`y`,expand:!0,flex:`column`,px:e.size===`compact`?`lg`:`xxl`,relative:!0,style:{paddingTop:0},children:[(0,g.jsx)(h,{py:`3xl`,children:(0,g.jsx)(_,{client:e.client,error:e.errorConnecting,id:e.walletId})}),(0,g.jsxs)(h,{animate:`fadein`,style:{animationDuration:`200ms`},children:[(0,g.jsx)(l,{center:!0,color:`primaryText`,size:`lg`,weight:500,className:`tw-screen-title`,"data-status":e.errorConnecting?`failed`:`in-progress`,children:e.errorConnecting?n.failed:n.inProgress}),(0,g.jsx)(c,{y:`md`}),e.errorConnecting?(0,g.jsx)(h,{animate:`fadein`,center:`x`,flex:`row`,children:(0,g.jsxs)(r,{className:`tw-retry-button`,fullWidth:!0,onClick:e.onRetry,style:{alignItems:`center`,gap:p.xs},variant:`accent`,children:[(0,g.jsx)(t,{height:u.sm,width:u.sm}),n.tryAgain]})}):(0,g.jsx)(l,{balance:!0,center:!0,multiline:!0,className:`tw-screen-description`,children:n.instruction})]})]}),e.onGetStarted?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(c,{y:`xl`}),(0,g.jsx)(i,{}),(0,g.jsx)(h,{center:`x`,flex:`row`,p:`lg`,children:(0,g.jsx)(r,{onClick:e.onGetStarted,variant:`link`,className:`tw-get-started-button`,children:n.getStartedLink})})]}):(0,g.jsx)(c,{y:e.size===`compact`?`lg`:`xxl`})]})};export{_ as n,C as t};