import React from 'react';

const GOLD = '#d4af37';

export default function MatchOverScreen({ matchScore, players, onNewGame, onExitGame, onEndGame, isHost }) {
  const winner = matchScore.A >= 12 ? 'A' : 'B';
  const winnerColor = winner === 'A' ? '#3498db' : '#e74c3c';
  const winnerPlayers = players.filter((p) => p.team === winner);
  const winnerNames = winnerPlayers.map(p => p.name).join(' & ');
  const teamANames = players.filter(p => p.team === 'A').map(p => p.name).join(' & ');
  const teamBNames = players.filter(p => p.team === 'B').map(p => p.name).join(' & ');

  return (
    <div style={overlayStyle}>
      {/* Top-right exit buttons */}
      <div style={{ position: 'fixed', top: 'calc(env(safe-area-inset-top, 0px) + 12px)', right: 12, display: 'flex', gap: 8, zIndex: 999 }}>
        {isHost && (
          <button onClick={onEndGame} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: '#c0392b', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 'bold' }}>✕ End Game</button>
        )}
        <button onClick={onExitGame} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: '#4a6a8a', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 'bold' }}>🚪 Exit</button>
      </div>

      <div style={cardStyle}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🏆</div>

        <div style={{ color: GOLD, fontSize: 13, letterSpacing: 3, marginBottom: 8, textTransform: 'uppercase' }}>
          Match Complete
        </div>

        <div style={{ fontSize: 32, fontWeight: 'bold', color: winnerColor, marginBottom: 8 }}>
          {winnerNames} Win!
        </div>
        <div style={{ color: '#8fa8c8', fontSize: 13, marginBottom: 20 }}>
          🎉 Series victory — reached 12 points
        </div>

        {/* Final score */}
        <div style={{
          display: 'flex', gap: 16, marginBottom: 28, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap',
          background: 'rgba(255,255,255,0.04)', borderRadius: 16,
          padding: '20px 24px',
        }}>
          <ScorePill label={teamANames} score={matchScore.A} color="#3498db" />
          <div style={{ color: '#4a6a8a', fontSize: 24, fontWeight: 'bold' }}>:</div>
          <ScorePill label={teamBNames} score={matchScore.B} color="#e74c3c" />
        </div>

        {isHost ? (
          <button onClick={onNewGame} style={goldBtn}>🔄 Play Again</button>
        ) : (
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '14px 28px', color: '#6b8aaa', fontSize: 14 }}>
            ⏳ Waiting for host to start a new match...
          </div>
        )}
      </div>
    </div>
  );
}

function ScorePill({ label, score, color }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 140 }}>
      <div style={{ fontSize: 42, fontWeight: 'bold', color, lineHeight: 1 }}>{score}</div>
      <div style={{ color: '#6b8aaa', fontSize: 12, marginTop: 4 }}>{label}</div>
    </div>
  );
}

const overlayStyle = {
  minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(10,22,40,0.98)', padding: 24,
};

const cardStyle = {
  background: 'rgba(255,255,255,0.05)', border: `1px solid rgba(212,175,55,0.3)`,
  borderRadius: 24, padding: '40px 40px', maxWidth: 440, width: '100%',
  textAlign: 'center', backdropFilter: 'blur(20px)',
};

const goldBtn = {
  padding: '14px 40px', borderRadius: 12, background: GOLD,
  color: '#0a1628', border: 'none', fontSize: 16, fontWeight: 'bold',
  cursor: 'pointer', letterSpacing: 1, fontFamily: 'Georgia, serif',
};
