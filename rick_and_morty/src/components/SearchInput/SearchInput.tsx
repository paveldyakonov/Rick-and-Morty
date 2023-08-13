import React, { useCallback, useEffect, useState } from "react";
import classes from "./SearchInput.module.scss";
import Image from "next/image";

import debounce from "lodash.debounce";
import { useRouter } from "next/router";

type Props = {
  title: string;
};

export const SearchInput: React.FC<Props> = ({ title }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [value, setValue] = useState(router.query.name || "");

  useEffect(() => {
    setValue(router.query.name || "");
  }, [router.query.name]);

  const setSearchInQuery = (value: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, name: value },
    });
  };

  const searchDebounce = useCallback(
    debounce((text: string) => {
      setSearchInQuery(text);
      console.log(text);
    }, 2000),
    [router.query],
  );

  const onChangeInput = (text: string) => {
    setValue(text);
    searchDebounce(text);
  };

  const onClickClear = () => {
    setValue("");
    delete router.query.name;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1 },
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={classes.search}>
      <Image
        alt="search_img"
        width={20}
        height={20}
        src="/images/filters/search.svg"
        className={classes.search__img}
      />
      <input
        ref={inputRef}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeInput(event.target.value)}
        className={classes.search__input}
        type="text"
        placeholder={`Search ${title}`}
      />
      {value && (
        <Image
          onClick={onClickClear}
          alt="cross_img"
          width={20}
          height={20}
          src="/images/filters/cross.png"
          className={classes.search__cross}
        />
      )}
    </div>
  );
};
