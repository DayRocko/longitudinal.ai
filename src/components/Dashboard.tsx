<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Longitudinal | Business OS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        dark: {
                            900: '#050505',
                            800: '#09090B',
                            700: '#111113',
                            600: '#1F1F22',
                        },
                        brand: {
                            primary: '#8B5CF6',   // Ventas (Púrpura)
                            secondary: '#06B6D4', // Genérico/Scale
                            pink: '#EC4899',      // Marketing
                            rose: '#F43F5E',      // Customer Success
                            emerald: '#10B981',   // Data
                            amber: '#F59E0B',     // Finanzas
                            slate: '#94A3B8',     // Operaciones
                            indigo: '#6366F1'     // RRHH
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #050505; color: #F8FAFC; }
        
        /* Glassmorphism base & Antigravity Effects */
        .glass-card {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.04);
            /* Simulación de luz en los bordes para mayor volumen */
            border-top: 1px solid rgba(255, 255, 255, 0.08); 
            border-left: 1px solid rgba(255, 255, 255, 0.06);
            /* Sombra profunda para efecto de levitación inicial */
            box-shadow: 0 15px 35px -10px rgba(0,0,0,0.6); 
            /* Transición ultra suave tipo 'resorte' */
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        /* Efecto de elevación Antigravedad al hacer hover */
        .feature-card:not([data-locked="true"]):hover {
            transform: translateY(-8px) scale(1.01);
            background: rgba(255, 255, 255, 0.035);
            z-index: 10;
        }
        
        /* Grid Background Pattern */
        .bg-grid {
            background-size: 40px 40px;
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
        }

        /* Ocultar Scrollbar elegantemente */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

        /* =========================================
           SISTEMA DE ESTADOS DINÁMICOS POR PLAN
           ========================================= */

        /* 1. Estado por defecto (Desbloqueado) */
        .lock-overlay { display: none; }
        .status-badge.locked-badge { display: none; }
        .status-badge.normal-badge { display: flex; }
        .locked-icon { display: none; }
        .unlocked-toggle { display: inline-block; }

        /* 2. Lógica de Bloqueo según el Plan Seleccionado */
        body[data-plan="starter"] [data-tier="scale"] .lock-overlay,
        body[data-plan="starter"] [data-tier="elite"] .lock-overlay,
        body[data-plan="scale"] [data-tier="elite"] .lock-overlay {
            display: flex; /* Muestra el velo de bloqueo */
        }

        body[data-plan="starter"] [data-tier="scale"] .content-wrapper,
        body[data-plan="starter"] [data-tier="elite"] .content-wrapper,
        body[data-plan="scale"] [data-tier="elite"] .content-wrapper {
            opacity: 0.3;
            pointer-events: none;
            filter: grayscale(80%) blur(1px);
        }

        body[data-plan="starter"] [data-tier="scale"] .locked-icon,
        body[data-plan="starter"] [data-tier="elite"] .locked-icon,
        body[data-plan="scale"] [data-tier="elite"] .locked-icon { display: block; }
        
        body[data-plan="starter"] [data-tier="scale"] .unlocked-toggle,
        body[data-plan="starter"] [data-tier="elite"] .unlocked-toggle,
        body[data-plan="scale"] [data-tier="elite"] .unlocked-toggle { display: none; }

        /* 3. Estilos de los Toggles (Interruptores) y Glows específicos por color */
        .toggle-checkbox { right: 24px; border-color: #334155; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .toggle-label { background-color: #334155; transition: all 0.3s ease; }
        .toggle-checkbox:checked { right: 0; }
        .toggle-checkbox:checked + .toggle-label:after { transform: translateX(100%); border-color: white; }

        /* Sombras de Antigravedad Específicas por Departamento */
        .color-pink .toggle-checkbox:checked { border-color: #EC4899; }
        .color-pink .toggle-checkbox:checked + .toggle-label { background-color: #EC4899; }
        .color-pink.feature-card:not([data-locked="true"]):hover { border-color: rgba(236,72,153,0.3); box-shadow: 0 20px 40px -10px rgba(236,72,153,0.15), 0 0 25px rgba(236,72,153,0.05); }

        .color-purple .toggle-checkbox:checked { border-color: #8B5CF6; }
        .color-purple .toggle-checkbox:checked + .toggle-label { background-color: #8B5CF6; }
        .color-purple.feature-card:not([data-locked="true"]):hover { border-color: rgba(139,92,246,0.3); box-shadow: 0 20px 40px -10px rgba(139,92,246,0.15), 0 0 25px rgba(139,92,246,0.05); }

        .color-rose .toggle-checkbox:checked { border-color: #F43F5E; }
        .color-rose .toggle-checkbox:checked + .toggle-label { background-color: #F43F5E; }
        .color-rose.feature-card:not([data-locked="true"]):hover { border-color: rgba(244,63,94,0.3); box-shadow: 0 20px 40px -10px rgba(244,63,94,0.15), 0 0 25px rgba(244,63,94,0.05); }

        .color-slate .toggle-checkbox:checked { border-color: #94A3B8; }
        .color-slate .toggle-checkbox:checked + .toggle-label { background-color: #94A3B8; }
        .color-slate.feature-card:not([data-locked="true"]):hover { border-color: rgba(148,163,184,0.3); box-shadow: 0 20px 40px -10px rgba(148,163,184,0.15), 0 0 25px rgba(148,163,184,0.05); }

        .color-emerald .toggle-checkbox:checked { border-color: #10B981; }
        .color-emerald .toggle-checkbox:checked + .toggle-label { background-color: #10B981; }
        .color-emerald.feature-card:not([data-locked="true"]):hover { border-color: rgba(16,185,129,0.3); box-shadow: 0 20px 40px -10px rgba(16,185,129,0.15), 0 0 25px rgba(16,185,129,0.05); }

        .color-amber .toggle-checkbox:checked { border-color: #F59E0B; }
        .color-amber .toggle-checkbox:checked + .toggle-label { background-color: #F59E0B; }
        .color-amber.feature-card:not([data-locked="true"]):hover { border-color: rgba(245,158,11,0.3); box-shadow: 0 20px 40px -10px rgba(245,158,11,0.15), 0 0 25px rgba(245,158,11,0.05); }

        .color-indigo .toggle-checkbox:checked { border-color: #6366F1; }
        .color-indigo .toggle-checkbox:checked + .toggle-label { background-color: #6366F1; }
        .color-indigo.feature-card:not([data-locked="true"]):hover { border-color: rgba(99,102,241,0.3); box-shadow: 0 20px 40px -10px rgba(99,102,241,0.15), 0 0 25px rgba(99,102,241,0.05); }

        /* 4. Estilos de Selección en el Sidebar */
        .plan-active-indicator { display: none; }
        .plan-inactive-indicator { display: flex; }
        body[data-plan="starter"] .sidebar-starter .plan-active-indicator,
        body[data-plan="scale"] .sidebar-scale .plan-active-indicator,
        body[data-plan="elite"] .sidebar-elite .plan-active-indicator { display: flex; }
        body[data-plan="starter"] .sidebar-starter .plan-inactive-indicator,
        body[data-plan="scale"] .sidebar-scale .plan-inactive-indicator,
        body[data-plan="elite"] .sidebar-elite .plan-inactive-indicator { display: none; }
        
        body[data-plan="starter"] .sidebar-starter { border-color: rgba(139, 92, 246, 0.5); background: rgba(139, 92, 246, 0.08); box-shadow: inset 0 0 20px rgba(139,92,246,0.05); }
        body[data-plan="scale"] .sidebar-scale { border-color: rgba(6, 182, 212, 0.5); background: rgba(6, 182, 212, 0.08); box-shadow: inset 0 0 20px rgba(6,182,212,0.05); }
        body[data-plan="elite"] .sidebar-elite { border-color: rgba(245, 158, 11, 0.5); background: rgba(245, 158, 11, 0.08); box-shadow: inset 0 0 20px rgba(245,158,11,0.05); }

        body[data-plan="starter"] .sidebar-starter .active-bar,
        body[data-plan="scale"] .sidebar-scale .active-bar,
        body[data-plan="elite"] .sidebar-elite .active-bar { opacity: 1; }
    </style>
</head>
<body class="h-screen overflow-hidden flex bg-dark-900 relative" data-plan="starter">

    <!-- Efectos de Luz de Fondo (Glows - Más difuminados y amplios) -->
    <div class="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-brand-primary opacity-15 rounded-full blur-[150px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] bg-brand-secondary opacity-10 rounded-full blur-[180px] pointer-events-none"></div>
    <div class="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-brand-pink opacity-[0.03] rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute inset-0 bg-grid pointer-events-none z-0"></div>

    <!-- SIDEBAR -->
    <aside class="w-72 bg-dark-800/60 backdrop-blur-2xl border-r border-white/5 flex flex-col h-full flex-shrink-0 z-20 shadow-[10px_0_30px_rgba(0,0,0,0.3)]">
        <!-- Logo -->
        <div class="p-8 flex items-center gap-4 border-b border-white/5">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold text-2xl shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                L
            </div>
            <span class="text-white font-semibold text-2xl tracking-tight">Longitudinal</span>
        </div>

        <div class="flex-1 overflow-y-auto py-8 px-5 flex flex-col gap-10">
            <!-- Selector de Planes -->
            <div class="space-y-4">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Vista de Planes</h3>
                
                <!-- Plan StarterAI -->
                <button class="sidebar-starter w-full glass-card rounded-2xl p-4 text-left relative overflow-hidden group transition-all" onclick="setPlan('starter')">
                    <div class="active-bar absolute top-0 left-0 w-1.5 h-full bg-brand-primary shadow-[0_0_15px_#8B5CF6] opacity-0 transition-opacity"></div>
                    <div class="flex items-center justify-between mb-1.5 ml-2">
                        <div class="flex items-center gap-2.5">
                            <i data-lucide="box" class="w-4 h-4 text-slate-400 group-hover:text-white transition-colors plan-inactive-indicator"></i>
                            <span class="text-white font-semibold text-sm">StarterAI</span>
                        </div>
                        <span class="plan-active-indicator text-[10px] bg-brand-primary/20 text-brand-primary px-2.5 py-1 rounded-full border border-brand-primary/30 font-medium">Activo</span>
                    </div>
                    <p class="text-[12px] text-slate-400 ml-2">Automatiza tareas básicas</p>
                </button>

                <!-- Plan ScaleAI -->
                <button class="sidebar-scale w-full glass-card rounded-2xl p-4 text-left relative overflow-hidden group transition-all" onclick="setPlan('scale')">
                    <div class="active-bar absolute top-0 left-0 w-1.5 h-full bg-brand-secondary shadow-[0_0_15px_#06B6D4] opacity-0 transition-opacity"></div>
                    <div class="flex items-center justify-between mb-1.5 ml-2">
                        <div class="flex items-center gap-2.5">
                            <i data-lucide="rocket" class="w-4 h-4 text-slate-400 group-hover:text-brand-secondary transition-colors plan-inactive-indicator"></i>
                            <span class="text-white font-semibold text-sm">ScaleAI</span>
                        </div>
                        <span class="plan-active-indicator text-[10px] bg-brand-secondary/20 text-brand-secondary px-2.5 py-1 rounded-full border border-brand-secondary/30 font-medium">Activo</span>
                    </div>
                    <p class="text-[12px] text-slate-400 ml-2">Automatiza departamentos</p>
                </button>

                <!-- Plan EliteAI -->
                <button class="sidebar-elite w-full glass-card rounded-2xl p-4 text-left relative overflow-hidden group transition-all" onclick="setPlan('elite')">
                    <div class="active-bar absolute top-0 left-0 w-1.5 h-full bg-amber-500 shadow-[0_0_15px_#F59E0B] opacity-0 transition-opacity"></div>
                    <div class="flex items-center justify-between mb-1.5 ml-2">
                        <div class="flex items-center gap-2.5">
                            <i data-lucide="cpu" class="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors plan-inactive-indicator"></i>
                            <span class="text-white font-semibold text-sm">EliteAI</span>
                        </div>
                        <span class="plan-active-indicator text-[10px] bg-amber-500/20 text-amber-500 px-2.5 py-1 rounded-full border border-amber-500/30 font-medium">Activo</span>
                    </div>
                    <p class="text-[12px] text-slate-400 ml-2">Automatiza decisiones (IA)</p>
                </button>
            </div>

            <!-- Navegación por Departamentos -->
            <div class="space-y-1">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Departamentos</h3>
                <a href="#marketing" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group">
                    <i data-lucide="megaphone" class="w-4 h-4 group-hover:text-brand-pink transition-colors"></i> <span class="text-sm font-medium">Marketing</span>
                </a>
                <a href="#ventas" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group">
                    <i data-lucide="briefcase" class="w-4 h-4 group-hover:text-brand-primary transition-colors"></i> <span class="text-sm font-medium">Ventas (Sales)</span>
                </a>
                <a href="#cs" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group">
                    <i data-lucide="heart-handshake" class="w-4 h-4 group-hover:text-brand-rose transition-colors"></i> <span class="text-sm font-medium">Customer Success</span>
                </a>
                <a href="#operaciones" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group">
                    <i data-lucide="settings" class="w-4 h-4 group-hover:text-brand-slate transition-colors"></i> <span class="text-sm font-medium">Operaciones</span>
                </a>
                <a href="#data" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group">
                    <i data-lucide="bar-chart-2" class="w-4 h-4 group-hover:text-brand-emerald transition-colors"></i> <span class="text-sm font-medium">Data & Insights</span>
                </a>
                <a href="#finanzas" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group">
                    <i data-lucide="wallet" class="w-4 h-4 group-hover:text-brand-amber transition-colors"></i> <span class="text-sm font-medium">Finanzas</span>
                </a>
                <a href="#rrhh" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group">
                    <i data-lucide="users" class="w-4 h-4 group-hover:text-brand-indigo transition-colors"></i> <span class="text-sm font-medium">Recursos Humanos</span>
                </a>
            </div>
        </div>
        
        <!-- User Profile -->
        <div class="p-5 border-t border-white/5 flex items-center gap-4 bg-dark-900/30 backdrop-blur-md">
            <div class="w-10 h-10 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center text-sm font-bold text-white shadow-inner border border-white/10">JD</div>
            <div class="flex-1 overflow-hidden">
                <p class="text-sm text-white truncate font-medium">Juan Director</p>
                <p class="text-xs text-slate-400 truncate mt-0.5">TechCorp S.A.S</p>
            </div>
            <button class="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <i data-lucide="settings-2" class="w-4 h-4 text-slate-400 hover:text-white transition-colors"></i>
            </button>
        </div>
    </aside>

    <!-- MAIN WORKSPACE -->
    <main class="flex-1 overflow-y-auto scroll-smooth relative z-10">
        <!-- Header -->
        <header class="sticky top-0 bg-dark-900/70 backdrop-blur-2xl border-b border-white/5 px-10 py-8 z-30 flex justify-between items-center shadow-sm">
            <div>
                <h1 class="text-3xl font-semibold text-white tracking-tight">Base de Operaciones</h1>
                <p class="text-base text-slate-400 mt-2 font-light">Activa las automatizaciones según el plan para escalar sin complejidad.</p>
            </div>
            <div class="flex gap-4">
                <button class="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all flex items-center gap-3 hover:shadow-[0_5px_15px_rgba(255,255,255,0.05)]">
                    <i data-lucide="database" class="w-4 h-4 text-brand-secondary"></i>
                    <span>Base Central (Conectada)</span>
                </button>
            </div>
        </header>

        <!-- Contenedor General ampliado para acomodar los nuevos gaps -->
        <div class="px-10 py-12 max-w-[1400px] mx-auto space-y-28 pb-32">

            <!-- ============================================== -->
            <!-- 1. DEPARTAMENTO: MARKETING (Pink) -->
            <!-- ============================================== -->
            <section id="marketing" class="scroll-mt-32">
                <div class="flex items-center gap-4 mb-8 pl-2">
                    <div class="p-2.5 bg-pink-500/10 border border-pink-500/20 text-brand-pink rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                        <i data-lucide="megaphone" class="w-6 h-6"></i>
                    </div>
                    <h2 class="text-2xl font-semibold text-white tracking-tight">Marketing</h2>
                </div>
                <!-- GRID CON MAYOR GAP (gap-8 o gap-10) PARA EFECTO FLOTANTE -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                    
                    <!-- Starter Cards -->
                    <!-- MAYOR PADDING INTERNO (p-8) PARA RESPIRACIÓN -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-pink" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all duration-500">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="mail" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Email Mkt Automatizado</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Envío de correos automáticos basados en triggers simples y listas de suscripción.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-pink" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all duration-500">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="share-2" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Publicación Redes</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Programación y publicación autónoma cruzada en canales corporativos.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-pink" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all duration-500">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="users" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Captura de Leads Auto</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Formularios web sincronizados directamente con la base de datos central sin carga manual.</p>
                        </div>
                    </div>

                    <!-- Scale Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-pink" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Marketing', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="filter" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Segmentación de Clientes</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Agrupación dinámica de audiencias según comportamiento e intenciones de compra.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-pink" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Marketing', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="trending-up" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Funnels de Conversión</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Flujos automatizados de nutrición y drip marketing para mover leads por el embudo.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-pink" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Marketing', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="pen-tool" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Contenido con IA</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Redacción automatizada de copys base para anuncios y comunicaciones.</p>
                        </div>
                    </div>

                    <!-- Elite Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-pink" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Marketing', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="target" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Optimización con IA</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Ajuste de presupuestos y audiencias en tiempo real mediante algoritmos de Machine Learning.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-pink" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Marketing', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="bar-chart" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Predicción Conversiones</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Anticipación del CTR y ventas basándose en historial de datos y tendencias del mercado.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-pink" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Marketing', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="globe" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Campañas Omnicanal Auto</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Orquestación autónoma de impactos publicitarios en todas las plataformas simultáneamente.</p>
                        </div>
                    </div>
                </div>
            </section>


            <!-- ============================================== -->
            <!-- 2. DEPARTAMENTO: VENTAS (Purple) -->
            <!-- ============================================== -->
            <section id="ventas" class="scroll-mt-32">
                <div class="flex items-center gap-4 mb-8 pl-2">
                    <div class="p-2.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                        <i data-lucide="briefcase" class="w-6 h-6"></i>
                    </div>
                    <h2 class="text-2xl font-semibold text-white tracking-tight">Ventas (Sales)</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                    <!-- Starter Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-purple" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="user" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Captura Leads (Ventas)</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Sincronización de nuevos prospectos directamente en el pipeline inicial de ventas.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-purple" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="message-circle" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Seguimiento Prospectos</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Correos y mensajes iniciales enviados de manera autónoma al asignarse el lead.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-purple" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="bell" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Recordatorios Auto</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Alertas oportunas al equipo comercial para no dejar enfriar oportunidades.</p>
                        </div>
                    </div>

                    <!-- Scale Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-purple" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Ventas', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="layers" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Pipeline Automatizado</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Avance automático de las etapas de venta en el CRM según interacciones detectadas.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-purple" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Ventas', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="calendar" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Agendamiento Reuniones</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Sincronización autónoma de calendarios con el cliente sin emails de ida y vuelta.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-purple" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Ventas', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="check-circle" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Calificación Auto Leads</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Asignación de puntuación (Lead Scoring) en base a perfiles y respuestas iniciales.</p>
                        </div>
                    </div>

                    <!-- Elite Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-purple" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Ventas', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="trending-up" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Forecast de Ventas (IA)</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Proyección algorítmica y precisa de ingresos futuros basados en históricos comerciales.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-purple" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Ventas', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="brain" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Recomendaciones Cierre</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Sugerencia predictiva de la "próxima mejor acción" (Next-Best-Action) para cada cliente.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-purple" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Ventas', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="percent" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Probabilidad de Cierre</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Asignación de probabilidad (1-100%) dinámica mediante procesamiento de señales de intención.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ============================================== -->
            <!-- 3. DEPARTAMENTO: CUSTOMER SUCCESS (Rose) -->
            <!-- ============================================== -->
            <section id="cs" class="scroll-mt-32">
                <div class="flex items-center gap-4 mb-8 pl-2">
                    <div class="p-2.5 bg-rose-500/10 border border-rose-500/20 text-brand-rose rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.2)]">
                        <i data-lucide="heart-handshake" class="w-6 h-6"></i>
                    </div>
                    <h2 class="text-2xl font-semibold text-white tracking-tight">Customer Success</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                    <!-- Starter Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-rose" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="message-square" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Chatbot Básico</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Atención 24/7 web para resolver preguntas frecuentes de manera instantánea.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-rose" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="smartphone" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Respuestas WhatsApp</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Saludos y derivación automática en el canal favorito de los clientes en la región.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-rose" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="clipboard-check" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Encuestas Satisfacción</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Envío y recolección automática de NPS para medir la salud general de la cartera.</p>
                        </div>
                    </div>

                    <!-- Scale Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-rose" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Customer Success', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="repeat" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Seguimiento Post-Venta</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Flujos de comunicación constantes (Onboarding drips) tras la compra para retención.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-rose" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Customer Success', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="list" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Clasificación Tickets</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Enrutamiento inteligente de quejas según palabras clave y criticidad detectada.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-rose" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Customer Success', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="book" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Base de Conocimiento</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Autogeneración de artículos de ayuda basados en las preguntas repetitivas de clientes.</p>
                        </div>
                    </div>

                    <!-- Elite Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-rose" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Customer Success', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="brain" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Resolución IA (Tickets)</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Soporte autónomo completo (Nivel 1 y 2) que resuelve quejas complejas conversando.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-rose" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Customer Success', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="alert-triangle" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Predicción de Churn</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Algoritmos que analizan reducción de uso para alertar riesgo de fuga de clientes clave.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-rose" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Customer Success', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="shield" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Automatización Retención</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Ejecución de ofertas personalizadas y campañas de rescate generadas sin humanos.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ============================================== -->
            <!-- 4. DEPARTAMENTO: OPERACIONES (Slate) -->
            <!-- ============================================== -->
            <section id="operaciones" class="scroll-mt-32">
                <div class="flex items-center gap-4 mb-8 pl-2">
                    <div class="p-2.5 bg-slate-400/10 border border-slate-400/20 text-slate-300 rounded-xl shadow-[0_0_20px_rgba(148,163,184,0.1)]">
                        <i data-lucide="settings" class="w-6 h-6"></i>
                    </div>
                    <h2 class="text-2xl font-semibold text-white tracking-tight">Operaciones</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                    <!-- Starter Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-slate" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="check-square" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Gestión Tareas Internas</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Creación centralizada y automática de tareas de ejecución diaria.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-slate" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="file-check" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Aprobación Procesos</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Manejo digital de firmas y validaciones necesarias entre áreas rápidamente.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-slate" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="activity" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Seguimiento Proyectos</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Alertas e indicadores de estado automatizados para asegurar el delivery a tiempo.</p>
                        </div>
                    </div>

                    <!-- Scale Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-slate" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Operaciones', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="git-branch" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Workflows Complejos</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Orquestación entre múltiples departamentos evitando cuellos de botella manuales.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-slate" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Operaciones', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="box" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Gestión Inventarios</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Actualización y alertas de stock integradas automáticamente a ventas.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-slate" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Operaciones', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="shopping-cart" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Gestión de Pedidos</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Sincronización instantánea de órdenes a procesos de despacho o servicios.</p>
                        </div>
                    </div>

                    <!-- Elite Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-slate" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Operaciones', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="cpu" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Optimización con IA</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Detección predictiva de cuellos de botella en la operación con aprendizaje automático.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-slate" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Operaciones', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="trending-up" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Predicción de Demanda</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Modelos que anticipan volumen operativo basándose en el comportamiento e histórico.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ============================================== -->
            <!-- 5. DEPARTAMENTO: DATA E INSIGHTS (Emerald) -->
            <!-- ============================================== -->
            <section id="data" class="scroll-mt-32">
                <div class="flex items-center gap-4 mb-8 pl-2">
                    <div class="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-brand-emerald rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <i data-lucide="bar-chart-2" class="w-6 h-6"></i>
                    </div>
                    <h2 class="text-2xl font-semibold text-white tracking-tight">Data & Insights</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                    <!-- Starter Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-emerald" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="layout-dashboard" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Dashboards Auto</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Métricas core (KPIs) de los departamentos sincronizadas en tiempo real.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-emerald" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="file-spreadsheet" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Reportes Automáticos</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Generación de PDFs e informes semanales enviados a la directiva.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-emerald" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="bell" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Alertas de KPIs</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Notificaciones inmediatas cuando las métricas caen o superan sus umbrales clave.</p>
                        </div>
                    </div>

                    <!-- Scale Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-emerald" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Data e Insights', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="network" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Integración Multistema</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">ETL automatizado que consolida datos de todas las herramientas operativas cruzadas.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-emerald" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Data e Insights', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="line-chart" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Análisis con IA</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Procesamiento de volúmenes de datos para extraer insights sin analistas dedicados.</p>
                        </div>
                    </div>

                    <!-- Elite Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-emerald" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Data e Insights', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="eye" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Predicción Métricas</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Forecasting robusto de los KPIs a mediano y largo plazo (Análisis Predictivo).</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-emerald" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Data e Insights', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="lightbulb" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Estrategia Copiloto</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Recomendaciones prescriptivas en lenguaje natural que dicen a la gerencia "qué hacer".</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ============================================== -->
            <!-- 6. DEPARTAMENTO: FINANZAS (Amber) -->
            <!-- ============================================== -->
            <section id="finanzas" class="scroll-mt-32">
                <div class="flex items-center gap-4 mb-8 pl-2">
                    <div class="p-2.5 bg-amber-500/10 border border-amber-500/20 text-brand-amber rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                        <i data-lucide="wallet" class="w-6 h-6"></i>
                    </div>
                    <h2 class="text-2xl font-semibold text-white tracking-tight">Finanzas</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                    <!-- Starter Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-amber" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="receipt" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Facturación Auto</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Emisión y envío automático de facturas electrónicas conectado al CRM o ERP.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-amber" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="credit-card" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Recordatorios Pago</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Cobranza amigable pre-configurada para fechas de vencimiento sin estrés manual.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-amber" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="pie-chart" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Reportes Financieros</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Consolidación de P&L, ventas y balance general con reportes auto-programados.</p>
                        </div>
                    </div>

                    <!-- Scale Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-amber" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Finanzas', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="trending-down" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Control de Gastos</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Categorización automatizada de egresos operativos para el control del presupuesto.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-amber" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Finanzas', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="landmark" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Conciliación Bancaria</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Cruce rápido entre movimientos del banco y la facturación, reduciendo errores humanos.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-amber" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Finanzas', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="calculator" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Análisis Financiero</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Extracción de ratios financieros en automático y sin hojas de cálculo manuales.</p>
                        </div>
                    </div>

                    <!-- Elite Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-amber" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Finanzas', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="circle-dollar-sign" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Predicción Flujo Caja</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Modelos de IA que avisan con meses de antelación sobre posibles quiebres de liquidez.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-amber" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('Finanzas', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="rocket" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Optimización Finanzas</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Agentes analizando egresos para proveer recomendaciones directas de ahorro.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ============================================== -->
            <!-- 7. DEPARTAMENTO: RECURSOS HUMANOS (Indigo) -->
            <!-- ============================================== -->
            <section id="rrhh" class="scroll-mt-32">
                <div class="flex items-center gap-4 mb-8 pl-2">
                    <div class="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-brand-indigo rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                        <i data-lucide="users" class="w-6 h-6"></i>
                    </div>
                    <h2 class="text-2xl font-semibold text-white tracking-tight">Recursos Humanos (RRHH)</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                    <!-- Starter Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-indigo" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="user-plus" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Onboarding Auto</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Activación de correos, cuentas y flujos de bienvenida sin que RRHH mueva un dedo.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-indigo" data-tier="starter">
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="plane" class="w-6 h-6"></i></div>
                                <div><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Gestión Vacaciones</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Sistema de self-service que aprueba, descuenta y notifica a los equipos sobre ausencias (PTO).</p>
                        </div>
                    </div>

                    <!-- Scale Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-indigo" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('RRHH', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="check-square" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Eval. de Desempeño</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Flujos automatizados 360° para recolección de feedback sin correteo ni formularios perdidos.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-indigo" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('RRHH', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="user-search" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Reclutamiento Auto</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Filtrado masivo inicial de CVs y agendamiento autónomo para reducir el tiempo-de-contratación.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-indigo" data-tier="scale">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('RRHH', 'ScaleAI')">
                            <span class="bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="lock-open" class="w-5 h-5"></i> Activar ScaleAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="clock" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Seguimiento Productividad</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Consolidación de indicadores de eficiencia y asistencia del personal remoto e in-house.</p>
                        </div>
                    </div>

                    <!-- Elite Cards -->
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-indigo" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('RRHH', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="brain" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Análisis Talento IA</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Mapas dinámicos de potencial que descubren a los líderes ocultos y necesidades de reskilling.</p>
                        </div>
                    </div>
                    <div class="glass-card rounded-[24px] p-8 flex flex-col h-full relative group overflow-hidden feature-card color-indigo" data-tier="elite">
                        <div class="lock-overlay absolute inset-0 bg-dark-900/30 backdrop-blur-[3px] z-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer" onclick="handleCardClick('RRHH', 'EliteAI')">
                            <span class="bg-amber-400/20 text-amber-400 border border-amber-400/40 px-5 py-2.5 rounded-xl font-medium shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2 transition-transform transform group-hover:scale-105"><i data-lucide="cpu" class="w-5 h-5"></i> Activar EliteAI</span>
                        </div>
                        <div class="content-wrapper flex flex-col h-full transition-all">
                            <div class="flex justify-between items-start mb-6">
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner"><i data-lucide="user-x" class="w-6 h-6"></i></div>
                                <div><i data-lucide="lock" class="w-5 h-5 text-slate-500 locked-icon mt-2"></i><div class="unlocked-toggle relative w-14 align-middle"><input type="checkbox" checked class="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-[5px] appearance-none z-10 top-0.5"/><label class="toggle-label block h-8 rounded-full border border-transparent"></label></div></div>
                            </div>
                            <h3 class="font-medium text-white mb-3 text-xl tracking-tight">Predicción Rotación</h3>
                            <p class="text-[15px] text-slate-400 mb-2 flex-1 font-light leading-relaxed">Señales anticipadas que detectan a los empleados clave en riesgo inminente de renuncia.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </main>

    <!-- PAYWALL MODAL (Upselling Modal) - Ahora más "Glass" -->
    <div id="paywall-modal" class="fixed inset-0 bg-dark-900/80 backdrop-blur-md z-50 hidden flex items-center justify-center opacity-0 transition-opacity duration-300">
        <div class="glass-card border border-white/10 rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] w-full max-w-lg overflow-hidden transform scale-95 transition-transform duration-300 relative" id="modal-content">
            
            <button onclick="closeModal()" class="absolute top-5 right-5 text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-colors z-20">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>

            <!-- Gradient Header -->
            <div class="h-40 relative flex items-center justify-center overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-brand-primary/40 via-brand-secondary/20 to-transparent"></div>
                <div class="absolute inset-0 bg-grid opacity-30"></div>
                <div class="w-20 h-20 bg-dark-800 border border-white/10 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center absolute -bottom-10 z-10">
                    <i data-lucide="rocket" class="w-10 h-10 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" id="modal-icon"></i>
                </div>
            </div>

            <div class="pt-16 p-10 text-center relative z-10">
                <h3 class="text-3xl font-semibold text-white mb-4 tracking-tight">Desbloquea Inteligencia en <br/><span id="modal-dept" class="text-brand-primary">Módulo</span></h3>
                
                <p class="text-slate-400 mb-8 font-light leading-relaxed text-lg">
                    Activa este módulo empresarial de alto rendimiento obteniendo el plan <strong id="modal-plan" class="text-white font-medium">ScaleAI</strong>. Longitudinal hará el trabajo pesado automáticamente en segundo plano.
                </p>

                <div class="bg-white/5 border border-white/10 rounded-[20px] p-6 mb-8 text-left shadow-inner">
                    <ul class="space-y-4 text-[15px] text-slate-300" id="modal-bullet-points">
                        <li class="flex items-center gap-4"><i data-lucide="check-circle-2" class="w-6 h-6 text-brand-secondary drop-shadow-md"></i> <span>Activación con <b class="text-white">1 solo clic</b></span></li>
                        <li class="flex items-center gap-4"><i data-lucide="check-circle-2" class="w-6 h-6 text-brand-secondary drop-shadow-md"></i> <span>Conectado a tu Base de Datos Central</span></li>
                        <li class="flex items-center gap-4"><i data-lucide="check-circle-2" class="w-6 h-6 text-brand-secondary drop-shadow-md"></i> <span>Escala Operativa Inmediata</span></li>
                    </ul>
                </div>

                <div class="flex flex-col gap-4">
                    <button class="w-full py-4 px-6 bg-white text-black hover:bg-slate-200 rounded-2xl text-lg font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all hover:-translate-y-1">
                        Ver Planes y Actualizar
                    </button>
                    <button onclick="closeModal()" class="w-full py-3 px-4 text-slate-500 hover:text-white text-[15px] font-medium transition-colors">
                        Mantener plan actual
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts de Estado Lógico -->
    <script>
        lucide.createIcons();

        // 1. Lógica de Cambio de Plan
        function setPlan(planName) {
            document.body.setAttribute('data-plan', planName);
            setTimeout(() => { lucide.createIcons(); }, 100);
        }

        // 2. Lógica del Modal Paywall
        const modal = document.getElementById('paywall-modal');
        const modalContent = document.getElementById('modal-content');
        const deptText = document.getElementById('modal-dept');
        const planText = document.getElementById('modal-plan');
        const modalIcon = document.getElementById('modal-icon');
        const bulletPoints = document.getElementById('modal-bullet-points');

        function handleCardClick(department, requiredPlan) {
            deptText.textContent = department;
            planText.textContent = requiredPlan;
            
            if(requiredPlan === 'EliteAI') {
                modalIcon.setAttribute('data-lucide', 'cpu');
                modalIcon.classList.replace('text-white', 'text-amber-400');
                
                bulletPoints.innerHTML = `
                    <li class="flex items-center gap-4"><i data-lucide="check-circle-2" class="w-6 h-6 text-amber-500 drop-shadow-md"></i> <span>Decisiones tomadas <b class="text-white">autónomamente por IA</b></span></li>
                    <li class="flex items-center gap-4"><i data-lucide="check-circle-2" class="w-6 h-6 text-amber-500 drop-shadow-md"></i> <span>Modelos predictivos de Machine Learning</span></li>
                    <li class="flex items-center gap-4"><i data-lucide="check-circle-2" class="w-6 h-6 text-amber-500 drop-shadow-md"></i> <span>Inteligencia estratégica 24/7 para tu empresa</span></li>
                `;
            } else {
                modalIcon.setAttribute('data-lucide', 'rocket');
                modalIcon.classList.replace('text-amber-400', 'text-white');
                
                bulletPoints.innerHTML = `
                    <li class="flex items-center gap-4"><i data-lucide="check-circle-2" class="w-6 h-6 text-brand-secondary drop-shadow-md"></i> <span>Activación con <b class="text-white">1 solo clic</b></span></li>
                    <li class="flex items-center gap-4"><i data-lucide="check-circle-2" class="w-6 h-6 text-brand-secondary drop-shadow-md"></i> <span>Conectado a tu Base de Datos Central</span></li>
                    <li class="flex items-center gap-4"><i data-lucide="check-circle-2" class="w-6 h-6 text-brand-secondary drop-shadow-md"></i> <span>Escala la operación de todo un departamento</span></li>
                `;
            }
            lucide.createIcons(); 

            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            }, 10);
        }

        function closeModal() {
            modal.classList.add('opacity-0');
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
            
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300); 
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    </script>
</body>
</html>
