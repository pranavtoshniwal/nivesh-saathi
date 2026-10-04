'use strict';
// MOOSHA: the doubt-solving chat. It teaches; it never advises.
// Safety is applied in layers:
//   1. Personal details are stripped from the message in the browser, before anything is sent.
//   2. "What should I buy" questions are answered with a fixed refusal and never reach the AI.
//   3. The server function (netlify/functions/moosha.mjs) strips details again and holds the AI to strict rules.
// The conversation lives only in memory: it is not saved on the phone or on the server.

const MOOSHA_URL = '/api/moosha'; // same address on Vercel and Netlify

Object.assign(S, {
  mooshaHi: ['Namaste! I am MOOSHA. Ask me any doubt about money, markets or fraud and I will explain it simply.',
    'नमस्ते! मैं MOOSHA हूँ। पैसे, बाज़ार या धोखाधड़ी के बारे में कोई भी सवाल पूछिए, मैं आसान भाषा में समझाऊँगा।',
    'नमस्कार! मी MOOSHA आहे. पैसा, बाजार किंवा फसवणुकीबद्दल कोणताही प्रश्न विचारा, मी सोप्या भाषेत समजावेन.',
    'નમસ્તે! હું MOOSHA છું. પૈસા, બજાર કે છેતરપિંડી વિશે કોઈ પણ પ્રશ્ન પૂછો, હું સરળ ભાષામાં સમજાવીશ.'],
  mooshaRules: ['I only teach. I cannot tell you what to buy or sell. Do not type your PAN, Aadhaar, OTP, PIN, account or phone number here.',
    'मैं सिर्फ़ सिखाता हूँ। क्या खरीदें या बेचें, यह मैं नहीं बता सकता। यहाँ अपना PAN, आधार, OTP, PIN, खाता या फ़ोन नंबर न लिखें।',
    'मी फक्त शिकवतो. काय घ्यावे किंवा विकावे हे मी सांगू शकत नाही. इथे तुमचा PAN, आधार, OTP, PIN, खाते किंवा फोन नंबर लिहू नका.',
    'હું ફક્ત શીખવું છું. શું ખરીદવું કે વેચવું તે હું કહી શકતો નથી. અહીં તમારો PAN, આધાર, OTP, PIN, ખાતા કે ફોન નંબર ન લખો.'],
  mooshaAsk: ['Type your doubt', 'अपना सवाल लिखें', 'तुमचा प्रश्न लिहा', 'તમારો પ્રશ્ન લખો'],
  mooshaSend: ['Send', 'भेजें', 'पाठवा', 'મોકલો'],
  mooshaSpeak: ['Speak your doubt', 'बोलकर पूछें', 'बोलून विचारा', 'બોલીને પૂછો'],
  mooshaThinking: ['MOOSHA is thinking…', 'MOOSHA सोच रहा है…', 'MOOSHA विचार करत आहे…', 'MOOSHA વિચારે છે…'],
  mooshaNoAdvice: ['I cannot tell you what to buy or sell, and I cannot guess prices. Nobody can know tomorrow\'s price for sure. I can explain how something works and what its risks are, so that you can decide for yourself.',
    'मैं यह नहीं बता सकता कि क्या खरीदें या बेचें, और दाम का अंदाज़ा भी नहीं लगा सकता। कल का दाम कोई पक्का नहीं जान सकता। मैं समझा सकता हूँ कि कोई चीज़ कैसे काम करती है और उसमें क्या जोखिम है, ताकि आप खुद फ़ैसला कर सकें।',
    'काय घ्यावे किंवा विकावे हे मी सांगू शकत नाही, आणि भावाचा अंदाजही बांधू शकत नाही. उद्याचा भाव कोणीही खात्रीने जाणू शकत नाही. एखादी गोष्ट कशी चालते आणि तिच्यात काय जोखीम आहे हे मी समजावू शकतो, म्हणजे तुम्ही स्वतः निर्णय घेऊ शकाल.',
    'શું ખરીદવું કે વેચવું તે હું કહી શકતો નથી, અને ભાવનો અંદાજ પણ લગાવી શકતો નથી. આવતી કાલનો ભાવ કોઈ ખાતરીથી જાણી શકતું નથી. કોઈ વસ્તુ કેવી રીતે ચાલે છે અને તેમાં શું જોખમ છે તે હું સમજાવી શકું, જેથી તમે જાતે નિર્ણય લઈ શકો.'],
  mooshaRedacted: ['I removed what looked like personal details from your message. Never share them with anyone, including me.',
    'मैंने आपके संदेश से निजी जानकारी जैसी दिखने वाली चीज़ें हटा दीं। इन्हें कभी किसी के साथ साझा न करें, मेरे साथ भी नहीं।',
    'तुमच्या संदेशातून वैयक्तिक माहितीसारखे दिसणारे भाग मी काढले. ते कधीही कोणालाही सांगू नका, मलाही नाही.',
    'તમારા સંદેશમાંથી અંગત વિગત જેવું લાગતું મેં કાઢી નાખ્યું. તે ક્યારેય કોઈને ન આપો, મને પણ નહીં.'],
  mooshaUnknown: ['I could not find that in my lessons, and I cannot reach the AI service right now. Try the Glossary, or ask again when you are online.',
    'यह मुझे अपने पाठों में नहीं मिला, और अभी AI सेवा तक पहुँच नहीं हो पा रही। शब्दकोश देखिए, या ऑनलाइन होने पर फिर पूछिए।',
    'हे मला माझ्या धड्यांत सापडले नाही, आणि सध्या AI सेवेशी संपर्क होत नाही. शब्दकोश पाहा, किंवा ऑनलाइन असताना पुन्हा विचारा.',
    'આ મને મારા પાઠમાં મળ્યું નથી, અને હાલ AI સેવા સુધી પહોંચાતું નથી. શબ્દકોશ જુઓ, અથવા ઑનલાઇન હો ત્યારે ફરી પૂછો.'],
  mooshaOffline: ['From the app\'s own lessons', 'ऐप के अपने पाठों से', 'अॅपच्या स्वतःच्या धड्यांतून', 'ઍપના પોતાના પાઠમાંથી'],
  mooshaAi: ['AI answer. It can be wrong; check important things with official sources.', 'AI का जवाब। यह गलत हो सकता है; ज़रूरी बातें आधिकारिक स्रोतों से जाँचिए।', 'AI चे उत्तर. ते चुकीचे असू शकते; महत्त्वाच्या गोष्टी अधिकृत स्रोतांतून तपासा.', 'AI નો જવાબ. તે ખોટો હોઈ શકે; મહત્ત્વની બાબતો સત્તાવાર સ્રોતથી તપાસો.'],
  mooshaStarters: ['What is NAV?|What is a SIP?|How do I spot a fraud scheme?', 'NAV क्या है?|SIP क्या है?|ठगी वाली स्कीम कैसे पहचानें?', 'NAV म्हणजे काय?|SIP म्हणजे काय?|फसवी योजना कशी ओळखावी?', 'NAV શું છે?|SIP શું છે?|છેતરામણી સ્કીમ કેવી રીતે ઓળખવી?'],
});

