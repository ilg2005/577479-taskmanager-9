export const getFiltersMarkup = (filtersArray) => (`
      <section class="main__filter filter container">
        ${filtersArray.map((filter) => `
        <input
          type="radio"
          id="filter__${filter.title}"
          class="filter__input visually-hidden"
          name="filter"
          ${(filter.title === `all`) ? `checked` : `disabled`}
        />
        <label for="filter__${filter.title}" class="filter__label">
          ${filter.title} <span class="filter__${filter.title}-count">${filter.count}</span></label
        >`).join(``)}
      </section>
`);
