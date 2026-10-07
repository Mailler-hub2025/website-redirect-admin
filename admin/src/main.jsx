import React,{useEffect,useState}from'react';
import{createRoot}from'react-dom/client';
import'./style.css';

const API='https://api.github.com';
const owner=import.meta.env.VITE_GITHUB_OWNER;
const repo=import.meta.env.VITE_GITHUB_REPO;
const branch=import.meta.env.VITE_GITHUB_BRANCH||'main';
const path=import.meta.env.VITE_CONFIG_PATH||'config.json';
const token=import.meta.env.VITE_GITHUB_TOKEN;

const valid=u=>{try{return ['http:','https:'].includes(new URL(u).protocol)}catch{return false}};
async function github(method='GET',body){
 const r=await fetch(`${API}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,{method,headers:{Accept:'application/vnd.github+json',Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});
 if(!r.ok)throw Error(await r.text());return r.json();
}
function App(){
 const[cfg,setCfg]=useState({enabled:false,destinationUrl:''}),[sha,setSha]=useState(''),[msg,setMsg]=useState('');
 const load=async()=>{try{const x=await github();const text=decodeURIComponent(escape(atob(x.content.replace(/\n/g,''))));const d=JSON.parse(text);setCfg(d);setSha(x.sha)}catch{setMsg('Unable to read GitHub config. Check environment variables and token.')}};
 useEffect(()=>{load()},[]);
 const save=async()=>{setMsg('');if(!valid(cfg.destinationUrl)){setMsg('Enter a valid HTTP/HTTPS Website 2 URL.');return}
 try{const current=await github();const content=btoa(unescape(encodeURIComponent(JSON.stringify({enabled:!!cfg.enabled,destinationUrl:cfg.destinationUrl.trim(),updatedAt:new Date().toISOString()},null,2)+'\n')));await github('PUT',{message:'Update redirect configuration',content,sha:current.sha,branch});setMsg('Saved to GitHub. Website 1 will pick up the change within 15 seconds.');await load()}catch{setMsg('Save failed. Check GitHub repository/token permissions.')}};
 return <><header><b>Redirect Admin</b><button onClick={load}>Refresh</button></header><main>
 <div className="panel"><small>PRODUCTION CONTROL</small><h1>Website 1 → Website 2</h1>
 <label className="row">Redirect ON/OFF <input type="checkbox" checked={cfg.enabled} onChange={e=>setCfg({...cfg,enabled:e.target.checked})}/></label>
 <label>Website 2 URL<input value={cfg.destinationUrl||''} onChange={e=>setCfg({...cfg,destinationUrl:e.target.value})} placeholder="https://your-edgeone-site.example"/></label>
 <button onClick={save}>Save Settings</button>{msg&&<p>{msg}</p>}</div>
 <div className="panel"><h2>Current Configuration</h2><p>Status: <b>{cfg.enabled?'ON':'OFF'}</b></p><p>URL: {cfg.destinationUrl||'Not configured'}</p><p>Updated: {cfg.updatedAt||'—'}</p></div>
 </main></>
}
createRoot(document.getElementById('root')).render(<App/>);
