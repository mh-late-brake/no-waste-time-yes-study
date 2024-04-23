import constant from "@/constant/constant";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  cookies();
  const searchParams = request.nextUrl.searchParams;
  const exerciseId = searchParams.get(constant.queryParamGetExerciseInfo);

  if (!exerciseId) {
    return NextResponse.json({ error: `no ${constant.queryParamGetExerciseInfo} query param found` })
  }

  const exercise = await prisma.exercise.findUnique({
    where: {
      id: Number(exerciseId),
    }
  })

  if (!exercise) {
    return NextResponse.json({ error: `exercise with id ${exerciseId} does not exist in database` });
  }

  return NextResponse.json(exercise);
}
