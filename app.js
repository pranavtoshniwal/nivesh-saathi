'use strict';
// Nivesh Saathi web app: lessons, quizzes and glossary in four languages, with voice.
// No framework and no build step. Content comes from content.json.

const LANGS = { en: 'English', hi: 'हिन्दी', mr: 'मराठी', gu: 'ગુજરાતી' };
const TAG = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', gu: 'gu-IN' };
const ORDER = ['en', 'hi', 'mr', 'gu'];

// Static UI labels: [en, hi, mr, gu]
const S = {
  language: ['Language', 'भाषा', 'भाषा', 'ભાષા'],
  tabLessons: ['Lessons', 'पाठ', 'धडे', 'પાઠ'],
  tabGlossary: ['Glossary', 'शब्दकोश', 'शब्दकोश', 'શબ્દકોશ'],
  progress: ['{n} of {m} lessons done', '{m} में से {n} पाठ पूरे', '{m} पैकी {n} धडे पूर्ण', '{m} માંથી {n} પાઠ પૂરા'],
  meaning: ['What it means', 'इसका मतलब', 'याचा अर्थ', 'આનો અર્થ'],
  analogy: ['Think of it like this', 'इसे ऐसे समझिए', 'हे असे समजा', 'આને આમ સમજો'],
  related: ['Words in this lesson', 'इस पाठ के शब्द', 'या धड्यातील शब्द', 'આ પાઠના શબ્દો'],
  startQuiz: ['Take the quiz', 'क्विज़ शुरू करें', 'प्रश्नमंजुषा सुरू करा', 'ક્વિઝ શરૂ કરો'],
  listen: ['▶ Listen', '▶ सुनें', '▶ ऐका', '▶ સાંભળો'],
  pause: ['⏸ Pause', '⏸ रोकें', '⏸ थांबवा', '⏸ થોભો'],
  resume: ['▶ Resume', '▶ आगे सुनें', '▶ पुढे ऐका', '▶ આગળ સાંભળો'],
  stop: ['⏹ Stop', '⏹ बंद करें', '⏹ बंद करा', '⏹ બંધ કરો'],
  speaking: ['Speaking…', 'बोल रहा है…', 'बोलत आहे…', 'બોલે છે…'],
  paused: ['Paused', 'रुका हुआ', 'थांबलेले', 'થોભેલું'],
  option: ['Option', 'विकल्प', 'पर्याय', 'વિકલ્પ'],
  speakAnswer: ['🎤 Speak answer', '🎤 बोलकर जवाब दें', '🎤 बोलून उत्तर द्या', '🎤 બોલીને જવાબ આપો'],
  listening: ['Listening…', 'सुन रहा हूँ…', 'ऐकत आहे…', 'સાંભળું છું…'],
  heard: ['Heard', 'सुना', 'ऐकले', 'સાંભળ્યું'],
  notUnderstood: [
    'Could not match that to an option. Say "option 1", "option 2" or "option 3", or tap an answer.',
    'यह किसी विकल्प से मेल नहीं खाया। "विकल्प 1", "विकल्प 2" या "विकल्प 3" कहिए, या जवाब पर टैप कीजिए।',
    'हे कोणत्याही पर्यायाशी जुळले नाही. "पर्याय 1", "पर्याय 2" किंवा "पर्याय 3" म्हणा, किंवा उत्तरावर टॅप करा.',
    'આ કોઈ વિકલ્પ સાથે મેળ ખાતું નથી. "વિકલ્પ 1", "વિકલ્પ 2" કે "વિકલ્પ 3" કહો, અથવા જવાબ પર ટૅપ કરો.'],
  micDenied: [
    'The microphone is blocked. Allow it in the browser to answer by voice, or tap an answer.',
    'माइक्रोफ़ोन बंद है। बोलकर जवाब देने के लिए ब्राउज़र में अनुमति दीजिए, या जवाब पर टैप कीजिए।',
    'मायक्रोफोन बंद आहे. बोलून उत्तर देण्यासाठी ब्राउझरमध्ये परवानगी द्या, किंवा उत्तरावर टॅप करा.',
    'માઇક્રોફોન બંધ છે. બોલીને જવાબ આપવા બ્રાઉઝરમાં મંજૂરી આપો, અથવા જવાબ પર ટૅપ કરો.'],
  correct: ['Correct!', 'सही जवाब!', 'बरोबर उत्तर!', 'સાચો જવાબ!'],
  notQuite: ['Not quite.', 'यह सही नहीं है।', 'हे बरोबर नाही.', 'આ સાચું નથી.'],
  rightAnswer: ['Right answer', 'सही जवाब', 'बरोबर उत्तर', 'સાચો જવાબ'],
  tryAgain: ['Try again', 'फिर कोशिश करें', 'पुन्हा प्रयत्न करा', 'ફરી પ્રયત્ન કરો'],
  nextLesson: ['Next lesson', 'अगला पाठ', 'पुढचा धडा', 'આગળનો પાઠ'],
  allLessons: ['All lessons', 'सभी पाठ', 'सर्व धडे', 'બધા પાઠ'],
  backToLesson: ['Back to the lesson', 'पाठ पर वापस', 'धड्याकडे परत', 'પાઠ પર પાછા'],
  search: ['Search a word', 'शब्द खोजें', 'शब्द शोधा', 'શબ્દ શોધો'],
  noResults: ['No matching word', 'कोई शब्द नहीं मिला', 'शब्द सापडला नाही', 'કોઈ શબ્દ મળ્યો નથી'],
  openLesson: ['Open the lesson', 'पाठ खोलें', 'धडा उघडा', 'પાઠ ખોલો'],
  noVoice: [
    'If you hear nothing, this phone may not have a voice for this language. Add one in Settings → Text-to-speech.',
    'अगर आवाज़ न आए, तो शायद इस फ़ोन में इस भाषा की आवाज़ नहीं है। सेटिंग्स → टेक्स्ट-टू-स्पीच में जोड़िए।',
    'आवाज आला नाही तर कदाचित या फोनमध्ये या भाषेचा आवाज नाही. सेटिंग्ज → टेक्स्ट-टू-स्पीच मध्ये जोडा.',
    'અવાજ ન આવે તો કદાચ આ ફોનમાં આ ભાષાનો અવાજ નથી. સેટિંગ્સ → ટેક્સ્ટ-ટુ-સ્પીચમાં ઉમેરો.'],
  disclaimer: [
    'For learning only. This app does not give investment advice or stock tips.',
    'सिर्फ़ सीखने के लिए। यह ऐप निवेश की सलाह या शेयर टिप्स नहीं देता।',
    'फक्त शिकण्यासाठी. हे अॅप गुंतवणुकीचा सल्ला किंवा शेअर टिप्स देत नाही.',
    'ફક્ત શીખવા માટે. આ ઍપ રોકાણની સલાહ કે શેર ટિપ્સ આપતી નથી.'],
  loadError: ['Could not load the lessons. Check your connection and reload.', 'पाठ लोड नहीं हो सके। कनेक्शन जाँचकर दोबारा खोलिए।', 'धडे लोड झाले नाहीत. कनेक्शन तपासून पुन्हा उघडा.', 'પાઠ લોડ ન થયા. કનેક્શન તપાસી ફરી ખોલો.'],
};

