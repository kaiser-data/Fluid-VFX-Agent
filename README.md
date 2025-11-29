# FluidVFX Agent

**AI-Powered Cinematic Video Generation with Physics-Based Fluid Dynamics**

A web application that generates 8-second cinematic videos featuring users in extreme action scenarios with photorealistic fluid dynamics simulation, leveraging Google DeepMind's Gemini 3 Pro and Veo 3.1 models.

[![Demo](https://img.shields.io/badge/Demo-AI_Studio-blue)](https://ai.studio/apps/drive/1CzAb6hzD4pJe9IVG-pmZBGkBTpfPockj)
[![Gemini](https://img.shields.io/badge/Powered_by-Gemini_3_Pro-orange)](https://ai.google.dev)
[![Veo](https://img.shields.io/badge/Video-Veo_3.1-purple)](https://deepmind.google/models/veo/)

---

## Overview

FluidVFX Agent is an AI-powered application that combines multimodal image generation with video synthesis to create cinematic content featuring realistic fluid dynamics. The system uses Gemini 3 Pro for intelligent image compositing and Veo 3.1 for physics-informed video generation.

### Core Capabilities

- Image-to-scene compositing using Gemini 3 Pro Image generation
- Cinematic video synthesis at 1080p resolution via Veo 3.1
- Physics-based fluid dynamics rendering (water, plasma, magma, atmospheric effects)
- Biomechanical simulation of G-force effects on human subjects
- Six distinct extreme environment scenarios with specialized physics modeling

---

## Technical Implementation

### Gemini 3 Pro Image Integration

**Model**: `gemini-3-pro-image-preview`

The system leverages Gemini's multimodal capabilities for:
- Semantic analysis of input photographs
- Intelligent scene composition with lighting and perspective adaptation
- 16:9 aspect ratio optimization for video generation pipeline
- Facial feature preservation during environment integration

**Implementation**:
```typescript
const response = await ai.models.generateContent({
  model: 'gemini-3-pro-image-preview',
  contents: {
    parts: [
      { text: scene.imagePrompt },
      { inlineData: { mimeType: 'image/jpeg', data: userImageBase64 } }
    ]
  },
  config: {
    imageConfig: { aspectRatio: "16:9", imageSize: "1K" }
  }
});
```

### Veo 3.1 Video Synthesis

**Model**: `veo-3.1-generate-preview`

Video generation employs physics-informed prompting with:
- Image-to-video synthesis using composite frame as temporal anchor
- Cinematographic specification (POV, tracking, crane, dolly camera movements)
- Lens parameter definition (wide-angle, macro, depth of field control)
- Slow-motion temporal scaling for fluid dynamics visualization
- Volumetric lighting and atmospheric rendering

**Prompt Engineering Strategy**:

Each scene prompt follows the structure: **Cinematography + Subject + Action + Physics + Context**

Key specifications include:
- Camera movement patterns (tracking shot, crane shot, dolly movement)
- Lens characteristics (shallow/deep depth of field, wide-angle, macro)
- Fluid dynamics parameters (turbulent vs laminar flow, viscosity, particle suspension)
- Material properties (refraction indices, thermal gradients, density variations)
- Biomechanical constraints (G-force effects, pressure deformation)

**Implementation**:
```typescript
const operation = await ai.models.generateVideos({
  model: 'veo-3.1-generate-preview',
  prompt: scene.videoPrompt,
  image: { imageBytes: compositeBase64, mimeType: 'image/jpeg' },
  config: { numberOfVideos: 1, resolution: '1080p', aspectRatio: '16:9' }
});
```

---

## Physics AI and CFD Surrogate Modeling

This project draws on computational fluid dynamics (CFD) surrogate modeling methodologies, where neural networks approximate expensive physics simulations.

### Reference Implementation

**Gas Condensation Cryogenic Surrogate Model**
Repository: [https://github.com/adytiaa/Gas_Condens_Cryogenic_surrogate](https://github.com/adytiaa/Gas_Condens_Cryogenic_surrogate)

This reference demonstrates AI surrogate models for:
- Gas phase transition dynamics in cryogenic systems
- Multiphase flow at gas-liquid interfaces
- Heat transfer with temperature gradient modeling
- Turbulent flow in complex geometries

### Performance Comparison

| Metric | Traditional CFD | AI Surrogate |
|--------|----------------|--------------|
| Simulation Time | Hours to days | Milliseconds to seconds |
| Speed Improvement | Baseline | 1000-10000x faster |
| Physics Fidelity | High (analytical) | High (learned patterns) |
| Parameter Flexibility | Full control | Limited to training domain |

### Application to FluidVFX

While FluidVFX currently uses Veo 3.1's learned fluid dynamics, the architecture supports future integration with explicit CFD surrogate models. Current physics simulation includes:

- **Hydrodynamics**: Barrel wave formation, spray dynamics, foam cascading
- **Plasma Physics**: Ionization behavior, electromagnetic field interactions
- **Magma Dynamics**: Viscosity modeling, pyroclastic flow patterns, thermal convection
- **Atmospheric Turbulence**: Vortex formation, shock wave propagation, particulate transport

---

## Scene Specifications

| Scene | Primary Physics | Simulation Elements |
|-------|----------------|---------------------|
| Giant Wave | Turbulent water flow, optical refraction | Laminar flow sheets, foam particle suspension, prismatic light scattering |
| Tornado Chase | Vortex fluid dynamics, debris transport | Spiral flow patterns, dust convection, atmospheric pressure gradients |
| Hypersonic Jet | Shock wave propagation, plasma formation | 8G biomechanical stress, air density gradients, condensation vortices |
| Rocket Car | Sonic boom physics, thermal distortion | 6G body compression, particle vaporization, exhaust stream dynamics |
| Volcano Flight | Magma rheology, thermal transfer | Lava fountain ballistics, pyroclastic turbulence, heat refraction |
| Lightspeed Jump | Relativistic effects, EM field dynamics | Spacetime distortion, fluid light propagation, energy wave patterns |

---

## System Architecture

### Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| AI Models | Gemini 3 Pro Image, Veo 3.1 | Latest preview |
| Frontend Framework | React | 19.2.0 |
| Type System | TypeScript | 5.8.2 |
| Build Tool | Vite | 6.2.0 |
| AI SDK | @google/genai | 1.30.0 |
| Styling | Tailwind CSS | Via CDN |
| Icons | Lucide React | 0.555.0 |

### Processing Pipeline

1. **Image Acquisition**: User photo upload with client-side base64 encoding
2. **Scene Selection**: User chooses from six physics-optimized scenarios
3. **Composite Generation**: Gemini 3 Pro blends user into scene (8-12s)
4. **Video Synthesis**: Veo 3.1 generates 8-second sequence (60-90s)
5. **Delivery**: Client-side video download with MP4 encoding

---

## Installation and Deployment

### Prerequisites

- Node.js 18 or higher
- Google Gemini API key ([obtain here](https://aistudio.google.com/app/apikey))
- Paid Google Cloud billing account (required for Veo 3.1)

### Setup Instructions

1. Clone repository:
   ```bash
   git clone https://github.com/your-org/Fluid-VFX-Agent.git
   cd Fluid-VFX-Agent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:

   Create `.env.local`:
   ```
   GEMINI_API_KEY=your-api-key-here
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Access application at `http://localhost:3000`

---

## Physics Implementation Details

### Fluid Dynamics Prompt Engineering

Example prompt structure for Giant Wave scenario:

```typescript
videoPrompt: `POV tracking shot following surfer inside massive 50-foot barrel wave.
Slow-motion fluid dynamics: individual water droplets suspended in air, foam cascading
in sheets, light refracting through translucent turquoise wall creating prismatic effects.
Macro details of water texture. Shallow depth of field. Cinematic slow motion reveals
turbulent flow patterns, laminar water sheets, and viscous spray. 8 seconds.`
```

**Physics parameters specified**:
- Flow regime classification (turbulent vs laminar)
- Viscosity effects on spray formation
- Optical refraction through water medium
- Particle dynamics in slow-motion temporal scaling
- Material properties (foam density, water translucency)

### Biomechanical G-Force Modeling

High-acceleration scenarios include physiological responses to extreme forces:

**Hypersonic Jet (8G vertical acceleration)**:
- Facial tissue displacement under pressure gradients
- Skin deformation from aerodynamic forces
- Ocular compression effects
- Body mass distribution against restraint systems
- Fabric tension patterns under acceleration

**Rocket Car (6G horizontal acceleration)**:
- Cranial displacement relative to headrest
- Helmet resonance from vibration propagation
- Cervical muscle strain visualization
- Thoracic compression affecting respiratory mechanics
- Harness load distribution on skeletal frame

---

## Performance Metrics

### Generation Latency

| Operation | Average Time | Model |
|-----------|-------------|-------|
| Image Compositing | 8-12 seconds | Gemini 3 Pro Image |
| Video Generation | 60-90 seconds | Veo 3.1 |
| Total Pipeline | 68-102 seconds | Combined |

### API Rate Limits

**Free Tier**:
- Gemini 3 Pro Image: 2 requests/minute
- Veo 3.1: Requires paid billing

**Production Requirements**:
- Paid Google Cloud billing account
- Quota monitoring via Cloud Console
- Cost estimation: ~$0.10-0.50 per video generation

### Known Limitations

- Maximum video duration: 8 seconds per generation
- Content safety filters may block certain prompts
- Physics accuracy limited to learned patterns, not analytical CFD
- Quota constraints on free tier prevent production deployment

---

## Future Development Roadmap

### Planned Enhancements

1. **Explicit CFD Integration**: Direct surrogate model parameter exposure for user control of viscosity, density, temperature
2. **Interactive Physics Editing**: Post-generation adjustment of fluid properties
3. **Extended Sequences**: 30-60 second multi-shot video generation with temporal consistency
4. **Custom Scene Upload**: User-provided environment photographs for personalized scenarios
5. **Physics Validation Framework**: Quantitative comparison against classical CFD benchmarks

---

## Team

| Name | Email | Role |
|------|-------|------|
| Martin Kaiser | martinkaiser.bln@gmail.com | Lead Developer |
| Adi | aditya@simd.space | AI/Physics Specialist |
| Bayang | bayang@simd.space | CFD Research |

---

## References

### AI Models
- Veo 3 Technical Documentation: [https://deepmind.google/models/veo/](https://deepmind.google/models/veo/)
- Gemini API Reference: [https://ai.google.dev/gemini-api/docs](https://ai.google.dev/gemini-api/docs)
- Veo 3.1 Prompt Engineering Guide: [https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1)

### Physics and CFD
- CFD Surrogate Model Reference: [https://github.com/adytiaa/Gas_Condens_Cryogenic_surrogate](https://github.com/adytiaa/Gas_Condens_Cryogenic_surrogate)
- Physics-Informed Neural Networks (PINNs) for fluid simulation
- AI-accelerated turbulence modeling methodologies
- Surrogate models for multiphase flow dynamics

---

## License

MIT License

---

## Links

- Live Demo: [https://ai.studio/apps/drive/1CzAb6hzD4pJe9IVG-pmZBGkBTpfPockj](https://ai.studio/apps/drive/1CzAb6hzD4pJe9IVG-pmZBGkBTpfPockj)
- Gemini API Documentation: [https://ai.google.dev/gemini-api/docs](https://ai.google.dev/gemini-api/docs)
- Veo Prompt Guide: [https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1)
- CFD Surrogate Reference: [https://github.com/adytiaa/Gas_Condens_Cryogenic_surrogate](https://github.com/adytiaa/Gas_Condens_Cryogenic_surrogate)

---

**Google DeepMind Hackathon Submission**
