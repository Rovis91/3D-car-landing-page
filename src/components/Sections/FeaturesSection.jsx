import React from 'react'
import { Card } from 'primereact/card'

function FeaturesSection() {
  const features = [
    { 
      title: "Scanner intelligent", 
      content: ["Analyse 20+ plateformes", "Algorithme de matching avancé", "Alerte instantanée"]
    },
    { 
      title: "Gestion centralisée", 
      content: ["Interface unique", "Suivi des performances", "Reporting automatique"]
    },
    { 
      title: "Intégrations natives", 
      content: ["API ouverte", "Connexions DMS", "Export automatique"]
    }
  ]

  return (
    <section id="features" className="min-h-screen flex align-items-center justify-content-center px-3 py-8">
      <div className="w-full max-w-6xl">
        <Card className="bg-white border-round-3xl shadow-8 p-6" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--surface-border)' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-color mb-6">
            Fonctionnalités qui font la différence
          </h2>
          <div className="cards-grid">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="shadow-3 border-round-2xl"
                style={{ 
                  backgroundColor: 'var(--surface-card)', 
                  border: '1px solid var(--surface-border)',
                  height: 'fit-content'
                }}
              >
                <div className="p-4">
                  <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
                  <ul className="list-none p-0 m-0">
                    {feature.content.map((item, idx) => (
                      <li key={idx} className="text-color-secondary text-lg line-height-3 mb-2 flex align-items-center">
                        <i className="pi pi-check-circle text-primary mr-2"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

export default FeaturesSection 