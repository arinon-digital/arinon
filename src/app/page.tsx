'use client';

import React, { useEffect, useState } from "react";
import Home1 from "./pages/homePages/Home1";
import RoutesScrollToTop from "./components/utilities/RoutesScrollToTop";
import Dependency from "./components/utilities/Dependency";
import Preloader from "./components/utilities/Preloader";

export default function Page() {
  // Preloader 
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1200)
  }, [])

  return (
    <>
      {isLoading ? <Preloader /> :
        <>
          <Home1 />
          <RoutesScrollToTop />
          <Dependency />
        </>
      }
    </>
  );
}
