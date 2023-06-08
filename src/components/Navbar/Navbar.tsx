"use client";

import Image from "next/image";
import Link from "next/link";

import tatilLogo from "@/assets/logo.png";
import { BodyTextAlt2, H1, H2 } from "../Typography";
import { Button } from "../Button";

export function Navbar() {
  return (
    <div className="h-[85px] flex justify-between px-8 lg:px-11 w-full shadow-lg shadow-tatil-grey items-center">
      <div className="flex items-center gap-x-8">
        <Link href="/">
          <Image
            src={tatilLogo}
            alt="tatil-logo"
            width={88}
            height={45}
            className="w-[88px] h-[45px] lg:w-[103px] lg:h-[53px] object-contain flex-shrink-0"
          />
        </Link>
        <H2 className="text-[0.75rem] md:text-[1rem] lg:text-[1.25rem] transition-all">
          Whole Life Insurance the <span className="text-tatil-red">smart</span>{" "}
          way
        </H2>
      </div>
      <Button
        variant="secondary"
        className="hidden lg:block rounded-[100px] h-[43px]"
        onClick={() => {}}
      >
        Get Advice
      </Button>
    </div>
  );
}
