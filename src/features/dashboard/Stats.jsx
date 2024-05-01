import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
  const numCheckIns = confirmedStays.length;
  const occupancy =
    confirmedStays.reduce((acc, stay) => acc + stay.numNights, 0) /
    (cabinCount * numDays);
  return (
    <>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title='Check Ins'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={numCheckIns}
      />
      <Stat
        title='Check Outs'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={(occupancy * 100.0).toFixed(2) + "%"}
      />
    </>
  );
}

export default Stats;
