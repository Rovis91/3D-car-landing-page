import React from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import { Divider } from 'primereact/divider'
import { Panel } from 'primereact/panel'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './UnifiedSections.css'

const sectionData = {
  hero: {
    title: "Transformez votre prospection auto en machine à vendre",
    subtitle: "Trouvez, gérez et vendez plus de véhicules en 3x moins de temps. Sans effort technique.",
    cta: "Essayer gratuitement 14 jours",
    supporting: "✓ Sans carte bancaire ✓ Prêt en 5 minutes ✓ Annulation à tout moment"
  },
  problem: {
    title: "Les défis de la prospection automobile aujourd'hui",
    cards: [
      { title: "Perte de temps", content: "Jusqu'à 6h par jour perdues sur des tâches répétitives" },
      { title: "Dispersion", content: "Gérer 15+ plateformes différentes manuellement" },
      { title: "Opportunités ratées", content: "75% des bonnes affaires échappent par manque de réactivité" }
    ]
  },
  solution: {
    title: "Une solution complète et automatisée",
    statement: "AutoMarket centralise, automatise et optimise toute votre prospection automobile.",
    pillars: [
      { title: "Centralisation", content: "Toutes vos plateformes en un seul endroit" },
      { title: "Automatisation", content: "Scans automatiques et alertes en temps réel" },
      { title: "Optimisation", content: "Intelligence artificielle pour les meilleures opportunités" }
    ]
  },
  features: {
    title: "Fonctionnalités qui font la différence",
    features: [
      { title: "Scanner intelligent", content: "Analyse 20+ plateformes\nAlgorithme de matching avancé\nAlerte instantanée" },
      { title: "Gestion centralisée", content: "Interface unique\nSuivi des performances\nReporting automatique" },
      { title: "Intégrations natives", content: "API ouverte\nConnexions DMS\nExport automatique" }
    ]
  },
  pricing: {
    title: "Un investissement qui se rentabilise dès le premier mois",
    plans: [
      {
        name: "SOLO", subtitle: "Pour démarrer", price: "49€",
        features: ["Jusqu'à 50 véhicules", "3 utilisateurs", "Scanner 5 plateformes", "Support email"]
      },
      {
        name: "PRO", subtitle: "Pour performer", price: "99€", recommended: true,
        features: ["Véhicules illimités", "10 utilisateurs", "Scanner 20+ plateformes", "Support prioritaire", "API & intégrations"]
      },
      {
        name: "ENTREPRISE", subtitle: "Sur mesure", price: "Sur devis",
        features: ["Multi-sites", "Utilisateurs illimités", "Formations incluses", "Account manager dédié"]
      }
    ]
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        question: "En combien de temps je verrai des résultats ?",
        answer: "Dès la première semaine. Nos clients gagnent en moyenne 12h par semaine et augmentent leurs ventes de 35% en 2 mois."
      },
      {
        question: "Est-ce compatible avec mon DMS actuel ?",
        answer: "Oui, AutoMarket s'intègre avec tous les DMS majeurs du marché français (DealerSocket, CDK, etc.)."
      }
    ]
  }
}

function UnifiedSections() {
  const renderHero = () => (
    <section id="hero" className="section">
      <Card className="hero-section-card">
        <div className="hero-content">
          <h1 className="hero-title">{sectionData.hero.title}</h1>
          <p className="hero-subtitle">{sectionData.hero.subtitle}</p>
          <Button 
            label={sectionData.hero.cta} 
            size="large"
            className="p-button-raised p-button-rounded hero-cta"
          />
          <p className="hero-supporting">{sectionData.hero.supporting}</p>
        </div>
      </Card>
    </section>
  )

  const renderProblem = () => (
    <section id="problem" className="section">
      <Card className="section-card">
        <h2 className="section-title">{sectionData.problem.title}</h2>
        <div className="cards-grid">
          {sectionData.problem.cards.map((card, index) => (
            <Panel key={index} header={card.title} className="problem-panel">
              <p>{card.content}</p>
            </Panel>
          ))}
        </div>
      </Card>
    </section>
  )

  const renderSolution = () => (
    <section id="solution" className="section">
      <Card className="section-card">
        <h2 className="section-title">{sectionData.solution.title}</h2>
        <p className="section-statement">{sectionData.solution.statement}</p>
        <div className="cards-grid">
          {sectionData.solution.pillars.map((pillar, index) => (
            <Panel key={index} header={pillar.title} className="solution-panel">
              <p>{pillar.content}</p>
            </Panel>
          ))}
        </div>
      </Card>
    </section>
  )

  const renderFeatures = () => (
    <section id="features" className="section">
      <Card className="section-card">
        <h2 className="section-title">{sectionData.features.title}</h2>
        <div className="cards-grid">
          {sectionData.features.features.map((feature, index) => (
            <Panel key={index} header={feature.title} className="feature-panel">
              <div style={{ whiteSpace: 'pre-line' }}>{feature.content}</div>
            </Panel>
          ))}
        </div>
      </Card>
    </section>
  )

  const renderPricing = () => (
    <section id="pricing" className="section">
      <Card className="section-card">
        <h2 className="section-title">{sectionData.pricing.title}</h2>
        <div className="pricing-grid">
          {sectionData.pricing.plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`pricing-card ${plan.recommended ? 'recommended' : ''}`}
            >
              <div className="pricing-content">
                {plan.recommended && (
                  <Badge 
                    value="RECOMMANDÉ" 
                    severity="info" 
                    className="pricing-badge"
                  />
                )}
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-subtitle">{plan.subtitle}</p>
                <div className="plan-price">
                  {plan.price}
                  <span className="price-period">/mois</span>
                </div>
                <ul className="features-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
                <Button 
                  label={plan.price === "Sur devis" ? "Demander une démo" : "Commencer"} 
                  className="p-button-raised w-full plan-button"
                />
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </section>
  )

  const renderFAQ = () => (
    <section id="faq" className="section">
      <Card className="section-card">
        <h2 className="section-title">{sectionData.faq.title}</h2>
        <div className="faq-container">
          {sectionData.faq.items.map((item, index) => (
            <Panel key={index} header={item.question} className="faq-panel" toggleable>
              <p>{item.answer}</p>
            </Panel>
          ))}
        </div>
        <Divider />
        <div className="faq-cta">
          <p>Une question ? Parlons-en !</p>
          <Button 
            label="Planifier un appel" 
            icon="pi pi-phone" 
            className="p-button-outlined"
          />
        </div>
      </Card>
    </section>
  )

  return (
    <main className="sections-container">
      {renderHero()}
      {renderProblem()}
      {renderSolution()}
      {renderFeatures()}
      {renderPricing()}
      {renderFAQ()}
    </main>
  )
}

export default UnifiedSections 