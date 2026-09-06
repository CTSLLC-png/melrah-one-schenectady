const features = [
  ['Community Survey','Tell us what your neighborhood needs, what is improving, and what still needs attention.'],
  ['Neighborhood Dashboard','See aggregate priorities by neighborhood as participation grows.'],
  ['Civic Power','Track participation, neighborhood organization, and local civic capacity.'],
  ['Community Wealth','Follow homeownership, affordability, income, local business, and opportunity.'],
  ['Accountability Tracker','Connect resident priorities to commitments, funding, implementation, and outcomes.'],
  ['Open Methodology','Review sample sizes, question wording, limitations, and public-source methodology.']
]

export default function Home(){
  return <main>
    <div className="shell">
      <header className="topbar">
        <div><div className="brand">ONE <span>SCHENECTADY</span></div><div className="tagline">A Melrah Environmental Services initiative</div></div>
        <nav className="nav"><a href="/survey">Take the survey</a><a href="#results">Results</a><a href="#method">Methodology</a></nav>
      </header>
      <section className="hero">
        <div className="eyebrow">Community voice • Community wealth • Community accountability</div>
        <h1>What does your neighborhood need to thrive?</h1>
        <p className="lede">Schenectady is changing. Your experience should help determine what comes next. This free, nonpartisan initiative turns community input into transparent priorities, measurable outcomes, and a stronger public record.</p>
        <div className="ctaRow"><a className="btn primary" href="/survey">Make your voice count</a><a className="btn secondary" href="#results">See how the project works</a></div>
        <div className="trust"><span className="pill">About 5 minutes</span><span className="pill">Anonymous by default</span><span className="pill">Nonpartisan</span><span className="pill">Free public service</span></div>
      </section>
      <section className="section" id="results">
        <div className="notice"><strong>Your answers become data. Data becomes priorities. Priorities create accountability.</strong> Public dashboards will only publish aggregate results once minimum sample thresholds are met.</div>
      </section>
      <section className="section">
        <h2>More than a survey.</h2><p className="sub">ONE SCHENECTADY is being built as a community sustainability platform, not a one-time poll.</p>
        <div className="grid">{features.map(([t,d])=><article className="card feature" key={t}><div className="eyebrow">Melrah Community Sustainability</div><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>
      <section className="section" id="method">
        <div className="grid"><div className="card" style={{gridColumn:'span 7'}}><div className="eyebrow">Research integrity</div><h2>Built to be useful—and defensible.</h2><p className="sub">Individual responses are not sold or provided to political campaigns. Public reporting is aggregate. Civic and sustainability scores will remain unpublished until the underlying sample size, geographic coverage, weighting, and methodology meet documented thresholds.</p></div><div className="card" style={{gridColumn:'span 5'}}><div className="eyebrow">The four pillars</div><p><strong>Environmental.</strong> Physical conditions and infrastructure.</p><p><strong>Economic.</strong> Jobs, household stability, business opportunity.</p><p><strong>Social.</strong> Safety, youth opportunity, food and service access.</p><p><strong>Civic.</strong> Participation, organization, and accountability.</p></div></div>
      </section>
      <footer className="footer">ONE SCHENECTADY is a free Community Sustainability Initiative of Melrah Environmental Services. This initiative does not endorse political candidates.</footer>
    </div>
  </main>
}
