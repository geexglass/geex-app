import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AccountPage() {
    return (
        <div className="p-6 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold">Welcome, Firstname Lastname!</h1>
                <div className="flex space-x-2">
                    <Button variant="outline">Glassy University</Button>
                    <Button variant="secondary">Institutional Subscriber</Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Contact GEEX Support</CardTitle>
                    <CardDescription>
                        Email{" "}
                        <a href="mailto:support@geex.glass" className="underline">
                            support@geex.glass
                        </a>{" "}
                        with any questions that you have about account access.
                    </CardDescription>
                    <CardDescription>
                        <a href="#" className="text-sm underline">
                            Subscriber Archive FAQs
                        </a>
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Change profile info/settings</h2>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { id: "firstName", label: "First Name", type: "text" },
                                { id: "email", label: "Email", type: "email" },
                                { id: "lastName", label: "Last Name", type: "text" },
                                { id: "password", label: "Password", type: "password" },
                                { id: "field3", label: "Field 3", type: "text" },
                                { id: "field6", label: "Field 6", type: "text" },
                            ].map(({ id, label, type }) => (
                                <div key={id} className="space-y-1">
                                    <Label htmlFor={id}>{label}</Label>
                                    <Input id={id} type={type} />
                                </div>
                            ))}

                            <div className="col-span-full">
                                <Button>Save changes</Button>
                            </div>
                        </form>
                    </div>

                    {/* Orders table */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">My orders + bookings</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    {
                                        date: "3/12/23",
                                        desc: "Writing Center Consult",
                                        price: "$30.00",
                                    },
                                    { date: "4/5/23", desc: "GEEX Shop Mug", price: "$34.39" },
                                ].map((o, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{o.date}</TableCell>
                                        <TableCell>{o.desc}</TableCell>
                                        <TableCell>{o.price}</TableCell>
                                        <TableCell className="space-x-2">
                                            <Button variant="link" size="sm">
                                                Manage booking
                                            </Button>
                                            <Button variant="link" size="sm">
                                                View receipt
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">My Institution</h2>
                        <p>
                            You are currently connected to{" "}
                            <a href="#" className="underline">
                                Glassy University
                            </a>{" "}
                            through 7/1/2023.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                            More words about my Institution here
                        </p>
                        <p className="text-sm text-muted-foreground">Your Institution Admin is</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}