"use client";

import QuizJoinFormQ3 from "@/components/quiz/join/QuizJoinFormQ3";
import { useQuizStore } from "@/store/quiz";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const QuizJoinQ3Page = () => {
  const router = useRouter();
  const { quizQuestions } = useQuizStore();

  useEffect(() => {
    if (!quizQuestions || quizQuestions.length === 0) {
      router.push("/quiz/join");
    }
  }, [quizQuestions, router]);

  if (!quizQuestions || quizQuestions.length === 0) {
    return null;
  }

  return <QuizJoinFormQ3 question={quizQuestions[2]} />;
};

export default QuizJoinQ3Page;