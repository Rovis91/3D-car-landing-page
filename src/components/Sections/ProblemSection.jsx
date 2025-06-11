import React from 'react'
import { Card } from 'primereact/card'

function ProblemSection() {
  const problems = [
    { title: "Perte de temps", content: "Jusqu'à 6h par jour perdues sur des tâches répétitives" },
    { title: "Dispersion", content: "Gérer 15+ plateformes différentes manuellement" },
    { title: "Opportunités ratées", content: "75% des bonnes affaires échappent par manque de réactivité" }
  ]

  return (
    <section id="problem" className="min-h-screen flex align-items-center justify-content-center px-3 py-8">
      <div className="w-full max-w-6xl">
        <Card className="bg-white border-round-3xl shadow-8 p-6" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--surface-border)' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-color mb-6">
            Les défis de la prospection automobile aujourd'hui
          </h2>
          <div className="cards-grid">
            {problems.map((problem, index) => (
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
                  <h3 className="text-xl font-bold text-primary mb-3">{problem.title}</h3>
                  <p className="text-color-secondary text-lg line-height-3 m-0">
                    {problem.content}
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

export default ProblemSection 