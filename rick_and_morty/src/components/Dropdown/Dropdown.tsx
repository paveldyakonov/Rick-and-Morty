import { useEffect, useRef } from "react";
import classes from "./Dropdown.module.scss";
import Image from "next/image";
import { BsArrowDownCircle } from "react-icons/bs";

type Props = {
  sortValues: string[];
  selected: string;
  setSelected: (index: number) => void;
  isVisible: boolean;
  setIsVisible: (e: boolean) => void;
};

export const Dropdown: React.FC<Props> = ({
  sortValues,
  selected,
  setSelected,
  isVisible,
  setIsVisible,
}): any => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: any) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={dropdownRef} className={classes.dropdown} onClick={() => setIsVisible(!isVisible)}>
      <button className={classes.dropdown__btn}>
        <span className={classes.dropdown__title}>{selected}</span>
        <div className={classes.dropdown__img}>
          <Image
            className={classes.dropdown__logo}
            alt="logo3"
            src="/images/logo3.png"
            width={60}
            height={60}
          />
          <BsArrowDownCircle />
        </div>
        {isVisible && (
          <div className={classes.dropdown__list}>
            {sortValues.map((value, index) => (
              <div
                onClick={() => setSelected(index)}
                key={value}
                className={
                  value === selected
                    ? `${classes["dropdown__list-value"]} ${classes.selected}`
                    : classes["dropdown__list-value"]
                }
              >
                {value}
              </div>
            ))}
          </div>
        )}
      </button>
    </div>
  );
};
