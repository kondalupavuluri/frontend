import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, Filter, FileText, Download, User, Pill, Brain, MessageCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const mockHistory = [
  {
    id: 1,
    type: 'diagnosis',
    member: 'John Doe',
    date: '2024-05-01',
    details: 'Hypertension - Stable, on medication.'
  },
  {
    id: 2,
    type: 'medication',
    member: 'Jane Doe',
    date: '2024-04-10',
    details: 'Sumatriptan 50mg - As needed.'
  },
  {
    id: 3,
    type: 'triage',
    member: 'Sammy Doe',
    date: '2024-02-20',
    details: 'Flu symptoms, advised rest.'
  }
];

const types = [
  { value: '', label: 'All' },
  { value: 'diagnosis', label: 'Diagnosis' },
  { value: 'medication', label: 'Medication' },
  { value: 'triage', label: 'Triage' }
];

const MedicalHistory = () => {
  const [filter, setFilter] = useState({ member: '', type: '', date: '' });
  const [history, setHistory] = useState(mockHistory);

  const filteredHistory = history.filter(item => {
    return (
      (!filter.member || item.member.toLowerCase().includes(filter.member.toLowerCase())) &&
      (!filter.type || item.type === filter.type) &&
      (!filter.date || item.date === filter.date)
    );
  });

  const exportToPDF = async () => {
    const input = document.getElementById('history-table');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
    pdf.save('medical_history.pdf');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium">
          <History className="w-4 h-4" />
          <span>Medical History</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Medical History & Logs</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">View and export your complete medical history.</p>
      </motion.div>
      <div className="medical-card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="flex flex-wrap gap-2 items-center">
            <input type="text" placeholder="Filter by member" className="medical-input w-40" value={filter.member} onChange={e => setFilter(f => ({ ...f, member: e.target.value }))} />
            <select className="medical-input w-40" value={filter.type} onChange={e => setFilter(f => ({ ...f, type: e.target.value }))}>
              {types.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <input type="date" className="medical-input w-40" value={filter.date} onChange={e => setFilter(f => ({ ...f, date: e.target.value }))} />
          </div>
          <button onClick={exportToPDF} className="medical-button flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export to PDF</span>
          </button>
        </div>
        <div id="history-table" className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Member</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500 dark:text-gray-400">No records found.</td>
                </tr>
              )}
              {filteredHistory.map(item => (
                <tr key={item.id}>
                  <td className="px-4 py-2 text-gray-900 dark:text-white">{item.date}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{item.member}</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center space-x-1">
                      {item.type === 'diagnosis' && <Brain className="w-4 h-4 text-primary-600" />}
                      {item.type === 'medication' && <Pill className="w-4 h-4 text-primary-600" />}
                      {item.type === 'triage' && <MessageCircle className="w-4 h-4 text-primary-600" />}
                      <span className="capitalize text-gray-700 dark:text-gray-300">{item.type}</span>
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{item.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory; 