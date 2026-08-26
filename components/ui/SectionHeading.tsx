interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <span
          className={`text-xs font-semibold uppercase tracking-[0.2em] ${
            light ? "text-gold" : "text-gold"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-heading text-3xl sm:text-4xl md:text-[2.75rem] leading-tight ${
          light ? "text-ivory" : "text-forest"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-base sm:text-lg leading-relaxed ${light ? "text-cream/90" : "text-charcoal/75"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
