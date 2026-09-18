// Question bank for the 6–10 age band. This is a screening instrument,
// not a diagnostic one: it surfaces a reading profile across domains that
// are commonly assessed in early literacy screening (phonological
// awareness, letter-sound knowledge, word recognition, and verbal
// working memory), so a family or teacher knows where to look closer.
//
// Each question belongs to a `domain`. Scoring logic lives in
// utils/scoring.js and reads these domain keys directly.

export const DOMAINS = {
  phonological_awareness: {
    id: 'phonological_awareness',
    label: 'Phonological awareness',
    description: 'Hearing and playing with the sound structure of spoken words.'
  },
  letter_sound: {
    id: 'letter_sound',
    label: 'Letter-sound knowledge',
    description: 'Matching letters and letter groups to the sounds they make.'
  },
  decoding: {
    id: 'decoding',
    label: 'Decoding',
    description: 'Sounding out unfamiliar or made-up words.'
  },
  word_recognition: {
    id: 'word_recognition',
    label: 'Word recognition',
    description: 'Recognizing common written words quickly and automatically.'
  },
  verbal_memory: {
    id: 'verbal_memory',
    label: 'Verbal working memory',
    description: 'Holding and reordering spoken information for a short time.'
  }
};

// Ungated sample used on the public landing page. Deliberately short and
// never scored — see SampleAssessment.jsx.
export const sampleQuestions = [
  {
    id: 'sample-1',
    domain: 'phonological_awareness',
    prompt: 'Which word rhymes with CAT?',
    options: ['Hat', 'Dog', 'Sun', 'Fish'],
    correctIndex: 0
  },
  {
    id: 'sample-2',
    domain: 'phonological_awareness',
    prompt: 'Which word begins with the same sound as SUN?',
    options: ['Moon', 'Star', 'Sock', 'Rain'],
    correctIndex: 2
  },
  {
    id: 'sample-3',
    domain: 'decoding',
    prompt: 'Which of these is spelled the way it sounds — try reading it aloud in your head: "TREB"?',
    options: ['It rhymes with WEB', 'It rhymes with TREE', 'It rhymes with ROBE', 'It has no vowel sound'],
    correctIndex: 0
  }
];

// Full 6–10 assessment. Difficulty 1–3 is used by the adaptive selector
// in Assessment.jsx.
export const fullAssessment = [
  {
    id: 'q1',
    domain: 'phonological_awareness',
    difficulty: 1,
    prompt: 'Which word rhymes with LIGHT?',
    options: ['Night', 'Lamp', 'Book', 'Chair'],
    correctIndex: 0
  },
  {
    id: 'q2',
    domain: 'phonological_awareness',
    difficulty: 1,
    prompt: 'Which word starts with the same sound as FISH?',
    options: ['Fan', 'Bird', 'Cup', 'Log'],
    correctIndex: 0
  },
  {
    id: 'q3',
    domain: 'phonological_awareness',
    difficulty: 2,
    prompt: 'Say "STOP" without the first sound. What word is left?',
    options: ['Top', 'Sop', 'Top-o', 'Pots'],
    correctIndex: 0
  },
  {
    id: 'q4',
    domain: 'phonological_awareness',
    difficulty: 3,
    prompt: 'Which two words share their middle sound: SHIP, SHOP, CHIP?',
    options: ['Ship and Chip', 'Ship and Shop', 'Shop and Chip', 'None of them'],
    correctIndex: 0
  },
  {
    id: 'q5',
    domain: 'letter_sound',
    difficulty: 1,
    prompt: 'Which letter makes the first sound in "MAP"?',
    options: ['M', 'N', 'W', 'P'],
    correctIndex: 0
  },
  {
    id: 'q6',
    domain: 'letter_sound',
    difficulty: 2,
    prompt: 'Which letter pair makes the sound at the end of "FISH"?',
    options: ['SH', 'CH', 'TH', 'PH'],
    correctIndex: 0
  },
  {
    id: 'q7',
    domain: 'letter_sound',
    difficulty: 2,
    prompt: 'Which letter usually makes a different sound depending on the word: "cat" vs. "city"?',
    options: ['C', 'B', 'M', 'T'],
    correctIndex: 0
  },
  {
    id: 'q8',
    domain: 'decoding',
    difficulty: 1,
    prompt: 'Sound this out: "SAT". Which real word does it sound like?',
    options: ['A word meaning "did sit"', 'A word meaning "quick"', 'A word meaning "happy"', 'Not a real sound'],
    correctIndex: 0
  },
  {
    id: 'q9',
    domain: 'decoding',
    difficulty: 2,
    prompt: 'This is a made-up word: "FRAT". Which real word does it rhyme with?',
    options: ['CAT', 'FREE', 'FROG', 'FEAT'],
    correctIndex: 0
  },
  {
    id: 'q10',
    domain: 'decoding',
    difficulty: 3,
    prompt: 'This is a made-up word: "SPLOND". How many separate sounds (not letters) does it have?',
    options: ['6', '4', '7', '3'],
    correctIndex: 0
  },
  {
    id: 'q11',
    domain: 'word_recognition',
    difficulty: 1,
    prompt: 'Which of these is a real word?',
    options: ['said', 'siad', 'sead', 'saide'],
    correctIndex: 0
  },
  {
    id: 'q12',
    domain: 'word_recognition',
    difficulty: 2,
    prompt: 'Which word matches: "was"?',
    options: ['was', 'saw', 'wsa', 'aws'],
    correctIndex: 0
  },
  {
    id: 'q13',
    domain: 'word_recognition',
    difficulty: 2,
    prompt: 'Which of these words is spelled correctly?',
    options: ['because', 'becuase', 'becasue', 'becuse'],
    correctIndex: 0
  },
  {
    id: 'q14',
    domain: 'verbal_memory',
    difficulty: 1,
    prompt: 'Read once, then pick the correct order: "dog, hat, sun". What was the second word?',
    options: ['hat', 'dog', 'sun', 'cup'],
    correctIndex: 0
  },
  {
    id: 'q15',
    domain: 'verbal_memory',
    difficulty: 2,
    prompt: 'Hold this in mind: "7, 2, 9, 4". What was the third number?',
    options: ['9', '2', '4', '7'],
    correctIndex: 0
  },
  {
    id: 'q16',
    domain: 'verbal_memory',
    difficulty: 3,
    prompt: 'Hold this in mind: "blue, seven, chair, moon, two". What was the fourth item?',
    options: ['moon', 'chair', 'seven', 'blue'],
    correctIndex: 0
  }
];

export function domainsPresent(questions) {
  return [...new Set(questions.map((q) => q.domain))];
}
