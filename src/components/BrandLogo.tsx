export function BrandLogo({ src }: { src?: string }) {
  return src ? <img src={src} alt="" aria-hidden="true" className="brand-logo" width={40} height={40} loading="lazy" decoding="async" /> : null;
}
