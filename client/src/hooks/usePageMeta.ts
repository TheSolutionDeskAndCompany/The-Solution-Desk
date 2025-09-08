import { useEffect } from "react";

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);

      // Basic OG tags
      const setOg = (property: string, content: string) => {
        let og = document.querySelector(`meta[property='${property}']`) as HTMLMetaElement | null;
        if (!og) {
          og = document.createElement('meta');
          og.setAttribute('property', property);
          document.head.appendChild(og);
        }
        og.setAttribute('content', content);
      };
      setOg('og:title', title);
      setOg('og:description', description);
    }
  }, [title, description]);
}

