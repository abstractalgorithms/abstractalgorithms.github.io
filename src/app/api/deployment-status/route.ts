import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    isDeploying: false,
    message: "System is operational"
  });
}
