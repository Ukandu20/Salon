import React, { useState, useEffect } from 'react';
import classes from './dashboard.module.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAll, getBookingCountByMonth, getTotalUserCount, getTotalUserCountByMonth, getUniqueUserCount, getUniqueUserCountByMonth } from '../../bookingService';
import { DatePickerWithRange } from './DatePickerWithRange';
import { DataTable } from './DataTable';

export default function Dashboard() {
  const [totalBookings, setTotalBookings] = useState(0);
  const [monthlyBookings, setMonthlyBookings] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [uniqueUsers, setUniqueUsers] = useState(0);
  const [bookingGrowthPercentage, setBookingGrowthPercentage] = useState(0);
  const [totalUserGrowthPercentage, setTotalUserGrowthPercentage] = useState(0);
  const [uniqueUserGrowthPercentage, setUniqueUserGrowthPercentage] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const bookingsData = await getAll();
        setBookings(bookingsData); // Set the booking details
        setFilteredBookings(bookingsData); // Set the filtered bookings
        setTotalBookings(bookingsData.length); // Set the total number of bookings

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

        const currentMonthCount = await getBookingCountByMonth(currentYear, currentMonth);
        setMonthlyBookings(currentMonthCount); // Set the total number of bookings for the current month

        const previousMonthCount = await getBookingCountByMonth(previousYear, previousMonth);
        const bookingGrowth = previousMonthCount === 0 ? 100 : ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;
        setBookingGrowthPercentage(bookingGrowth.toFixed(1)); // Set the booking growth percentage

        const totalUserCount = await getTotalUserCount();
        setTotalUsers(totalUserCount); // Set the total number of users

        const currentTotalUserCount = await getTotalUserCountByMonth(currentYear, currentMonth);
        const previousTotalUserCount = await getTotalUserCountByMonth(previousYear, previousMonth);
        const totalUserGrowth = previousTotalUserCount === 0 ? 100 : ((currentTotalUserCount - previousTotalUserCount) / previousTotalUserCount) * 100;
        setTotalUserGrowthPercentage(totalUserGrowth.toFixed(1)); // Set the total user growth percentage

        const uniqueUserCount = await getUniqueUserCount();
        setUniqueUsers(uniqueUserCount); // Set the total number of unique users

        const currentUniqueUserCount = await getUniqueUserCountByMonth(currentYear, currentMonth);
        const previousUniqueUserCount = await getUniqueUserCountByMonth(previousYear, previousMonth);
        const uniqueUserGrowth = previousUniqueUserCount === 0 ? 100 : ((currentUniqueUserCount - previousUniqueUserCount) / previousUniqueUserCount) * 100;
        setUniqueUserGrowthPercentage(uniqueUserGrowth.toFixed(1)); // Set the unique user growth percentage
      } catch (error) {
        console.error('Error fetching bookings data:', error);
      }
    };

    fetchBookingsData();
  }, []);

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      const filtered = bookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return bookingDate >= dateRange.from && bookingDate <= dateRange.to;
      });
      setFilteredBookings(filtered);
      setCurrentPage(1);
    } else {
      setFilteredBookings(bookings);
    }
  }, [dateRange, bookings]);

  // Calculate the data to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className={classes.heading}>
        <h2>Dashboard</h2>
        <DatePickerWithRange
          className="ml-4"
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </div>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="text-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              {bookingGrowthPercentage > 0 ? '+' : ''}{bookingGrowthPercentage}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="text-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Monthly Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyBookings}</div>
          </CardContent>
        </Card>

        <Card className="text-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {totalUserGrowthPercentage > 0 ? '+' : ''}{totalUserGrowthPercentage}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="text-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Unique Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueUsers}</div>
            <p className="text-xs text-muted-foreground">
              {uniqueUserGrowthPercentage > 0 ? '+' : ''}{uniqueUserGrowthPercentage}% from last month
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="border-primary grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <div>
          <DataTable
            data={currentBookings}
            itemsPerPage={itemsPerPage}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  );
}
