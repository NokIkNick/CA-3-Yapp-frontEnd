import ThreadItem from "./Threaditems"
export default function Items({ items, goToThread, goToUser }) {
    return (
        <>
            {items && items.map((item) => (
                <ThreadItem
                    key={item.id}
                    item={item}
                    goToThread={goToThread}
                    goToUser={goToUser}
                />
            ))}
        </>
    )
}