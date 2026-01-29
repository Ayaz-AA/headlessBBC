"use client";

type Props = {
    currentPage: number;
    totalPages: number;
    basePath: string;
};

export default function Pagination({ currentPage, totalPages, basePath }: Props) {
    const makeHref = (p: number) => (p <= 1 ? basePath : `${basePath}?page=${p}`);

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="bbc-pagination" aria-label="Pagination">
            <a
                className={`bbc-page ${currentPage <= 1 ? "is-disabled" : ""}`}
                href={currentPage <= 1 ? "#" : makeHref(currentPage - 1)}
                aria-disabled={currentPage <= 1}
            >
                Prev
            </a>

            {pages.map((p) => (
                <a
                    key={p}
                    className={`bbc-page ${p === currentPage ? "is-active" : ""}`}
                    href={makeHref(p)}
                    aria-current={p === currentPage ? "page" : undefined}
                >
                    {p}
                </a>
            ))}

            <a
                className={`bbc-page ${currentPage >= totalPages ? "is-disabled" : ""}`}
                href={currentPage >= totalPages ? "#" : makeHref(currentPage + 1)}
                aria-disabled={currentPage >= totalPages}
            >
                Page Next
            </a>
        </nav>
    );
}
