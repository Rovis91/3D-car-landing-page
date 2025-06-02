import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/cameraStore'

// Composants spécifiques pour chaque section
function HeroSection({ isActive }) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center text-white max-w-4xl px-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
            >
              AutoFlow
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl md:text-3xl font-light mb-8 text-gray-300"
            >
              Solution complète de gestion de concession
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Transformez votre concession avec notre plateforme tout-en-un. 
              Gestion intelligente, analytics avancés, expérience client optimisée.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="pointer-events-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                Découvrir la démo
              </button>
              <button className="pointer-events-auto px-8 py-4 border-2 border-white/30 rounded-lg font-semibold text-white hover:border-blue-400 hover:text-blue-400 transition-all duration-300">
                En savoir plus
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function TrackingSection({ isActive }) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute right-8 top-1/2 transform -translate-y-1/2"
        >
          <div className="text-white max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <div className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-3">
                Technologie Avancée
              </div>
              <h3 className="text-3xl font-bold mb-4">
                IA & Analytics
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Notre intelligence artificielle analyse en temps réel les comportements 
                d'achat et optimise automatiquement vos stratégies de vente.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Prédiction des ventes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Recommandations personnalisées</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-sm">Optimisation des prix</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CTASection({ isActive }) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute left-8 top-1/2 transform -translate-y-1/2"
        >
          <div className="text-white max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <div className="text-green-400 text-sm font-semibold uppercase tracking-wider mb-3">
                Ouvrez les Portes
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Du Succès
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Rejoignez plus de 500 concessionnaires qui ont déjà transformé 
                leur business avec AutoFlow. Résultats garantis dès le premier mois.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Augmentation des ventes</span>
                  <span className="text-green-400 font-bold">+35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Satisfaction client</span>
                  <span className="text-blue-400 font-bold">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Gain de temps</span>
                  <span className="text-purple-400 font-bold">60%</span>
                </div>
              </div>
              <button className="pointer-events-auto w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg font-semibold text-white hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                Commencer maintenant
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function FAQSection({ isActive }) {
  const faqs = [
    {
      question: "Combien de temps pour l'implémentation ?",
      answer: "En moyenne 2-4 semaines selon la taille de votre concession."
    },
    {
      question: "Y a-t-il une formation incluse ?",
      answer: "Oui, formation complète et support technique 24/7."
    },
    {
      question: "Compatibilité avec mes systèmes existants ?",
      answer: "AutoFlow s'intègre avec tous les principaux DMS du marché."
    }
  ]

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="text-white max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <div className="text-yellow-400 text-sm font-semibold uppercase tracking-wider mb-3 text-center">
                Questions Fréquentes
              </div>
              <h3 className="text-2xl font-bold mb-6 text-center">
                Tout ce que vous devez savoir
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="border-l-2 border-yellow-400 pl-4"
                  >
                    <h4 className="font-semibold text-sm mb-2">{faq.question}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ContactSection({ isActive }) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-white max-w-md text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <div className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-3">
                Contactez-nous
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Démarrons ensemble
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Notre équipe d'experts vous accompagne dans votre transformation digitale. 
                Audit gratuit de votre concession.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <span>📧</span>
                  <span>contact@autoflow.fr</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <span>📞</span>
                  <span>01 23 45 67 89</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <span>📍</span>
                  <span>Paris, France</span>
                </div>
              </div>
              <button className="pointer-events-auto w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                Planifier un appel
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ContentSections() {
  const { currentSection } = useStore()

  return (
    <div className="relative w-full h-full">
      <HeroSection isActive={currentSection === 'hero'} />
      <TrackingSection isActive={currentSection === 'tracking'} />
      <CTASection isActive={currentSection === 'cta'} />
      <FAQSection isActive={currentSection === 'faq'} />
      <ContactSection isActive={currentSection === 'contact'} />
    </div>
  )
}

export default ContentSections 