import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { HiArrowDownOnSquare } from "react-icons/hi2";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBooking();
  const [paidOnFirstLoad, setPaidOnFirstLoad] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(booking?.isPaid || false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setPaidOnFirstLoad(booking?.isPaid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numGuests * numNights || 0;
  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            disabled={isCheckingIn}
            checked={addBreakfast}
            id='breakfast'
            onChange={() => {
              setAddBreakfast((prev) => {
                if (!prev === true) {
                  setConfirmPaid(false);
                  return true;
                }
                setConfirmPaid(paidOnFirstLoad);
                return false;
              });
            }}>
            Want to add breakfast for an additional{" "}
            {formatCurrency(optionalBreakfastPrice)}?
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          disabled={(paidOnFirstLoad && !addBreakfast) || isCheckingIn}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prev) => !prev)}
          id='confirm'>
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(
            totalPrice + (addBreakfast ? optionalBreakfastPrice : 0)
          )}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button
          icon={<HiArrowDownOnSquare />}
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
