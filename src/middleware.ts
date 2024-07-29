import type { NextRequest } from 'next/server';
import {NextResponse} from "next/server";

export function middleware(req: NextRequest) {
    console.log('Middleware called');
    return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
