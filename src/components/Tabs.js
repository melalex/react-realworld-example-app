import { handleWithoutPropagation } from "../utils/utilityFunctions";

const ACTIVE_TAB = "nav-link active";
const TAB = "nav-link";

function Tab({ tabId, displayName, isSelectedValue, setValue }) {
  const tabClass = isSelectedValue ? ACTIVE_TAB : TAB;

  return (
    <li class="nav-item">
      <a
        class={tabClass}
        onClick={handleWithoutPropagation(() => setValue(tabId))}
      >
        {displayName}
      </a>
    </li>
  );
}

export default function Tabs({ values, selectedValue, setValue }) {
  return (
    <div class="feed-toggle">
      <ul class="nav nav-pills outline-active">
        {values.map((it) => (
          <Tab
            tabId={it.id}
            displayName={it.displayName}
            isSelectedValue={it.id == selectedValue}
            setValue={setValue}
          />
        ))}
      </ul>
    </div>
  );
}
