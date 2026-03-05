import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
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
    id: 'sales',
    title: 'Sales Auto-Pilot',
    eyebrow: 'Ventas',
    desc: 'Conecta tu web con tu CRM. Captura, califica y asigna leads entrantes al instante mediante IA, asegurando que ninguna oportunidad se enfríe.',
    image: 'https://picsum.photos/seed/sales/800/600',
    featured: true,
    details: `
      <p>Sales Auto-Pilot transforma tu embudo de ventas. Olvida la entrada manual de datos y deja que nuestra IA califique y asigne leads 24/7.</p>
      <p><strong>Características principales:</strong></p>
      <ul>
        <li>Captura de leads omnicanal (Web, WhatsApp, Redes).</li>
        <li>Calificación automática basada en reglas de negocio.</li>
        <li>Asignación inteligente a asesores comerciales.</li>
        <li>Seguimiento automatizado para reactivar leads fríos.</li>
      </ul>
    `
  },
  {
    id: 'ai',
    title: 'AI Agents Studio',
    eyebrow: 'Inteligencia Artificial',
    desc: 'Despliega agentes de IA entrenados con los datos de tu empresa para responder consultas, redactar correos y dar soporte 24/7.',
    image: 'https://picsum.photos/seed/ai_agents/600/400',
    featured: false,
    details: `
      <p>Crea tu fuerza laboral digital. Entrena agentes de IA con tu base de conocimiento para atender clientes y empleados sin descanso.</p>
      <p>Desde soporte técnico hasta asistentes de redacción, tus agentes trabajan integrados en tus herramientas favoritas como Slack y WhatsApp.</p>
    `
  },
  {
    id: 'growth',
    title: 'Growth & Omnicanalidad',
    eyebrow: 'Growth',
    desc: 'Crea bucles de mensajes automatizados entre WhatsApp, Email y SMS. Mide conversiones en tiempo real en un dashboard unificado.',
    image: 'https://picsum.photos/seed/growth_omni/600/400',
    featured: false,
    details: `
      <p>Orquesta campañas multicanal que reaccionan al comportamiento del usuario. Envía el mensaje correcto, en el momento exacto, por el canal preferido.</p>
      <p>Centraliza la data de conversión y optimiza tu ROI con dashboards que unifican todas tus fuentes de tráfico.</p>
    `
  },
  {
    id: 'ops',
    title: 'Ops Sync',
    eyebrow: 'Operaciones',
    desc: 'Sincroniza tu facturación, gestión documental y flujos de aprobación. Cuando se cierra una venta, el resto del trabajo ocurre solo.',
    image: 'https://picsum.photos/seed/ops_sync/600/400',
    featured: false,
    details: `
      <p>Elimina el trabajo administrativo post-venta. Ops Sync conecta tu CRM con tu ERP y sistema contable.</p>
      <p>Generación automática de contratos, facturas y órdenes de servicio. Aprobaciones digitales en un clic.</p>
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
    id: 'approvals',
    title: 'Flujos de Aprobación',
    desc: 'Automatiza solicitudes de gasto, vacaciones y contratos con reglas condicionales.',
    image: 'https://picsum.photos/seed/approvals/800/600',
    tags: ['Slack', 'Email', 'ERP']
  },
  {
    id: 'onboarding',
    title: 'Onboarding Digital 1-Clic',
    desc: 'Crea cuentas, envía contratos y asigna tareas a nuevos empleados automáticamente.',
    image: 'https://picsum.photos/seed/onboarding/800/600',
    tags: ['HRIS', 'DocuSign', 'LMS']
  },
  {
    id: 'quotes',
    title: 'Cotizaciones Dinámicas',
    desc: 'Genera propuestas personalizadas en PDF basadas en datos del CRM al instante.',
    image: 'https://picsum.photos/seed/quotes/800/600',
    tags: ['CRM', 'PDF', 'Stripe']
  },
  {
    id: 'support',
    title: 'Soporte Inteligente',
    desc: 'Clasifica tickets y responde preguntas frecuentes con IA antes de escalar a humanos.',
    image: 'https://picsum.photos/seed/support/800/600',
    tags: ['Zendesk', 'Intercom', 'AI']
  },
  {
    id: 'reporting',
    title: 'Reportes Unificados',
    desc: 'Consolida data de marketing, ventas y finanzas en un solo panel de control.',
    image: 'https://picsum.photos/seed/reporting/800/600',
    tags: ['Looker', 'Sheets', 'SQL']
  },
  {
    id: 'inventory',
    title: 'Sincronización de Inventario',
    desc: 'Mantén tu stock actualizado en tiempo real entre tu e-commerce y tu ERP.',
    image: 'https://picsum.photos/seed/inventory/800/600',
    tags: ['Shopify', 'Netsuite', 'WMS']
  }
];

const PROCESS_STEPS = [
  {
    id: 'connect',
    label: 'Conecta',
    title: 'Vincula tus cuentas',
    desc: 'Vincula tus cuentas (HubSpot, WhatsApp, Gmail) con 1 clic de forma segura. Nuestra plataforma se integra nativamente.',
    icon: Link,
    image: 'https://picsum.photos/seed/connect/1200/600',
    steps: [
      'Selecciona tus integraciones desde el marketplace',
      'Autenticación segura vía OAuth',
      'Mapeo automático de campos y datos',
      'Verificación de conexión en tiempo real'
    ]
  },
  {
    id: 'choose',
    label: 'Elige',
    title: 'Selecciona plantillas',
    desc: 'Selecciona plantillas de automatización listas para usar, creadas para ventas y operaciones B2B.',
    icon: FolderKanban,
    image: 'https://picsum.photos/seed/templates/1200/600',
    steps: [
      'Explora la librería de flujos pre-construidos',
      'Filtra por departamento o caso de uso',
      'Previsualiza la lógica de automatización',
      'Instala la plantilla en tu espacio de trabajo'
    ]
  },
  {
    id: 'customize',
    label: 'Personaliza',
    title: 'Ajusta las reglas',
    desc: 'Ajusta las reglas de negocio en nuestro panel visual sin necesidad de programadores. Arrastra, suelta y configura.',
    icon: Settings,
    image: 'https://picsum.photos/seed/customize/1200/600',
    steps: [
      'Editor visual de arrastrar y soltar',
      'Configura condicionales y disparadores',
      'Personaliza mensajes y respuestas de IA',
      'Define roles y permisos de usuarios'
    ]
  },
  {
    id: 'enjoy',
    label: 'Disfruta',
    title: 'Enciende el flujo',
    desc: 'Observa las métricas en tiempo real mientras el sistema hace el trabajo pesado. Escala sin fricción.',
    icon: Rocket,
    image: 'https://picsum.photos/seed/metrics/1200/600',
    steps: [
      'Activa tus flujos de trabajo',
      'Monitorea ejecuciones en vivo',
      'Analiza métricas de rendimiento y ahorro',
      'Recibe notificaciones de hitos importantes'
    ]
  }
];

const PRICING_PLANS = [
  {
    id: 'starter',
<<<<<<< HEAD
    name: 'StarterIA',
=======
    name: 'Starter',
>>>>>>> 258c50937279f56207af23a0f2e31907426db0ba
    tag: 'Plan Básico',
    price: '$99',
    period: '/ mes',
    subPrice: '',
<<<<<<< HEAD
    desc: 'Para microempresas y pymes que nunca han automatizado. Resolves sus dolores más urgentes desde el día 1.',
    highlight: false,
    categories: [
      {
        title: '💬 WhatsApp & atención',
        items: [
          'Respuestas automáticas fuera de horario por WhatsApp',
          'Responde las 5 preguntas más frecuentes sin intervención humana',
          'Avisa por WhatsApp cuando llega un nuevo cliente o lead',
          'Mensaje de bienvenida automático para clientes nuevos'
        ]
      },
      {
        title: '💰 Cobros & finanzas',
        items: [
          'Recordatorio automático de cobro por WhatsApp o email',
          'Alerta cuando un cliente lleva 15 días sin pagar',
          'Confirmación de pago recibido enviada al cliente automáticamente',
          'Reporte semanal de cartera pendiente en tu email'
        ]
      },
      {
        title: '💼 Ventas & leads',
        items: [
          'Captura leads de Instagram/Facebook y los guarda automáticamente',
          'Asigna el lead al vendedor correcto según el producto o zona',
          'Recordatorio al vendedor si no contactó al lead en 24 horas',
          'Notificación cuando un cliente abre tu cotización por email'
        ]
      },
      {
        title: '📊 Reportes automáticos',
        items: [
          'Resumen semanal de ventas directo a tu email todos los lunes',
          'Alerta inmediata cuando las ventas bajan respecto a la semana anterior',
          'Panel simple con los 3 números más importantes de tu negocio'
        ]
      },
      {
        title: '📋 Operaciones básicas',
        items: [
          'Centraliza pedidos que llegan por WhatsApp, email o formulario web',
          'Notifica al equipo cuando entra un pedido nuevo',
          '5 flujos automatizados listos para activar (plantillas)',
          'Registro de qué pasó en los últimos 7 días'
        ]
      },
      {
        title: '🔗 Apps conectadas',
        items: [
          'Gmail, Google Sheets, Notion, Trello, Slack',
          'WhatsApp Business (envío de mensajes automatizados)',
          'Formularios web (Google Forms, Typeform)',
          '3 usuarios del equipo · Soporte por chat'
        ]
      }
    ]
  },
  {
    id: 'scale',
    name: 'ScaleIA',
=======
    desc: 'El motor básico para digitalizar tu equipo.',
    features: [
      'Conexión a 3 apps externas.',
      '1,000 ejecuciones de automatización/mes.',
      'Acceso a plantillas estándar.',
      'Soporte comunitario.',
      '1 usuario administrador.'
    ],
    highlight: false
  },
  {
    id: 'scale',
    name: 'Scale',
>>>>>>> 258c50937279f56207af23a0f2e31907426db0ba
    tag: 'Más Popular',
    price: '$299',
    period: '/ mes',
    subPrice: '',
<<<<<<< HEAD
    desc: 'Para pymes en crecimiento que quieren que cada área de la empresa funcione sola y conectada.',
    highlight: true,
    categories: [
      {
        title: '🤖 Atención con IA',
        items: [
          'Chatbot inteligente para WhatsApp entrenado con info de tu empresa',
          'Responde consultas, cotizaciones y estado de pedidos sin humano',
          'Escala al equipo solo cuando la IA no puede resolver',
          'Encuesta de satisfacción automática tras cada atención',
          'Detecta clientes insatisfechos y alerta al equipo en tiempo real'
        ]
      },
      {
        title: '💰 Cobranza inteligente',
        items: [
          'Secuencia de cobro: recordatorio 7 días antes, en la fecha y 3 días después',
          'Enlace de pago directo en el mensaje de WhatsApp',
          'Conciliación automática de pagos contra facturas',
          'Predicción de qué clientes van a pagar tarde',
          'Historial completo de cobros por cliente'
        ]
      },
      {
        title: '📣 Marketing automático',
        items: [
          'Genera y programa contenido para redes con IA',
          'Secuencias de email para nutrir leads automáticamente',
          'Flujo: lead entra → recibe info → vendedor lo llama en 2 horas',
          'Segmenta tu base de clientes y envía mensajes personalizados',
          'Mide qué canal trae más clientes que realmente compran'
        ]
      },
      {
        title: '💼 CRM & ventas',
        items: [
          'CRM automático: cada conversación de WhatsApp queda registrada',
          'Alerta si un cliente activo lleva 30 días sin comprar',
          'Propuesta comercial generada con IA en 2 minutos',
          'Flujo de aprobación de descuentos sin cadena de mensajes',
          'Dashboard de ventas actualizado en tiempo real'
        ]
      },
      {
        title: '⚙️ Operaciones',
        items: [
          'Pedido llega por cualquier canal → se procesa automáticamente',
          'Alerta de bajo inventario antes de quedarse sin stock',
          'Firma digital de contratos y documentos desde la plataforma',
          'Aprobaciones internas con trazabilidad (quién aprobó, cuándo)',
          'Módulos reutilizables que todo el equipo puede activar'
        ]
      },
      {
        title: '👥 Talento humano',
        items: [
          'Onboarding automático para empleados nuevos (documentos + accesos)',
          'Gestión de vacaciones y ausencias con notificación automática',
          'Recordatorios de renovación de contratos y vencimientos legales',
          'Encuesta de clima laboral mensual automática'
        ]
      },
      {
        title: '📊 Inteligencia de negocio',
        items: [
          'Dashboard unificado: ventas + cartera + clientes en un solo lugar',
          'Resumen ejecutivo semanal generado por IA para el gerente',
          'Alerta cuando cualquier indicador sale del rango normal',
          'Base de datos interna para guardar información de clientes y pedidos'
        ]
      },
      {
        title: '🔗 Ecosistema conectado',
        items: [
          'HubSpot, Salesforce, Stripe, Jira, Airtable +80 apps',
          'Conecta tu sistema de facturación o ERP actual',
          'Vuelve a una versión anterior si algo sale mal',
          '15 usuarios · Roles y permisos · Soporte prioritario <4h'
        ]
      }
    ]
  },
  {
    id: 'elite',
    name: 'EliteIA',
    tag: 'Plan Enterprise',
    price: '$1,499+',
    period: '/ mes',
    subPrice: '',
    desc: 'Para empresas medianas que quieren delegar toda la operación a la plataforma, con acompañamiento humano dedicado.',
    highlight: false,
    categories: [
      {
        title: '🧠 Agente IA de la empresa',
        items: [
          'Agente inteligente que conoce toda la información de la empresa',
          'Responde preguntas internas del equipo sobre procesos, clientes y datos',
          'Genera informes completos con análisis y recomendaciones automáticas',
          'Procesa documentos, contratos y facturas de proveedores automáticamente',
          'Detecta oportunidades de venta o riesgo antes de que sucedan'
        ]
      },
      {
        title: '📞 Comunicación omnicanal',
        items: [
          'WhatsApp Business API oficial con línea dedicada de la empresa',
          'Bot de voz para llamadas entrantes con IA',
          'Todos los canales (WA, email, chat web, redes) en una sola bandeja',
          'Historial completo del cliente en todos los puntos de contacto'
        ]
      },
      {
        title: '🔒 Seguridad & normativas',
        items: [
          'Un solo inicio de sesión para todo el equipo (sin contraseñas extra)',
          'Todos los datos encriptados y con respaldos automáticos diarios',
          'Registro detallado de quién hizo qué acción y cuándo',
          'Cumple con Ley 1581 de Habeas Data de Colombia'
        ]
      },
      {
        title: '🏗️ Infraestructura exclusiva',
        items: [
          'Servidor exclusivo para tu empresa (no compartido con otros)',
          'Datos almacenados en Colombia o región de tu preferencia',
          'Garantía de que el sistema no se cae cuando más lo necesitas',
          'Acceso seguro desde cualquier lugar del mundo'
        ]
      },
      {
        title: '🏭 Automatización por industria',
        items: [
          'Flujos prediseñados específicos para tu sector (retail, servicios, salud...)',
          'Integración con sistemas DIAN, RUES y entidades regulatorias colombianas',
          'Automatización de reportes para socios, junta directiva o inversionistas',
          'Procesos multi-sede o multi-empresa desde un solo panel'
        ]
      },
      {
        title: '🤝 Acompañamiento dedicado',
        items: [
          'Un experto de nuestro equipo asignado exclusivamente a tu empresa',
          'Implementación completa sin que tengas que hacer nada técnico',
          'Soporte 24/7 con respuesta garantizada en menos de 1 hora',
          'Capacitamos a todo tu equipo para sacarle el máximo provecho',
          'Revisión mensual de resultados y mejoras del sistema'
        ]
      }
    ]
  }
];

function FeatureAccordion({ title, items, highlight }: { key?: number; title: string; items: string[]; highlight: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2 border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-[0.9rem] hover:opacity-80 transition-opacity"
        style={{ color: 'var(--text)' }}
      >
        <span>{title}</span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', fontSize: '0.8em', color: 'var(--text-mid)' }}>▼</span>
      </button>
      <div
        style={{
          maxHeight: isOpen ? '500px' : '0',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <div className="px-4 pb-4">
          <ul className="flex flex-col gap-2 mt-1">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check size={16} style={{ color: highlight ? 'var(--teal)' : 'var(--blue-light)' }} className="shrink-0 mt-0.5" />
                <span className="text-[0.85rem] leading-relaxed" style={{ color: 'var(--text-mid)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

=======
    desc: 'Para empresas que escalan sus ventas B2B.',
    features: [
      'Integraciones premium (WhatsApp, ERPs).',
      'Inteligencia Artificial básica incluida.',
      '10,000 ejecuciones/mes.',
      'Soporte por email prioritario.',
      '5 usuarios administradores.'
    ],
    highlight: true
  },
  {
    id: 'elite',
    name: 'Enterprise',
    tag: 'Custom',
    price: '$1,499+',
    period: '/ mes',
    subPrice: '',
    desc: 'La solución Done-For-You.',
    features: [
      'Setup e implementación incluida.',
      'Agentes IA personalizados.',
      'Límites extendidos y personalizados.',
      'Account manager dedicado.',
      'SLA de soporte garantizado.'
    ],
    highlight: false
  }
];

>>>>>>> 258c50937279f56207af23a0f2e31907426db0ba
export default function LandingPage() {
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);
  const activeRoute = routes.find(r => r.id === activeRouteId);
  const [activeService, setActiveService] = useState(SERVICE_MODULES[0]);
  const [activeProcess, setActiveProcess] = useState(PROCESS_STEPS[0]);
  const [activeProcessDetail, setActiveProcessDetail] = useState<typeof PROCESS_STEPS[0] | null>(null);
<<<<<<< HEAD

=======

>>>>>>> 258c50937279f56207af23a0f2e31907426db0ba
  // State to toggle between V1 (Old) and V2 (New) designs for comparison
  // const [isV2, setIsV2] = useState(true); // Removed as V2 is now permanent

  useEffect(() => {
    /* ─── CSS Scroll-driven support check ─── */
    const hasSDT = CSS.supports('animation-timeline', 'scroll()');
    const sp = document.getElementById('sp');
<<<<<<< HEAD

=======

>>>>>>> 258c50937279f56207af23a0f2e31907426db0ba
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
          <li><a href="#explore">Soluciones</a></li>
          <li><a href="#services">Ecosistema</a></li>
          <li><a href="#about">Plataforma</a></li>
          <li><a href="#how">Cómo Funciona</a></li>
          <li><a href="#pricing">Precios</a></li>


          <SignedOut>
            <li>
              <SignInButton mode="modal">
                <button className="nav-cta" style={{ background: 'transparent', border: '1px solid var(--mag)', color: 'var(--text)', cursor: 'pointer' }}>
                  Iniciar Sesión
                </button>
              </SignInButton>
            </li>
            <li><a href="#cta" className="nav-cta">Comenzar Gratis</a></li>
          </SignedOut>

          <SignedIn>
            <li>
              <RouterLink to="/dashboard" className="nav-cta" style={{ background: 'transparent', border: '1px solid var(--teal)', color: 'var(--text)' }}>
                Ir al Dashboard
              </RouterLink>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
              <UserButton afterSignOutUrl="/" />
            </li>
          </SignedIn>

        </ul >
      </nav >

      {/* ════ HERO ════ */}
      < section id="hero" >
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
          {
            NETWORK_NODES.map((node, i) => (
              <div
                key={i}
                className="fchip"

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
        ))
  }
      </div >

      <div className="hero-content">
        {/* Tag removed as requested */}
        <h1 className="hero-title">
          Automatiza tus<br />procesos.<br />
          <span className="t-mag">Escala</span> sin fricción.<br />
          <span className="t-blue">Vuélvelo simple.</span>
        </h1>
        <p className="hero-sub">La plataforma integral de IA que conecta tus herramientas, califica tus leads y automatiza tus flujos de trabajo en ventas, RRHH y operaciones. Todo en un solo lugar, sin escribir una línea de código.</p>
        <div className="hero-actions">
          <a href="#cta" className="btn-mag btn-xl">Crear cuenta gratis</a>
          <a href="#explore" className="btn-outline btn-xl">Ver demostración →</a>
        </div>
        <div className="hero-stats">
          <div><div className="stat-val" data-target="70">0</div><div className="stat-lbl">% reducción tiempo<br />en tareas manuales</div></div>
          <div><div className="stat-val" data-target="45">0</div><div className="stat-lbl">% ahorro en<br />costos operativos</div></div>
          <div><div className="stat-val" data-target="30">0</div><div className="stat-lbl">+ empresas PyME<br />transformadas</div></div>
        </div>
      </div>
    </section >

      {/* ════ EXPLORE (Dynamic Boxes) ════ */ }
      < section id = "explore" className = "routes-section" >
        <div className="eyebrow sd-up">Ecosistema Modular</div>

        <h2 className="section-title sd-up" style={{marginBottom: '48px'}}>Las herramientas que necesitas<br/>para operar en piloto automático</h2>
        
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
                <div className="rc-eyebrow"><span style={{ fontSize: '1.2em' }}>↗</span> {route.eyebrow}</div>

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
      </div >
      </section >

    {/* ════ DETAIL VIEW OVERLAY ════ */ }
  {
    activeRoute && (
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

          <div style={{ marginTop: '48px' }}>

            <a href="#cta" onClick={() => setActiveRouteId(null)} className="btn-mag btn-xl">Agendar diagnóstico para {activeRoute.title}</a>
          </div>
        </div>
      </div >
    )
  }

  {/* ════ PROCESS DETAIL OVERLAY ════ */ }
  {
    activeProcessDetail && (
      <div className="detail-overlay">
        <div className="do-header">
          <div className="logo"><span className="logo-mark">L</span>Longitudinal</div>
          <button className="do-close" onClick={() => setActiveProcessDetail(null)}>✕</button>
        </div>
        <div className="do-content">
          <img src={activeProcessDetail.image} alt={activeProcessDetail.title} className="do-hero-img" referrerPolicy="no-referrer" />
          <div className="eyebrow">{activeProcessDetail.label}</div>
          <h1 className="do-title">{activeProcessDetail.title}</h1>

          <p className="do-desc" style={{ fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '2rem', color: 'var(--text-mid)' }}>{activeProcessDetail.desc}</p>

          <div className="mt-8">
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--text)' }}>Pasos para realizar este proceso:</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activeProcessDetail.steps?.map((step, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
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

            < p className="do-desc" style={{ fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '2rem', color: 'var(--text-mid)' }}>{activeProcessDetail.desc}</p>

                  <div className="mt-8">
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--text)' }}>Pasos para realizar este proceso:</h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {activeProcessDetail.steps?.map((step, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
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

                          <span style={{ fontSize: '1.1rem', color: 'var(--text-mid)' }}>{step}</span>

                        </li >
                      ))
                      }
                    </ul >
                  </div >


                  <div style={{ marginTop: '48px' }}>

                    <a href="#cta" onClick={() => setActiveProcessDetail(null)} className="btn-mag btn-xl">Agendar {activeProcessDetail.title}</a>
                  </div>
                </div>
        </div >
          )
  }

          {/* ════ SERVICES ════ */}
          <section id="services">
            <div className="services-head">
              <div>
                <div className="eyebrow sd-left">Casos de Uso</div>
                <h2 className="section-title sd-left">Un ecosistema conectado<br />para toda tu empresa</h2>
              </div>
              <div className="section-desc sd-right">Deja atrás los silos de información. Longitudinal centraliza los procesos de cada departamento para que operen como un solo motor sincronizado.</div>
            </div>



            <div className="services-split-layout sd-up">
              {/* Left Menu */}
              <div className="services-menu">
                {SERVICE_MODULES.map((module) => (
<<<<<<< HEAD
                  <button
=======
              <button
>>>>>>> 258c50937279f56207af23a0f2e31907426db0ba
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
<<<<<<< HEAD
              <img
                key={activeService.image} // Force re-render on image change for animation
                src={activeService.image}
                alt={activeService.title}
=======
              <img 
                key={activeService.image} // Force re-render on image change for animation
                src={activeService.image} 
                alt={activeService.title} 
>>>>>>> 258c50937279f56207af23a0f2e31907426db0ba
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
            </div >
          </div >
        </div >
      </section >

      {/* ════ TOOLS BAND ════ */ }
      < div className = "tools-band warm-bg" >
        <div className="tools-band-title">
          Integraciones plug & play con el software que ya utilizas.
        </div>
        <div className="tool-icon-wrapper" title="Zapier"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M4.19 19.99l.01-11.96 7.84-4.02 7.85 4.02v11.96l-7.85 4.02-7.85-4.02zm2.01-1.74l5.84 2.99 5.84-2.99v-8.48l-5.84-2.99-5.84 2.99v8.48z" /></svg></div>
        <div className="tool-icon-wrapper" title="Make"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 21.6c-5.3 0-9.6-4.3-9.6-9.6S6.7 2.4 12 2.4s9.6 4.3 9.6 9.6-4.3 9.6-9.6 9.6z" /></svg></div>
        <div className="tool-icon-wrapper" title="HubSpot"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg></div>
        <div className="tool-icon-wrapper" title="Slack"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M6 15a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2zm1-2a2 2 0 0 1 2-2 2 2 0 0 1-2-2 2 2 0 0 1-2 2v2h2zm2 1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2zm2-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2v-2z" /></svg></div>
        <div className="tool-icon-wrapper" title="Salesforce"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M16.2 10.8c-.2-1.8-1.7-3.2-3.6-3.2-.5 0-1 .1-1.4.3-.6-1.4-2-2.3-3.6-2.3-1.8 0-3.3 1.2-3.8 2.9-.2 0-.4-.1-.6-.1-2.2 0-4 1.8-4 4 0 2.2 1.8 4 4 4h13c1.7 0 3-1.3 3-3 0-1.5-1.1-2.8-2.6-3z" /></svg></div>
        <div className="tool-icon-wrapper" title="Google"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg></div>
        <div className="tool-icon-wrapper" title="Notion"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M4.5 4.5v15h15v-15h-15zm3 3h2.5l3.5 6.5 3.5-6.5h2.5v9h-2v-6l-4 7-4-7v6h-2v-9z" /></svg></div>
        <div className="tool-icon-wrapper" title="Airtable"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M12 2L2 7l10 5 10-5-10-5zm0 11l-10 5 10 5 10-5-10-5z" /></svg></div>
      </div >
      <div className="motion-row" id="row2" data-speed="0.19" style={{ marginTop: '30px' }}>
        <div className="tool-icon-wrapper" title="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg></div>
        <div className="tool-icon-wrapper" title="Microsoft"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" /></svg></div>
        <div className="tool-icon-wrapper" title="OpenAI"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M22.28 9.28a6.38 6.38 0 0 0-.23-3.6 6.38 6.38 0 0 0-3.37-3.37 6.38 6.38 0 0 0-3.6-.23 6.38 6.38 0 0 0-3.37 1.83 6.38 6.38 0 0 0-1.83 3.37 6.38 6.38 0 0 0 .23 3.6 6.38 6.38 0 0 0 3.37 3.37 6.38 6.38 0 0 0 3.6.23 6.38 6.38 0 0 0 3.37-1.83 6.38 6.38 0 0 0 1.83-3.37zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" /></svg></div>
        <div className="tool-icon-wrapper" title="Pipedrive"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg></div>
        <div className="tool-icon-wrapper" title="ActiveCampaign"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V8h2v4zm2 4h-1v-2h1v2zm0-4h-1V8h1v4z" /></svg></div>
        <div className="tool-icon-wrapper" title="Monday"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M4 4h16v16H4V4zm2 2v12h3V8l3 3 3-3v10h3V6H6z" /></svg></div>
        <div className="tool-icon-wrapper" title="GitHub"><svg viewBox="0 0 24 24" fill="currentColor" className="brand-icon"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 .1.8 1.8 2.8 1.3.5 0 .7.2.9.3-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" /></svg></div>
      </div>
    </>
=======
        
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
>>>>>>> 258c50937279f56207af23a0f2e31907426db0ba
      </div >

      {/* ════ ABOUT (Mega Card) ════ */ }
      < section id = "about" >
        <div className="mega-card sd-up">
          <div className="mc-grid">
            <div className="mc-content">
              <h2>
                El motor operativo<br />
                <span className="t-gray">de las empresas ágiles</span>
              </h2>
              <p className="mc-desc">
                Infraestructura tecnológica de grado Enterprise, empaquetada en una plataforma diseñada para equipos que necesitan velocidad.
              </p>
              <a href="#how" className="btn-lime">Cómo funciona</a>

              <div className="mc-features">
                <div className="mc-feat-item"><span className="mc-feat-icon">⚡</span> Despliegue en 1 clic</div>
                <div className="mc-feat-item"><span className="mc-feat-icon">🏗️</span> API First y Webhooks</div>
                <div className="mc-feat-item"><span className="mc-feat-icon">📚</span> Plantillas pre-construidas</div>
                <div className="mc-feat-item"><span className="mc-feat-icon">🚀</span> Escalabilidad en la nube</div>
                <div className="mc-feat-item"><span className="mc-feat-icon">✅</span> Seguridad y Encriptación</div>
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
      </section >

      {/* ════ PROCESS (dark) ════ */ }
      < section id = "how" >
        <div className="eyebrow on-dark sd-up">En marcha en minutos</div>
        <h2 className="section-title on-dark sd-up">En marcha en minutos, no en meses.</h2>
        <p className="section-desc on-dark sd-up">Configura tu motor de automatización en 4 pasos sencillos.</p>

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
              </div >
            </div >
          </div >
        </div >
      </section >

      {/* ════ BENEFITS (dark) ════ */ }
      < section id = "benefits" >
        <div className="benefits-head">
          <div>
            <div className="eyebrow on-dark sd-left">Resultados</div>
            <h2 className="section-title on-dark sd-left">El impacto directo de<br />nuestro software</h2>
          </div>
          <div className="section-desc on-dark sd-right">Métricas reales de equipos que operan sobre Longitudinal.</div>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="bc-icon-wrap"><Clock size={32} strokeWidth={1.5} /></div>
            <div className="bc-val"><CountUp end={70} prefix="-" suffix="%" /></div>
            <div className="bc-title">Tiempo en tareas manuales</div>
            <div className="bc-desc">Nuestro algoritmo de enrutamiento ahorra 2 horas diarias por colaborador.</div>
          </div>
          <div className="benefit-card">
            <div className="bc-icon-wrap"><DollarSign size={32} strokeWidth={1.5} /></div>
            <div className="bc-val"><CountUp end={45} prefix="-" suffix="%" /></div>
            <div className="bc-title">Reducción de costos operativos</div>
            <div className="bc-desc">Menos errores, menos reprocesos. La eficiencia se traduce en margen.</div>
          </div>
          <div className="benefit-card">
            <div className="bc-icon-wrap"><BarChart size={32} strokeWidth={1.5} /></div>
            <div className="bc-val"><CountUp end={60} prefix="+" suffix="%" /></div>
            <div className="bc-title">Capacidad de procesamiento</div>
            <div className="bc-desc">Escala tus operaciones sin necesidad de aumentar la plantilla.</div>
          </div>
          <div className="benefit-card">
            <div className="bc-icon-wrap"><CheckCircle size={32} strokeWidth={1.5} /></div>
            <div className="bc-val"><CountUp end={85} prefix="+" suffix="%" /></div>
            <div className="bc-title">Precisión en datos</div>
            <div className="bc-desc">Dashboards en tiempo real con 0% de errores de transcripción.</div>
          </div>
          <div className="benefit-card">
            <div className="bc-icon-wrap"><Calendar size={32} strokeWidth={1.5} /></div>
            <div className="bc-val"><CountUp end={15} suffix=" min" /></div>
            <div className="bc-title">Tiempo de configuración</div>
            <div className="bc-desc">Conecta tus apps y lanza tu primera automatización en minutos.</div>
          </div>
          <div className="benefit-card">
            <div className="bc-icon-wrap"><Smile size={32} strokeWidth={1.5} /></div>
            <div className="bc-val"><CountUp end={40} prefix="+" suffix="%" /></div>
            <div className="bc-title">Satisfacción del equipo</div>
            <div className="bc-desc">Elimina el trabajo robótico y libera a tu equipo para tareas creativas.</div>
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
          </div >
        </div >
      </section >

      {/* ════ TESTIMONIALS ════ */ }
      < section id = "testimonials" >
        <div className="eyebrow sd-up">Casos Reales</div>
        <h2 className="section-title sd-up">Lo que dicen las empresas<br />que usan Longitudinal</h2>
        <div className="testi-grid">
          <div className="testi-card"><div className="tc-stars"><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span></div><span className="tc-quote">"</span><p className="tc-text">Implementar Longitudinal fue tan fácil como abrir una cuenta. El módulo de ventas califica nuestros leads automáticamente. Duplicamos productividad sin contratar a nadie más.</p><div className="tc-author"><div className="tc-av av1">ML</div><div><div className="tc-name">María López</div><div className="tc-co">Gerente Comercial · Servicios · Bogotá</div></div></div></div>
          <div className="testi-card"><div className="tc-stars"><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span></div><span className="tc-quote">"</span><p className="tc-text">Con Ops Sync, nuestras órdenes de compra se procesan solas. Lo que antes requería 4 personas, ahora es automático. El ROI fue evidente desde el primer mes de suscripción.</p><div className="tc-author"><div className="tc-av av2">CR</div><div><div className="tc-name">Carlos Restrepo</div><div className="tc-co">Director de Operaciones · Industrial · Medellín</div></div></div></div>
          <div className="testi-card"><div className="tc-stars"><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span><span className="tc-star">★</span></div><span className="tc-quote">"</span><p className="tc-text">La plataforma centralizó todo nuestro caos operativo. Briefs, aprobaciones y entregas fluyen sin correos perdidos. Es el sistema operativo que nuestra agencia necesitaba.</p><div className="tc-author"><div className="tc-av av3">AG</div><div><div className="tc-name">Andrea Gómez</div><div className="tc-co">Fundadora · Agencia Digital · Cali</div></div></div></div>
        </div>
      </section >

      {/* ════ PRICING ════ */ }
      < section id = "pricing" className = "pricing-section" >
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

              <div className="pc-features-accordions" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
                {plan.categories?.map((cat, i) => (
                  <FeatureAccordion
                    key={i}
                    title={cat.title}
                    items={cat.items}
                    highlight={plan.highlight || false}
                  />
                ))}
              </div>
              <a href="#cta" className={`btn-pricing ${plan.highlight ? 'btn-lime' : 'btn-outline'}`}>
                Comenzar ahora
              </a>
            </div >
          ))
  }
        </div >
      </section >

      {/* ════ CTA ════ */ }
      < section id = "cta" >
        <div className="cta-geo"></div>
        <div className="cta-orb"></div>
        <div className="cta-tag">¿Listo para transformar tu empresa?</div>
        <h2 className="cta-title sd-scale">Agenda tu diagnóstico<br /><span className="t-mag">gratuito</span> hoy mismo</h2>
        <p className="cta-desc sd-up">Una sesión de 90 minutos donde analizamos tus procesos actuales, identificamos las oportunidades de mayor impacto y definimos un plan de acción concreto — sin compromiso.</p>
        <div className="cta-actions sd-up">
          <a href="https://calendly.com" target="_blank" className="btn-mag btn-xl">📅 Reservar sesión gratuita</a>
          <a href="https://wa.me/573188713986" target="_blank" className="btn-outline btn-xl">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style={{ marginRight: '8px' }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
  WhatsApp
          </a >
        </div >
    <div className="trust-row sd-up">
      <div className="tr-item"><span className="chk">✓</span> Sin costo ni compromiso</div>
      <div className="tr-item"><span className="chk">✓</span> Respuesta en menos de 24h</div>
      <div className="tr-item"><span className="chk">✓</span> Diagnóstico personalizado</div>
      <div className="tr-item"><span className="chk">✓</span> Cualquier área de tu empresa</div>
      <div className="tr-item"><span className="chk">✓</span> Especialistas en PyMEs Colombia</div>
    </div>
      </section >

      {/* ════ FAQ ════ */ }
      < section id = "faq" className = "faq-section" >
        <div className="faq-grid">
          <div className="faq-head">
            <h2>Preguntas frecuentes.</h2>
            <p className="faq-desc">Todo lo que necesitas saber sobre Longitudinal antes de empezar.</p>
            <a href="#cta" className="btn-dark">Centro de Ayuda</a>
          </div>
          <div className="faq-list">
            {[
              { q: "¿Necesito saber programar?", a: "Absolutamente no. Longitudinal es una plataforma intuitiva. Si sabes arrastrar y soltar cajas, sabes usar nuestro software." },
              { q: "¿Tienen prueba gratuita?", a: "Sí, ofrecemos 14 días gratis en nuestros planes Starter y Scale para que pruebes el valor del sistema antes de pagar." },
              { q: "¿Qué pasa si necesito una automatización muy compleja?", a: "Nuestro plan Enterprise incluye soporte de ingeniería. Nosotros construimos los flujos complejos por ti directamente en tu cuenta." },
              { q: "¿Mis datos están seguros?", a: "Cumplimos con estándares internacionales de seguridad en la nube. Tus datos están encriptados y nunca entrenamos modelos públicos con la información de tu empresa." },
              { q: "¿Puedo cancelar en cualquier momento?", a: "Sí, no hay contratos forzosos en los planes Starter y Scale. Puedes cancelar tu suscripción mensual cuando quieras." },
              { q: "¿Se integra con mi software actual?", a: "Longitudinal se conecta nativamente con más de 5,000 aplicaciones incluyendo HubSpot, Salesforce, Google Workspace, Microsoft 365 y muchas más." }
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
      </section >

      {/* ════ FOOTER ════ */ }
      < footer >
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
            <p className="fd">La plataforma de automatización integral para empresas que quieren escalar. Conecta tus herramientas, automatiza flujos y crece sin fricción.</p>
            <div className="social-row">
              <a href="#" className="soc">in</a>
              <a href="#" className="soc">𝕏</a>
              <a href="#" className="soc">📧</a>
              <a href="#" className="soc">💬</a>
            </div>
          </div>
          <div className="fc"><h4>Módulos</h4><ul><li><a href="#explore">Sales Auto-Pilot</a></li><li><a href="#explore">AI Agents</a></li><li><a href="#explore">Growth</a></li><li><a href="#explore">Ops Sync</a></li></ul></div>
          <div className="fc"><h4>Plataforma</h4><ul><li><a href="#how">Cómo Funciona</a></li><li><a href="#services">Casos de Uso</a></li><li><a href="#pricing">Precios</a></li><li><a href="#testimonials">Clientes</a></li><li><a href="#cta">Empezar</a></li></ul></div>
          <div className="fc"><h4>Contacto</h4><ul><li><a href="#">📍 Colombia</a></li><li><a href="#">📞 +57 318 871 3986</a></li><li><a href="#">📧 hola@longitudinal.co</a></li><li><a href="#">🕐 Soporte 24/7</a></li></ul></div>
        </div>
        <div className="footer-bot">
          <span>© 2025 Longitudinal · Todos los derechos reservados</span>
          <span>Infraestructura Enterprise</span>
        </div>
      </footer >

      <a href="https://wa.me/573188713986" target="_blank" className="fab">
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </a >
    </>
  );
  }
