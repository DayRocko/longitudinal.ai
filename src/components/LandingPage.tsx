import { useEffect, useState } from 'react';
import {
  Zap,
  Workflow,
  Activity,
  Target,
  Database,
  FileText,
  MessageSquare,
  Mail,
  Bot,
  MessageCircle,
  Link,
  Sheet,
  Cloud,
  FolderKanban,
  Share2,
  PieChart,
  Webhook,
  Layers,
  Cpu,
  Globe,
  Search,
  PenTool,
  Rocket,
  TrendingUp,
  ArrowRight,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  Calendar,
  Smile,
  BarChart,
  TrendingDown,
  Check,
  Settings,
  CreditCard
} from 'lucide-react';

// ─── UTILS ───
function useInView(options = {}) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]); // Removed options from deps to avoid loop if object is unstable

  return [setRef, isInView] as const;
}

function CountUp({ end, duration = 2000, prefix = '', suffix = '' }: { end: number, duration?: number, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const ease = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(ease * end));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={ref as any}>{prefix}{count}{suffix}</span>;
}

// Route Data
const routes = [
  {
    id: 'strategy',
    title: 'Diagnóstico & Estrategia',
    eyebrow: 'Inmersión Ejecutiva',
    desc: 'Sesiones intensivas de mapeo de procesos y arquitectura de soluciones para directivos.',
    image: 'https://picsum.photos/seed/strategy/800/600',
    featured: true,
    details: `
      <p>Nuestro proceso de Diagnóstico y Estrategia es el punto de partida para cualquier transformación digital exitosa. No implementamos tecnología a ciegas; primero entendemos el ADN de tu operación.</p>
      <p><strong>Lo que incluye:</strong></p>
      <ul>
        <li>Mapeo detallado de procesos actuales (AS-IS).</li>
        <li>Identificación de cuellos de botella y costos ocultos.</li>
        <li>Diseño de la arquitectura futura (TO-BE).</li>
        <li>Selección de stack tecnológico óptimo.</li>
        <li>Roadmap de implementación y cálculo de ROI.</li>
      </ul>
      <p>Este servicio está diseñado para fundadores y directivos que necesitan claridad absoluta antes de invertir en desarrollo.</p>
    `
  },
  {
    id: 'sales',
    title: 'Ventas',
    eyebrow: 'Automatización Comercial',
    desc: 'Playbooks y cierre para fundadores y equipos comerciales.',
    image: 'https://picsum.photos/seed/sales/600/400',
    featured: false,
    details: `
      <p>Transformamos tu proceso comercial de un arte manual a una ciencia automatizada. Eliminamos la fricción en cada etapa del embudo para que tu equipo se concentre en cerrar, no en administrar datos.</p>
      <p>Implementamos CRMs inteligentes, bots de calificación de leads, y secuencias de seguimiento automatizadas que aseguran que ninguna oportunidad se pierda.</p>
    `
  },
  {
    id: 'growth',
    title: 'Growth',
    eyebrow: 'Escala Acelerada',
    desc: 'Adquisición, producto y escala para líderes de crecimiento.',
    image: 'https://picsum.photos/seed/growth/600/400',
    featured: false,
    details: `
      <p>La automatización es el motor del Growth Hacking. Conectamos tus canales de adquisición con tus sistemas de retención para crear bucles de crecimiento autosostenibles.</p>
      <p>Desde la experimentación rápida hasta la personalización masiva de mensajes, te damos las herramientas para escalar tu base de usuarios sin escalar proporcionalmente tu equipo operativo.</p>
    `
  },
  {
    id: 'ai',
    title: 'Inteligencia Artificial',
    eyebrow: 'Innovación Aplicada',
    desc: 'Implementación estratégica de IA para equipos y directivos.',
    image: 'https://picsum.photos/seed/ai/600/400',
    featured: false,
    details: `
      <p>La IA no es el futuro, es el presente operativo. Integramos modelos de lenguaje (LLMs) en tus flujos de trabajo para automatizar tareas cognitivas complejas.</p>
      <p>Análisis de documentos, generación de contenido, atención al cliente de primer nivel y toma de decisiones basada en datos, todo potenciado por agentes de IA personalizados para tu negocio.</p>
    `
  },
  {
    id: 'ops',
    title: 'Venture Capital & Ops',
    eyebrow: 'Eficiencia Financiera',
    desc: 'Herramientas y estrategia para levantar rondas y optimizar capital.',
    image: 'https://picsum.photos/seed/finance/600/400',
    featured: false,
    details: `
      <p>Para startups y empresas en crecimiento, la eficiencia del capital es vital. Automatizamos tus reportes financieros, gestión de inversores y procesos de due diligence.</p>
      <p>Mantén tu data room siempre listo y tus métricas actualizadas en tiempo real para tomar decisiones financieras con confianza y velocidad.</p>
    `
  }
];

const NETWORK_NODES = [
  { x: 85, y: 20, label: 'Ventas', color: 'var(--teal)' },
  { x: 75, y: 45, label: 'Marketing', color: 'var(--teal-light)' },
  { x: 90, y: 60, label: 'Finanzas', color: 'var(--teal)' },
  { x: 65, y: 75, label: 'RRHH', color: 'var(--teal-light)' },
  { x: 80, y: 85, label: 'Operaciones', color: 'var(--teal)' },
  { x: 55, y: 15, label: 'Logística', color: 'var(--teal-light)' },
  { x: 25, y: 12, label: 'Gerencia', color: 'var(--teal)' },
  { x: 35, y: 88, label: 'Soporte', color: 'var(--teal-light)' },
  { x: 95, y: 35, label: 'IT', color: 'var(--teal)' },
  { x: 60, y: 50, label: 'Legal', color: 'var(--teal-light)' },
  { x: 15, y: 80, label: 'Calidad', color: 'var(--teal)' },
  { x: 45, y: 10, label: 'Compras', color: 'var(--teal-light)' },
  { x: 92, y: 80, label: 'Innovación', color: 'var(--teal)' },
];

