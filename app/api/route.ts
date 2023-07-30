export function GET() {
  return new Response(JSON.stringify({ error: 'Rota não encontrada' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' },
  })
}
