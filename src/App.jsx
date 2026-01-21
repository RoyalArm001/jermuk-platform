import { Routes, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Jermuk Travel</h1>
      <p>Version: v1.5</p>
      <nav style={{ display: 'flex', gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/list/hotels">Hotels</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list/hotels" element={<Hotels />} />
      </Routes>
    </div>
  );
}

function Home() {
  return <div>Home (cache reset test)</div>;
}

function Hotels() {
  return <div>Hotels list</div>;
}
