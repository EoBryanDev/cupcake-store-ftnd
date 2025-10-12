"use client";

import Image from "next/image";

interface BannerProps {
  src: string;
  alt?: string;
}

const PromoBanner = ({ src, alt = "Promotional Banner" }: BannerProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      className="h-full w-full rounded-lg object-cover" // ✅ Adicione rounded-lg para estética
    />
  );
};

export { PromoBanner };
