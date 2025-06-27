import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Pill, 
  Plus, 
  Clock, 
  Calendar, 
  Bell, 
  Edit, 
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { format, addHours, isBefore } from 'date-fns';
import toast from 'react-hot-toast';

const MedicationScheduler = () => {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Paracetamol',
      dosage: '500mg',
      frequency: 'Every 6 hours',
      nextDose: addHours(new Date(), 2),
      isTaken: false,
      reminders: true,
      notes: 'Take with food'
    },
    {
      id: 2,
      name: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'Once daily',
      nextDose: addHours(new Date(), 8),
      isTaken: false,
      reminders: true,
      notes: 'Take in the morning'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'Once daily',
    startDate: new Date(),
    reminders: true,
    notes: ''
  });

  const frequencies = [
    'Once daily',
    'Twice daily',
    'Every 6 hours',
    'Every 8 hours',
    'Every 12 hours',
    'As needed'
  ];

  const addMedication = () => {
    if (!newMedication.name || !newMedication.dosage) {
      toast.error('Please fill in medication name and dosage');
      return;
    }

    const medication = {
      id: Date.now(),
      ...newMedication,
      nextDose: newMedication.startDate,
      isTaken: false
    };

    setMedications(prev => [...prev, medication]);
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'Once daily',
      startDate: new Date(),
      reminders: true,
      notes: ''
    });
    setShowAddForm(false);
    toast.success('Medication added successfully!');
  };

  const markAsTaken = (id) => {
    setMedications(prev => prev.map(med => {
      if (med.id === id) {
        const nextDose = calculateNextDose(med.frequency, med.nextDose);
        return { ...med, isTaken: true, nextDose };
      }
      return med;
    }));
    toast.success('Medication marked as taken!');
  };

  const calculateNextDose = (frequency, currentDose) => {
    const now = new Date();
    switch (frequency) {
      case 'Once daily':
        return addHours(now, 24);
      case 'Twice daily':
        return addHours(now, 12);
      case 'Every 6 hours':
        return addHours(now, 6);
      case 'Every 8 hours':
        return addHours(now, 8);
      case 'Every 12 hours':
        return addHours(now, 12);
      default:
        return addHours(now, 24);
    }
  };

  const deleteMedication = (id) => {
    setMedications(prev => prev.filter(med => med.id !== id));
    toast.success('Medication removed');
  };

  const getNextDoseStatus = (nextDose) => {
    const now = new Date();
    if (isBefore(nextDose, now)) {
      return 'overdue';
    } else if (isBefore(nextDose, addHours(now, 1))) {
      return 'due-soon';
    }
    return 'upcoming';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'due-soon': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
    }
  };

  const upcomingMedications = medications
    .filter(med => !med.isTaken)
    .sort((a, b) => new Date(a.nextDose) - new Date(b.nextDose))
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium">
          <Pill className="w-4 h-4" />
          <span>Medication Management</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Medication Scheduler
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Never miss a dose with our intelligent medication reminder system.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Next Dose Widget */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="medical-card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Next Dose Due
            </h2>
            
            {upcomingMedications.length > 0 ? (
              <div className="space-y-4">
                {upcomingMedications.map((med) => {
                  const status = getNextDoseStatus(med.nextDose);
                  return (
                    <div key={med.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {med.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                          {status === 'overdue' ? 'Overdue' : status === 'due-soon' ? 'Due Soon' : 'Upcoming'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {med.dosage} • {med.frequency}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Due: {format(med.nextDose, 'MMM dd, h:mm a')}
                      </p>
                      <button
                        onClick={() => markAsTaken(med.id)}
                        className="mt-3 w-full medical-button text-sm py-2"
                      >
                        Mark as Taken
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">
                  All medications taken for today!
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Medication List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <div className="medical-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Medications
              </h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="medical-button inline-flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Medication</span>
              </button>
            </div>

            {/* Add Medication Form */}
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Add New Medication
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Medication Name *
                    </label>
                    <input
                      type="text"
                      value={newMedication.name}
                      onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                      className="medical-input"
                      placeholder="e.g., Paracetamol"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Dosage *
                    </label>
                    <input
                      type="text"
                      value={newMedication.dosage}
                      onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                      className="medical-input"
                      placeholder="e.g., 500mg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Frequency
                    </label>
                    <select
                      value={newMedication.frequency}
                      onChange={(e) => setNewMedication(prev => ({ ...prev, frequency: e.target.value }))}
                      className="medical-input"
                    >
                      {frequencies.map(freq => (
                        <option key={freq} value={freq}>{freq}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="datetime-local"
                      value={newMedication.startDate.toISOString().slice(0, 16)}
                      onChange={(e) => setNewMedication(prev => ({ ...prev, startDate: new Date(e.target.value) }))}
                      className="medical-input"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={newMedication.notes}
                      onChange={(e) => setNewMedication(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="medical-input"
                      placeholder="Any special instructions..."
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mt-4">
                  <button
                    onClick={addMedication}
                    className="medical-button"
                  >
                    Add Medication
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="medical-button-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            {/* Medication List */}
            <div className="space-y-4">
              {medications.map((medication) => {
                const status = getNextDoseStatus(medication.nextDose);
                return (
                  <motion.div
                    key={medication.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {medication.name}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                            {status === 'overdue' ? 'Overdue' : status === 'due-soon' ? 'Due Soon' : 'Upcoming'}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                          <div>
                            <span className="font-medium">Dosage:</span> {medication.dosage}
                          </div>
                          <div>
                            <span className="font-medium">Frequency:</span> {medication.frequency}
                          </div>
                          <div>
                            <span className="font-medium">Next Dose:</span> {format(medication.nextDose, 'MMM dd, h:mm a')}
                          </div>
                        </div>
                        
                        {medication.notes && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            <span className="font-medium">Notes:</span> {medication.notes}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => markAsTaken(medication.id)}
                          className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg transition-colors"
                          title="Mark as taken"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteMedication(medication.id)}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                          title="Delete medication"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MedicationScheduler; 