# AutoMarket 3D Landing Page

A modern, immersive 3D landing page for AutoMarket featuring a low-poly car model, smooth camera animations, and mobile-first design.

## 🚀 Features

- **3D Low-Poly Car Model**: Custom-built car with ~800 polygons
- **Smooth Camera Transitions**: 6 different camera angles corresponding to content sections
- **Mobile-First Design**: Touch gestures, optimized performance, responsive layout
- **Urban Environment**: Stylized street scene with neon lighting
- **Interactive Navigation**: Scroll, swipe, keyboard, and dot navigation
- **Glass Morphism UI**: Modern overlays with backdrop blur effects
- **Performance Optimized**: < 1MB model size, efficient rendering

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/automarket-3d-landing.git

# Navigate to project directory
cd automarket-3d-landing

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 Customization

### Car Model

The low-poly car is created procedurally in the `LowPolyCar` component. To customize:

1. **Colors**: Modify the `meshStandardMaterial` color properties
2. **Shape**: Adjust the `boxGeometry` dimensions
3. **Details**: Add or remove mesh components

### Camera Positions

Edit the camera positions in the `useCameraStore`:

```javascript
cameraPositions: {
  hero: { position: [x, y, z], lookAt: [x, y, z] },
  // ... other sections
}
```

### Environment

Customize the street scene in `StreetEnvironment`:
- Building positions and sizes
- Street light colors
- Window light density

### Theme Colors

The project uses CSS variables from your provided `index.css`:
- Primary: `#8B5CF6` (Purple)
- Secondary: `#3B82F6` (Blue)

## 🏗️ Project Structure

```
src/
├── App.jsx                 # Main component with all 3D logic
├── index.css              # Global styles and theme
├── main.jsx               # Entry point
└── assets/
    └── (future model files)

public/
└── (static assets)

config/
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite bundler config
└── package.json           # Dependencies
```

## 🚗 Creating Your Own Car Model

### Option 1: Blender (Recommended)

1. **Download Blender** (free): https://www.blender.org/
2. **Create Low-Poly Model**:
   - Start with a cube
   - Use subdivision and extrusion
   - Keep polygon count < 1000
   - UV unwrap for texturing
3. **Export as GLTF/GLB**:
   - File > Export > glTF 2.0
   - Choose GLB for single file
   - Enable compression

### Option 2: Online Tools

- **Spline**: https://spline.design/ (Web-based 3D)
- **Womp**: https://womp.com/ (Beginner-friendly)
- **Blockbench**: https://www.blockbench.net/ (Low-poly focused)

### Model Requirements

- **Format**: GLTF/GLB
- **Size**: < 1MB (including textures)
- **Polygons**: 500-1000 for optimal performance
- **Texture**: Single atlas texture (512x512 or 1024x1024)

## 📱 Mobile Optimization

The landing page is optimized for mobile devices:

- Touch gesture support (swipe to navigate)
- Reduced polygon count on mobile
- Simplified shadows and effects
- 60 FPS target on modern phones

## 🎯 Performance Tips

1. **Texture Optimization**:
   - Use compressed textures (JPEG for diffuse, PNG for transparency)
   - Reduce texture size on mobile devices

2. **Model Optimization**:
   - Use LOD (Level of Detail) for distant objects
   - Merge meshes with same material
   - Bake lighting for static objects

3. **Code Optimization**:
   - Lazy load heavy components
   - Use React.memo for static UI elements
   - Throttle scroll events

## 🐛 Troubleshooting

### Common Issues

1. **Black screen on load**:
   - Check browser console for errors
   - Ensure WebGL is enabled
   - Try different browser

2. **Poor performance**:
   - Reduce polygon count
   - Disable shadows on mobile
   - Lower texture resolution

3. **Touch not working**:
   - Check touch event listeners
   - Ensure no z-index conflicts
   - Test on real device

## 📄 License

MIT License - feel free to use for your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

For questions or issues, please open a GitHub issue or contact support.

---

Built with ❤️ using React Three Fiber, Tailwind CSS, and Framer Motion