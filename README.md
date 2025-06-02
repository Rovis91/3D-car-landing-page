# AutoFlow - Landing Page Immersive 3D

Une landing page révolutionnaire utilisant Three.js pour créer une expérience immersive avec un modèle 3D de voiture et une navigation par caméra fluide.

## 🎯 Concept

Cette landing page propose une navigation innovante où la caméra 3D se déplace autour d'un modèle de voiture pour révéler différentes sections de contenu :

- **Hero** : Vue globale de la voiture
- **Tracking** : Focus sur la technologie (côté droit)
- **CTA** : Focus sur la portière (côté gauche) 
- **FAQ** : Vue arrière de la voiture
- **Contact** : Focus sur la plaque d'immatriculation

## 🚀 Fonctionnalités

### Navigation Intuitive
- **Scroll/Molette** : Navigation entre les sections
- **Clavier** : Flèches directionnelles, touches 1-5 pour navigation directe
- **Touch** : Swipe vertical sur mobile
- **Indicateurs visuels** : Points de navigation latéraux

### Animations Fluides
- Transitions de caméra en douceur avec lerp/slerp
- Animations de contenu avec Framer Motion
- Effets de particules flottantes
- Glassmorphism et backdrop blur

### Architecture Modulaire
```
src/
├── components/
│   ├── Scene3D.jsx          # Scène Three.js principale
│   ├── ScrollController.jsx  # Gestion de la navigation
│   └── ContentSections.jsx   # Affichage du contenu
├── store/
│   └── cameraStore.js       # État global avec Zustand
└── App.jsx                  # Composant racine
```

## 🛠️ Technologies

- **React 18** + **Vite** : Framework et build tool
- **Three.js** + **@react-three/fiber** : Rendu 3D
- **@react-three/drei** : Helpers et composants 3D
- **Framer Motion** : Animations fluides
- **Zustand** : Gestion d'état légère
- **Tailwind CSS** : Styling et responsive

## 📱 Installation & Développement

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Build de production
npm run build
```

## 🎮 Navigation

### Contrôles Clavier
- `↑/↓` : Navigation entre sections
- `Space` : Section suivante
- `Page Up/Down` : Navigation rapide
- `1-5` : Accès direct aux sections
- `Home/End` : Première/Dernière section

### Contrôles Souris/Touch
- **Molette** : Navigation fluide
- **Swipe vertical** : Navigation mobile
- **Clics sur indicateurs** : Navigation directe

## 📐 Positions de Caméra

Les positions sont définies dans `cameraStore.js` :

```javascript
const cameraPositions = {
  hero: { position: [6, 4, 8], lookAt: [0, 0, 0] },
  tracking: { position: [3, 2, 2], lookAt: [1.5, 0.5, 0] },
  cta: { position: [-4, 1, 3], lookAt: [-2, 0, 1] },
  faq: { position: [0, 3, -6], lookAt: [0, 0, -3] },
  contact: { position: [2, 1, -4], lookAt: [0, -0.5, -2.5] }
}
```

## 🎨 Customisation

### Modifier le Contenu
Éditez `ContentSections.jsx` pour personnaliser le contenu de chaque section.

### Ajuster les Animations de Caméra
Modifiez les positions dans `cameraStore.js` et la vitesse d'interpolation dans `Scene3D.jsx`.

### Remplacer le Modèle 3D
1. Remplacez le composant `TempCar` dans `Scene3D.jsx`
2. Utilisez `useGLTF` de `@react-three/drei` pour charger votre modèle
3. Ajustez les points d'intérêt selon votre modèle

```javascript
// Exemple d'intégration d'un modèle GLTF
import { useGLTF } from '@react-three/drei'

function CarModel() {
  const { nodes, materials } = useGLTF('/models/car.gltf')
  return <primitive object={nodes.Scene} />
}
```

## 📊 Structure des Données

### Section
```javascript
{
  id: 'hero',
  title: 'AutoFlow',
  subtitle: 'Solution complète...',
  description: 'Transformez...',
  position: 0
}
```

### Position de Caméra
```javascript
{
  position: [x, y, z],    // Position 3D
  lookAt: [x, y, z],      // Point de focus
  fov: 50                 // Champ de vision
}
```

## 🔧 Optimisations

### Performance
- Utilisation de `React.memo` pour les composants coûteux
- Debouncing des événements de scroll
- GPU acceleration avec `transform: translateZ(0)`
- Lazy loading des ressources 3D

### Mobile
- Touch events optimisés
- Responsive design
- Réduction de la complexité 3D sur mobile

## 🎯 Prochaines Étapes

### Intégration du Modèle Réel
1. **Préparation du modèle** :
   - Optimisation pour le web (réduction polycount)
   - Textures compressées
   - Format GLTF/GLB

2. **Points d'intérêt** :
   - Mapping précis sur le modèle
   - Ajustement des positions de caméra
   - Étalonnage des distances

3. **Interactions avancées** :
   - Hover effects sur les parties de la voiture
   - Animations de pièces (ouverture de portes, etc.)
   - Configurateur de couleurs

### Améliorations UX
- Loading screen avec progression
- Mode debug pour ajuster les caméras
- Sauvegarde des préférences utilisateur
- Analytics des interactions

## 📝 Notes Techniques

### Gestion des États
Le store Zustand centralise :
- Section courante
- Progression du scroll
- État de transition
- Métadonnées des sections

### Animation de Caméra
```javascript
// Interpolation fluide position + rotation
camera.position.lerp(targetPosition, delta * 2)
camera.quaternion.slerp(targetQuaternion, delta * 2)
```

### Responsive 3D
- Ajustement du FOV selon la taille d'écran
- Positions de caméra adaptatives
- Réduction des effets sur mobile

## 🤝 Contribution

Pour contribuer au projet :
1. Fork le repository
2. Créer une branche feature
3. Commit les changements
4. Créer une Pull Request

## 📄 Licence

MIT License - Voir LICENSE.md pour plus de détails.

---

**Développé avec ❤️ pour une expérience utilisateur immersive** 