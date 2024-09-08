/** @jsxImportSource @emotion/react */
import _ from "lodash";

import { extractUrlFromString } from "@/utils/strings";
import { Typography } from "@mui/material";

interface StringWithLinkProps {
  str: string;
}

export const StringWithExternalUrl = ({ str }: StringWithLinkProps) => {
  const externalUrl = extractUrlFromString(str);

  if (externalUrl) {
    const newStr = _.replace(str, externalUrl, "");
    newStr.trim().concat(":");
    return (
      <Typography variant="subtitle2">
        {newStr}
        <a
          href={externalUrl}
          target={"_blank"}
          rel="noopener noreferrer external"
        >
          {externalUrl}
        </a>
      </Typography>
    );
  }

  return <Typography variant="subtitle2">{str}</Typography>;
};
