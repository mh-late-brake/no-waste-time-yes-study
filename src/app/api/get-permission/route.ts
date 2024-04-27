import allowedToContinue from "@/function/allow-to-continue"

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
  const isAllow: boolean = await allowedToContinue();

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
