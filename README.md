# ONE SCHENECTADY

A free, nonpartisan Community Sustainability Initiative of Melrah Environmental Services.

## Purpose
ONE SCHENECTADY is designed to collect community priorities, measure civic capacity, publish neighborhood-level aggregate results, and connect resident priorities to public commitments and outcomes.

## Product principles
- Mobile first
- Anonymous by default
- Nonpartisan
- Optional contact information separated from research responses
- Public methodology and limitations
- Aggregate reporting only after minimum sample thresholds are met
- No public Civic Power or Sustainability score until validation thresholds are documented and satisfied
- Architecture designed for future communities beyond Schenectady

## Current prototype
- Public landing page
- Interactive resident/stakeholder survey
- Local-only prototype persistence
- Initial research-integrity disclosures

## Production roadmap
1. Supabase persistence and row-level security
2. Anonymous research-response schema and separate opt-in contact table
3. Admin authentication/dashboard
4. Aggregate neighborhood dashboard and sample-threshold logic
5. QR/source attribution
6. Duplicate/quality controls and rate limiting
7. Methodology page and downloadable aggregate data
8. Accountability Tracker
9. Pollfish/external validation import layer
10. Accessibility, analytics, testing, deployment, and launch review

## Suggested environment variables
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

## Local development
```bash
npm install
npm run dev
```
