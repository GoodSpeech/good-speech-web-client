/*
  You can update the supported language list
  pasting and executing the following code into the console
  of https://cloud.google.com/speech/docs/languages
  
  
  JSON.stringify(
    Array.from($('.devsite-table-wrapper tr'))
      .reduce((languages, tr) => {
        const tds = Array.from(tr.querySelectorAll('td'));
        const texts = tds.map(td => td.innerText);
        if (texts[1]) {
          languages.push({
            name: texts[0],
            code: texts[1],
            englishName: texts[2]
          });
        }
        return languages;
      }, []), null, 2);

*/


/*
  Get the default texts from https://[lang].wikipedia.org/wiki/Wikipedia i.e. https://es.wikipedia.org/wiki/Wikipedia
*/
export const defaultTexts = {
  af: `Wikipedia is 'n veeltalige "kopielinkse" ensiklopedie ontwerp om deur enigiemand gelees en gewysig te word. Dit berus op samewerkende verandering en onderhoud deur duisende gebruikers deur middel van wiki-sagteware, en word verskaf en ondersteun deur die nie-winsgewende Wikimedia Stigting. Waarnemers beskou die tweeledige bestuur, waarin 'n informele gemeenskap van aktiewe gebruikers die gesag oor 'n globale digitale projek met 'n stigting deel en sodoende formele met informele organisasiestrukture verbind word, as 'n eksperiment wat steeds aan die gang is.`,
  id: `Wikipedia adalah proyek ensiklopedia multibahasa dalam jaringan yang bebas dan terbuka, yang dijalankan oleh Wikimedia Foundation, sebuah organisasi nirlaba yang berbasis di Amerika Serikat. Nama Wikipedia berasal dari gabungan kata wiki dan encyclopedia. Wikipedia dirilis pada tahun 2001 oleh Jimmy Wales dan Larry Sanger, dan kini merupakan karya referensi paling besar, cepat berkembang, dan populer di Internet. Proyek Wikipedia bertujuan untuk memberikan ilmu pengetahuan manusia.`,
  ms: `Wikipedia ialah sebuah ensiklopedia yang boleh diubah suai dan dibina secara kerjasama dengan menggunakan perisian wiki. Wikipedia dikendalikan oleh Yayasan Wikimedia yang tidak mengambil apa-apa keuntungan daripada khidmat yang diberikan. Sebagai tambahan kepada matlamat ensiklopedia iaitu untuk memberikan pengetahuan, Wikipedia juga memasukkan maklumat yang lebih kerap dikaitkan dengan almanak dan jurnal, dan juga perkara semasa.`,
  ca: `La Viquipèdia és una enciclopèdia lliure mantinguda per la Fundació Wikimedia, una organització sense ànim de lucre. Els més de 38 milions d'articles han estat escrits col·laborativament per usuaris d'arreu del món, i la majoria dels seus articles poden ser editats per qualsevol persona que pugui accedir a la web.`,
  cs: `Wikipedie je mnohojazyčná webová encyklopedie se svobodným (otevřeným) obsahem, na jejíž tvorbě spolupracují dobrovolní přispěvatelé z celého světa. Jejím cílem je tvorba a celosvětové šíření volně přístupných encyklopedických informací. Wikipedie existuje ve více než 270 jazykových verzích různého rozsahu, přičemž rozsah zhruba třetiny z nich je spíše symbolický.`,
  da: `Wikipedia er en encyklopædi med åbent indhold, skrevet i samarbejde mellem sine brugere. Navnet er en sammentrækning af ordene wiki, der betyder hurtig på hawaiiansk og encyclopedia der betyder encyklopædi på engelsk. Wikipedia styres af Wikimedia, en non-profit fond oprettet specielt til formålet.`,
  de: `Wikipedia ist ein am 15. Januar 2001 gegründetes Projekt zur Erstellung einer Enzyklopädie in zahlreichen Sprachen mit Hilfe des Wiki­prinzips. Es bietet freie, also kostenlose und zur Weiterverbreitung gedachte, unter lexikalischen Einträgen (Lemmata) zu findende Artikel. Das Ziel ist gemäß dem Gründer Jimmy Wales, „eine frei lizenzierte und hochwertige Enzyklopädie zu schaffen und damit lexikalisches Wissen zu verbreiten“.`,
  en: `Wikipedia is a free online encyclopedia with the aim to allow anyone to edit articles. Wikipedia is the largest and most popular general reference work on the Internet and is ranked among the ten most popular websites. Wikipedia is owned by the nonprofit Wikimedia Foundation. Wikipedia was launched on January 15, 2001, by Jimmy Wales and Larry Sanger. Sanger coined its name, a portmanteau of wiki and encyclopedia.`,
  es: `Wikipedia es una enciclopedia libre, políglota y editada de manera colaborativa. Es administrada por la Fundación Wikimedia, una organización sin ánimo de lucro cuya financiación está basada en donaciones. Sus más de 45 millones de artículos en 287 idiomas han sido redactados conjuntamente por voluntarios de todo el mundo,​ lo que hace un total de más de 2000 millones de ediciones, y prácticamente cualquier persona con acceso al proyecto​ puede editarlos, salvo que la página esté protegida contra el vandalismo para evitar problemas y/o trifulcas.`,
  eu: `Wikipedia eduki askeko entziklopedia bat da, lankidetzaz editatua, eleanitza, Interneten argitaratua, Wikimedia Fundazioa irabazi asmorik gabeko erakundeak sustengatua. Wikipedia mundu osoko boluntarioek idazten dute. Internetera konektatutako edonork parte har dezake Wikipediako artikuluetan, aldatu lotura sakatuz. 2015ko azaroaren bostean, 291 hizkuntzatako edizioak zituen, eta horietatik 275 zeuden aktibo.`,
  /*
  fil,
  */
  fr: `Wikipédia Prononciation du titre dans sa version originale Écouter est un projet d'encyclopédie universelle, multilingue, créé par Jimmy Wales et Larry Sanger le 15 janvier 20011 en wiki sous le nom de domaine wikipedia.org. Les versions des différentes langues utilisent le même logiciel de publication, MediaWiki, et ont la même apparence, mais elles comportent des variations dans leurs contenus, leurs structures et leurs modalités d'édition et de gestion.`,
  /*
  gl,
  hr,
  zu,
  is,
  */
  it: `Wikipedia è un'enciclopedia online a contenuto libero, collaborativa, multilingue e gratuita, nata nel 2001, sostenuta e ospitata dalla Wikimedia Foundation, un'organizzazione non a scopo di lucro statunitense. Lanciata da Jimmy Wales e Larry Sanger il 15 gennaio 2001, inizialmente nell'edizione in lingua inglese, nei mesi successivi ha aggiunto edizioni in numerose altre lingue. Sanger ne suggerì il nome, una parola macedonia nata dall'unione della radice wiki al suffisso pedia (da enciclopedia).`,
  /*
  hu,
  nl,
  nb,
  pl,
  */
  pt: `A Wikipédia é um projeto de enciclopédia multilíngue de licença livre, baseado na web e escrito de maneira colaborativa; encontra-se, atualmente, sob administração da Fundação Wikimedia, uma organização sem fins lucrativos cuja missão é "empoderar e engajar pessoas pelo mundo para coletar e desenvolver conteúdo educacional sob uma licença livre ou no domínio público, e para disseminá-lo efetivamente e globalmente.`,
  /*
  ro,
  sk,
  sl,
  fi,
  sv,
  vi,
  tr,
  el,
  bg,
  ru,
  sr,
  uk,
  he,
  ar: 
  fa,
  hi,
  th,
  ko,
  cmn,
  yue,
  */
  ja: `ウィキペディア（英: Wikipedia）は、ウィキメディア財団が運営しているインターネット百科事典である[4]。コピーレフトなライセンスのもと、サイトにアクセス可能な誰もが無料で自由に編集に参加できる[4]。世界の各言語で展開されている。ウィキペディア（Wikipedia）」という名前は、ウェブブラウザ上でウェブページを編集することができる「ウィキ（Wiki）」というシステムを使用した「百科事 であることに由来する造語である。設立者の1人であるラリー・サンガーにより命名された。`
};

