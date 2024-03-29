import {
  handleAndPreventDefault,
} from "../utils/utilityFunctions";

const ACTIVE_PAGE_ITEM = "page-item active";
const PAGE_ITEM = "page-item";

function PageSelector({ pageNumber, isSelected, setPage }) {
  const pageClass = isSelected ? ACTIVE_PAGE_ITEM : PAGE_ITEM;

  return (
    <li className={pageClass}>
      <a
        className="page-link"
        href=""
        onClick={handleAndPreventDefault(
          () => !isSelected && setPage(pageNumber)
        )}
      >
        {pageNumber}
      </a>
    </li>
  );
}

export default function Pagination({ pagesCount, currenPage, setPage }) {
  if (pagesCount < 2) return <></>;
  else
    return (
      <ul className="pagination">
        {[...Array(pagesCount).keys()]
          .map((it) => it + 1)
          .map((it) => (
            <PageSelector
              key={it}
              pageNumber={it}
              isSelected={currenPage === it}
              setPage={setPage}
            />
          ))}
      </ul>
    );
}
