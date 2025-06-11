import React from 'react'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'

function Header() {
  const items = [
    { label: 'Accueil', command: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Fonctionnalités', command: () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Tarifs', command: () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'FAQ', command: () => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }) }
  ]

  const start = <div className="text-2xl font-bold text-primary">AutoMarket</div>
  const end = <Button label="Contact" icon="pi pi-phone" size="small" />

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
      <Menubar 
        model={items} 
        start={start} 
        end={end}
        style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(10px)',
          border: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
        }}
      />
    </header>
  )
}

export default Header