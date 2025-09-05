"use client";

import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    // Dynamically import Bootstrap JS only on the client
    import("bootstrap/dist/js/bootstrap.bundle.min.js").catch(() => {
      // Silently ignore if import fails
    });
  }, []);

  return null;
}


