import {ErrorCard} from "@/components/error-card";

export default function Forbidden() {
    return (
        <ErrorCard title="Forbidden" description="You do not have permission to access this page." />
    );
}
