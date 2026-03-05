import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text)' }}>
        Panel de Control
      </h1>
      <p style={{ color: 'var(--text-mid)', marginBottom: '2rem' }}>
        Bienvenido al Dashboard de Longitudinal.
      </p>
      <Link 
        to="/" 
        className="btn-outline btn-xl"
        style={{ textDecoration: 'none' }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}
