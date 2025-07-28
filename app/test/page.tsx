export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🔮 Punk Horoscope Test</h1>
      <p>Si puedes ver esto, el problema está en los componentes complejos.</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  );
}