export const supportedLanguages = [{
  'name': 'Afrikaans (Suid-Afrika)',
  'code': 'af-ZA',
  'englishName': 'Afrikaans (South Africa)'
}, {
  'name': 'Bahasa Indonesia (Indonesia)',
  'code': 'id-ID',
  'englishName': 'Indonesian (Indonesia)'
}, {
  'name': 'Bahasa Melayu (Malaysia)',
  'code': 'ms-MY',
  'englishName': 'Malay (Malaysia)'
}, {
  'name': 'Català (Espanya)',
  'code': 'ca-ES',
  'englishName': 'Catalan (Spain)'
}, {
  'name': 'Čeština (Česká republika)',
  'code': 'cs-CZ',
  'englishName': 'Czech (Czech Republic)'
}, {
  'name': 'Dansk (Danmark)',
  'code': 'da-DK',
  'englishName': 'Danish (Denmark)'
}, {
  'name': 'Deutsch (Deutschland)',
  'code': 'de-DE',
  'englishName': 'German (Germany)'
}, {
  'name': 'English (Australia)',
  'code': 'en-AU',
  'englishName': 'English (Australia)'
}, {
  'name': 'English (Canada)',
  'code': 'en-CA',
  'englishName': 'English (Canada)'
}, {
  'name': 'English (Great Britain)',
  'code': 'en-GB',
  'englishName': 'English (United Kingdom)'
}, {
  'name': 'English (India)',
  'code': 'en-IN',
  'englishName': 'English (India)'
}, {
  'name': 'English (Ireland)',
  'code': 'en-IE',
  'englishName': 'English (Ireland)'
}, {
  'name': 'English (New Zealand)',
  'code': 'en-NZ',
  'englishName': 'English (New Zealand)'
}, {
  'name': 'English (Philippines)',
  'code': 'en-PH',
  'englishName': 'English (Philippines)'
}, {
  'name': 'English (South Africa)',
  'code': 'en-ZA',
  'englishName': 'English (South Africa)'
}, {
  'name': 'English (United States)',
  'code': 'en-US',
  'englishName': 'English (United States)'
}, {
  'name': 'Español (Argentina)',
  'code': 'es-AR',
  'englishName': 'Spanish (Argentina)'
}, {
  'name': 'Español (Bolivia)',
  'code': 'es-BO',
  'englishName': 'Spanish (Bolivia)'
}, {
  'name': 'Español (Chile)',
  'code': 'es-CL',
  'englishName': 'Spanish (Chile)'
}, {
  'name': 'Español (Colombia)',
  'code': 'es-CO',
  'englishName': 'Spanish (Colombia)'
}, {
  'name': 'Español (Costa Rica)',
  'code': 'es-CR',
  'englishName': 'Spanish (Costa Rica)'
}, {
  'name': 'Español (Ecuador)',
  'code': 'es-EC',
  'englishName': 'Spanish (Ecuador)'
}, {
  'name': 'Español (El Salvador)',
  'code': 'es-SV',
  'englishName': 'Spanish (El Salvador)'
}, {
  'name': 'Español (España)',
  'code': 'es-ES',
  'englishName': 'Spanish (Spain)'
}, {
  'name': 'Español (Estados Unidos)',
  'code': 'es-US',
  'englishName': 'Spanish (United States)'
}, {
  'name': 'Español (Guatemala)',
  'code': 'es-GT',
  'englishName': 'Spanish (Guatemala)'
}, {
  'name': 'Español (Honduras)',
  'code': 'es-HN',
  'englishName': 'Spanish (Honduras)'
}, {
  'name': 'Español (México)',
  'code': 'es-MX',
  'englishName': 'Spanish (Mexico)'
}, {
  'name': 'Español (Nicaragua)',
  'code': 'es-NI',
  'englishName': 'Spanish (Nicaragua)'
}, {
  'name': 'Español (Panamá)',
  'code': 'es-PA',
  'englishName': 'Spanish (Panama)'
}, {
  'name': 'Español (Paraguay)',
  'code': 'es-PY',
  'englishName': 'Spanish (Paraguay)'
}, {
  'name': 'Español (Perú)',
  'code': 'es-PE',
  'englishName': 'Spanish (Peru)'
}, {
  'name': 'Español (Puerto Rico)',
  'code': 'es-PR',
  'englishName': 'Spanish (Puerto Rico)'
}, {
  'name': 'Español (República Dominicana)',
  'code': 'es-DO',
  'englishName': 'Spanish (Dominican Republic)'
}, {
  'name': 'Español (Uruguay)',
  'code': 'es-UY',
  'englishName': 'Spanish (Uruguay)'
}, {
  'name': 'Español (Venezuela)',
  'code': 'es-VE',
  'englishName': 'Spanish (Venezuela)'
}, {
  'name': 'Euskara (Espainia)',
  'code': 'eu-ES',
  'englishName': 'Basque (Spain)'
}, {
  'name': 'Filipino (Pilipinas)',
  'code': 'fil-PH',
  'englishName': 'Filipino (Philippines)'
}, {
  'name': 'Français (Canada)',
  'code': 'fr-CA',
  'englishName': 'French (Canada)'
}, {
  'name': 'Français (France)',
  'code': 'fr-FR',
  'englishName': 'French (France)'
}, {
  'name': 'Galego (España)',
  'code': 'gl-ES',
  'englishName': 'Galician (Spain)'
}, {
  'name': 'Hrvatski (Hrvatska)',
  'code': 'hr-HR',
  'englishName': 'Croatian (Croatia)'
}, {
  'name': 'IsiZulu (Ningizimu Afrika)',
  'code': 'zu-ZA',
  'englishName': 'Zulu (South Africa)'
}, {
  'name': 'Íslenska (Ísland)',
  'code': 'is-IS',
  'englishName': 'Icelandic (Iceland)'
}, {
  'name': 'Italiano (Italia)',
  'code': 'it-IT',
  'englishName': 'Italian (Italy)'
}, {
  'name': 'Lietuvių (Lietuva)',
  'code': 'lt-LT',
  'englishName': 'Lithuanian (Lithuania)'
}, {
  'name': 'Magyar (Magyarország)',
  'code': 'hu-HU',
  'englishName': 'Hungarian (Hungary)'
}, {
  'name': 'Nederlands (Nederland)',
  'code': 'nl-NL',
  'englishName': 'Dutch (Netherlands)'
}, {
  'name': 'Norsk bokmål (Norge)',
  'code': 'nb-NO',
  'englishName': 'Norwegian Bokmål (Norway)'
}, {
  'name': 'Polski (Polska)',
  'code': 'pl-PL',
  'englishName': 'Polish (Poland)'
}, {
  'name': 'Português (Brasil)',
  'code': 'pt-BR',
  'englishName': 'Portuguese (Brazil)'
}, {
  'name': 'Português (Portugal)',
  'code': 'pt-PT',
  'englishName': 'Portuguese (Portugal)'
}, {
  'name': 'Română (România)',
  'code': 'ro-RO',
  'englishName': 'Romanian (Romania)'
}, {
  'name': 'Slovenčina (Slovensko)',
  'code': 'sk-SK',
  'englishName': 'Slovak (Slovakia)'
}, {
  'name': 'Slovenščina (Slovenija)',
  'code': 'sl-SI',
  'englishName': 'Slovenian (Slovenia)'
}, {
  'name': 'Suomi (Suomi)',
  'code': 'fi-FI',
  'englishName': 'Finnish (Finland)'
}, {
  'name': 'Svenska (Sverige)',
  'code': 'sv-SE',
  'englishName': 'Swedish (Sweden)'
}, {
  'name': 'Tiếng Việt (Việt Nam)',
  'code': 'vi-VN',
  'englishName': 'Vietnamese (Vietnam)'
}, {
  'name': 'Türkçe (Türkiye)',
  'code': 'tr-TR',
  'englishName': 'Turkish (Turkey)'
}, {
  'name': 'Ελληνικά (Ελλάδα)',
  'code': 'el-GR',
  'englishName': 'Greek (Greece)'
}, {
  'name': 'Български (България)',
  'code': 'bg-BG',
  'englishName': 'Bulgarian (Bulgaria)'
}, {
  'name': 'Русский (Россия)',
  'code': 'ru-RU',
  'englishName': 'Russian (Russia)'
}, {
  'name': 'Српски (Србија)',
  'code': 'sr-RS',
  'englishName': 'Serbian (Serbia)'
}, {
  'name': 'Українська (Україна)',
  'code': 'uk-UA',
  'englishName': 'Ukrainian (Ukraine)'
}, {
  'name': 'עברית (ישראל)',
  'code': 'he-IL',
  'englishName': 'Hebrew (Israel)'
}, {
  'name': 'العربية (إسرائيل)',
  'code': 'ar-IL',
  'englishName': 'Arabic (Israel)'
}, {
  'name': 'العربية (الأردن)',
  'code': 'ar-JO',
  'englishName': 'Arabic (Jordan)'
}, {
  'name': 'العربية (الإمارات)',
  'code': 'ar-AE',
  'englishName': 'Arabic (United Arab Emirates)'
}, {
  'name': 'العربية (البحرين)',
  'code': 'ar-BH',
  'englishName': 'Arabic (Bahrain)'
}, {
  'name': 'العربية (الجزائر)',
  'code': 'ar-DZ',
  'englishName': 'Arabic (Algeria)'
}, {
  'name': 'العربية (السعودية)',
  'code': 'ar-SA',
  'englishName': 'Arabic (Saudi Arabia)'
}, {
  'name': 'العربية (العراق)',
  'code': 'ar-IQ',
  'englishName': 'Arabic (Iraq)'
}, {
  'name': 'العربية (الكويت)',
  'code': 'ar-KW',
  'englishName': 'Arabic (Kuwait)'
}, {
  'name': 'العربية (المغرب)',
  'code': 'ar-MA',
  'englishName': 'Arabic (Morocco)'
}, {
  'name': 'العربية (تونس)',
  'code': 'ar-TN',
  'englishName': 'Arabic (Tunisia)'
}, {
  'name': 'العربية (عُمان)',
  'code': 'ar-OM',
  'englishName': 'Arabic (Oman)'
}, {
  'name': 'العربية (فلسطين)',
  'code': 'ar-PS',
  'englishName': 'Arabic (State of Palestine)'
}, {
  'name': 'العربية (قطر)',
  'code': 'ar-QA',
  'englishName': 'Arabic (Qatar)'
}, {
  'name': 'العربية (لبنان)',
  'code': 'ar-LB',
  'englishName': 'Arabic (Lebanon)'
}, {
  'name': 'العربية (مصر)',
  'code': 'ar-EG',
  'englishName': 'Arabic (Egypt)'
}, {
  'name': 'فارسی (ایران)',
  'code': 'fa-IR',
  'englishName': 'Persian (Iran)'
}, {
  'name': 'हिन्दी (भारत)',
  'code': 'hi-IN',
  'englishName': 'Hindi (India)'
}, {
  'name': 'ไทย (ประเทศไทย)',
  'code': 'th-TH',
  'englishName': 'Thai (Thailand)'
}, {
  'name': '한국어 (대한민국)',
  'code': 'ko-KR',
  'englishName': 'Korean (South Korea)'
}, {
  'name': '國語 (台灣)',
  'code': 'cmn-Hant-TW',
  'englishName': 'Chinese, Mandarin (Traditional, Taiwan)'
}, {
  'name': '廣東話 (香港)',
  'code': 'yue-Hant-HK',
  'englishName': 'Chinese, Cantonese (Traditional, Hong Kong)'
}, {
  'name': '日本語（日本）',
  'code': 'ja-JP',
  'englishName': 'Japanese (Japan)'
}, {
  'name': '普通話 (香港)',
  'code': 'cmn-Hans-HK',
  'englishName': 'Chinese, Mandarin (Simplified, Hong Kong)'
}, {
  'name': '普通话 (中国大陆)',
  'code': 'cmn-Hans-CN',
  'englishName': 'Chinese, Mandarin (Simplified, China)'
}]

export default supportedLanguages;