const clientname = sessionStorage.getItem("clientname");

const en = {
    title: " वापरकर्ता ऑनबोर्डिंग प्रक्रिया",
    subtitle: "व्हिडिओ केवायसी प्रारंभ करा",
    // =============SIDEBAR===============
    start: "प्रारंभ",
    aadhar_verification: "आधार सत्यापन",
    pan_verification: "पॅन सत्यापन",
    chat_initial_video: "चॅट करा आणि व्हिडिओ कॉल आरंभ करा",
    end: "समाप्त",
    // =================================
    //              START
    // =================================
    select_language: "भाषा निवडा",
    new_user: "नवीन वापरकर्ता",
    continue_prev: "मागील सत्र सुरू ठेवा",
    contact_number: "मागील सत्र सुरू ठेवा",
    send_otp: "ओटीपी पाठवा",
    otp: "ओटीपी",
    proceed: "पुढे जा",
    enter_vcip_no: "व्हीसीपी क्रमांक किंवा मोबाइल क्रमांक प्रविष्ट करा",
    receive_otp: "संपर्क क्रमांक व्हीटीपी प्राप्त करा",
    havent_receive_otp: "ओटीपी मिळाला नाही का? पुन्हा पाठवा",
    user_guide: "वापरकर्ता मार्गदर्शक",
    instructions: "सूचना",
    ins1: "वापरकर्ता' नवीन वापरकर्त्या 'वर क्लिक करून नवीन व्हिडिओ केवायसी सत्र सुरू करू शकतो. ग्राहकाने त्याचा सक्रिय मोबाइल नंबर सादर करावा आणि ओटीपी प्रमाणीकरण करणे आवश्यक आहे. पुढे, पुढे जा वर क्लिक करा.",
    ins2: "नवीन वापरकर्त्याला स्वयंचलितपणे व्युत्पन्न केलेला व्ही-सीआयपी आयडी वाटप केला जाईल. समान व्ही-सीआयपी आयडी वापरकर्त्यासह एसएमएसद्वारे सामायिक केला जाईल.",
    ins3: "वापरकर्त्यास संमती पृष्ठावर उपलब्ध तपशील काळजीपूर्वक वाचण्याची आवश्यकता आहे आणि संमती मान्य करावी लागेल आणि ती सबमिट करावी लागेल.",
    ins4: "पुढील चरण वापरकर्त्यासाठी आधार सत्यापन असेल. वापरकर्ता ओटीपी आधारित आधार ई-केवायसी प्रमाणीकरण किंवा ऑफलाइन केवायसी एकतर पुढे जाऊ शकतो. एक्सएमएल फाइल किंवा आधार सुरक्षित क्यूआर कोड वापरुन आधारची ऑफलाइन पडताळणी झाल्यास याची खात्री केली जाईल. एक्सएमएल फाइल किंवा क्यूआर कोड व्युत्पन्न तारीख व्ही-सीआयपी बाहेर आणल्याच्या तारखेपासून 3 दिवसांपेक्षा जुनी नाही. अधिक माहिती ",
    ins5: "आधार पडताळणीनंतरची पुढची पायरी म्हणजे पॅन पडताळणी. या चरणात वापरकर्त्याने त्याच्या पॅन कार्डचे फोटो अपलोड करणे आवश्यक आहे आणि पॅन कार्ड तपशीलात क्रॉस-व्हॅलिडेट करणे आवश्यक आहे.",
    ins6: "आधार आणि पॅन कार्डच्या यशस्वी प्रमाणीकरणानंतर वापरकर्त्याने बँकरबरोबर व्हिडिओ कॉन्फरन्सिंग सत्रामध्ये उपस्थित रहाणे आवश्यक आहे.",
    ins7: "व्हिडिओ कॉन्फरन्सिंग सत्रादरम्यान वापरकर्त्यास प्रश्न-उत्तर सत्र (प्रश्नोत्तर) सत्रामधून जाण्याची आवश्यकता आहे.",
    ins8: "प्रश्नोत्तरांच्या सत्रानंतर चेहरा सामना करण्यासाठी आणि लाइव्हनेस तपासणीसाठी वापरकर्त्याचे थेट छायाचित्र घेतले जाईल.",
    please_note: "कृपया लक्षात ठेवा:",
    ins9: " मागील सत्र सुरू ठेवा 'वर क्लिक करुन वापरकर्ता व्हिडिओ केवायसी सुरू ठेवू शकतो.",
    ins10: "वापरकर्त्यास जुना व्ही-सीआयपी क्रमांक सबमिट करणे आवश्यक आहे.",
    ins11: "वापरकर्त्याने थेट सत्र सोडल्याच्या पृष्ठावर जाईल.",
    ins12: "एक्सएमएल फाइल किंवा आधार सुरक्षित क्यूआर कोड वापरुन आधारची ऑफलाइन पडताळणी झाल्यास, हे सुनिश्चित केले जाईल की एक्सएमएल फाइल किंवा क्यूआर कोड निर्मितीची तारीख मागील व्ही-सीआयपी सत्राच्या तारखेपासून 3 दिवसांपेक्षा जुनी नाही. अधिक माहिती ",
    click_here: "इथे क्लिक करा",
    // =============POPUP===============
    generated_vcip: "व्युत्पन्न व्ही-सीआयपी आयडी",
    model_ins1: "आपला व्ही-सीआयपी आयडी आपल्या मोबाइल नंबरवर सामायिक केला गेला आहे. जर आपण व्हिडीओ-केवायसी प्रक्रियेच्या मध्यभागी सोडला असेल तर आपण समान व्ही-सीआयपी आयडी सबमिट करुन आपले सत्र पुन्हा सुरू करू शकता.",
    model_ins2: "कृपया भविष्यात कोणत्याही फसवणूकीचा प्रतिबंध टाळण्यासाठी आपला व्ही-सीआयपी आयडी गोपनीय ठेवा.",
    model_ins3: "कृपया आपल्या भावी संदर्भासाठी व्ही-सीआयपी आयडी नोंदवा",
    alert: "सतर्क",
    alert_msg: "हा अनुप्रयोग फक्त डेमो उद्देशाने होस्ट केलेला आहे. डेमो दरम्यान वापरलेली सर्व माहिती 24 तासांनंतर स्वयंचलितपणे हटविली जाईल.",
    // =================================
    //       Aadhaar Verification
    // =================================
    adr_title: "आधार सत्यापन",
    proceed_with: "पुढे जा",
    otp_kyc: "OTP based e-KYC",
    offline_kyc: "ऑफलाइन केवायसी",
    help: "मदत",
    qtn1: "ओटीपी बेस्ड ई-कायक म्हणजे काय??",
    ans1: "आधार आधारित ई-केवायसी ही इलेक्ट्रॉनिक, १००% पेपरलेस प्रक्रिया आहे ज्यांना वापरकर्त्यांनी त्यांचा आधार क्रमांक वापरुन केवायसी औपचारिकता पार पाडली आहे.",
    qtn2: "ऑफलाइन केसी म्हणजे काय??",
    ans2: `ऑफलाइन केवायसी हा केवायसीचा एक मोड आहे ज्यामुळे वापरकर्त्याने आधार कार्डची फोटो कॉपी देण्याची आवश्यकता दूर केली आणि त्याऐवजी केवायसी एक्सएमएल / क्यूआर कोड डाउनलोड करू शकेल आणि ${clientname} ला त्याचे केवायसी करण्यासाठी ${clientname} विल सत्यापित करू शकेल. केवायसीचा तपशील वापरकर्त्याने सामायिक केला आहे. केवायसी तपशील मशीन रीडेबल एक्सएमएलमध्ये आहे ज्यावर यूआयडीएआयने डिजिटल स्वाक्षरी केली आहे ज्यामुळे एजन्सी त्याची सत्यता पडताळून पाहता आणि कोणतीही छेडछाड शोधून काढू शकते. `,
    // =============POPUP===============
    user_content: "वापरकर्त्याची संमती",
    content1: "आपले बँकर्ससह व्हिडिओ संवाद सत्र रेकॉर्डिंग मोडमध्ये असेल.",
    content2: "बँकरबरोबर व्हिडिओ संवाद सत्रादरम्यान एक थेट छायाचित्र टिपला जाईल.",
    content3: "आपले आधार तपशील व्ही-सीआयपी प्रक्रियेतील आधार सत्यापनासाठी वापरले जातील.",
    content4: "व्ही-सीआयपी प्रक्रियेमध्ये पॅन सत्यापन करण्यासाठी आपल्या पॅन कार्डचा एक फोटो गोळा केला जाईल.",
    content5: "आपले थेट स्थान व्ही-सीआयपी प्रक्रियेमध्ये मिळविले जाईल.",
    content6: "आपण व्हिडिओ संवाद सत्रादरम्यान सर्व तपशील बरोबर असल्याचे सुनिश्चित केले पाहिजे.",
    content7: "आधार एक्सएमएल पॅकेट किंवा आधार सुरक्षित क्यूआर कोड 3 दिवसांपेक्षा मोठा नसावा.",
    content_cdtn1: "मी, व्ही-सीआयपी आयडी",
    content_cdtn2: " धारक वर नमूद केलेल्या सर्व मुद्द्यांशी सहमत आहे आणि याद्वारे, माझ्या संमतीची पुष्टी करतो.",
    // =================================
    //  OTP Based Aadhaar Verification
    // =================================
    adr_otp_title: "आधार सत्यापन ओटीपी आधारित ई-कियॅक",
    adr_number: "आधार क्रमांक",
    sms: "एसएमएस",
    email: "ईमेल",
    both: "दोन्ही",
    get_ekyc: "ई-केसी मिळवा",
    adr_details:"आधार तपशील",
    name: "नाव",
    fname: "वडिलांचे नाव",
    dob: "जन्म तारीख",
    addr: "पत्ता",
    photo: "छायाचित्र",
    back: "मागे",
    // =================================
    //          OFFLINE KYC
    // =================================
    offline_title: "आधार सत्यापन ऑफलाइन केवायसी",
    video: "ट्यूटोरियल व्हिडिओ",
    drag_drop: "फाईल येथे ड्रॅग आणि ड्रॉप करा",
    or: "किंवा ",
    OR: "किंवा",
    click_file: "फाईल जोडण्यासाठी क्लिक करा",
    upolad_either: "एकतर ई-केवायसी एक्सएमएल किंवा ई-आधार पीडीएफ अपलोड करा",
    zip_password: "कृपया पिन संकेतशब्द प्रविष्ट करा",
    submit: "प्रस्तुत करणे",
    resubmit: "पुन्हा सबमिट करा",    
    dont_have: "नवीनतम ई-केवायसी एक्सएमएल किंवा ई-आधार पीडीएफ नाही",
    download_xml: "यूआयडीएआय वेबसाइटवरून ई-केवायसी एक्सएमएल डाउनलोड करण्यासाठी",
    download_pdf: "यूआयडीएआय वेबसाइटवरून ई-केवायसी पीडीएफ डाउनलोड करण्यासाठी",   
    help_center: "मदत केंद्र",
    ekyc: "आधार पेपरलेस ई-केवायसी",
    ekycPdf: "ई-आधार पीडीएफ",
    step1: "पुनर्निर्देशित",
    step2: "आधार क्रमांक किंवा व्हीआयडी प्रविष्ट करा",
    step3: "नोंदणीकृत मोबाइल क्रमांकाद्वारे ओटीपी प्रमाणीकरण करा.",
    step4: "संकेतशब्द संरक्षित ई-केआयसी एक्सएमएल डाउनलोड करा.",
    step5: "आधार क्रमांक किंवा व्हीआयडी किंवा ईआयडी प्रविष्ट करा",
    step6: "संकेतशब्द संरक्षित eAhahaar पीडीएफ डाउनलोड करा",
    note1: "आपल्या पेपरलेस ऑफलाइन ईकेवायसीसाठी यूआयडीएआय पोर्टलमध्ये एक्सएमएल व्युत्पन्न करताना संकेतशब्द समान शेअरी कोड आहे.",
    note2: "संकेतशब्द हे आपल्या नावाच्या पहिल्या चार अक्षराचे (आधार प्रमाणे) अक्षरे आणि eAhaar पीडीएफच्या YYYY स्वरूपात जन्म वर्षाचे संयोजन आहे.",
    // =================================
    //              PAN
    // =================================
    pan_title: "पॅन सत्यापन",
    pan_card: "पॅन कार्ड",
    pan_card1: "Upload E-PAN(PDF)",
    capture_pan: "पॅन कार्ड प्रतिमा कॅप्चर करा",
    pan_ins1: "अपलोड केलेली प्रतिमा केवळ JPG / JPEG / PNG स्वरूपात असावी",
    pan_ins2: "प्रतिमेचा आकार 30kb ते 100mb दरम्यान असावा.",
    pan_ins3: "प्रतिमेची रुंदी to०० ते 000००० च्या दरम्यान असावी आणि प्रतिमांची उंची between००० ते 000००० च्या दरम्यान असावी",
    pan_ins4: "कृपया पॅनकार्डची पुढची बाजू अपलोड करा",
    pan_ins5: "हस्तगत केलेली प्रतिमा अस्पष्ट होऊ नये",
    pan_ins6: "प्रतिमा सपाट कोनात पकडली पाहिजे आणि कोन वाकवू नये.",
    pan_qtn: "पॅन तपशील काय आहेत??",
    pan_ans: "पॅन तपशील म्हणजे अपलोड केलेल्या पॅन कार्डमधून काढलेली माहिती. डेटा चुकीच्या पद्धतीने आणल्यास वापरकर्ता काढलेली माहिती संपादित करू शकतो.",
    pan_success: "पॅन सत्यापन यशस्वी",
    pan_wait: "कृपया प्रतीक्षा करा, आम्ही आपल्याला पुढच्या टप्प्यावर घेऊन जात आहोत",
    // =================================
    //              CHAT
    // =================================
    token: "टोकन क्रमांक आहे:",
    join: "आता सामील व्हा",   
    video_call_process: "व्हिडिओ कॉल प्रक्रियेत आहे",
    under_recording_mode: "आपण व्हिडिओ रेकॉर्डिंग मोड अंतर्गत आहात, पृष्ठ रीलोड करू नका *",
    user: "वापरकर्ता",
    please_wait: "कृपया थांबा...",
    waiting_for_banker: "बॅंकर व्हिडिओ कॉलमध्ये सामील होण्यासाठी प्रतीक्षा करीत आहे",
    video_instruction: "व्हिडिओ कॉल सूचना:",
    video_please_note: "कृपया लक्षात ठेवा: खराब प्रतिमा / व्हिडिओ गुणवत्तेमुळे त्रुटी येऊ शकतात",
    video_ins1: "कृपया आपण व्हिडिओ कॉलमध्ये एकटे असल्याची खात्री करा.",
    video_ins2: "व्हिडिओ कॉल दरम्यान पार्श्वभूमी साधा असावी.",
    video_ins3: "खोलीत पुरेसा प्रकाश असावा.",
    video_ins4: "पार्श्वभूमीचा आवाज टाळण्यासाठी आपल्या चेहर्‍यासह 70% स्क्रीन व्यापून आपण कॅमेर्‍याचा सामना करीत असल्याचे नेहमी सुनिश्चित करा.",
    video_ins5: "फोटो कॅप्चरिंग प्रक्रियेदरम्यान मोशन अस्पष्ट प्रभाव टाळा.",
    video_ins6: "फोटो कॅप्चरिंग प्रक्रियेदरम्यान आपले डोळे उघडे ठेवा.",
    agent_disconnected: "एजंटने व्हिडिओ कॉल डिस्कनेक्ट केला आहे.",
    are_you_sure: "आपणास खात्री आहे की आपण व्हिडिओ कॉल डिस्कनेक्ट करू इच्छिता?",
    no: "नाही",
    yes: "होय",
    // =================================
    //              END
    // =================================
    end_title: "प्रक्रिया समाप्त",
    stage: "स्टेज",
    status: "स्थिती",
    qtn_ans: "व्हिडिओ कॉल प्रश्न आणि उत्तर",
    photo_capture: "व्हिडिओ कॉलमध्ये फोटो कॅप्चर",
    banker_remark: "व्ही-सीआयपीसाठी बँकर्सची टिप्पणी",
    auditor_remark: "व्ही-सीआयपीसाठी लेखापरीक्षकाची टिप्पणी",
    home: "मुख्यपृष्ठ",
    close:"बंद",
    failed: "अयशस्वी",
    successful: "यशस्वी",
    pending: "प्रलंबित",
    completed: "पूर्ण",
    approved: "मंजूर",
    rejected: "नाकारले",
    waiting: "एजंट मंजुरीची प्रतीक्षा करीत आहे.",
    // =============POPUP===============
    end_content1: "आपला व्हिडिओ-केवायसी अपूर्ण आहे, कृपया सत्र सुरू ठेवा आणि प्रक्रिया पूर्ण करा.",
    end_content2: "कृपया आपल्या भावी संदर्भासाठी व्ही-सीआयपी आयडी नोंदवा",
    end_status21: "आमच्यासह व्हिडिओ-केवायसी प्रक्रिया पूर्ण केल्याबद्दल धन्यवाद. आपला व्ही-सीआयपी आयडी",
    end_status22: "आमच्या बँकरद्वारे मान्यता देण्यात आली आहे. आम्ही आपल्या व्ही-सीआयपी आयडीसाठी लेखापरीक्षकाच्या मान्यतेची वाट पाहत आहोत. आम्ही लवकरच अंतिम स्थिती सामायिक करू.",
    end_status31: "आपला V-CIP आयडी आपल्याला कळविल्याबद्दल आम्ही दिलगीर आहोत",
    end_status32: "आमच्या बँकरने नकार दिला आहे. सर्व योग्य तपशीलांसह प्रक्रिया पुन्हा चालू करण्याची विनंती आम्ही आपणास करतो.",
    end_status41: "आपल्या व्ही-सीआयपी आयडीला अंतिम मंजुरी",
    end_status42: "ऑडिटरकडून प्राप्त झाले आहे.",
    end_status51: "आपला V-CIP आयडी आपल्याला कळविल्याबद्दल आम्ही दिलगीर आहोत",
    end_status52: "आमच्या लेखा परीक्षकास नकार दिला गेला आहे. सर्व योग्य तपशीलांसह प्रक्रिया पुन्हा सुरू करण्याची विनंती आम्ही आपणास करतो.",
    end_status_21: "आपला व्ही-सीआयपी आयडी",
    end_status_22: "चुकीच्या तपशीलांमुळे आमच्या बँकरने नकार दिला आहे. आम्ही आपल्याला त्याच मोबाइल नंबरवर पुन्हा नोंदणी करावी आणि सर्व योग्य तपशीलांसह नवीन प्रक्रिया सुरू करण्याची विनंती करतो. आपण व्ही-सीआयपी प्रक्रियेवर प्रवेश करू शकता",
    end_status11321: `${clientname} सह व्हिडीओ-केवायसी प्रक्रिया पूर्ण केल्याबद्दल धन्यवाद. आम्ही तुमच्या व्ही-सीआयपी आयडीसाठी बॅंकर आणि ऑडिटरकडून मंजूरीची प्रतीक्षा करीत आहोत. तुमच्या व्ही-सीआयपी आयडीची अंतिम स्थिती तुम्हाला एसएमएसद्वारे सामायिक केली जाईल. आपला नोंदणीकृत मोबाइल नंबर. आपण अद्यतनित स्थिती तपासण्यासाठी कधीही त्याच वेब-दुव्यावर पुन्हा भेट देऊ शकता. `,
    end_status11111: "आपला व्हिडिओ-केवायसी अपूर्ण आहे, कृपया सत्र सुरू ठेवा आणि प्रक्रिया पूर्ण करा.",
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