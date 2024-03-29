const clientname = sessionStorage.getItem("clientname");

const en = {
    title:" વપરાશકર્તા ઓનબોર્ડિંગ પ્રક્રિયા",
    subtitle: "વિડિઓ કેવાયસી પ્રારંભ કરો",
    // =============SIDEBAR===============
    start: "શરૂઆત",
    aadhar_verification: "આધાર ચકાસણી",
    pan_verification: "પાન ચકાસણી",
    chat_initial_video: "ચેટ કરો અને વિડિઓ ક Callલ પ્રારંભ કરો",
    end: "End",
    // =================================
    //              START
    // =================================
    select_language: "ભાષા પસંદ કરો",
    new_user: "નવા વપરાશકર્તા",
    continue_prev: "પાછલું સત્ર ચાલુ રાખો",
    contact_number: "સંપર્ક નંબર",
    send_otp: "ઓટીપી મોકલો",
    otp: "ઓ.ટી.પી.",
    proceed: "આગળ વધો",
    enter_vcip_no: "Vcip નંબર અથવા મોબાઇલ નંબર દાખલ કરો",
    receive_otp: "સંપર્ક નંબર દ્વારા OTP પ્રાપ્ત કરો",
    havent_receive_otp: "ઓટીપી નથી મળ્યો? ફરીથી મોકલો",
    user_guide: "વપરાશકર્તા માર્ગદર્શિકા",
    instructions: "સૂચનાઓ",
    ins1: "વપરાશકર્તા' નવા વપરાશકર્તા 'પર ક્લિક કરીને નવું વિડીયો કેવાયસી સત્ર શરૂ કરી શકે છે. ગ્રાહકે પોતાનો સક્રિય મોબાઇલ નંબર સબમિટ કરવાની અને ઓટીપી માન્યતા કરવાની જરૂર છે. આગળ, આગળ વધો પર ક્લિક કરો.",
    ins2: "નવા વપરાશકર્તાને એક સ્વત--જનરેટેડ વી-સીઆઈપી આઈડી ફાળવવામાં આવશે. સમાન વી-સીઆઇપી આઈડી વપરાશકર્તા સાથે એસએમએસ દ્વારા શેર કરવામાં આવશે.",
    ins3: "વપરાશકર્તાને સંમતિ પૃષ્ઠ પર ઉપલબ્ધ વિગતો કાળજીપૂર્વક વાંચવાની જરૂર છે અને સંમતિ અને સંમતિ સબમિટ કરવાની રહેશે.",
    ins4: "આગળનું પગલું વપરાશકર્તા માટે આધાર ચકાસણી હશે. વપરાશકર્તા ક્યાં તો ઓટીપી આધારિત આધાર ઇ-કેવાયસી પ્રમાણીકરણ અથવા lineફલાઇન કેવાયસી સાથે આગળ વધી શકે છે. એક્સએમએલ ફાઇલ અથવા આધાર સુરક્ષિત ક્યુઆર કોડનો ઉપયોગ કરીને આધારની lineફલાઇન ચકાસણીના કિસ્સામાં, તે XML ફાઇલ સુનિશ્ચિત કરવામાં આવશે અથવા ક્યૂઆર કોડ જનરેશનની તારીખ વી-સીઆઈપી કાringવાની તારીખથી 3 દિવસથી જૂની નથી. વધુ માહિતી ",
    ins5: "આધાર ચકાસણી પછીનું આગળનું પગલું એ પાન વેરિફિકેશન છે. આ પગલામાં વપરાશકર્તાએ તેના પાનકાર્ડનો ફોટો અપલોડ કરવો પડશે અને પાનકાર્ડની વિગતોને ક્રોસ-વેલિડેટ કરવી આવશ્યક છે.",
    ins6: "આધાર અને પાનકાર્ડના સફળ માન્યતા પછી, વપરાશકર્તાએ બેંકર સાથે વિડિઓ કોન્ફરન્સિંગ સત્રમાં હાજરી આપવી જ જોઇએ.",
    ins7: "વિડિઓ કfereન્ફરન્સિંગ સત્ર દરમિયાન વપરાશકર્તાને પ્રશ્ન અને જવાબ (સ & એ) સત્રમાંથી પસાર થવું જરૂરી છે.",
    ins8: "ક્યૂ એન્ડ એ સત્ર પછી ફેસ મેચ અને લાઇવનેસ ચેક કરવા માટે વપરાશકર્તાનો લાઇવ ફોટોગ્રાફ લેવામાં આવશે.",
    please_note: "કૃપયા નોંધો:",
    ins9: "વપરાશકર્તા' પાછલા સત્ર ચાલુ રાખો 'પર ક્લિક કરીને વિડિઓ કેવાયસી ચાલુ રાખી શકે છે.",
    ins10: "વપરાશકર્તાને જૂનો વી-સીઆઇપી નંબર સબમિટ કરવાની જરૂર છે.",
    ins11: "વપરાશકર્તા સીધા જ તે પૃષ્ઠ પર ઉતરશે જ્યાં તેણે સત્ર છોડી દીધું છે.",
    ins12: "એક્સએમએલ ફાઇલ અથવા આધાર સુરક્ષિત ક્યુઆર કોડનો ઉપયોગ કરીને આધારની lineફલાઇન ચકાસણીના કિસ્સામાં, તે સુનિશ્ચિત કરવામાં આવશે કે XML ફાઇલ અથવા ક્યૂઆર કોડ જનરેશનની તારીખ અગાઉના વી-સીઆઈપી સત્રને ચલાવવાની તારીખથી 3 દિવસથી જૂની નથી. વધુ માહિતી" ,
    click_here: "અહીં ક્લિક કરો",
    // =============POPUP===============
    generated_vcip: "જનરેટેડ વી-સીઆઇપી આઈડી",
    model_ins1: "તમારી વી-સીઆઈપી આઈડી તમારા મોબાઇલ નંબર પર શેર કરવામાં આવી છે. જો તમે, વિડિઓ-કેવાયસી પ્રક્રિયાની વચ્ચે છોડી દો તો તમે સમાન વી-સીઆઈપી આઈડી સબમિટ કરીને તમારું સત્ર ફરી શરૂ કરી શકો છો.",
    model_ins2: "કૃપા કરીને ભવિષ્યમાં કોઈપણ પ્રકારની છેતરપિંડી પ્રથાને ટાળવા માટે તમારી વી-સીઆઇપી આઈડી ગુપ્ત રાખો.",
    model_ins3: "કૃપા કરીને તમારા ભાવિ સંદર્ભ માટે વી-સીઆઇપી આઈડી નોંધો",
    alert: "અલર્ટ",
    alert_msg: "આ એપ્લિકેશન ફક્ત ડેમો હેતુ માટે જ હોસ્ટ કરવામાં આવી છે. ડેમો દરમિયાન વપરાયેલી બધી વિગતો 24 કલાક પછી આપમેળે કા beી નાખવામાં આવશે.",
    // =================================
    //       Aadhaar Verification
    // =================================
    adr_title: "આધાર ચકાસણી",
    proceed_with: "આગળ વધો",
    otp_kyc: "ઓટીપી આધારિત ઇ-કેવાયસી",
    offline_kyc: "Lineફલાઇન કેવાયસી",
    help: "સહાય",
    qtn1: "ઓ.ટી.પી. આધારિત ઇ-કે.ઇ.સી. શું છે?",
    ans1: "આધાર આધારિત ઇ-કેવાયસી એ ઇલેક્ટ્રોનિક, 100% પેપરલેસ પ્રક્રિયા છે જે વપરાશકર્તાઓ તેમના આધાર નંબરનો ઉપયોગ કરીને તેમની કેવાયસી formalપચારિકતા કરે છે.",
    qtn2: "Lineફલાઇન કેઆઇસી શું છે??",
    ans2: `Lineફલાઇન કેવાયસી એ કેવાયસીનું એક મોડ છે જે વપરાશકર્તાને આધારકાર્ડની ફોટો કોપી પ્રદાન કરવાની જરૂરિયાતને દૂર કરે છે અને તેના બદલે વપરાશકર્તા કેવાયસી એક્સએમએલ / ક્યુઆર કોડ ડાઉનલોડ કરી શકે છે અને તેના કેવાયસી કરવા માટે ${clientname} ને તે જ પ્રદાન કરી શકે છે. કેવાયસી વિગતો વપરાશકર્તા દ્વારા શેર કરવામાં આવી છે. કેવાયસી વિગતો મશીન રીડિએબલ એક્સએમએલમાં છે જે યુઆઈડીએઆઈ દ્વારા ડિજિટલ રીતે સહી કરેલી છે જે એજન્સી તેની અધિકૃતતાને ચકાસી શકે છે અને કોઈ ચેડાની તપાસ કરી શકે છે. `,
    // =============POPUP===============
    user_content: "વપરાશકર્તા સંમતિ",
    content1: "બેંકર સાથેનું તમારું વિડિઓ ક્રિયાપ્રતિક્રિયા સત્ર રેકોર્ડિંગ મોડમાં હશે.",
    content2: "બેન્કર સાથે વિડિઓ ઇન્ટરેક્શન સત્ર દરમિયાન એક લાઇવ ફોટોગ્રાફ મેળવવામાં આવશે.",
    content3: "તમારી આધાર વિગતો વી-સીઆઇપી પ્રક્રિયામાં આધાર ચકાસણી માટે ઉપયોગમાં લેવામાં આવશે.",
    content4: "વી-સીઆઇપી પ્રક્રિયામાં પાન ચકાસણી કરવા માટે તમારા પાનકાર્ડનો ફોટોગ્રાફ એકત્રિત કરવામાં આવશે.",
    content5: "તમારું લાઇવ સ્થાન વી-સીઆઇપી પ્રક્રિયામાં કેદ કરવામાં આવશે.",
    content6: "તમારે ખાતરી કરવી જોઈએ કે વિડિઓ ઇન્ટરેક્શન સત્ર દરમિયાન બધી વિગતો યોગ્ય છે.",
    content7: "આધાર XML પેકેટ અથવા આધાર સુરક્ષિત ક્યૂઆર કોડ 3 દિવસથી વધુનો ન હોવો જોઈએ.",
    content_cdtn1: "હું, વી-સીઆઇપી આઈડી",
    content_cdtn2: " ધારક ઉપરોક્ત તમામ મુદ્દાઓ સાથે સંમત થાય છે અને આ દ્વારા, મારી સંમતિની પુષ્ટિ કરો.",
    // =================================
    //  OTP Based Aadhaar Verification
    // =================================
    adr_otp_title: "આધાર ચકાસણી ઓટીપી આધારિત ઇ-ક્યુસી",
    adr_number: "આધાર નંબર",
    sms: "એસએમએસ",
    email: "ઇમેઇલ",
    both: "બંને",
    get_ekyc: "ઇ-કિક મેળવો",
    adr_details:"આધાર વિગતો",
    name: "નામ",
    fname: "પિતાનું નામ",
    dob: "જન્મ તારીખ",
    addr: "સરનામું",
    photo: "ફોટો",
    back: "પાછળ",
    // =================================
    //          OFFLINE KYC
    // =================================
    offline_title: "આધાર ચકાસણી lineફલાઇન કેવાયસી",
    video: "ટ્યુટોરિયલ વિડિઓ",
    drag_drop: "ફાઇલ અહીં ખેંચો અને છોડો",
    or: "અથવા ",
    OR: "અથવા",
    click_file: "ફાઇલ ઉમેરવા માટે ક્લિક કરો",
    upolad_either: "ક્યાં તો ઇ-કેવાયસી એક્સએમએલ અથવા ઇ-આધાર પીડીએફ અપલોડ કરો",
    zip_password: "કૃપા કરીને પિન પાસવર્ડ દાખલ કરો",
    submit: "સબમિટ કરો",
    resubmit: "ફરીથી સબમિટ કરો",    
    dont_have: "નવીનતમ ઇ-કેવાયસી એક્સએમએલ અથવા ઇ-આધાર પીડીએફ ન હોય",
    download_xml: "યુઆઇડીએઆઇ વેબસાઇટ પરથી ઇ-કેવાયસી એક્સએમએલ ડાઉનલોડ કરવા",
    download_pdf: "યુઆઇડીએઆઇ વેબસાઇટ પરથી ઇ-કેવાયસી પીડીએફ ડાઉનલોડ કરવા માટે",  
    help_center: "મદદ કેન્દ્ર",
    ekyc: "આધાર પેપરલેસ ઇ-કેવાયસી",
    ekycPdf: "ઇ-આધાર પીડીએફ",
    step1: "પર રીડાયરેક્ટ કરો",
    step2: "આધાર નંબર અથવા વીઆઇડી દાખલ કરો",
    step3: "રજિસ્ટર્ડ મોબાઈલ નંબર દ્વારા ઓટીપી વેલિડેશન કરો.",
    step4: "પાસવર્ડ સુરક્ષિત ઇ-કેસીએક્સ એક્સએમએલ ડાઉનલોડ કરો.",
    step5: "આધાર નંબર અથવા વીઆઇડી અથવા ઇઆઇડી દાખલ કરો",
    step6: "પાસવર્ડ સુરક્ષિત eAhahaar પીડીએફ ડાઉનલોડ કરો",
    note1: "તમારા પેપરલેસ offlineફલાઇન ઇકેવાયસી માટે યુઆઈડીએઆઈ પોર્ટલમાં એક્સએમએલ બનાવતી વખતે પાસવર્ડ એ જ શેર કોડ છે.",
    note2: "પાસવર્ડ એ તમારા નામના પ્રથમ ચાર અક્ષરો (આધારની જેમ) કેપિટલ અક્ષરોમાં અને EAadar પીડીએફ માટે YYYY ફોર્મેટમાં જન્મ વર્ષનો સંયોજન છે.",
    // =================================
    //              PAN
    // =================================
    pan_title: "પાન વેરિફિકેશન",
    pan_card: "પાન કાર્ડ",
    pan_card1: "Upload E-PAN(PDF)",
    capture_pan: "પાનકાર્ડની છબી કેપ્ચર કરો",
    pan_ins1: "અપલોડ કરેલી છબી ફક્ત JPG / JPEG / PNG ફોર્મેટમાં હોવી જોઈએ",
    pan_ins2: "છબીનું કદ 30kb થી 100mb ની વચ્ચે હોવું જોઈએ.",
    pan_ins3: "છબીઓની પહોળાઈ 300 થી 8000 ની વચ્ચે હોવી જોઈએ અને છબીઓની heightંચાઈ 8000 થી 8000 ની વચ્ચે હોવી જોઈએ",
    pan_ins4: "કૃપા કરીને પેન કાર્ડની આગળની બાજુ અપલોડ કરો",
    pan_ins5: "કબજે કરેલી છબી અસ્પષ્ટ હોવી જોઈએ નહીં",
    pan_ins6: "છબીને સપાટ એંગલથી કબજે કરવી જોઈએ અને એંગલ નમેલી હોવી જોઈએ નહીં.",
    pan_qtn: "પાન વિગતો શું છે??",
    pan_ans: "એક પાન વિગતો એ અપલોડ કરેલા પાનકાર્ડમાંથી કાractedેલી માહિતી છે. ડેટા ખોટી રીતે મેળવવામાં આવે તો વપરાશકર્તા કાractedેલી માહિતીને સંપાદિત કરી શકે છે.",
    pan_success: "પાન ચકાસણી સફળ",
    pan_wait: "કૃપા કરી પ્રતીક્ષા કરો, અમે તમને આગળના પગલા પર લઈ જઈ રહ્યા છીએ",
    // =================================
    //              CHAT
    // =================================
    token: "ટોકન નંબર છે:",
    join: "હવે જોડાઓ", 
    video_call_process: "વિડિઓ ક Callલ પ્રક્રિયામાં છે",
    under_recording_mode: "તમે વિડિઓ રેકોર્ડિંગ મોડ હેઠળ છો, પૃષ્ઠને ફરીથી લોડ કરશો નહીં",
    user: "વપરાશકર્તા",
    please_wait: "મહેરબાની કરી રાહ જુવો...",
    waiting_for_banker: "બેન્કરની વિડિઓ ક callલમાં જોડાવા માટે રાહ જુએ છે",
    video_instruction: "વિડિઓ ક callલ સૂચનાઓ:",
    video_please_note: "મહેરબાની કરીને નોંધ કરો: નબળી છબી / વિડિઓ ગુણવત્તામાં ભૂલો થઈ શકે છે",
    video_ins1: "કૃપા કરીને ખાતરી કરો કે તમે વિડિઓ ક callલમાં એકલા છો.",
    video_ins2: "વિડિઓ ક callલ દરમિયાન પૃષ્ઠભૂમિ સાદી હોવી જોઈએ.",
    video_ins3: "રૂમમાં પૂરતો પ્રકાશ હોવો જોઈએ.",
    video_ins4: "હંમેશા ખાતરી કરો કે તમે પૃષ્ઠભૂમિ અવાજ ટાળવા માટે તમારા ચહેરા સાથે 70% સ્ક્રીનને આવરીને ક theમેરાનો સામનો કરી રહ્યાં છો.",
    video_ins5: "ફોટો કuringપ્ચરિંગ પ્રક્રિયા દરમિયાન મોશન અસ્પષ્ટ અસરને ટાળો.",
    video_ins6: "ફોટો કેપ્ચર કરવાની પ્રક્રિયા દરમિયાન તમારી આંખો ખુલી રાખો.",
    agent_disconnected: "એજન્ટે વિડિઓ ક Callલને ડિસ્કનેક્ટ કર્યો છે.",
    are_you_sure: "શું તમે ખરેખર વિડિઓ ક Callલને ડિસ્કનેક્ટ કરવા માંગો છો?",
    no: "ના",
    yes: "હા",
    // =================================
    //              END
    // =================================
    end_title: "પ્રક્રિયાની સમાપ્તિ",
    stage: "સ્ટેજ",
    status: "સ્થિતિ",
    qtn_ans: "વિડિઓ ક Callલ પ્રશ્ન અને જવાબ",
    photo_capture: "વિડિઓ ક Callલમાં ફોટો કેપ્ચર",
    banker_remark: "વી-સીઆઈપી માટે બેંકરની ટિપ્પણી",
    auditor_remark: "વી-સીઆઈપી માટે ઓડિટરની ટિપ્પણી",
    home: "ખેર",
    close:"બંધ",
    failed: "નિષ્ફળ",
    successful: "સફળ",
    pending: "બાકી",
    completed: "પૂર્ણ",
    approved: "મંજુર",
    rejected: "નામંજૂર",
    waiting: "એજન્ટની મંજૂરીની રાહ જુએ છે.",
    // =============POPUP===============
    end_content1: "તમારી વિડિઓ-કેવાયસી અપૂર્ણ છે, કૃપા કરીને સત્ર ચાલુ રાખો અને પ્રક્રિયા પૂર્ણ કરો.",
    end_content2: "કૃપા કરીને તમારા ભાવિ સંદર્ભ માટે વી-સીઆઇપી આઈડી નોંધો",
    end_status21: "અમારી સાથે વિડિઓ-કેવાયસી પ્રક્રિયા પૂર્ણ કરવા બદલ આભાર. તમારી વી-સીઆઇપી આઈડી",
    end_status22: "અમારા બેંકર દ્વારા મંજૂરી આપવામાં આવી છે. અમે તમારા વી-સીઆઇપી આઈડી માટે itorડિટરની મંજૂરીની રાહ જોઈ રહ્યા છીએ. અમે ટૂંક સમયમાં અંતિમ સ્થિતિ શેર કરીશું.",
    end_status31: "અમને તમને જાણ કરવા બદલ ખેદ છે કે તમારી વી-સીઆઇપી આઈડી",
    end_status32: "અમારા બેન્કર દ્વારા નકારી કા .વામાં આવી છે. અમે તમને બધી સાચી વિગતો સાથે પ્રક્રિયાને ફરીથી ચાલુ કરવા વિનંતી કરીએ છીએ.",
    end_status41: "તમારા વી-સીઆઇપી આઈડી માટે અંતિમ મંજૂરી",
    end_status42: "itorડિટર પાસેથી પ્રાપ્ત થયું છે.",
    end_status51: "તમને જાણ કરવા બદલ અમને ખેદ છે કે તમારી વી-સીઆઇપી આઈડી",
    end_status52: "અમારા itorડિટર દ્વારા નકારી કા .વામાં આવી છે. અમે તમને બધી સાચી વિગતો સાથે પ્રક્રિયાને ફરીથી ચાલુ કરવા વિનંતી કરીએ છીએ.",
    end_status_21: "તમારો V-CIP ID",
    end_status_22: "ખોટી વિગતોને કારણે અમારા બેંકર દ્વારા નકારી કા .વામાં આવી છે. અમે તમને વિનંતી કરી છે કે સમાન મોબાઇલ નંબર સાથે ફરીથી નોંધણી કરો અને બધી સાચી વિગતો સાથે નવી પ્રક્રિયા શરૂ કરો. તમે વી-સીઆઈપી પ્રક્રિયા દ્વારા canક્સેસ કરી શકો છો",
    end_status11321: `${clientname} સાથે વિડિઓ-કેવાયસી પ્રક્રિયા પૂર્ણ કરવા બદલ આભાર. અમે તમારા વી-સીઆઇપી આઈડી માટે બેંકર અને itorડિટરની મંજૂરીની રાહ જોઈ રહ્યા છીએ. તમારી વી-સીઆઇપી આઈડી માટેની અંતિમ સ્થિતિ તમને એસએમએસ દ્વારા શેર કરવામાં આવશે. તમારો રજિસ્ટર્ડ મોબાઈલ નંબર. તમે અપડેટ કરેલી સ્થિતિ તપાસવા માટે તે જ વેબ-લિંક પર કોઈપણ સમયે ફરી શકો છો. `,
    end_status11111: "તમારી વિડિઓ-કેવાયસી અપૂર્ણ છે, કૃપા કરીને સત્ર ચાલુ રાખો અને પ્રક્રિયા પૂર્ણ કરો.",
    // =================================
    //              Reschedule
    // =================================
    Confirm: "Confirm",
    Schedule_Details: "Schedule Details",
    Cancel_Schedule: "Cancel Schedule",
    Change_language: "Change language",
    Schedule_note: "The Token Number is assigned based on the availability of the online agents.",
    Reschedule: "Reschedule",
    select_date: "Select new date for video call session",
    select_time: "Select available time slots",
    only_reschedule: "you can only reschedule the call once in 6 hours",
    Select_Language: "Select Language",
    Please_select: "Please select the language for the video call",

}

export default en;