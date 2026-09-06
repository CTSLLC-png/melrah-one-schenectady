'use client'
import { useEffect, useMemo, useState } from 'react'
import PocketBase from 'pocketbase'

const MIN_PUBLIC_SAMPLE = 25
const neighborhoods=['All neighborhoods','Hamilton Hill / Vale','Mont Pleasant','Bellevue','Northside / Goose Hill','Woodlawn','Central State','Stockade','Downtown','Eastern Avenue','Union Street / Other']

export default function ResultsPage(){
  const [records,setRecords]=useState<any[]>([])
  const [selected,setSelected]=useState('All neighborhoods')
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState('')

  useEffect(()=>{
    const run=async()=>{
      try{
        const url=process.env.NEXT_PUBLIC_POCKETBASE_URL
        if(!url){setLoading(false);return}
        const pb=new PocketBase(url)
        const data=await pb.collection('survey_responses').getFullList({sort:'-created'})
        setRecords(data)
      }catch(e){console.error(e);setError('Results are not available yet.')}
      finally{setLoading(false)}
    }
    run()
  },[])

  const filtered=useMemo(()=>selected==='All neighborhoods'?records:records.filter(r=>r.neighborhood===selected),[records,selected])
  const count=filtered.length
  const priorityCounts=useMemo(()=>{
    const map:Record<string,number>={}
    filtered.forEach(r=>(Array.isArray(r.priorities)?r.priorities:[]).forEach((p:string)=>map[p]=(map[p]||0)+1))
    return Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0,6)
  },[filtered])
  const civic=useMemo(()=>({
    registered: filtered.filter(r=>r.registered==='Yes').length,
    voted: filtered.filter(r=>r.votedLocal==='Yes').length,
    association: filtered.filter(r=>r.association==='Yes, and I participate').length
  }),[filtered])
  const pct=(n:number)=>count?Math.round((n/count)*100):0

  return <main className="shell"><header className="topbar"><div><a href="/" className="brand">ONE <span>SCHENECTADY</span></a><div className="tagline">Public Community Dashboard</div></div><nav className="nav"><a href="/survey">Take survey</a><a href="/methodology">Methodology</a><a href="/accountability">Accountability</a></nav></header>
  <section className="section"><div className="eyebrow">Community results</div><h1 style={{fontSize:'clamp(42px,7vw,72px)'}}>What Schenectady is telling us.</h1><p className="lede">Results are shown only when the selected geography meets the minimum public sample threshold. This protects privacy and reduces over-interpretation of very small samples.</p>
  <div style={{maxWidth:380,marginTop:20}}><label htmlFor="neighborhood"><strong>Choose a neighborhood</strong></label><select id="neighborhood" className="field" value={selected} onChange={e=>setSelected(e.target.value)}>{neighborhoods.map(n=><option key={n}>{n}</option>)}</select></div></section>
  {loading&&<div className="notice">Loading community results…</div>}
  {!loading&&error&&<div className="notice">{error}</div>}
  {!loading&&!error&&count<MIN_PUBLIC_SAMPLE&&<section className="section"><div className="card"><div className="eyebrow">Sample threshold</div><div className="metric">{count}</div><h2>More responses are needed.</h2><p className="sub">We require at least {MIN_PUBLIC_SAMPLE} completed responses for this view before publishing neighborhood-level percentages. This threshold can be increased as the study matures.</p><a className="btn primary" href="/survey">Add your voice</a></div></section>}
  {!loading&&!error&&count>=MIN_PUBLIC_SAMPLE&&<><section className="section"><div className="grid"><div className="card" style={{gridColumn:'span 4'}}><div className="eyebrow">Completed responses</div><div className="metric">{count}</div><p>Responses in this view.</p></div><div className="card" style={{gridColumn:'span 4'}}><div className="eyebrow">Registered voters</div><div className="metric">{pct(civic.registered)}%</div><p>Self-reported registered to vote.</p></div><div className="card" style={{gridColumn:'span 4'}}><div className="eyebrow">Neighborhood participation</div><div className="metric">{pct(civic.association)}%</div><p>Report participating in a neighborhood association.</p></div></div></section>
  <section className="section"><h2>Top community priorities</h2><p className="sub">Share of respondents in this view who selected each issue among their top three priorities.</p><div className="grid">{priorityCounts.map(([name,n])=><article className="card feature" key={name}><div className="metric">{pct(n)}%</div><h3>{name}</h3><p>{n} of {count} respondents selected this issue.</p></article>)}</div></section>
  <section className="section"><div className="card"><div className="eyebrow">Civic participation snapshot</div><h2>Participation is part of sustainability.</h2><p><strong>{pct(civic.voted)}%</strong> report voting in the most recent local election. <strong>{pct(civic.registered)}%</strong> report being registered to vote. <strong>{pct(civic.association)}%</strong> report actively participating in a neighborhood association.</p><p className="sub">These are self-reported survey measures, not replacements for official election statistics. Official enrollment and turnout data will be added separately to the Civic Power section.</p></div></section></>}
  </main>
}
