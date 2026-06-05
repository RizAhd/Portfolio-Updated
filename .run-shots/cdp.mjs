import http from 'http';
import { WebSocket } from 'ws';
const PORT=process.argv[2];
function getJSON(url){return new Promise((res,rej)=>{http.get(url,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(JSON.parse(d)))}).on('error',rej)})}
let targets;
for(let i=0;i<20;i++){try{targets=await getJSON('http://127.0.0.1:'+PORT+'/json');break}catch(e){await new Promise(r=>setTimeout(r,500))}}
if(!targets){console.log('Chrome not reachable');process.exit(1)}
let page=targets.find(t=>t.type==='page');
const ws=new WebSocket(page.webSocketDebuggerUrl,{perMessageDeflate:false});
const logs=[];let id=1;
const send=(m,p={})=>ws.send(JSON.stringify({id:id++,method:m,params:p}));
ws.on('open',()=>{send('Runtime.enable');send('Log.enable');send('Page.enable');setTimeout(()=>send('Page.navigate',{url:'https://rizahd.github.io/Portfolio-Updated/'}),300)});
ws.on('message',m=>{const x=JSON.parse(m);
 if(x.method==='Runtime.consoleAPICalled')logs.push('[console.'+x.params.type+'] '+x.params.args.map(a=>a.value??a.description??'').join(' '));
 if(x.method==='Runtime.exceptionThrown'){const e=x.params.exceptionDetails;logs.push('[EXCEPTION] '+(e.exception?.description||e.text)+' @ '+(e.url||'')+':'+(e.lineNumber+1)+':'+(e.columnNumber+1))}
 if(x.method==='Log.entryAdded')logs.push('[log.'+x.params.entry.level+'] '+x.params.entry.text+' '+(x.params.entry.url||''));
});
setTimeout(()=>{console.log('===CAPTURED '+logs.length+'===');logs.forEach(l=>console.log(l));process.exit(0)},9000);
