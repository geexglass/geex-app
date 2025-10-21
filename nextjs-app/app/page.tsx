import { Suspense } from "react";

import { AllPosts } from "@/app/components/Posts";
import { Row } from "@/components/ui/row";
import { TwoColumn } from "@/components/ui/columns";
import { Button } from "@/components/ui/button";
import { VideoNode } from "@/components/ui/video-node";
import { Card } from "@/components/ui/card";
import { WelcomeRow } from "@/app/components/WelcomeRow";

export default async function Page() {
  return (
    <>
        <div className="container py-20 text-center grid grid-cols-1 gap-4">
          <Suspense fallback={<div>Loading...</div>}>
            <WelcomeRow />
          </Suspense>
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
