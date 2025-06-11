import React from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'

function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex align-items-center justify-content-center px-3 py-8">
      <div className="w-full max-w-6xl">
        <Card className="bg-white border-round-3xl shadow-8 p-6" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--surface-border)' }}>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 line-height-2">
              Transformez votre prospection auto en machine à vendre
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-color-secondary mb-6 line-height-3 max-w-4xl mx-auto">
              Trouvez, gérez et vendez plus de véhicules en 3x moins de temps. Sans effort technique.
            </p>
            <Button 
              label="Essayer gratuitement 14 jours" 
              size="large"
              className="p-button-primary p-button-raised p-button-rounded mb-4 px-6 py-3"
              style={{ fontSize: '1.125rem' }}
            />
            <p className="text-color-secondary text-base md:text-lg mt-4">
              ✓ Sans carte bancaire ✓ Prêt en 5 minutes ✓ Annulation à tout moment
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default HeroSection 