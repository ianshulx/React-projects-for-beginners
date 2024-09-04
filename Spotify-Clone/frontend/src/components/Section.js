import { NavLink } from "react-router-dom";
import SongItem from "./SongItem";
import Title from "./Title";
import { useEffect } from "react";

function Section({ title, more = false, items, reverse }) {
  useEffect(() => {
    console.log(items);
  });
  return (
    <section>
      <Title title={title} more={more} />
      {items && (
        <div className="grid grid-cols-5 gap-x-6 gap-y-5">
          {reverse
            ? items
                .toReversed()
                .map((item, num) => <SongItem item={item} key={num} />)
            : items.map((item, num) => <SongItem item={item} key={num} />)}
        </div>
      )}
    </section>
  );
}

export default Section;
