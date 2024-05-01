import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useCabins } from "./useCabins";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams() || "all";

  if (isLoading) return <Spinner />;

  if (!cabins) {
    return <Empty resource='Cabins' />;
  }

  // * Filter cabins
  const filterValue = searchParams.get("discount");

  let filteredCabins;

  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  } else {
    filteredCabins = cabins;
  }

  // * Sort cabins
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, order] = sortBy.split("-");

  const sortedCabins = filteredCabins.sort((a, b) => {
    if (order === "asc") {
      return a[field] - b[field];
    } else {
      return b[field] - a[field];
    }
  });

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
