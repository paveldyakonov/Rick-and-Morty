import { Dropdown } from "@components/Dropdown";
import { useCallback, useEffect, useState } from "react";

import classes from "./GenderDropdown.module.scss";

import { genderValues } from "@/config/filter";
import { useRouter } from "next/router";

export const GenderDropdown: React.FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  let value: string | string[] = router.query.gender || "0";
  if (typeof value !== "string") {
    value = value[0];
  }

  if (parseInt(value) >= genderValues.length) {
    value = "0";
  }
  const [selected, setSelected] = useState(genderValues[parseInt(value)]);

  useEffect(() => {
    if (typeof value !== "string") {
      value = value[0];
    }
    setSelected(genderValues[parseInt(value)]);
  }, [value]);

  const setStatusInQuery = (value: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, gender: value },
    });
  };

  return (
    <div className={classes.filter}>
      <Dropdown
        sortValues={genderValues}
        selected={selected}
        setSelected={(index: number) => {
          setSelected(genderValues[index]);
          setStatusInQuery(String(index));
        }}
        isVisible={isVisible}
        setIsVisible={(isVis: boolean) => setIsVisible(isVis)}
      />
    </div>
  );
};
