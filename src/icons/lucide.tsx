interface LucideIconOptions {
  size: number;
  slot?: string;
  styles?: Record<string, string>;
}

export function LucideIcon(
  icon: string,
  options: LucideIconOptions = { size: 24, slot: "", styles: {} },
) {
  return (
    <div
      style={{
        width: options.size + "px",
        height: options.size + "px",
        ...options.styles,
      }}
      dangerouslySetInnerHTML={{ __html: icon }}
    ></div>
  );
}
