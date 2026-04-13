import { useEffect, useMemo, useRef } from "react";
import { useLightbox } from "pencere/react";
import { cn } from "../lib/utils";

interface ImageItem {
  type: "image";
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  srcset?: string;
  sizes?: string;
  placeholder?: string;
}

interface ImagePreviewProps {
  item: ImageItem;
  gallery?: ImageItem[];
  useNativeDialog?: boolean;
  loop?: boolean;
  dir?: "ltr" | "rtl";
  nonce?: string;
  buttonClassName?: string;
  wrapperClassName?: string;
  imgClassName?: string;
  imgAttrs?: Record<string, string>;
}

export default function ImagePreview({
  item,
  gallery,
  useNativeDialog = true,
  loop = true,
  dir,
  nonce,
  buttonClassName,
  wrapperClassName,
  imgClassName,
  imgAttrs,
}: ImagePreviewProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const items = useMemo(() => gallery ?? [item], [gallery, item]);
  const startIndex = useMemo(() => {
    const i = items.findIndex((it) => it.src === item.src);
    return i >= 0 ? i : 0;
  }, [items, item.src]);

  const { viewer } = useLightbox({
    items,
    loop,
    useNativeDialog,
    ...(dir && { dir }),
    ...(nonce && { nonce }),
  });

  useEffect(() => {
    viewer.current?.core.setItems(items);
  }, [items, viewer]);

  if (!item || item.type !== "image") {
    return null;
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => {
        void viewer.current?.open(startIndex, buttonRef.current ?? undefined);
      }}
      className={cn("cursor-pointer p-0 border-0 bg-transparent", buttonClassName)}
      aria-label={`Open ${item.alt}`}
    >
      <div className={wrapperClassName}>
        <img
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          srcSet={item.srcset}
          sizes={item.sizes || "100vw"}
          loading="lazy"
          decoding="async"
          className={cn("pointer-events-none", imgClassName)}
          {...imgAttrs}
        />
      </div>
    </button>
  );
}
