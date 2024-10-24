/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    
    const token = req.cookies.get('accessToken');
    
    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    req.headers.set('Authorization', `Bearer ${token}`);

    const { pathname } = req.nextUrl;

    const protectedRoutes = ['/system-user'];

    if (protectedRoutes.includes(pathname)) {
        if (!req.headers.get('Authorization')) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    // Allow the request to proceed
    return NextResponse.next();
}

export const config = {
  matcher: '/system-user/:path*',
};