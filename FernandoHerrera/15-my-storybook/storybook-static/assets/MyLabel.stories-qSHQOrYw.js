import{j as L}from"./jsx-runtime-vNq4Oc-g.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";const s=({label:l,size:g="normal",allCaps:S=!1,color:v,fontColor:x})=>L.jsx("span",{className:`${g} ${v}`,style:{color:x},children:S?l.toUpperCase():l});try{s.displayName="MyLabel",s.__docgenInfo={description:"",displayName:"MyLabel",props:{label:{defaultValue:null,description:"Text to display",name:"label",required:!0,type:{name:"string"}},size:{defaultValue:{value:"normal"},description:"Label size",name:"size",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'}]}},allCaps:{defaultValue:{value:"false"},description:"Capitalize all letters",name:"allCaps",required:!1,type:{name:"boolean"}},color:{defaultValue:null,description:"Label color",name:"color",required:!1,type:{name:"enum",value:[{value:'"text-primary"'},{value:'"text-secondary"'},{value:'"text-tertiary"'}]}},fontColor:{defaultValue:null,description:"Font Color",name:"fontColor",required:!1,type:{name:"string"}}}}}catch{}const q={title:"UI/labels/MyLabel",tags:["autodocs"],component:s,parameters:{layout:"centered"},argTypes:{size:{control:"inline-radio"},fontColor:{control:"color"}}},e={args:{label:"Basic label"}},a={args:{label:"All Caps label",allCaps:!0}},r={args:{label:"Secondary label",color:"text-secondary"}},o={args:{label:"Custom Color label",fontColor:"#5517ac"}};var t,n,i;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  // Se definen los parametros obligatorios definidos en MyLabel
  args: {
    label: 'Basic label'
  }
}`,...(i=(n=e.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};var c,d,p;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  // Se definen los parametros obligatorios definidos en MyLabel
  args: {
    label: 'All Caps label',
    allCaps: true
  }
}`,...(p=(d=a.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var u,m,b;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  // Se definen los parametros obligatorios definidos en MyLabel
  args: {
    label: 'Secondary label',
    color: 'text-secondary'
  }
}`,...(b=(m=r.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var y,f,C;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  // Se definen los parametros obligatorios definidos en MyLabel
  args: {
    label: 'Custom Color label',
    fontColor: '#5517ac'
  }
}`,...(C=(f=o.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};const z=["Basic","AllCaps","Secondary","CustomColor"];export{a as AllCaps,e as Basic,o as CustomColor,r as Secondary,z as __namedExportsOrder,q as default};
//# sourceMappingURL=MyLabel.stories-qSHQOrYw.js.map
