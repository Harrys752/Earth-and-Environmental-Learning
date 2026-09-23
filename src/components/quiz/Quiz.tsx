import { useState, useEffect } from 'preact/hooks';
import type { Quiz as QuizType, QuestionFeedback, QuizEvaluationResult } from '../../types/quiz';
import Question from './Question';
import { evaluateQuestion, evaluateQuiz } from '../../lib/quizEngine';
import {
  getProgress,
  recordQuizAttempt,
  updateExperienceStatus,
  addJourneyEntry,
} from '../../lib/storage';
import { getMasteryLabel } from '../../lib/progress';
import { useTranslations } from '../../i18n';
import { getLocalizedUrl, type Locale } from '../../lib/i18nUrl';

export interface QuizProps {
  quiz: QuizType;
  experienceSlug: string;
  experienceTitle?: string;
  locale?: Locale;
}

export default function Quiz({ quiz, experienceSlug, experienceTitle, locale = 'en' }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, QuestionFeedback>>({});
  const [evaluationResult, setEvaluationResult] = useState<QuizEvaluationResult | null>(null);
  const [pastAttemptsCount, setPastAttemptsCount] = useState(0);

  const t = useTranslations(locale);

  useEffect(() => {
    const progress = getProgress(experienceSlug);
    setPastAttemptsCount(progress.quizAttempts.length);
  }, [experienceSlug]);

  const currentQuestion = quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === quiz.questions.length - 1;
  const currentFeedback = currentQuestion ? feedbacks[currentQuestion.id] : undefined;

  const handleAnswerSubmit = (questionId: string, answer: unknown) => {
    const question = quiz.questions.find((q) => q.id === questionId);
    if (!question) return;

    const feedback = evaluateQuestion(question, answer);
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setFeedbacks((prev) => ({ ...prev, [questionId]: feedback }));
  };

  const handleRetryQuestion = (questionId: string) => {
    setFeedbacks((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      finishQuiz();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const finishQuiz = () => {
    const currentProgress = getProgress(experienceSlug);
    const result = evaluateQuiz(quiz, answers, currentProgress.quizAttempts);
    setEvaluationResult(result);

    // Save to storage
    recordQuizAttempt(
      experienceSlug,
      {
        quizId: quiz.id,
        timestamp: result.timestamp,
        answers,
        score: result.scorePercentage,
        attemptNumber: currentProgress.quizAttempts.length + 1,
      },
      result.masteryContribution
    );

    // If passed, mark experience completed
    if (result.passed) {
      updateExperienceStatus(experienceSlug, 'completed');
    }

    // Automatically record milestone / journey entry
    addJourneyEntry({
      type: 'learned',
      source: 'automatic',
      title: locale === 'id' ? `Menyelesaikan Evaluasi: ${quiz.title}` : `Completed Assessment: ${quiz.title}`,
      description: locale === 'id'
        ? `Skor ${result.scorePercentage}% (${result.correctCount}/${result.totalQuestions} pertanyaan benar). Tingkat penguasaan: ${result.masteryContribution}.`
        : `Scored ${result.scorePercentage}% (${result.correctCount}/${result.totalQuestions} questions correct). Mastery indicator: ${result.masteryContribution}.`,
      relatedExperienceSlug: experienceSlug,
      metadata: {
        quizScore: result.scorePercentage,
      },
    });
  };

  const restartQuiz = () => {
    setAnswers({});
    setFeedbacks({});
    setEvaluationResult(null);
    setCurrentIndex(0);
    const progress = getProgress(experienceSlug);
    setPastAttemptsCount(progress.quizAttempts.length);
  };

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div class="rounded-xl border border-[var(--color-border)] p-6 text-center text-sm text-[var(--color-text-muted)]">
        {locale === 'id' ? 'Tidak ada pertanyaan evaluasi untuk pengalaman belajar ini.' : 'No assessment questions configured for this experience.'}
      </div>
    );
  }

  // Completed Evaluation Screen
  if (evaluationResult) {
    const masteryInfo = getMasteryLabel(evaluationResult.masteryContribution);

    return (
      <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 space-y-6 shadow-sm">
        <div class="text-center max-w-md mx-auto space-y-2">
          <div
            class={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-2xl font-bold ${
              evaluationResult.passed
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200'
            }`}
          >
            {evaluationResult.scorePercentage}%
          </div>

          <h3 class="text-xl font-bold text-[var(--color-text)]">
            {evaluationResult.passed ? t.quiz.passedTitle : t.quiz.reviewTitle}
          </h3>

          {experienceTitle && (
            <div class="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wide">
              {experienceTitle}
            </div>
          )}

          <p class="text-sm text-[var(--color-text-muted)]">
            {locale === 'id'
              ? `Anda menjawab ${evaluationResult.correctCount} dari ${evaluationResult.totalQuestions} pertanyaan dengan benar.`
              : `You answered ${evaluationResult.correctCount} of ${evaluationResult.totalQuestions} questions correctly.`}
            {pastAttemptsCount > 0 && ` (${locale === 'id' ? 'Percobaan ke-' : 'Attempt #'}${pastAttemptsCount + 1})`}
          </p>

          <div class="pt-2">
            <span
              class={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${masteryInfo.badgeClass}`}
            >
              <span>{masteryInfo.label}</span>
            </span>
            <p class="text-xs text-[var(--color-text-dim)] mt-1.5">
              {evaluationResult.passed ? t.quiz.passedMsg : t.quiz.reviewMsg}
            </p>
          </div>
        </div>

        {/* Detailed Question Review */}
        <div class="border-t border-[var(--color-border)] pt-6 space-y-4">
          <h4 class="text-sm font-semibold text-[var(--color-text)] tracking-wide uppercase">
            {locale === 'id' ? 'Tinjauan Jawaban & Penjelasan Ilmiah' : 'Review Answers & Scientific Explanations'}
          </h4>
          <div class="space-y-3">
            {evaluationResult.questionFeedbacks.map((fb, idx) => {
              const q = quiz.questions.find((item) => item.id === fb.questionId);
              return (
                <div
                  key={fb.questionId}
                  class={`p-4 rounded-xl border text-xs sm:text-sm space-y-1.5 ${
                    fb.isCorrect
                      ? 'bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900'
                      : 'bg-rose-50/50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900'
                  }`}
                >
                  <div class="flex items-center justify-between font-semibold">
                    <span class="text-[var(--color-text)]">
                      {idx + 1}. {q?.prompt}
                    </span>
                    <span
                      class={`text-xs px-2 py-0.5 rounded ${
                        fb.isCorrect
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200'
                      }`}
                    >
                      {fb.isCorrect ? t.quiz.correct : t.quiz.incorrect}
                    </span>
                  </div>
                  <p class="text-[var(--color-text-muted)] leading-relaxed">{fb.explanation}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div class="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
          <button
            type="button"
            onClick={restartQuiz}
            class="px-4 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>{t.quiz.retryQuiz}</span>
          </button>

          <a
            href={getLocalizedUrl('/journey', locale)}
            class="px-5 py-2 rounded-xl bg-[var(--color-accent)] text-white text-xs font-semibold hover:bg-[var(--color-accent-hover)] transition-colors inline-flex items-center gap-1.5 shadow-sm"
          >
            <span>{t.home.openJourney}</span>
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  // Active Quiz View
  return (
    <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 shadow-sm">
      {/* Progress Bar */}
      <div class="mb-6">
        <div class="flex items-center justify-between text-xs text-[var(--color-text-muted)] mb-2 font-medium">
          <span>{quiz.title}</span>
          <span>
            {currentIndex + 1} / {quiz.questions.length}
          </span>
        </div>
        <div class="w-full h-1.5 rounded-full bg-[var(--color-border-subtle)] overflow-hidden">
          <div
            class="h-full bg-[var(--color-accent)] transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      <Question
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={quiz.questions.length}
        onAnswerSubmit={handleAnswerSubmit}
        onRetryQuestion={handleRetryQuestion}
        onNextQuestion={handleNextQuestion}
        isLastQuestion={isLastQuestion}
        activeFeedback={currentFeedback}
        locale={locale}
      />
    </div>
  );
}
