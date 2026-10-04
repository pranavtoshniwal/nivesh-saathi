'use strict';
// Consequence simulator: short scripted stories that let the user feel a risk with pretend money.
// Prices are made up and fixed. There are no real companies, no live data and no score for profit.

Object.assign(S, {
  tabSim: ['Know your mistakes', 'अपनी गलतियाँ जानें', 'तुमच्या चुका जाणा', 'તમારી ભૂલો જાણો'],
  year: ['Year', 'साल', 'वर्ष', 'વર્ષ'],
  formalLbl: ['Formal name', 'औपचारिक नाम', 'औपचारिक नाव', 'ઔપચારિક નામ'],
  factLbl: ['In real life', 'असल ज़िंदगी में', 'प्रत्यक्षात', 'વાસ્તવિક જીવનમાં'],
  simIntro: ['Feel what a risk does, with pretend money. Each story takes two minutes.', 'नकली पैसों से महसूस कीजिए कि जोखिम क्या करता है। हर कहानी दो मिनट की है।', 'खोट्या पैशांनी अनुभवा की जोखीम काय करते. प्रत्येक गोष्ट दोन मिनिटांची आहे.', 'નકલી પૈસાથી અનુભવો કે જોખમ શું કરે છે. દરેક વાર્તા બે મિનિટની છે.'],
  madeUp: ['All companies and prices in these stories are made up. This is not a prediction.', 'इन कहानियों की सभी कंपनियाँ और दाम काल्पनिक हैं। यह कोई भविष्यवाणी नहीं है।', 'या गोष्टींतील सर्व कंपन्या आणि भाव काल्पनिक आहेत. हे भाकीत नाही.', 'આ વાર્તાઓની બધી કંપનીઓ અને ભાવ કાલ્પનિક છે. આ કોઈ આગાહી નથી.'],
  choose: ['What will you do?', 'आप क्या करेंगे?', 'तुम्ही काय कराल?', 'તમે શું કરશો?'],
  you: ['Your choice', 'आपका विकल्प', 'तुमचा पर्याय', 'તમારો વિકલ્પ'],
  other: ['The other choice', 'दूसरा विकल्प', 'दुसरा पर्याय', 'બીજો વિકલ્પ'],
  week: ['Week', 'हफ़्ता', 'आठवडा', 'અઠવાડિયું'],
  month: ['Month', 'महीना', 'महिना', 'મહિનો'],
  day: ['Day', 'दिन', 'दिवस', 'દિવસ'],
  start: ['Start', 'शुरुआत', 'सुरुवात', 'શરૂઆત'],
  putIn: ['You put in', 'आपने लगाए', 'तुम्ही लावले', 'તમે મૂક્યા'],
  nowHave: ['You have now', 'अब आपके पास', 'आता तुमच्याकडे', 'હવે તમારી પાસે'],
  endWith: ['You ended with', 'अंत में आपके पास', 'शेवटी तुमच्याकडे', 'અંતે તમારી પાસે'],
  otherEnd: ['The other choice would have ended with', 'दूसरा विकल्प चुनते तो अंत में होते', 'दुसरा पर्याय निवडला असता तर शेवटी असते', 'બીજો વિકલ્પ લીધો હોત તો અંતે હોત'],
  whyTitle: ['Why this happened', 'ऐसा क्यों हुआ', 'असे का झाले', 'આવું કેમ થયું'],
  tryOther: ['Try again with another choice', 'दूसरा विकल्प चुनकर फिर आज़माएँ', 'दुसरा पर्याय निवडून पुन्हा करून पाहा', 'બીજો વિકલ્પ પસંદ કરી ફરી અજમાવો'],
  allSims: ['All stories', 'सभी कहानियाँ', 'सर्व गोष्टी', 'બધી વાર્તાઓ'],
  numbers: ['See the numbers', 'आँकड़े देखें', 'आकडे पाहा', 'આંકડા જુઓ'],
  feelIt: ['Feel it: try the story', 'महसूस कीजिए: कहानी आज़माएँ', 'अनुभवा: गोष्ट करून पाहा', 'અનુભવો: વાર્તા અજમાવો'],
});

const rupee = n => (n < -0.5 ? '−' : '') + '₹' + Math.abs(Math.round(n)).toLocaleString('en-IN');
const frozen = (arr, d, at, i) => arr[d === 1 && i >= at ? at : i];

