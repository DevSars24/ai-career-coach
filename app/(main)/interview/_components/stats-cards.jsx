import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, a) => sum + a.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, a) => sum + a.questions.length,
      0
    );
  };

  const cardBase =
    "relative overflow-hidden border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-black dark:hover:border-white bg-card text-card-foreground";

  const iconWrapper =
    "p-2 rounded-lg flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 text-foreground border border-neutral-200 dark:border-neutral-800";

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Average Score */}
      <Card className={cardBase}>
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-500/5 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <div className={iconWrapper}>
            <Trophy className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold tracking-tight">
            {getAverageScore()}%
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Across all assessments
          </p>
        </CardContent>
      </Card>

      {/* Questions Practiced */}
      <Card className={cardBase}>
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-500/5 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Questions Practiced
          </CardTitle>
          <div className={iconWrapper}>
            <Brain className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold tracking-tight">
            {getTotalQuestions()}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Total questions</p>
        </CardContent>
      </Card>

      {/* Latest Score */}
      <Card className={cardBase}>
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-500/5 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
          <div className={iconWrapper}>
            <Target className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold tracking-tight">
            {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Most recent quiz
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
