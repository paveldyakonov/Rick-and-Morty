import { Dropdown } from "@components/Dropdown";
import { useCallback, useEffect, useState } from "react";

import classes from "./StatusDropdown.module.scss";

import { filterValues } from "@/config/filter";
import { useRouter } from "next/router";

export const StatusDropdown: React.FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  let value: string | string[] = router.query.status || "0";
  if (typeof value !== "string") {
    value = value[0];
  }

  if (parseInt(value) >= filterValues.length) {
    value = "0";
  }
  const [selected, setSelected] = useState(filterValues[parseInt(value)]);

  useEffect(() => {
    if (typeof value !== "string") {
      value = value[0];
    }
    setSelected(filterValues[parseInt(value)]);
  }, [value]);

  const setStatusInQuery = (value: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, status: value },
    });
  };

  return (
    <div className={classes.filter}>
      <Dropdown
        sortValues={filterValues}
        selected={selected}
        setSelected={(index: number) => {
          setSelected(filterValues[index]);
          setStatusInQuery(String(index));
        }}
        isVisible={isVisible}
        setIsVisible={(isVis: boolean) => setIsVisible(isVis)}
      />
    </div>
  );
};
