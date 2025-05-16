'use client'

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface ErrorCardProps {
    title: string,
    description: string
}

export function ErrorCard(data : ErrorCardProps) {
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="pb-3">
                <CardTitle className="text-2xl">{data.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{data.description}</p>
                <div className="mt-4">
                    <Button asChild>
                        <Link href="/">Return to Home</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}