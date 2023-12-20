import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  id: number;
  title: string;
  image: string;
  className?: string;
  openInNewTab?: boolean;
}

export function RecipeCard({
  id,
  title,
  image,
  openInNewTab = false,
  className,
}: RecipeCardProps) {
  return (
    <Link href={`/recipes/${id}`} target={openInNewTab ? "_blank" : undefined}>
      <span className="sr-only">{title}</span>
      <article className="group relative h-auto w-full space-y-2 overflow-hidden rounded-lg border after:absolute after:inset-0 after:bg-gradient-to-t after:from-slate-900 after:to-transparent after:content-[''] hover:after:to-50%">
        <Image
          fill
          src={image}
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <header className="absolute bottom-0 z-10 p-3">
          <h3 title={title} className="line-clamp-2 text-xs text-white">
            {title}
          </h3>
        </header>
      </article>
    </Link>
  );
}
