import React from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'

function PricingSection() {
  const plans = [
    {
      name: "SOLO", 
      subtitle: "Pour démarrer", 
      price: "49€",
      features: ["Jusqu'à 50 véhicules", "3 utilisateurs", "Scanner 5 plateformes", "Support email"]
    },
    {
      name: "PRO", 
      subtitle: "Pour performer", 
      price: "99€", 
      recommended: true,
      features: ["Véhicules illimités", "10 utilisateurs", "Scanner 20+ plateformes", "Support prioritaire", "API & intégrations"]
    },
    {
      name: "ENTREPRISE", 
      subtitle: "Sur mesure", 
      price: "Sur devis",
      features: ["Multi-sites", "Utilisateurs illimités", "Formations incluses", "Account manager dédié"]
    }
  ]

  return (
    <section id="pricing" className="min-h-screen flex align-items-center justify-content-center px-3 py-8">
      <div className="w-full max-w-6xl">
        <Card className="bg-white border-round-3xl shadow-8 p-6" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--surface-border)' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-color mb-8">
            Un investissement qui se rentabilise dès le premier mois
          </h2>
          <div className="cards-grid">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative shadow-4 border-round-2xl`}
                style={{ 
                  backgroundColor: 'var(--surface-card)', 
                  border: plan.recommended ? '2px solid var(--primary-color)' : '1px solid var(--surface-border)',
                  borderRadius: '1rem',
                  height: 'fit-content'
                }}
              >
                <div className="text-center p-4">
                  {plan.recommended && (
                    <Badge 
                      value="RECOMMANDÉ" 
                      severity="info" 
                      className="absolute"
                      style={{ 
                        backgroundColor: 'var(--primary-color)',
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 10
                      }}
                    />
                  )}
                  <h3 className="text-2xl font-bold text-color mb-2 mt-3">{plan.name}</h3>
                  <p className="text-color-secondary mb-4">{plan.subtitle}</p>
                  <div className="text-4xl font-bold text-primary mb-4">
                    {plan.price}
                    {plan.price !== "Sur devis" && <span className="text-lg text-color-secondary">/mois</span>}
                  </div>
                  <ul className="list-none p-0 mb-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-color-secondary mb-2 text-left">
                        <i className="pi pi-check text-green-500 mr-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    label={plan.price === "Sur devis" ? "Demander une démo" : "Commencer"} 
                    className={`w-full ${plan.recommended ? 'p-button-primary' : 'p-button-outlined'}`}
                  />
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

export default PricingSection 