"use client";

import Link from "next/link";
import BaseHero from "@/components/ui/BaseHero";
import type { HomepageFieldsGroup } from "@/lib/homepage";

interface HeroProps {
  data?: HomepageFieldsGroup | null;
}

export default function Hero({ data }: HeroProps) {
  const hero = data?.heroSection;

  const label = hero?.heroLabel?.trim() || "";
  const titleLine1 = hero?.titleLine1?.trim() || "";
  const titleLine2 = hero?.titleLine2?.trim() || "";
  const subtitle = hero?.heroSubtitle?.trim() || "";
  const intro = hero?.heroParagraph?.trim() || "";

  const button1Text = hero?.button1Text?.trim() || "";
  const button1Url = hero?.button1Url?.trim() || "#";

  const button2Text = hero?.button2Text?.trim() || "";
  const button2Url = hero?.button2Url?.trim() || "#";

  const imageUrl = hero?.heroImage?.node?.sourceUrl || "";
  const imageAlt = hero?.heroImage?.node?.altText || "";

  return (
    <BaseHero
      label={label || subtitle}
      titleLine1={titleLine1}
      titleLine2={titleLine2}
      subtitle={subtitle}
      intro={intro}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
      layout="6-6"
      actions={
        <>
          {button1Text && (
            <Link href={button1Url} className="btn btn--primary py-3  mt-0 px-4">
              {button1Text}
            </Link>
          )}

          {button2Text && (
            <Link href={button2Url} className="btn py-3  mt-0 btn--secondary">
              {button2Text}
            </Link>
          )}
        </>
      }
    />
  );
}