Object.assign(S, {
  stopListening: ['Stop', 'रोकें', 'थांबवा', 'બંધ કરો'],
  theme: ['Switch between light and dark', 'हल्का या गहरा रंग बदलें', 'उजळ किंवा गडद रंग बदला', 'આછો કે ઘેરો રંગ બદલો'],
  resTitle: ['Sources and help', 'स्रोत और मदद', 'स्रोत आणि मदत', 'સ્રોત અને મદદ'],
  resSource: ["Lessons are rewritten in simple words from SEBI's Financial Education Booklet.", 'पाठ SEBI की वित्तीय शिक्षा पुस्तिका से सरल शब्दों में दोबारा लिखे गए हैं।', 'धडे SEBI च्या आर्थिक शिक्षण पुस्तिकेतून सोप्या शब्दांत पुन्हा लिहिले आहेत.', 'પાઠ SEBI ની નાણાકીય શિક્ષણ પુસ્તિકામાંથી સરળ શબ્દોમાં ફરી લખાયા છે.'],
  resInvestor: ['SEBI investor education website', 'SEBI निवेशक शिक्षा वेबसाइट', 'SEBI गुंतवणूकदार शिक्षण संकेतस्थळ', 'SEBI રોકાણકાર શિક્ષણ વેબસાઇટ'],
  resSebi: ['SEBI official website (check if a broker or adviser is registered)', 'SEBI की आधिकारिक वेबसाइट (ब्रोकर या सलाहकार पंजीकृत है या नहीं, जाँचें)', 'SEBI चे अधिकृत संकेतस्थळ (ब्रोकर किंवा सल्लागार नोंदणीकृत आहे का ते तपासा)', 'SEBI ની સત્તાવાર વેબસાઇટ (બ્રોકર કે સલાહકાર નોંધાયેલ છે કે નહીં તે તપાસો)'],
  resScores: ['SCORES: file a complaint with SEBI', 'SCORES: SEBI में शिकायत दर्ज करें', 'SCORES: SEBI कडे तक्रार नोंदवा', 'SCORES: SEBI માં ફરિયાદ નોંધાવો'],
  resCyber: ['Cyber fraud? Call 1930 or report online', 'साइबर ठगी? 1930 पर कॉल करें या ऑनलाइन शिकायत करें', 'सायबर फसवणूक? 1930 वर कॉल करा किंवा ऑनलाइन तक्रार करा', 'સાયબર છેતરપિંડી? 1930 પર કૉલ કરો અથવા ઑનલાઇન ફરિયાદ કરો'],
});

