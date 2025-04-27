// src/app/quiz/page.tsx
import Link from "next/link";

export default function QuizHomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">퀴즈 홈</h1>
      <p className="text-lg mb-8 text-center text-gray-600">
        퀴즈를 생성하거나, 친구의 퀴즈를 풀어보세요!
      </p>
      <div className="flex flex-col gap-4">
        <Link
          href="/quiz/generate"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600 transition">
          퀴즈 생성하기
        </Link>
        <Link
          href="/quiz/result"
          className="px-6 py-3 bg-green-500 text-white rounded-lg text-lg hover:bg-green-600 transition">
          결과 보기
        </Link>
      </div>
    </main>
  );
}
