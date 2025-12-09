export type Language = 'en' | 'kn' | 'mr' | 'ta' | 'te';

export interface Translations {
  appName: string;
  tagline: string;
  login: string;
  signUp: string;
  continueAsGuest: string;
  logout: string;
  email: string;
  password: string;
  confirmPassword: string;
  createAccount: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  
  // User Info
  tellUsAboutYou: string;
  yourAge: string;
  agePlaceholder: string;
  selectHealthConditions: string;
  healthConditionsDesc: string;
  other: string;
  otherPlaceholder: string;
  continue: string;
  back: string;
  
  // Health Conditions
  thyroid: string;
  thyroidDesc: string;
  highBP: string;
  highBPDesc: string;
  obesity: string;
  obesityDesc: string;
  pcos: string;
  pcosDesc: string;
  pcod: string;
  pcodDesc: string;
  diabetes: string;
  diabetesDesc: string;
  cholesterol: string;
  cholesterolDesc: string;
  heartDisease: string;
  heartDiseaseDesc: string;
  kidneyDisease: string;
  kidneyDiseaseDesc: string;
  liverDisease: string;
  liverDiseaseDesc: string;
  glutenIntolerance: string;
  glutenIntoleranceDesc: string;
  lactoseIntolerance: string;
  lactoseIntoleranceDesc: string;
  
  // Main Dashboard
  howWouldYouLike: string;
  scanIngredients: string;
  scanIngredientsDesc: string;
  scanBarcode: string;
  scanBarcodeDesc: string;
  uploadFile: string;
  uploadFileDesc: string;
  enterManually: string;
  enterManuallyDesc: string;
  
  // Scanning
  scanning: string;
  capturing: string;
  captureImage: string;
  retake: string;
  analyze: string;
  processing: string;
  
  // Manual Entry
  enterIngredients: string;
  ingredientsPlaceholder: string;
  
  // Results
  detectedIngredients: string;
  healthScore: string;
  healthScoreFor: string;
  safe: string;
  caution: string;
  avoid: string;
  summary: string;
  dietSuggestions: string;
  foodsToInclude: string;
  foodsToAvoid: string;
  scanAnother: string;
  
  // History
  history: string;
  noHistory: string;
  viewDetails: string;
  
  // Theme
  theme: string;
  light: string;
  dark: string;
  system: string;
  
  // Language
  language: string;
  
  // Errors
  errorOccurred: string;
  tryAgain: string;
  invalidAge: string;
  selectAtLeastOne: string;
  noIngredientsDetected: string;
  
  // Loading
  loading: string;
  pleaseWait: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "NutriGuardian",
    tagline: "Scan ingredients. Protect your health.",
    login: "Login",
    signUp: "Sign Up",
    continueAsGuest: "Continue as Guest",
    logout: "Logout",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    createAccount: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    
    tellUsAboutYou: "Tell us about yourself",
    yourAge: "Your Age",
    agePlaceholder: "Enter your age",
    selectHealthConditions: "Select your health conditions",
    healthConditionsDesc: "This helps us personalize your ingredient analysis",
    other: "Other",
    otherPlaceholder: "Enter any other condition...",
    continue: "Continue",
    back: "Back",
    
    thyroid: "Thyroid",
    thyroidDesc: "Condition affecting metabolism and hormone balance",
    highBP: "High BP",
    highBPDesc: "Elevated blood pressure affecting heart and blood vessels",
    obesity: "Obesity",
    obesityDesc: "Excess body fat increasing risk of lifestyle diseases",
    pcos: "PCOS",
    pcosDesc: "Hormonal disorder causing irregular periods",
    pcod: "PCOD",
    pcodDesc: "Ovarian disorder affecting egg release",
    diabetes: "Diabetes",
    diabetesDesc: "High blood sugar levels due to insulin issues",
    cholesterol: "Cholesterol",
    cholesterolDesc: "Unhealthy blood fat levels affecting heart health",
    heartDisease: "Heart Disease",
    heartDiseaseDesc: "Conditions affecting heart function",
    kidneyDisease: "Kidney Disease",
    kidneyDiseaseDesc: "Reduced kidney function affecting filtration",
    liverDisease: "Liver Disease",
    liverDiseaseDesc: "Conditions affecting liver function",
    glutenIntolerance: "Gluten Intolerance",
    glutenIntoleranceDesc: "Adverse reaction to gluten proteins",
    lactoseIntolerance: "Lactose Intolerance",
    lactoseIntoleranceDesc: "Difficulty digesting lactose in dairy",
    
