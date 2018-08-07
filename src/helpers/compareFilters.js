
export const filtersAreSame = (oldFilters, newFilters) => {
    let filtersSame = true;
    let of = {...oldFilters};
    let nf = {...newFilters};

    delete of.allCategories;
    delete nf.allCategories;

    for (const filter in of) {
        if(of[filter] !== nf[filter]){
            filtersSame = false;
            break;
        }
    }
    return filtersSame;
};
