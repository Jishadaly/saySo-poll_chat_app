import Poll from '@/models/Poll';
import { NextRequest, NextResponse } from 'next/server';

// This is the dynamic handler for all routes like /api/[pollId]
export async function GET(res: NextResponse, { params }: { params: { pollId: string } }) {
    try {
        const { pollId } = params;

        const pollData = await Poll.findById(pollId).populate('options');
        console.log(pollData);
        return NextResponse.json(pollData,  { status: 200 });
        
        
    } catch (error) {
        console.log(error);
        
        return NextResponse.json(error, { status: 400 });

    }
}
