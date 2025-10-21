import { Button } from "@/components/ui/button"
import { Row } from "@/components/ui/row"
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const WelcomeRow = async () => {
    const session = await auth.api.getSession({
            headers: await headers()
        });
    const name = session?.user?.name || "Guest";
    // todo: fetch user subscription status from database

    return (
        <Row>
            <h2 className="text-left font-bold">Welcome, {name}</h2>
            <Row className="my-auto">
              <Button variant="default" size="lg">
                Glassy University
              </Button>
              <Button variant="secondary" size="lg">
                Individual Subscriber
              </Button>
            </Row>
          </Row>
    )
    
}

export { WelcomeRow }
