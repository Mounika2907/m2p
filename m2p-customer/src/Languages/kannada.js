
const clientname = sessionStorage.getItem("clientname");

const en = {
    title: " ಬಳಕೆದಾರರ ಆನ್‌ಬೋರ್ಡಿಂಗ್ ಪ್ರಕ್ರಿಯೆ",
    subtitle: "ವೀಡಿಯೊ ಪ್ರಾರಂಭಿಸಿ ಕೆವೈಸಿ",
    // =============SIDEBAR===============
    start: "ಪ್ರಾರಂಭಿಸಿ",
    aadhar_verification: "ಆಧಾರ್ ಪರಿಶೀಲನೆ",
    pan_verification: "ಪ್ಯಾನ್ ಪರಿಶೀಲನೆ",
    chat_initial_video: "ವೀಡಿಯೊ ಕರೆಯನ್ನು ಚಾಟ್ ಮಾಡಿ ಮತ್ತು ಪ್ರಾರಂಭಿಸಿ",
    end: "ಅಂತ್ಯ",
    // =================================
    //              START
    // =================================
    select_language: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    new_user: "ಹೊಸ ಬಳಕೆದಾರ",
    continue_prev: "ಹಿಂದಿನ ಅಧಿವೇಶನವನ್ನು ಮುಂದುವರಿಸಿ",
    contact_number: "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ",
    send_otp: "ಒಟಿಪಿ ಕಳುಹಿಸಿ",
    otp: "ಒಟಿಪಿ",
    proceed: "ಮುಂದುವರೆಯಲು",
    enter_vcip_no: "Vcip ಸಂಖ್ಯೆ ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
    receive_otp: "ಸಂಪರ್ಕ ಸಂಖ್ಯೆಯ ಮೂಲಕ ಒಟಿಪಿ ಸ್ವೀಕರಿಸಿ",
    havent_receive_otp: "ಒಟಿಪಿ ಸ್ವೀಕರಿಸಿಲ್ಲವೇ? ಮತೊಮ್ಮೆ ಕಳುಹಿಸಿ",
    user_guide: "ಬಳಕೆದಾರ ಕೈಪಿಡಿ",
    instructions: "ಸೂಚನೆಗಳು",
    ins1: "“ಹೊಸ ಬಳಕೆದಾರ” ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ ಬಳಕೆದಾರರು ಹೊಸ ವೀಡಿಯೊ ಕೆವೈಸಿ ಅಧಿವೇಶನವನ್ನು ಪ್ರಾರಂಭಿಸಬಹುದು. ಗ್ರಾಹಕರು ಅವನ / ಅವಳ ಸಕ್ರಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ಸಲ್ಲಿಸಬೇಕು ಮತ್ತು ಒಟಿಪಿ ಮೌಲ್ಯಮಾಪನವನ್ನು ಮಾಡಬೇಕಾಗುತ್ತದೆ. ಮುಂದೆ, ಪ್ರೊಸೀಡ್ ಕ್ಲಿಕ್ ಮಾಡಿ.",
    ins2: "ಸ್ವಯಂಚಾಲಿತವಾಗಿ ರಚಿಸಲಾದ ವಿ-ಸಿಐಪಿ ಐಡಿಯನ್ನು ಹೊಸ ಬಳಕೆದಾರರಿಗೆ ಹಂಚಲಾಗುತ್ತದೆ. ಅದೇ ವಿ-ಸಿಐಪಿ ಐಡಿಯನ್ನು ಎಸ್‌ಎಂಎಸ್ ಮೂಲಕ ಬಳಕೆದಾರರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತದೆ.",
    ins3: "ಬಳಕೆದಾರರು ಒಪ್ಪಿಗೆ ಪುಟದಲ್ಲಿ ಲಭ್ಯವಿರುವ ವಿವರಗಳನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಓದಬೇಕು ಮತ್ತು ಒಪ್ಪಿಗೆ ಮತ್ತು ಒಪ್ಪಿಗೆಯನ್ನು ಸಲ್ಲಿಸಬೇಕು.",
    ins4: "ಮುಂದಿನ ಹಂತವು ಬಳಕೆದಾರರಿಗೆ ಆಧಾರ್ ಪರಿಶೀಲನೆಯಾಗಿದೆ. ಬಳಕೆದಾರರು ಒಟಿಪಿ ಆಧಾರಿತ ಆಧಾರ್ ಇ-ಕೆವೈಸಿ ದೃ hentic ೀಕರಣ ಅಥವಾ ಆಫ್‌ಲೈನ್ ಕೆವೈಸಿ ಯೊಂದಿಗೆ ಮುಂದುವರಿಯಬಹುದು. ಎಕ್ಸ್‌ಎಂಎಲ್ ಫೈಲ್ ಅಥವಾ ಆಧಾರ್ ಸುರಕ್ಷಿತ ಕ್ಯೂಆರ್ ಕೋಡ್ ಬಳಸಿ ಆಧಾರ್‌ನ ಆಫ್‌ಲೈನ್ ಪರಿಶೀಲನೆಯ ಸಂದರ್ಭದಲ್ಲಿ, ವಿ-ಸಿಐಪಿಯನ್ನು ನಿರ್ವಹಿಸುವ ದಿನಾಂಕದಿಂದ ಎಕ್ಸ್‌ಎಂಎಲ್ ಫೈಲ್ ಅಥವಾ ಕ್ಯೂಆರ್ ಕೋಡ್ ಉತ್ಪಾದನೆಯ ದಿನಾಂಕವು 3 ದಿನಗಳಿಗಿಂತ ಹಳೆಯದಲ್ಲ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಬೇಕು. ಹೆಚ್ಚಿನ ಮಾಹಿತಿ",
    ins5: "ಆಧಾರ್ ಪರಿಶೀಲನೆಯ ನಂತರದ ಮುಂದಿನ ಹಂತವೆಂದರೆ ಪ್ಯಾನ್ ಪರಿಶೀಲನೆ. ಈ ಹಂತದಲ್ಲಿ ಬಳಕೆದಾರನು ತನ್ನ ಪ್ಯಾನ್ ಕಾರ್ಡ್‌ನ photograph ಾಯಾಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಬೇಕಾಗುತ್ತದೆ ಮತ್ತು ಪ್ಯಾನ್ ಕಾರ್ಡ್ ವಿವರವನ್ನು ಅಡ್ಡ-ಮೌಲ್ಯೀಕರಿಸಬೇಕು.",
    ins6: "ಆಧಾರ್ ಮತ್ತು ಪ್ಯಾನ್ ಕಾರ್ಡ್‌ನ ಯಶಸ್ವಿ ಮೌಲ್ಯಮಾಪನದ ನಂತರ, ಬಳಕೆದಾರರು ಬ್ಯಾಂಕರ್‌ನೊಂದಿಗೆ ವೀಡಿಯೊ ಕಾನ್ಫರೆನ್ಸಿಂಗ್ ಸೆಷನ್‌ಗೆ ಹಾಜರಾಗಬೇಕು.",
    ins7: "ವೀಡಿಯೊ ಕಾನ್ಫರೆನ್ಸಿಂಗ್ ಅಧಿವೇಶನದಲ್ಲಿ ಬಳಕೆದಾರರು ಪ್ರಶ್ನೋತ್ತರ (ಪ್ರಶ್ನೋತ್ತರ) ಅಧಿವೇಶನದ ಮೂಲಕ ಹೋಗಬೇಕಾಗುತ್ತದೆ.",
    ins8: "ಪ್ರಶ್ನೋತ್ತರ ಅಧಿವೇಶನದ ನಂತರ ಫೇಸ್ ಮ್ಯಾಚ್ ಮತ್ತು ಲೈವ್ನೆಸ್ ಚೆಕ್ ಮಾಡಲು ಬಳಕೆದಾರರ ಲೈವ್ photograph ಾಯಾಚಿತ್ರವನ್ನು ತೆಗೆದುಕೊಳ್ಳಲಾಗುತ್ತದೆ.",
    please_note: "ದಯವಿಟ್ಟು ಗಮನಿಸಿ:",
    ins9: "'ಹಿಂದಿನ ಅಧಿವೇಶನವನ್ನು ಮುಂದುವರಿಸಿ' ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ ಬಳಕೆದಾರರು ವೀಡಿಯೊ ಕೆವೈಸಿಯನ್ನು ಮುಂದುವರಿಸಬಹುದು.",
    ins10: "ಬಳಕೆದಾರರು ಹಳೆಯ ವಿ-ಸಿಐಪಿ ಸಂಖ್ಯೆಯನ್ನು ಸಲ್ಲಿಸಬೇಕಾಗಿದೆ.",
    ins11: "ಅವರು ಅಧಿವೇಶನದಿಂದ ಹೊರಬಂದ ಪುಟಕ್ಕೆ ಬಳಕೆದಾರರನ್ನು ನೇರವಾಗಿ ಇಳಿಸಲಾಗುತ್ತದೆ.",
    ins12: "ಎಕ್ಸ್‌ಎಂಎಲ್ ಫೈಲ್ ಅಥವಾ ಆಧಾರ್ ಸುರಕ್ಷಿತ ಕ್ಯೂಆರ್ ಕೋಡ್ ಬಳಸಿ ಆಧಾರ್‌ನ ಆಫ್‌ಲೈನ್ ಪರಿಶೀಲನೆಯ ಸಂದರ್ಭದಲ್ಲಿ, ಹಿಂದಿನ ವಿ-ಸಿಐಪಿ ಅಧಿವೇಶನವನ್ನು ನಡೆಸುವ ದಿನಾಂಕದಿಂದ ಎಕ್ಸ್‌ಎಂಎಲ್ ಫೈಲ್ ಅಥವಾ ಕ್ಯೂಆರ್ ಕೋಡ್ ಉತ್ಪಾದನೆಯ ದಿನಾಂಕವು 3 ದಿನಗಳಿಗಿಂತ ಹಳೆಯದಲ್ಲ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಬೇಕು. ಹೆಚ್ಚಿನ ಮಾಹಿತಿ",
    click_here: "ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ",
    // =============POPUP===============
    generated_vcip: "ವಿ-ಸಿಐಪಿ ಐಡಿ ರಚಿಸಲಾಗಿದೆ",
    model_ins1: "ನಿಮ್ಮ ವಿ-ಸಿಐಪಿ ಐಡಿಯನ್ನು ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಹಂಚಿಕೊಳ್ಳಲಾಗಿದೆ. ಒಂದು ವೇಳೆ, ನೀವು ವೀಡಿಯೊ-ಕೆವೈಸಿ ಪ್ರಕ್ರಿಯೆಯ ಮಧ್ಯದಲ್ಲಿ ಇಳಿಯುತ್ತಿದ್ದರೆ ಅದೇ ವಿ-ಸಿಐಪಿ ಐಡಿಯನ್ನು ಸಲ್ಲಿಸುವ ಮೂಲಕ ನಿಮ್ಮ ಅಧಿವೇಶನವನ್ನು ಪುನರಾರಂಭಿಸಬಹುದು.",
    model_ins2: "ಭವಿಷ್ಯದಲ್ಲಿ ಯಾವುದೇ ವಂಚನೆ ಅಭ್ಯಾಸವನ್ನು ತಪ್ಪಿಸಲು ದಯವಿಟ್ಟು ನಿಮ್ಮ ವಿ-ಸಿಐಪಿ ಐಡಿಯನ್ನು ಗೌಪ್ಯವಾಗಿಡಿ.",
    model_ins3: "ನಿಮ್ಮ ಭವಿಷ್ಯದ ಉಲ್ಲೇಖಕ್ಕಾಗಿ ದಯವಿಟ್ಟು ವಿ-ಸಿಐಪಿ ಐಡಿಯನ್ನು ಗಮನಿಸಿ",
    alert: "ಅಲರ್ಟ್",
    alert_msg: "ಈ ಅಪ್ಲಿಕೇಶನ್ ಅನ್ನು ಡೆಮೊ ಉದ್ದೇಶಕ್ಕಾಗಿ ಮಾತ್ರ ಹೋಸ್ಟ್ ಮಾಡಲಾಗಿದೆ. ಡೆಮೊ ಸಮಯದಲ್ಲಿ ಬಳಸಲಾದ ಎಲ್ಲಾ ವಿವರಗಳನ್ನು 24 ಗಂಟೆಗಳ ನಂತರ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಅಳಿಸಲಾಗುತ್ತದೆ.",
    // =================================
    //       Aadhaar Verification
    // =================================
    adr_title: "ಆಧಾರ್ ಪರಿಶೀಲನೆ",
    proceed_with: "ಮುಂದುವರೆಸು",
    otp_kyc: "ಒಟಿಪಿ ಆಧಾರಿತ ಇ-ಕೆವೈಸಿ",
    offline_kyc: "ಆಫ್‌ಲೈನ್ ಕೆವೈಸಿ",
    help: "ಸಹಾಯ",
    qtn1: "ಒಟಿಪಿ ಆಧಾರಿತ ಇ-ಕೈಕ್ ಎಂದರೇನು?",
    ans1: "ಆಧಾರ್ ಆಧಾರಿತ ಇ-ಕೆವೈಸಿ ಎಲೆಕ್ಟ್ರಾನಿಕ್, 100% ಕಾಗದರಹಿತ ಪ್ರಕ್ರಿಯೆಯಾಗಿದ್ದು, ಬಳಕೆದಾರರು ತಮ್ಮ ಆಧಾರ್ ಸಂಖ್ಯೆಯನ್ನು ಬಳಸಿಕೊಂಡು ತಮ್ಮ ಕೆವೈಸಿ formal ಪಚಾರಿಕತೆಯನ್ನು ನಿರ್ವಹಿಸುತ್ತಾರೆ.",
    qtn2: "ಆಫ್‌ಲೈನ್ ಕೈಕ್ ಎಂದರೇನು?",
    ans2: `ಆಫ್‌ಲೈನ್ ಕೆವೈಸಿ ಎನ್ನುವುದು ಕೆವೈಸಿ ಯ ಒಂದು ಮೋಡ್ ಆಗಿದ್ದು, ಬಳಕೆದಾರರು ಆಧಾರ್ ಕಾರ್ಡ್‌ನ ಫೋಟೋ ನಕಲನ್ನು ಒದಗಿಸುವ ಅಗತ್ಯವನ್ನು ನಿವಾರಿಸುತ್ತದೆ ಮತ್ತು ಬದಲಾಗಿ ಬಳಕೆದಾರರು ಕೆವೈಸಿ ಎಕ್ಸ್‌ಎಂಎಲ್ / ಕ್ಯೂಆರ್ ಕೋಡ್ ಅನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಬಹುದು ಮತ್ತು ಅವನ / ಅವಳ ಕೆವೈಸಿ ನಿರ್ವಹಿಸಲು ${clientname}‌ಗೆ ಅದೇ ಒದಗಿಸಬಹುದು. ಬಳಕೆದಾರರು ಹಂಚಿಕೊಂಡ KYC ವಿವರಗಳನ್ನು ${clientname} ವಿಲ್ ಪರಿಶೀಲಿಸುತ್ತದೆ. ಕೆವೈಸಿ ವಿವರಗಳು ಯಂತ್ರ ಓದಬಲ್ಲ ಎಕ್ಸ್‌ಎಂಎಲ್‌ನಲ್ಲಿವೆ, ಇದನ್ನು ಯುಐಡಿಎಐ ಡಿಜಿಟಲ್ ಸಹಿ ಮಾಡಿದೆ, ಅದರ ಸತ್ಯಾಸತ್ಯತೆಯನ್ನು ಪರಿಶೀಲಿಸಲು ಮತ್ತು ಯಾವುದೇ ಟ್ಯಾಂಪರಿಂಗ್ ಅನ್ನು ಕಂಡುಹಿಡಿಯಲು ಏಜೆನ್ಸಿಯನ್ನು ಅನುಮತಿಸುತ್ತದೆ.`,
    // =============POPUP===============
    user_content: "ಬಳಕೆದಾರರ ಒಪ್ಪಿಗೆ",
    content1: "ಬ್ಯಾಂಕರ್‌ನೊಂದಿಗಿನ ನಿಮ್ಮ ವೀಡಿಯೊ ಸಂವಹನ ಸೆಷನ್ ರೆಕಾರ್ಡಿಂಗ್ ಮೋಡ್‌ನಲ್ಲಿರುತ್ತದೆ.k",
    content2: "ಬ್ಯಾಂಕರ್‌ನೊಂದಿಗಿನ ವೀಡಿಯೊ ಸಂವಾದದ ಅವಧಿಯಲ್ಲಿ ಲೈವ್ ograph ಾಯಾಚಿತ್ರವನ್ನು ಸೆರೆಹಿಡಿಯಲಾಗುತ್ತದೆ.",
    content3: "ವಿ-ಸಿಐಪಿ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ಆಧಾರ್ ಪರಿಶೀಲನೆಗಾಗಿ ನಿಮ್ಮ ಆಧಾರ್ ವಿವರಗಳನ್ನು ಬಳಸಲಾಗುತ್ತದೆ.",
    content4: "ವಿ-ಸಿಐಪಿ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ಪ್ಯಾನ್ ಪರಿಶೀಲನೆ ಮಾಡಲು ನಿಮ್ಮ ಪ್ಯಾನ್ ಕಾರ್ಡ್‌ನ photograph ಾಯಾಚಿತ್ರವನ್ನು ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ.",
    content5: "ವಿ-ಸಿಐಪಿ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ನಿಮ್ಮ ಲೈವ್ ಸ್ಥಳವನ್ನು ಸೆರೆಹಿಡಿಯಲಾಗುತ್ತದೆ.",
    content6: "ವೀಡಿಯೊ ಸಂವಹನ ಅಧಿವೇಶನದಲ್ಲಿ ಎಲ್ಲಾ ವಿವರಗಳು ಸರಿಯಾಗಿವೆ ಎಂದು ನೀವು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಬೇಕು.",
    content7: "ಆಧಾರ್ ಎಕ್ಸ್‌ಎಂಎಲ್ ಪ್ಯಾಕೆಟ್ ಅಥವಾ ಆಧಾರ್ ಸುರಕ್ಷಿತ ಕ್ಯೂಆರ್ ಕೋಡ್ 3 ದಿನಗಳಿಗಿಂತ ಹಳೆಯದಾಗಿರಬಾರದು.",
    content_cdtn1: "ನಾನು, ವಿ-ಸಿಐಪಿ ಐಡಿ",
    content_cdtn2: " ಮೇಲಿನ ಎಲ್ಲಾ ಅಂಶಗಳನ್ನು ಹೋಲ್ಡರ್ ಒಪ್ಪುತ್ತಾರೆ ಮತ್ತು ಈ ಮೂಲಕ, ನನ್ನ ಒಪ್ಪಿಗೆಯನ್ನು ದೃ irm ೀಕರಿಸಿ.",
    // =================================
    //  OTP Based Aadhaar Verification
    // =================================
    adr_otp_title: "ಆಧಾರ್ ಪರಿಶೀಲನೆ ಒಟಿಪಿ ಆಧಾರಿತ ಇ-ಕೈಕ್",
    adr_number: "ಆಧಾರ್ ಸಂಖ್ಯೆ",
    sms: "ಎಸ್‌ಎಂಎಸ್",
    email: "ಇಮೇಲ್",
    both: "ಎರಡೂ",
    get_ekyc: "ಇ-ಕೈಕ್ ಪಡೆಯಿರಿ",
    adr_details:"ಆಧಾರ್ ವಿವರಗಳು",
    name: "ಹೆಸರು",
    fname: "ತಂದೆಯ ಹೆಸರು",
    dob: "ಹುಟ್ತಿದ ದಿನ",
    addr: "ವಿಳಾಸ",
    photo: "ಫೋಟೋ",
    back: "ಹಿಂದೆ",
    // =================================
    //          OFFLINE KYC
    // =================================
    offline_title: "ಆಧಾರ್ ಪರಿಶೀಲನೆ ಆಫ್‌ಲೈನ್ ಕೆವೈಸಿ",
    video: "ಟ್ಯುಟೋರಿಯಲ್ ವಿಡಿಯೋ",
    drag_drop: "ಫೈಲ್ ಅನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ ಮತ್ತು ಬಿಡಿ",
    or: "ಅಥವಾ ",
    OR: "ಅಥವಾ",
    click_file: "ಫೈಲ್ ಸೇರಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
    upolad_either: "ಇ-ಕೆವೈಸಿ ಎಕ್ಸ್‌ಎಂಎಲ್ ಅಥವಾ ಇ-ಆಧಾರ್ ಪಿಡಿಎಫ್ ಅನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    zip_password: "ದಯವಿಟ್ಟು ಜಿಪ್ ಪಾಸ್ವರ್ಡ್ ಅನ್ನು ನಮೂದಿಸಿ",
    submit: "ಸಲ್ಲಿಸು",
    resubmit: "ಮರು ಸಲ್ಲಿಸಿ",    
    dont_have: "ಇತ್ತೀಚಿನ ಇ-ಕೆವೈಸಿ ಎಕ್ಸ್‌ಎಂಎಲ್ ಅಥವಾ ಇ-ಆಧಾರ್ ಪಿಡಿಎಫ್ ಹೊಂದಿಲ್ಲ",
    download_xml: "ಯುಐಡಿಎಐ ವೆಬ್‌ಸೈಟ್‌ನಿಂದ ಇ-ಕೆವೈಸಿ ಎಕ್ಸ್‌ಎಂಎಲ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು",
    download_pdf: "ಯುಐಡಿಎಐ ವೆಬ್‌ಸೈಟ್‌ನಿಂದ ಇ-ಕೆವೈಸಿ ಪಿಡಿಎಫ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು",   
    help_center: "ಸಹಾಯ ಕೇಂದ್ರ",
    ekyc: "ಆಧಾರ್ ಪೇಪರ್‌ಲೆಸ್ ಇ-ಕೆವೈಸಿ",
    ekycPdf: "ಇ-ಆಧಾರ್ ಪಿಡಿಎಫ್",
    step1: "ಗೆ ಮರುನಿರ್ದೇಶಿಸಿ ",
    step2: "ಆಧಾರ್ ಸಂಖ್ಯೆ ಅಥವಾ ವಿಐಡಿ ನಮೂದಿಸಿ",
    step3: "ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯಿಂದ ಒಟಿಪಿ ಮೌಲ್ಯಮಾಪನವನ್ನು ಮಾಡಿ.",
    step4: "ಪಾಸ್ವರ್ಡ್ ರಕ್ಷಿತ ಇ-ಕೈಕ್ xml ಅನ್ನು ಡೌನ್ಲೋಡ್ ಮಾಡಿ.",
    step5: "ಆಧಾರ್ ಸಂಖ್ಯೆ ಅಥವಾ ವಿಐಡಿ ಅಥವಾ ಇಐಡಿ ನಮೂದಿಸಿ",
    step6: "ಪಾಸ್ವರ್ಡ್ ರಕ್ಷಿತ eAadhaar PDF ಅನ್ನು ಡೌನ್ಲೋಡ್ ಮಾಡಿ",
    note1: "ನಿಮ್ಮ ಪೇಪರ್‌ಲೆಸ್ ಆಫ್‌ಲೈನ್ ಇಕೆವೈಸಿಗಾಗಿ ಯುಐಡಿಎಐ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಎಕ್ಸ್‌ಎಂಎಲ್ ಅನ್ನು ರಚಿಸುವಾಗ ಪಾಸ್‌ವರ್ಡ್ ಅದೇ ಹಂಚಿಕೆಯ ಕೋಡ್ ಆಗಿದೆ.",
    note2: "ಪಾಸ್ವರ್ಡ್ ಎನ್ನುವುದು ನಿಮ್ಮ ಹೆಸರಿನ ಮೊದಲ ನಾಲ್ಕು ಅಕ್ಷರಗಳ (ಆಧಾರ್ನಲ್ಲಿರುವಂತೆ) ದೊಡ್ಡ ಅಕ್ಷರಗಳಲ್ಲಿ ಮತ್ತು ಇಆಧಾರ್ ಪಿಡಿಎಫ್ಗಾಗಿ YYYY ಸ್ವರೂಪದಲ್ಲಿ ಹುಟ್ಟಿದ ವರ್ಷ.",
    // =================================
    //              PAN
    // =================================
    pan_title: "ಪ್ಯಾನ್ ಪರಿಶೀಲನೆ",
    pan_card: "ಪ್ಯಾನ್ ಕಾರ್ಡ್",
    pan_card1: "Upload E-PAN(PDF)",
    capture_pan: "ಪ್ಯಾನ್ ಕಾರ್ಡ್ ಚಿತ್ರವನ್ನು ಸೆರೆಹಿಡಿಯಿರಿ",
    pan_ins1: "ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಚಿತ್ರವು ಜೆಪಿಜಿ / ಜೆಪಿಇಜಿ / ಪಿಎನ್‌ಜಿ ಸ್ವರೂಪದಲ್ಲಿ ಮಾತ್ರ ಇರಬೇಕು",
    pan_ins2: "ಚಿತ್ರದ ಗಾತ್ರವು 30kb ನಿಂದ 100mb ನಡುವೆ ಇರಬೇಕು.",
    pan_ins3: "ಚಿತ್ರಗಳ ಅಗಲ 300 ರಿಂದ 8000 ರ ನಡುವೆ ಇರಬೇಕು ಮತ್ತು ಚಿತ್ರಗಳ ಎತ್ತರ 8000 ರಿಂದ 8000 ರವರೆಗೆ ಇರಬೇಕು",
    pan_ins4: "ದಯವಿಟ್ಟು ಪ್ಯಾನ್ ಕಾರ್ಡ್‌ನ ಮುಂಭಾಗದ ಭಾಗವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    pan_ins5: "ಸೆರೆಹಿಡಿದ ಚಿತ್ರವನ್ನು ಮಸುಕಾಗಿಸಬಾರದು",
    pan_ins6: "ಚಿತ್ರವನ್ನು ಚಪ್ಪಟೆ ಕೋನದಿಂದ ಸೆರೆಹಿಡಿಯಬೇಕು ಮತ್ತು ಕೋನವನ್ನು ಓರೆಯಾಗಿಸಬಾರದು.",
    pan_qtn: "ಪ್ಯಾನ್ ವಿವರಗಳು ಯಾವುವು.?",
    pan_ans: "ಪ್ಯಾನ್ ವಿವರಗಳು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಪ್ಯಾನ್ ಕಾರ್ಡ್‌ನಿಂದ ಹೊರತೆಗೆದ ಮಾಹಿತಿಯಾಗಿದೆ. ಡೇಟಾವನ್ನು ತಪ್ಪಾಗಿ ಪಡೆದರೆ ಬಳಕೆದಾರರು ಹೊರತೆಗೆದ ಮಾಹಿತಿಯನ್ನು ಸಂಪಾದಿಸಬಹುದು.",
    pan_success: "ಪ್ಯಾನ್ ಪರಿಶೀಲನೆ ಯಶಸ್ವಿಯಾಗಿದೆ",
    pan_wait: "ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ, ನಾವು ನಿಮ್ಮನ್ನು ಮುಂದಿನ ಹಂತಕ್ಕೆ ಕರೆದೊಯ್ಯುತ್ತಿದ್ದೇವೆ",
    // =================================
    //              CHAT
    // =================================
    token: "ಟೋಕನ್ ಸಂಖ್ಯೆ: ",
    join: "ಈಗ ಸೇರಿಕೊ",   
    video_call_process: "ವೀಡಿಯೊ ಕರೆ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ",
    under_recording_mode: "ನೀವು ವೀಡಿಯೊ ರೆಕಾರ್ಡಿಂಗ್ ಮೋಡ್‌ನಲ್ಲಿದ್ದೀರಿ, ಪುಟವನ್ನು ಮರುಲೋಡ್ ಮಾಡಬೇಡಿ *",
    user: "User",
    please_wait: "ದಯಮಾಡಿ ನಿರೀಕ್ಷಿಸಿ...",
    waiting_for_banker: "ವೀಡಿಯೊ ಕರೆಗೆ ಬ್ಯಾಂಕರ್ ಸೇರಲು ಕಾಯಲಾಗುತ್ತಿದೆ",
    video_instruction: "ವೀಡಿಯೊ ಕರೆ ಸೂಚನೆಗಳು:",
    video_please_note: "ದಯವಿಟ್ಟು ಗಮನಿಸಿ: ಕಳಪೆ ಚಿತ್ರ / ವೀಡಿಯೊ ಗುಣಮಟ್ಟವು ದೋಷಗಳಿಗೆ ಕಾರಣವಾಗಬಹುದು",
    video_ins1: "ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ ನೀವು ಒಬ್ಬಂಟಿಯಾಗಿರುವಿರಾ ಎಂಬುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
    video_ins2: "ವೀಡಿಯೊ ಕರೆಯ ಸಮಯದಲ್ಲಿ ಹಿನ್ನೆಲೆ ಸರಳವಾಗಿರಬೇಕು.",
    video_ins3: "ಕೋಣೆಯಲ್ಲಿ ಸಾಕಷ್ಟು ಬೆಳಕು ಇರಬೇಕು.",
    video_ins4: "ಹಿನ್ನೆಲೆ ಶಬ್ದವನ್ನು ತಪ್ಪಿಸಲು ನಿಮ್ಮ ಮುಖದೊಂದಿಗೆ 70% ಪರದೆಯನ್ನು ಆವರಿಸುವ ಮೂಲಕ ನೀವು ಕ್ಯಾಮೆರಾವನ್ನು ಎದುರಿಸುತ್ತಿರುವಿರಿ ಎಂದು ಯಾವಾಗಲೂ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
    video_ins5: "ಫೋಟೋ ಸೆರೆಹಿಡಿಯುವ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ಚಲನೆಯ ಮಸುಕು ಪರಿಣಾಮವನ್ನು ತಪ್ಪಿಸಿ.",
    video_ins6: "ಫೋಟೋ ಸೆರೆಹಿಡಿಯುವ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ನಿಮ್ಮ ಕಣ್ಣುಗಳನ್ನು ತೆರೆದಿಡಿ.",
    agent_disconnected: "ಏಜೆಂಟ್ ವೀಡಿಯೊ ಕರೆಯನ್ನು ಸಂಪರ್ಕ ಕಡಿತಗೊಳಿಸಿದ್ದಾರೆ.",
    are_you_sure: "ವೀಡಿಯೊ ಕರೆಯನ್ನು ಸಂಪರ್ಕ ಕಡಿತಗೊಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?",
    no: "ಇಲ್ಲ",
    yes: "ಹೌದು",
    // =================================
    //              END
    // =================================
    end_title: "ಪ್ರಕ್ರಿಯೆಯ ಅಂತ್ಯ",
    stage: "ಹಂತ",
    status: "ಸ್ಥಿತಿ",
    qtn_ans: "ವೀಡಿಯೊ ಕರೆ ಪ್ರಶ್ನೆ ಮತ್ತು ಉತ್ತರ",
    photo_capture: "ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ ಫೋಟೋ ಕ್ಯಾಪ್ಚರ್",
    banker_remark: "ವಿ-ಸಿಐಪಿಗಾಗಿ ಬ್ಯಾಂಕರ್ಸ್ ಟೀಕೆ",
    auditor_remark: "ವಿ-ಸಿಐಪಿಗಾಗಿ ಲೆಕ್ಕಪರಿಶೋಧಕರ ಟೀಕೆ",
    home: "ಮನೆ",
    close: "ಮುಚ್ಚಿ",
    failed: "ವಿಫಲವಾಗಿದೆ",
    successful: "ಯಶಸ್ವಿಯಾಗಿದೆ",
    pending: "ಬಾಕಿ ಉಳಿದಿದೆ",
    completed: "ಪೂರ್ಣಗೊಂಡಿದೆ",
    approved: "ಅನುಮೋದಿಸಲಾಗಿದೆ",
    rejected: "ತಿರಸ್ಕರಿಸಿದ",
    waiting: "ಏಜೆಂಟ್ ಅನುಮೋದನೆಗಾಗಿ ಕಾಯಲಾಗುತ್ತಿದೆ.",
    // =============POPUP===============
    end_content1: "ನಿಮ್ಮ ವೀಡಿಯೊ-ಕೆವೈಸಿ ಅಪೂರ್ಣವಾಗಿದೆ, ದಯವಿಟ್ಟು ಅಧಿವೇಶನವನ್ನು ಮುಂದುವರಿಸಿ ಮತ್ತು ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.",
    end_content2: "ನಿಮ್ಮ ಭವಿಷ್ಯದ ಉಲ್ಲೇಖಕ್ಕಾಗಿ ದಯವಿಟ್ಟು ವಿ-ಸಿಐಪಿ ಐಡಿಯನ್ನು ಗಮನಿಸಿ ",
    end_status21: "ನಮ್ಮೊಂದಿಗೆ ವೀಡಿಯೊ-ಕೆವೈಸಿ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ವಿ-ಸಿಐಪಿ ಐಡಿ ",
    end_status22: " ನಮ್ಮ ಬ್ಯಾಂಕರ್ ಅನುಮೋದಿಸಿದ್ದಾರೆ. ನಿಮ್ಮ ವಿ-ಸಿಐಪಿ ಐಡಿಗಾಗಿ ಲೆಕ್ಕಪರಿಶೋಧಕರಿಂದ ಅನುಮೋದನೆಗಾಗಿ ನಾವು ಕಾಯುತ್ತಿದ್ದೇವೆ. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ಅಂತಿಮ ಸ್ಥಿತಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತೇವೆ.",
    end_status31: "ನಿಮ್ಮ ವಿ-ಸಿಐಪಿ ಐಡಿ ಎಂದು ನಿಮಗೆ ತಿಳಿಸಲು ನಾವು ವಿಷಾದಿಸುತ್ತೇವೆ ",
    end_status32: " ನಮ್ಮ ಬ್ಯಾಂಕರ್‌ನಿಂದ ತಿರಸ್ಕರಿಸಲಾಗಿದೆ. ಎಲ್ಲಾ ಸರಿಯಾದ ವಿವರಗಳೊಂದಿಗೆ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪುನಃ ಪ್ರಾರಂಭಿಸಲು ನಾವು ನಿಮ್ಮನ್ನು ವಿನಂತಿಸುತ್ತೇವೆ.",
    end_status41: "ನಿಮ್ಮ ವಿ-ಸಿಐಪಿ ಐಡಿಗೆ ಅಂತಿಮ ಅನುಮೋದನೆ ",
    end_status42: " ಲೆಕ್ಕಪರಿಶೋಧಕರಿಂದ ಸ್ವೀಕರಿಸಲಾಗಿದೆ.",
    end_status51: "ನಿಮ್ಮ ವಿ-ಸಿಐಪಿ ಐಡಿ ಎಂದು ನಿಮಗೆ ತಿಳಿಸಲು ನಾವು ವಿಷಾದಿಸುತ್ತೇವೆ ",
    end_status52: " ನಮ್ಮ ಲೆಕ್ಕಪರಿಶೋಧಕರಿಂದ ತಿರಸ್ಕರಿಸಲಾಗಿದೆ. ಎಲ್ಲಾ ಸರಿಯಾದ ವಿವರಗಳೊಂದಿಗೆ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪುನಃ ಪ್ರಾರಂಭಿಸಲು ನಾವು ನಿಮ್ಮನ್ನು ವಿನಂತಿಸುತ್ತೇವೆ.",
    end_status_21: "ನಿಮ್ಮ ವಿ-ಸಿಐಪಿ ಐಡಿ ",
    end_status_22: " ತಪ್ಪಾದ ವಿವರಗಳಿಂದಾಗಿ ನಮ್ಮ ಬ್ಯಾಂಕರ್ ತಿರಸ್ಕರಿಸಿದ್ದಾರೆ. ಅದೇ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ಮರು-ನೋಂದಾಯಿಸಲು ಮತ್ತು ಎಲ್ಲಾ ಸರಿಯಾದ ವಿವರಗಳೊಂದಿಗೆ ಹೊಸ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪ್ರಾರಂಭಿಸಲು ನಾವು ನಿಮ್ಮನ್ನು ವಿನಂತಿಸುತ್ತೇವೆ. ನೀವು ವಿ-ಸಿಐಪಿ ಪ್ರಕ್ರಿಯೆಗೆ ಪ್ರವೇಶಿಸಬಹುದು",
    end_status11321: `${clientname}‌ನೊಂದಿಗೆ ವೀಡಿಯೊ-ಕೆವೈಸಿ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ವಿ-ಸಿಐಪಿ ಐಡಿಗಾಗಿ ಬ್ಯಾಂಕರ್ ಮತ್ತು ಲೆಕ್ಕಪರಿಶೋಧಕರಿಂದ ಅನುಮೋದನೆಗಾಗಿ ನಾವು ಕಾಯುತ್ತಿದ್ದೇವೆ. ನಿಮ್ಮ ವಿ-ಸಿಐಪಿ ಐಡಿಯ ಅಂತಿಮ ಸ್ಥಿತಿಯನ್ನು ನಿಮ್ಮ ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯಲ್ಲಿ ಎಸ್‌ಎಂಎಸ್ ಮೂಲಕ ನಿಮಗೆ ಹಂಚಲಾಗುತ್ತದೆ. ನವೀಕರಿಸಿದ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಲು ನೀವು ಯಾವಾಗ ಬೇಕಾದರೂ ಅದೇ ವೆಬ್-ಲಿಂಕ್‌ಗೆ ಭೇಟಿ ನೀಡಬಹುದು. `,
    end_status11111: "ನಿಮ್ಮ ವೀಡಿಯೊ-ಕೆವೈಸಿ ಅಪೂರ್ಣವಾಗಿದೆ, ದಯವಿಟ್ಟು ಅಧಿವೇಶನವನ್ನು ಮುಂದುವರಿಸಿ ಮತ್ತು ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.",
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