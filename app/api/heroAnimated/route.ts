import { NextResponse } from "next/server";

export async function GET() {
    const heroData = {
        title: "Crafting Excellence in Every Stitch",
        subtitle: "Discover a wide range of premium textiles and apparel.",
        backgroundUrl: "/hero-bg.jpg",
        videoUrl: "/apparel.mp4",
    };

    return NextResponse.json(heroData);
}
