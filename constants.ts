import { Scene } from './types';

export const SCENES: Scene[] = [
  {
    id: 'wave',
    name: 'Giant Wave',
    emoji: '🌊',
    description: 'Ride inside a 50-foot barrel wave at golden hour.',
    color: 'from-blue-600 to-cyan-400',
    imagePrompt: 'Place this person on a surfboard inside a 50-foot barrel wave. Wetsuit, focused expression. Towering turquoise water wall with foam and spray. Golden hour light penetrating the wave. Photorealistic.',
    videoPrompt: 'Surfer riding inside massive barrel wave. Slow-motion water dynamics: suspended droplets, cascading foam, light refracting through translucent wave. Camera follows alongside. Sound: thunderous ocean, muffled underwater moments. 8 seconds, cinematic.'
  },
  {
    id: 'tornado',
    name: 'Tornado Chase',
    emoji: '🌪️',
    description: 'Face an F5 tornado from a storm chaser vehicle.',
    color: 'from-slate-600 to-gray-400',
    imagePrompt: 'Place this person inside a storm chaser vehicle looking up through reinforced window at massive tornado. Green storm light, debris swirling in outer wall. Expression of awe. Photorealistic.',
    videoPrompt: 'Storm chaser inside vehicle as F5 tornado passes nearby. Swirling debris, dust walls, lightning flashes illuminating funnel. Camera shows interior reactions and exterior chaos. Sound: howling wind, thunder, debris impacts. 8 seconds.'
  },
  {
    id: 'jet',
    name: 'Hypersonic Jet',
    emoji: '🚀',
    description: 'Pilot a Mach 5 aircraft with plasma trails.',
    color: 'from-orange-600 to-red-500',
    imagePrompt: 'Place this person in cockpit of hypersonic aircraft at Mach 5+. Flight suit and helmet with visor. Advanced HUD displays. Outside canopy: plasma glow from atmospheric heating. Photorealistic.',
    videoPrompt: 'POV inside hypersonic jet cockpit. Pilot grips controls as shock waves stream past canopy. Plasma trails, condensation vortices off wingtips. Cockpit instruments glow. Sound: roaring engine, radio chatter. 8 seconds, cinematic motion blur.'
  },
  {
    id: 'rocket-car',
    name: 'Rocket Car',
    emoji: '🏎️',
    description: 'Break the sound barrier on salt flats.',
    color: 'from-purple-600 to-pink-500',
    imagePrompt: 'Place this person in streamlined rocket car cockpit crossing salt flats at 800mph. Racing helmet, minimal instrumentation. White salt blur through tiny windscreen. Exhaust flames in mirrors. Photorealistic.',
    videoPrompt: 'Rocket car attempting land speed record on salt flats. Driver focused intensely. Shock waves compress air, salt crystals vaporize in exhaust. Multiple angles: cockpit POV, tracking shot. Sound: deafening rocket roar. 8 seconds.'
  }
];

export const PLACEHOLDER_IMAGE = "https://picsum.photos/1280/720";