// Extra screens and button handlers are registered here by sim.js and moosha.js.
const VIEWS = {};
const ACTIONS = {};
const LEAVE = []; // functions to call when the user moves to another screen

// Browser storage can be unavailable (private mode); the app must still work without it.
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } },
};

let lang = store.get('lang', null);
if (!LANGS[lang]) lang = ORDER.find(c => (navigator.language || '').toLowerCase().startsWith(c)) || 'en';
let C = null;          // content.json
let lessons = [];      // flat list, in course order
let quiz = null;       // { id, sel, heard, miss, micErr, listening }
let recog = null;

const $ = id => document.getElementById(id);
const s = (k, vars) => S[k][ORDER.indexOf(lang)].replace(/\{(\w+)\}/g, (_, v) => vars[v]);
const t = m => (m && (m[lang] ?? m.en)) || '';
const esc = x => String(x).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------- Narration (text to speech) ----------
// Browsers pause speech unreliably on Android, so text is spoken one sentence at a time:
// pause cancels the current sentence and resume starts it again.
const narr = {
  ok: 'speechSynthesis' in window, state: 'idle', segs: [], i: 0, token: 0,
  voice() {
    const vs = speechSynthesis.getVoices();
    return vs.find(v => v.lang.replace('_', '-').toLowerCase().startsWith(lang)) || null;
  },
  missingVoice() { return this.ok && speechSynthesis.getVoices().length > 0 && !this.voice(); },
  speak(texts) {
    this.stop();
    if (!this.ok) return;
    this.segs = texts.flatMap(x => x.match(/[^.।?!]+[.।?!]*\s*/g) || []).map(x => x.trim()).filter(Boolean);
    this.i = 0;
    this.go();
  },
  go() {
    if (this.i >= this.segs.length) return this.stop();
    const tok = ++this.token;
    const u = new SpeechSynthesisUtterance(this.segs[this.i]);
    u.lang = TAG[lang];
    const v = this.voice(); if (v) u.voice = v;
    u.rate = 0.95;
    u.onend = () => { if (tok === this.token) { this.i++; this.go(); } };
    u.onerror = () => { if (tok === this.token) this.stop(); };
    this.state = 'speaking';
    speechSynthesis.speak(u);
    drawNarr();
  },
  pause() { if (this.state === 'speaking') { this.token++; speechSynthesis.cancel(); this.state = 'paused'; drawNarr(); } },
  resume() { if (this.state === 'paused') this.go(); },
  stop() {
    this.token++;
    if (this.ok) speechSynthesis.cancel();
    this.segs = []; this.i = 0; this.state = 'idle';
    drawNarr();
  },
};

