import { Dropdown } from "@components/Dropdown";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

type Props = {
  values: string[];
  queryParam: string;
};

export const IndexDropdown: React.FC<Props> = ({ values, queryParam }) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  let value: string | string[] = router.query[queryParam] || "0";
  if (typeof value !== "string") {
    value = value[0];
  }

  if (Number(value) && Number(value) >= values.length) {
    value = "0";
  }
  if (!Number(value)) {
    value = "0";
  }

  const [selected, setSelected] = useState(values[Number(value)]);

  useEffect(() => {
    if (typeof value !== "string") {
      value = value[0];
    }
    setSelected(values[Number(value)]);
  }, [value]);

  const setStatusInQuery = (value: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, [queryParam]: value },
    });
  };

  return (
    <div>
      <Dropdown
        sortValues={values}
        selected={selected}
        setSelected={(index: number) => {
          setSelected(values[index]);
          setStatusInQuery(String(index));
        }}
        isVisible={isVisible}
        setIsVisible={(isVis: boolean) => setIsVisible(isVis)}
      />
    </div>
  );
};
