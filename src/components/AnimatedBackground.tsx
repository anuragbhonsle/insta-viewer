import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground = ({ className }: AnimatedBackgroundProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 -z-10 animated-bg overflow-hidden",
        className
      )}
    >
      <div className="absolute top-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 rounded-full bg-primary/10 filter blur-3xl animate-float" />
      <div className="absolute bottom-1/3 left-1/5 w-24 h-24 md:w-48 md:h-48 rounded-full bg-pink-500/10 filter blur-3xl animate-spin-slow" />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 md:w-72 md:h-72 rounded-full bg-purple-500/10 filter blur-3xl animate-pulse-slow" />
    </div>
  );
};

export default AnimatedBackground;
