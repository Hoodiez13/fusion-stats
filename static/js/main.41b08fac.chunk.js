(this["webpackJsonpfusion-stats"]=this["webpackJsonpfusion-stats"]||[]).push([[0],{125:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),i=n(31),s=n.n(i),r=(n(97),n(13)),l=n(46),o=(n(98),n(29)),d=n.n(o),j=(d.a.create({baseURL:""}),"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NDdmYjc3ZS1kMTkzLTRiNTAtODI1Zi1lODgxY2QwMjhhNzkiLCJqdGkiOiIzYmI4ZjY1YjNjZjNiNTdmMmMzMjRhNzc0MWI0MTBjYTc3MmFjNGFiOTQ4MTQ1OTk5NjljOGFkMDdhYzYyZjA2YmNkOTVlNzc1NDM0MDgzOSIsImlhdCI6MTYzMjc3NjA0NywibmJmIjoxNjMyNzc2MDQ3LCJleHAiOjE2NDMxNDQwNDcsInN1YiI6IiIsInNjb3BlcyI6WyJ2aWV3LXVzZXItcHJvZmlsZSIsInZpZXctcHJpdmF0ZS1yZXBvcnRzIl19.owCN48Sg69DGDkzBr3B6nbfMriMD4hsTSN-gIqxyycoBauwfKKtz8sH_k_WB8-yej-Ac_uJwSp-M4NMpZKW_KcJgDvaZPix9ZDhStYgL4E3l3wigG-cQiqo3xeCTQxvHava6A85yIcuvUpk1XssZ9DWhWeQ0NfNfO5ctD6oksQMIYl7i6K6xkqcDBR7QbnrZ2ef3VdDpkuBtQGHJy315Qz8FbuU_JN-BrDWbWHbkGG7gISNmYWfd6jcW5pOV3k1GF4wjfocdibQfXj6vfXhAr444HEf-6hgUcyc1d4ktZ5NKlxUIICkHpn6sl1y63OMmiS2ODhQOJnGDT8Dg1nNYp71jgFHBgZqzVwscPvmno-8s8bs7svou8VUGsqamtq1cdfVK0juNsWJlwchu2QYbhijXLU86XpQrgVGhrLcAub7K7c2QP9jMJy6tcLwHZGP0oAxUb2CVyPbv1jr1Nq6TlgXsG9MzlqdKCKOR1WcoRLUhVJJhhxqXE8qVQ9vRmzWU9Qk_0coStr2t0wtKq7hWnnOcbvmC6x6iwPZJOU84Fhf98nsk6Vmi2GoU1HCewPyZaMU9nNwg9vgjnRsm_46vhnbtt_9UoM2gbPsE1yJtAGw83cvCkTTAjhX5fhB-rDszQTTGgAL79-l2DtXzs6m-k0XfZUeq9lbhvT-FJiJa14k"),u=n(1),h=function(e){var t=e.raid;return Object(u.jsx)("div",{children:Object(u.jsx)(l.b,{to:"/raiddetails/"+t.code,children:Object(u.jsxs)("div",{style:{display:"flex",width:"100%"},children:[Object(u.jsx)("div",{style:{flex:1},children:"".concat(t.title?t.title:"N/A")}),Object(u.jsx)("div",{style:{flex:1},children:"Zone: ".concat(t.zone?t.zone.name:"N/A")}),Object(u.jsx)("div",{style:{flex:1},children:"Owner: ".concat(t.owner?t.owner.name:"N/A")})]})})})},b=n(14),f=Object(a.createContext)();function O(){return Object(a.useContext)(f)}function x(e){var t=e.children,n=Object(a.useState)(null),c=Object(b.a)(n,2),i=c[0],s=c[1],r={raids:i,setRaids:s,getFusion:function(){d.a.request({url:"api/v2/client",method:"post",baseURL:"https://classic.warcraftlogs.com/",headers:{Authorization:"Bearer ".concat(j)},data:{query:'{\n              reportData {\n                reports(limit:100, guildName:"Fusion", guildServerSlug:"benediction", guildServerRegion:"us"){\n                  data{\n                    code\n                    owner{\n                      name\n                    }\n                    title\n                    zone{\n                      name\n                    }\n                  }\n                }\n              }\n            }'}}).then((function(e){e.data.data&&s(e.data.data.reportData.reports.data)}))}};return Object(u.jsx)(f.Provider,{value:r,children:t})}var m,p=function(e){var t=e.children;return Object(u.jsxs)("div",{style:{display:"flex"},children:[Object(u.jsx)("div",{style:{flex:2}}),Object(u.jsx)("div",{style:{flex:8},children:t}),Object(u.jsx)("div",{style:{flex:2}})]})},v=function(){var e=O(),t=e.raids,n=e.getFusion;return Object(a.useEffect)((function(){t||n()}),[]),Object(u.jsxs)(p,{children:[Object(u.jsx)("h1",{children:"Recent Logs"}),t&&t.slice(0,20).map((function(e){return Object(u.jsx)(h,{raid:e},e.code)}))]})},g=n(34),D=n.n(g),y=[3002,2995,2661,2748,2940,2650,2937,2621,2669,2654],k=[3003,2986,2661,3012,2939,2647,684,368,2621,2673],I=[3001,2980,2953,2791,2661,2746,2940,2617,2322,2938,2621,2343],C=[3003,2999,2978,2661,3013,2748,2940,2649,2647,2650,2613,368,2622,2673,2669,1071,2655],w=function(e){var t="#DDD";switch(e){case"Druid":t="#FF7C0A";break;case"Mage":t="#3FC7EB";break;case"Hunter":t="#AAD372";break;case"Paladin":t="#F48CBA";break;case"Priest":t="#FFFFFF";break;case"Shaman":t="#0070DD";break;case"Warlock":t="#8788EE";break;case"Warrior":t="#C69B6D";break;case"Rogue":t="#FFF468"}return t},N=n(33),E=n(165),F=n(161),T=n(167),M=n(164),z=n(156),S=n(7),A=Object(S.a)(E.a)(m||(m=Object(N.a)(["\n\n    & .MuiButtonBase-root {\n        height:100px;\n    }\n\n    & .MuiAccordionSummary-content {\n        margin:0;\n    }\n"]))),G=function(e){var t=e.player,n=e.i;return Object(u.jsxs)("div",{style:{display:"flex"},children:[Object(u.jsxs)(F.a,{sx:{width:300,backgroundColor:n%2===0?"#DDDDDDDD":null},children:[Object(u.jsx)(A,{expandIcon:Object(u.jsx)(z.a,{}),children:t.failedEnchants?Object(u.jsxs)("div",{children:["Enchant Fails (",t.failedEnchants.length,")"]}):Object(u.jsx)("p",{style:{color:"red"},children:"Error"})}),Object(u.jsx)(T.a,{children:Object(u.jsx)("div",{children:t.failedEnchants&&t.failedEnchants.map((function(e){return Object(u.jsx)("div",{children:Object(u.jsx)(M.a,{label:e.name+" - "+e.permanentEnchantName,size:"small"})})}))})})]}),Object(u.jsxs)(F.a,{sx:{width:300,backgroundColor:n%2===0?"#DDDDDDDD":null},children:[Object(u.jsx)(A,{expandIcon:Object(u.jsx)(z.a,{}),children:t.failedGems?Object(u.jsxs)("div",{children:["Gem Fails (",t.failedGems.length,")"]}):Object(u.jsx)("p",{style:{color:"red"},children:"Error"})}),Object(u.jsx)(T.a,{children:Object(u.jsx)("div",{children:t.failedGems&&t.failedGems.map((function(e){return Object(u.jsx)("div",{children:e.failGems.map((function(t){return Object(u.jsx)("div",{children:Object(u.jsx)(M.a,{label:e.name+" - ID:"+t.id})})}))})}))})})]})]})},B=function(e){var t=e.player,n=e.buffsColumns,a=e.totalCombatTime;return Object(u.jsx)("div",{style:{display:"flex"},children:n.map((function(e){var n=t.buffs.find((function(t){return t.guid===e.id}));return Object(u.jsx)("div",{style:{width:125},children:n?Object(u.jsxs)("div",{children:[e.uses?Object(u.jsx)("span",{children:n.totalUses}):null,e.uses&&e.uptime?Object(u.jsx)("span",{children:" - "}):null,e.uptime?Object(u.jsxs)("span",{children:["%",Math.round(n.totalUptime/a*100)]}):null]}):"-"},"".concat(t.name,"-").concat(e.id))}))})},R=function(e){var t=e.player,n=e.castsColumns;return Object(u.jsx)("div",{style:{display:"flex"},children:n.map((function(e){var n=t.casts.find((function(t){return t.guid===e.id}));return Object(u.jsx)("div",{style:{width:125},children:n?Object(u.jsx)("span",{children:n.total}):" - "},"".concat(t.name,"-").concat(e.id))}))})},J=function(){var e=Object(r.g)().id,t=Object(a.useState)(null),n=Object(b.a)(t,2),c=n[0],i=n[1],s=Object(a.useState)(0),l=Object(b.a)(s,2),o=l[0],h=l[1],f=Object(a.useState)(null),O=Object(b.a)(f,2),x=O[0],m=O[1],v=Object(a.useState)(!0),g=Object(b.a)(v,2),N=g[0],E=g[1],F=[],T=[{id:33256,name:"Well Fed",uses:!0,uptime:!0},{id:33082,name:"Strength V",uses:!0,uptime:!0},{id:28520,name:"Relentless Assult",uses:!1,uptime:!0}],M=[{id:28507,name:"Haste Potion",uses:!0},{id:35476,name:"Drums of Battle",uses:!0}],z=function(){E(!0),d.a.request({url:"api/v2/client",method:"post",baseURL:"https://classic.warcraftlogs.com/",headers:{Authorization:"Bearer ".concat(j)},data:{query:'{\n              reportData {\n                report(code:"'.concat(e,'"){\n                  title\n                  fights{\n                    startTime\n                    endTime\n                    encounterID\n                    name\n                  }\n                  table(startTime:0, endTime:15000000)\n                }\n              }\n            }')}}).then((function(e){if(e.data.data){var t=e.data.data.reportData.report.fights,n=e.data.data.reportData.report.table.data.playerDetails.dps,a=e.data.data.reportData.report.table.data.playerDetails.healers,c=e.data.data.reportData.report.table.data.playerDetails.tanks,s=0;t.forEach((function(e){e.encounterID>0&&(s+=e.endTime-e.startTime)})),h(s),c.forEach((function(e){n.forEach((function(t,a){"Unknown"===t.type?n.splice(a,1):e.name===t.name&&(e.combatantInfo.gear=D.a.union(e.combatantInfo.gear,t.combatantInfo.gear),n.splice(a,1))})),a.forEach((function(t,n){e.name===t.name&&(e.combatantInfo.gear=D.a.union(e.combatantInfo.gear,t.combatantInfo.gear),t.splice(n,1))}))})),a.forEach((function(e){n.forEach((function(t,a){e.name===t.name&&(e.combatantInfo.gear=D.a.union(e.combatantInfo.gear,t.combatantInfo.gear),n.splice(a,1))}))})),(F=D.a.union(n,a,c)).forEach((function(e,t,n){e.combatantInfo.gear?(e.failedEnchants=function(e,t){var n=[],a=[];switch(t){case"Destruction":case"Affliction":case"Elemental":case"Balance":case"Shadow":case"Arcane":case"Fire":case"Frost":a=y;break;case"Fury":case"Arms":case"Combat":case"BeastMastery":case"Survival":case"Enhancement":a=k;break;case"Holy":case"Discipline":case"Restoration":a=I;break;case"Gladiator":case"Protection":case"Feral":a=C}return e.forEach((function(e){e.permanentEnchant&&10!==e.slot&&11!==e.slot&&!a.includes(e.permanentEnchant)&&n.push(e)})),n}(e.combatantInfo.gear,e.specs[0]),e.failedGems=function(e){var t=[];return e.forEach((function(e){var n=[];e.gems&&e.gems.forEach((function(e){e.itemLevel<70&&30598!==e.id&&28118!==e.id&&n.push(e)})),e.failGems=n,e.failGems.length>0&&t.push(e)})),t}(e.combatantInfo.gear)):n.splice(t,1)})),i(D.a.cloneDeep(F)),m(e.data.data.reportData.report.title)}})).then((function(){var t="";F.forEach((function(e){t+="".concat(e.name,"Buffs : table(sourceID:").concat(e.id,", dataType:Buffs, startTime:0, endTime:15000000)\n"),t+="".concat(e.name,"Casts : table(sourceID:").concat(e.id,", dataType:Casts, startTime:0, endTime:15000000)\n")})),d.a.request({url:"api/v2/client",method:"post",baseURL:"https://classic.warcraftlogs.com/",headers:{Authorization:"Bearer ".concat(j)},data:{query:'{\n                reportData {\n                  report(code:"'.concat(e,'"){\n                    ').concat(t,"\n                  }\n                }\n              }")}}).then((function(e){F.forEach((function(t){t.buffs=e.data.data.reportData.report["".concat(t.name,"Buffs")].data.auras,t.casts=e.data.data.reportData.report["".concat(t.name,"Casts")].data.entries})),i(D.a.cloneDeep(F))})).then((function(){E(!1)}))}))};return Object(a.useEffect)((function(){c||z()}),[]),N?Object(u.jsx)("div",{children:"Loading"}):Object(u.jsxs)(p,{children:[Object(u.jsx)("h1",{children:x}),Object(u.jsxs)("div",{children:[Object(u.jsxs)("div",{style:{display:"flex",position:"sticky"},children:[Object(u.jsx)("div",{style:{width:125,fontWeight:500},children:"Player Name"}),M.map((function(e){return Object(u.jsxs)("div",{style:{width:125,fontWeight:500},children:[Object(u.jsx)("div",{children:e.name}),Object(u.jsxs)("div",{children:[e.uses?Object(u.jsx)("span",{children:"Uses"}):null,e.uses&&e.uptime?Object(u.jsx)("span",{children:" - "}):null,e.uptime?Object(u.jsx)("span",{children:"Up Time"}):null]})]})})),T.map((function(e){return Object(u.jsxs)("div",{style:{width:125,fontWeight:500},children:[Object(u.jsx)("div",{children:e.name}),Object(u.jsxs)("div",{children:[e.uses?Object(u.jsx)("span",{children:"Uses"}):null,e.uses&&e.uptime?Object(u.jsx)("span",{children:" - "}):null,e.uptime?Object(u.jsx)("span",{children:"Up Time"}):null]})]})})),Object(u.jsx)("div",{style:{width:300,fontWeight:500},children:"Enchant Fails"}),Object(u.jsx)("div",{style:{width:300,fontWeight:500},children:"Gem Fails"})]}),c.map((function(e,t){return Object(u.jsxs)("div",{style:{display:"flex",backgroundColor:t%2===0?"#DDDDDDDD":null},children:[Object(u.jsx)("div",{style:{width:125,backgroundColor:w(e.type),fontWeight:500,fontSize:18},children:e.name}),Object(u.jsx)(R,{player:e,castsColumns:M}),Object(u.jsx)(B,{player:e,buffsColumns:T,totalCombatTime:o}),Object(u.jsx)(G,{player:e,i:t})]},e.name)}))]})]})},W=function(){var e=Object(r.g)().id,t=O(),n=t.raids,c=t.getFusion;return Object(a.useEffect)((function(){n||c()}),[]),Object(u.jsxs)("div",{children:[Object(u.jsxs)("h1",{children:["Raid ",e]}),Object(u.jsx)(p,{children:n&&n.filter((function(t){return t.title.includes(e)})).map((function(e){return Object(u.jsx)(h,{raid:e},e.code)}))})]})},U=n(168),Z=n(169),Q=n(170),L=n(171),q=n(159),Y=n(158),V=n(162),X=function(){var e=Object(r.f)(),t=Object(a.useState)(null),n=Object(b.a)(t,2),c=n[0],i=n[1],s=Boolean(c),l=function(t){i(null),t&&e.push("/raid/"+t)};return Object(u.jsx)(U.a,{sx:{flexGrow:1},children:Object(u.jsx)(Z.a,{position:"static",children:Object(u.jsxs)(Q.a,{variant:"dense",children:[Object(u.jsx)(L.a,{sx:{cursor:"pointer"},onClick:function(){e.push("/")},variant:"h6",color:"inherit",component:"div",children:"Home"}),Object(u.jsx)("div",{style:{width:16}}),Object(u.jsxs)("div",{children:[Object(u.jsx)(L.a,{sx:{cursor:"pointer"},onClick:function(e){i(e.currentTarget)},variant:"h6",color:"inherit",component:"div",children:"Raids"}),Object(u.jsxs)(q.a,{elevation:0,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},anchorEl:c,open:s,onClose:function(){l(null)},children:[Object(u.jsx)("div",{style:{height:8}}),Object(u.jsx)("span",{style:{fontWeight:500,fontSize:18},children:"25 Man Raids"}),Object(u.jsx)(Y.a,{sx:{my:.5}}),Object(u.jsx)(V.a,{onClick:function(){l("X")},children:"Raid X"}),Object(u.jsx)(V.a,{onClick:function(){l("Y")},children:"Raid Y"}),Object(u.jsx)(V.a,{onClick:function(){l("Z")},children:"Raid Z"}),Object(u.jsx)(V.a,{onClick:function(){l("M")},children:"Raid M"}),Object(u.jsx)(V.a,{onClick:function(){l("V")},children:"Raid V"}),Object(u.jsx)(V.a,{onClick:function(){l("S")},children:"Raid S"}),Object(u.jsx)(V.a,{onClick:function(){l("Alt")},children:"Alt Raid"}),Object(u.jsx)("div",{style:{height:8,width:200}}),Object(u.jsx)("span",{style:{fontWeight:500,fontSize:18},children:"10 Man Raids"}),Object(u.jsx)(Y.a,{sx:{my:.5}}),Object(u.jsx)(V.a,{onClick:function(){l("Kara")},children:"Kara"})]})]})]})})})};var H=function(){return Object(u.jsx)("div",{className:"App",children:Object(u.jsx)(l.a,{children:Object(u.jsxs)(x,{children:[Object(u.jsx)(X,{}),Object(u.jsxs)(r.c,{children:[Object(u.jsx)(r.a,{exact:!0,path:"/",children:Object(u.jsx)(v,{})}),Object(u.jsx)(r.a,{exact:!0,path:"/raid/:id",children:Object(u.jsx)(W,{})}),Object(u.jsx)(r.a,{exact:!0,path:"/raiddetails/:id",children:Object(u.jsx)(J,{})})]})]})})})},P=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,173)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),i(e),s(e)}))};s.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(H,{})}),document.getElementById("root")),P()},97:function(e,t,n){},98:function(e,t,n){}},[[125,1,2]]]);
//# sourceMappingURL=main.41b08fac.chunk.js.map