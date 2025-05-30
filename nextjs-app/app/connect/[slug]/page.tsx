import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const relatedEvents = [
    {
        date: "October 9",
        title: "Writing Center Consults",
        time: "12:00–4:00pm",
    },
    {
        date: "October 16",
        title: "Writing Center Consults",
        time: "12:00–4:00pm",
    },
]

const relatedResources = [
    { name: "Resource Name", tags: ["tag", "tag"] },
    { name: "Resource Name", tags: ["tag", "tag"] },
]

export default function EventDetailPage() {
    return (
        <div className="p-6 space-y-10">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">Event or Program Detail</h1>
                <p className="text-sm text-muted-foreground">Connect description</p>
            </div>

            <Card>
                <CardContent className="flex flex-col md:flex-row gap-6 mt-4">
                    {/* Text side */}
                    <div className="flex-1 space-y-4">
                        <h2 className="text-xl font-semibold">
                            Flame Affinity Group: The Changing Landscape of Flameworking
                        </h2>
                        <div className="space-y-1 text-sm text-muted-foreground">
                            <p>June 24, 2023</p>
                            <p>6:00–7:30pm US-Central</p>
                            <p>Online</p>
                        </div>
                        <p className="text-sm">
                            German is a self-taught citizen artist working across sculpture, performance, communal rituals, immersive
                            installation, and photography, in order to repair and reshape disrupted systems, spaces, and connections.
                        </p>
                    </div>
                    {/* Placeholder media */}
                    <div
                        className={cn(
                            "w-full md:w-1/3 aspect-video rounded-lg border-4 border-red-500 bg-orange-300 m-8"
                        )}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Register for Event</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg border-border p-6 space-y-4">
                        <div className="flex items-start space-x-4">
                            <Button>Log in</Button>
                            <p className="text-sm text-muted-foreground">
                                Not logged in? Make a GEEX account to join free community programming and save resources to your account.
                            </p>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Button>Sign up</Button>
                            <p className="text-sm text-muted-foreground">
                                Add this event to your calendar, after reading the Code of Conduct.
                            </p>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Button>Book now!</Button>
                            <p className="text-sm text-muted-foreground">Save your spot! Make a payment here.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Related Events</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-6 overflow-x-auto">
                        {relatedEvents.map((ev, i) => (
                            <div key={i} className="flex-shrink-0 w-40 space-y-2">
                                <div
                                    className={cn(
                                        "w-full aspect-square rounded-lg border-4 border-red-500 bg-orange-300"
                                    )}
                                />
                                <p className="text-sm font-medium">{ev.date}</p>
                                <p className="text-sm">{ev.title}</p>
                                <p className="text-sm text-muted-foreground">{ev.time}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Related Resources</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-6 overflow-x-auto">
                        {relatedResources.map((res, i) => (
                            <div key={i} className="flex-shrink-0 w-40 space-y-1">
                                <div
                                    className={cn(
                                        "w-full aspect-square rounded-lg border-4 border-red-500 bg-orange-300"
                                    )}
                                />
                                <p className="text-sm font-medium">{res.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    [{res.tags.join(", ")}]
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}