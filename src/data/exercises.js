// Practice exercises, grouped by the same domain keys used in questions.js
// so a low domain score can be mapped directly to relevant practice.

export const exercises = [
  {
    id: 'ex-rhyme-sort',
    domain: 'phonological_awareness',
    title: 'Rhyme sort',
    minutes: 5,
    description: 'Sort spoken words into rhyming families to build an ear for word endings.',
    steps: [
      'Say the word "CAKE" out loud.',
      'Listen to four words: LAKE, DOOR, MAKE, BIRD.',
      'Point to every word that rhymes with CAKE.',
      'Say your own rhyme for CAKE.'
    ]
  },
  {
    id: 'ex-first-sound',
    domain: 'phonological_awareness',
    title: 'First sound match',
    minutes: 4,
    description: 'Practice isolating the first sound in spoken words before connecting it to letters.',
    steps: [
      'Listen to the word "BALL".',
      'Say the very first sound on its own: "b".',
      'Find another word that starts the same way.'
    ]
  },
  {
    id: 'ex-letter-sound-drill',
    domain: 'letter_sound',
    title: 'Letter-sound flash review',
    minutes: 6,
    description: 'A short, low-pressure drill pairing letters with their sounds.',
    steps: [
      'Look at one letter at a time.',
      'Say its sound out loud, not its name.',
      'Move to the next letter once the sound feels automatic.'
    ]
  },
  {
    id: 'ex-digraphs',
    domain: 'letter_sound',
    title: 'Two letters, one sound',
    minutes: 6,
    description: 'Practice letter pairs like SH, CH, TH that make a single new sound.',
    steps: [
      'Read the pair "SH" together.',
      'Say the single sound it makes.',
      'Find it inside the word "SHIP".'
    ]
  },
  {
    id: 'ex-nonword-reading',
    domain: 'decoding',
    title: 'Made-up word reading',
    minutes: 7,
    description: 'Reading invented words removes memorized whole-word guessing and builds true decoding.',
    steps: [
      'Read the made-up word "PLIM" out loud, sound by sound.',
      'Blend the sounds together smoothly.',
      'Try three more made-up words at the same pattern.'
    ]
  },
  {
    id: 'ex-blend-build',
    domain: 'decoding',
    title: 'Sound blending builder',
    minutes: 5,
    description: 'Build words one sound at a time, then blend faster with each pass.',
    steps: [
      'Say each sound separately: /c/ /a/ /t/.',
      'Say them a little faster.',
      'Say the whole word smoothly: "cat".'
    ]
  },
  {
    id: 'ex-sight-words',
    domain: 'word_recognition',
    title: 'High-frequency word set',
    minutes: 5,
    description: 'Repeated, spaced practice with common words that appear in almost every sentence.',
    steps: [
      'Read the word card out loud.',
      'Use the word in one spoken sentence.',
      'Shuffle the set and read it again.'
    ]
  },
  {
    id: 'ex-word-hunt',
    domain: 'word_recognition',
    title: 'Word hunt',
    minutes: 6,
    description: 'Spot a target word inside a short, familiar passage to build automatic recognition.',
    steps: [
      'Pick one target word, such as "because".',
      'Scan the passage and circle it every time it appears.',
      'Read each sentence containing it out loud.'
    ]
  },
  {
    id: 'ex-sequence-recall',
    domain: 'verbal_memory',
    title: 'Sequence recall',
    minutes: 5,
    description: 'Practice holding a short spoken sequence in mind and repeating it back in order.',
    steps: [
      'Listen to a sequence of four words.',
      'Repeat them back in the same order.',
      'Try again with one more item added.'
    ]
  },
  {
    id: 'ex-instruction-chain',
    domain: 'verbal_memory',
    title: 'Two-step instructions',
    minutes: 5,
    description: 'Follow short instruction chains to build working memory for multi-step directions.',
    steps: [
      'Listen to the full instruction before starting.',
      '"Touch your nose, then clap twice."',
      'Carry out both steps in order from memory.'
    ]
  }
];

export function exercisesForDomain(domain) {
  return exercises.filter((e) => e.domain === domain);
}