const SERVICE_MODULES = [
  {
    id: 'sales',
    title: 'Automatización de Ventas',
    desc: 'Pipelines inteligentes, seguimiento automático de leads, cotizaciones dinámicas y cierre asistido.',
    image: 'https://picsum.photos/seed/sales_auto/800/600',
    tags: ['CRM', 'WhatsApp', 'Email']
  },
  {
    id: 'hr',
    title: 'RRHH y Onboarding Digital',
    desc: 'Reclutamiento automatizado, onboarding sin papel, gestión de nómina y evaluaciones.',
    image: 'https://picsum.photos/seed/hr_tech/800/600',
    tags: ['ATS', 'Slack', 'Notion']
  },
  {
    id: 'marketing',
    title: 'Marketing & Growth',
    desc: 'Embudos de conversión, email marketing personalizado y reportes en tiempo real.',
    image: 'https://picsum.photos/seed/marketing_growth/800/600',
    tags: ['HubSpot', 'Meta', 'Google']
  },
  {
    id: 'ops',
    title: 'Operaciones y Back-Office',
    desc: 'Flujos de aprobación, gestión documental e integración entre sistemas.',
    image: 'https://picsum.photos/seed/operations_back/800/600',
    tags: ['Zapier', 'Make', 'APIs']
  },
  {
    id: 'design',
    title: 'Diseño y Contenido',
    desc: 'Automatización de briefs, aprobación de activos y repositorios inteligentes.',
    image: 'https://picsum.photos/seed/design_content/800/600',
    tags: ['Canva', 'Airtable', 'Monday']
  },
  {
    id: 'revops',
    title: 'RevOps y Tecnología',
    desc: 'Alineación de ventas, marketing y servicio. CI/CD pipelines y gestión de datos.',
    image: 'https://picsum.photos/seed/devops_tech/800/600',
    tags: ['GitHub', 'Jira', 'n8n']
  }
];

const PROCESS_STEPS = [
  {
    id: 'diagnosis',
    label: 'Diagnóstico',
    title: 'Diagnóstico Profundo',
    desc: 'Mapeo completo de tus procesos, identificación de cuellos de botella y cálculo del costo real de la ineficiencia. Sesión gratuita de 90 min.',
    icon: Search,
    image: 'https://picsum.photos/seed/diagnosis/1200/600',
    steps: [
      'Mapeo completo de tus procesos actuales',
      'Identificación de cuellos de botella',
      'Cálculo del costo real de la ineficiencia',
      'Sesión gratuita de 90 min de entrega de resultados'
    ]
  },
  {
    id: 'design',
    label: 'Diseño',
    title: 'Diseño de Solución',
    desc: 'Propuesta detallada con mapa de automatización, herramientas recomendadas, cronograma y ROI proyectado. Todo documentado.',
    icon: PenTool,
    image: 'https://picsum.photos/seed/design/1200/600',
    steps: [
      'Creación del mapa de arquitectura de automatización',
      'Selección de herramientas No-Code/Low-Code óptimas',
      'Definición del cronograma detallado de implementación',
      'Proyección de ROI y documentación técnica'
    ]
  },
  {
    id: 'implementation',
    label: 'Implementación',
    title: 'Implementación Ágil',
    desc: 'Construcción por sprints de 2 semanas. Resultados visibles en las primeras 4 semanas del proyecto.',
    icon: Rocket,
    image: 'https://picsum.photos/seed/implementation/1200/600',
    steps: [
      'Configuración de entornos y cuentas',
      'Desarrollo por sprints de 2 semanas',
      'Pruebas de integración y calidad (QA)',
      'Despliegue y entrega de resultados visibles'
    ]
  },
  {
    id: 'improvement',
    label: 'Mejora',
    title: 'Seguimiento y Mejora',
    desc: 'KPIs mensuales, optimización continua, capacitación de tu equipo y soporte post-implementación incluido.',
    icon: TrendingUp,
    image: 'https://picsum.photos/seed/improvement/1200/600',
    steps: [
      'Monitoreo de KPIs y métricas de éxito',
      'Optimización continua de flujos de trabajo',
      'Capacitación especializada a tu equipo',
      'Soporte post-implementación y mantenimiento'
    ]
  }
];

const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'StarterIA',
    tag: 'Plan Básico',
    price: '$500',
    period: '/mes',
    subPrice: 'o $5M COP',
    desc: 'Ideal para pruebas iniciales y pymes pequeñas.',
    features: [
      'Auditoría de procesos (1 flujo clave)',
      'Automatización básica (leads/CRM)',
      'Dashboard simple',
      'Soporte email (48h)'
    ],
    highlight: false
  },
  {
    id: 'scale',
    name: 'ScaleIA',
    tag: 'Plan Crecimiento',
    price: '$2,000',
    period: '/mes',
    subPrice: 'o $18M COP anual',
    desc: 'Para escalar ventas B2B medianas.',
    features: [
      'Integraciones (WhatsApp, HubSpot, ERP)',
      'Automatizaciones multi-flujo + IA básica',
      'SLA 8h',
      'Analítica PowerBI + onboarding'
    ],
    highlight: true
  },
  {
    id: 'elite',
    name: 'EliteIA',
    tag: 'Plan Enterprise',
    price: '$10,000+',
    period: '/mes',
    subPrice: 'o custom',
    desc: 'Máxima personalización para grandes empresas.',
    features: [
      'API full, agentes IA avanzados',
      'Seguridad enterprise',
      'Soporte 24/7 dedicado, SLAs 99.9%',
      'Piloto + escalado ilimitado',
      'Consultoría estratégica'
    ],
    highlight: false
  }
];

