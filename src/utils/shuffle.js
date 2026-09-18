// Randomizes the order of a question's answer options so the correct
// answer isn't predictably in the same position every time (the source
// data in questions.js always lists the correct option first, since
// that's easiest to author). The correct option is tracked by its text,
// not its original index, so this is safe to call on every question.

export function shuffleQuestionOptions(question) {
  const correctValue = question.options[question.correctIndex];
  const shuffled = [...question.options];

  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return {
    ...question,
    options: shuffled,
    correctIndex: shuffled.indexOf(correctValue)
  };
}