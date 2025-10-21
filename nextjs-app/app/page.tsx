import { Suspense } from "react";

import { AllPosts } from "@/app/components/Posts";
import { Row } from "@/components/ui/row";
import { TwoColumn } from "@/components/ui/columns";
import { Button } from "@/components/ui/button";
import { VideoNode } from "@/components/ui/video-node";
import { Card } from "@/components/ui/card";

export default async function Page() {
  return (
    <>
        <div className="container py-20 text-center grid grid-cols-1 gap-4">
          <Row>
            <h1 className="text-4xl font-bold">Welcome, FirstName</h1>
            <Row>
              <Button variant="default" size="lg">
                Glassy University
              </Button>
              <Button variant="default" size="lg">
                Individual Subscriber
              </Button>
            </Row>
          </Row>
          <VideoNode videoUrl="https://www.youtube.com/watch?v=lPLyPGwavMU" title="My Video" subtitle="My Video Subtitle"/>
          <TwoColumn>
            <Card>
              <h2>Column 1</h2>
              <p>Content for the first column.</p>
            </Card>
            <Card>
              <h2>Column 2</h2>
              <p>Content for the second column.</p>
            </Card>
          </TwoColumn>
        </div>
      <div className="border-t border-gray-10">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>
              <AllPosts />
            </Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