// Index 0 of every decision is the "do nothing new" option; it is also what the comparison line assumes.
const SCENARIOS = [
  {
    id: 'crash', lesson: 'diversification', cash: 10000, unit: 'week', at: 12,
    one: [100, 103, 106, 104, 108, 110, 107, 98, 85, 70, 58, 50, 47, 50, 54, 58, 60, 62, 61, 63, 65, 64, 66, 67, 66, 68, 68],
    mix: [100, 101, 102, 102, 103, 104, 103, 100, 96, 91, 87, 84, 83, 84, 86, 88, 89, 91, 91, 92, 93, 94, 95, 95, 96, 97, 97],
    get n() { return this.one.length; },
    value(c, d, i) { return 100 * frozen(c === 0 ? this.one : this.mix, d, this.at, i); },
    invested() { return this.cash; },
    title: ['The crash', 'बाज़ार की गिरावट', 'बाजार कोसळला', 'બજાર તૂટ્યું'],
    intro: ['You have ₹10,000 of pretend money to invest for six months. Nobody knows what the market will do. Where do you put it?',
      'आपके पास छह महीने के लिए लगाने को ₹10,000 नकली पैसे हैं। कोई नहीं जानता कि बाज़ार क्या करेगा। पैसा कहाँ लगाएँगे?',
      'तुमच्याकडे सहा महिन्यांसाठी गुंतवायला ₹10,000 खोटे पैसे आहेत. बाजार काय करेल हे कोणालाच माहीत नाही. पैसे कुठे लावाल?',
      'તમારી પાસે છ મહિના માટે રોકવા ₹10,000 નકલી પૈસા છે. બજાર શું કરશે તે કોઈ જાણતું નથી. પૈસા ક્યાં મૂકશો?'],
    choices: [
      ['All in one company\'s shares', 'सारा पैसा एक ही कंपनी के शेयर में', 'सगळे पैसे एकाच कंपनीच्या शेअरमध्ये', 'બધા પૈસા એક જ કંપનીના શેરમાં'],
      ['Spread across many companies and a bank deposit', 'कई कंपनियों और बैंक जमा में बाँटकर', 'अनेक कंपन्या आणि बँक ठेवीत विभागून', 'ઘણી કંપનીઓ અને બેંક થાપણમાં વહેંચીને']],
    decide: [0, 0].map(() => ({
      ask: ['The whole market has crashed and your money has fallen. What now?', 'पूरा बाज़ार गिर गया है और आपका पैसा घट गया है। अब क्या करेंगे?', 'संपूर्ण बाजार कोसळला आहे आणि तुमचे पैसे घटले आहेत. आता काय कराल?', 'આખું બજાર તૂટ્યું છે અને તમારા પૈસા ઘટ્યા છે. હવે શું કરશો?'],
      opts: [['Stay invested', 'निवेश में बने रहें', 'गुंतवणूक तशीच ठेवा', 'રોકાણ ચાલુ રાખો'], ['Sell everything now', 'अभी सब बेच दें', 'आत्ताच सगळे विका', 'હમણાં બધું વેચી દો']],
    })),
    why: ['When the whole market falls, almost everything falls, but one company can fall much harder than a mix. Spreading the money softened the blow; it did not remove it. Selling at the bottom turns a fall on paper into a real loss. In real life a recovery can take years, and a single company may never recover.',
      'जब पूरा बाज़ार गिरता है तो लगभग सब कुछ गिरता है, पर एक अकेली कंपनी मिले-जुले निवेश से कहीं ज़्यादा गिर सकती है। पैसा बाँटने से चोट हल्की हुई, खत्म नहीं हुई। सबसे निचले स्तर पर बेचने से कागज़ का घाटा असली घाटा बन जाता है। असल ज़िंदगी में सुधार में बरसों लग सकते हैं, और एक अकेली कंपनी शायद कभी न सँभले।',
      'संपूर्ण बाजार घसरतो तेव्हा जवळपास सगळेच घसरते, पण एकटी कंपनी मिश्र गुंतवणुकीपेक्षा खूप जास्त घसरू शकते. पैसे विभागल्याने फटका सौम्य झाला, संपला नाही. तळाला विकल्याने कागदावरचा तोटा खरा तोटा बनतो. प्रत्यक्षात सावरायला अनेक वर्षे लागू शकतात, आणि एकटी कंपनी कदाचित कधीच सावरणार नाही.',
      'આખું બજાર ઘટે ત્યારે લગભગ બધું ઘટે છે, પણ એકલી કંપની મિશ્ર રોકાણ કરતાં ઘણી વધારે ઘટી શકે. પૈસા વહેંચવાથી ફટકો હળવો થયો, દૂર ન થયો. તળિયે વેચવાથી કાગળ પરનું નુકસાન સાચું નુકસાન બને છે. ખરેખર સુધારામાં વર્ષો લાગી શકે, અને એકલી કંપની કદાચ ક્યારેય ન સુધરે.'],
  },
  {
    id: 'leverage', lesson: 'fno', cash: 10000, unit: 'week', at: 5,
    p: [100, 101, 99, 96, 92, 88, 84, 79, 74, 70, 68, 72, 78, 85, 92, 99, 105],
    get n() { return this.p.length; },
    value(c, d, i) {
      if (c === 0) return 100 * this.p[i];
      const eq = (own, k) => own + 500 * (this.p[k] - 100); // a ₹50,000 position moves ₹500 per point
      if (d === null || i < this.at) return eq(10000, i);
      if (d === 0) return eq(10000, this.at);               // adds nothing: broker sells now
      for (let k = this.at + 1; k <= i; k++) if (eq(15000, k) <= 0) return 0; // wiped out, position closed
      return i === this.at ? eq(10000, i) : eq(15000, i);
    },
    invested(c, d) { return c === 1 && d === 1 ? 15000 : 10000; },
    title: ['Borrowed money', 'उधार का पैसा', 'उसना पैसा', 'ઉધારના પૈસા'],
    intro: ['You have ₹10,000 of pretend money. A trading app offers to lend you four times more, so you can hold shares worth ₹50,000. Do you take it?',
      'आपके पास ₹10,000 नकली पैसे हैं। एक ट्रेडिंग ऐप चार गुना और उधार देने को तैयार है, जिससे आप ₹50,000 के शेयर रख सकते हैं। क्या आप लेंगे?',
      'तुमच्याकडे ₹10,000 खोटे पैसे आहेत. एक ट्रेडिंग अॅप चारपट आणखी उसने द्यायला तयार आहे, म्हणजे तुम्ही ₹50,000 चे शेअर्स ठेवू शकता. तुम्ही घ्याल का?',
      'તમારી પાસે ₹10,000 નકલી પૈસા છે. એક ટ્રેડિંગ ઍપ ચાર ગણા વધુ ઉધાર આપવા તૈયાર છે, જેથી તમે ₹50,000 ના શેર રાખી શકો. તમે લેશો?'],
    choices: [
      ['Use only my own ₹10,000', 'सिर्फ़ अपने ₹10,000 लगाऊँगा', 'फक्त स्वतःचे ₹10,000 लावेन', 'ફક્ત પોતાના ₹10,000 મૂકીશ'],
      ['Borrow and hold ₹50,000 of shares', 'उधार लेकर ₹50,000 के शेयर रखूँगा', 'उसने घेऊन ₹50,000 चे शेअर्स ठेवेन', 'ઉધાર લઈ ₹50,000 ના શેર રાખીશ']],
    decide: [null, {
      ask: ['Margin call. The price fell 12% and ₹6,000 of your ₹10,000 is gone. The broker wants ₹5,000 more today, or it will sell your shares now.',
        'मार्जिन कॉल। दाम 12% गिरा और आपके ₹10,000 में से ₹6,000 डूब गए। ब्रोकर को आज ₹5,000 और चाहिए, वरना वह अभी आपके शेयर बेच देगा।',
        'मार्जिन कॉल. भाव 12% घसरला आणि तुमच्या ₹10,000 पैकी ₹6,000 गेले. ब्रोकरला आज आणखी ₹5,000 हवेत, नाहीतर तो आत्ताच तुमचे शेअर्स विकेल.',
        'માર્જિન કૉલ. ભાવ 12% ઘટ્યો અને તમારા ₹10,000 માંથી ₹6,000 ગયા. બ્રોકરને આજે વધુ ₹5,000 જોઈએ છે, નહીં તો તે હમણાં જ તમારા શેર વેચશે.'],
      opts: [['Add nothing', 'और पैसा नहीं डालूँगा', 'आणखी पैसे टाकणार नाही', 'વધુ પૈસા નહીં નાખું'], ['Add ₹5,000 more', '₹5,000 और डालूँगा', 'आणखी ₹5,000 टाकेन', 'વધુ ₹5,000 નાખીશ']],
    }],
    why: ['The share price was the same in both choices: it fell, then recovered. With only your own money you could wait, and you ended slightly up. With borrowed money every 1% fall cost you 5%, and the broker closed your position before the recovery came. Adding more money only gave the fall more to take. Borrowing takes away your ability to wait.',
      'दोनों विकल्पों में शेयर का दाम एक जैसा था: गिरा, फिर सँभल गया। सिर्फ़ अपने पैसे से आप इंतज़ार कर सके और अंत में थोड़े फ़ायदे में रहे। उधार के पैसे से हर 1% गिरावट पर आपका 5% गया, और सुधार आने से पहले ही ब्रोकर ने आपका सौदा बंद कर दिया। और पैसा डालने से गिरावट को बस और पैसा मिल गया। उधार आपसे इंतज़ार करने की ताकत छीन लेता है।',
      'दोन्ही पर्यायांत शेअरचा भाव सारखाच होता: घसरला, मग सावरला. फक्त स्वतःच्या पैशाने तुम्ही वाट पाहू शकलात आणि शेवटी थोड्या नफ्यात राहिलात. उसन्या पैशाने प्रत्येक 1% घसरणीत तुमचे 5% गेले, आणि भाव सावरण्याआधीच ब्रोकरने तुमचा व्यवहार बंद केला. आणखी पैसे टाकल्याने घसरणीला फक्त आणखी पैसे मिळाले. उसने पैसे तुमची वाट पाहण्याची ताकद हिरावून घेतात.',
      'બંને વિકલ્પમાં શેરનો ભાવ સરખો હતો: ઘટ્યો, પછી સુધર્યો. ફક્ત પોતાના પૈસાથી તમે રાહ જોઈ શક્યા અને અંતે થોડા નફામાં રહ્યા. ઉધારના પૈસાથી દરેક 1% ઘટાડે તમારા 5% ગયા, અને સુધારો આવે તે પહેલાં જ બ્રોકરે તમારો સોદો બંધ કર્યો. વધુ પૈસા નાખવાથી ઘટાડાને બસ વધુ પૈસા મળ્યા. ઉધાર તમારી રાહ જોવાની શક્તિ છીનવી લે છે.'],
  },
  {
    id: 'tip', lesson: 'registered-adviser', cash: 10000, unit: 'day', at: 4,
    p: [42, 48, 52, 50, 38, 27, 19, 15, 13, 12, 12],
    get n() { return this.p.length; },
    value(c, d, i) { return c === 1 ? this.cash : this.cash * frozen(this.p, d, this.at, i) / this.p[0]; },
    invested() { return this.cash; },
    title: ['The hot tip', 'पक्की टिप', 'खात्रीची टिप', 'પાક્કી ટિપ'],
    intro: ['A message arrives in a group: "This small company\'s share has doubled in two weeks and will double again. Buy today, before it is too late!" You have ₹10,000 of pretend money.',
      'एक ग्रुप में संदेश आता है: "इस छोटी कंपनी का शेयर दो हफ़्तों में दोगुना हुआ है और फिर दोगुना होगा। देर होने से पहले आज ही खरीदो!" आपके पास ₹10,000 नकली पैसे हैं।',
      'एका ग्रुपमध्ये संदेश येतो: "या छोट्या कंपनीचा शेअर दोन आठवड्यांत दुप्पट झाला आहे आणि पुन्हा दुप्पट होईल. उशीर होण्याआधी आजच घ्या!" तुमच्याकडे ₹10,000 खोटे पैसे आहेत.',
      'એક ગ્રૂપમાં સંદેશ આવે છે: "આ નાની કંપનીનો શેર બે અઠવાડિયાંમાં બમણો થયો છે અને ફરી બમણો થશે. મોડું થાય તે પહેલાં આજે જ ખરીદો!" તમારી પાસે ₹10,000 નકલી પૈસા છે.'],
    choices: [
      ['Buy with all ₹10,000', 'पूरे ₹10,000 से खरीद लूँगा', 'सगळ्या ₹10,000 ने खरेदी करेन', 'પૂરા ₹10,000 થી ખરીદીશ'],
      ['Ignore the message', 'संदेश को अनदेखा करूँगा', 'संदेशाकडे दुर्लक्ष करेन', 'સંદેશને અવગણીશ']],
    decide: [{
      ask: ['The price jumped and is now falling fast. You are down about 10%. The group says: "Hold! It will come back."',
        'दाम उछला और अब तेज़ी से गिर रहा है। आप करीब 10% घाटे में हैं। ग्रुप कहता है: "रुको! वापस आएगा।"',
        'भाव उसळला आणि आता वेगाने घसरत आहे. तुम्ही सुमारे 10% तोट्यात आहात. ग्रुप म्हणतो: "थांबा! परत येईल."',
        'ભાવ ઊછળ્યો અને હવે ઝડપથી ઘટે છે. તમે આશરે 10% ખોટમાં છો. ગ્રૂપ કહે છે: "રાહ જુઓ! પાછો આવશે."'],
      opts: [['Hold, as the group says', 'रुकूँगा, जैसा ग्रुप कहता है', 'थांबेन, ग्रुप म्हणतो तसे', 'રાહ જોઈશ, ગ્રૂપ કહે છે તેમ'], ['Sell at a loss', 'घाटे में बेच दूँगा', 'तोट्यात विकेन', 'ખોટમાં વેચી દઈશ']],
    }, null],
    why: ['The price had already doubled before the message reached you. The people behind the group bought early and cheap; they needed buyers like you so that they could sell. Once they sold, the price collapsed. Hurry ("buy today") and certainty ("sure-shot") are the signs of this trick. Only SEBI-registered advisers are allowed to give investment advice, and they never promise returns.',
      'संदेश आप तक पहुँचने से पहले ही दाम दोगुना हो चुका था। ग्रुप चलाने वालों ने पहले सस्ते में खरीदा था; उन्हें अपने शेयर बेचने के लिए आप जैसे खरीदार चाहिए थे। उनके बेचते ही दाम धड़ाम हो गया। जल्दबाज़ी ("आज ही खरीदो") और पक्कापन ("पक्की टिप") इस चाल की निशानी हैं। निवेश की सलाह सिर्फ़ SEBI-पंजीकृत सलाहकार दे सकते हैं, और वे कभी रिटर्न का वादा नहीं करते।',
      'संदेश तुमच्यापर्यंत पोहोचण्याआधीच भाव दुप्पट झाला होता. ग्रुप चालवणाऱ्यांनी आधी स्वस्तात खरेदी केली होती; त्यांना स्वतःचे शेअर्स विकण्यासाठी तुमच्यासारखे खरेदीदार हवे होते. त्यांनी विकताच भाव कोसळला. घाई ("आजच घ्या") आणि खात्री ("खात्रीची टिप") ही या युक्तीची लक्षणे आहेत. गुंतवणुकीचा सल्ला फक्त SEBI-नोंदणीकृत सल्लागार देऊ शकतात, आणि ते कधीच परताव्याचे आश्वासन देत नाहीत.',
      'સંદેશ તમારા સુધી પહોંચે તે પહેલાં જ ભાવ બમણો થઈ ગયો હતો. ગ્રૂપ ચલાવનારાઓએ પહેલાં સસ્તામાં ખરીદ્યું હતું; તેમને પોતાના શેર વેચવા તમારા જેવા ખરીદનાર જોઈતા હતા. તેમણે વેચતાં જ ભાવ તૂટી પડ્યો. ઉતાવળ ("આજે જ ખરીદો") અને ખાતરી ("પાક્કી ટિપ") આ ચાલની નિશાની છે. રોકાણની સલાહ ફક્ત SEBI-નોંધાયેલા સલાહકાર આપી શકે, અને તેઓ ક્યારેય વળતરનું વચન આપતા નથી.'],
  },
  {
    id: 'monthly', lesson: 'sip', cash: 12000, unit: 'month', at: 5,
    p: [100, 96, 90, 83, 76, 70, 72, 78, 84, 90, 95, 98],
    get n() { return this.p.length; },
    value(c, d, i) {
      if (c === 0) return 120 * frozen(this.p, d, this.at, i);
      const last = d === 1 ? Math.min(i, this.at) : i; // "stop" keeps what was bought and leaves the rest as cash
      let units = 0;
      for (let k = 0; k <= last; k++) units += 1000 / this.p[k];
      return this.cash - 1000 * (last + 1) + units * this.p[i];
    },
    invested() { return this.cash; },
    title: ['The monthly habit', 'हर महीने की आदत', 'दर महिन्याची सवय', 'દર મહિનાની ટેવ'],
    intro: ['You have ₹12,000 of pretend money to put in a mutual fund this year. Nobody knows which way the market will go. How do you invest it?',
      'इस साल म्यूचुअल फंड में लगाने के लिए आपके पास ₹12,000 नकली पैसे हैं। कोई नहीं जानता कि बाज़ार किधर जाएगा। आप कैसे लगाएँगे?',
      'या वर्षी म्युच्युअल फंडात गुंतवायला तुमच्याकडे ₹12,000 खोटे पैसे आहेत. बाजार कोणत्या दिशेने जाईल हे कोणालाच माहीत नाही. तुम्ही कसे गुंतवाल?',
      'આ વર્ષે મ્યુચ્યુઅલ ફંડમાં રોકવા તમારી પાસે ₹12,000 નકલી પૈસા છે. બજાર કઈ તરફ જશે તે કોઈ જાણતું નથી. તમે કેવી રીતે રોકશો?'],
    choices: [
      ['All ₹12,000 at once, today', 'पूरे ₹12,000 आज ही, एक साथ', 'सगळे ₹12,000 आजच, एकदम', 'પૂરા ₹12,000 આજે જ, એકસાથે'],
      ['₹1,000 every month', 'हर महीने ₹1,000', 'दर महिन्याला ₹1,000', 'દર મહિને ₹1,000']],
    decide: [{
      ask: ['Half the year is gone and the fund is down 30%. What now?', 'आधा साल बीत गया और फंड 30% नीचे है। अब क्या करेंगे?', 'अर्धे वर्ष गेले आणि फंड 30% खाली आहे. आता काय कराल?', 'અડધું વર્ષ ગયું અને ફંડ 30% નીચે છે. હવે શું કરશો?'],
      opts: [['Stay invested', 'निवेश में बने रहें', 'गुंतवणूक तशीच ठेवा', 'રોકાણ ચાલુ રાખો'], ['Sell everything now', 'अभी सब बेच दें', 'आत्ताच सगळे विका', 'હમણાં બધું વેચી દો']],
    }, {
      ask: ['Half the year is gone and the fund is down 30%. Do you keep investing every month?', 'आधा साल बीत गया और फंड 30% नीचे है। क्या हर महीने लगाना जारी रखेंगे?', 'अर्धे वर्ष गेले आणि फंड 30% खाली आहे. दर महिन्याला गुंतवणे सुरू ठेवाल का?', 'અડધું વર્ષ ગયું અને ફંડ 30% નીચે છે. દર મહિને રોકવાનું ચાલુ રાખશો?'],
      opts: [['Continue every month', 'हर महीने जारी रखूँगा', 'दर महिन्याला सुरू ठेवेन', 'દર મહિને ચાલુ રાખીશ'], ['Stop investing', 'लगाना बंद कर दूँगा', 'गुंतवणे थांबवेन', 'રોકવાનું બંધ કરીશ']],
    }],
    why: ['When prices fell, the fixed monthly amount bought more units, so the average cost came down. The lump sum bought everything at the high price. This helped because the market went down and then up; in a market that only rises, investing at once would have done better. A monthly plan removes the need to guess the right time. It does not guarantee a profit.',
      'जब दाम गिरे, तो तय मासिक रकम से ज़्यादा यूनिट मिलीं, इसलिए औसत लागत घट गई। एकमुश्त रकम से सब कुछ ऊँचे दाम पर खरीदा गया। इससे फ़ायदा इसलिए हुआ क्योंकि बाज़ार पहले गिरा और फिर चढ़ा; जो बाज़ार सिर्फ़ चढ़ता है, उसमें एक साथ लगाना बेहतर रहता। मासिक योजना सही समय का अंदाज़ा लगाने की ज़रूरत हटा देती है। यह मुनाफ़े की गारंटी नहीं देती।',
      'भाव घसरले तेव्हा ठराविक मासिक रकमेत जास्त युनिट्स मिळाली, त्यामुळे सरासरी खर्च कमी झाला. एकरकमी पैशाने सगळे चढ्या भावात घेतले गेले. याचा फायदा झाला कारण बाजार आधी घसरला आणि मग चढला; फक्त चढणाऱ्या बाजारात एकदम गुंतवणे चांगले ठरले असते. मासिक योजनेमुळे योग्य वेळेचा अंदाज बांधावा लागत नाही. ती नफ्याची हमी देत नाही.',
      'ભાવ ઘટ્યા ત્યારે નક્કી માસિક રકમથી વધુ યુનિટ મળ્યા, તેથી સરેરાશ ખર્ચ ઘટ્યો. એકસાથે રકમથી બધું ઊંચા ભાવે ખરીદાયું. આનો ફાયદો થયો કારણ કે બજાર પહેલાં ઘટ્યું અને પછી વધ્યું; ફક્ત વધતા બજારમાં એકસાથે રોકવું વધુ સારું રહેત. માસિક યોજનાથી સાચા સમયનો અંદાજ લગાવવો પડતો નથી. તે નફાની ગેરંટી આપતી નથી.'],
  },
  {
    id: 'expiry', lesson: 'fno', cash: 10000, unit: 'day', at: 4,
    p: [100, 99, 100, 98, 97, 98, 97, 96, 97, 98, 99],
    opt: [10000, 8200, 8600, 6100, 4400, 4300, 2900, 1700, 1200, 500, 0],
    get n() { return this.p.length; },
    value(c, d, i) { return c === 1 ? 100 * this.p[i] : frozen(this.opt, d, this.at, i); },
    invested() { return this.cash; },
    title: ['The weekly bet', 'हफ़्ते भर का दाँव', 'आठवड्याची पैज', 'અઠવાડિયાનો દાવ'],
    intro: ['A video says: "Turn ₹10,000 into ₹50,000 this week with options!" You think a share will rise within ten days. You have ₹10,000 of pretend money.',
      'एक वीडियो कहता है: "ऑप्शंस से इस हफ़्ते ₹10,000 को ₹50,000 बनाइए!" आपको लगता है कि एक शेयर दस दिन में चढ़ेगा। आपके पास ₹10,000 नकली पैसे हैं।',
      'एक व्हिडिओ म्हणतो: "ऑप्शन्सने या आठवड्यात ₹10,000 चे ₹50,000 करा!" तुम्हाला वाटते की एक शेअर दहा दिवसांत चढेल. तुमच्याकडे ₹10,000 खोटे पैसे आहेत.',
      'એક વીડિયો કહે છે: "ઑપ્શન્સથી આ અઠવાડિયે ₹10,000 ના ₹50,000 કરો!" તમને લાગે છે કે એક શેર દસ દિવસમાં વધશે. તમારી પાસે ₹10,000 નકલી પૈસા છે.'],
    choices: [
      ['Buy an option (a bet that ends in 10 days)', 'ऑप्शन खरीदूँगा (10 दिन में खत्म होने वाला दाँव)', 'ऑप्शन घेईन (10 दिवसांत संपणारी पैज)', 'ઑપ્શન ખરીદીશ (10 દિવસમાં પૂરો થતો દાવ)'],
      ['Buy the share itself', 'सीधे शेयर खरीदूँगा', 'थेट शेअर घेईन', 'સીધો શેર ખરીદીશ']],
    decide: [{
      ask: ['Four days in, the share has barely moved, but your option has already lost more than half its value. Six days are left.',
        'चार दिन बीते, शेयर लगभग वहीं है, पर आपका ऑप्शन आधे से ज़्यादा घट चुका है। छह दिन बचे हैं।',
        'चार दिवस झाले, शेअर जवळपास तिथेच आहे, पण तुमचा ऑप्शन निम्म्याहून जास्त घटला आहे. सहा दिवस उरले आहेत.',
        'ચાર દિવસ થયા, શેર લગભગ ત્યાં જ છે, પણ તમારો ઑપ્શન અડધાથી વધુ ઘટી ગયો છે. છ દિવસ બાકી છે.'],
      opts: [['Hold till the last day', 'आख़िरी दिन तक रखूँगा', 'शेवटच्या दिवसापर्यंत ठेवेन', 'છેલ્લા દિવસ સુધી રાખીશ'], ['Exit now and take the loss', 'अभी निकलकर घाटा मान लूँगा', 'आत्ताच बाहेर पडून तोटा स्वीकारेन', 'હમણાં નીકળી ખોટ સ્વીકારીશ']],
    }, null],
    why: ['An option is a bet with a deadline. The share barely moved, so the share buyer lost almost nothing and can keep waiting. The option lost value every single day and became zero on the last day, even though the share never crashed. To win, an option buyer must be right about the direction, the size of the move and the timing, all at once.',
      'ऑप्शन समय-सीमा वाला दाँव है। शेयर लगभग नहीं हिला, इसलिए शेयर खरीदने वाले का करीब कुछ नहीं गया और वह इंतज़ार कर सकता है। ऑप्शन की कीमत हर दिन घटी और आख़िरी दिन शून्य हो गई, जबकि शेयर कभी धड़ाम नहीं हुआ। जीतने के लिए ऑप्शन खरीदने वाले को दिशा, चाल के आकार और समय, तीनों में एक साथ सही होना पड़ता है।',
      'ऑप्शन ही मुदत असलेली पैज आहे. शेअर जवळपास हललाच नाही, त्यामुळे शेअर घेणाऱ्याचे जवळपास काहीच गेले नाही आणि तो वाट पाहू शकतो. ऑप्शनचे मूल्य रोज घटले आणि शेवटच्या दिवशी शून्य झाले, शेअर मात्र कधीच कोसळला नाही. जिंकण्यासाठी ऑप्शन घेणाऱ्याला दिशा, हालचालीचा आकार आणि वेळ, तिन्ही एकाच वेळी बरोबर असावे लागते.',
      'ઑપ્શન સમયમર્યાદાવાળો દાવ છે. શેર લગભગ હલ્યો નહીં, તેથી શેર ખરીદનારનું લગભગ કશું ગયું નહીં અને તે રાહ જોઈ શકે. ઑપ્શનનું મૂલ્ય રોજ ઘટ્યું અને છેલ્લા દિવસે શૂન્ય થયું, જોકે શેર ક્યારેય તૂટ્યો નહીં. જીતવા ઑપ્શન ખરીદનારે દિશા, ચાલનું કદ અને સમય, ત્રણેયમાં એકસાથે સાચા પડવું પડે.'],
  },
  {
    id: 'ponzi', lesson: 'ponzi', cash: 10000, unit: 'month', at: 5,
    get n() { return 13; },
    value(c, d, i) {
      if (c === 1) return 10000 * (1 + 0.065 * i / 12);   // bank deposit at 6.5% a year
      if (d !== 1 || i <= this.at) return i <= 7 ? 10000 + 300 * i : 2100;     // collapses in month 8
      return i <= 7 ? 20000 + 1500 + 600 * (i - this.at) : 2700;
    },
    invested(c, d) { return c === 0 && d === 1 ? 20000 : 10000; },
    title: ['The guaranteed scheme', 'गारंटी वाली स्कीम', 'हमीची योजना', 'ગેરંટીવાળી સ્કીમ'],
    intro: ['A neighbour has joined a scheme that pays 3% every month, "guaranteed, no risk". He shows you the money arriving in his account. You have ₹10,000 of pretend money.',
      'एक पड़ोसी ऐसी स्कीम में है जो हर महीने 3% देती है, "गारंटी के साथ, बिना जोखिम"। वह अपने खाते में आता पैसा दिखाता है। आपके पास ₹10,000 नकली पैसे हैं।',
      'एक शेजारी अशा योजनेत आहे जी दर महिन्याला 3% देते, "हमीसह, जोखमीशिवाय". तो त्याच्या खात्यात येणारे पैसे दाखवतो. तुमच्याकडे ₹10,000 खोटे पैसे आहेत.',
      'એક પાડોશી એવી સ્કીમમાં છે જે દર મહિને 3% આપે છે, "ગેરંટી સાથે, જોખમ વગર". તે પોતાના ખાતામાં આવતા પૈસા બતાવે છે. તમારી પાસે ₹10,000 નકલી પૈસા છે.'],
    choices: [
      ['Put ₹10,000 in the scheme', 'स्कीम में ₹10,000 लगाऊँगा', 'योजनेत ₹10,000 टाकेन', 'સ્કીમમાં ₹10,000 મૂકીશ'],
      ['Keep it in a bank fixed deposit', 'बैंक की सावधि जमा में रखूँगा', 'बँकेच्या मुदत ठेवीत ठेवेन', 'બેંકની ફિક્સ્ડ ડિપોઝિટમાં રાખીશ']],
    decide: [{
      ask: ['Five payouts have arrived on time. The agent says: "See, it works. Add more, and bring your family in."',
        'पाँच भुगतान समय पर आए हैं। एजेंट कहता है: "देखा, चलता है। और पैसा डालिए, और परिवार को भी जोड़िए।"',
        'पाच हप्ते वेळेवर आले आहेत. एजंट म्हणतो: "पाहिलंत, चालतं. आणखी पैसे टाका, आणि कुटुंबालाही आणा."',
        'પાંચ ચુકવણી સમયસર આવી છે. એજન્ટ કહે છે: "જોયું, ચાલે છે. વધુ પૈસા નાખો, અને પરિવારને પણ લાવો."'],
      opts: [['Leave it as it is', 'जैसा है वैसा रहने दूँगा', 'जसे आहे तसे ठेवेन', 'જેમ છે તેમ રહેવા દઈશ'], ['Add ₹10,000 more', '₹10,000 और डालूँगा', 'आणखी ₹10,000 टाकेन', 'વધુ ₹10,000 નાખીશ']],
    }, null],
    why: ['There was no business behind the scheme. The monthly payouts were other people\'s deposits, paid out to build trust. When new money stopped coming, it shut down and the organisers vanished with the rest. On-time payouts are not proof of safety; they are how such schemes grow. 3% a month is 36% a year, which no safe product can pay.',
      'स्कीम के पीछे कोई कारोबार नहीं था। मासिक भुगतान दूसरे लोगों की जमा रकम थे, जो भरोसा जमाने के लिए दिए गए। नया पैसा आना बंद हुआ तो स्कीम बंद हो गई और चलाने वाले बाकी पैसा लेकर गायब हो गए। समय पर भुगतान सुरक्षा का सबूत नहीं है; ऐसी स्कीमें इसी से फैलती हैं। महीने का 3% यानी साल का 36%, जो कोई सुरक्षित साधन नहीं दे सकता।',
      'योजनेमागे कोणताही व्यवसाय नव्हता. मासिक हप्ते म्हणजे इतर लोकांच्या ठेवी होत्या, विश्वास बसवण्यासाठी दिलेल्या. नवा पैसा येणे थांबले तेव्हा योजना बंद झाली आणि चालवणारे उरलेले पैसे घेऊन गायब झाले. वेळेवर हप्ते हा सुरक्षिततेचा पुरावा नाही; अशा योजना त्यावरच वाढतात. महिन्याला 3% म्हणजे वर्षाला 36%, जे कोणतेही सुरक्षित साधन देऊ शकत नाही.',
      'સ્કીમ પાછળ કોઈ ધંધો નહોતો. માસિક ચુકવણી બીજા લોકોની થાપણ હતી, ભરોસો બેસાડવા અપાયેલી. નવા પૈસા આવતા બંધ થયા ત્યારે સ્કીમ બંધ થઈ અને ચલાવનારા બાકીના પૈસા લઈ ગાયબ થઈ ગયા. સમયસર ચુકવણી સલામતીનો પુરાવો નથી; આવી સ્કીમ એનાથી જ ફેલાય છે. મહિને 3% એટલે વર્ષે 36%, જે કોઈ સલામત સાધન આપી ન શકે.'],
  },
  {
    id: 'inflation', lesson: 'inflation', cash: 10000, unit: 'year', at: 0,
    get n() { return 11; },
    value(c, d, i) { return c === 0 ? 10000 / 1.06 ** i : 10000 * (1.07 / 1.06) ** i; },
    invested() { return this.cash; },
    measure: ['What it can buy, in today\'s rupees', 'यह कितना खरीद सकता है, आज के रुपयों में', 'याने किती खरेदी करता येईल, आजच्या रुपयांत', 'આનાથી કેટલું ખરીદાય, આજના રૂપિયામાં'],
    title: ['Cash under the mattress', 'गद्दे के नीचे रखा नकद', 'गादीखाली ठेवलेली रोकड', 'ગાદલા નીચે રાખેલી રોકડ'],
    intro: ['You have ₹10,000 that you will not need for ten years. Prices rise about 6% every year. What do you do with it?',
      'आपके पास ₹10,000 हैं जिनकी दस साल तक ज़रूरत नहीं पड़ेगी। दाम हर साल करीब 6% बढ़ते हैं। आप इसका क्या करेंगे?',
      'तुमच्याकडे ₹10,000 आहेत ज्यांची दहा वर्षे गरज पडणार नाही. किमती दरवर्षी सुमारे 6% वाढतात. तुम्ही याचे काय कराल?',
      'તમારી પાસે ₹10,000 છે જેની દસ વર્ષ જરૂર નહીં પડે. ભાવ દર વર્ષે આશરે 6% વધે છે. તમે આનું શું કરશો?'],
    choices: [
      ['Keep it as cash at home', 'घर पर नकद रखूँगा', 'घरी रोख ठेवेन', 'ઘરે રોકડ રાખીશ'],
      ['Put it in a deposit earning 7% a year', 'सालाना 7% देने वाली जमा में रखूँगा', 'वार्षिक 7% देणाऱ्या ठेवीत ठेवेन', 'વાર્ષિક 7% આપતી થાપણમાં મૂકીશ']],
    decide: [null, null],
    why: ['The notes at home were still ₹10,000, but after ten years they could buy only what about ₹5,600 buys today. Money that earns nothing loses value quietly every year. The deposit earned a little more than prices rose, so it kept its buying power. Being safe from loss is not the same as being safe from rising prices.',
      'घर में रखे नोट अब भी ₹10,000 ही थे, पर दस साल बाद उनसे उतना ही खरीदा जा सकता था जितना आज करीब ₹5,600 से आता है। जो पैसा कुछ नहीं कमाता, वह हर साल चुपचाप घटता है। जमा ने दामों से थोड़ा ज़्यादा कमाया, इसलिए उसकी खरीदने की ताकत बनी रही। घाटे से सुरक्षित होना और महँगाई से सुरक्षित होना एक बात नहीं है।',
      'घरातील नोटा अजूनही ₹10,000 च होत्या, पण दहा वर्षांनंतर त्यांत तेवढेच घेता येत होते जेवढे आज सुमारे ₹5,600 मध्ये येते. जो पैसा काहीच कमावत नाही तो दरवर्षी शांतपणे घटतो. ठेवीने किमतींपेक्षा थोडे जास्त कमावले, म्हणून तिची खरेदीची ताकद टिकली. तोट्यापासून सुरक्षित असणे आणि महागाईपासून सुरक्षित असणे एकच नाही.',
      'ઘરની નોટો હજી ₹10,000 જ હતી, પણ દસ વર્ષ પછી તેનાથી એટલું જ ખરીદી શકાતું જેટલું આજે આશરે ₹5,600 માં આવે. જે પૈસા કશું કમાતા નથી તે દર વર્ષે ચૂપચાપ ઘટે છે. થાપણે ભાવ કરતાં થોડું વધુ કમાવ્યું, તેથી તેની ખરીદશક્તિ ટકી રહી. નુકસાનથી સલામત હોવું અને મોંઘવારીથી સલામત હોવું એક વાત નથી.'],
  },
  {
    id: 'revenge', lesson: 'debt-trap', cash: 10000, unit: 'week', at: 3,
    stop: [6000, 8500, 5200, 1500, 1200, 900, 600, 300, 0],
    more: [6000, 8500, 5200, 1500, -500, -3200, -6800, -9500, -12000],
    get n() { return this.stop.length; },
    value(c, d, i) { return c === 0 ? 6000 : (d === 1 ? this.more : this.stop)[i]; },
    invested() { return this.cash; },
    measure: ['Your money minus what you owe', 'आपका पैसा घटा आपका कर्ज़', 'तुमचे पैसे वजा तुमचे कर्ज', 'તમારા પૈસા બાદ તમારું દેવું'],
    title: ['Winning it back', 'घाटा वापस जीतना', 'तोटा परत जिंकणे', 'ખોટ પાછી જીતવી'],
    intro: ['You started with ₹10,000 and have lost ₹4,000 in trading. You feel you must win it back. A loan app offers ₹20,000 instantly, no questions asked.',
      'आपने ₹10,000 से शुरू किया था और ट्रेडिंग में ₹4,000 गँवा चुके हैं। मन कहता है कि इसे वापस जीतना ही है। एक लोन ऐप बिना सवाल पूछे तुरंत ₹20,000 दे रहा है।',
      'तुम्ही ₹10,000 ने सुरुवात केली आणि ट्रेडिंगमध्ये ₹4,000 गमावले आहेत. मन म्हणते की ते परत जिंकलेच पाहिजेत. एक कर्ज अॅप प्रश्न न विचारता लगेच ₹20,000 देत आहे.',
      'તમે ₹10,000 થી શરૂ કર્યું હતું અને ટ્રેડિંગમાં ₹4,000 ગુમાવ્યા છે. મન કહે છે કે તે પાછા જીતવા જ છે. એક લોન ઍપ પ્રશ્ન પૂછ્યા વગર તરત ₹20,000 આપે છે.'],
    choices: [
      ['Stop and accept the ₹4,000 loss', 'रुककर ₹4,000 का घाटा मान लूँगा', 'थांबून ₹4,000 चा तोटा स्वीकारेन', 'અટકીને ₹4,000 ની ખોટ સ્વીકારીશ'],
      ['Take the ₹20,000 loan and trade bigger', '₹20,000 का लोन लेकर बड़ा दाँव लगाऊँगा', '₹20,000 चे कर्ज घेऊन मोठी पैज लावेन', '₹20,000 ની લોન લઈ મોટો દાવ લગાવીશ']],
    decide: [null, {
      ask: ['After one lucky week, the losses returned. Counting the loan, you are down to ₹1,500. Another app offers ₹10,000 more.',
        'एक अच्छे हफ़्ते के बाद घाटा फिर लौट आया। लोन गिनकर आपके पास ₹1,500 बचे हैं। दूसरा ऐप ₹10,000 और दे रहा है।',
        'एका चांगल्या आठवड्यानंतर तोटा परत आला. कर्ज धरून तुमच्याकडे ₹1,500 उरले आहेत. दुसरे अॅप आणखी ₹10,000 देत आहे.',
        'એક સારા અઠવાડિયા પછી ખોટ પાછી આવી. લોન ગણીને તમારી પાસે ₹1,500 બચ્યા છે. બીજી ઍપ વધુ ₹10,000 આપે છે.'],
      opts: [['Stop trading now', 'अब ट्रेडिंग बंद कर दूँगा', 'आता ट्रेडिंग थांबवेन', 'હવે ટ્રેડિંગ બંધ કરીશ'], ['Borrow ₹10,000 more to recover', 'भरपाई के लिए ₹10,000 और उधार लूँगा', 'भरपाईसाठी आणखी ₹10,000 उसने घेईन', 'ભરપાઈ માટે વધુ ₹10,000 ઉધાર લઈશ']],
    }],
    why: ['After a loss, the urge to win it back quickly is very strong, and it pushes people into bigger and riskier bets. The first lucky week made it feel as if it was working. Borrowed money added interest on top of every loss, so the hole kept growing even after you stopped. Accepting the small loss was the cheapest choice. Never trade with borrowed money or emergency savings.',
      'घाटे के बाद उसे जल्दी वापस जीतने की इच्छा बहुत तेज़ होती है, और यही लोगों को बड़े और ज़्यादा जोखिम वाले दाँव की ओर धकेलती है। पहले अच्छे हफ़्ते से लगा कि तरीका काम कर रहा है। उधार के पैसे पर हर घाटे के ऊपर ब्याज भी चढ़ा, इसलिए रुकने के बाद भी गड्ढा बढ़ता रहा। छोटा घाटा मान लेना सबसे सस्ता रास्ता था। उधार के पैसे या आपातकालीन बचत से कभी ट्रेडिंग न करें।',
      'तोट्यानंतर तो पटकन परत जिंकण्याची इच्छा खूप तीव्र असते, आणि तीच लोकांना मोठ्या आणि जास्त जोखमीच्या पैजांकडे ढकलते. पहिल्या चांगल्या आठवड्यामुळे वाटले की पद्धत चालते आहे. उसन्या पैशावर प्रत्येक तोट्यावर व्याजही चढले, त्यामुळे थांबल्यावरही खड्डा वाढत राहिला. छोटा तोटा स्वीकारणे हाच सर्वात स्वस्त मार्ग होता. उसन्या पैशाने किंवा आपत्कालीन बचतीने कधीही ट्रेडिंग करू नका.',
      'ખોટ પછી તે ઝડપથી પાછી જીતવાની ઇચ્છા બહુ તીવ્ર હોય છે, અને તે જ લોકોને મોટા અને વધુ જોખમી દાવ તરફ ધકેલે છે. પહેલા સારા અઠવાડિયાથી લાગ્યું કે રીત કામ કરે છે. ઉધારના પૈસા પર દરેક ખોટ ઉપર વ્યાજ પણ ચડ્યું, તેથી અટક્યા પછી પણ ખાડો વધતો રહ્યો. નાની ખોટ સ્વીકારવી એ સૌથી સસ્તો રસ્તો હતો. ઉધારના પૈસા કે કટોકટીની બચતથી ક્યારેય ટ્રેડિંગ ન કરો.'],
  },
];

