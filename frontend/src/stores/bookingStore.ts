import { create } from "zustand";
import { Train } from "@/utils/types";

interface BookingState {
  bookings: Train[];
  addBooking: (train: Train) => void;
  removeBooking: (trainId: string) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  addBooking: (train) =>
    set((state) => ({
      bookings: [...state.bookings, train],
    })),
  removeBooking: (trainId) =>
    set((state) => ({
      bookings: state.bookings.filter((train) => train.id !== trainId),
    })),
}));
