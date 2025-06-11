import React from 'react'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'

function Header({ themeContext }) {
  const { isDarkMode, toggleTheme } = themeContext

  const items = [
    { label: 'Accueil', command: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Fonctionnalités', command: () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Tarifs', command: () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'FAQ', command: () => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }) }
  ]

  const start = <div className="text-2xl font-bold text-primary">AutoMarket</div>
  const end = (
    <div className="flex align-items-center gap-2">
      <Button 
        icon={isDarkMode ? 'pi pi-sun' : 'pi pi-moon'} 
        onClick={toggleTheme}
        className="p-button-rounded p-button-text"
        aria-label="Toggle theme"
        tooltip={isDarkMode ? 'Mode clair' : 'Mode sombre'}
      />
      <Button 
        label="Contact" 
        icon="pi pi-phone" 
        className="p-button-outlined" 
        size="small" 
      />
    </div>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-5">
      <Menubar 
        model={items} 
        start={start} 
        end={end}
        className="surface-card shadow-2 border-none border-bottom-1 surface-border"
        style={{ 
          backdropFilter: 'blur(10px)'
        }}
      />
    </header>
  )
}

export default Header