import React from 'react'
import { Card } from 'primereact/card'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'

function FAQSection() {
  const faqItems = [
    {
      question: "En combien de temps je verrai des résultats ?",
      answer: "Dès la première semaine. Nos clients gagnent en moyenne 12h par semaine et augmentent leurs ventes de 35% en 2 mois."
    },
    {
      question: "Est-ce compatible avec mon DMS actuel ?",
      answer: "Oui, AutoMarket s'intègre avec tous les DMS majeurs du marché français (DealerSocket, CDK, etc.)."
    },
    {
      question: "Quel est le coût de mise en place ?",
      answer: "La mise en place est incluse dans votre abonnement. Notre équipe vous accompagne gratuitement pendant les 30 premiers jours."
    },
    {
      question: "Puis-je annuler à tout moment ?",
      answer: "Absolument ! Vous pouvez annuler votre abonnement à tout moment, sans frais ni engagement à long terme."
    }
  ]

  return (
    <section id="faq" className="min-h-screen flex align-items-center justify-content-center px-3 py-8">
      <div className="w-full max-w-6xl">
        <Card className="bg-white border-round-3xl shadow-8 p-6" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--surface-border)' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-color mb-6">
            Questions fréquentes
          </h2>
          <div className="max-w-4xl mx-auto mb-6">
            <Accordion multiple>
              {faqItems.map((item, index) => (
                <AccordionTab 
                  key={index} 
                  header={item.question}
                  className="mb-2"
                >
                  <p className="text-color-secondary text-lg line-height-3 m-0 p-3">
                    {item.answer}
                  </p>
                </AccordionTab>
              ))}
            </Accordion>
          </div>
          <Divider />
          <div className="text-center">
            <p className="text-xl text-color mb-4">Une question ? Parlons-en !</p>
            <Button 
              label="Planifier un appel" 
              icon="pi pi-phone" 
              className="p-button-primary p-button-lg"
            />
          </div>
        </Card>
      </div>
    </section>
  )
}

export default FAQSection 