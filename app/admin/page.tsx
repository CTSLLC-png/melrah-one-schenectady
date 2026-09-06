'use client'
import { useEffect, useMemo, useState } from 'react'
import PocketBase from 'pocketbase'

export default function AdminPage(){
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
 const [auth,setAuth]=useState(false)
 const [responses,setResponses]=useState<any[]>([])
 const [items,setItems]=useState<any[]>([])
 const [error,setError]=useState('')
 const url=process.env.NEXT_PUBLIC_POCKETBASE_URL
 const pb=useMemo(()=>url?new PocketBase(url):null,[url])

 useEffect(()=>{if(pb){setAuth(pb.authStore.isValid)}},[pb])
 const login=async()=>{if(!pb)return;setError('');try{await pb.collection('_superusers').authWithPassword(email,password);setAuth(true);await load()}catch(e){console.error(e);setError('Login failed.')}}
 const load=async()=>{if(!pb)return;const [r,a]=await Promise.all([pb.collection('survey_responses').getFullList({sort:'-created'}),pb.collection('accountability_items').getFullList({sort:'-created'})]);setResponses(r);setItems(a)}
 useEffect(()=>{if(auth)load().catch(console.error)},[auth])
 const logout=()=>{pb?.authStore.clear();setAuth(false);setResponses([]);setItems([])}

 return <main className="shell"><header className="topbar"><div><a href="/" className="brand">ONE <span>SCHENECTADY</span></a><div className="tagline">Private Administration</div></div>{auth&&<button className="btn secondary" onClick={logout}>Sign out</button>}</header>
 {!auth?<section className="surveyShell"><div className="surveyCard"><div className="eyebrow">Authorized access only</div><div className="question">Administrator sign in</div><input className="field" type="email" placeholder="Admin email" value={email} onChange={e=>setEmail(e.target.value)}/><div style={{height:12}}/><input className="field" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>{error&&<div className="notice" style={{marginTop:14}}>{error}</div>}<div className="ctaRow"><button className="btn primary" onClick={login}>Sign in</button></div></div></section>:
 <><section className="section"><div className="eyebrow">Study operations</div><h1 style={{fontSize:'clamp(40px,6vw,64px)'}}>Community research admin.</h1><div className="grid"><div className="card" style={{gridColumn:'span 4'}}><div className="eyebrow">Responses</div><div className="metric">{responses.length}</div></div><div className="card" style={{gridColumn:'span 4'}}><div className="eyebrow">Neighborhoods represented</div><div className="metric">{new Set(responses.map(r=>r.neighborhood)).size}</div></div><div className="card" style={{gridColumn:'span 4'}}><div className="eyebrow">Tracker items</div><div className="metric">{items.length}</div></div></div></section>
 <section className="section"><div className="card"><h2>Latest responses</h2><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr><th align="left">Neighborhood</th><th align="left">Role</th><th align="left">Source</th><th align="left">Campaign</th></tr></thead><tbody>{responses.slice(0,20).map(r=><tr key={r.id}><td style={{padding:'10px 0',borderTop:'1px solid var(--line)'}}>{r.neighborhood}</td><td style={{borderTop:'1px solid var(--line)'}}>{r.role}</td><td style={{borderTop:'1px solid var(--line)'}}>{r.source||'direct'}</td><td style={{borderTop:'1px solid var(--line)'}}>{r.campaign||'organic'}</td></tr>)}</tbody></table></div></div></section></>}
 </main>
}
