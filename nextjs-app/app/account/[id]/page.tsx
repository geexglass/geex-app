'use client';

import { authClient } from "@/lib/auth-client";
import {useParams} from "next/navigation";

export default function UserPage({ params }: { params: { id: string } }) {
    const { data: session } = authClient.useSession();
    const { id } = useParams();

    if (!session?.user || session.user?.id !== id) {
      // todo: handle for public users
      return (
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-1 items-center justify-center">
              User not found, or not public
            </div>
          </div>
          )
    }

          return (
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-xs">
                <h1>User ID: {session?.user?.id}</h1>
                <h2>User Name: {session?.user?.name}</h2>
                <h3>User Email: {session?.user?.email}</h3>
              </div>
            </div>
          </div>
          );
          }