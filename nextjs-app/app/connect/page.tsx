'use client'

import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

const weekEvents = [
    { date: "October 9", title: "Writing Center Consults", time: "12:00–4:00pm", color: "orange" },
    { date: "October 10", title: "GEEX Talks with Related Tactics", time: "6:15–7:15pm", color: "orange" },
    { date: "October 11", title: "User Submitted Opportunity", time: "6:00pm", color: "blue" },
    { date: "October 13", title: "BIPOC Co-learner Affinity Group", time: "6:00–7:00pm", color: "orange" },
    { date: "October 14", title: "GEEX Talks: Questions Due", time: "For Related Tactics", color: "orange" },
    { date: "October 15", title: "User Submitted Opportunity", time: "", color: "blue" },
]

const affinityGroups = [
    "BIPOC Co-learner Affinity Group",
    "Flame Affinity Group",
    "GEEX Educators Group",
    "GEEX Book Club",
]

export default function ConnectPage() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date(2023, 9, 6)
    )

    return (
        <div className="p-6 space-y-10">
            <h1 className="text-2xl font-bold">Connect</h1>

            {/* Calendar Hero */}
            <Card>
                <CardContent className="flex flex-col md:flex-row items-center gap-6">
                    {/* Big Date + Legend */}
                    <div className="flex-shrink-0 flex items-center space-x-6">
                        {/* Big date box */}
                        <div className="text-center">
                            <div className="text-sm uppercase font-medium text-muted-foreground">
                                Oct
                            </div>
                            <div className="text-6xl font-extrabold leading-none">6</div>
                        </div>
                        {/* Legend */}
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                <span
                    className="inline-block w-4 h-4 rounded bg-orange-300 border-2 border-red-500"
                />
                                <span>Flame Affinity Group: The Economics of Flameworking, 6:00–7:00pm</span>
                            </div>
                            <div className="flex items-center space-x-2">
                <span
                    className="inline-block w-4 h-4 rounded bg-blue-600 border-2 border-blue-900"
                />
                                <span>DEADLINE: User Submitted Opportunity</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                                Timezone: US-Central
                            </div>
                        </div>
                    </div>

                    {/* ShadCN Calendar */}
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="mx-auto"
                    />
                </CardContent>
            </Card>

            {/* This Week */}
            <Card>
                <CardHeader>
                    <CardTitle>This Week</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-6 overflow-x-auto pb-2">
                        {weekEvents.map((ev, i) => (
                            <div key={i} className="flex-shrink-0 w-40 space-y-2 text-sm">
                                <div
                                    className={cn(
                                        "w-full aspect-square rounded-lg border-2",
                                        ev.color === "orange"
                                            ? "bg-orange-300 border-red-500"
                                            : "bg-blue-600 border-blue-900"
                                    )}
                                />
                                <div className="font-medium">{ev.date}</div>
                                <div>{ev.title}</div>
                                {ev.time && (
                                    <div className="text-xs text-muted-foreground">{ev.time}</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <Button variant="link" className="text-red-600 p-0 text-sm">
                        See past events
                    </Button>
                </CardContent>
            </Card>

            {/* Affinity Groups */}
            <Card>
                <CardHeader>
                    <CardTitle>Affinity Groups</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {affinityGroups.map((name, i) => (
                            <div key={i} className="space-y-2">
                                <div className="relative w-full aspect-square rounded-lg bg-gray-300">
                                    <Play className="absolute inset-0 m-auto w-8 h-8 text-white opacity-75" />
                                </div>
                                <div className="text-sm font-medium">{name}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