function drawNarr() {
  const el = $('narr');
  if (!el) return;
  if (!narr.ok) { el.innerHTML = ''; return; }
  const b = (act, label, ghost) => `<button data-act="${act}"${ghost ? ' class="ghost"' : ''}>${esc(s(label))}</button>`;
  el.innerHTML =
    narr.state === 'idle' ? b('listen', 'listen')
    : narr.state === 'speaking' ? b('pause', 'pause') + b('stop', 'stop', 1) + `<span class="small muted" role="status">${esc(s('speaking'))}</span>`
    : b('resume', 'resume') + b('stop', 'stop', 1) + `<span class="small muted" role="status">${esc(s('paused'))}</span>`;
}

// ---------- Voice answers (speech to text) ----------
// A banner with a moving wave is shown the whole time the microphone is open, on every screen.
function showListening(on) {
  $('listening').hidden = !on;
  $('listeningText').textContent = s('listening');
  $('listeningStop').textContent = s('stopListening');
}
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

const ORD = [
  '1 one first a १ ૧ एक पहला पहली पहले पहिला पहिली पहिले એક પહેલો પહેલી પહેલું',
  '2 two second b २ ૨ दो दूसरा दूसरी दूसरे दोन दुसरा दुसरी दुसरे બે બીજો બીજી બીજું',
  '3 three third c ३ ૩ तीन तीसरा तीसरी तीसरे तिसरा तिसरी तिसरे ત્રણ ત્રીજો ત્રીજી ત્રીજું',
].map(x => new Set(x.split(' ')));
const OPTION_WORDS = new Set('option number answer विकल्प नंबर पर्याय क्रमांक વિકલ્પ નંબર'.split(' '));

// Lowercase, drop punctuation but keep Indic vowel signs (\p{M}), split into words.
const tokens = x => x.toLowerCase().replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);

function matchByText(heard, opts) {
  const h = tokens(heard);
  if (!h.length) return null;
  const hs = new Set(h), hj = h.join(' ');
  const sc = opts.map(o => {
    const ot = tokens(o);
    return !ot.length ? 0 : hj.includes(ot.join(' ')) ? 1 : ot.filter(w => hs.has(w)).length / ot.length;
  });
  const best = sc.indexOf(Math.max(...sc));
  const second = Math.max(0, ...sc.filter((_, i) => i !== best));
  // Needs a clear winner, so a word shared by all options cannot decide the answer.
  return sc[best] >= 0.6 && sc[best] - second >= 0.2 ? best : null;
}
function matchByNumber(heard, n) {
  const h = tokens(heard);
  // Trust number words only in a short reply or one that says "option" / "विकल्प".
  if (h.length > 3 && !h.some(w => OPTION_WORDS.has(w))) return null;
  const hits = [...new Set(h.map(w => ORD.findIndex(set => set.has(w))).filter(i => i >= 0))];
  return hits.length === 1 && hits[0] < n ? hits[0] : null;
}
function matchAnswer(cands, opts) {
  // Option text first: options can contain numbers ("10 में से 1") that would look like "option 1".
  for (const c of cands) { const r = matchByText(c, opts); if (r !== null) return r; }
  for (const c of cands) { const r = matchByNumber(c, opts.length); if (r !== null) return r; }
  return null;
}

