import type { QuizQuestionData } from '@/data/quiz';
import { cn } from '@/lib/utils';

interface QuizQuestionProps {
  question: QuizQuestionData;
  selectedIndex: number | undefined;
  onSelect: (optionIndex: number) => void;
}

export default function QuizQuestion({ question, selectedIndex, onSelect }: QuizQuestionProps) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-section-title">{question.prompt}</h3>
      <div className="grid gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => onSelect(index)}
              aria-pressed={isSelected}
              className={cn(
                'rounded-lg border-2 px-5 py-4 text-left text-lg transition-colors',
                isSelected
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-card text-foreground hover:border-foreground',
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
