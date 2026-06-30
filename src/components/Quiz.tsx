import { useMemo, useState } from 'react';
import { QUESTIONS } from '@/data/quiz';
import { GARMENTS } from '@/data/garments';
import { buildUserVector, matchGarment } from '@/lib/match';
import QuizProgress from '@/components/QuizProgress';
import QuizQuestion from '@/components/QuizQuestion';
import ResultTeaser from '@/components/ResultTeaser';
import { Button } from '@/components/ui/button';

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const isComplete = step >= QUESTIONS.length;

  const result = useMemo(() => {
    if (!isComplete) return null;
    const userVector = buildUserVector(answers, QUESTIONS);
    return matchGarment(userVector, GARMENTS);
  }, [isComplete, answers]);

  const selectOption = (optionIndex: number) => {
    const nextAnswers = [...answers];
    nextAnswers[step] = optionIndex;
    setAnswers(nextAnswers);
    setStep(step + 1);
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const restart = () => {
    setAnswers([]);
    setStep(0);
  };

  if (isComplete && result) {
    return <ResultTeaser garment={result.garment} onRestart={restart} />;
  }

  const question = QUESTIONS[step];

  return (
    <div className="flex flex-col gap-8">
      <QuizProgress current={step + 1} total={QUESTIONS.length} />
      <QuizQuestion
        question={question}
        selectedIndex={answers[step]}
        onSelect={selectOption}
      />
      {step > 0 && (
        <Button variant="ghost" size="sm" className="w-fit" onClick={goBack}>
          Volver
        </Button>
      )}
    </div>
  );
}