// ---------- 1. Personal details never leave the phone ----------
const DIG = '[\\d०-९૦-૯]';
const PII = [
  /[\w.+-]+@[\w-]+\.[\w.]{2,}/g,                                   // email
  /[\w.-]{2,}@[a-zA-Z]{2,}/g,                                      // UPI id
  /\b[A-Za-z]{5}\d{4}[A-Za-z]\b/g,                                 // PAN
  /\b[A-Za-z]{4}0[A-Za-z0-9]{6}\b/g,                               // IFSC
  new RegExp(`(?:otp|pin|cvv|password|passcode|ओटीपी|पिन|पासवर्ड|ઓટીપી|પિન|પાસવર્ડ)[^\\d०-९૦-૯]{0,15}${DIG}{3,8}`, 'gi'), // OTP / PIN with its number
  new RegExp(`(?:${DIG}[\\s-]?){9,}`, 'g'),                        // phone, Aadhaar, account or card number
];
function redact(text) {
  let out = text;
  for (const re of PII) out = out.replace(re, ' [•••] ');
  return { text: out.replace(/\s+/g, ' ').trim(), changed: out !== text };
}

// ---------- 2. Advice questions are refused before they reach the AI ----------
const ADVICE = new RegExp([
  '(should|shall|can|may) i .{0,40}(buy|sell|invest in|hold|exit)',
  'is (it|this|now) .{0,25}(good|right|best|safe) .{0,25}(buy|sell|invest|time)',
  '(which|what|best|top|good) .{0,20}(stock|share|fund|sip|coin|crypto|ipo|scheme|broker|app)s? .{0,20}(buy|invest|pick|choose|best|should)',
  '(best|top) (stock|share|fund|mutual fund|sip|coin|crypto|ipo|broker)',
  '(price|target|nifty|sensex) .{0,25}(prediction|predict|tomorrow|next week|next month|go up|go down|will)',
  '(कौन|कौनसा|कौन सा|किस) .{0,20}(शेयर|स्टॉक|फंड|क्रिप्टो|आईपीओ|ब्रोकर)', '(खरीद|बेच)(ूँ|ूं|ना चाहिए|ें|ूँ क्या|ना ठीक)', 'दाम .{0,20}(बढ़ेगा|गिरेगा|कल)',
  '(कोणता|कोणते|कुठला|कोणत्या) .{0,20}(शेअर|स्टॉक|फंड|क्रिप्टो|आयपीओ|ब्रोकर)', '(खरेदी|विक्री) कर(ू|ावा|ावी|ावे)', '(विकू|घेऊ) का', 'भाव .{0,20}(वाढेल|घसरेल|उद्या)',
  '(કયો|કયું|કયા|કઈ) .{0,20}(શેર|સ્ટૉક|ફંડ|ક્રિપ્ટો|આઈપીઓ|બ્રોકર)', '(ખરીદ|વેચ)(ું|વો જોઈએ|વું જોઈએ|ી લઉં|ી દઉં)', 'ભાવ .{0,20}(વધશે|ઘટશે|કાલે)',
].join('|'), 'i');

