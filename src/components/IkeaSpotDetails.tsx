import React, { useState } from 'react';
import { 
  Target, Tv, Sparkles, Smartphone, Activity, 
  Volume2, VolumeX 
} from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../LanguageContext';
// @ts-expect-error - Vite handles asset imports correctly
import campaignImg1 from '../assets/images/regenerated_image_1782215282659.png';
// @ts-expect-error - Vite handles asset imports correctly
import campaignImg2 from '../assets/images/regenerated_image_1782215284015.png';

interface IkeaSpotDetailsProps {
  project: Project;
}

export default function IkeaSpotDetails({ project }: IkeaSpotDetailsProps) {
  const { language } = useLanguage();

  // Persistence with localStorage & fallbacks
  const [visual1] = useState<string>(() => localStorage.getItem('ikea_campaign_visual1') || campaignImg1 || project.gallery?.[0] || '');
  const [visual2] = useState<string>(() => localStorage.getItem('ikea_campaign_visual2') || campaignImg2 || project.gallery?.[1] || '');
  const [tvcVideo] = useState<string>(() => {
    return project.video || '';
  });
  const [tiktokVideo] = useState<string>(() => localStorage.getItem('ikea_campaign_tiktok_video') || '/tiktokIkea.mp4');

  // Video playback option states
  const [isTvcMuted, setIsTvcMuted] = useState(true);
  const [isTiktokMuted, setIsTiktokMuted] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pb-20 space-y-24">
      
      {/* 1. INTRODUCTION & OVERVIEW GRID */}
      <section className="border-b border-neutral-900 pb-16">
        <div className="space-y-6 max-w-4xl">
          <span className="text-xs font-mono tracking-widest text-[#FFF]/50 uppercase">
            {language === 'es' ? 'INTRODUCCIÓN DEL PROYECTO' : 'PROJECT INTRODUCTION'}
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-light text-white leading-tight">
            {language === 'es' 
              ? 'Una campaña publicitaria completa desarrollada para que IKEA promocione el lanzamiento de nuevos productos.'
              : 'A complete advertising campaign developed for IKEA to promote new product launches.'}
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
            {language === 'es'
              ? 'La campaña se construye en torno al contraste entre el caos de un estilo de vida de alta intensidad y la sensación de orden, comodidad y calma que los productos de IKEA aportan al hogar.'
              : 'The campaign is built around the contrast between the chaos of a fast-paced lifestyle and the sense of order, comfort and calm that IKEA products bring into the home.'}
          </p>
        </div>
      </section>

      {/* 2. INSIGHT & KEY MESSAGE ACCENTS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Insight block */}
        <div className="bg-[#0E0E0E] p-8 md:p-10 border border-neutral-900 rounded-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <Target size={16} />
              <span className="text-[10px] font-mono tracking-widest uppercase">
                {language === 'es' ? 'INSIGHT DE CAMPAÑA' : 'CAMPAIGN INSIGHT'}
              </span>
            </div>
            <p className="text-lg md:text-xl font-serif font-light text-neutral-200 leading-relaxed italic">
              {language === 'es'
                ? '«Existe un sector de la población que lleva un estilo de vida muy acelerado pero que a la vez valora el orden y el confort en sus hogares».'
                : '“There is a segment of the population that lives a fast-paced lifestyle while also valuing order and comfort in their homes.”'}
            </p>
          </div>
        </div>

        {/* Key Message block */}
        <div className="bg-gradient-to-br from-neutral-950 to-[#0F0F0F] p-8 md:p-10 border border-neutral-900 rounded-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Sparkles size={16} />
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/60">
                {language === 'es' ? 'MENSAJE CLAVE' : 'KEY MESSAGE'}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-light text-white tracking-tight leading-tight">
              {language === 'es'
                ? '«El ritmo de tu vida es perfectamente compatible con el orden de tu casa».'
                : '“The pace of your life is compatible with the order of your home.”'}
            </h3>
          </div>
        </div>
      </section>

      {/* 3. THE CREATIVE CONCEPT */}
      <section className="bg-neutral-950 p-8 md:p-12 border border-neutral-900 rounded-sm space-y-6">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-accent" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-accent">
            {language === 'es' ? 'CONCEPTO CREATIVO' : 'THE CREATIVE CONCEPT'}
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <h3 className="text-2xl md:text-3xl font-serif font-light text-white leading-tight">
            {language === 'es'
              ? 'El boxeo como metáfora visual de la intensidad, el movimiento y el caos cotidiano.'
              : 'Boxing as a visual metaphor for intensity, movement and everyday chaos.'}
          </h3>
          <div className="space-y-4 text-neutral-400 text-sm md:text-base font-light leading-relaxed font-sans">
            {language === 'es' ? (
              <>
                <p>
                  Al utilizar el boxeo como nuestro vehículo creativo, capturamos la cruda intensidad de las rutinas diarias contemporáneas de alta exigencia o los entornos estresantes.
                </p>
                <p>
                  Este vertiginoso mundo deportivo contrasta fuertemente con los valores fundacionales de IKEA: orden, organización, confort premium y espacios de vida bellamente diseñados.
                </p>
                <p className="text-white font-normal">
                  Toda la campaña vive y se comunica dentro de la tensión creativa generada por estos dos paradigmas drásticamente opuestos.
                </p>
              </>
            ) : (
              <>
                <p>
                  By leveraging boxing as our creative vehicle, we capture the raw intensity of contemporary, high-demand daily routines or demanding environments.
                </p>
                <p>
                  This fast-paced athletic world is sharply contrasted with IKEA’s foundational values of order, organization, premium comfort, and beautifully designed living spaces.
                </p>
                <p className="text-white font-normal">
                  The entire campaign lives and communicates within the creative tension generated by these two drastically opposing paradigms.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 4. CAMPAIGN VISUALS GALLERY WITH IMAGE DROPZONE PLACES */}
      <section className="space-y-12">
        <div className="flex flex-col border-b border-neutral-900 pb-6">
          <span className="text-xs font-mono tracking-widest text-[#FFF]/50 uppercase mb-2">
            {language === 'es' ? 'MUESTRAS DE PRENSA Y EXTERIORES' : 'PRINT & OOH SPECIMENS'}
          </span>
          <h3 className="text-xl md:text-2xl font-serif text-white font-light">
            {language === 'es' ? 'Visuales de Campaña y Dirección de Arte Clave' : 'Campaign Visuals & Key Art Direction'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visual 01 */}
          <div className="space-y-4">
            <div className="w-full bg-[#0E0E0E] border border-neutral-900 rounded-sm relative overflow-hidden group transition-all">
              {visual1 ? (
                <img
                  src={visual1}
                  alt="Campaign Visual 01 - Win the fight against disorder"
                  referrerPolicy="no-referrer"
                  className="relative w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105 z-0 brightness-[0.85] group-hover:brightness-100 block"
                />
              ) : (
                <div className="aspect-[4/3] bg-[#070707] z-0 flex flex-col items-center justify-center p-8 text-center">
                  <span className="text-xs font-mono tracking-widest text-[#FFF]/40 block">[ IMAGE ]</span>
                </div>
              )}

              {/* Grid Guides overlay */}
              <div className="absolute inset-0 border border-neutral-950/20 pointer-events-none z-10" />
              <div className="absolute top-[5%] bottom-[5%] left-[5%] right-[5%] border border-[#FFF]/5 border-dashed pointer-events-none z-10" />
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono tracking-widest text-accent uppercase">
                {language === 'es' ? 'Titular de VISUAL 01' : 'VISUAL 01 Headline'}
              </span>
              <h4 className="text-lg md:text-xl font-serif font-light text-white">
                {language === 'es' ? '«Gana el combate contra el desorden».' : '“Win the fight against disorder.”'}
              </h4>
              <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
                {language === 'es'
                  ? 'Un ring de boxeo se transforma en un espacio habitable amueblado con los últimos productos de IKEA. La imagen crea un llamativo contraste entre un entorno tradicionalmente agresivo y el confort de un hogar bien organizado.'
                  : 'A boxing ring is transformed into a living space furnished with IKEA’s latest products. The image creates a striking contrast between a traditionally aggressive environment and the comfort of a well-organized home.'}
              </p>
            </div>
          </div>

          {/* Visual 02 */}
          <div className="space-y-4">
            <div className="w-full bg-[#0E0E0E] border border-neutral-900 rounded-sm relative overflow-hidden group transition-all">
              {visual2 ? (
                <img
                  src={visual2}
                  alt="Campaign Visual 02 - They said our heads weren't furnished"
                  referrerPolicy="no-referrer"
                  className="relative w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105 z-0 brightness-[0.85] group-hover:brightness-100 block"
                />
              ) : (
                <div className="aspect-[4/3] bg-[#070707] z-0 flex flex-col items-center justify-center p-8 text-center">
                  <span className="text-xs font-mono tracking-widest text-[#FFF]/40 block">[ IMAGE ]</span>
                </div>
              )}

              {/* Grid Guides overlay */}
              <div className="absolute inset-0 border border-neutral-950/20 pointer-events-none z-10" />
              <div className="absolute top-[5%] bottom-[5%] left-[5%] right-[5%] border border-[#FFF]/5 border-dashed pointer-events-none z-10" />
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono tracking-widest text-accent uppercase">
                {language === 'es' ? 'Titular de VISUAL 02' : 'VISUAL 02 Headline'}
              </span>
              <h4 className="text-lg md:text-xl font-serif font-light text-white">
                {language === 'es' ? '«Decían que no teníamos la cabeza amueblada».' : '“They said our heads weren’t furnished.”'}
              </h4>
              <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
                {language === 'es'
                  ? 'Se muestra al boxeador en un momento tranquilo y relajado, sentado en un sofá rodeado de productos IKEA. El visual refuerza el tono humorístico de la campaña al tiempo que conecta al boxeador con el mensaje de marca.'
                  : 'The boxer is shown in a calm and relaxed moment, sitting on a sofa surrounded by IKEA products. The visual reinforces the campaign’s humorous tone while connecting the boxer to the brand message.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MAIN COMMERCIAL VIDEO AND SCRIPT STRUCTURE */}
      <section className="space-y-8">
        <div className="flex flex-col border-b border-neutral-900 pb-6">
          <span className="text-xs font-mono tracking-widest text-[#FFF]/50 uppercase mb-2">
            {language === 'es' ? 'EMISIÓN PRINCIPAL DEL ANUNCIO' : 'MAIN COMMERCIAL BROADCAST'}
          </span>
          <h3 className="text-xl md:text-2xl font-serif text-white font-light">
            {language === 'es' ? 'Anuncio de Televisión (16:9 Horizontal)' : 'Television Commercial (16:9 Landscape)'}
          </h3>
        </div>

        {/* Big Horizontal Video Dropzone */}
        <div className="aspect-[16/9] w-full bg-[#0D0D0D] border border-neutral-900 rounded-sm relative flex flex-col justify-between overflow-hidden group transition-all">
          {tvcVideo ? (
            <div className="absolute inset-0 w-full h-full z-0">
              {tvcVideo.includes('youtube.com') || tvcVideo.includes('youtu.be') ? (
                <iframe
                  src={tvcVideo}
                  className="w-full h-full object-contain bg-black"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <video
                    key={tvcVideo}
                    src={tvcVideo}
                    className="w-full h-full object-contain bg-black"
                    controls
                    muted={isTvcMuted}
                    autoPlay
                    loop
                    playsInline
                  />
                  <button 
                    onClick={() => setIsTvcMuted(!isTvcMuted)}
                    className="absolute bottom-4 left-4 z-40 bg-black/70 backdrop-blur-md border border-neutral-800 p-2 rounded-sm text-neutral-300 hover:text-white hover:bg-neutral-900 transition-all opacity-0 group-hover:opacity-100"
                    title={isTvcMuted ? "Unmute video" : "Mute video"}
                  >
                    {isTvcMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full border border-accent/25 bg-accent/5 flex items-center justify-center mx-auto">
                <Tv size={18} className="text-accent" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono tracking-widest text-[#FFF]/50 block uppercase">[ NO VIDEO ]</span>
              </div>
            </div>
          )}
        </div>

        {/* Simple Commercial Explanation */}
        <div className="space-y-4 max-w-4xl font-sans pt-4">
          {language === 'es' ? (
            <>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                El anuncio se abre con planos rápidos de boxeo, ángulos de cámara cerrados, iluminación tenue y un montaje dinámico. Se muestra al boxeador entrenando intensamente antes de detenerse repentinamente y mirar directamente a la cámara.
              </p>
              <div className="pl-4 border-l-2 border-accent py-1">
                <p className="text-neutral-200 text-sm font-serif font-light italic">
                  Él dice: «Decían que los boxeadores no tenemos la cabeza amueblada». Inmediatamente, el entorno se transforma en un hogar IKEA luminoso y completamente amueblado. El boxeador responde: «Pero mi casa sí».
                </p>
              </div>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                Mientras se quita los guantes y la toalla, se introducen de forma natural los últimos productos de IKEA a través de toques visuales y vitrinas de producto. El spot utiliza el humor y el contraste para transmitir el mensaje de la campaña de forma memorable.
              </p>
            </>
          ) : (
            <>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                The commercial opens with fast-paced boxing shots, close-up camera angles, low lighting and dynamic editing. The boxer is shown training intensely before suddenly stopping and looking directly into the camera.
              </p>
              <div className="pl-4 border-l-2 border-accent py-1">
                <p className="text-neutral-200 text-sm font-serif font-light italic">
                  He says: &ldquo;They say boxers don&rsquo;t have a furnished mind.&rdquo; Immediately, the environment transforms into a bright, fully furnished IKEA home. The boxer then replies: &ldquo;But my house does.&rdquo;
                </p>
              </div>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                As he removes his gloves and towel, IKEA&rsquo;s latest products are introduced naturally through visual highlights and product showcases. The commercial uses humor and contrast to deliver the campaign message in a memorable way.
              </p>
            </>
          )}
        </div>
      </section>

      {/* 6. TIKTOK COMMERCIAL / SHORT-FORM VIDEO PLATFORMS */}
      <section className="space-y-8">
        <div className="flex flex-col border-b border-neutral-900 pb-6">
          <span className="text-xs font-mono tracking-widest text-[#FFF]/50 uppercase mb-2">
            {language === 'es' ? 'INTEGRACIÓN SOCIAL' : 'SOCIAL INTEGRATION'}
          </span>
          <h3 className="text-xl md:text-2xl font-serif text-white font-light">
            TikTok &amp; Instagram Reel Campaign (9:16 Portrait)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Portrait Placeholder Side block */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-xs aspect-[9/16] bg-[#0E0E0E] border border-neutral-900 rounded-sm p-6 flex flex-col justify-between relative overflow-hidden h-[480px] group transition-all">
              {tiktokVideo ? (
                <div className="absolute inset-0 w-full h-full z-0">
                  <video
                    key={tiktokVideo}
                    src={tiktokVideo}
                    className="w-full h-full object-cover"
                    controls
                    muted={isTiktokMuted}
                    autoPlay
                    loop
                    playsInline
                  />
                  <button 
                    onClick={() => setIsTiktokMuted(!isTiktokMuted)}
                    className="absolute bottom-4 left-4 z-40 bg-black/70 backdrop-blur-md border border-neutral-800 p-2 rounded-sm text-neutral-300 hover:text-white hover:bg-neutral-900 transition-all opacity-0 group-hover:opacity-100"
                    title={isTiktokMuted ? "Unmute video" : "Mute video"}
                  >
                    {isTiktokMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                </div>
              ) : (
                <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <div className="w-10 h-10 rounded-full border border-accent/25 bg-accent/5 flex items-center justify-center mx-auto">
                    <Smartphone size={16} className="text-accent" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-[#FFF]/50 block uppercase">[ VIDEO ]</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social strategy rationale */}
          <div className="md:col-span-7 space-y-6">
            <span className="text-xs font-mono tracking-widest text-accent uppercase">
              {language === 'es' ? 'ADAPTACIÓN ESPECÍFICA PARA PLATAFORMA' : 'PLATFORM-SPECIFIC ADAPTATION'}
            </span>
            <h4 className="text-2xl md:text-3xl font-serif font-light text-white leading-tight">
              {language === 'es'
                ? 'Optimizando para la retención del hook en móvil y resultados visuales rápidos.'
                : 'Optimizing for mobile hook retainment and quick visual pay-offs.'}
            </h4>
            <p className="text-neutral-400 text-sm font-light leading-relaxed font-sans">
              {language === 'es'
                ? 'Esta adaptación vertical fue diseñada específicamente para las redes modernas de formato corto como TikTok. Utiliza un ritmo significativamente acelerado, microcortes, estímulos sensoriales instantáneos y un gancho rápido para superar la ceguera al contenido.'
                : 'This vertical adaptation was engineered specifically for modern short-form networks like TikTok. It utilizes a significantly accelerated tempo, micro-cuts, instant sensory triggers, and a prompt hook to bypass content blindness.'}
            </p>
            <p className="text-neutral-400 text-sm font-light leading-relaxed font-sans">
              {language === 'es'
                ? 'Incluso en un formato de tiempo comprimido, la estructura conserva perfectamente el contraste entre boxeo e interiores y el humor conceptual del anuncio televisivo principal.'
                : 'Even under compressed timing, the structure beautifully retains the boxing vs. interior contrast and conceptual humor of the master broadcast commercial.'}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
