import { Link } from 'react-router-dom';
import { MarketingNav } from '../components/Nav.jsx';
import BookIntro from '../components/BookIntro.jsx';
import ScrollSection from '../components/ScrollSection.jsx';
import StatCounter from '../components/StatCounter.jsx';
import SampleAssessment from '../components/SampleAssessment.jsx';
import FeatureShowcase from '../components/FeatureShowcase.jsx';
import { statistics } from '../data/statistics.js';
import './Landing.css';

const FLOW_STEPS = [
  { id: 'profile', label: 'Profile', body: 'Set up a short profile: age, grade, and the language of assessment.' },
  { id: 'screen', label: 'Screen', body: 'A 10 to 15 minute adaptive screening across five reading domains.' },
  { id: 'understand', label: 'Understand', body: 'A reading profile shows strengths and domains that need attention.' },
  { id: 'practice', label: 'Practice', body: 'Short exercises target the domains the screening flagged.' },
  { id: 'track', label: 'Track', body: 'Repeat screenings build a trend line across weeks and months.' }
];

const AGE_GROUPS = [
  {
    id: '6-7',
    label: '6 to 7',
    title: 'Early literacy',
    body: 'Letter-sound knowledge, rhyming, and first attempts at decoding.',
    status: 'Sample items available'
  },
  {
    id: '8-10',
    label: '8 to 10',
    title: 'Reading and decoding',
    body: 'Full adaptive screening, error-pattern analysis, and matched exercises.',
    status: 'Fully implemented in this preview'
  },
  {
    id: '10-plus',
    label: '10+',
    title: 'Later-stage reading support',
    body: 'Fluency, comprehension strategies, and self-directed practice.',
    status: 'Planned, not yet built'
  }
];

export default function Landing() {
  return (
    <div className="landing">
      <MarketingNav />
      <BookIntro />

      <section className="section" id="what-is-dyslexia">
        <div className="container">
          <ScrollSection className="landing-copy-block">
            <h2 className="text-h2">What is dyslexia?</h2>
            <div className="landing-copy-block__grid">
              <p className="text-lead measure">
                Dyslexia is a specific, neurologically based difficulty with the sounds inside words. It makes
                accurate and fluent word recognition harder to build, even for children who are otherwise
                bright, curious, and verbally strong.
              </p>
              <div className="measure">
                <p className="text-body" style={{ marginBottom: 16 }}>
                  It is not a problem with vision, effort, or intelligence, and it does not mean a child is
                  reading backward or seeing letters move. It is a difference in how the brain processes the
                  sound structure of language, which makes connecting letters to sounds slower and more effortful.
                </p>
                <p className="text-body">
                  With the right identification and structured practice, most children affected by it become
                  capable, confident readers. The earlier that support starts, the less ground there is to make up.
                </p>
              </div>
            </div>
          </ScrollSection>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollSection className="landing-copy-block">
            <h2 className="text-h2">Why early screening matters</h2>
            <div className="landing-copy-block__grid">
              <p className="text-lead measure">
                Screening and diagnosis are not the same thing, and mixing them up is where a lot of confusion
                starts.
              </p>
              <div className="measure">
                <p className="text-body" style={{ marginBottom: 16 }}>
                  A screening is quick, low-stakes, and designed to answer one question: does this profile show
                  patterns worth a closer look? It flags, it does not confirm.
                </p>
                <p className="text-body">
                  A diagnosis is a formal, in-depth evaluation carried out by a qualified professional, usually
                  over multiple sessions. Screening earlier means a family can seek that evaluation sooner, if
                  it is warranted, instead of waiting for a child to visibly struggle for years first.
                </p>
              </div>
            </div>
          </ScrollSection>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollSection>
            <h2 className="text-h2" style={{ marginBottom: 8 }}>
              What the research says
            </h2>
            <p className="text-body measure" style={{ marginBottom: 40 }}>
              A few figures for context. Sources are linked under each one, and can be swapped for updated
              citations at any time &mdash; see <code>src/data/statistics.js</code>.
            </p>
          </ScrollSection>
          <div className="landing-stats-grid">
            {statistics.map((s) => (
              <StatCounter key={s.id} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="container">
          <ScrollSection className="section-head">
            <h2 className="text-h2">How the platform works</h2>
          </ScrollSection>
          <div className="landing-flow">
            {FLOW_STEPS.map((step, i) => (
              <div className="landing-flow__step" key={step.id}>
                <div className="landing-flow__marker">
                  <span>{step.label}</span>
                </div>
                <p className="text-body">{step.body}</p>
                {i < FLOW_STEPS.length - 1 && <div className="landing-flow__connector" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="try-it">
        <div className="container">
          <div className="landing-sample">
            <ScrollSection className="landing-sample__intro">
              <h2 className="text-h2">Try a few questions</h2>
              <p className="text-body measure" style={{ marginTop: 16 }}>
                This is the same style of item used in the real screening, without an account and without a
                score attached. It is meant to give you a feel for the format, not a result.
              </p>
            </ScrollSection>
            <ScrollSection>
              <SampleAssessment />
            </ScrollSection>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollSection className="section-head">
            <h2 className="text-h2">Inside the platform</h2>
          </ScrollSection>
          <FeatureShowcase />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollSection className="section-head">
            <h2 className="text-h2">Built for different stages of reading development</h2>
          </ScrollSection>
          <div className="landing-ages">
            {AGE_GROUPS.map((a) => (
              <div className={`landing-age-card ${a.id === '8-10' ? 'is-active' : ''}`} key={a.id}>
                <span className="text-small">{a.label}</span>
                <h3 className="text-h3">{a.title}</h3>
                <p className="text-body">{a.body}</p>
                <span className="pill">{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section landing-final">
        <div className="container landing-final__inner">
          <ScrollSection>
            <h2 className="text-display">Start with a baseline.</h2>
            <p className="text-body measure" style={{ margin: '20px 0 32px' }}>
              Create a profile, run a short screening, and see where things stand today. Everything else builds
              from there.
            </p>
            <Link to="/create-account" className="btn btn-primary">
              Create a profile
            </Link>
          </ScrollSection>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container landing-footer__row">
          <span className="text-small">Reading Profile &mdash; a screening tool, not a diagnostic one.</span>
          <span className="text-small">Built for early identification, not for "unlocking potential."</span>
        </div>
      </footer>
    </div>
  );
}
