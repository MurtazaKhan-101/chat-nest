import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/app/libs/pusher";

interface IParams{
    conversationId?: string;
}

export async function DELETE(request:Request, {params}:{params:IParams}){
    try{
        const {conversationId} = params;
        const currentUser = await getCurrentUser();

        if(!currentUser?.id){
            return new NextResponse('Unauthorized', {status: 401});
        }
        const exixtingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        });
        if(!exixtingConversation){
            return new NextResponse('Invalid ID', {status: 400});
        }
        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        });

        exixtingConversation.users.forEach((user)=>{
            if(user.email){
                pusherServer.trigger(user.email, 'conversation:remove', exixtingConversation)
            }
        })

        return NextResponse.json(deletedConversation);
    }catch (error: any){
        console.log(error, 'ERROR_CONVERSATION_DELETE');;
        return new NextResponse('Internal Error' , {status : 500})
        
    }
}