import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // * Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  // * Sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, order] = sortByRaw.split("-");
  const sortBy = {
    field,
    order,
  };

  // * Pagination

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // * Query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // * Prefetch next and previous pages
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    const nextPage = page + 1;
    queryClient.prefetchQuery(["bookings", filter, sortBy, nextPage], () =>
      getBookings({ filter, sortBy, page: nextPage })
    );
  }

  if (page > 1) {
    const prevPage = page - 1;
    queryClient.prefetchQuery(["bookings", filter, sortBy, prevPage], () =>
      getBookings({ filter, sortBy, page: prevPage })
    );
  }

  return { isLoading, bookings, error, count };
}
