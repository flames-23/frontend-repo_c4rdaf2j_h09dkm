import { useState } from 'react'

function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    job_title: '',
    hiring_need: 'unsure',
    timeframe: 'unsure',
    budget_range: '',
    preferred_contact: 'email',
    message: '',
    consent_marketing: false,
    source: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submitForm = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)
    try {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          budget_range: form.budget_range || null,
          phone: form.phone || null,
          company: form.company || null,
          job_title: form.job_title || null,
          message: form.message || null,
          source: form.source || null,
        }),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Submission failed')
      }
      const data = await res.json()
      if (data?.success) {
        setResult({ type: 'success', message: 'Thanks! Your inquiry has been received. Our team will reach out shortly.' })
        setForm({
          name: '', email: '', phone: '', company: '', job_title: '', hiring_need: 'unsure', timeframe: 'unsure', budget_range: '', preferred_contact: 'email', message: '', consent_marketing: false, source: ''
        })
      } else {
        throw new Error('Something went wrong')
      }
    } catch (err) {
      setResult({ type: 'error', message: err.message || 'Unable to submit. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black">T</div>
            <div>
              <p className="text-xl font-extrabold tracking-tight text-slate-900">TALaiNT Labz</p>
              <p className="text-xs -mt-1 text-slate-500">AI • ML • Data Science Recruitment</p>
            </div>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
            <a href="#contact" className="hover:text-slate-900">Contact</a>
            <a href="#services" className="hover:text-slate-900">Services</a>
            <a href="#why" className="hover:text-slate-900">Why Us</a>
            <a href="/test" className="hover:text-slate-900">System Test</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_90%_-10%,rgba(37,99,235,0.08),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
              Hire exceptional AI, ML, and Data Science talent.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              We partner with organizations to scale high-impact teams across AI engineering, applied ML, MLOps, data science, and analytics. Contract, contract-to-hire, and full-time.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
              <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-600" /> Curated network of top-tier talent</li>
              <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-indigo-600" /> Fast, data-driven shortlist</li>
              <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-600" /> Technical screening by experts</li>
              <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-indigo-600" /> Flexible engagement models</li>
            </ul>
          </div>
          <div id="contact" className="bg-white/80 backdrop-blur rounded-2xl shadow-xl ring-1 ring-slate-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900">Tell us about your hiring needs</h2>
            <p className="text-sm text-slate-600 mt-1">Fill out the form and we’ll get back within one business day.</p>

            {result && (
              <div className={`mt-4 rounded-lg p-3 text-sm ${result.type === 'success' ? 'bg-green-50 text-green-700 ring-1 ring-green-200' : 'bg-red-50 text-red-700 ring-1 ring-red-200'}`}>
                {result.message}
              </div>
            )}

            <form onSubmit={submitForm} className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700">Full name</label>
                <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" placeholder="Jane Doe" />
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700">Business email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" placeholder="jane@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" placeholder="(+1) 555-123-4567" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Company</label>
                <input name="company" value={form.company} onChange={handleChange} className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" placeholder="Acme Inc." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Job title</label>
                <input name="job_title" value={form.job_title} onChange={handleChange} className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" placeholder="Head of Data" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Hiring need</label>
                <select name="hiring_need" value={form.hiring_need} onChange={handleChange} className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                  <option value="single_hire">Single hire</option>
                  <option value="multiple_hires">Multiple hires</option>
                  <option value="contract">Contract</option>
                  <option value="contract_to_hire">Contract-to-hire</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Timeframe</label>
                <select name="timeframe" value={form.timeframe} onChange={handleChange} className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                  <option value="immediate">Immediate</option>
                  <option value="1-3_months">1–3 months</option>
                  <option value="3+_months">3+ months</option>
                  <option value="unsure">Unsure</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Budget range (optional)</label>
                <input name="budget_range" value={form.budget_range} onChange={handleChange} className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" placeholder="$150k–$200k OTE" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Preferred contact</label>
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <label className="inline-flex items-center gap-2">
                    <input type="radio" name="preferred_contact" value="email" checked={form.preferred_contact === 'email'} onChange={handleChange} /> Email
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input type="radio" name="preferred_contact" value="phone" checked={form.preferred_contact === 'phone'} onChange={handleChange} /> Phone
                  </label>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">How can we help?</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" placeholder="Share details on the role(s), tech stack, scope, and timeline." />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">How did you hear about us? (optional)</label>
                <input name="source" value={form.source} onChange={handleChange} className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" placeholder="Referral, LinkedIn, Search, Event, etc." />
              </div>
              <div className="sm:col-span-2">
                <label className="inline-flex items-start gap-3 text-sm text-slate-600">
                  <input type="checkbox" name="consent_marketing" checked={form.consent_marketing} onChange={handleChange} />
                  <span>I agree to receive relevant updates from TALaiNT Labz. You can unsubscribe anytime.</span>
                </label>
              </div>
              <div className="sm:col-span-2">
                <button disabled={submitting} type="submit" className="w-full inline-flex justify-center items-center rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition disabled:opacity-60">
                  {submitting ? 'Submitting...' : 'Submit inquiry'}
                </button>
              </div>
              <p className="sm:col-span-2 text-xs text-slate-500 text-center">By submitting, you agree to our terms and privacy policy.</p>
            </form>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="text-2xl font-bold text-slate-900">Specialized recruiting for AI-native teams</h3>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'AI Engineering', desc: 'GenAI, LLM apps, prompt engineering, RAG, vector search' },
              { title: 'Applied ML', desc: 'Computer vision, NLP, recommendation, personalization' },
              { title: 'MLOps & Platforms', desc: 'Model deployment, monitoring, pipelines, feature stores' },
              { title: 'Data Science & Analytics', desc: 'Experimentation, causal inference, BI, insights' },
            ].map((card) => (
              <div key={card.title} className="rounded-xl border border-slate-200 p-5 bg-white shadow-sm">
                <p className="font-semibold text-slate-900">{card.title}</p>
                <p className="text-sm mt-2 text-slate-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why" className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="text-2xl font-bold text-slate-900">Why TALaiNT Labz</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-white p-6 border border-slate-200">
              <p className="font-semibold text-slate-900">Deep technical vetting</p>
              <p className="text-sm text-slate-600 mt-2">Every candidate is screened by practitioners so you meet fewer, stronger fits.</p>
            </div>
            <div className="rounded-xl bg-white p-6 border border-slate-200">
              <p className="font-semibold text-slate-900">Speed with precision</p>
              <p className="text-sm text-slate-600 mt-2">Shortlists in days, not weeks, with transparent pipelines and feedback loops.</p>
            </div>
            <div className="rounded-xl bg-white p-6 border border-slate-200">
              <p className="font-semibold text-slate-900">Flexible models</p>
              <p className="text-sm text-slate-600 mt-2">Contract, FTE, or hybrid engagements tailored to your roadmap and budgets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-lg font-bold text-slate-900">TALaiNT Labz</p>
            <p className="text-sm text-slate-600">Building world-class AI teams.</p>
          </div>
          <div className="text-sm text-slate-600">
            <p>Email: hello@talainlabz.com</p>
            <p>Mon–Fri, 9am–6pm</p>
          </div>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} TALaiNT Labz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
