// Renders a line of text where selected words are split into
// per-character spans so a parent scroll timeline (see BookIntro) can
// animate individual characters. Words not listed in `scrambleTargets`
// render as plain text, keeping the surrounding line stable as required.

export default function ScramblingText({ text, scrambleTargets = [], className = '' }) {
  const words = text.split(' ');

  return (
    <span className={`scramble-text ${className}`}>
      {words.map((word, wi) => {
        const isTarget = scrambleTargets.includes(word);
        return (
          <span
            key={`${word}-${wi}`}
            className={`scramble-word${isTarget ? ' is-scramble-target' : ''}`}
            data-scramble={isTarget ? 'true' : 'false'}
          >
            {isTarget
              ? word.split('').map((ch, ci) => (
                  <span className="scramble-char" key={ci}>
                    {ch}
                  </span>
                ))
              : word}
            {wi < words.length - 1 ? '\u00A0' : ''}
          </span>
        );
      })}
    </span>
  );
}
