import { Progress } from '@/components/ui/progress';

interface QuizProgressProps {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const value = Math.round((current / total) * 100);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-eyebrow">
        <span>Pregunta {current} de {total}</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  );
}
