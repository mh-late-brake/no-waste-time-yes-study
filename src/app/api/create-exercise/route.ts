import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { cookies } from "next/headers";

export async function GET() {
  cookies();
  const createdExercise = await prisma.exercise.create({
    data: {
      question: "What's your name?",
      correctAnswer: "Admin",
    }
  })
  return NextResponse.json(createdExercise);
}
