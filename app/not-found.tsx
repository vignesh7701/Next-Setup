import Link from "next/link";


// Not Found can be put into any app page as this naming convention and can be called with notFound() from 'next/navigation'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-8 font-sans text-center p-8">
            <div
                className="text-[clamp(120px,28vw,520px)] font-black leading-[0.9] tracking-[-0.02em]"
                aria-hidden
            >
                404
            </div>

            <Link
                href="/"
                className="inline-block text-sm font-bold tracking-[0.35em] uppercase no-underline text-[#addde0]"
            >
                <span className="inline-block pb-2 border-b-2 border-[rgba(232,217,214,0.25)]">
                    Back Home
                </span>
            </Link>
        </div>
    );
}
