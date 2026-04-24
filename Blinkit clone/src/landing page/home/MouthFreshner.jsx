import CategoryRow from "../CategoryRow.jsx"

export default function MouthFreshner() {
    const items = [
        { id:1,img: "rowImages/first.avif", title: "prod 1", desc: "1 unit (32 pieces)", price: 50 },
        { id:2,img: "rowImages/second.avif", title: "prod 2", desc: "1 pack (32+32 pieces)", price: 50 },
        { id:3,img: "rowImages/third.avif", title: "prod 3", desc: "1 pack (32+32 pieces)", price: 150 },
        { id:4,img: "rowImages/fourth.avif", title: "prod 4", desc: "1 pack (32+32 pieces)", price: 150 },
        { id:5,img: "rowImages/fifth.avif", title: "prod 5", desc: "1 pack (32+32 pieces)", price: 150 },
        { id:6,img: "rowImages/sixth.avif", title: "prod 6", desc: "1 pack (32+32 pieces)", price: 150 },
        { id:7,img: "rowImages/seventh.avif", title: "prod 7", desc: "1 pack (32+32 pieces)", price: 150 },
        { id:8,img: "rowImages/eighth.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
        { id:9,img: "rowImages/ninth.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
        { id:10,img: "rowImages/tenth.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
        { id:11,img: "rowImages/eleventh.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
        { id:12,img: "rowImages/tweleveth.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
        { id:13,img: "rowImages/thirteen.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
        { id:14,img: "rowImages/fourteen.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
        { id:15,img: "rowImages/fifteen.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
        { id:16,img: "rowImages/sixteen.avif", title: "Classic Filter Tips & Rolling Paper (King Size) - RAW", desc: "1 pack (32+32 pieces)", price: 150 },
    ]

    return (
        <div className="p-6">
            <CategoryRow category="Mouth freshner" items={items} />
        </div>
    )
}