// ---------- Finding the matching glossary terms ----------
const ALIAS = { // everyday words -> glossary id
  ponzi: ['fraud', 'scam', 'cheat', 'ठगी', 'धोखा', 'धोखाधड़ी', 'फसव', 'घोटाळा', 'છેતર', 'કૌભાંડ'],
  volatility: ['up and down', 'उतार-चढ़ाव', 'चढ-उतार', 'ચડ-ઉતર'],
  market_crash: ['crash', 'गिरावट', 'कोसळ', 'તૂટ'],
  leverage: ['loan to trade', 'borrow', 'उधार', 'उसने', 'ઉધાર'],
  nominee: ['nomination', 'नामांकन', 'नामनिर्देशन', 'નામાંકન'],
  expense_ratio: ['fee', 'fees', 'charges', 'शुल्क', 'ફી'],
};
function findTerms(question) {
  const q = ' ' + question.toLowerCase().replace(/[?!.,।]/g, ' ') + ' ';
  const hits = [];
  for (const g of C.glossary.terms) {
    const names = ORDER.flatMap(c => (g.term[c] || '').split(/[()\/,]/)).concat(ALIAS[g.id] || [])
      .map(x => x.trim().toLowerCase()).filter(x => x.length >= 2);
    // Short names such as "sip" or "nav" must match a whole word; longer ones may match inside a phrase.
    const best = names.filter(n => n.length <= 4 ? q.includes(' ' + n + ' ') : q.includes(n)).sort((a, b) => b.length - a.length)[0];
    if (best) hits.push({ g, len: best.length });
  }
  return hits.sort((a, b) => b.len - a.len).slice(0, 4).map(h => h.g);
}

// ---------- Chat ----------
let chat = []; // { who: 'u' | 'm', text, note?, lesson? }
let chatBusy = false;

async function askMoosha(raw) {
  const { text, changed } = redact(raw.slice(0, 500));
  if (!text || chatBusy) return;
  chat.push({ who: 'u', text });
  if (changed) chat.push({ who: 'm', text: s('mooshaRedacted') });
  if (ADVICE.test(text)) { chat.push({ who: 'm', text: s('mooshaNoAdvice') }); return drawChat(); }

  const terms = findTerms(text);
  chatBusy = true; drawChat();
  let reply = null, aiError = '';
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 58000); // slow answers are allowed; the server gives up first
    const res = await fetch(MOOSHA_URL, {
      method: 'POST', headers: { 'content-type': 'application/json' }, signal: ctl.signal,
      body: JSON.stringify({
        lang, question: text,
        context: terms.map(g => ({ term: t(g.term), def: t(g.def), like: t(g.like) })),
        history: chat.slice(0, -1).filter(m => !m.note || m.note === 'ai').slice(-4).map(m => ({ who: m.who, text: m.text })),
      }),
    });
    clearTimeout(timer);
    const data = await res.json().catch(() => null);
    if (res.ok && data?.reply) reply = data.reply;
    else aiError = res.status === 404 ? 'server function not found (404)' : (data?.error || `error ${res.status}`);
  } catch { aiError = navigator.onLine === false ? 'no internet' : 'no reply from server'; }
  chatBusy = false;

  if (reply) chat.push({ who: 'm', text: reply, note: 'ai', lesson: terms[0]?.lessons?.[0] });
  else if (terms.length) chat.push({ who: 'm', text: `${t(terms[0].term)}: ${t(terms[0].def)} ${t(terms[0].like)}`, note: 'offline', err: aiError, lesson: terms[0].lessons?.[0] });
  else chat.push({ who: 'm', text: s('mooshaUnknown'), err: aiError });
  drawChat();
}