    howWouldYouLike: "How would you like to check ingredients?",
    scanIngredients: "Scan Ingredients",
    scanIngredientsDesc: "Use your camera to scan ingredient labels",
    scanBarcode: "Scan Barcode",
    scanBarcodeDesc: "Scan product barcode for instant lookup",
    uploadFile: "Upload File",
    uploadFileDesc: "Upload an image or text file of ingredients",
    enterManually: "Enter Manually",
    enterManuallyDesc: "Type ingredients separated by commas",
    
    scanning: "Scanning...",
    capturing: "Capturing...",
    captureImage: "Capture Image",
    retake: "Retake",
    analyze: "Analyze",
    processing: "Processing...",
    
    enterIngredients: "Enter Ingredients",
    ingredientsPlaceholder: "sugar, palm oil, wheat flour, salt...",
    
    detectedIngredients: "Detected Ingredients",
    healthScore: "Health Score",
    healthScoreFor: "Health Score for You",
    safe: "Safe",
    caution: "Caution",
    avoid: "Avoid",
    summary: "Summary",
    dietSuggestions: "Personalized Diet Suggestions",
    foodsToInclude: "Foods to include more often",
    foodsToAvoid: "Foods to limit or avoid",
    scanAnother: "Scan Another",
    
    history: "History",
    noHistory: "No scan history yet",
    viewDetails: "View Details",
    
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    
    language: "Language",
    
    errorOccurred: "An error occurred",
    tryAgain: "Try Again",
    invalidAge: "Please enter a valid age",
    selectAtLeastOne: "Please select at least one condition",
    noIngredientsDetected: "No ingredients detected",
    
