import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  User, 
  Calendar, 
  Thermometer, 
  Heart, 
  Activity,
  Languages,
  Send,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

const AIDiagnosis = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    symptoms: '',
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    language: 'english'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);

  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'telugu', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'gujarati', name: 'ગુજરાતી', flag: '🇮🇳' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.symptoms) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockDiagnosis = {
        diagnosis: 'Upper Respiratory Tract Infection',
        explanation: 'Based on the symptoms described, this appears to be a common upper respiratory tract infection, likely viral in nature. The symptoms are consistent with seasonal allergies or a mild cold.',
        confidence: 85,
        recommendations: [
          'Rest and stay hydrated',
          'Take over-the-counter pain relievers if needed',
          'Monitor symptoms for worsening',
          'Consider consulting a doctor if symptoms persist beyond 7 days'
        ],
        severity: 'mild',
        timestamp: new Date().toISOString()
      };
      
      setDiagnosis(mockDiagnosis);
      setIsLoading(false);
      toast.success('Diagnosis completed successfully!');
    }, 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'moderate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'severe': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium">
          <Brain className="w-4 h-4" />
          <span>AI-Powered Diagnosis</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Get Instant Medical Diagnosis
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Our advanced AI analyzes your symptoms and provides preliminary diagnosis with confidence scores.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Diagnosis Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="medical-card"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Patient Information
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Languages className="w-4 h-4 inline mr-2" />
                Preferred Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="medical-input"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="medical-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="medical-input"
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                  required
                />
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Activity className="w-4 h-4 inline mr-2" />
                Symptoms Description *
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                rows={4}
                className="medical-input"
                placeholder="Describe your symptoms in detail..."
                required
              />
            </div>

            {/* Vital Signs */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Thermometer className="w-4 h-4 inline mr-2" />
                  Temperature (°F)
                </label>
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  className="medical-input"
                  placeholder="98.6"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Activity className="w-4 h-4 inline mr-2" />
                  Blood Pressure
                </label>
                <input
                  type="text"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                  className="medical-input"
                  placeholder="120/80"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Heart className="w-4 h-4 inline mr-2" />
                  Heart Rate (bpm)
                </label>
                <input
                  type="number"
                  name="heartRate"
                  value={formData.heartRate}
                  onChange={handleInputChange}
                  className="medical-input"
                  placeholder="72"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="medical-button w-full inline-flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Clock className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Get Diagnosis</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Diagnosis Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {isLoading && (
            <div className="medical-card">
              <div className="flex items-center space-x-4 mb-4">
                <div className="skeleton w-12 h-12 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="skeleton h-4 w-3/4"></div>
                  <div className="skeleton h-3 w-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-5/6"></div>
                <div className="skeleton h-4 w-4/6"></div>
              </div>
            </div>
          )}

          {diagnosis && (
            <div className="medical-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI Diagnosis Result
                </h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(diagnosis.severity)}`}>
                  {diagnosis.severity.charAt(0).toUpperCase() + diagnosis.severity.slice(1)} Severity
                </div>
              </div>

              <div className="space-y-6">
                {/* Diagnosis */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    <CheckCircle className="w-5 h-5 inline mr-2 text-green-600" />
                    Preliminary Diagnosis
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {diagnosis.diagnosis}
                  </p>
                </div>

                {/* Confidence Score */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Confidence Score
                  </h4>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getConfidenceColor(diagnosis.confidence).replace('text-', 'bg-')}`}
                        style={{ width: `${diagnosis.confidence}%` }}
                      ></div>
                    </div>
                    <span className={`font-semibold ${getConfidenceColor(diagnosis.confidence)}`}>
                      {diagnosis.confidence}%
                    </span>
                  </div>
                </div>

                {/* Explanation */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Explanation
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {diagnosis.explanation}
                  </p>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {diagnosis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-medium text-yellow-800 dark:text-yellow-200">
                        Important Disclaimer
                      </h5>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        This is a preliminary AI diagnosis and should not replace professional medical advice. 
                        Please consult with a healthcare provider for proper diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AIDiagnosis; 