'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, MapPin, AlertTriangle, Share2, LogOut, Star, Clock, DollarSign, Navigation, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
// import { RideMap } from '@/components/ride-map';
import dynamic from 'next/dynamic';

export default function RideTracking() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [driverPosition, setDriverPosition] = useState(0);
  const [eta, setEta] = useState(3);
  const [expandedSheet, setExpandedSheet] = useState(false);

  // Animate driver position
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverPosition((prev) => (prev < 100 ? prev + 0.5 : prev));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Countdown ETA
  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancel = () => {
    showNotification('Ride cancelled');
    setShowCancelModal(false);
  };

  const handleCall = () => {
    showNotification('Calling driver...');
  };

  const handleMessage = () => {
    showNotification('Opening message...');
  };

  const handleShare = () => {
    showNotification('Trip link copied to clipboard');
  };

  const handleSOS = () => {
    showNotification('Emergency services contacted');
  };

  const handleSupport = () => {
    showNotification('Support ticket created');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Map Section */}
      <div className="relative h-96 md:h-screen md:max-h-96 bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700 overflow-hidden">
        {/* <RideMap /> */}

        {/* Status info overlay */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-30 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Radio className="w-3 h-3 text-emerald-400" fill="currentColor" />
              </motion.div>
              <div>
                <p className="text-xs text-slate-300">Driver is arriving</p>
                <p className="text-lg font-semibold text-blue-300">{eta} min away</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative px-4 md:px-8 py-6 border-[4px] border-red-500">
        <div className="space-y-6">
          {/* Driver Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xl font-bold flex-shrink-0"
              >
                AK
              </motion.div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-white">Akshay Kumar</h2>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-slate-300 ml-2">4.98</span>
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-700">
              <div>
                <p className="text-xs text-slate-400 mb-1">Vehicle</p>
                <p className="font-semibold">Sedan</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Number</p>
                <p className="font-semibold font-mono">KA 01 AB 1234</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Car Model</p>
                <p className="font-semibold">Honda City</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Color</p>
                <p className="font-semibold">Silver</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCall}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
              >
                <Phone className="w-5 h-5" />
                <span className="hidden sm:inline">Call</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMessage}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="hidden sm:inline">Message</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Ride Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-bold mb-4">Ride Details</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-400">Pickup</p>
                  <p className="font-semibold text-white truncate">123 MG Road, Bangalore</p>
                </div>
              </div>
              <div className="border-l border-slate-600 ml-2.5 h-6" />
              <div className="flex gap-4">
                <Navigation className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-400">Drop-off</p>
                  <p className="font-semibold text-white truncate">Indiranagar, Bangalore</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-700">
              <div>
                <p className="text-xs text-slate-400 mb-1">Distance</p>
                <p className="font-bold text-lg">8.2 km</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Fare</p>
                <p className="font-bold text-lg">₹245</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Payment</p>
                <p className="font-semibold">UPI</p>
              </div>
            </div>
          </motion.div>

          {/* Status Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-bold mb-4">Ride Status</h3>
            <div className="space-y-3">
              {[
                { status: 'Driver Assigned', icon: '✓', active: true, completed: true },
                { status: 'Arriving', icon: '⟳', active: true, completed: false },
                { status: 'Started', icon: '→', active: false, completed: false },
                { status: 'Completed', icon: '✓', active: false, completed: false },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <motion.div
                    animate={item.active ? { rotate: 360 } : {}}
                    transition={{
                      duration: 2,
                      repeat: item.active ? Infinity : 0,
                      ease: 'linear',
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      item.completed
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : item.active
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {item.icon}
                  </motion.div>
                  <span
                    className={
                      item.active
                        ? 'font-semibold text-white'
                        : item.completed
                        ? 'text-slate-300'
                        : 'text-slate-400'
                    }
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="glass-card p-4 flex flex-col items-center gap-2 text-center hover:bg-slate-700/50 transition"
            >
              <Share2 className="w-6 h-6 text-blue-400" />
              <span className="text-sm font-semibold">Share Trip</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSupport}
              className="glass-card p-4 flex flex-col items-center gap-2 text-center hover:bg-slate-700/50 transition"
            >
              <Clock className="w-6 h-6 text-blue-400" />
              <span className="text-sm font-semibold">Support</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSOS}
              className="glass-card p-4 flex flex-col items-center gap-2 text-center hover:bg-red-900/30 transition col-span-2"
            >
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <span className="text-sm font-semibold">SOS - Emergency</span>
            </motion.button>
          </motion.div>

          {/* Cancel Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCancelModal(true)}
            className="w-full glass-card p-4 text-red-400 hover:bg-red-900/20 transition font-semibold rounded-lg border border-red-500/20"
          >
            <LogOut className="w-5 h-5 inline mr-2" />
            Cancel Ride
          </motion.button>
        </div>
      </div>

      {/* Cancel Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCancelModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-2">Cancel Ride?</h3>
              <p className="text-slate-300 mb-6">
                Are you sure you want to cancel this ride? A cancellation fee may apply.
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition"
                >
                  Keep Ride
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-card px-6 py-4 backdrop-blur-lg"
          >
            <p className="text-white font-semibold">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
