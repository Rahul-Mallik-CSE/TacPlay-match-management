/** @format */

import type { Metadata } from "next";
import BookingListTable from "@/components/BookingListComponents/BookingListTable";

export const metadata: Metadata = {
  title: "Bookings",
  description:
    "View and manage all player bookings for your TACPlay arena. Track payment status and session details.",
  openGraph: {
    title: "Bookings | TACPlay",
    description:
      "View and manage all player bookings.",
    url: "/booking-list",
  },
};

const BookingListPage = () => {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <BookingListTable />
      </div>
    </div>
  );
};

export default BookingListPage;
