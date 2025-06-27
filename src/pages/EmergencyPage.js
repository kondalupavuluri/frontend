import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  Navigation, 
  Clock, 
  AlertTriangle,
  Heart,
  Activity,
  Car,
  User,
  MessageCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const EmergencyPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [ambulanceLocation, setAmbulanceLocation] = useState(null);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState('108');
  const [estimatedTime, setEstimatedTime] = useState(8);

  const nearbyHospitals = [
    {
      id: 1,
      name: 'MyOnsite Medical Hospital',
      distance: '2.3 km',
      rating: 4.8,
      specialties: ['Emergency', 'Cardiology', 'Trauma'],
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    {
      id: 2,
      name: 'City General Hospital',
      distance: '4.1 km',
      rating: 4.5,
      specialties: ['Emergency', 'General Medicine'],
      coordinates: { lat: 12.9789, lng: 77.5917 }
    },
    {
      id: 3,
      name: 'Metro Medical Center',
      distance: '5.7 km',
      rating: 4.6,
      specialties: ['Emergency', 'Neurology'],
      coordinates: { lat: 12.9758, lng: 77.5995 }
    }
  ];

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Unable to get your location');
        }
      );
    }
  }, []);

  const handleEmergencyCall = () => {
    setIsEmergencyActive(true);
    toast.success('Emergency services contacted! Ambulance dispatched.');
    
    // Simulate ambulance tracking
    setTimeout(() => {
      setAmbulanceLocation({
        lat: userLocation?.lat + 0.01,
        lng: userLocation?.lng + 0.01
      });
    }, 2000);
  };

  const callEmergencyNumber = () => {
    window.open(`tel:${emergencyContact}`, '_self');
  };

  const openMaps = () => {
    if (userLocation) {
      const url = `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-4 py-2 rounded-full text-sm font-medium">
          <AlertTriangle className="w-4 h-4" />
          <span>Emergency Services</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Emergency Response
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Quick access to emergency services and nearby hospitals.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Emergency Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* SOS Button */}
          <div className="medical-card text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Emergency SOS
            </h2>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEmergencyCall}
              disabled={isEmergencyActive}
              className={`w-32 h-32 rounded-full text-white font-bold text-xl shadow-lg transition-all duration-200 ${
                isEmergencyActive
                  ? 'bg-green-600 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 animate-pulse'
              }`}
            >
              {isEmergencyActive ? 'ACTIVE' : 'SOS'}
            </motion.button>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              {isEmergencyActive 
                ? 'Emergency services contacted. Help is on the way!' 
                : 'Press for immediate emergency response'
              }
            </p>
          </div>

          {/* Quick Actions */}
          <div className="medical-card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={callEmergencyNumber}
                className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-red-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">Call Emergency</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{emergencyContact}</p>
                  </div>
                </div>
                <Phone className="w-5 h-5 text-red-600" />
              </button>

              <button
                onClick={openMaps}
                className="w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">Open Maps</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">View your location</p>
                  </div>
                </div>
                <Navigation className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="medical-card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Emergency Contact
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Emergency Number
                </label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="medical-input"
                  placeholder="108"
                />
              </div>
              
              <button
                onClick={callEmergencyNumber}
                className="w-full medical-button"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Emergency Number
              </button>
            </div>
          </div>
        </motion.div>

        {/* Ambulance Tracking & Hospitals */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Ambulance Tracking */}
          {isEmergencyActive && (
            <div className="medical-card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Ambulance Tracking
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Ambulance Status</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">En route to your location</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{estimatedTime}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">minutes</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="font-medium text-gray-900 dark:text-white">Distance</p>
                    <p className="text-gray-600 dark:text-gray-400">2.3 km</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="font-medium text-gray-900 dark:text-white">Speed</p>
                    <p className="text-gray-600 dark:text-gray-400">45 km/h</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Nearby Hospitals */}
          <div className="medical-card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Nearby Hospitals
            </h3>
            
            <div className="space-y-4">
              {nearbyHospitals.map((hospital, index) => (
                <motion.div
                  key={hospital.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {hospital.name}
                        </h4>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {hospital.rating}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {hospital.distance} away
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {hospital.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <button className="p-2 text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg transition-colors">
                        <Navigation className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Emergency Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="medical-card"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Emergency Instructions
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600 text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Stay Calm</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Take deep breaths and try to remain calm. Panic can make the situation worse.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600 text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Call Emergency</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Dial the emergency number (108) or use the SOS button above.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600 text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Provide Location</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Share your exact location or use the maps feature to guide emergency services.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600 text-sm font-bold">4</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Follow Instructions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Listen carefully to emergency operator instructions and follow them precisely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmergencyPage; 