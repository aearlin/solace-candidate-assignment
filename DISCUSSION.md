I ended up focussing entirely on UI. There are other things that I would have liked to have worked on, too.

1. Performance.
  * The biggest performance improvement would be to query for a filtered list rather than querying for a full list and filtering it.
  * Use `unbounce` or something like it, so that we don't refilter (or requery) for every keystroke. Instead, wait until the typing is paused.
  * Pagination. We don't need to fetch all results right away. 
2. Tests. There are no unit tests, and there should be.