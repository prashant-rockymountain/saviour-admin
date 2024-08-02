import { Breadcrumbs } from "@mui/material";
import Link from "next/link";
import React from "react";
import { Links } from "src/configs/g_types/types";

import { textcolor } from "src/configs/theme/palette";

const Crumbs = ({ links }: { links: Array<Links> }) => {
  return (
    <Breadcrumbs>
      {links.map((item, i) =>
        item.path ? (
          <Link key={i} href={item.path}>
            {item.title}
          </Link>
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
