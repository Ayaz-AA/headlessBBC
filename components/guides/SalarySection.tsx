"use client";

type SalaryRow = {
    industry: string;
    salary: string;
};

type Props = {
    data: {
        heading?: string;
        description?: string | null;
        medianSalary?: string;
        medianSalaryLink?: {
            url?: string;
            title?: string;
            target?: string;
        };
        tableTitle?: string;
        topRow?: {
            col1: string;
            col2: string;
        };
        rows: SalaryRow[];
        source?: string;
    } | null;
};

export default function SalarySection({ data }: Props) {
    if (!data) return null;

    const {
        heading,
        description,
        medianSalary,
        medianSalaryLink,
        tableTitle,
        topRow,
        rows,
        source,
    } = data;

    // 🔥 Inject salary into LAST <p>
    function injectSalary(html: string = "") {
        if (!medianSalary) return html;

        const salaryHtml = medianSalaryLink?.url
            ? `<a href="${medianSalaryLink.url}" target="${medianSalaryLink.target || "_self"
            }" rel="noopener noreferrer" class="median-salary">${medianSalary}</a>`
            : `<strong>${medianSalary}</strong>`;

        const lastIndex = html.lastIndexOf("</p>");

        if (lastIndex === -1) {
            return html + " " + salaryHtml + ".";
        }

        return (
            html.slice(0, lastIndex) +
            " " +
            salaryHtml + "." +
            html.slice(lastIndex)
        );
    }

    const finalDescription = injectSalary(description || "");

    return (
        <section className="container-fluid container-lg hero-background rounded-4 text-center p-lg-5 p-3  my-5">

            {/* Heading */}
            {heading && <h2 className="component-heading mb-3">{heading}</h2>}

            {/* ✅ Description with INLINE salary (FIXED) */}
            {(description || medianSalary) && (
                <div
                    className="regular-para"
                    dangerouslySetInnerHTML={{
                        __html: finalDescription,
                    }}
                />
            )}

            {/* TABLE */}
            <div className="salary-table-wrapper text-start mt-4">

                {/* Table Top Header */}
                {tableTitle && (
                    <div className="salary-table-title">
                        {tableTitle}
                    </div>
                )}

                <table className="table mb-0 salary-table">

                    {/* Column Headers */}
                    <thead>
                        <tr>
                            <th>{topRow?.col1}</th>
                            <th className="text-start">{topRow?.col2}</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Rows */}
                        {rows?.map((row, i) => (
                            <tr key={i}>
                                <td>{row.industry}</td>
                                <td className="text-start ">
                                    {row.salary}
                                </td>
                            </tr>
                        ))}

                        {/* Footer INSIDE table */}
                        {source && (
                            <tr className="salary-source-row">
                                <td colSpan={2}>
                                    <span className="salary-source">
                                        Source: <strong>{source}</strong>
                                    </span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}