function listenForAnswer() {
  const l = lessons.find(x => x.id === quiz.id);
  narr.stop(); // do not let the app hear its own voice
  Object.assign(quiz, { heard: null, miss: false, micErr: false, listening: true });
  let finished = false;
  const finish = (cands, err) => {
    if (finished) return; finished = true;
    showListening(false);
    if (!quiz) return; // the user left the quiz while the microphone was open
    quiz.listening = false;
    quiz.micErr = err === 'not-allowed' || err === 'service-not-allowed';
    quiz.heard = cands[0] || null;
    const m = cands.length ? matchAnswer(cands, l.quiz.opts[lang] || l.quiz.opts.en) : null;
    quiz.miss = m === null && !quiz.micErr;
    if (m !== null) answer(m); else render();
  };
  recog = new SR();
  recog.lang = TAG[lang]; recog.maxAlternatives = 5; recog.interimResults = false;
  recog.onresult = e => finish([...e.results[0]].map(a => a.transcript));
  recog.onerror = e => finish([], e.error);
  recog.onend = () => finish([]);
  try { recog.start(); } catch { finish([]); return; }
  showListening(true);
  render();
}

function answer(i) {
  const l = lessons.find(x => x.id === quiz.id);
  if (quiz.sel !== null) return;
  quiz.sel = i;
  const right = i === l.quiz.a;
  render();
  narr.speak([s(right ? 'correct' : 'notQuite'), t(l.quiz.why)]);
}

// ---------- Screens ----------
function viewHome() {
  let k = 0;
  return `
    ${C.units.map(u => `
      <h2>${esc(t(u.title))}</h2>
      <ul class="list">${u.lessons.map(l => `
        <li><a class="row" href="#/lesson/${l.id}">
          <span class="n" aria-hidden="true">${++k}</span><span>${esc(t(l.term))}</span></a></li>`).join('')}
      </ul>`).join('')}
    ${resources()}`;
}

/** Sources and official help links, shown at the bottom of the main pages. */
function resources() {
  const link = (href, key) => `<li><a href="${href}" target="_blank" rel="noopener">${esc(s(key))}</a></li>`;
  return `<footer class="res">
    <h2>${esc(s('resTitle'))}</h2>
    <p class="small">${esc(s('resSource'))}</p>
    <ul class="small">
      ${link('https://investor.sebi.gov.in', 'resInvestor')}
      ${link('https://www.sebi.gov.in', 'resSebi')}
      ${link('https://scores.sebi.gov.in', 'resScores')}
      <li><a href="tel:1930">${esc(s('resCyber'))}</a> · <a href="https://cybercrime.gov.in" target="_blank" rel="noopener">cybercrime.gov.in</a></li>
    </ul>
    <p class="small muted">${esc(s('disclaimer'))}</p>
  </footer>`;
}

function voiceNote() {
  return narr.missingVoice() ? `<p class="small muted">${esc(s('noVoice'))}</p>` : '';
}

function viewLesson(l) {
  const terms = (l.terms || []).map(id => C.glossary.terms.find(g => g.id === id)).filter(Boolean);
  return `
    <h1>${esc(t(l.term))}</h1>
    <div class="narr" id="narr"></div>${voiceNote()}
    <section class="card"><div class="label">${esc(s('meaning'))}</div><p>${esc(t(l.def))}</p></section>
    <section class="card warm"><div class="label">${esc(s('analogy'))}</div><p>${esc(t(l.analogy))}</p></section>
    ${terms.length ? `<h2>${esc(s('related'))}</h2>${terms.map(g => termBlock(g, false)).join('')}` : ''}
    <div class="actions"><a class="btn wide" href="#/quiz/${l.id}">${esc(s('startQuiz'))}</a>
      ${simFor(l.id) ? `<a class="btn wide ghost" href="#/sim/${simFor(l.id).id}">${esc(s('feelIt'))}</a>` : ''}</div>`;
}

