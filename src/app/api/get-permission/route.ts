import allowedToContinue from "@/function/allow-to-continue"
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const isAllow: boolean = await allowedToContinue(url);

  const res = {
    redirect: !isAllow,
  }

  return new Response(JSON.stringify(res), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
