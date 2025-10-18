import {createAuthClient} from "better-auth/react";
import {adminClient, organizationClient, emailOTPClient} from "better-auth/client/plugins";

export const authClient = createAuthClient({
    plugins: [
        adminClient(),
        organizationClient(),
        emailOTPClient(),
    ]
})