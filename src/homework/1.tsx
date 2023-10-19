import React, { useEffect, useRef } from "react";

interface ObserverProps {
  children: React.ReactElement;
  onContentEndVisible: () => void;
}

export function Observer({ children, onContentEndVisible }: ObserverProps) {
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    interface optionType {
      rootMargin: string;
      threshold: number;
      root: null;
    }

    const options: optionType = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
