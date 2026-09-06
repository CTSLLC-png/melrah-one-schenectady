'use client'
import { useEffect, useState } from 'react'
import PocketBase from 'pocketbase'

const labels:Record<string,string>={promised:'Promised',funded:'Funded',underway:'Underway',completed:'Completed',stalled:'Stalled'}

export default function AccountabilityPage(){
 const [items,setItems]=useState<any[]>([])
 const [loading,setLoading]=useState(true)
 useEffect(()=>{(async()=>{try{const url=process.env.NEXT_PUBLIC_POCKETBASE_URL;if(!url)return;const pb=new PocketBase(url);setItems(await pb.collection('accountability_items').getFullList({sort:'-created'}))}catch(e){console.error(e)}finally{setLoading(false)}})()},[])
 return <main className="shell"><header className="topbar"><div><a href="/" className="brand">ONE <span>SCHENECTADY</span></a><div className="tagline">Community Accountability Tracker</div></div><nav className="nav"><a href="/survey">Take survey</a><a href="/results">Results</a><a href="/methodology">Methodology</a></nav></header>
 <section className="hero"><div className="eyebrow">Priority → commitment → funding → outcome</div><h1>Track what happens after residents speak.</h1><p className="lede">This tracker is designed to connect documented community priorities with public commitments, funding decisions, implementation status, and outcomes. Entries should link back to a public source whenever possible.</p></section>
 <section className="section">{loading?<div className="notice">Loading accountability records…</div>:items.length===0?<div className="card"><h2>No public tracker items yet.</h2><p className="sub">The structure is live. Verified projects and commitments will be added as source documentation is reviewed.</p></div>:<div className="grid">{items.map(item=><article className="card" style={{gridColumn:'span 6'}} key={item.id}><div className="eyebrow">{item.neighborhood||item.community}</div><h3>{item.priority}</h3><p>{item.commitment}</p><p><strong>Agency:</strong> {item.agency||'Not specified'}</p><p><strong>Status:</strong> {labels[item.status]||item.status}</p>{typeof item.funding==='number'&&item.funding>0&&<p><strong>Documented funding:</strong> ${item.funding.toLocaleString()}</p>}{item.sourceUrl&&<a className="btn secondary" href={item.sourceUrl} target="_blank" rel="noreferrer">View source</a>}</article>)}</div>}</section>
 </main>
}
