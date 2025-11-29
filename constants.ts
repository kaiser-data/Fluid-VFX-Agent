import { Scene } from './types';

export const SCENES: Scene[] = [
  {
    id: 'wave',
    name: 'Giant Wave',
    emoji: '🌊',
    description: 'Ride inside a 50-foot barrel wave at golden hour.',
    color: 'from-blue-600 to-cyan-400',
    imagePrompt: 'Place this person on a surfboard inside a 50-foot barrel wave. Wetsuit, focused expression. Towering turquoise water wall with foam and spray. Golden hour light penetrating the wave. Photorealistic.',
    videoPrompt: 'POV tracking shot following surfer inside massive 50-foot barrel wave. Slow-motion fluid dynamics: individual water droplets suspended in air, foam cascading in sheets, light refracting through translucent turquoise wall creating prismatic effects. Camera dolly maintains position alongside surfer. Macro details of water texture. Shallow depth of field. Cinematic slow motion reveals turbulent flow patterns, laminar water sheets, and viscous spray. Sound: deep thunderous ocean roar, muffled underwater acoustics. 8 seconds.'
  },
  {
    id: 'tornado',
    name: 'Tornado Chase',
    emoji: '🌪️',
    description: 'Face an F5 tornado from a storm chaser vehicle.',
    color: 'from-slate-600 to-gray-400',
    imagePrompt: 'Place this person inside a storm chaser vehicle looking up through reinforced window at massive tornado. Green storm light, debris swirling in outer wall. Expression of awe. Photorealistic.',
    videoPrompt: 'Low-angle POV shot from inside storm chaser vehicle as F5 tornado funnel slowly passes overhead. Slow-motion air dynamics: debris rotating in spiral patterns, dust walls creating vortex flow, individual particles suspended and drifting. Lightning flashes illuminate swirling funnel cloud structure. Two-shot composition alternating between driver expression and exterior chaos through windshield. Wide-angle lens captures scale. Atmospheric particulates create volumetric light rays. Turbulent air currents visible through dust movement. Sound: deep howling wind vortex, distant thunder rumbles, debris impact resonance. 8 seconds.'
  },
  {
    id: 'jet',
    name: 'Hypersonic Jet',
    emoji: '🚀',
    description: 'Pilot a Mach 5 aircraft with plasma trails.',
    color: 'from-orange-600 to-red-500',
    imagePrompt: 'Place this person in cockpit of hypersonic aircraft at Mach 5+. Flight suit and helmet with visor. Advanced HUD displays. Outside canopy: plasma glow from atmospheric heating. G-force pressure visible on face. Photorealistic.',
    videoPrompt: 'Extreme close-up POV shot inside hypersonic jet cockpit during violent acceleration to Mach 5. Slow-motion G-force physics: pilot facial skin pulled back toward ears from 8G acceleration, cheeks rippling and distorting, jaw muscles tensed against pressure, eyes narrowed from facial compression, body pressed deep into seat with visible fabric compression. Hands grip controls with white knuckles and trembling from force. Slow-motion fluid dynamics visible through canopy: shock wave compression creating visible air density gradients, superheated plasma flowing in luminous orange and violet streams, condensation vortices spiraling off wingtips in helical patterns. Wide-angle lens captures full body pressed backward. Flight suit wrinkles under pressure. Chest compressed against restraints. Shallow depth of field on face showing micro skin deformation. Atmospheric ionization creates ethereal glow. HUD displays vibrate and flicker. Cinematic motion blur. Volumetric light from plasma refracts through canopy. Sound: deep resonant engine roar building in intensity, strained breathing, compressed radio chatter echoing. 8 seconds.'
  },
  {
    id: 'rocket-car',
    name: 'Rocket Car',
    emoji: '🏎️',
    description: 'Break the sound barrier on salt flats.',
    color: 'from-purple-600 to-pink-500',
    imagePrompt: 'Place this person in streamlined rocket car cockpit crossing salt flats at 800mph. Racing helmet, minimal instrumentation. White salt blur through tiny windscreen. Exhaust flames in mirrors. Body pressed back into seat from extreme acceleration. Photorealistic.',
    videoPrompt: 'Close-up POV shot from rocket car cockpit during explosive acceleration toward sound barrier. Slow-motion G-force biomechanics: driver head pressed violently backward into headrest, helmet vibrating from pressure waves, neck muscles straining under 6G horizontal acceleration, arms extended rigidly gripping wheel with trembling resistance, torso compressed deep into racing seat with visible suit wrinkles, chest cavity compressed affecting breathing rhythm. Facial distortion visible through helmet visor: skin pulled back, eyes squinting from pressure, jaw clenched. Slow-motion physics reveal shock wave formation: visible air compression ripples expanding from vehicle nose, individual salt crystals vaporizing into glowing particulates in rocket exhaust trail creating fluid particle streams, heat distortion waves creating atmospheric refraction effects. Tracking shot maintains position showing full body compression. Macro lens captures micro-explosions of salt. Two-shot alternates between strained driver and exterior chaos. Shallow depth of field on helmet, deep focus through windscreen shows white salt plain blurring into violent motion streaks. Superheated exhaust gases glow orange in mirrors. Seat harness cuts into shoulders. Cinematic motion blur intensifies. Sound: deafening multi-frequency rocket roar building to crescendo, labored breathing, sonic boom resonance rattling cockpit. 8 seconds.'
  },
  {
    id: 'volcano',
    name: 'Volcano Flight',
    emoji: '🌋',
    description: 'Fly over an erupting volcano in a helicopter.',
    color: 'from-red-600 to-orange-500',
    imagePrompt: 'Place this person in helicopter cockpit flying over massive erupting volcano. Pilot headset, gripping controls with intensity. Through cockpit window: fountain of molten lava erupting skyward, billowing ash clouds, glowing magma rivers flowing down slopes. Orange and red volcanic glow illuminating face. Photorealistic.',
    videoPrompt: 'Aerial crane shot descending toward erupting volcano with pilot visible in helicopter cockpit foreground. Slow-motion magma dynamics: molten lava fountains arcing upward in viscous streams, individual lava droplets suspended mid-air glowing bright orange, pyroclastic flows cascading down slopes in turbulent patterns, volcanic ash billowing in fluid convection currents. Two-shot composition alternates between pilot reactions and exterior volcano. Wide-angle lens captures massive scale. Heat distortion creates atmospheric refraction waves. Magma rivers flow with realistic viscosity showing temperature gradients from bright yellow to dark red. Shallow depth of field. Volumetric ash clouds scatter orange light. Cockpit shakes from shockwaves. Sound: deep rumbling eruption bass, helicopter rotors cutting through hot air, debris impacts on fuselage. 8 seconds.'
  },
  {
    id: 'lightspeed',
    name: 'Lightspeed Jump',
    emoji: '✨',
    description: 'Enter hyperspace in a futuristic spacecraft.',
    color: 'from-indigo-600 to-purple-500',
    imagePrompt: 'Place this person in futuristic spacecraft cockpit at moment of lightspeed jump. Modern space suit with helmet visor retracted. Holographic controls glowing. Stars beginning to stretch and blur into fluid trails of light around the ship. Expression of wonder and focus. Photorealistic sci-fi.',
    videoPrompt: 'Extreme close-up POV shot inside spacecraft cockpit during hyperspace jump initiation. Pilot hands slowly reach toward holographic controls. Slow-motion space-time distortion: stars elongate into brilliant light streaks flowing like fluid luminous ribbons in blues, purples, and whites, space warps creating lens distortion effects, energy waves ripple across ship hull in concentric patterns showing electromagnetic field interactions. Tracking shot follows pilot expression from wonder to focus. Wide-angle lens with deep focus captures both interior and exterior. Light streaks create motion blur trails. Bioluminescent energy particles suspended in air drift slowly. Holographic displays pulse and blur. Shallow depth of field on face, stars stretch into infinite tunnels. Volumetric light rays penetrate cockpit. Sound: building energy hum rising in pitch, dimensional tear resonance, quantum drive activation harmonics. 8 seconds.'
  }
];

export const PLACEHOLDER_IMAGE = "https://picsum.photos/1280/720";