import { NextResponse , NextRequest } from "next/server";
import { headers , cookies} from "next/headers";

// Request  Accept User Agent Authorization
// Response content type and status
// Headers 

export async function GET(request: NextRequest)
{
    // 1
    // const requestHeaders = new Headers(request.headers)
    // console.log(requestHeaders.get("Authorization"))

    // 2
    const headersList = await headers();
    console.log(headersList.get("Authorization"))

    const theme = request.cookies.get("theme")
    console.log(theme)
    
    // 2
    const cookieStore = await cookies();
    cookieStore.set("resultsPerPage","20")
    console.log(cookieStore.get("resultsPerPage"))
    
    // Extra 
    console.log(cookieStore.has("theme"))
    cookieStore.delete("resultsPerPage")

    return new Response("<h1>Profile Api data<h1>" , {
        headers :{
            "Content-type" : "text/html",
            "Set-Cookie" : "theme=dark"  
            // first way 
        }
    })
}

// To set a new header you need to return a new response as custom header 
// If we use Next response it will automatically make the content type of the response as Json object 