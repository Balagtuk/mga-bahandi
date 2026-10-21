/* =========================================================================
   ✿  PERSONALIZE EVERYTHING HERE  ✿
   -------------------------------------------------------------------------
   This is the only file you need to edit to make the site yours.
   - Change any text below (keep the quotes around it).
   - Add / remove / reorder memories in the `memories` list.
     Each memory = { image, alt, title, date, message }.
   - Paths are relative to index.html, so "assets/photos/memory-01.jpg"
     means the file lives in  assets/photos/memory-01.jpg
   ========================================================================= */

window.ANNIVERSARY_CONFIG = {
  /* Text on the opening (envelope) screen */
  intro: {
    lead: 'Mga bahandi ning kinabuhi ko..',
    hint: 'Open ♡',
    letter: 'Happy 9th Anniversary', // tiny note that peeks out of the envelope
  },

  /* Text around the bouquet */
  hero: {
    overline: 'Happy Anniversary',
    title: 'Sa akong pinalanggang tawo ♡',
    subtitle: 'Kanunay, karon, puhon kanimo ra ko mupahuway',
    hint: 'Choose a photo to open a memory', // small helper text under the carousel
  },

  /* Real-time counter from when your story began */
  counter: {
    startDate: '2017-10-22T00:00:00', // October 22, 2017 12:00 AM
    caption: 'Gihigugma tika sulod sa',
  },

  /* Main bouquet image (transparent PNG / WebP) */
  bouquet: {
    image: 'assets/bouquet.png',
    alt: 'A magnificent luxury bouquet of pink oriental lilies, roses, and baby\'s breath wrapped in coral-pink flared paper with flowing ribbon streamers',
  },

  /* Closing line at the very bottom of the page */
  // footer: 'Made with love, just for you.',

  /* Romantic background music playlist (loops continuously) */
  music: {
    playlist: [
      {
        title: 'Bahandi',
        artist: 'I Belong to the Zoo',
        src: 'assets/music/BAHANDI OFFICIAL LYRIC VIDEO.mp3',
      },
      {
        title: 'Way Sukod',
        artist: 'Oh! Caraga',
        src: 'assets/music/Oh! Caraga - Way Sukod (Official Lyric Video).mp3',
      },
      {
        title: 'Pahuway',
        artist: 'Ferdinand Aragon',
        src: 'assets/music/Pahuway (The Cozy Cove Live Sessions) - Ferdinand Aragon.mp3',
      },
    ],
    volume: 0.55,
    autoplayOnOpen: true, // Starts smoothly as soon as the envelope is clicked to open
    loop: true,           // Loops the playlist continuously
  },

  /* Subtle volume for memory videos so it blends gracefully with background music */
  videoVolume: 0.28,

  /* ---------------------------------------------------------------------
     MEMORIES — one object per photo in the carousel.
     All entries below are PLACEHOLDERS: swap in your own photos and words.
     --------------------------------------------------------------------- */
  memories: [
    {
      "type": "image",
      "media": "assets/photos/6253508886363051059.jpg",
      "alt": "Sa imong tupad, igo na ko.",
      "title": "Sa imong tupad, igo na ko.",
      "message": "Sa kadaghan sa mga tawo nga akong mahimong mahimamat, lahi ra gyud ang pagbati nga ikaw ang tawo nga gusto nakong mailhan pag-ayo hangtod sa hangtod.",
      "image": "assets/photos/6253508886363051059.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051060.jpg",
      "alt": "Ikaw akong paboritong damgo.",
      "title": "Ikaw akong paboritong damgo.",
      "message": "Kay sama ako sa balod sa lawod nga naga-atang",
      "image": "assets/photos/6253508886363051060.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051061.jpg",
      "alt": "Sa imong gugma, nakakaplag kog puy-anan.",
      "title": "Sa imong gugma, nakakaplag kog puy-anan.",
      "message": "Salamat kay nahimo kang bahin sa akong kinabuhi. Wala ko kahibalo sa tanang rason nganong nagtagbo ta, pero gusto nakong ampingan ang higayon nga gihatag kanato.",
      "image": "assets/photos/6253508886363051061.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051062.jpg",
      "alt": "Sa imo ra ko mopahulay.",
      "title": "Sa imo ra ko mopahulay.",
      "message": "Kung usahay dili ko maayo mopahayag sa akong gibati, hinaot nga makita nimo ang akong gugma sa akong mga lihok, sa akong pagpaminaw, ug sa akong pagpaningkamot nga masabtan ka.",
      "image": "assets/photos/6253508886363051062.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051063.jpg",
      "alt": "Ikaw akong pinakadakong bahandi.",
      "title": "Ikaw akong pinakadakong bahandi.",
      "message": "Nakab-ot ko nang adlaw ug ang buwan, apan wa gihapon koy nakaplagan",
      "image": "assets/photos/6253508886363051063.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051064.jpg",
      "alt": "Ikaw ang akong karon ug unya.",
      "title": "Ikaw ang akong karon ug unya.",
      "message": "Lahi ra gyud ang kalipay kung ikaw ang hinungdan, bisan pa sa pinakasimple nga butang",
      "image": "assets/photos/6253508886363051064.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051065.jpg",
      "alt": "Ang akong kasingkasing, imo ra.",
      "title": "Ang akong kasingkasing, imo ra.",
      "message": "Magapabilin sa imong baybayon, matag panahon, hangtod sa hangtod mupahuway",
      "image": "assets/photos/6253508886363051065.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051066.jpg",
      "alt": "Bisan unsa, ikaw gihapon.",
      "title": "Bisan unsa, ikaw gihapon.",
      "message": "Ako nang na basa ang tanan, tanang gibantog nga kasulatan",
      "image": "assets/photos/6253508886363051066.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051067.jpg",
      "alt": "Ikaw ang akong kalinaw.",
      "title": "Ikaw ang akong kalinaw.",
      "message": "Kay padayon nga ampingan ka, luyo sa pagsuway",
      "image": "assets/photos/6253508886363051067.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051068.jpg",
      "alt": "Gugma tika labaw sa akong masulti.",
      "title": "Gugma tika labaw sa akong masulti.",
      "message": "Lahi ra gyud ang kalipay kung ikaw ang hinungdan, bisan pa sa pinakasimple nga butang",
      "image": "assets/photos/6253508886363051068.jpg"
    },
    {
      "type": "video",
      "media": "assets/photos/IMG_0011.MOV",
      "alt": "Ikaw akong karong adlawa ug sa hangtod.",
      "title": "Ikaw akong karong adlawa ug sa hangtod.",
      "message": "Ikaw ang tubag sa mga pangutana sa akong kasingkasing nga dugay na nakong gipangita.",
      "image": "assets/photos/IMG_0011.MOV"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051069.jpg",
      "alt": "Ikaw akong pangandoy nga natinuod.",
      "title": "Ikaw akong pangandoy nga natinuod.",
      "message": "Sa tanang butang nga akong nawala ug naangkon, ikaw ang usa sa mga butang nga dili gyud nako gustong mawala.",
      "image": "assets/photos/6253508886363051069.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051070.jpg",
      "alt": "Ikaw ra akong pilion.",
      "title": "Ikaw ra akong pilion.",
      "message": "Dili man perpekto ang atong gugma, pero gusto nakong mahimong tawo nga dili kapoyan sa pag-ayo sa atong mga kalainan.",
      "image": "assets/photos/6253508886363051070.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051071.jpg",
      "alt": "Kung gugma, ikaw ra gyud. ❤️",
      "title": "Kung gugma, ikaw ra gyud. ❤️",
      "message": "Wala ko nangita ug laing kalibotan nga puy-an, kay basta naa ka, murag igo na ang kalibotan nga naa nato.",
      "image": "assets/photos/6253508886363051071.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051072.jpg",
      "alt": "Bisan mausab ang tanan, ikaw ra.",
      "title": "Bisan mausab ang tanan, ikaw ra.",
      "message": "Ang akong gugma nimo dili masukod sa gidaghanon sa akong mga pulong, kondili sa akong pagpabilin bisan lisod na.",
      "image": "assets/photos/6253508886363051072.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051073.jpg",
      "alt": "Ikaw ang akong paboritong permanente.",
      "title": "Ikaw ang akong paboritong permanente.",
      "message": "Kung pangutan-on ko unsay pinakanindot nga nahitabo sa akong kinabuhi, ikaw ang tubag nga dili nako kinahanglan hunahunaon pag-ayo.",
      "image": "assets/photos/6253508886363051073.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051074.jpg",
      "alt": "Ikaw ra gihapon, kanunay.",
      "title": "Ikaw ra gihapon, kanunay.",
      "message": "Dili lang ikaw ang akong gihigugma karon, apil usab ang tawo nga imong mahimong ug ang mga damgo nga gusto nimong maabot.",
      "image": "assets/photos/6253508886363051074.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051075.jpg",
      "alt": "Sa matag ugma, ikaw gihapon.",
      "title": "Sa matag ugma, ikaw gihapon.",
      "message": "Bisan dili nako makahatag sa tanan nimong gusto, paningkamotan nako nga dili ka magduhaduha nga gihigugma tika.",
      "image": "assets/photos/6253508886363051075.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051076.jpg",
      "alt": "Ang akong pili, ikaw hangtod sa kataposan.",
      "title": "Ang akong pili, ikaw hangtod sa kataposan.",
      "message": "Sa matag adlaw nga mopili ko nimo, mas masabtan nako nga ang tinuod nga gugma dili lang pagbati, kundili desisyon.",
      "image": "assets/photos/6253508886363051076.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051077.jpg",
      "alt": "Ikaw akong pahulay sa kakapoy.",
      "title": "Ikaw akong pahulay sa kakapoy.",
      "message": "Ikaw ang akong pahulay sa kalibotan nga usahay kapoy kaayong atubangon.",
      "image": "assets/photos/6253508886363051077.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051078.jpg",
      "alt": "Sa tanan, ikaw ra gyud.",
      "title": "Sa tanan, ikaw ra gyud.",
      "message": "Bisan unsaon nako pagkapuliki, naa gyud mga higayon nga kalit lang tika mahunahunaan ug mangitaon ka sa akong kasingkasing.",
      "image": "assets/photos/6253508886363051078.jpg"
    },
    {
      "type": "video",
      "media": "assets/photos/IMG_6240.MOV",
      "alt": "Ikaw ang rason sa akong pahiyom.",
      "title": "Ikaw ang rason sa akong pahiyom.",
      "message": "Dili lang imong presensya ang akong gimingaw, kundili ang kalinaw nga akong mabati kung naa ka sa akong tupad.",
      "image": "assets/photos/IMG_6240.MOV"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051079.jpg",
      "alt": "Dili perpekto, pero tinuod.",
      "title": "Dili perpekto, pero tinuod.",
      "message": "Usahay, gusto lang tika makuyogan nga walay daghang istorya, kay igo na para nako nga kabalo kong naa ka.",
      "image": "assets/photos/6253508886363051079.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051080.jpg",
      "alt": "Sa kalisod, dili tika biyaan.",
      "title": "Sa kalisod, dili tika biyaan.",
      "message": "Layo man ta karon, pero wala kana magpasabot nga layo ka sa akong mga pangandoy.",
      "image": "assets/photos/6253508886363051080.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051081.jpg",
      "alt": "Ikaw ra, walay lain.",
      "title": "Ikaw ra, walay lain.",
      "message": "Ang pinakalisod sa pagkamingaw nimo kay daghan kog gustong isulti, pero ang usa ra gyud akong gusto—nga unta naa ka dinhi.",
      "image": "assets/photos/6253508886363051081.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051082.jpg",
      "alt": "Dili ka kapilian, ikaw akong gipili.",
      "title": "Dili ka kapilian, ikaw akong gipili.",
      "message": "Bisan dili tika makita kada adlaw, naa gihapon ka sa mga butang nga akong gihunahuna sa dili pa ko matulog.",
      "image": "assets/photos/6253508886363051082.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051083.jpg",
      "alt": "Sa hangtod, ikaw ra.",
      "title": "Sa hangtod, ikaw ra.",
      "message": "Gimingaw ko sa mga higayon nga wala tay espesyal nga gibuhat, pero malipayon kaayo ko tungod kay kuyog tika.",
      "image": "assets/photos/6253508886363051083.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051084.jpg",
      "alt": "Bisan layo, duol ka sa akong dughan.",
      "title": "Bisan layo, duol ka sa akong dughan.",
      "message": "Kung mahimo lang nakong ipadala ang akong gakos pinaagi sa hangin, dili na unta ka magdugay sa paghulat nga mabati nimo akong gugma.",
      "image": "assets/photos/6253508886363051084.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051085.jpg",
      "alt": "Ikaw ang akong kalipay nga hilom.",
      "title": "Ikaw ang akong kalipay nga hilom.",
      "message": "Dili ang gilay-on ang akong gikahadlokan, kundili ang posibilidad nga moabot ang panahon nga dili na ta mangita sa usag usa.",
      "image": "assets/photos/6253508886363051085.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051086.jpg",
      "alt": "Ikaw akong ampingan, hangtod mahimo.",
      "title": "Ikaw akong ampingan, hangtod mahimo.",
      "message": "Kada gabii nga wala ka sa akong tupad, akong gihandom ang adlaw nga dili na kinahanglan nga pangandoyon tika kay mahimo na tika gakson.",
      "image": "assets/photos/6253508886363051086.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051087.jpg",
      "alt": "Ikaw ra gihapon, kanunay.",
      "title": "Ikaw ra gihapon, kanunay.",
      "message": "Dili ko mosaad nga dili ta masakitan, pero mosaad ko nga dili nako basta biyaan ang atong gugma sa unang pagsulay.",
      "image": "assets/photos/6253508886363051087.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051088.jpg",
      "alt": "Ang akong kasingkasing, imo ra.",
      "title": "Ang akong kasingkasing, imo ra.",
      "message": "Gusto nakong mahimong tawo nga imong mapili dili lang sa mga adlaw nga malipayon ka, kondili sa mga adlaw nga dili nimo masabtan ang imong kaugalingon.",
      "image": "assets/photos/6253508886363051088.jpg"
    },
    {
      "type": "video",
      "media": "assets/photos/IMG_6326.MOV",
      "alt": "Ikaw akong ampingan, hangtod mahimo.",
      "title": "Ikaw akong ampingan, hangtod mahimo.",
      "message": "Dili ko gusto nga ako lang ang imong gihigugma; gusto nakong ako usab ang imong kasaligan, kapahulayan, ug kauban sa kinabuhi.",
      "image": "assets/photos/IMG_6326.MOV"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051089.jpg",
      "alt": "Ikaw akong pinakadakong bahandi.",
      "title": "Ikaw akong pinakadakong bahandi.",
      "message": "Kung moabot ang panahon nga mausab ang tanan, hinaot nga magpabilin ang atong tinguha nga sabton ug pilion ang usag usa.",
      "image": "assets/photos/6253508886363051089.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051090.jpg",
      "alt": "Ikaw ang akong paboritong permanente.",
      "title": "Ikaw ang akong paboritong permanente.",
      "message": "Dili ko mangayo nga permi kang lig-on. Kung kapoy na ka, tugoti ko nga mahimong kusog nimo samtang nagkat-on ka pag-usab sa pagbarog.",
      "image": "assets/photos/6253508886363051090.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051091.jpg",
      "alt": "Bisan unsa, ikaw gihapon.",
      "title": "Bisan unsa, ikaw gihapon.",
      "message": "Ang akong plano dili lang nga makuyog ka karon, kondili nga magtukod ta ug kaugmaon nga pareho natong gustong puy-an.",
      "image": "assets/photos/6253508886363051091.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051092.jpg",
      "alt": "Bisan layo, duol ka sa akong dughan.",
      "title": "Bisan layo, duol ka sa akong dughan.",
      "message": "Bisan pila pa ka higayon nga kinahanglan natong magsugod pag-usab, gusto gihapon nakong ikaw ang akong kauban sa matag pagsugod.",
      "image": "assets/photos/6253508886363051092.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051093.jpg",
      "alt": "Ikaw ang rason sa akong pahiyom.",
      "title": "Ikaw ang rason sa akong pahiyom.",
      "message": "Dili ko gustong higugmaon ka lang kung sayon ka higugmaon. Gusto nakong makat-on sa pagsabot nimo bisan sa mga panahong lisod ka sabton.",
      "image": "assets/photos/6253508886363051093.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051094.jpg",
      "alt": "Ikaw akong pangandoy nga natinuod.",
      "title": "Ikaw akong pangandoy nga natinuod.",
      "message": "Sa matag desisyon nga akong himoon para sa kaugmaon, gusto nakong hunahunaon kung asa ta padulong ug unsaon nato paglambo nga magkauban.",
      "image": "assets/photos/6253508886363051094.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051096.jpg",
      "alt": "Sa imo ra ko mopahulay.",
      "title": "Sa imo ra ko mopahulay.",
      "message": "Dili ko mosaad nga ako ang pinakamaayong tawo para nimo, pero paningkamotan nako nga mahimong tawo nga angayan sa imong pagsalig.",
      "image": "assets/photos/6253508886363051096.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051097.jpg",
      "alt": "Ikaw akong paboritong damgo.",
      "title": "Ikaw akong paboritong damgo.",
      "message": "Kung mahimo lang nakong pilion ang akong paboritong lugar sa kalibotan, pilion nako ang dapit diin magtapad ta nga walay kinahanglan nga dali-on.",
      "image": "assets/photos/6253508886363051097.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051098.jpg",
      "alt": "Sa matag ugma, ikaw gihapon.",
      "title": "Sa matag ugma, ikaw gihapon.",
      "message": "Dili kinahanglan nga espesyal ang adlaw aron higugmaon tika. Bisan ordinaryong adlaw, espesyal gihapon ka para nako.",
      "image": "assets/photos/6253508886363051098.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051099.jpg",
      "alt": "Ikaw ang akong kalinaw.",
      "title": "Ikaw ang akong kalinaw.",
      "message": "Ganahan ko sa imong pahiyom, pero mas gihigugma nako ang tawo nga anaa sa luyo niana nga pahiyom.",
      "image": "assets/photos/6253508886363051099.jpg"
    },
    {
      "type": "video",
      "media": "assets/photos/IMG_6349.MOV",
      "alt": "Ikaw akong karong adlawa ug sa hangtod.",
      "title": "Ikaw akong karong adlawa ug sa hangtod.",
      "message": "Kung naa koy usa ka higayon nga gusto nakong balikon, kadtong mga higayon nga wala tay kabalaka sa oras kay kuntento ra ta nga magkauban.",
      "image": "assets/photos/IMG_6349.MOV"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051100.jpg",
      "alt": "Ikaw ra akong pilion.",
      "title": "Ikaw ra akong pilion.",
      "message": "Dili ko kapoyan pagpaminaw sa imong mga istorya, kay bisan ang gagmay nimong detalye importante para sa tawo nga nahigugma nimo.",
      "image": "assets/photos/6253508886363051100.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051101.jpg",
      "alt": "Ikaw ang akong karon ug unya.",
      "title": "Ikaw ang akong karon ug unya.",
      "message": "Kung ang gugma adunay nawong, basin mao kana ang imong nawong nga akong mahunahuna sa matag higayon nga mangita kog kalipay.",
      "image": "assets/photos/6253508886363051101.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051102.jpg",
      "alt": "Sa imong tupad, igo na ko.",
      "title": "Sa imong tupad, igo na ko.",
      "message": "Sa imong tupad, dili nako kinahanglan magpakaaron-ingnon nga lig-on ko kanunay. Mahimo kong mahimong ako lang.",
      "image": "assets/photos/6253508886363051102.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051103.jpg",
      "alt": "Sa hangtod, ikaw ra.",
      "title": "Sa hangtod, ikaw ra.",
      "message": "Ang imong kamot dili lang akong gustong gunitan; gusto usab nakong mahimong kauban sa pagdala sa mga kabug-at nga imong giatubang.",
      "image": "assets/photos/6253508886363051103.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051104.jpg",
      "alt": "Ikaw ra, walay lain.",
      "title": "Ikaw ra, walay lain.",
      "message": "Kung naa koy usa ka hangyo sa kinabuhi, hinaot nga daghan pa kitag panahon nga magkatawa sa mga butang nga kita ra ang nakasabot.",
      "image": "assets/photos/6253508886363051104.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051105.jpg",
      "alt": "Bisan mausab ang tanan, ikaw ra.",
      "title": "Bisan mausab ang tanan, ikaw ra.",
      "message": "Dili sukdanan sa atong gugma ang pagkawala sa problema, kondili ang atong pagtinabangay sa pag-atubang niini.",
      "image": "assets/photos/6253508886363051105.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051106.jpg",
      "alt": "Sa imong gugma, nakakaplag kog puy-anan.",
      "title": "Sa imong gugma, nakakaplag kog puy-anan.",
      "message": "Kung naa kay mga adlaw nga dili nimo mahigugma ang imong kaugalingon, hinaot nga mahinumdoman nimo nga naa koy mga rason nga magpabiling mahigugma nimo.",
      "image": "assets/photos/6253508886363051106.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051107.jpg",
      "alt": "Dili ka kapilian, ikaw akong gipili.",
      "title": "Dili ka kapilian, ikaw akong gipili.",
      "message": "Dili nako gustong madaog ang atong mga lalis. Mas gusto nakong masabtan nato ang usag usa ug dili madaot ang atong relasyon tungod sa garbo.",
      "image": "assets/photos/6253508886363051107.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051108.jpg",
      "alt": "Ikaw akong pahulay sa kakapoy.",
      "title": "Ikaw akong pahulay sa kakapoy.",
      "message": "Kung masakitan ka tungod nako, gusto nakong maminaw ug motul-id sa akong sayop, dili mangita dayon ug rason aron depensahan ang akong kaugalingon.",
      "image": "assets/photos/6253508886363051108.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051109.jpg",
      "alt": "Ikaw ang akong kalipay nga hilom.",
      "title": "Ikaw ang akong kalipay nga hilom.",
      "message": "Ang tinuod nga pag-atiman dili lang makita sa mga pulong nga tam-is, kondili sa pagtagad sa mga butang nga nakapasakit nimo.",
      "image": "assets/photos/6253508886363051109.jpg"
    },
    {
      "type": "video",
      "media": "assets/photos/IMG_6551.MOV",
      "alt": "Gugma tika labaw sa akong masulti.",
      "title": "Gugma tika labaw sa akong masulti.",
      "message": "Bisan adunay mga adlaw nga dili nato magkasinabot, hinaot nga dili nato kalimtan nga kauban nato ang atong gihigugma, dili kontra.",
      "image": "assets/photos/IMG_6551.MOV"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051110.jpg",
      "alt": "Ang akong pili, ikaw hangtod sa kataposan.",
      "title": "Ang akong pili, ikaw hangtod sa kataposan.",
      "message": "Dili ko gusto nga magpabilin ka tungod kay nahadlok ka nga mawala ko. Gusto nakong magpabilin ka tungod kay gibati nimo nga gihigugma ug gitahod tika.",
      "image": "assets/photos/6253508886363051110.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051111.jpg",
      "alt": "Sa kalisod, dili tika biyaan.",
      "title": "Sa kalisod, dili tika biyaan.",
      "message": "Kung mapandol ta sa atong panag-uban, dili kinahanglan nga didto na matapos ang tanan. Usahay, ang importante mao ang pagkat-on ug pagbangon nga magkauban.",
      "image": "assets/photos/6253508886363051111.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051112.jpg",
      "alt": "Dili perpekto, pero tinuod.",
      "title": "Dili perpekto, pero tinuod.",
      "message": "Dili ko makatangtang sa tanan nimong kasakit, pero dili ko gusto nga mag-inusara ka sa pag-atubang niini kung mahimo kong motabang.",
      "image": "assets/photos/6253508886363051112.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051113.jpg",
      "alt": "Sa tanan, ikaw ra gyud.",
      "title": "Sa tanan, ikaw ra gyud.",
      "message": "Ang gugma dili lang pagpili sa usag usa sa mga adlaw nga sayon; apil usab niini ang pagkamatinud-anon, pagpangayo og pasaylo, ug pag-usab sa mga sayop.",
      "image": "assets/photos/6253508886363051113.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051114.jpg",
      "alt": "Kung gugma, ikaw ra gyud. ❤️",
      "title": "Kung gugma, ikaw ra gyud. ❤️",
      "message": "Basin dili nato mahibal-an ang tanang tubag bahin sa kinabuhi, pero malipay ko nga magpadayon sa pagpangita niini nga kuyog ka.",
      "image": "assets/photos/6253508886363051114.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051115.jpg",
      "alt": "Sa kalisod, dili tika biyaan.",
      "title": "Sa kalisod, dili tika biyaan.",
      "message": "Dili ko makahibalo unsay dad-on sa ugma, apan kabalo ko nga gusto nakong atubangon kini nga matinud-anon sa akong kaugalingon ug sa akong gugma nimo.",
      "image": "assets/photos/6253508886363051115.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051116.jpg",
      "alt": "Ikaw ang akong kalinaw.",
      "title": "Ikaw ang akong kalinaw.",
      "message": "Ang pinakanindot nga bahin sa paghigugma nimo mao ang pagkat-on nga ang kalipay dili kanunay anaa sa pagdawat, usahay anaa usab sa paghatag nga kinasingkasing.",
      "image": "assets/photos/6253508886363051116.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051117.jpg",
      "alt": "Ikaw ra, walay lain.",
      "title": "Ikaw ra, walay lain.",
      "message": "Dili ka lang bahin sa akong mga damgo; usa ka tawo ka nga gusto nakong suportahan aron maabot usab nimo ang imong kaugalingong mga damgo.",
      "image": "assets/photos/6253508886363051117.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051118.jpg",
      "alt": "Dili perpekto, pero tinuod.",
      "title": "Dili perpekto, pero tinuod.",
      "message": "Kung ang panahon makausab sa atong dagway, kusog, ug kahimtang, hinaot nga dili mawala ang atong tinguha nga magkaila ug maghigugma pag-usab sa matag bag-ong bersiyon sa usag usa.",
      "image": "assets/photos/6253508886363051118.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051119.jpg",
      "alt": "Gugma tika labaw sa akong masulti.",
      "title": "Gugma tika labaw sa akong masulti.",
      "message": "Ang akong gugma nimo dili tungod kay wala koy laing kapilian. Tungod kini kay bisan nahibalo ko nga daghan pang tawo sa kalibotan, ikaw ang gusto nakong pakigbahinan sa akong kinabuhi.",
      "image": "assets/photos/6253508886363051119.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051120.jpg",
      "alt": "Sa hangtod, ikaw ra.",
      "title": "Sa hangtod, ikaw ra.",
      "message": "Dili ko gusto nga mahimong tibuok kalibotan nimo. Gusto nakong mahimong tawo nga motabang nimo nga mas malingaw ug mas molig-on sa kalibotan nga imo nang kaugalingon.",
      "image": "assets/photos/6253508886363051120.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051121.jpg",
      "alt": "Ikaw akong pangandoy nga natinuod.",
      "title": "Ikaw akong pangandoy nga natinuod.",
      "message": "Kung moabot ang panahon nga malimtan nato ang gagmayng detalye sa atong mga sugilanon, hinaot nga mahinumdoman gihapon nato ang pagbati nga nakapahimo kanato nga mopili sa usag usa.",
      "image": "assets/photos/6253508886363051121.jpg"
    },
    {
      "type": "image",
      "media": "assets/photos/6253508886363051122.jpg",
      "alt": "Ikaw ra gihapon, kanunay.",
      "title": "Ikaw ra gihapon, kanunay.",
      "message": "Ang gugma nga akong gusto uban nimo mao ang gugma nga dili kinahanglan magpakitang-tao sa uban, kay igo na kanato nga tinuod kini sa atong duha.",
      "image": "assets/photos/6253508886363051122.jpg"
    }
  ],
};
