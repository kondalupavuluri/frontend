import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Pill, 
  Phone, 
  Users, 
  Shield, 
  Clock, 
  Heart,
  ArrowRight,
  Play,
  Star
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Diagnosis',
      description: 'Get instant preliminary diagnosis using advanced AI technology',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Pill,
      title: 'Smart Medication Management',
      description: 'Never miss a dose with intelligent reminders and tracking',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Phone,
      title: 'Emergency Response',
      description: 'One-click emergency services with real-time location tracking',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Users,
      title: 'Family Health Hub',
      description: 'Manage health records for your entire family in one place',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Patients Served' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' },
    { number: '5★', label: 'Rating' },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium">
            <Star className="w-4 h-4" />
            <span>Trusted by MyOnsite Medical Hospital</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
            <span className="medical-gradient-text">Medsage</span>
            <br />
            <span className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300">
              Your AI Medical Companion
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the future of healthcare with our intelligent platform. 
            Get instant diagnosis, manage medications, and access emergency services 
            all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/ai-diagnosis"
              className="medical-button inline-flex items-center space-x-2"
            >
              <span>Start Diagnosis</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              to="/emergency"
              className="medical-button-secondary inline-flex items-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Emergency</span>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need for modern healthcare management, powered by cutting-edge AI technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="medical-card group hover:scale-105 transition-transform duration-200"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="medical-gradient rounded-2xl p-8 md:p-12 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of patients who trust Medsage for their healthcare needs. 
            Get started today and experience the future of medical care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/ai-diagnosis"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-all duration-200 inline-flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-all duration-200 inline-flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Trust Indicators */}
      <section className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Trusted by Healthcare Professionals
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-primary-600" />
              <span className="font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-primary-600" />
              <span className="font-medium">Patient-First</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-primary-600" />
              <span className="font-medium">24/7 Available</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home; 