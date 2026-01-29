// "use client";

// import { useState } from "react";
// import type { RolePlpVM, FlyoutProgramVM } from "@/lib/rolePlp";
// import ProgramDetailsFlyout from "@/components/programFlyout/ProgramDetailsFlyout";

// export default function RolePlpClient({ vm }: { vm: RolePlpVM }) {
//     const [open, setOpen] = useState(false);
//     const [selected, setSelected] = useState<FlyoutProgramVM | null>(null);

//     return (
//         <>
//             <main>
//                 {/* HERO */}
//                 <section className="hero programs-hero">
//                     <div className="container">
//                         {vm.heroLabel ? <div className="badge team-badge">{vm.heroLabel}</div> : null}

//                         <h1 className="team-hero__titles">
//                             <span className="team-hero__title-line1">{vm.heroTitleLine1 ?? vm.name}</span>{" "}
//                             {vm.heroTitleLine2 ? <span className="team-hero__title-line2">{vm.heroTitleLine2}</span> : null}{" "}
//                             {vm.heroTitleLine3 ? <span className="team-hero__title-line1">{vm.heroTitleLine3}</span> : null}
//                         </h1>

//                         {vm.heroDescription ? <p className="team-hero__intro">{vm.heroDescription}</p> : null}
//                     </div>
//                 </section>

//                 {/* BODY */}
//                 <section className="container py-5">
//                     {vm.bodyHeading ? <h2 className="team-intro-heading">{vm.bodyHeading}</h2> : null}
//                     {vm.bodyPara ? <p className="regular-para mt-2">{vm.bodyPara}</p> : null}

//                     {/* FEATURED PROGRAMS */}
//                     <div className="mt-4">
//                         <h3 className="team-intro-heading">Featured Programs</h3>

//                         <div className="row g-4 mt-1">
//                             {vm.programs.map((p) => (
//                                 <div key={p.slug} className="col-12 col-md-6 col-lg-4">
//                                     <div className="program-card h-100">
//                                         <div className="program-card__media">
//                                             {p.imageUrl ? (
//                                                 <img
//                                                     className="program-card__img"
//                                                     src={p.imageUrl}
//                                                     alt={p.imageAlt || p.title}
//                                                     loading="lazy"
//                                                 />
//                                             ) : (
//                                                 <div className="program-card__placeholder">No image</div>
//                                             )}
//                                         </div>

//                                         <div className="p-3 program-card__body">
//                                             <h4 className="program-card__title">{p.title}</h4>

//                                             {p.heroShortDescription ? (
//                                                 <p className="regular-para mt-2">{p.heroShortDescription}</p>
//                                             ) : null}

//                                             <p className="program-card__meta">
//                                                 {p.programLength ? (
//                                                     <span className="program-card__meta-item">
//                                                         <i className="fa-regular fa-clock" /> {p.programLength}
//                                                     </span>
//                                                 ) : null}

//                                                 {p.averageSalary ? (
//                                                     <span className="program-card__meta-item">
//                                                         <i className="fa-solid fa-dollar-sign" /> {p.averageSalary}
//                                                     </span>
//                                                 ) : null}
//                                             </p>

//                                             <div className="program-card__footer">
//                                                 {/* ✅ NO URL CHANGE */}
//                                                 <button
//                                                     type="button"
//                                                     className="btn btn--outline btn--small program-card__btn"
//                                                     onClick={() => {
//                                                         setSelected(p);
//                                                         setOpen(true);
//                                                     }}
//                                                 >
//                                                     Learn More <i className="fa-solid fa-arrow-right" />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}

//                             {vm.programs.length === 0 ? (
//                                 <div className="col-12">
//                                     <div className="alert alert-light border">No programs found for this role yet.</div>
//                                 </div>
//                             ) : null}
//                         </div>
//                     </div>
//                 </section>
//             </main>

//             <ProgramDetailsFlyout
//                 open={open}
//                 program={selected}
//                 onClose={() => {
//                     setOpen(false);
//                     setSelected(null);
//                 }}
//             />
//         </>
//     );
// }
