import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"
import authOptions from "../../auth/authOptions";

export async function  PATCH(
    request: NextRequest,
     {params} : {params: {id: string}}){

    const session = await getServerSession(authOptions);

    if(!session)
        return NextResponse.json({}, {status: 401});
    
    
    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400});

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    if(!issue)
        return NextResponse.json({error: 'Invalid Issue Id'}, { status: 400});

    const updatedIssue = await prisma.issue.update({
        where: {id: issue.id},
        data:{
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updatedIssue);
}

export async function DELETE( request: NextRequest,
    {params} : {params: {id: string}}){
    
    const session = await getServerSession(authOptions);

    if(!session)
        return NextResponse.json({}, {status: 401});
    
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    if(!issue)
        return NextResponse.json({error: 'Invalid Issue Id'}, { status: 400});

    const deleteIssue = await prisma.issue.delete({
        where: {id: issue.id}
    })

    return NextResponse.json('Issue Deleted!');
}