function viewQuiz(l) {
  const q = l.quiz, opts = q.opts[lang] || q.opts.en, sel = quiz.sel;
  const next = lessons[lessons.indexOf(l) + 1];
  let body = `
    <h1>${esc(t(q.q))}</h1>
    <div class="narr" id="narr"></div>
    <div class="opts">${opts.map((o, i) => {
      const right = sel !== null && i === q.a, wrong = sel === i && i !== q.a;
      // The tick or cross is in the text too, so the result does not rely on colour alone.
      return `<button class="opt${right ? ' right' : wrong ? ' wrong' : ''}" data-act="pick" data-i="${i}"${sel !== null ? ' disabled' : ''}>${i + 1}. ${esc(o)}${right ? ' ✓' : wrong ? ' ✗' : ''}</button>`;
    }).join('')}</div>`;
  if (sel === null) {
    if (SR) body += `<button class="wide ghost" data-act="mic"${quiz.listening ? ' disabled' : ''}>${esc(s(quiz.listening ? 'listening' : 'speakAnswer'))}</button>`;
    if (quiz.heard) body += `<p class="small muted">${esc(s('heard'))}: “${esc(quiz.heard)}”</p>`;
    if (quiz.micErr) body += `<p class="small err" role="alert">${esc(s('micDenied'))}</p>`;
    else if (quiz.miss) body += `<p class="small err" role="alert">${esc(s('notUnderstood'))}</p>`;
  } else {
    const right = sel === q.a;
    body += `
      <section class="card ${right ? 'good' : 'bad'}" role="status">
        <p><strong>${esc(s(right ? 'correct' : 'notQuite'))}</strong></p>
        ${right ? '' : `<p>${esc(s('rightAnswer'))}: ${esc(opts[q.a])}</p>`}
        <p>${esc(t(q.why))}</p>
      </section>
      <div class="actions">
        ${right ? '' : `<button class="ghost" data-act="retry">${esc(s('tryAgain'))}</button>`}
        ${next ? `<a class="btn" href="#/lesson/${next.id}">${esc(s('nextLesson'))}</a>` : ''}
        <a class="btn ghost" href="#/">${esc(s('allLessons'))}</a>
      </div>`;
  }
  return body + `<p class="small"><a href="#/lesson/${l.id}">← ${esc(s('backToLesson'))}</a></p>`;
}

function termBlock(g, withLesson) {
  const lid = withLesson && g.lessons && g.lessons[0];
  return `<details><summary>${esc(t(g.term))}</summary><div>
    <p>${esc(t(g.def))}</p><p class="like">${esc(t(g.like))}</p>
    <div class="actions">
      ${narr.ok ? `<button class="ghost" data-act="say" data-id="${g.id}">${esc(s('listen'))}</button>` : ''}
      ${lid ? `<a class="btn ghost" href="#/lesson/${lid}">${esc(s('openLesson'))}</a>` : ''}
    </div></div></details>`;
}

let query = '';
function glossaryList() {
  const q = query.trim().toLowerCase();
  const hit = g => !q || ORDER.some(c => (g.term[c] || '').toLowerCase().includes(q)) || t(g.def).toLowerCase().includes(q);
  const out = Object.entries(C.glossary.categories).map(([id, name]) => {
    const items = C.glossary.terms.filter(g => g.cat === id && hit(g));
    return items.length ? `<h2>${esc(t(name))}</h2>${items.map(g => termBlock(g, true)).join('')}` : '';
  }).join('');
  return out || `<p class="muted">${esc(s('noResults'))}</p>`;
}
function viewGlossary() {
  return `
    <label class="sr" for="q">${esc(s('search'))}</label>
    <input id="q" type="search" placeholder="${esc(s('search'))}" value="${esc(query)}" autocomplete="off" enterkeyhint="search">
    <div id="gl">${glossaryList()}</div>${resources()}`;
}

// ---------- Routing and rendering ----------
function route() {
  const [, name, id] = location.hash.split('/');
  const l = lessons.find(x => x.id === id);
  if (name === 'lesson' && l) return { name, l };
  if (name === 'quiz' && l) return { name, l };
  if (name === 'glossary') return { name };
  if (name === 'sim') return { name, id };
  if (name === 'moosha') return { name };
  return { name: 'home' };
}

function chrome(r) {
  document.documentElement.lang = lang;
  $('langLabel').textContent = s('language');
  $('theme').setAttribute('aria-label', s('theme'));
  const current = { glossary: 'tabGlossary', sim: 'tabSim', moosha: '' }[r.name] ?? 'tabLessons';
  for (const id of ['tabLessons', 'tabSim', 'tabGlossary']) {
    $(id).textContent = s(id);
    if (id === current) $(id).setAttribute('aria-current', 'page'); else $(id).removeAttribute('aria-current');
  }
  $('fab').hidden = r.name === 'moosha';
}

