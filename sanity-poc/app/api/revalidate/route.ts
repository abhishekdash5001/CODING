import { revalidatePath } from "next/cache";
import { NextRequest,NextResponse } from "next/server";




export async function POST(params:NextRequest) {
    const token = params.headers.get('token')

    if(!token){
        return NextResponse.json({
            message:'token is not present',
            status:401
        })
    }

    if(token !== process.env.SANITY_REVALIDATE_SECRET){
        return NextResponse.json({
            message:'Invalid token',
            status:401
        })
    }

    const body = await params.json();

    const slug =  body.slug

    if(slug){
        const path = slug.startsWith("/") ? slug : `/${slug}`;
        revalidatePath(path)
        return NextResponse.json({
            message:'revalidation succesful',
            status:200
        })
    }

    return NextResponse.json({
        message:'slug is not present',
        status:403
    })
    
}