import { Breadcrumbs } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Links } from "src/configs/g_types/types";

import { textcolor } from "src/configs/theme/palette";

const Crumbs = ({ links }: { links: Array<Links> }) => {
  const router = useRouter();
  return (
    <Breadcrumbs sx={{ mb: 6 }}>
      {links.map((item, i) =>
        item.path ? (
          <span
            key={i}
            style={{
              color: textcolor.primary_text,
              cursor: "pointer",
            }}
            onClick={() => router.back()}
          >
            {item.title}
          </span>
        ) : (
          <span
            key={i}
            style={{
              color: textcolor.secondary_text,
              cursor: "default",
            }}
          >
            {item.title}
          </span>
        )
      )}
    </Breadcrumbs>
  );
};

export default Crumbs;
