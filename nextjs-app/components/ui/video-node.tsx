import { Card } from "./card";
import { Row } from "./row";

export const VideoNode = ({videoUrl, title, subtitle, className}: {videoUrl: string, title: string, subtitle: string, className?: string}) => {
    if (!videoUrl) {
        return null;
    }

    if (videoUrl.includes('youtube.com')) {
        // Split query params off the url and select the video id
        const urlObj = new URL(videoUrl);
        const videoId = urlObj.searchParams.get('v');

        if (!videoId) {
            return <p>Invalid YouTube URL</p>;
        }

        return (
            <Card className={className}>
                <div className="flex flex-col align-center">
                    <iframe
                        height={480}
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                    <div className="flex-col text-left py-4">
                        <h3>{title}</h3>
                        <p>{subtitle}</p>
                    </div>
                </div>
            </Card>
        );
    }

    // todo: ensure support for sanity hosted videos
    return (
        <Card>
            <video controls>
                <source src="path-to-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </Card>
    );
}