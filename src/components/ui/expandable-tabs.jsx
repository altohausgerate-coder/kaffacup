import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "../../lib/utils";

const buttonVariants = {
  initial: { gap: 0, paddingLeft: ".5rem", paddingRight: ".5rem" },
  animate: (isSelected) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-white",
  onChange,
}) {
  const [selected, setSelected] = React.useState(null);
  const outsideClickRef = React.useRef(null);

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
    onChange?.(null);
  });

  const handleSelect = (index, tab) => {
    setSelected(index);
    onChange?.(index);
    if (tab.action) {
      tab.action();
      if (tab.resetOnAction) {
        setTimeout(() => setSelected(null), 600);
      }
    }
  };

  const Separator = () => (
    <div className="mx-1 h-[20px] w-[1px] bg-white/20" aria-hidden="true" />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 p-1",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={selected === index}
            onClick={() => handleSelect(index, tab)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-xl py-2 text-sm font-medium transition-colors duration-300",
              selected === index
                ? cn("bg-white/15", activeColor)
                : "text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            <Icon size={18} />
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
