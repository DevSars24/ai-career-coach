"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null); // ⭐ NEW STATE

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  // ⭐ WHEN USER SELECTS AN ANSWER
  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    // Check if answer is correct
    if (answer === quizData[currentQuestion].correctAnswer) {
      setIsCorrect(true);
      toast.success("🎉 Correct Answer!");
    } else {
      setIsCorrect(false);
      toast.error("❌ Wrong Answer!");
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
      setIsCorrect(null); // reset for next question
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) correct++;
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    setIsCorrect(null);
    generateQuizFn();
    setResultData(null);
  };

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  // ⭐ If quiz is finished → show result page
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  // ⭐ Show initial "Start quiz" card
  if (!quizData) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You'll get 10 questions based on your industry & skills.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={generateQuizFn} className="w-full">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-lg font-medium">{question.question}</p>

        {/* ANSWER OPTIONS */}
        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
          className="space-y-2"
        >
{question.options.map((option, index) => {
  const isSelected = answers[currentQuestion] === option;
  const correctAnswer = question.correctAnswer;

  const isWrongSelected =
    isSelected && isCorrect === false && option !== correctAnswer;

  const isCorrectOption = option === correctAnswer;

  return (
    <div
      key={index}
      className={`
        flex items-center space-x-2 p-3 rounded-lg border transition-all cursor-pointer

        ${
          isSelected && isCorrect === true && isCorrectOption
            ? "border-green-600 bg-green-200 text-green-900"
          : isWrongSelected
            ? "border-red-600 bg-red-200 text-red-900"
          : !isCorrect && answers[currentQuestion] && isCorrectOption
            ? "border-green-600 bg-green-200 text-green-900"
          : "border-neutral-700 bg-neutral-900 text-white"
        }
      `}
    >
      <RadioGroupItem
        value={option}
        id={`option-${index}`}
        className={`
          h-4 w-4
          ${
            isSelected && isCorrect === true && isCorrectOption
              ? "border-green-700 text-green-700 bg-green-600"
            : isWrongSelected
              ? "border-red-700 text-red-700 bg-red-600"
            : !isCorrect && answers[currentQuestion] && isCorrectOption
              ? "border-green-700 text-green-700 bg-green-600"
            : "border-white text-white"
          }
        `}
      />
      <Label htmlFor={`option-${index}`}>{option}</Label>
    </div>
  );
})}


        </RadioGroup>

        {/* CORRECT / WRONG TEXT */}
        {isCorrect === true && (
          <p className="text-green-600 font-semibold">✅ Correct!</p>
        )}
        {isCorrect === false && (
          <p className="text-red-600 font-semibold">❌ Wrong Answer</p>
        )}

        {/* EXPLANATION AREA */}
        {showExplanation && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-medium">Explanation:</p>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
          >
            Show Explanation
          </Button>
        )}

        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className="ml-auto"
        >
          {currentQuestion < quizData.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
}
