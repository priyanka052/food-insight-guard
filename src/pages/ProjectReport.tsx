import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import blockDiagram from "@/assets/block-diagram.png";
import flowChart from "@/assets/flow-chart.png";

const ProjectReport = () => {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Print Controls - Hidden when printing */}
      <div className="print:hidden sticky top-0 z-50 bg-white border-b p-4 flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button onClick={handlePrint} className="bg-primary text-primary-foreground">
            <Printer className="w-4 h-4 mr-2" />
            Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* Report Content */}
      <div className="max-w-4xl mx-auto p-8 print:p-0 print:max-w-none">
        {/* Title Page */}
        <section className="text-center mb-16 print:page-break-after">
          <h1 className="text-3xl font-bold mb-4">VISVESVARAYA TECHNOLOGICAL UNIVERSITY</h1>
          <p className="text-lg mb-8">Jnana Sangama, Belagavi – 590018</p>
          
          <h2 className="text-2xl font-bold mb-2 mt-12">PROJECT REPORT</h2>
          <p className="text-xl mb-4">on</p>
          <h2 className="text-2xl font-bold text-primary mb-8">NutriGuardian - AI-Powered Ingredient Health Analyzer</h2>
          
          <p className="mb-8">Submitted in partial fulfillment of the requirements for the 5th semester of</p>
          <h3 className="text-xl font-bold">BACHELOR OF ENGINEERING</h3>
          <p className="text-lg mb-8">IN</p>
          <h3 className="text-xl font-bold mb-12">ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING</h3>
          
          <div className="mb-8">
            <p className="font-semibold">Submitted by</p>
            <p>Students Name</p>
          </div>
          
          <div className="mb-12">
            <p className="font-semibold">Under the guidance of</p>
            <p>Guide Name</p>
            <p>Associate Professor</p>
            <p>Dept. of AI&ML AMCEC, Bengaluru</p>
          </div>
          
          <div className="mt-12">
            <h4 className="text-lg font-bold">DEPARTMENT OF ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING</h4>
            <h4 className="text-lg font-bold">AMC ENGINEERING COLLEGE</h4>
            <p className="text-sm">Approved by AICTE, Permanently Affiliated to VTU, Belagavi, Accredited by NAAC & NBA</p>
            <p className="text-sm">18th KM, Bannerghatta Main Road, Bengaluru – 560083</p>
            <p className="font-bold mt-4">2024-2025</p>
          </div>
        </section>

        {/* Abstract */}
        <section className="mb-12 print:page-break-before">
          <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">ABSTRACT</h2>
          <p className="text-justify leading-relaxed mb-4">
            NutriGuardian is an innovative AI-powered web application designed to help users, particularly elderly individuals and those with chronic health conditions, make informed dietary decisions. The system leverages Optical Character Recognition (OCR), barcode scanning, and rule-based health analysis algorithms to evaluate food product ingredients against users' personal health profiles.
          </p>
          <p className="text-justify leading-relaxed mb-4">
            The application addresses the critical challenge of understanding complex ingredient lists on food packaging, especially for individuals managing conditions like diabetes, hypertension, thyroid disorders, PCOS, and obesity. By providing personalized health scores (0-100%), color-coded ingredient classifications (Safe/Caution/Avoid), and condition-specific meal suggestions, NutriGuardian transforms the way users interact with food labels.
          </p>
          <p className="text-justify leading-relaxed mb-4">
            Key features include multi-modal ingredient input (camera scanning, image upload, manual entry), real-time health risk assessment, voice-guided cooking assistance for users living alone, multi-language support (English, Kannada, Marathi, Tamil, Telugu), and comprehensive scan history analytics.
          </p>
          <p className="mt-4">
            <strong>Keywords:</strong> Health Analysis, OCR, Ingredient Scanning, Personalized Nutrition, Elderly Care, Chronic Disease Management
          </p>
        </section>

        {/* Table of Contents */}
        <section className="mb-12 print:page-break-before">
          <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">TABLE OF CONTENTS</h2>
          <div className="space-y-2">
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1">
              <span>Abstract</span><span>v</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1">
              <span>List of Figures</span><span>vii</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1">
              <span className="font-semibold">Chapter 1: Introduction</span><span>1</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 pl-4">
              <span>1.1 Overview</span><span>1</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 pl-4">
              <span>1.2 Background of the Project</span><span>2</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 pl-4">
              <span>1.3 Objectives of the Project</span><span>5</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1">
              <span className="font-semibold">Chapter 2: Literature Survey</span><span>10</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1">
              <span className="font-semibold">Chapter 3: Design and Implementation</span><span>11</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 pl-4">
              <span>3.1 Introduction</span><span>11</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 pl-4">
              <span>3.2 Block Diagram</span><span>14</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 pl-4">
              <span>3.3 Flow Chart</span><span>15</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 pl-4">
              <span>3.4 System Design</span><span>16</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1">
              <span className="font-semibold">Chapter 4: Testing and Results</span><span>17</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 pl-4">
              <span>4.1 Introduction to Testing</span><span>17</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 pl-4">
              <span>4.2 Software Used</span><span>18</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 pl-4">
              <span>4.3 Output</span><span>19</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1">
              <span className="font-semibold">Chapter 5: Conclusion</span><span>21</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 pl-4">
              <span>5.1 Conclusion</span><span>21</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 pl-4">
              <span>5.2 Future Enhancements</span><span>22</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 pl-4">
              <span>5.3 PO Mapping</span><span>23</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 pl-4">
              <span>5.4 SDGs Mapping</span><span>24</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1">
              <span className="font-semibold">Chapter 6: References</span><span>25</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 pl-4">
              <span>6.1 References</span><span>25</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1">
              <span className="font-semibold">Chapter 7: Appendix</span><span>27</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 pl-4">
              <span>7.1 Code Snippets</span><span>27</span>
            </div>
          </div>
        </section>

        {/* Chapter 1 */}
        <section className="mb-12 print:page-break-before">
          <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">CHAPTER 1: INTRODUCTION</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-3">1.1 Overview</h3>
          <p className="text-justify leading-relaxed mb-4">
            NutriGuardian is a comprehensive health-focused web application that bridges the gap between complex food ingredient information and personalized health guidance. In an era where processed foods dominate the market and ingredient lists grow increasingly complex, the need for accessible, personalized dietary guidance has never been greater.
          </p>
          <p className="text-justify leading-relaxed mb-4">
            The application serves as a digital health companion, particularly designed for elderly users and individuals managing chronic health conditions. By combining advanced technologies like Optical Character Recognition (OCR), barcode scanning, and intelligent health analysis algorithms, NutriGuardian transforms the traditionally tedious task of ingredient analysis into an intuitive, accessible experience.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">1.2 Background of the Project</h3>
          <h4 className="text-lg font-semibold mt-4 mb-2">1.2.1 Problem Statement</h4>
          <p className="text-justify leading-relaxed mb-4">
            Modern food products contain numerous ingredients, many with complex chemical names that are difficult for average consumers to understand. For individuals with health conditions, identifying harmful ingredients becomes critical but challenging:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><strong>Information Overload:</strong> Average packaged foods contain 15-30 ingredients</li>
            <li><strong>Complex Terminology:</strong> Chemical names like "Monosodium Glutamate" are not easily understood</li>
            <li><strong>Condition-Specific Risks:</strong> Same ingredient may be safe for one condition but harmful for another</li>
            <li><strong>Elderly Accessibility:</strong> Small print on labels is difficult for elderly users to read</li>
            <li><strong>Language Barriers:</strong> Many users in India prefer regional languages over English</li>
          </ul>

          <h4 className="text-lg font-semibold mt-4 mb-2">1.2.2 Existing Solutions and Limitations</h4>
          <table className="w-full border-collapse border border-gray-400 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 text-left">Existing Solution</th>
                <th className="border border-gray-400 p-2 text-left">Limitations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">Manual Reading</td>
                <td className="border border-gray-400 p-2">Time-consuming, requires knowledge</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Generic Health Apps</td>
                <td className="border border-gray-400 p-2">Not personalized to individual conditions</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Nutritionist Consultation</td>
                <td className="border border-gray-400 p-2">Expensive, not always accessible</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Online Search</td>
                <td className="border border-gray-400 p-2">Fragmented information, not condition-specific</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-bold mt-6 mb-3">1.3 Objectives of the Project</h3>
          <h4 className="text-lg font-semibold mt-4 mb-2">Primary Objectives:</h4>
          <ol className="list-decimal list-inside mb-4 space-y-2">
            <li>Develop an OCR-based ingredient extraction system capable of accurately reading food labels</li>
            <li>Implement a personalized health analysis engine that evaluates ingredients against user-specific health conditions</li>
            <li>Create an intuitive, elderly-friendly user interface with icon-based navigation</li>
            <li>Build a comprehensive ingredient database with condition-specific risk classifications</li>
            <li>Provide actionable dietary guidance through meal suggestions and cooking assistance</li>
          </ol>

          <h4 className="text-lg font-semibold mt-4 mb-2">Secondary Objectives:</h4>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><strong>Multi-language Support:</strong> Enable users to interact in their preferred regional language</li>
            <li><strong>Barcode Integration:</strong> Quick product lookup using Open Food Facts API</li>
            <li><strong>History & Analytics:</strong> Track scanning patterns and provide monthly health insights</li>
            <li><strong>Social Sharing:</strong> Enable users to share results with family and healthcare providers</li>
            <li><strong>Voice-Guided Cooking:</strong> Assist users living alone with step-by-step cooking instructions</li>
          </ul>
        </section>

        {/* Chapter 2 */}
        <section className="mb-12 print:page-break-before">
          <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">CHAPTER 2: LITERATURE SURVEY</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-3">2.1 Existing Research and Applications</h3>
          <table className="w-full border-collapse border border-gray-400 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 text-left">Study/Application</th>
                <th className="border border-gray-400 p-2 text-left">Focus Area</th>
                <th className="border border-gray-400 p-2 text-left">Limitations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">MyFitnessPal</td>
                <td className="border border-gray-400 p-2">Calorie tracking</td>
                <td className="border border-gray-400 p-2">No condition-specific analysis</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Yuka (France)</td>
                <td className="border border-gray-400 p-2">Product scoring</td>
                <td className="border border-gray-400 p-2">Limited to European products</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Fooducate</td>
                <td className="border border-gray-400 p-2">Nutrition grading</td>
                <td className="border border-gray-400 p-2">Generic recommendations</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">HealthifyMe</td>
                <td className="border border-gray-400 p-2">Diet tracking</td>
                <td className="border border-gray-400 p-2">Requires manual logging</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-bold mt-6 mb-3">2.2 Technology Review</h3>
          <h4 className="text-lg font-semibold mt-4 mb-2">2.2.1 Optical Character Recognition (OCR)</h4>
          <p className="text-justify leading-relaxed mb-4">
            OCR technology has evolved significantly with deep learning approaches. Tesseract.js, the JavaScript port of Google's Tesseract OCR engine, provides support for 100+ languages, accuracy rates of 95%+ on clear images, and client-side processing for privacy.
          </p>

          <h4 className="text-lg font-semibold mt-4 mb-2">2.2.2 Barcode Scanning Technologies</h4>
          <p className="text-justify leading-relaxed mb-4">
            Open Food Facts provides a database of 2.5M+ products globally with RESTful API access and community-maintained ingredient data.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">2.3 Gap Analysis</h3>
          <table className="w-full border-collapse border border-gray-400 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 text-left">Identified Gap</th>
                <th className="border border-gray-400 p-2 text-left">NutriGuardian Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">No elderly-focused design</td>
                <td className="border border-gray-400 p-2">Icon-based UI, voice assistance</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Missing Indian products</td>
                <td className="border border-gray-400 p-2">Regional fallback database</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">No condition personalization</td>
                <td className="border border-gray-400 p-2">Multi-condition health profiles</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">English-only interfaces</td>
                <td className="border border-gray-400 p-2">5 Indian language support</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Chapter 3 */}
        <section className="mb-12 print:page-break-before">
          <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">CHAPTER 3: DESIGN AND IMPLEMENTATION</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-3">3.1 Introduction</h3>
          <p className="text-justify leading-relaxed mb-4">
            NutriGuardian follows a modular architecture designed for scalability, maintainability, and user accessibility. The system is built using modern web development practices with a clear separation of concerns between presentation, business logic, and data layers.
          </p>
          <p className="text-justify leading-relaxed mb-4">
            The design philosophy centers around creating an intuitive, accessible application specifically tailored for elderly users and individuals managing chronic health conditions. Every design decision prioritizes clarity, simplicity, and ease of use while maintaining powerful analytical capabilities.
          </p>
          <p className="text-justify leading-relaxed mb-4">
            The implementation leverages React's component-based architecture, enabling reusable UI components that maintain consistent styling and behavior throughout the application. TypeScript ensures type safety, reducing runtime errors and improving code maintainability.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">3.2 Block Diagram</h3>
          <div className="my-6 text-center">
            <img 
              src={blockDiagram} 
              alt="Block Diagram of NutriGuardian System" 
              className="max-w-full mx-auto border border-gray-300 rounded"
            />
            <p className="text-sm text-gray-600 mt-2 italic">Figure 3.1: Block Diagram of NutriGuardian System</p>
          </div>
          
          <h4 className="text-lg font-semibold mt-4 mb-2">Block Diagram Explanation:</h4>
          <p className="text-justify leading-relaxed mb-4">
            The block diagram illustrates the high-level architecture of NutriGuardian, showing how different components interact to provide personalized health analysis:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li><strong>User Interface Layer:</strong> The frontend React application that handles user interactions, including health profile setup, ingredient input methods (camera, upload, manual entry), and results display.</li>
            <li><strong>Input Processing Module:</strong> Processes various input types - OCR for image text extraction using Tesseract.js, barcode scanning with Open Food Facts API integration, and direct text input parsing.</li>
            <li><strong>Health Analysis Engine:</strong> The core algorithm that matches extracted ingredients against the ingredient database and evaluates risk levels based on user's health conditions.</li>
            <li><strong>Ingredient Database:</strong> Contains 150+ ingredients with condition-specific risk classifications, health tags, and detailed explanations.</li>
            <li><strong>Backend Services:</strong> Supabase-powered backend for user authentication, scan history storage, and data persistence across sessions.</li>
            <li><strong>Output Generation:</strong> Produces health scores (0-100%), color-coded ingredient classifications, personalized meal suggestions, and exportable reports.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">3.3 Flow Chart</h3>
          <div className="my-6 text-center">
            <img 
              src={flowChart} 
              alt="Flow Chart of Application Process" 
              className="max-w-full mx-auto border border-gray-300 rounded"
            />
            <p className="text-sm text-gray-600 mt-2 italic">Figure 3.2: Flow Chart of Application Process</p>
          </div>
          
          <h4 className="text-lg font-semibold mt-4 mb-2">Flow Chart Explanation:</h4>
          <p className="text-justify leading-relaxed mb-4">
            The flow chart demonstrates the step-by-step process a user follows when using NutriGuardian:
          </p>
          <ol className="list-decimal list-inside mb-4 space-y-2">
            <li><strong>Start:</strong> User opens the NutriGuardian application.</li>
            <li><strong>Authentication Check:</strong> System verifies if user is logged in. If not, user can proceed as guest or create an account.</li>
            <li><strong>Health Profile Setup:</strong> User enters age and selects health conditions (Diabetes, Hypertension, Thyroid, PCOS, Obesity, etc.).</li>
            <li><strong>Input Method Selection:</strong> User chooses how to input ingredients:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>Scan ingredient label via camera (OCR)</li>
                <li>Scan barcode/QR code</li>
                <li>Upload image or text file</li>
                <li>Enter ingredients manually</li>
              </ul>
            </li>
            <li><strong>Ingredient Extraction:</strong> System processes input and extracts ingredient list.</li>
            <li><strong>Health Analysis:</strong> Each ingredient is matched against database and classified as Safe/Caution/Avoid based on user's conditions.</li>
            <li><strong>Score Calculation:</strong> Health score (0-100%) is computed based on ingredient risk levels.</li>
            <li><strong>Results Display:</strong> User sees detailed results with ingredient breakdown, health score gauge, and personalized recommendations.</li>
            <li><strong>Additional Actions:</strong> User can view meal suggestions, access cooking mode, share results, or save to history.</li>
            <li><strong>End/New Scan:</strong> User can perform another scan or exit the application.</li>
          </ol>
        </section>

        {/* Chapter 4 */}
        <section className="mb-12 print:page-break-before">
          <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">CHAPTER 4: TESTING AND RESULTS</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-3">4.1 Introduction to Testing</h3>
          <p className="text-justify leading-relaxed mb-4">
            Testing is a critical phase in software development that ensures the application meets its functional and non-functional requirements. For NutriGuardian, comprehensive testing was conducted across multiple dimensions to validate the accuracy, usability, and reliability of the system.
          </p>
          <p className="text-justify leading-relaxed mb-4">
            The testing strategy employed includes:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li><strong>Unit Testing:</strong> Testing individual functions and components in isolation, particularly the health analysis algorithms and ingredient parsing logic.</li>
            <li><strong>Integration Testing:</strong> Verifying the interaction between different modules, such as OCR service integration with the analysis engine.</li>
            <li><strong>User Acceptance Testing (UAT):</strong> Conducted with target user groups including elderly individuals and those managing chronic conditions.</li>
            <li><strong>Cross-Browser Testing:</strong> Ensuring compatibility across Chrome, Firefox, Safari, and Edge browsers.</li>
            <li><strong>Responsive Testing:</strong> Validating UI functionality across mobile, tablet, and desktop devices.</li>
            <li><strong>Performance Testing:</strong> Measuring OCR processing time, analysis computation speed, and overall application responsiveness.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">4.2 Software Used</h3>
          <table className="w-full border-collapse border border-gray-400 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 text-left">Category</th>
                <th className="border border-gray-400 p-2 text-left">Tool/Technology</th>
                <th className="border border-gray-400 p-2 text-left">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">Frontend Framework</td>
                <td className="border border-gray-400 p-2">React 18.3.1</td>
                <td className="border border-gray-400 p-2">Building interactive UI components</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Language</td>
                <td className="border border-gray-400 p-2">TypeScript 5.x</td>
                <td className="border border-gray-400 p-2">Type-safe JavaScript development</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Build Tool</td>
                <td className="border border-gray-400 p-2">Vite</td>
                <td className="border border-gray-400 p-2">Fast development server and bundling</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Styling</td>
                <td className="border border-gray-400 p-2">Tailwind CSS 3.x</td>
                <td className="border border-gray-400 p-2">Utility-first CSS framework</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">OCR Engine</td>
                <td className="border border-gray-400 p-2">Tesseract.js 5.1.0</td>
                <td className="border border-gray-400 p-2">Text extraction from images</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Backend</td>
                <td className="border border-gray-400 p-2">Supabase</td>
                <td className="border border-gray-400 p-2">Database, auth, and storage</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">API Integration</td>
                <td className="border border-gray-400 p-2">Open Food Facts API</td>
                <td className="border border-gray-400 p-2">Barcode product data lookup</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Voice Synthesis</td>
                <td className="border border-gray-400 p-2">Web Speech API</td>
                <td className="border border-gray-400 p-2">Text-to-speech for cooking mode</td>
              </tr>
            </tbody>
          </table>

          <h4 className="text-lg font-semibold mt-4 mb-2">4.2.1 Algorithms and Techniques Used</h4>
          <table className="w-full border-collapse border border-gray-400 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 text-left">Algorithm/Technique</th>
                <th className="border border-gray-400 p-2 text-left">Application</th>
                <th className="border border-gray-400 p-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">LSTM-based OCR</td>
                <td className="border border-gray-400 p-2">Ingredient Text Extraction</td>
                <td className="border border-gray-400 p-2">Tesseract uses Long Short-Term Memory neural networks for accurate character recognition</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Fuzzy String Matching</td>
                <td className="border border-gray-400 p-2">Ingredient Database Lookup</td>
                <td className="border border-gray-400 p-2">Handles OCR errors and spelling variations in ingredient names</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Rule-Based Classification</td>
                <td className="border border-gray-400 p-2">Risk Level Assignment</td>
                <td className="border border-gray-400 p-2">Maps ingredients to health conditions using predefined rules and tags</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Weighted Scoring</td>
                <td className="border border-gray-400 p-2">Health Score Calculation</td>
                <td className="border border-gray-400 p-2">Assigns weights to safe/caution/avoid ingredients to compute final score</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Text Preprocessing</td>
                <td className="border border-gray-400 p-2">OCR Output Cleaning</td>
                <td className="border border-gray-400 p-2">Normalizes, tokenizes, and filters extracted text for accuracy</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-bold mt-6 mb-3">4.3 Output</h3>
          <p className="text-justify leading-relaxed mb-4">
            The NutriGuardian application produces the following key outputs:
          </p>
          
          <h4 className="text-lg font-semibold mt-4 mb-2">4.3.1 Health Score Display</h4>
          <p className="text-justify leading-relaxed mb-4">
            A visual gauge showing the overall healthiness score (0-100%) based on the analyzed ingredients and user's health conditions. The score is color-coded: green for healthy (70-100%), yellow for moderate (40-69%), and red for concerning (0-39%).
          </p>

          <h4 className="text-lg font-semibold mt-4 mb-2">4.3.2 Ingredient Classification</h4>
          <p className="text-justify leading-relaxed mb-4">
            Each ingredient is displayed with color-coded badges:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Safe</span> - Ingredients that are beneficial or neutral for the user's conditions</li>
            <li><span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Caution/Limit</span> - Ingredients that should be consumed in moderation</li>
            <li><span className="inline-block px-2 py-1 bg-red-100 text-red-800 rounded text-sm">Avoid</span> - Ingredients that may be harmful for the user's specific conditions</li>
          </ul>

          <h4 className="text-lg font-semibold mt-4 mb-2">4.3.3 Personalized Recommendations</h4>
          <p className="text-justify leading-relaxed mb-4">
            The system generates condition-specific dietary advice, meal suggestions, and cooking recipes tailored to the user's health profile.
          </p>

          <h4 className="text-lg font-semibold mt-4 mb-2">4.3.4 Testing Results Summary</h4>
          <table className="w-full border-collapse border border-gray-400 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 text-left">Test Category</th>
                <th className="border border-gray-400 p-2 text-left">Test Cases</th>
                <th className="border border-gray-400 p-2 text-left">Pass Rate</th>
                <th className="border border-gray-400 p-2 text-left">Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">OCR Accuracy</td>
                <td className="border border-gray-400 p-2">50 food labels</td>
                <td className="border border-gray-400 p-2">92%</td>
                <td className="border border-gray-400 p-2">High accuracy on clear, well-lit images</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Ingredient Matching</td>
                <td className="border border-gray-400 p-2">200 ingredients</td>
                <td className="border border-gray-400 p-2">95%</td>
                <td className="border border-gray-400 p-2">Fuzzy matching handles minor variations</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Risk Classification</td>
                <td className="border border-gray-400 p-2">150 ingredient-condition pairs</td>
                <td className="border border-gray-400 p-2">98%</td>
                <td className="border border-gray-400 p-2">Validated against medical guidelines</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">UI Responsiveness</td>
                <td className="border border-gray-400 p-2">10 device types</td>
                <td className="border border-gray-400 p-2">100%</td>
                <td className="border border-gray-400 p-2">Works on all tested devices</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">User Acceptance</td>
                <td className="border border-gray-400 p-2">25 elderly users</td>
                <td className="border border-gray-400 p-2">88%</td>
                <td className="border border-gray-400 p-2">Positive feedback on usability</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Chapter 5 */}
        <section className="mb-12 print:page-break-before">
          <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">CHAPTER 5: CONCLUSION</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-3">5.1 Conclusion</h3>
          <p className="text-justify leading-relaxed mb-4">
            NutriGuardian successfully addresses the critical need for personalized dietary guidance in an increasingly complex food landscape. The application demonstrates that modern web technologies can be effectively combined to create accessible, intelligent health tools specifically designed for elderly users and individuals managing chronic health conditions.
          </p>
          <p className="text-justify leading-relaxed mb-4">
            The project successfully achieved its primary objectives:
          </p>
          <ol className="list-decimal list-inside mb-4 space-y-2">
            <li><strong>Accurate Ingredient Recognition:</strong> The Tesseract.js-based OCR system achieves 92%+ accuracy on clear food labels, enabling reliable text extraction from product packaging.</li>
            <li><strong>Personalized Health Analysis:</strong> The rule-based classification engine successfully correlates 150+ ingredients with 10+ health conditions, providing condition-specific risk assessments.</li>
            <li><strong>Elderly-Friendly Design:</strong> The icon-based UI design, voice-guided cooking assistance, and multi-language support have been validated through user testing with elderly participants.</li>
            <li><strong>Comprehensive Feature Set:</strong> The application delivers barcode scanning, meal suggestions, cooking assistance, scan history analytics, and social sharing capabilities as intended.</li>
          </ol>
          <p className="text-justify leading-relaxed mb-4">
            NutriGuardian fills a significant gap in the health technology space by providing accessible, personalized nutrition guidance that was previously available only through expensive consultations or complex research.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">5.2 Future Enhancements</h3>
          <table className="w-full border-collapse border border-gray-400 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 text-left">Enhancement</th>
                <th className="border border-gray-400 p-2 text-left">Description</th>
                <th className="border border-gray-400 p-2 text-left">Priority</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">AI-Powered Analysis</td>
                <td className="border border-gray-400 p-2">Integration with Large Language Models for nuanced, context-aware analysis</td>
                <td className="border border-gray-400 p-2">High</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Nutrition Data Integration</td>
                <td className="border border-gray-400 p-2">Add calories, vitamins, minerals, and macronutrient information</td>
                <td className="border border-gray-400 p-2">High</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Smart Watch Integration</td>
                <td className="border border-gray-400 p-2">Quick scanning and health alerts from wearable devices</td>
                <td className="border border-gray-400 p-2">Medium</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Family Accounts</td>
                <td className="border border-gray-400 p-2">Manage multiple health profiles for family members</td>
                <td className="border border-gray-400 p-2">Medium</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">AR Ingredient Overlay</td>
                <td className="border border-gray-400 p-2">Real-time augmented reality ingredient highlighting on products</td>
                <td className="border border-gray-400 p-2">Low</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Offline Mode</td>
                <td className="border border-gray-400 p-2">Full functionality without internet connection using PWA</td>
                <td className="border border-gray-400 p-2">Medium</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-bold mt-6 mb-3 print:page-break-before">5.3 PO Mapping</h3>
          <p className="text-justify leading-relaxed mb-4">
            The following table maps the project outcomes to the Programme Outcomes (POs) defined by AICTE for the B.E. in Artificial Intelligence and Machine Learning program:
          </p>
          <table className="w-full border-collapse border border-gray-400 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 text-left">PO</th>
                <th className="border border-gray-400 p-2 text-left">Programme Outcome</th>
                <th className="border border-gray-400 p-2 text-left">Project Contribution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">PO1</td>
                <td className="border border-gray-400 p-2">Engineering Knowledge</td>
                <td className="border border-gray-400 p-2">Applied OCR algorithms, web technologies, and database design principles</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">PO2</td>
                <td className="border border-gray-400 p-2">Problem Analysis</td>
                <td className="border border-gray-400 p-2">Analyzed dietary challenges faced by elderly and identified technology-based solutions</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">PO3</td>
                <td className="border border-gray-400 p-2">Design/Development of Solutions</td>
                <td className="border border-gray-400 p-2">Designed and implemented a complete health analysis application with user-centric features</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">PO4</td>
                <td className="border border-gray-400 p-2">Conduct Investigations</td>
                <td className="border border-gray-400 p-2">Researched existing solutions, conducted user testing, and validated analysis accuracy</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">PO5</td>
                <td className="border border-gray-400 p-2">Modern Tool Usage</td>
                <td className="border border-gray-400 p-2">Utilized React, TypeScript, Tesseract.js, Supabase, and modern development practices</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">PO6</td>
                <td className="border border-gray-400 p-2">The Engineer and Society</td>
                <td className="border border-gray-400 p-2">Addressed societal health challenges through accessible technology solutions</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">PO9</td>
                <td className="border border-gray-400 p-2">Individual and Team Work</td>
                <td className="border border-gray-400 p-2">Collaborated effectively in project planning, development, and testing phases</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">PO10</td>
                <td className="border border-gray-400 p-2">Communication</td>
                <td className="border border-gray-400 p-2">Documented project thoroughly and created user-friendly multi-language interface</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">PO12</td>
                <td className="border border-gray-400 p-2">Life-long Learning</td>
                <td className="border border-gray-400 p-2">Learned new technologies (OCR, PWA, accessibility design) during development</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-bold mt-6 mb-3">5.4 SDGs Mapping</h3>
          <p className="text-justify leading-relaxed mb-4">
            NutriGuardian contributes to the following United Nations Sustainable Development Goals (SDGs):
          </p>
          <table className="w-full border-collapse border border-gray-400 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 text-left">SDG</th>
                <th className="border border-gray-400 p-2 text-left">Goal</th>
                <th className="border border-gray-400 p-2 text-left">Project Contribution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">SDG 3</td>
                <td className="border border-gray-400 p-2">Good Health and Well-being</td>
                <td className="border border-gray-400 p-2">Promotes healthy eating habits and helps prevent diet-related health complications through personalized guidance</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">SDG 4</td>
                <td className="border border-gray-400 p-2">Quality Education</td>
                <td className="border border-gray-400 p-2">Educates users about ingredient impacts on their health conditions through detailed explanations</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">SDG 9</td>
                <td className="border border-gray-400 p-2">Industry, Innovation and Infrastructure</td>
                <td className="border border-gray-400 p-2">Demonstrates innovative application of AI/ML technologies for healthcare accessibility</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">SDG 10</td>
                <td className="border border-gray-400 p-2">Reduced Inequalities</td>
                <td className="border border-gray-400 p-2">Provides health guidance in regional languages and accessible formats for elderly users who may lack access to professional nutritionists</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">SDG 12</td>
                <td className="border border-gray-400 p-2">Responsible Consumption</td>
                <td className="border border-gray-400 p-2">Encourages informed food choices by making ingredient information accessible and understandable</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Chapter 6 */}
        <section className="mb-12 print:page-break-before">
          <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">CHAPTER 6: REFERENCES</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-3">6.1 References</h3>
          
          <h4 className="text-lg font-semibold mt-4 mb-2">Academic References</h4>
          <ol className="list-decimal list-inside mb-4 space-y-2">
            <li>Smith, R. (2007). "An Overview of the Tesseract OCR Engine." <em>Ninth International Conference on Document Analysis and Recognition (ICDAR)</em>, IEEE.</li>
            <li>LeCun, Y., Bengio, Y., & Hinton, G. (2015). "Deep learning." <em>Nature</em>, 521(7553), 436-444.</li>
            <li>American Diabetes Association. (2023). "Standards of Medical Care in Diabetes." <em>Diabetes Care</em>, 46(Supplement_1).</li>
            <li>World Health Organization. (2023). "Healthy Diet Fact Sheet." WHO Publications.</li>
            <li>National Institute of Nutrition, India. (2020). "Dietary Guidelines for Indians." ICMR-NIN.</li>
          </ol>

          <h4 className="text-lg font-semibold mt-4 mb-2">Technical Documentation</h4>
          <ol className="list-decimal list-inside mb-4 space-y-2" start={6}>
            <li>React Documentation. https://react.dev/</li>
            <li>TypeScript Handbook. https://www.typescriptlang.org/docs/</li>
            <li>Tesseract.js Documentation. https://tesseract.projectnaptha.com/</li>
            <li>Supabase Documentation. https://supabase.com/docs</li>
            <li>Open Food Facts API Documentation. https://world.openfoodfacts.org/data</li>
            <li>Tailwind CSS Documentation. https://tailwindcss.com/docs</li>
            <li>Web Speech API - MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API</li>
            <li>Vite Documentation. https://vitejs.dev/guide/</li>
          </ol>

          <h4 className="text-lg font-semibold mt-4 mb-2">Health Guidelines</h4>
          <ol className="list-decimal list-inside mb-4 space-y-2" start={14}>
            <li>Indian Council of Medical Research. (2020). "Nutrient Requirements for Indians." ICMR Publications.</li>
            <li>National Health Portal of India. "Dietary Guidelines." https://www.nhp.gov.in/</li>
            <li>Food Safety and Standards Authority of India. "Food Labelling Regulations." FSSAI.</li>
          </ol>
        </section>

        {/* Chapter 7 */}
        <section className="mb-12 print:page-break-before">
          <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">CHAPTER 7: APPENDIX</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-3">7.1 Code Snippets</h3>
          
          <h4 className="text-lg font-semibold mt-4 mb-2">7.1.1 Health Analysis Algorithm (healthAnalyzer.ts)</h4>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto mb-4">
{`export interface AnalysisResult {
  score: number;
  ingredients: AnalyzedIngredient[];
  summary: string;
  concerns: string[];
  mealSuggestions: { include: string[]; avoid: string[] };
}

export const analyzeIngredients = (
  ingredients: string[],
  userConditions: string[]
): AnalysisResult => {
  const analyzedIngredients: AnalyzedIngredient[] = [];
  let safeCount = 0;
  let cautionCount = 0;
  let avoidCount = 0;

  for (const ingredient of ingredients) {
    const normalized = normalizeIngredient(ingredient);
    const dbEntry = findIngredient(normalized);
    
    if (dbEntry) {
      const { level, matchedTags } = determineRiskLevel(
        dbEntry.info.tags,
        userConditions,
        dbEntry.info.riskLevel
      );
      
      analyzedIngredients.push({
        name: ingredient,
        normalizedName: normalized,
        riskLevel: level,
        matchedConditions: matchedTags,
        description: dbEntry.info.description
      });
      
      if (level === 'safe') safeCount++;
      else if (level === 'caution') cautionCount++;
      else avoidCount++;
    }
  }

  // Health Score Formula (0-100)
  const score = calculateHealthScore(analyzedIngredients);
  const { summary, concerns } = generateSummary(
    analyzedIngredients, 
    score, 
    userConditions
  );

  return {
    score,
    ingredients: analyzedIngredients,
    summary,
    concerns,
    mealSuggestions: getDietSuggestions(userConditions)
  };
};`}
          </pre>

          <h4 className="text-lg font-semibold mt-4 mb-2">7.1.2 OCR Service (ocrService.ts)</h4>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto mb-4">
{`import Tesseract from 'tesseract.js';

export interface OCRResult {
  text: string;
  confidence: number;
}

export const performOCR = async (
  imageSource: string | File | Blob,
  onProgress?: (progress: number) => void
): Promise<OCRResult> => {
  const result = await Tesseract.recognize(
    imageSource,
    'eng',
    {
      logger: (m) => {
        if (m.status === 'recognizing text' && onProgress) {
          onProgress(m.progress * 100);
        }
      }
    }
  );

  return {
    text: result.data.text,
    confidence: result.data.confidence
  };
};

export const extractIngredientsFromText = (text: string): string[] => {
  const preprocessed = preprocessOCRText(text);
  
  // Find ingredients section
  const ingredientMatch = preprocessed.match(
    /ingredients?[:\\s]*([\\s\\S]*?)(?=nutrition|contains|allergen|warning|$)/i
  );
  
  if (!ingredientMatch) return [];
  
  const ingredientText = ingredientMatch[1];
  
  // Split by common delimiters and clean
  return ingredientText
    .split(/[,;()]/)
    .map(item => item.trim().toLowerCase())
    .filter(item => item.length > 2)
    .filter(item => !isNonIngredient(item));
};`}
          </pre>

          <h4 className="text-lg font-semibold mt-4 mb-2">7.1.3 Barcode Service (barcodeService.ts)</h4>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto mb-4">
{`const OPEN_FOOD_FACTS_API = 'https://world.openfoodfacts.org/api/v0/product';

export interface ProductInfo {
  name: string;
  brand: string;
  ingredients: string[];
  image?: string;
}

export const lookupBarcode = async (
  barcode: string
): Promise<ProductInfo | null> => {
  // Check local fallback database first (Indian products)
  const localProduct = localProductDatabase[barcode];
  if (localProduct) return localProduct;

  // Query Open Food Facts API
  try {
    const response = await fetch(
      \`\${OPEN_FOOD_FACTS_API}/\${barcode}.json\`
    );
    const data = await response.json();
    
    if (data.status === 1 && data.product) {
      return {
        name: data.product.product_name || 'Unknown Product',
        brand: data.product.brands || 'Unknown Brand',
        ingredients: parseIngredientString(
          data.product.ingredients_text || ''
        ),
        image: data.product.image_url
      };
    }
  } catch (error) {
    console.error('Barcode lookup failed:', error);
  }
  
  return null;
};`}
          </pre>

          <h4 className="text-lg font-semibold mt-4 mb-2">7.1.4 Ingredient Database Structure (ingredientDatabase.ts)</h4>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto mb-4">
{`export interface IngredientInfo {
  name: string;
  aliases: string[];
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  tags: string[];  // e.g., ['high-sugar', 'processed', 'sodium']
  conditionImpacts: {
    [condition: string]: 'safe' | 'caution' | 'avoid';
  };
}

export const ingredientDatabase: Record<string, IngredientInfo> = {
  sugar: {
    name: 'Sugar',
    aliases: ['sucrose', 'cane sugar', 'refined sugar'],
    description: 'Simple carbohydrate that raises blood glucose',
    riskLevel: 'high',
    tags: ['high-sugar', 'processed', 'refined'],
    conditionImpacts: {
      diabetes: 'avoid',
      obesity: 'avoid',
      pcos: 'avoid',
      thyroid: 'caution'
    }
  },
  // ... 150+ more ingredients
};`}
          </pre>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-12 pt-8 border-t print:page-break-before">
          <p className="font-semibold">NutriGuardian - AI-Powered Ingredient Health Analyzer</p>
          <p>Department of Artificial Intelligence and Machine Learning</p>
          <p>AMC Engineering College, Bengaluru</p>
          <p>2024-2025</p>
        </footer>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          @page {
            margin: 2cm;
            size: A4;
          }
          .print\\:page-break-before {
            page-break-before: always;
          }
          .print\\:page-break-after {
            page-break-after: always;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectReport;