// The formal (textbook) name of what each story teaches, and one real-world fact.
const STORY_INFO = {
  crash: {
    formal: ['Concentration risk and diversification', 'केंद्रीकरण जोखिम और विविधीकरण', 'केंद्रीकरण जोखीम आणि विविधीकरण', 'કેન્દ્રીકરણ જોખમ અને વૈવિધ્યકરણ'],
    fact: ['In 2008 the Indian stock market lost more than half its value in under a year. In March 2020 it fell by about a third within weeks.', '2008 में भारतीय शेयर बाज़ार एक साल से कम में आधे से ज़्यादा गिर गया था। मार्च 2020 में यह कुछ ही हफ़्तों में करीब एक-तिहाई गिरा।', '2008 मध्ये भारतीय शेअर बाजार एका वर्षाच्या आत निम्म्याहून जास्त घसरला होता. मार्च 2020 मध्ये तो काही आठवड्यांत सुमारे एक-तृतीयांश घसरला.', '2008 માં ભારતીય શેર બજાર એક વર્ષથી ઓછા સમયમાં અડધાથી વધુ ઘટ્યું હતું. માર્ચ 2020 માં તે થોડાં અઠવાડિયાંમાં આશરે ત્રીજા ભાગ જેટલું ઘટ્યું.'] },
  leverage: {
    formal: ['Leverage (margin trading) and margin call', 'लीवरेज (मार्जिन ट्रेडिंग) और मार्जिन कॉल', 'लिव्हरेज (मार्जिन ट्रेडिंग) आणि मार्जिन कॉल', 'લિવરેજ (માર્જિન ટ્રેડિંગ) અને માર્જિન કૉલ'],
    fact: ['If you do not meet a margin call, the broker is allowed to sell your shares without asking you again.', 'अगर आप मार्जिन कॉल पूरा नहीं करते, तो ब्रोकर आपसे दोबारा पूछे बिना आपके शेयर बेच सकता है।', 'तुम्ही मार्जिन कॉल पूर्ण केला नाही तर ब्रोकर तुम्हाला पुन्हा न विचारता तुमचे शेअर्स विकू शकतो.', 'તમે માર્જિન કૉલ પૂરો ન કરો તો બ્રોકર તમને ફરી પૂછ્યા વગર તમારા શેર વેચી શકે.'] },
  tip: {
    formal: ['Pump and dump (market manipulation)', 'पंप एंड डंप (बाज़ार में हेरफेर)', 'पंप अँड डंप (बाजारातील हेराफेरी)', 'પંપ ઍન્ડ ડમ્પ (બજારમાં ચાલાકી)'],
    fact: ['SEBI has passed orders against people who ran this trick through YouTube and Telegram channels.', 'SEBI ने उन लोगों के ख़िलाफ़ आदेश दिए हैं जिन्होंने YouTube और Telegram चैनलों से यह चाल चली।', 'SEBI ने अशा लोकांविरुद्ध आदेश दिले आहेत ज्यांनी YouTube आणि Telegram चॅनेलद्वारे ही युक्ती वापरली.', 'SEBI એ એવા લોકો સામે આદેશ આપ્યા છે જેમણે YouTube અને Telegram ચૅનલથી આ ચાલ ચલાવી.'] },
  monthly: {
    formal: ['Systematic Investment Plan (SIP) and rupee cost averaging', 'सिस्टमैटिक इन्वेस्टमेंट प्लान (SIP) और रुपया लागत औसत', 'सिस्टिमॅटिक इन्व्हेस्टमेंट प्लॅन (SIP) आणि रुपया सरासरी खर्च', 'સિસ્ટમેટિક ઇન્વેસ્ટમેન્ટ પ્લાન (SIP) અને રૂપિયા સરેરાશ ખર્ચ'],
    fact: ['Mutual fund returns are never guaranteed. Every scheme carries a risk label, the risk-o-meter, which you can check first.', 'म्यूचुअल फंड के रिटर्न की कभी गारंटी नहीं होती। हर योजना पर जोखिम का लेबल, रिस्क-ओ-मीटर, होता है जिसे पहले देखा जा सकता है।', 'म्युच्युअल फंडाच्या परताव्याची कधीच हमी नसते. प्रत्येक योजनेवर जोखमीचे लेबल, रिस्क-ओ-मीटर, असते जे आधी पाहता येते.', 'મ્યુચ્યુઅલ ફંડના વળતરની ક્યારેય ગેરંટી નથી. દરેક યોજના પર જોખમનું લેબલ, રિસ્ક-ઓ-મીટર, હોય છે જે પહેલાં જોઈ શકાય.'] },
  expiry: {
    formal: ['Options trading (F&O): time decay and expiry', 'ऑप्शंस ट्रेडिंग (F&O): समय के साथ घटती कीमत और एक्सपायरी', 'ऑप्शन्स ट्रेडिंग (F&O): काळानुसार घटणारे मूल्य आणि एक्सपायरी', 'ઑપ્શન્સ ટ્રેડિંગ (F&O): સમય સાથે ઘટતું મૂલ્ય અને એક્સપાયરી'],
    fact: ['SEBI\'s own studies found that about 9 out of 10 individual traders in equity F&O lose money.', 'SEBI के अपने अध्ययनों में पाया गया कि इक्विटी F&O में लगभग 10 में से 9 व्यक्तिगत ट्रेडर पैसा गँवाते हैं।', 'SEBI च्या स्वतःच्या अभ्यासात आढळले की इक्विटी F&O मध्ये सुमारे 10 पैकी 9 वैयक्तिक ट्रेडर्स पैसे गमावतात.', 'SEBI ના પોતાના અભ્યાસમાં જણાયું કે ઇક્વિટી F&O માં આશરે 10 માંથી 9 વ્યક્તિગત ટ્રેડર પૈસા ગુમાવે છે.'] },
  ponzi: {
    formal: ['Ponzi scheme (unregistered deposit scheme)', 'पोंज़ी स्कीम (बिना पंजीकरण की जमा योजना)', 'पॉन्झी योजना (नोंदणी नसलेली ठेव योजना)', 'પોન્ઝી સ્કીમ (નોંધણી વગરની થાપણ યોજના)'],
    fact: ['Large Ponzi collapses in India have wiped out the savings of lakhs of families. Check that a scheme is registered with SEBI or RBI before putting money in.', 'भारत में बड़ी पोंज़ी स्कीमों के डूबने से लाखों परिवारों की बचत खत्म हुई है। पैसा लगाने से पहले जाँचिए कि स्कीम SEBI या RBI में पंजीकृत है।', 'भारतात मोठ्या पॉन्झी योजना कोसळल्याने लाखो कुटुंबांची बचत संपली आहे. पैसे टाकण्याआधी योजना SEBI किंवा RBI कडे नोंदणीकृत आहे का ते तपासा.', 'ભારતમાં મોટી પોન્ઝી સ્કીમો પડી ભાંગતાં લાખો પરિવારોની બચત ખતમ થઈ છે. પૈસા મૂકતાં પહેલાં તપાસો કે સ્કીમ SEBI કે RBI માં નોંધાયેલી છે.'] },
  inflation: {
    formal: ['Inflation risk (purchasing power risk)', 'महँगाई जोखिम (क्रय शक्ति जोखिम)', 'महागाई जोखीम (क्रयशक्ती जोखीम)', 'મોંઘવારી જોખમ (ખરીદશક્તિ જોખમ)'],
    fact: ['At 6% inflation, prices double in about 12 years (72 ÷ 6).', '6% महँगाई पर दाम लगभग 12 साल में दोगुने हो जाते हैं (72 ÷ 6)।', '6% महागाईत किमती सुमारे 12 वर्षांत दुप्पट होतात (72 ÷ 6).', '6% મોંઘવારીએ ભાવ આશરે 12 વર્ષમાં બમણા થાય છે (72 ÷ 6).'] },
  revenge: {
    formal: ['Revenge trading and the debt trap', 'रिवेंज ट्रेडिंग और कर्ज़ का जाल', 'रिव्हेंज ट्रेडिंग आणि कर्जाचा सापळा', 'રિવેન્જ ટ્રેડિંગ અને દેવાની જાળ'],
    fact: ['RBI has warned the public about unauthorised instant-loan apps that charge very high interest and use harsh recovery methods.', 'RBI ने जनता को उन अनधिकृत इंस्टेंट-लोन ऐप के बारे में चेताया है जो बहुत ऊँचा ब्याज लेते हैं और वसूली के कठोर तरीके अपनाते हैं।', 'RBI ने जनतेला अशा अनधिकृत इन्स्टंट-लोन अॅप्सबद्दल सावध केले आहे जे खूप जास्त व्याज घेतात आणि वसुलीच्या कठोर पद्धती वापरतात.', 'RBI એ જનતાને એવી અનધિકૃત ઇન્સ્ટન્ટ-લોન ઍપ વિશે ચેતવી છે જે બહુ ઊંચું વ્યાજ લે છે અને વસૂલાતની કડક રીતો વાપરે છે.'] },
};
for (const sc of SCENARIOS) Object.assign(sc, STORY_INFO[sc.id]);
const L = a => a[ORDER.indexOf(lang)];
const simFor = lessonId => SCENARIOS.find(x => x.lesson === lessonId);

