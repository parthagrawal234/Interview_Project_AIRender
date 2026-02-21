const BackgroundShapes = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-black">
        {/* Abstract Asterisk */}
        <svg className="bg-shape float-slow text-[#3B82F6] top-[10%] left-[5%] w-32 h-32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5l-10 14M22 12H2M19 19L5 5" />
        </svg>

        {/* Abstract Plus */}
        <svg className="bg-shape float-medium text-[#FF4500] top-[60%] left-[80%] w-48 h-48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
        </svg>

        {/* Abstract ZigZag / Spring */}
        <svg className="bg-shape float-fast text-[#FFD700] top-[80%] left-[15%] w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>

        {/* Abstract Triangle Outline */}
        <svg className="bg-shape float-slow text-[#10B981] top-[20%] right-[10%] w-40 h-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        </svg>

        {/* Abstract Circle Outline */}
        <svg className="bg-shape float-medium text-white top-[40%] left-[40%] w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
        </svg>
    </div>
)

export default BackgroundShapes
