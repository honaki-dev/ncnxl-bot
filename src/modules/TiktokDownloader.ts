import axios from "axios";
import { Readable } from "stream";

function extractVideoId(url: string) {
    const regex = /\/video\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export async function getTikTokData(videoUrl: string): Promise<any> {
    try {
        const videoId = extractVideoId(videoUrl);
        if (!videoId) {
            throw new Error("Invalid TikTok URL");
        }

        const apiUrl = "https://www.tikwm.com/api/";
        const response = await axios.post(apiUrl, {
            url: videoUrl,
            hd: 1,
        });

        if (response.data.code !== 0) {
            throw new Error("Failed to get video information");
        }

        return response.data.data;
    } catch (error) {
        console.error("Error fetching data:", (error as Error).message);
        throw error;
    }
}

export async function downloadVideo(videoData: any): Promise<Readable> {
    try {
        const videoDownloadUrl = videoData.hdplay || videoData.play;

        const { data } = await axios({
            method: "GET",
            url: videoDownloadUrl,
            responseType: "stream",
        });

        return data;
    } catch (error) {
        console.error("❌ Error:", (error as Error).message);
        throw error;
    }
}

export async function download(url: string) {
    const videoData = await getTikTokData(url);
    const videoStream = await downloadVideo(videoData);
    return videoStream;
}