function chatLog() {
  const bubble = (m, i) => `<div class="msg ${m.who}">
      <p>${esc(m.text)}</p>
      ${m.note ? `<p class="small muted">${esc(s(m.note === 'ai' ? 'mooshaAi' : 'mooshaOffline'))}</p>` : ''}
      ${m.err ? `<p class="small muted">AI: ${esc(m.err)}</p>` : ''}
      ${m.who === 'm' ? `<div class="actions">
        ${sayBox('chat', i)}
        ${m.lesson ? `<a class="btn ghost" href="#/lesson/${m.lesson}">${esc(s('openLesson'))}</a>` : ''}</div>` : ''}
    </div>`;
  const starters = chat.length ? '' : `<div class="chips">${s('mooshaStarters').split('|').map(q => `<button class="ghost" data-act="chatAsk" data-q="${esc(q)}">${esc(q)}</button>`).join('')}</div>`;
  return `<div class="msg m"><p>${esc(s('mooshaHi'))}</p><p class="small muted">${esc(s('mooshaRules'))}</p></div>
    ${chat.map(bubble).join('')}${starters}
    ${chatBusy ? `<p class="small muted" role="status">${esc(s('mooshaThinking'))}</p>` : ''}`;
}
function drawChat() {
  const el = $('chatlog');
  if (!el) return;
  el.innerHTML = chatLog();
  window.scrollTo(0, document.body.scrollHeight);
}
function viewMoosha() {
  return `<h1>MOOSHA</h1>
    <div id="chatlog" aria-live="polite">${chatLog()}</div>
    <form id="chatform" class="chatbar" autocomplete="off">
      <label class="sr" for="chatq">${esc(s('mooshaAsk'))}</label>
      <textarea id="chatq" rows="1" maxlength="500" placeholder="${esc(s('mooshaAsk'))}" enterkeyhint="send"></textarea>
      ${SR ? `<button type="button" class="ghost" data-act="chatMic" aria-label="${esc(s('mooshaSpeak'))}">🎤</button>` : ''}
      <button type="submit">${esc(s('mooshaSend'))}</button>
    </form>`;
}

VIEWS.moosha = viewMoosha;
ACTIONS.chatAsk = b => askMoosha(b.dataset.q);
SAY.chat = i => [chat[+i].text];
ACTIONS.chatMic = b => {
  narr.stop();
  recog = new SR(); // shared with the quiz, so the Stop button in the banner works here too
  recog.lang = TAG[lang]; recog.interimResults = false;
  const end = () => { showListening(false); b.disabled = false; b.classList.remove('live'); };
  recog.onresult = e => { end(); askMoosha(e.results[0][0].transcript); };
  recog.onend = recog.onerror = end;
  try { recog.start(); } catch { end(); return; }
  b.disabled = true; b.classList.add('live');
  showListening(true);
};
document.addEventListener('submit', e => {
  if (e.target.id !== 'chatform') return;
  e.preventDefault();
  const box = $('chatq');
  const q = box.value;
  box.value = '';
  box.style.height = '';
  askMoosha(q);
});
// The question box wraps long text and grows up to a few lines, so the whole question stays visible.
document.addEventListener('input', e => {
  if (e.target.id !== 'chatq') return;
  e.target.style.height = 'auto';
  e.target.style.height = Math.min(e.target.scrollHeight, 132) + 'px';
});
// Enter sends; Shift+Enter starts a new line.
document.addEventListener('keydown', e => {
  if (e.target.id !== 'chatq' || e.key !== 'Enter' || e.shiftKey || e.isComposing) return;
  e.preventDefault();
  $('chatform').requestSubmit();
});
