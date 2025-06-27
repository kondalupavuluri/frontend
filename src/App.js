import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';

// Layout Components
import Layout from './components/Layout/Layout';

// Page Components
import Home from './pages/Home';
import AIDiagnosis from './pages/AIDiagnosis';
import MedicationScheduler from './pages/MedicationScheduler';
import EmergencyPage from './pages/EmergencyPage';
import FamilyHealth from './pages/FamilyHealth';
import MedicalHistory from './pages/MedicalHistory';

// Floating Bot Component
import TriageBot from './components/TriageBot/TriageBot';

function App() {
  return (
    <CustomThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-diagnosis" element={<AIDiagnosis />} />
            <Route path="/medication-scheduler" element={<MedicationScheduler />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/family-health" element={<FamilyHealth />} />
            <Route path="/medical-history" element={<MedicalHistory />} />
          </Routes>
        </Layout>
        
        {/* Floating Triage Bot - Available on all pages except medical history */}
        <TriageBot />
      </div>
    </CustomThemeProvider>
  );
}

export default App; 