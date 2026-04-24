import CategoryRow from "../CategoryRow.jsx"

export default function RollingPapers() {
    const items = [
        { id: 17, img: "rowImages/first.avif", title: "prod 1", desc: "1 unit (32 pieces)", price: 50 },
        { id: 18, img: "rowImages/second.avif", title: "prod 2", desc: "1 pack (32+32 pieces)", price: 50 },
        { id: 19, img: "rowImages/third.avif", title: "prod 3", desc: "1 pack (32+32 pieces)", price: 150 },
        { id: 20, img: "rowImages/fourth.avif", title: "prod 4", desc: "1 pack (32+32 pieces)", price: 150 },
        { id: 21, img: "rowImages/fifth.avif", title: "prod 5", desc: "1 pack (32+32 pieces)", price: 150 },
        { id: 22, img: "rowImages/sixth.avif", title: "prod 6", desc: "1 pack (32+32 pieces)", price: 150 },
        { id: 23, img: "rowImages/seventh.avif", title: "prod 7", desc: "1 pack (32+32 pieces)", price: 150 },
        { id: 24, img: "rowImages/eighth.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
        { id: 25, img: "rowImages/ninth.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
        { id: 26, img: "rowImages/tenth.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
        { id: 27, img: "rowImages/eleventh.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
        { id: 28, img: "rowImages/tweleveth.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
        { id: 29, img: "rowImages/thirteen.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
        { id: 30, img: "rowImages/fourteen.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
        { id: 31, img: "rowImages/fifteen.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
      ];
      

    return (
        <div className="p-6">
            <CategoryRow category="Rolling paper" items={items} />
        </div>
    )
}