function render() {
  if (!C) return;
  const r = route();
  if (r.name === 'quiz') { if (!quiz || quiz.id !== r.l.id) quiz = { id: r.l.id, sel: null, heard: null, miss: false, micErr: false, listening: false }; }
  else quiz = null;
  chrome(r);
  $('app').innerHTML = VIEWS[r.name] ? VIEWS[r.name](r)
    : r.name === 'lesson' ? viewLesson(r.l) : r.name === 'quiz' ? viewQuiz(r.l) : r.name === 'glossary' ? viewGlossary() : viewHome();
  drawNarr();
}

function navigate() {
  narr.stop();
  showListening(false);
  LEAVE.forEach(f => f());
  if (recog) { try { recog.abort(); } catch { /* ignore */ } }
  render();
  window.scrollTo(0, 0);
  $('app').focus({ preventScroll: true });
}

document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]');
  if (!b) return;
  const r = route(), act = b.dataset.act;
  if (act === 'listen') {
    if (r.name === 'lesson') narr.speak([t(r.l.term) + '.', t(r.l.def), t(r.l.analogy)]);
    if (r.name === 'sim') ACTIONS.simListen();
    if (r.name === 'quiz') narr.speak([t(r.l.quiz.q), ...(r.l.quiz.opts[lang] || r.l.quiz.opts.en).map((o, i) => `${s('option')} ${i + 1}. ${o}.`)]);
  }
  else if (act === 'pause') narr.pause();
  else if (act === 'resume') narr.resume();
  else if (act === 'stop') narr.stop();
  else if (act === 'pick') answer(+b.dataset.i);
  else if (act === 'retry') { narr.stop(); quiz = null; render(); }
  else if (act === 'mic') listenForAnswer();
  else if (act === 'micStop') { showListening(false); if (recog) { try { recog.abort(); } catch { /* ignore */ } } }
  else if (act === 'say') {
    const g = C.glossary.terms.find(x => x.id === b.dataset.id);
    narr.speak([t(g.term) + '.', t(g.def), t(g.like)]);
  }
  else if (ACTIONS[act]) ACTIONS[act](b, r);
});

document.addEventListener('input', e => {
  if (e.target.id !== 'q') return;
  query = e.target.value;
  $('gl').innerHTML = glossaryList(); // only the list, so the keyboard stays open
});

window.addEventListener('hashchange', navigate);
if (narr.ok) speechSynthesis.addEventListener?.('voiceschanged', () => { if (route().name === 'lesson' && narr.state === 'idle') render(); });

// Theme: follows the phone until the user taps the toggle, then remembers the choice.
let theme = store.get('theme', null);
function applyTheme() {
  const dark = theme ? theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  if (theme) document.documentElement.dataset.theme = theme;
  $('theme').textContent = dark ? '☀️' : '🌙';
  document.querySelector('meta[name="theme-color"]').content = dark ? '#173b2e' : '#0b6e4f';
  return dark;
}
$('theme').addEventListener('click', () => { theme = applyTheme() ? 'light' : 'dark'; store.set('theme', theme); applyTheme(); });
applyTheme();

const sel = $('lang');
sel.innerHTML = ORDER.map(c => `<option value="${c}">${LANGS[c]}</option>`).join('');
sel.value = lang;
sel.addEventListener('change', () => {
  lang = sel.value; store.set('lang', lang);
  narr.stop();
  if (recog) { try { recog.abort(); } catch { /* ignore */ } }
  if (quiz) Object.assign(quiz, { heard: null, miss: false, micErr: false });
  render();
});

fetch('content.json').then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(data => {
  C = data;
  lessons = C.units.flatMap(u => u.lessons);
  render();
}).catch(() => { $('app').innerHTML = `<p class="err" role="alert">${esc(s('loadError'))}</p>`; });

// Offline support and install-to-home-screen.
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