let sim = null; // { id, c, d, i, phase: 'setup' | 'run' | 'ask' | 'end' }
let simTimer = null;
const stopSim = () => { clearInterval(simTimer); simTimer = null; };
LEAVE.push(stopSim);

function runSim(sc) {
  stopSim();
  sim.phase = 'run';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const step = () => {
    const stopAt = sim.d === null && sc.decide[sim.c] ? sc.at : sc.n - 1;
    if (reduced) sim.i = stopAt; else if (sim.i < stopAt) sim.i++;
    if (sim.i >= stopAt) {
      stopSim();
      sim.phase = stopAt === sc.n - 1 ? 'end' : 'ask';
    }
    render();
  };
  if (reduced) step(); else { simTimer = setInterval(step, 300); render(); }
}

// Two-series line chart: the user's choice (solid) and, once the story ends, the other choice (dashed).
function simChart(sc) {
  const W = 328, H = 180, m = { l: 10, r: 10, t: 16, b: 10 };
  const all = [];
  for (const c of [0, 1]) for (const d of [0, 1]) for (let i = 0; i < sc.n; i++) all.push(sc.value(c, d, i));
  const mn = Math.min(...all, sc.cash), mx = Math.max(...all, sc.cash), pad = (mx - mn) * 0.08 || 1;
  const lo = mn - pad, hi = mx + pad;
  const x = i => m.l + (W - m.l - m.r) * i / (sc.n - 1);
  const y = v => m.t + (H - m.t - m.b) * (1 - (v - lo) / (hi - lo));
  const path = (c, d, upto) => Array.from({ length: upto + 1 }, (_, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(sc.value(c, d, i)).toFixed(1)}`).join('');
  const end = sim.phase === 'end';
  const mine = sc.value(sim.c, sim.d, sim.i), oc = 1 - sim.c, theirs = sc.value(oc, 0, sc.n - 1);
  // Keep the two end labels from overlapping.
  let ym = y(mine) - 8, yo = y(theirs) - 8;
  if (end && Math.abs(ym - yo) < 14) { if (ym <= yo) yo = ym + 14; else ym = yo + 14; }
  const lab = (yy, v) => `<text x="${W - m.r - 8}" y="${Math.max(11, Math.min(H - 3, yy)).toFixed(1)}" text-anchor="end" class="cl">${rupee(v)}</text>`;
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(s('nowHave'))} ${rupee(mine)}">
    <line x1="${m.l}" x2="${W - m.r}" y1="${y(sc.cash)}" y2="${y(sc.cash)}" class="cg"/>
    ${end ? `<path d="${path(oc, 0, sc.n - 1)}" class="c2"/><circle cx="${x(sc.n - 1)}" cy="${y(theirs)}" r="4.5" class="d2"/>${lab(yo, theirs)}` : ''}
    <path d="${path(sim.c, sim.d, sim.i)}" class="c1"/><circle cx="${x(sim.i)}" cy="${y(mine)}" r="4.5" class="d1"/>
    ${end ? lab(ym, mine) : ''}
  </svg>
  <div class="legend"><span><i class="k1"></i>${esc(s('you'))}</span>${end ? `<span><i class="k2"></i>${esc(s('other'))}</span>` : ''}<span><i class="k0"></i>${esc(s('start'))} ${rupee(sc.cash)}</span></div>`;
}

function simTable(sc) {
  const oc = 1 - sim.c;
  return `<details><summary>${esc(s('numbers'))}</summary><div><table>
    <tr><th>${esc(s(sc.unit))}</th><th>${esc(s('you'))}</th><th>${esc(s('other'))}</th></tr>
    ${Array.from({ length: sc.n }, (_, i) => `<tr><td>${i}</td><td>${rupee(sc.value(sim.c, sim.d, i))}</td><td>${rupee(sc.value(oc, 0, i))}</td></tr>`).join('')}
  </table></div></details>`;
}

function viewSimList() {
  return `<p>${esc(s('simIntro'))}</p>
    <ul class="list">${SCENARIOS.map(sc => `<li><a class="row" href="#/sim/${sc.id}">
      <span class="n" aria-hidden="true">▶</span><span>${esc(L(sc.title))}<br><span class="small muted">${esc(L(sc.formal))}</span></span></a></li>`).join('')}</ul>
    <p class="small muted">${esc(s('madeUp'))}</p>${resources()}`;
}

function viewSim(r) {
  const sc = SCENARIOS.find(x => x.id === r.id);
  if (!sc) { sim = null; return viewSimList(); }
  if (!sim || sim.id !== sc.id) { stopSim(); sim = { id: sc.id, c: null, d: null, i: 0, phase: 'setup' }; }
  const head = `<h1>${esc(L(sc.title))}</h1><p class="small muted">${esc(s('formalLbl'))}: <strong>${esc(L(sc.formal))}</strong></p>`;
  if (sim.phase === 'setup') {
    return `${head}<div class="narr" id="narr"></div><p>${esc(L(sc.intro))}</p>
      <div class="opts">${sc.choices.map((c, i) => `<button class="opt" data-act="simChoose" data-i="${i}">${esc(L(c))}</button>`).join('')}</div>
      <p class="small muted">${esc(s('madeUp'))}</p>`;
  }
  const mine = sc.value(sim.c, sim.d, sim.i), put = sc.invested(sim.c, sim.d);
  const pct = v => { const p = Math.round(100 * (v - put) / put); return (p > 0 ? '+' : '') + p + '%'; };
  let body = `${head}<p class="small muted">${esc(L(sc.choices[sim.c]))}</p>
    <div class="card"><p class="small muted" role="status">${esc(s(sc.unit))} ${sim.i} · ${esc(sc.measure ? L(sc.measure) : s('nowHave'))}</p>
      <p class="big">${rupee(mine)} <span class="small muted">${pct(mine)}</span></p>${simChart(sc)}</div>`;
  if (sim.phase === 'ask') {
    const q = sc.decide[sim.c];
    body += `<section class="card warm" role="alert"><p><strong>${esc(L(q.ask))}</strong></p></section>
      <div class="opts">${q.opts.map((o, i) => `<button class="opt" data-act="simDecide" data-i="${i}">${esc(L(o))}</button>`).join('')}</div>`;
  } else if (sim.phase === 'end') {
    const oc = 1 - sim.c, theirs = sc.value(oc, 0, sc.n - 1);
    body += `<section class="card"><p>${esc(s('putIn'))}: <strong>${rupee(put)}</strong></p>
        <p>${esc(s('endWith'))}: <strong>${rupee(mine)}</strong> (${pct(mine)})</p>
        <p>${esc(s('otherEnd'))}: <strong>${rupee(theirs)}</strong><br><span class="small muted">${esc(L(sc.choices[oc]))}</span></p></section>
      <div class="narr" id="narr"></div>
      <section class="card warm"><div class="label">${esc(s('whyTitle'))}</div><p>${esc(L(sc.why))}</p></section>
      <section class="card"><div class="label">${esc(s('factLbl'))}</div><p>${esc(L(sc.fact))}</p></section>
      ${simTable(sc)}
      <div class="actions"><button data-act="simReset">${esc(s('tryOther'))}</button>
        <a class="btn ghost" href="#/lesson/${sc.lesson}">${esc(s('openLesson'))}</a>
        <a class="btn ghost" href="#/sim">${esc(s('allSims'))}</a></div>
      <p class="small muted">${esc(s('madeUp'))}</p>`;
  }
  return body;
}

VIEWS.sim = viewSim;
ACTIONS.simChoose = b => { const sc = SCENARIOS.find(x => x.id === sim.id); narr.stop(); sim.c = +b.dataset.i; runSim(sc); };
ACTIONS.simDecide = b => { const sc = SCENARIOS.find(x => x.id === sim.id); sim.d = +b.dataset.i; runSim(sc); };
ACTIONS.simReset = () => { stopSim(); narr.stop(); sim = null; render(); window.scrollTo(0, 0); };
ACTIONS.simListen = () => {
  const sc = SCENARIOS.find(x => x.id === sim.id);
  narr.speak(sim.phase === 'setup' ? [L(sc.title) + '.', L(sc.formal) + '.', L(sc.intro), ...sc.choices.map((c, i) => `${s('option')} ${i + 1}. ${L(c)}.`)] : [L(sc.why), L(sc.fact)]);
};
