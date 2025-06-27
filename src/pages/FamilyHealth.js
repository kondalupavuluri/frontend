import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, User, Pill, Brain, ChevronDown, ChevronUp, Plus, History } from 'lucide-react';

const initialProfiles = [
  {
    id: 1,
    name: 'John Doe',
    relation: 'Self',
    age: 35,
    diagnosisHistory: [
      { date: '2024-05-01', diagnosis: 'Hypertension', notes: 'Stable, on medication' },
      { date: '2024-03-15', diagnosis: 'Seasonal Allergy', notes: 'Prescribed antihistamines' }
    ],
    medications: [
      { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily' },
      { name: 'Cetirizine', dosage: '10mg', frequency: 'As needed' }
    ]
  },
  {
    id: 2,
    name: 'Jane Doe',
    relation: 'Spouse',
    age: 32,
    diagnosisHistory: [
      { date: '2024-04-10', diagnosis: 'Migraine', notes: 'Prescribed pain relief' }
    ],
    medications: [
      { name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed' }
    ]
  },
  {
    id: 3,
    name: 'Sammy Doe',
    relation: 'Child',
    age: 7,
    diagnosisHistory: [
      { date: '2024-02-20', diagnosis: 'Flu', notes: 'Recovered' }
    ],
    medications: [
      { name: 'Paracetamol', dosage: '250mg', frequency: 'Every 6 hours' }
    ]
  }
];

const FamilyHealth = () => {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [expanded, setExpanded] = useState(profiles.map(() => false));

  const toggleExpand = (idx) => {
    setExpanded((prev) => prev.map((val, i) => (i === idx ? !val : val)));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium">
          <Users className="w-4 h-4" />
          <span>Family Health Mode</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Manage Family Health</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">Add and manage health records for your loved ones.</p>
      </motion.div>
      <div className="space-y-6">
        {profiles.map((profile, idx) => (
          <motion.div key={profile.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="medical-card">
            <button onClick={() => toggleExpand(idx)} className="w-full flex items-center justify-between text-left">
              <div className="flex items-center space-x-3">
                <User className="w-8 h-8 text-primary-600" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{profile.name} <span className="text-sm text-gray-500 dark:text-gray-400">({profile.relation})</span></h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Age: {profile.age}</p>
                </div>
              </div>
              {expanded[idx] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {expanded[idx] && (
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="flex items-center text-md font-medium text-gray-900 dark:text-white mb-2"><History className="w-4 h-4 mr-2" />Diagnosis History</h3>
                  <ul className="space-y-2">
                    {profile.diagnosisHistory.map((d, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Brain className="w-4 h-4 text-primary-600 mt-1" />
                        <div>
                          <span className="font-medium">{d.diagnosis}</span> <span className="text-xs text-gray-500">({d.date})</span>
                          <div className="text-xs text-gray-500">{d.notes}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="flex items-center text-md font-medium text-gray-900 dark:text-white mb-2"><Pill className="w-4 h-4 mr-2" />Medications</h3>
                  <ul className="space-y-2">
                    {profile.medications.map((m, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Pill className="w-4 h-4 text-primary-600 mt-1" />
                        <div>
                          <span className="font-medium">{m.name}</span> <span className="text-xs text-gray-500">{m.dosage}</span> <span className="text-xs text-gray-500">({m.frequency})</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FamilyHealth; 