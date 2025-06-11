import React from 'react'
import { Card } from 'primereact/card'
import useTilt from '../../hooks/useTilt'

function SolutionSection() {
  const tiltRef1 = useTilt()
  const tiltRef2 = useTilt()
  const tiltRef3 = useTilt()
  
  const pillars = [
    { title: "Centralisation", content: "Toutes vos plateformes en un seul endroit", ref: tiltRef1 },
    { title: "Automatisation", content: "Scans automatiques et alertes en temps réel", ref: tiltRef2 },
    { title: "Optimisation", content: "Intelligence artificielle pour les meilleures opportunités", ref: tiltRef3 }
  ]

  return (
    <section id="solution" className="min-h-screen flex align-items-center justify-content-center px-3 py-8">
      <div className="w-full max-w-6xl">
        <Card className="bg-white border-round-3xl shadow-8 p-6" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--surface-border)' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-color mb-4">
            Une solution complète et automatisée
          </h2>
          <p className="text-xl text-color-secondary text-center mb-6 line-height-3 max-w-4xl mx-auto">
            AutoMarket centralise, automatise et optimise toute votre prospection automobile.
          </p>
          <div className="cards-grid">
            {pillars.map((pillar, index) => (
              <Card 
                key={index}
                ref={pillar.ref}
                className="shadow-3 border-round-2xl tilt-card"
                style={{ 
                  backgroundColor: 'var(--surface-card)', 
                  border: '1px solid var(--surface-border)',
                  height: 'fit-content'
                }}
              >
                <div className="p-4">
                  <h3 className="text-xl font-bold text-primary mb-3">{pillar.title}</h3>
                  <p className="text-color-secondary text-lg line-height-3 m-0">
                    {pillar.content}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

export default SolutionSection 