export default function LandingPage() {
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);
  const activeRoute = routes.find(r => r.id === activeRouteId);
  const [activeService, setActiveService] = useState(SERVICE_MODULES[0]);
  const [activeProcess, setActiveProcess] = useState(PROCESS_STEPS[0]);
  const [activeProcessDetail, setActiveProcessDetail] = useState<typeof PROCESS_STEPS[0] | null>(null);
  
  // State to toggle between V1 (Old) and V2 (New) designs for comparison
  // const [isV2, setIsV2] = useState(true); // Removed as V2 is now permanent

  useEffect(() => {
    /* ─── CSS Scroll-driven support check ─── */
    const hasSDT = CSS.supports('animation-timeline', 'scroll()');
    const sp = document.getElementById('sp');
    
    const handleScrollProgress = () => {
      if (!hasSDT && sp) {
        sp.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
      }
    };

    if (!hasSDT) {
      if (sp) sp.className = 'sp-js';
      window.addEventListener('scroll', handleScrollProgress, { passive: true });
    }

    /* ─── Nav ─── */
    const nav = document.getElementById('nav');
    const handleNavScroll = () => {
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });

    /* ─── Particles ─── */
    const cvs = document.getElementById('cvs') as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null = null;
    let animationFrameId: number;
    let pts: any[] = [];

    if (cvs) {
      ctx = cvs.getContext('2d');
      const rsz = () => {
        cvs.width = window.innerWidth;
        cvs.height = window.innerHeight;
      };
      rsz();
      window.addEventListener('resize', rsz);

      for (let i = 0; i < 60; i++) pts.push({
        x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
        vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18,
        r: Math.random() * 1.1 + .3,
        c: Math.random() > .5 ? '232, 66, 10' : '249, 115, 22',
        a: Math.random() * .18 + .04
      });

      const dp = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        pts.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = cvs.width; if (p.x > cvs.width) p.x = 0;
          if (p.y < 0) p.y = cvs.height; if (p.y > cvs.height) p.y = 0;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.c},${p.a})`; ctx.fill();
        });
        for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 85) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(232, 66, 10,${.05 * (1 - d / 85)})`; ctx.lineWidth = .4; ctx.stroke();
          }
        }
        animationFrameId = requestAnimationFrame(dp);
      };
      dp();
    }

    /* ─── rAF scroll engine ─── */
    let ly = 0, tk = false;
    let scrollFrameId: number;

    const tick = () => {
      tk = false;
      const sy = ly;

      /* Parallax orbs + rings */
      document.querySelectorAll<HTMLElement>('.orb,.ring').forEach(el => {
        const s = parseFloat(el.dataset.py || '.1');
        el.style.transform = `translateY(${sy * s}px)`;
      });

      /* Floating chips — scroll + mouse */
      document.querySelectorAll<HTMLElement>('.fchip').forEach(ch => {
        const py = parseFloat(ch.dataset.py || '-.1');
        (ch as any)._sy = sy * py;
        ch.style.transform = `translateY(${(ch as any)._sy}px) translateX(${(ch as any)._mx || 0}px)`;
      });

      /* Motion rows scroll-triggered */
      const hero = document.getElementById('hero');
      if (hero) {
        const hH = hero.offsetHeight;
        const bp = Math.max(0, sy - hH);
        ['row1', 'row2'].forEach(id => {
          const r = document.getElementById(id); if (!r) return;
          const s = parseFloat(r.dataset.speed || '-.2');
          r.style.transform = `translateX(${bp * s}px)`;
        });
      }

      /* Clients track extra parallax */
      const ct = document.getElementById('ct');
      if (ct) ct.style.transform = `translateY(-50%) translateX(${-sy * .1}px)`;
    };

    const onS = () => {
      ly = window.scrollY;
      if (!tk) {
        scrollFrameId = requestAnimationFrame(tick);
        tk = true;
      }
    };
    window.addEventListener('scroll', onS, { passive: true });

    /* ─── Mouse parallax on chips ─── */
    const handleMouseMove = (e: MouseEvent) => {
      const cx2 = window.innerWidth / 2;
      const dx = (e.clientX - cx2) / cx2;
      document.querySelectorAll<HTMLElement>('.fchip').forEach(ch => {
        const px = parseFloat(ch.dataset.px || '.04');
        (ch as any)._mx = dx * 55 * px;
        ch.style.transform = `translateY(${(ch as any)._sy || 0}px) translateX(${(ch as any)._mx}px)`;
      });
    };
    document.addEventListener('mousemove', handleMouseMove);

    /* Clients track position init */
    const ct = document.getElementById('ct');
    if (ct) { ct.style.top = '50%'; ct.style.transform = 'translateY(-50%)'; ct.style.position = 'absolute'; }

    /* ─── Intersection Observers ─── */
    const io = new IntersectionObserver(en => {
      en.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: .1, rootMargin: '0px 0px -28px 0px' });

    /* Pain items stagger left */
    const painList = document.querySelector('.pain-list');
    if (painList) {
      new IntersectionObserver(en => {
        en.forEach(e => {
          if (e.isIntersecting) {
            document.querySelectorAll('.pain-item').forEach((el, i) => setTimeout(() => el.classList.add('in-view'), i * 95));
          }
        });
      }, { threshold: .08 }).observe(painList);
    }

    /* Visual panel */
    document.querySelectorAll('.visual-panel').forEach(el => io.observe(el));



    /* Profile card + metrics */
    document.querySelectorAll('.profile-card,.fm').forEach(el => io.observe(el));

    /* Process steps stagger */
    const processGrid = document.querySelector('.process-grid');
    if (processGrid) {
      new IntersectionObserver(en => {
        en.forEach(e => {
          if (e.isIntersecting) {
            document.querySelectorAll('.process-step').forEach((s, i) => setTimeout(() => s.classList.add('in-view'), i * 120));
          }
        });
      }, { threshold: .08 }).observe(processGrid);
    }

    /* Benefit cards stagger */
    const benefitsGrid = document.querySelector('.benefits-grid');
    if (benefitsGrid) {
      new IntersectionObserver(en => {
        en.forEach(e => {
          if (e.isIntersecting) {
            document.querySelectorAll('.benefit-card').forEach((c, i) => setTimeout(() => c.classList.add('in-view'), i * 70));
          }
        });
      }, { threshold: .08 }).observe(benefitsGrid);
    }

    /* Testi cards stagger */
    const testiGrid = document.querySelector('.testi-grid');
    if (testiGrid) {
      new IntersectionObserver(en => {
        en.forEach(e => {
          if (e.isIntersecting) {
            document.querySelectorAll('.testi-card').forEach((c, i) => setTimeout(() => c.classList.add('in-view'), i * 110));
          }
        });
      }, { threshold: .08 }).observe(testiGrid);
    }

    /* SD fallback */
    if (!hasSDT) {
      const sdo = new IntersectionObserver(en => {
        en.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('io-v');
            sdo.unobserve(e.target);
          }
        });
      }, { threshold: .07 });
      document.querySelectorAll('.sd-up,.sd-left,.sd-right,.sd-scale').forEach(el => sdo.observe(el));
    }

    /* ─── Animated counters ─── */
    function animC(el: Element, target: number) {
      const dur = 1600, s = performance.now();
      (function u(t) {
        const p = Math.min((t - s) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(e * target) + '+'; if (p < 1) requestAnimationFrame(u);
      })(s);
    }
    document.querySelectorAll('[data-target]').forEach(el => {
      new IntersectionObserver(en => {
        en.forEach(e => {
          if (e.isIntersecting) {
            animC(e.target, parseInt((e.target as HTMLElement).dataset.target || '0'));
          }
        });
      }, { threshold: .5 }).observe(el);
    });

    /* ─── 3D tilt on cards ─── */
    const handleCardMove = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      const me = e as MouseEvent;
      const r = card.getBoundingClientRect();
      const x = (me.clientX - r.left) / r.width - .5;
      const y = (me.clientY - r.top) / r.height - .5;
      card.style.transform = `translateY(-5px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    };
    const handleCardLeave = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = '';
    };

    document.querySelectorAll('.benefit-card,.testi-card').forEach(card => {
      card.addEventListener('mousemove', handleCardMove);
      card.addEventListener('mouseleave', handleCardLeave);
    });

    tick();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScrollProgress);
      window.removeEventListener('scroll', handleNavScroll);
      window.removeEventListener('resize', () => {
        if (cvs) {
          cvs.width = window.innerWidth;
          cvs.height = window.innerHeight;
        }
      });
      window.removeEventListener('scroll', onS);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(scrollFrameId);
      io.disconnect();
      document.querySelectorAll('.benefit-card,.testi-card').forEach(card => {
        card.removeEventListener('mousemove', handleCardMove);
        card.removeEventListener('mouseleave', handleCardLeave);
      });
    };
  }, []);

  return (
    <>
      <canvas id="cvs"></canvas>
      <div className="sp" id="sp"></div>

      {/* ════ NAV ════ */}
      <nav id="nav">
        <a href="#" className="logo">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E8420A" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
            <circle cx="28" cy="32" r="11" fill="url(#logoGrad)" />
            <path d="M48 78 C 48 55, 52 50, 78 28" stroke="url(#logoGrad)" strokeWidth="22" strokeLinecap="round" />
          </svg>
          <span className="logo-text">Longitudinal</span>
        </a>
        
        {/* REVERT BUTTON REMOVED */}

        <ul className="nav-links">
          <li><a href="#explore">Rutas</a></li>
          <li><a href="#services">Servicios</a></li>
          <li><a href="#about">Consultores</a></li>
          <li><a href="#how">Metodología</a></li>
          <li><a href="#benefits">Resultados</a></li>
          <li><a href="#cta" className="nav-cta">Agendar cita</a></li>
        </ul>
      </nav>

      {/* ════ HERO ════ */}
      <section id="hero">
        <div className="hero-grid"></div>
        {/* Orbs remain for atmosphere */}
        <div className="orb orb1" data-py="0.13"></div>
        <div className="orb orb2" data-py="0.21"></div>
        <div className="orb orb3" data-py="0.16"></div>

        {/* Network Visualization */}
        <div className="network-container" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          <svg style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(232, 66, 10, 0.05)" />
                <stop offset="50%" stopColor="rgba(232, 66, 10, 0.2)" />
                <stop offset="100%" stopColor="rgba(232, 66, 10, 0.05)" />
              </linearGradient>
              <linearGradient id="lineGradStrong" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(232, 66, 10, 0.1)" />
                <stop offset="50%" stopColor="rgba(232, 66, 10, 0.5)" />
                <stop offset="100%" stopColor="rgba(232, 66, 10, 0.1)" />
              </linearGradient>
            </defs>
            {/* Connections */}
            {[
              [0, 1, false], [1, 2, true], [2, 3, false], [3, 4, true], [4, 0, false], // Outer loop
              [1, 5, true], [2, 6, false], [5, 7, false], [6, 8, true], // Inner connections
              [0, 9, false], [4, 10, false], [9, 11, true], [10, 12, false], // Edge connections
              [5, 6, false], [7, 8, false], [3, 8, true], [1, 9, false] // Cross connections
            ].map(([start, end, isStrong], i) => {
              const n1 = NETWORK_NODES[start as number];
              const n2 = NETWORK_NODES[end as number];
              if (!n1 || !n2) return null;
              return (
                <line
                  key={i}
                  x1={`${n1.x}%`} y1={`${n1.y}%`}
                  x2={`${n2.x}%`} y2={`${n2.y}%`}
                  stroke={isStrong ? "url(#lineGradStrong)" : "url(#lineGrad)"}
                  strokeWidth={isStrong ? "1.5" : "1"}
                  className="network-line"
                />
              );
            })}
          </svg>
          
          {/* Nodes/Chips */}
          {NETWORK_NODES.map((node, i) => (
            <div
              key={i}
              className="fchip"
              style={{ 
                left: `${node.x}%`, 
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
                opacity: i % 3 === 0 ? 0.9 : 0.7, // Varying opacity
                zIndex: i % 2 === 0 ? 2 : 1
              }}
              data-px={(Math.random() - 0.5) * 0.15}
              data-py={(Math.random() - 0.5) * 0.25}
            >
              <span className="fchip-dot" style={{ background: node.color }}></span>
              {node.label}
            </div>
          ))}
        </div>

        <div className="hero-content">
          {/* Tag removed as requested */}
          <h1 className="hero-title">
            Automatiza tus<br />procesos.<br />
            <span className="t-mag">Escala</span> sin fricción.<br />
            <span className="t-blue">Vuélvelo simple.</span>
          </h1>
          <p className="hero-sub">Transformamos operaciones manuales y costosas en flujos inteligentes — en ventas, RRHH, marketing, operaciones, diseño y DevOps. Consultoría especializada para empresas colombianas que quieren crecer sin contratar más.</p>
          <div className="hero-actions">
            <a href="#cta" className="btn-mag btn-xl">Agenda tu diagnóstico gratuito</a>
            <a href="#explore" className="btn-outline btn-xl">Explorar rutas →</a>
          </div>
          <div className="hero-stats">
            <div><div className="stat-val" data-target="70">0</div><div className="stat-lbl">% reducción tiempo<br />en tareas manuales</div></div>
            <div><div className="stat-val" data-target="45">0</div><div className="stat-lbl">% ahorro en<br />costos operativos</div></div>
            <div><div className="stat-val" data-target="30">0</div><div className="stat-lbl">+ empresas PyME<br />transformadas</div></div>
          </div>
        </div>
      </section>

      {/* ════ EXPLORE (Dynamic Boxes) ════ */}
      <section id="explore" className="routes-section">
        <div className="eyebrow sd-up">Rutas de Transformación</div>
        <h2 className="section-title sd-up" style={{marginBottom: '48px'}}>Programas diseñados para<br/>cada etapa de tu crecimiento</h2>
        
        <div className="route-grid">
          {routes.map((route) => (
            <div 
              key={route.id} 
              className={`route-card ${route.featured ? 'featured' : 'standard'}`}
              onClick={() => setActiveRouteId(route.id)}
            >
              <div className="rc-bg">
                <img src={route.image} alt={route.title} referrerPolicy="no-referrer" />
              </div>
              <div className="rc-overlay"></div>
              
              {route.featured ? (
                <>
                  <div className="rc-content-wrap">
                    <div className="rc-eyebrow"><span style={{fontSize:'1.2em'}}>↗</span> {route.eyebrow}</div>
                    <div className="rc-title">{route.title}</div>
                    <div className="rc-desc">{route.desc}</div>
                    <div className="btn-explore">Explorar {route.title.toLowerCase()}</div>
                  </div>
                  <div className="rc-image-wrap"></div>
                </>
              ) : (
                <div className="rc-content-wrap">
                  <div className="rc-title">{route.title}</div>
                  <div className="rc-desc">{route.desc}</div>
                  <div className="btn-explore">Explorar {route.id}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ════ DETAIL VIEW OVERLAY ════ */}
      {activeRoute && (
        <div className="detail-overlay">
          <div className="do-header">
            <div className="logo"><span className="logo-mark">L</span>Longitudinal</div>
            <button className="do-close" onClick={() => setActiveRouteId(null)}>✕</button>
          </div>
          <div className="do-content">
            <img src={activeRoute.image} alt={activeRoute.title} className="do-hero-img" referrerPolicy="no-referrer" />
            <div className="eyebrow">{activeRoute.eyebrow}</div>
            <h1 className="do-title">{activeRoute.title}</h1>
            <div className="do-body" dangerouslySetInnerHTML={{ __html: activeRoute.details || '' }}></div>
            <div style={{marginTop: '48px'}}>
              <a href="#cta" onClick={() => setActiveRouteId(null)} className="btn-mag btn-xl">Agendar diagnóstico para {activeRoute.title}</a>
            </div>
          </div>
        </div>
      )}

      {/* ════ PROCESS DETAIL OVERLAY ════ */}
      {activeProcessDetail && (
        <div className="detail-overlay">
          <div className="do-header">
            <div className="logo"><span className="logo-mark">L</span>Longitudinal</div>
            <button className="do-close" onClick={() => setActiveProcessDetail(null)}>✕</button>
          </div>
          <div className="do-content">
            <img src={activeProcessDetail.image} alt={activeProcessDetail.title} className="do-hero-img" referrerPolicy="no-referrer" />
            <div className="eyebrow">{activeProcessDetail.label}</div>
            <h1 className="do-title">{activeProcessDetail.title}</h1>
            <p className="do-desc" style={{fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '2rem', color: 'var(--text-mid)'}}>{activeProcessDetail.desc}</p>
            
            <div className="mt-8">
              <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--text)'}}>Pasos para realizar este proceso:</h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {activeProcessDetail.steps?.map((step, i) => (
                  <li key={i} style={{display: 'flex', alignItems: 'flex-start', gap: '1rem'}}>
                    <div style={{
                      background: 'var(--mag)', 
                      color: 'white', 
                      borderRadius: '50%', 
                      width: '2rem', 
                      height: '2rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      flexShrink: 0, 
                      fontWeight: 'bold'
                    }}>
                      {i + 1}
                    </div>
                    <span style={{fontSize: '1.1rem', color: 'var(--text-mid)'}}>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{marginTop: '48px'}}>
              <a href="#cta" onClick={() => setActiveProcessDetail(null)} className="btn-mag btn-xl">Agendar {activeProcessDetail.title}</a>
            </div>
          </div>
        </div>
      )}

      {/* ════ SERVICES ════ */}
      <section id="services">
        <div className="services-head">
          <div>
            <div className="eyebrow sd-left">Servicios</div>
            <h2 className="section-title sd-left">Automatización<br />en cada área<br />de tu empresa</h2>
          </div>
          <div className="section-desc sd-right">Sin importar si el desafío está en ventas, RRHH, marketing, diseño, operaciones o tecnología — tenemos la metodología para resolverlo con precisión.</div>
        </div>
        
        <div className="services-split-layout sd-up">
          {/* Left Menu */}
          <div className="services-menu">
            {SERVICE_MODULES.map((module) => (
              <button 
                key={module.id}
                className={`service-menu-item ${activeService.id === module.id ? 'active' : ''}`}
                onClick={() => setActiveService(module)}
              >
                {module.title} <span className="arrow">→</span>
              </button>
            ))}
          </div>

          {/* Right Display */}
          <div className="services-display">
            <div className="sd-image-container">
              <img 
                key={activeService.image} // Force re-render on image change for animation
                src={activeService.image} 
                alt={activeService.title} 
                className="sd-image"
                referrerPolicy="no-referrer"
              />
              <div className="sd-overlay">
                <h3 className="sd-title">{activeService.title}</h3>
                <p className="sd-desc">{activeService.desc}</p>
                <div className="sd-tags">
                  {activeService.tags.map(tag => (
                    <span key={tag} className="sd-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ TOOLS BAND ════ */}
      <div className="tools-band warm-bg">
        <div className="tools-band-title">
          Herramientas y plataformas que hemos conectado para automatizar
        </div>
        
        {/* V2: Professional Brand Icons */}
        <>
          <div className="motion-row" id="row1" data-speed="-0.22">
              <div className="tool-icon-wrapper" title="Zapier"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M4.19 19.99l.01-11.96 7.84-4.02 7.85 4.02v11.96l-7.85 4.02-7.85-4.02zm2.01-1.74l5.84 2.99 5.84-2.99v-8.48l-5.84-2.99-5.84 2.99v8.48z"/></svg></div>
              <div className="tool-icon-wrapper" title="Make"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 21.6c-5.3 0-9.6-4.3-9.6-9.6S6.7 2.4 12 2.4s9.6 4.3 9.6 9.6-4.3 9.6-9.6 9.6z"/></svg></div>
              <div className="tool-icon-wrapper" title="HubSpot"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg></div>
              <div className="tool-icon-wrapper" title="Slack"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M6 15a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2zm1-2a2 2 0 0 1 2-2 2 2 0 0 1-2-2 2 2 0 0 1-2 2v2h2zm2 1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2zm2-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2v-2z"/></svg></div>
              <div className="tool-icon-wrapper" title="Salesforce"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M16.2 10.8c-.2-1.8-1.7-3.2-3.6-3.2-.5 0-1 .1-1.4.3-.6-1.4-2-2.3-3.6-2.3-1.8 0-3.3 1.2-3.8 2.9-.2 0-.4-.1-.6-.1-2.2 0-4 1.8-4 4 0 2.2 1.8 4 4 4h13c1.7 0 3-1.3 3-3 0-1.5-1.1-2.8-2.6-3z"/></svg></div>
              <div className="tool-icon-wrapper" title="Google"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg></div>
              <div className="tool-icon-wrapper" title="Notion"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M4.5 4.5v15h15v-15h-15zm3 3h2.5l3.5 6.5 3.5-6.5h2.5v9h-2v-6l-4 7-4-7v6h-2v-9z"/></svg></div>
              <div className="tool-icon-wrapper" title="Airtable"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M12 2L2 7l10 5 10-5-10-5zm0 11l-10 5 10 5 10-5-10-5z"/></svg></div>
            </div>
            <div className="motion-row" id="row2" data-speed="0.19" style={{ marginTop: '30px' }}>
              <div className="tool-icon-wrapper" title="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div>
              <div className="tool-icon-wrapper" title="Microsoft"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/></svg></div>
              <div className="tool-icon-wrapper" title="OpenAI"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M22.28 9.28a6.38 6.38 0 0 0-.23-3.6 6.38 6.38 0 0 0-3.37-3.37 6.38 6.38 0 0 0-3.6-.23 6.38 6.38 0 0 0-3.37 1.83 6.38 6.38 0 0 0-1.83 3.37 6.38 6.38 0 0 0 .23 3.6 6.38 6.38 0 0 0 3.37 3.37 6.38 6.38 0 0 0 3.6.23 6.38 6.38 0 0 0 3.37-1.83 6.38 6.38 0 0 0 1.83-3.37zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg></div>
              <div className="tool-icon-wrapper" title="Pipedrive"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg></div>
              <div className="tool-icon-wrapper" title="ActiveCampaign"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V8h2v4zm2 4h-1v-2h1v2zm0-4h-1V8h1v4z"/></svg></div>
              <div className="tool-icon-wrapper" title="Monday"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M4 4h16v16H4V4zm2 2v12h3V8l3 3 3-3v10h3V6H6z"/></svg></div>
              <div className="tool-icon-wrapper" title="GitHub"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 .1.8 1.8 2.8 1.3.5 0 .7.2.9.3-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"/></svg></div>
            </div>
          </>
      </div>

      {/* ════ ABOUT (Mega Card) ════ */}
      <section id="about">
        <div className="mega-card sd-up">
          <div className="mc-grid">
            <div className="mc-content">
              <h2>
                Donde las empresas ágiles<br />
                <span className="t-gray">construyen ventajas definitivas</span>
              </h2>
              <p className="mc-desc">
                Los líderes más ambiciosos de Colombia aprendiendo de quienes construyeron sistemas escalables.
              </p>
              <a href="#how" className="btn-lime">Conoce el método</a>

              <div className="mc-features">
                <div className="mc-feat-item"><span className="mc-feat-icon">⚡</span> Diagnóstico selectivo</div>
                <div className="mc-feat-item"><span className="mc-feat-icon">🏗️</span> Tecnología Enterprise</div>
                <div className="mc-feat-item"><span className="mc-feat-icon">📚</span> Frameworks probados</div>
                <div className="mc-feat-item"><span className="mc-feat-icon">🚀</span> Implementación ágil</div>
                <div className="mc-feat-item"><span className="mc-feat-icon">🤝</span> Soporte continuo</div>
                <div className="mc-feat-item"><span className="mc-feat-icon">✅</span> Resultados verificados</div>
              </div>
            </div>
            <div className="mc-image">
              <img src="https://picsum.photos/seed/meeting/800/600" alt="Consultoría estratégica" referrerPolicy="no-referrer" />
            </div>
          </div>

          <div className="mc-stats-row">
            <div className="mc-stat-card">
              <div className="mc-stat-val">+30</div>
              <div className="mc-stat-lbl">Empresas transformadas</div>
            </div>
            <div className="mc-stat-card">
              <div className="mc-stat-val">+45%</div>
              <div className="mc-stat-lbl">Ahorro operativo</div>
            </div>
            <div className="mc-stat-card">
              <div className="mc-stat-val">+100%</div>
              <div className="mc-stat-lbl">Tareas automatizadas</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ PROCESS (dark) ════ */}
      <section id="how">
        <div className="eyebrow on-dark sd-up">Metodología</div>
        <h2 className="section-title on-dark sd-up">Así trabajamos contigo</h2>
        <p className="section-desc on-dark sd-up">Un proceso claro y estructurado desde el diagnóstico hasta los resultados medibles.</p>
        
        <div className="process-tabs-container sd-up">
          <div className="process-tabs">
            {PROCESS_STEPS.map((step) => (
              <button
                key={step.id}
                className={`process-tab ${activeProcess.id === step.id ? 'active' : ''}`}
                onClick={() => setActiveProcess(step)}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>

        <div className="process-display sd-up">
          <div 
            className="process-card" 
            style={{ backgroundImage: `url(${activeProcess.image})` }}
          >
            <div className="pc-overlay">
              <div className="pc-content">
                <div className="pc-icon-wrap">
                  <activeProcess.icon size={48} strokeWidth={1.5} />
                </div>
                <h3 className="pc-title">{activeProcess.title}</h3>
                <p className="pc-desc">{activeProcess.desc}</p>
                <button 
                  className="btn-lime mt-6 flex items-center gap-2"
                  onClick={() => setActiveProcessDetail(activeProcess)}
                >
                  Aplica Ahora <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ BENEFITS (dark) ════ */}
      <section id="benefits">
        <div className="benefits-head">
          <div>
            <div className="eyebrow on-dark sd-left">Resultados</div>
            <h2 className="section-title on-dark sd-left">Números que<br />hablan por sí solos</h2>
          </div>
          <div className="section-desc on-dark sd-right">Resultados reales obtenidos por PyMEs colombianas que implementaron automatización de procesos con nuestra metodología.</div>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="bc-icon-wrap"><Clock size={32} strokeWidth={1.5} /></div>
            <div className="bc-val"><CountUp end={70} prefix="-" suffix="%" /></div>
            <div className="bc-title">Tiempo en tareas manuales</div>
            <div className="bc-desc">Las empresas recuperan 2–3 horas diarias por colaborador eliminando trabajo repetitivo.</div>
          </div>
          <div className="benefit-card">
            <div className="bc-icon-wrap"><DollarSign size={32} strokeWidth={1.5} /></div>
            <div className="bc-val"><CountUp end={45} prefix="-" suffix="%" /></div>
            <div className="bc-title">Reducción de costos operativos</div>
            <div className="bc-desc">Menos errores, menos reprocesos, menos tiempo de gestión. El ahorro se reinvierte en crecimiento.</div>
          </div>
          <div className="benefit-card">
            <div className="bc-icon-wrap"><BarChart size={32} strokeWidth={1.5} /></div>
            <div className="bc-val"><CountUp end={60} prefix="+" suffix="%" /></div>
            <div className="bc-title">Capacidad sin contratar</div>
            <div className="bc-desc">Atiende más clientes y procesa más pedidos con el mismo equipo actual.</div>
          </div>
          <div className="benefit-card">
            <div className="bc-icon-wrap"><CheckCircle size={32} strokeWidth={1.5} /></div>
            <div className="bc-val"><CountUp end={85} prefix="+" suffix="%" /></div>
            <div className="bc-title">Precisión en datos</div>
            <div className="bc-desc">Cero errores de transcripción. Datos limpios, confiables y en tiempo real.</div>
          </div>
          <div className="benefit-card">
            <div className="bc-icon-wrap"><Calendar size={32} strokeWidth={1.5} /></div>
            <div className="bc-val"><CountUp end={4} suffix=" sem" /></div>
            <div className="bc-title">Primeros resultados</div>
            <div className="bc-desc">En un mes ya ves el impacto. No esperas trimestres para justificar la inversión.</div>
          </div>
          <div className="benefit-card">
            <div className="bc-icon-wrap"><Smile size={32} strokeWidth={1.5} /></div>
            <div className="bc-val"><CountUp end={40} prefix="+" suffix="%" /></div>
            <div className="bc-title">Satisfacción del equipo</div>
            <div className="bc-desc">Cuando el equipo deja las tareas mecánicas, recupera energía para trabajo estratégico.</div>
          </div>
        </div>
        <div className="ticker-wrap">
          <div className="ticker">
            {/* V2: Lucide Icons (New) */}
            <>
              <div className="tick-item"><span className="ti"><Settings size={20} /></span> Automatización de Ventas</div>
              <div className="tick-item"><span className="ti"><Bot size={20} /></span> Bots de WhatsApp</div>
              <div className="tick-item"><span className="ti"><BarChart size={20} /></span> Dashboards Live</div>
              <div className="tick-item"><span className="ti"><Mail size={20} /></span> Email Marketing</div>
              <div className="tick-item"><span className="ti"><Users size={20} /></span> Onboarding Digital</div>
              <div className="tick-item"><span className="ti"><CreditCard size={20} /></span> Facturación Automática</div>
              <div className="tick-item"><span className="ti"><Link size={20} /></span> Integración de APIs</div>
              <div className="tick-item"><span className="ti"><FileText size={20} /></span> Gestión Documental</div>
              
              <div className="tick-item"><span className="ti"><Settings size={20} /></span> Automatización de Ventas</div>
              <div className="tick-item"><span className="ti"><Bot size={20} /></span> Bots de WhatsApp</div>
              <div className="tick-item"><span className="ti"><BarChart size={20} /></span> Dashboards Live</div>
              <div className="tick-item"><span className="ti"><Mail size={20} /></span> Email Marketing</div>
              <div className="tick-item"><span className="ti"><Users size={20} /></span> Onboarding Digital</div>
              <div className="tick-item"><span className="ti"><CreditCard size={20} /></span> Facturación Automática</div>
              <div className="tick-item"><span className="ti"><Link size={20} /></span> Integración de APIs</div>
              <div className="tick-item"><span className="ti"><FileText size={20} /></span> Gestión Documental</div>
            </>
          </div>
        </div>
      </section>

      {/* ════ TESTIMONIALS ════ */}
      <section id="testimonials">
        <div className="eyebrow sd-up">Casos Reales</div>
        <h2 className="section-title sd-up">Lo que dicen las empresas<br />que transformamos</h2>
        <div className="testi-grid">
          <div className="testi-card"><div className="tc-stars"><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span></div><span className="tc-quote">"</span><p className="tc-text">Automatizamos todo el proceso de cotización y seguimiento de ventas. Lo que antes tomaba 2 días de trabajo manual, ahora sucede en segundos. Nuestro equipo duplicó productividad sin contratar nadie nuevo.</p><div className="tc-author"><div className="tc-av av1">ML</div><div><div className="tc-name">María López</div><div className="tc-co">Gerente Comercial · Servicios · Bogotá</div></div></div></div>
          <div className="testi-card"><div className="tc-stars"><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span></div><span className="tc-quote">"</span><p className="tc-text">Teníamos 4 personas procesando órdenes de compra manualmente. Después de la implementación, ese proceso es completamente automático. Esas personas ahora trabajan en tareas estratégicas. ROI evidente en el primer mes.</p><div className="tc-author"><div className="tc-av av2">CR</div><div><div className="tc-name">Carlos Restrepo</div><div className="tc-co">Director de Operaciones · Industrial · Medellín</div></div></div></div>
          <div className="testi-card"><div className="tc-stars"><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span></div><span className="tc-quote">"</span><p className="tc-text">Como agencia de marketing, el caos operativo era nuestro mayor problema. Ahora los procesos de briefing, aprobación y entrega están automatizados. Los clientes están más satisfechos y el equipo trabaja con mucho menos estrés.</p><div className="tc-author"><div className="tc-av av3">AG</div><div><div className="tc-name">Andrea Gómez</div><div className="tc-co">Fundadora · Agencia Digital · Cali</div></div></div></div>
        </div>
      </section>

      {/* ════ PRICING ════ */}
      <section id="pricing" className="pricing-section">
        <div className="eyebrow sd-up">Inversión</div>
        <h2 className="section-title sd-up">Planes diseñados para<br />tu etapa de crecimiento</h2>
        <p className="section-desc sd-up">Elige el plan que mejor se adapte a tus necesidades actuales. Escala cuando estés listo.</p>
        
        <div className="pricing-grid">
          {PRICING_PLANS.map((plan) => (
            <div key={plan.id} className={`pricing-card ${plan.highlight ? 'highlight' : ''} sd-up`}>
              {plan.highlight && <div className="pc-badge">Más Popular</div>}
              <div className="pc-tag">{plan.tag}</div>
              <h3 className="pc-name">{plan.name}</h3>
              <div className="pc-price-wrap">
                <span className="pc-price">{plan.price}</span>
                <span className="pc-period">{plan.period}</span>
              </div>
              <div className="pc-subprice">{plan.subPrice}</div>
              <p className="pc-desc">{plan.desc}</p>
              
              <div className="pc-divider"></div>
              
              <ul className="pc-features">
                {plan.features.map((feat, i) => (
                  <li key={i}>
                    <Check size={18} style={{ color: plan.highlight ? 'var(--teal)' : 'var(--blue-light)' }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <a href="#cta" className={`btn-pricing ${plan.highlight ? 'btn-lime' : 'btn-outline'}`}>
                Comenzar ahora
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section id="cta">
        <div className="cta-geo"></div>
        <div className="cta-orb"></div>
        <div className="cta-tag">¿Listo para transformar tu empresa?</div>
        <h2 className="cta-title sd-scale">Agenda tu diagnóstico<br /><span className="t-mag">gratuito</span> hoy mismo</h2>
        <p className="cta-desc sd-up">Una sesión de 90 minutos donde analizamos tus procesos actuales, identificamos las oportunidades de mayor impacto y definimos un plan de acción concreto — sin compromiso.</p>
        <div className="cta-actions sd-up">
          <a href="https://calendly.com" target="_blank" className="btn-mag btn-xl">📅 Reservar sesión gratuita</a>
          <a href="https://wa.me/573188713986" target="_blank" className="btn-outline btn-xl">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style={{marginRight: '8px'}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
        <div className="trust-row sd-up">
          <div className="tr-item"><span className="chk">✓</span> Sin costo ni compromiso</div>
          <div className="tr-item"><span className="chk">✓</span> Respuesta en menos de 24h</div>
          <div className="tr-item"><span className="chk">✓</span> Diagnóstico personalizado</div>
          <div className="tr-item"><span className="chk">✓</span> Cualquier área de tu empresa</div>
          <div className="tr-item"><span className="chk">✓</span> Especialistas en PyMEs Colombia</div>
        </div>
      </section>

      {/* ════ FAQ ════ */}
      <section id="faq" className="faq-section">
        <div className="faq-grid">
          <div className="faq-head">
            <h2>Preguntas frecuentes.</h2>
            <p className="faq-desc">Encuentra respuestas sobre nuestra metodología, tiempos de implementación, costos y cómo funciona nuestro acompañamiento.</p>
            <a href="#cta" className="btn-dark">Aprender más</a>
          </div>
          <div className="faq-list">
            {[
              { q: "¿Qué es Longitudinal y qué tipo de servicios ofrecen?", a: "Somos una consultora especializada en automatización de procesos para PyMEs. Ofrecemos diagnóstico, diseño de arquitectura y desarrollo de soluciones automatizadas en ventas, operaciones, RRHH y finanzas." },
              { q: "¿En qué se diferencia de una agencia de software tradicional?", a: "No desarrollamos software desde cero (lo cual es lento y costoso). Integramos herramientas No-Code y Low-Code (como Zapier, Make, HubSpot) que ya existen, conectándolas entre sí. Esto nos permite entregar soluciones en semanas, no meses." },
              { q: "¿Cuánto cuestan los programas de implementación?", a: "Depende de la complejidad. Tenemos paquetes de diagnóstico desde $500 USD y proyectos de implementación completa desde $2,000 USD. El ROI suele recuperarse en los primeros 3 meses." },
              { q: "¿Cómo es el proceso de diagnóstico?", a: "Es una inmersión de 1 a 2 semanas donde mapeamos tus procesos actuales, entrevistamos a tu equipo y detectamos ineficiencias. Entregamos un reporte detallado con el plan de acción y presupuesto exacto." },
              { q: "¿Ofrecen soporte después de la automatización?", a: "Sí. Todos nuestros proyectos incluyen 30 días de soporte intensivo post-lanzamiento. También ofrecemos planes de mantenimiento mensual para asegurar que todo siga funcionando mientras tu empresa escala." },
              { q: "¿Necesito tener equipo técnico interno?", a: "No. Nosotros nos encargamos de toda la parte técnica. Además, capacitamos a tu equipo operativo para que puedan usar las nuevas herramientas sin depender de ingenieros." }
            ].map((item, i) => (
              <div key={i} className="faq-item" onClick={(e) => e.currentTarget.classList.toggle('open')}>
                <button className="faq-question">
                  {item.q}
                  <span className="faq-icon">▼</span>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="fl">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
                <defs>
                  <linearGradient id="logoGradFooter" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E8420A" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                </defs>
                <circle cx="28" cy="32" r="11" fill="url(#logoGradFooter)" />
                <path d="M48 78 C 48 55, 52 50, 78 28" stroke="url(#logoGradFooter)" strokeWidth="22" strokeLinecap="round" />
              </svg>
              Longitudinal
            </div>
            <p className="fd">Consultoría especializada en automatización de procesos para PyMEs colombianas. Reducimos tiempos, costos y carga operativa con tecnología que realmente funciona.</p>
            <div className="social-row">
              <a href="#" className="soc">in</a>
              <a href="#" className="soc">𝕏</a>
              <a href="#" className="soc">📧</a>
              <a href="#" className="soc">💬</a>
            </div>
          </div>
          <div className="fc"><h4>Servicios</h4><ul><li><a href="#services">Ventas</a></li><li><a href="#services">RRHH Digital</a></li><li><a href="#services">Marketing</a></li><li><a href="#services">Operaciones</a></li><li><a href="#services">RevOps</a></li><li><a href="#services">Diseño</a></li></ul></div>
          <div className="fc"><h4>Empresa</h4><ul><li><a href="#about">Consultores</a></li><li><a href="#how">Metodología</a></li><li><a href="#benefits">Resultados</a></li><li><a href="#testimonials">Casos de Éxito</a></li><li><a href="#cta">Contacto</a></li></ul></div>
          <div className="fc"><h4>Contacto</h4><ul><li><a href="#">📍 Colombia</a></li><li><a href="#">📞 +57 318 871 3986</a></li><li><a href="#">📧 hola@longitudinal.co</a></li><li><a href="#">🕐 Lun–Vie 8am–6pm</a></li></ul></div>
        </div>
        <div className="footer-bot">
          <span>© 2025 Longitudinal · Todos los derechos reservados</span>
          <span>Hecho para PyMEs colombianas</span>
        </div>
      </footer>

      <a href="https://wa.me/573188713986" target="_blank" className="fab">
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </>
  );
}