    loading: "Loading...",
    pleaseWait: "Please wait...",
  },
  
  kn: {
    appName: "ನ್ಯೂಟ್ರಿಗಾರ್ಡಿಯನ್",
    tagline: "ಪದಾರ್ಥಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ. ನಿಮ್ಮ ಆರೋಗ್ಯವನ್ನು ರಕ್ಷಿಸಿ.",
    login: "ಲಾಗಿನ್",
    signUp: "ಸೈನ್ ಅಪ್",
    continueAsGuest: "ಅತಿಥಿಯಾಗಿ ಮುಂದುವರಿಯಿರಿ",
    logout: "ಲಾಗ್ಔಟ್",
    email: "ಇಮೇಲ್",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    confirmPassword: "ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ",
    createAccount: "ಖಾತೆ ರಚಿಸಿ",
    alreadyHaveAccount: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
    dontHaveAccount: "ಖಾತೆ ಇಲ್ಲವೇ?",
    
    tellUsAboutYou: "ನಿಮ್ಮ ಬಗ್ಗೆ ಹೇಳಿ",
    yourAge: "ನಿಮ್ಮ ವಯಸ್ಸು",
    agePlaceholder: "ನಿಮ್ಮ ವಯಸ್ಸನ್ನು ನಮೂದಿಸಿ",
    selectHealthConditions: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಸ್ಥಿತಿಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    healthConditionsDesc: "ಇದು ನಿಮ್ಮ ಪದಾರ್ಥ ವಿಶ್ಲೇಷಣೆಯನ್ನು ವೈಯಕ್ತೀಕರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ",
    other: "ಇತರೆ",
    otherPlaceholder: "ಬೇರೆ ಯಾವುದೇ ಸ್ಥಿತಿಯನ್ನು ನಮೂದಿಸಿ...",
    continue: "ಮುಂದುವರಿಸಿ",
    back: "ಹಿಂದೆ",
    
    thyroid: "ಥೈರಾಯ್ಡ್",
    thyroidDesc: "ಚಯಾಪಚಯ ಮತ್ತು ಹಾರ್ಮೋನ್ ಸಮತೋಲನವನ್ನು ಪ್ರಭಾವಿಸುವ ಸ್ಥಿತಿ",
    highBP: "ಅಧಿಕ ರಕ್ತದೊತ್ತಡ",
    highBPDesc: "ಹೃದಯ ಮತ್ತು ರಕ್ತನಾಳಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಎತ್ತರಿಸಿದ ರಕ್ತದೊತ್ತಡ",
    obesity: "ಸ್ಥೂಲಕಾಯತೆ",
    obesityDesc: "ಜೀವನಶೈಲಿ ರೋಗಗಳ ಅಪಾಯವನ್ನು ಹೆಚ್ಚಿಸುವ ಅಧಿಕ ದೇಹದ ಕೊಬ್ಬು",
    pcos: "ಪಿಸಿಒಎಸ್",
    pcosDesc: "ಅನಿಯಮಿತ ಮುಟ್ಟಿನ ಕಾರಣವಾಗುವ ಹಾರ್ಮೋನ್ ಅಸ್ವಸ್ಥತೆ",
    pcod: "ಪಿಸಿಒಡಿ",
    pcodDesc: "ಮೊಟ್ಟೆ ಬಿಡುಗಡೆಯ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಅಂಡಾಶಯ ಅಸ್ವಸ್ಥತೆ",
    diabetes: "ಮಧುಮೇಹ",
    diabetesDesc: "ಇನ್ಸುಲಿನ್ ಸಮಸ್ಯೆಗಳಿಂದಾಗಿ ಹೆಚ್ಚಿನ ರಕ್ತದ ಸಕ್ಕರೆ ಮಟ್ಟಗಳು",
    cholesterol: "ಕೊಲೆಸ್ಟ್ರಾಲ್",
    cholesterolDesc: "ಹೃದಯ ಆರೋಗ್ಯದ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಅನಾರೋಗ್ಯಕರ ರಕ್ತ ಕೊಬ್ಬಿನ ಮಟ್ಟಗಳು",
    heartDisease: "ಹೃದಯ ರೋಗ",
    heartDiseaseDesc: "ಹೃದಯ ಕಾರ್ಯವನ್ನು ಪ್ರಭಾವಿಸುವ ಪರಿಸ್ಥಿತಿಗಳು",
    kidneyDisease: "ಮೂತ್ರಪಿಂಡ ರೋಗ",
    kidneyDiseaseDesc: "ಶೋಧನೆಯ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಕಡಿಮೆಯಾದ ಮೂತ್ರಪಿಂಡ ಕಾರ್ಯ",
    liverDisease: "ಯಕೃತ್ ರೋಗ",
    liverDiseaseDesc: "ಯಕೃತ್ ಕಾರ್ಯವನ್ನು ಪ್ರಭಾವಿಸುವ ಪರಿಸ್ಥಿತಿಗಳು",
    glutenIntolerance: "ಗ್ಲುಟೆನ್ ಅಸಹಿಷ್ಣುತೆ",
    glutenIntoleranceDesc: "ಗ್ಲುಟೆನ್ ಪ್ರೋಟೀನ್‌ಗಳಿಗೆ ಪ್ರತಿಕೂಲ ಪ್ರತಿಕ್ರಿಯೆ",
    lactoseIntolerance: "ಲ್ಯಾಕ್ಟೋಸ್ ಅಸಹಿಷ್ಣುತೆ",
    lactoseIntoleranceDesc: "ಹಾಲಿನ ಉತ್ಪನ್ನಗಳಲ್ಲಿ ಲ್ಯಾಕ್ಟೋಸ್ ಜೀರ್ಣಿಸಿಕೊಳ್ಳಲು ಕಷ್ಟ",
    
    howWouldYouLike: "ಪದಾರ್ಥಗಳನ್ನು ಹೇಗೆ ಪರಿಶೀಲಿಸಲು ಬಯಸುತ್ತೀರಿ?",
    scanIngredients: "ಪದಾರ್ಥಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    scanIngredientsDesc: "ಪದಾರ್ಥ ಲೇಬಲ್‌ಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಲು ನಿಮ್ಮ ಕ್ಯಾಮೆರಾವನ್ನು ಬಳಸಿ",
    scanBarcode: "ಬಾರ್‌ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    scanBarcodeDesc: "ತ್ವರಿತ ಹುಡುಕಾಟಕ್ಕಾಗಿ ಉತ್ಪನ್ನ ಬಾರ್‌ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    uploadFile: "ಫೈಲ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    uploadFileDesc: "ಪದಾರ್ಥಗಳ ಚಿತ್ರ ಅಥವಾ ಪಠ್ಯ ಫೈಲ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    enterManually: "ಹಸ್ತಚಾಲಿತವಾಗಿ ನಮೂದಿಸಿ",
    enterManuallyDesc: "ಅಲ್ಪವಿರಾಮಗಳಿಂದ ಬೇರ್ಪಡಿಸಿದ ಪದಾರ್ಥಗಳನ್ನು ಟೈಪ್ ಮಾಡಿ",
    
    scanning: "ಸ್ಕ್ಯಾನ್ ಆಗುತ್ತಿದೆ...",
    capturing: "ಸೆರೆಹಿಡಿಯಲಾಗುತ್ತಿದೆ...",
    captureImage: "ಚಿತ್ರ ಸೆರೆಹಿಡಿಯಿರಿ",
    retake: "ಮರು ತೆಗೆದುಕೊಳ್ಳಿ",
    analyze: "ವಿಶ್ಲೇಷಿಸಿ",
    processing: "ಸಂಸ್ಕರಿಸಲಾಗುತ್ತಿದೆ...",
    
    enterIngredients: "ಪದಾರ್ಥಗಳನ್ನು ನಮೂದಿಸಿ",
    ingredientsPlaceholder: "ಸಕ್ಕರೆ, ತಾಳೆ ಎಣ್ಣೆ, ಗೋಧಿ ಹಿಟ್ಟು, ಉಪ್ಪು...",
    
    detectedIngredients: "ಪತ್ತೆಯಾದ ಪದಾರ್ಥಗಳು",
    healthScore: "ಆರೋಗ್ಯ ಸ್ಕೋರ್",
    healthScoreFor: "ನಿಮಗಾಗಿ ಆರೋಗ್ಯ ಸ್ಕೋರ್",
    safe: "ಸುರಕ್ಷಿತ",
    caution: "ಎಚ್ಚರಿಕೆ",
    avoid: "ತಪ್ಪಿಸಿ",
    summary: "ಸಾರಾಂಶ",
    dietSuggestions: "ವೈಯಕ್ತೀಕರಿಸಿದ ಆಹಾರ ಸಲಹೆಗಳು",
    foodsToInclude: "ಹೆಚ್ಚಾಗಿ ಸೇರಿಸಬೇಕಾದ ಆಹಾರಗಳು",
    foodsToAvoid: "ಮಿತಿಗೊಳಿಸಬೇಕಾದ ಅಥವಾ ತಪ್ಪಿಸಬೇಕಾದ ಆಹಾರಗಳು",
    scanAnother: "ಇನ್ನೊಂದು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    
    history: "ಇತಿಹಾಸ",
    noHistory: "ಇನ್ನೂ ಸ್ಕ್ಯಾನ್ ಇತಿಹಾಸವಿಲ್ಲ",
    viewDetails: "ವಿವರಗಳನ್ನು ನೋಡಿ",
    
    theme: "ಥೀಮ್",
    light: "ಬೆಳಕು",
    dark: "ಗಾಢ",
    system: "ಸಿಸ್ಟಮ್",
    
    language: "ಭಾಷೆ",
    
    errorOccurred: "ದೋಷ ಸಂಭವಿಸಿದೆ",
    tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    invalidAge: "ದಯವಿಟ್ಟು ಮಾನ್ಯ ವಯಸ್ಸನ್ನು ನಮೂದಿಸಿ",
    selectAtLeastOne: "ದಯವಿಟ್ಟು ಕನಿಷ್ಠ ಒಂದು ಸ್ಥಿತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    noIngredientsDetected: "ಯಾವುದೇ ಪದಾರ್ಥಗಳು ಪತ್ತೆಯಾಗಿಲ್ಲ",
    
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    pleaseWait: "ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ...",
  },
  
  mr: {
    appName: "न्यूट्रिगार्डियन",
    tagline: "घटक स्कॅन करा. आपल्या आरोग्याचे रक्षण करा.",
    login: "लॉगिन",
    signUp: "साइन अप",
    continueAsGuest: "अतिथी म्हणून सुरू ठेवा",
    logout: "लॉगआउट",
    email: "ईमेल",
    password: "पासवर्ड",
    confirmPassword: "पासवर्डची पुष्टी करा",
    createAccount: "खाते तयार करा",
    alreadyHaveAccount: "आधीच खाते आहे?",
    dontHaveAccount: "खाते नाही?",
    
    tellUsAboutYou: "आम्हाला तुमच्याबद्दल सांगा",
    yourAge: "तुमचे वय",
    agePlaceholder: "तुमचे वय प्रविष्ट करा",
    selectHealthConditions: "तुमच्या आरोग्य स्थिती निवडा",
    healthConditionsDesc: "हे तुमचे घटक विश्लेषण वैयक्तिकृत करण्यात मदत करते",
    other: "इतर",
    otherPlaceholder: "कोणतीही इतर स्थिती प्रविष्ट करा...",
    continue: "सुरू ठेवा",
    back: "मागे",
    
    thyroid: "थायरॉइड",
    thyroidDesc: "चयापचय आणि हार्मोन संतुलनावर परिणाम करणारी स्थिती",
    highBP: "उच्च रक्तदाब",
    highBPDesc: "हृदय आणि रक्तवाहिन्यांवर परिणाम करणारा वाढलेला रक्तदाब",
    obesity: "लठ्ठपणा",
    obesityDesc: "जीवनशैली रोगांचा धोका वाढवणारी अतिरिक्त शरीर चरबी",
    pcos: "पीसीओएस",
    pcosDesc: "अनियमित मासिक पाळी निर्माण करणारा हार्मोनल विकार",
    pcod: "पीसीओडी",
    pcodDesc: "अंड्याच्या स्त्रावावर परिणाम करणारा अंडाशय विकार",
    diabetes: "मधुमेह",
    diabetesDesc: "इन्सुलिन समस्यांमुळे उच्च रक्त शर्करा पातळी",
    cholesterol: "कोलेस्ट्रॉल",
    cholesterolDesc: "हृदयाच्या आरोग्यावर परिणाम करणारे अस्वास्थ्यकर रक्त चरबी पातळी",
    heartDisease: "हृदयरोग",
    heartDiseaseDesc: "हृदयाच्या कार्यावर परिणाम करणारी परिस्थिती",
    kidneyDisease: "मूत्रपिंड रोग",
    kidneyDiseaseDesc: "फिल्ट्रेशनवर परिणाम करणारे कमी झालेले मूत्रपिंड कार्य",
    liverDisease: "यकृत रोग",
    liverDiseaseDesc: "यकृताच्या कार्यावर परिणाम करणारी परिस्थिती",
    glutenIntolerance: "ग्लूटेन असहिष्णुता",
    glutenIntoleranceDesc: "ग्लूटेन प्रथिनांना प्रतिकूल प्रतिक्रिया",
    lactoseIntolerance: "लैक्टोज असहिष्णुता",
    lactoseIntoleranceDesc: "डेअरीमधील लैक्टोज पचवण्यात अडचण",
    
    howWouldYouLike: "तुम्हाला घटक कसे तपासायचे आहेत?",
    scanIngredients: "घटक स्कॅन करा",
    scanIngredientsDesc: "घटक लेबल स्कॅन करण्यासाठी तुमचा कॅमेरा वापरा",
    scanBarcode: "बारकोड स्कॅन करा",
    scanBarcodeDesc: "त्वरित शोधासाठी उत्पादन बारकोड स्कॅन करा",
    uploadFile: "फाइल अपलोड करा",
    uploadFileDesc: "घटकांची प्रतिमा किंवा मजकूर फाइल अपलोड करा",
    enterManually: "स्वहस्ते प्रविष्ट करा",
    enterManuallyDesc: "स्वल्पविरामांनी विभक्त केलेले घटक टाइप करा",
    
    scanning: "स्कॅन होत आहे...",
    capturing: "कॅप्चर होत आहे...",
    captureImage: "प्रतिमा कॅप्चर करा",
    retake: "पुन्हा घ्या",
    analyze: "विश्लेषण करा",
    processing: "प्रक्रिया होत आहे...",
    
    enterIngredients: "घटक प्रविष्ट करा",
    ingredientsPlaceholder: "साखर, पाम तेल, गव्हाचे पीठ, मीठ...",
    
    detectedIngredients: "ओळखलेले घटक",
    healthScore: "आरोग्य स्कोअर",
    healthScoreFor: "तुमच्यासाठी आरोग्य स्कोअर",
    safe: "सुरक्षित",
    caution: "सावधगिरी",
    avoid: "टाळा",
    summary: "सारांश",
    dietSuggestions: "वैयक्तिकृत आहार सूचना",
    foodsToInclude: "अधिक वेळा समाविष्ट करायचे पदार्थ",
    foodsToAvoid: "मर्यादित करायचे किंवा टाळायचे पदार्थ",
    scanAnother: "दुसरे स्कॅन करा",
    
    history: "इतिहास",
    noHistory: "अद्याप स्कॅन इतिहास नाही",
    viewDetails: "तपशील पहा",
    
    theme: "थीम",
    light: "प्रकाश",
    dark: "गडद",
    system: "सिस्टम",
    
    language: "भाषा",
    
    errorOccurred: "एक त्रुटी आली",
    tryAgain: "पुन्हा प्रयत्न करा",
    invalidAge: "कृपया वैध वय प्रविष्ट करा",
    selectAtLeastOne: "कृपया किमान एक स्थिती निवडा",
    noIngredientsDetected: "कोणतेही घटक आढळले नाहीत",
    
    loading: "लोड होत आहे...",
    pleaseWait: "कृपया प्रतीक्षा करा...",
  },
  
  ta: {
    appName: "நியூட்ரிகார்டியன்",
    tagline: "பொருட்களை ஸ்கேன் செய்யுங்கள். உங்கள் ஆரோக்கியத்தைப் பாதுகாக்கவும்.",
    login: "உள்நுழைவு",
    signUp: "பதிவு செய்யுங்கள்",
    continueAsGuest: "விருந்தினராக தொடரவும்",
    logout: "வெளியேறு",
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    createAccount: "கணக்கை உருவாக்கவும்",
    alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    dontHaveAccount: "கணக்கு இல்லையா?",
    
    tellUsAboutYou: "உங்களைப் பற்றி சொல்லுங்கள்",
    yourAge: "உங்கள் வயது",
    agePlaceholder: "உங்கள் வயதை உள்ளிடவும்",
    selectHealthConditions: "உங்கள் உடல்நிலைகளைத் தேர்ந்தெடுக்கவும்",
    healthConditionsDesc: "இது உங்கள் பொருட்கள் பகுப்பாய்வை தனிப்பயனாக்க உதவுகிறது",
    other: "மற்றவை",
    otherPlaceholder: "வேறு ஏதேனும் நிலையை உள்ளிடவும்...",
    continue: "தொடரவும்",
    back: "பின்செல்",
    
    thyroid: "தைராய்டு",
    thyroidDesc: "வளர்சிதை மாற்றம் மற்றும் ஹார்மோன் சமநிலையை பாதிக்கும் நிலை",
    highBP: "உயர் இரத்த அழுத்தம்",
    highBPDesc: "இதயம் மற்றும் இரத்த நாளங்களை பாதிக்கும் உயர்ந்த இரத்த அழுத்தம்",
    obesity: "உடல் பருமன்",
    obesityDesc: "வாழ்க்கை முறை நோய்களின் ஆபத்தை அதிகரிக்கும் அதிக உடல் கொழுப்பு",
    pcos: "பிசிஓஎஸ்",
    pcosDesc: "ஒழுங்கற்ற மாதவிடாய் ஏற்படுத்தும் ஹார்மோன் கோளாறு",
    pcod: "பிசிஓடி",
    pcodDesc: "முட்டை வெளியீட்டை பாதிக்கும் சினைப்பை கோளாறு",
    diabetes: "நீரிழிவு",
    diabetesDesc: "இன்சுலின் பிரச்சினைகளால் உயர் இரத்த சர்க்கரை அளவுகள்",
    cholesterol: "கொலஸ்ட்ரால்",
    cholesterolDesc: "இதய ஆரோக்கியத்தை பாதிக்கும் ஆரோக்கியமற்ற இரத்த கொழுப்பு அளவுகள்",
    heartDisease: "இதய நோய்",
    heartDiseaseDesc: "இதய செயல்பாட்டை பாதிக்கும் நிலைமைகள்",
    kidneyDisease: "சிறுநீரக நோய்",
    kidneyDiseaseDesc: "வடிகட்டுதலை பாதிக்கும் குறைந்த சிறுநீரக செயல்பாடு",
    liverDisease: "கல்லீரல் நோய்",
    liverDiseaseDesc: "கல்லீரல் செயல்பாட்டை பாதிக்கும் நிலைமைகள்",
    glutenIntolerance: "குளுட்டன் சகிப்புத்தன்மையின்மை",
    glutenIntoleranceDesc: "குளுட்டன் புரதங்களுக்கு எதிர்மறை எதிர்வினை",
    lactoseIntolerance: "லாக்டோஸ் சகிப்புத்தன்மையின்மை",
    lactoseIntoleranceDesc: "பால் பொருட்களில் லாக்டோஸை செரிக்க சிரமம்",
    
    howWouldYouLike: "பொருட்களை எப்படி சரிபார்க்க விரும்புகிறீர்கள்?",
    scanIngredients: "பொருட்களை ஸ்கேன் செய்யுங்கள்",
    scanIngredientsDesc: "பொருட்கள் லேபிள்களை ஸ்கேன் செய்ய உங்கள் கேமராவைப் பயன்படுத்தவும்",
    scanBarcode: "பார்கோடு ஸ்கேன்",
    scanBarcodeDesc: "உடனடி தேடலுக்கு தயாரிப்பு பார்கோடு ஸ்கேன் செய்யுங்கள்",
    uploadFile: "கோப்பு பதிவேற்றம்",
    uploadFileDesc: "பொருட்களின் படம் அல்லது உரை கோப்பைப் பதிவேற்றவும்",
    enterManually: "கைமுறையாக உள்ளிடவும்",
    enterManuallyDesc: "கமாவால் பிரிக்கப்பட்ட பொருட்களைத் தட்டச்சு செய்யவும்",
    
    scanning: "ஸ்கேன் செய்கிறது...",
    capturing: "படம் பிடிக்கிறது...",
    captureImage: "படம் எடுக்கவும்",
    retake: "மீண்டும் எடு",
    analyze: "பகுப்பாய்வு செய்",
    processing: "செயலாக்குகிறது...",
    
    enterIngredients: "பொருட்களை உள்ளிடவும்",
    ingredientsPlaceholder: "சர்க்கரை, பனை எண்ணெய், கோதுமை மாவு, உப்பு...",
    
    detectedIngredients: "கண்டறியப்பட்ட பொருட்கள்",
    healthScore: "ஆரோக்கிய மதிப்பெண்",
    healthScoreFor: "உங்களுக்கான ஆரோக்கிய மதிப்பெண்",
    safe: "பாதுகாப்பான",
    caution: "எச்சரிக்கை",
    avoid: "தவிர்க்கவும்",
    summary: "சுருக்கம்",
    dietSuggestions: "தனிப்பயனாக்கப்பட்ட உணவு பரிந்துரைகள்",
    foodsToInclude: "அடிக்கடி சேர்க்க வேண்டிய உணவுகள்",
    foodsToAvoid: "கட்டுப்படுத்த அல்லது தவிர்க்க வேண்டிய உணவுகள்",
    scanAnother: "மற்றொன்றை ஸ்கேன் செய்",
    
    history: "வரலாறு",
    noHistory: "இன்னும் ஸ்கேன் வரலாறு இல்லை",
    viewDetails: "விவரங்களைக் காண்க",
    
    theme: "தீம்",
    light: "வெளிர்",
    dark: "இருண்ட",
    system: "சிஸ்டம்",
    
    language: "மொழி",
    
    errorOccurred: "பிழை ஏற்பட்டது",
    tryAgain: "மீண்டும் முயற்சிக்கவும்",
    invalidAge: "சரியான வயதை உள்ளிடவும்",
    selectAtLeastOne: "குறைந்தது ஒரு நிலையைத் தேர்ந்தெடுக்கவும்",
    noIngredientsDetected: "பொருட்கள் எதுவும் கண்டறியப்படவில்லை",
    
    loading: "ஏற்றுகிறது...",
    pleaseWait: "தயவுசெய்து காத்திருங்கள்...",
  },
  
  te: {
    appName: "న్యూట్రిగార్డియన్",
    tagline: "పదార్థాలను స్కాన్ చేయండి. మీ ఆరోగ్యాన్ని రక్షించుకోండి.",
    login: "లాగిన్",
    signUp: "సైన్ అప్",
    continueAsGuest: "అతిథిగా కొనసాగించు",
    logout: "లాగ్అవుట్",
    email: "ఇమెయిల్",
    password: "పాస్‌వర్డ్",
    confirmPassword: "పాస్‌వర్డ్ నిర్ధారించండి",
    createAccount: "ఖాతాను సృష్టించండి",
    alreadyHaveAccount: "ఇప్పటికే ఖాతా ఉందా?",
    dontHaveAccount: "ఖాతా లేదా?",
    
    tellUsAboutYou: "మీ గురించి చెప్పండి",
    yourAge: "మీ వయస్సు",
    agePlaceholder: "మీ వయస్సును నమోదు చేయండి",
    selectHealthConditions: "మీ ఆరోగ్య పరిస్థితులను ఎంచుకోండి",
    healthConditionsDesc: "ఇది మీ పదార్థాల విశ్లేషణను వ్యక్తిగతీకరించడంలో సహాయపడుతుంది",
    other: "ఇతర",
    otherPlaceholder: "ఏదైనా ఇతర పరిస్థితిని నమోదు చేయండి...",
    continue: "కొనసాగించు",
    back: "వెనుకకు",
    
    thyroid: "థైరాయిడ్",
    thyroidDesc: "జీవక్రియ మరియు హార్మోన్ సమతుల్యతను ప్రభావితం చేసే పరిస్థితి",
    highBP: "అధిక రక్తపోటు",
    highBPDesc: "గుండె మరియు రక్త నాళాలను ప్రభావితం చేసే పెరిగిన రక్తపోటు",
    obesity: "ఊబకాయం",
    obesityDesc: "జీవనశైలి వ్యాధుల ప్రమాదాన్ని పెంచే అధిక శరీర కొవ్వు",
    pcos: "పిసిఓఎస్",
    pcosDesc: "క్రమరహిత పీరియడ్స్ కలిగించే హార్మోన్ రుగ్మత",
    pcod: "పిసిఓడి",
    pcodDesc: "గుడ్డు విడుదలను ప్రభావితం చేసే అండాశయ రుగ్మత",
    diabetes: "మధుమేహం",
    diabetesDesc: "ఇన్సులిన్ సమస్యల వల్ల అధిక రక్త చక్కెర స్థాయిలు",
    cholesterol: "కొలెస్ట్రాల్",
    cholesterolDesc: "గుండె ఆరోగ్యాన్ని ప్రభావితం చేసే అనారోగ్యకరమైన రక్త కొవ్వు స్థాయిలు",
    heartDisease: "గుండె జబ్బు",
    heartDiseaseDesc: "గుండె పనితీరును ప్రభావితం చేసే పరిస్థితులు",
    kidneyDisease: "మూత్రపిండ వ్యాధి",
    kidneyDiseaseDesc: "వడపోతను ప్రభావితం చేసే తగ్గిన మూత్రపిండ పనితీరు",
    liverDisease: "కాలేయ వ్యాధి",
    liverDiseaseDesc: "కాలేయ పనితీరును ప్రభావితం చేసే పరిస్థితులు",
    glutenIntolerance: "గ్లూటెన్ అసహనం",
    glutenIntoleranceDesc: "గ్లూటెన్ ప్రోటీన్లకు ప్రతికూల ప్రతిచర్య",
    lactoseIntolerance: "లాక్టోస్ అసహనం",
    lactoseIntoleranceDesc: "పాల ఉత్పత్తులలో లాక్టోస్‌ను జీర్ణించడంలో ఇబ్బంది",
    
    howWouldYouLike: "పదార్థాలను ఎలా తనిఖీ చేయాలనుకుంటున్నారు?",
    scanIngredients: "పదార్థాలను స్కాన్ చేయండి",
    scanIngredientsDesc: "పదార్థాల లేబుల్‌లను స్కాన్ చేయడానికి మీ కెమెరాను ఉపయోగించండి",
    scanBarcode: "బార్‌కోడ్ స్కాన్",
    scanBarcodeDesc: "తక్షణ శోధన కోసం ఉత్పత్తి బార్‌కోడ్ స్కాన్ చేయండి",
    uploadFile: "ఫైల్ అప్‌లోడ్",
    uploadFileDesc: "పదార్థాల చిత్రం లేదా టెక్స్ట్ ఫైల్‌ను అప్‌లోడ్ చేయండి",
    enterManually: "మానవీయంగా నమోదు చేయండి",
    enterManuallyDesc: "కామాలతో వేరు చేసిన పదార్థాలను టైప్ చేయండి",
    
    scanning: "స్కాన్ అవుతోంది...",
    capturing: "క్యాప్చర్ అవుతోంది...",
    captureImage: "చిత్రం తీయండి",
    retake: "మళ్ళీ తీయండి",
    analyze: "విశ్లేషించు",
    processing: "ప్రాసెస్ అవుతోంది...",
    
    enterIngredients: "పదార్థాలను నమోదు చేయండి",
    ingredientsPlaceholder: "చక్కెర, పామాయిల్, గోధుమ పిండి, ఉప్పు...",
    
    detectedIngredients: "గుర్తించిన పదార్థాలు",
    healthScore: "ఆరోగ్య స్కోర్",
    healthScoreFor: "మీ కోసం ఆరోగ్య స్కోర్",
    safe: "సురక్షితం",
    caution: "జాగ్రత్త",
    avoid: "నివారించండి",
    summary: "సారాంశం",
    dietSuggestions: "వ్యక్తిగతీకరించిన ఆహార సూచనలు",
    foodsToInclude: "తరచుగా చేర్చవలసిన ఆహారాలు",
    foodsToAvoid: "పరిమితం చేయవలసిన లేదా నివారించవలసిన ఆహారాలు",
    scanAnother: "మరొకటి స్కాన్ చేయండి",
    
    history: "చరిత్ర",
    noHistory: "ఇంకా స్కాన్ చరిత్ర లేదు",
    viewDetails: "వివరాలు చూడండి",
    
    theme: "థీమ్",
    light: "లైట్",
    dark: "డార్క్",
    system: "సిస్టమ్",
    
    language: "భాష",
    
    errorOccurred: "లోపం సంభవించింది",
    tryAgain: "మళ్ళీ ప్రయత్నించండి",
    invalidAge: "దయచేసి చెల్లుబాటు అయ్యే వయస్సును నమోదు చేయండి",
    selectAtLeastOne: "దయచేసి కనీసం ఒక పరిస్థితిని ఎంచుకోండి",
    noIngredientsDetected: "పదార్థాలు ఏవీ గుర్తించబడలేదు",
    
    loading: "లోడ్ అవుతోంది...",
    pleaseWait: "దయచేసి వేచి ఉండండి...",
  },
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  kn: 'ಕನ್ನಡ',
  mr: 'मराठी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
};
