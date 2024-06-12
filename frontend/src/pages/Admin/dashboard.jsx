import React, { useState, useEffect } from "react";
import classes from "./dashboard.module.css";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getAll, getBookingCountByMonth, getTotalUserCount, getTotalUserCountByMonth, getUniqueUserCount, getUniqueUserCountByMonth } from "../../bookingService";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import { DataTable } from "@/components/ui/DataTable";
import { TARGET_CARD_LENGTH } from "./Constants";
import RecentBookings from "./RecentBookings";
import Chart from "@/components/ui/charts"; // Updated import

export default function Dashboard() {
  const [totalBookings, setTotalBookings] = useState(0); //State for total bookings
  const [monthlyBookings, setMonthlyBookings] = useState(0); // State for monthly bookings
  const [totalUsers, setTotalUsers] = useState(0);
  const [uniqueUsers, setUniqueUsers] = useState(0);
  const [bookingGrowthPercentage, setBookingGrowthPercentage] = useState(0);
  const [totalUserGrowthPercentage, setTotalUserGrowthPercentage] = useState(0);
  const [uniqueUserGrowthPercentage, setUniqueUserGrowthPercentage] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [popularServices, setPopularServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recentPage, setRecentPage] = useState(1);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0); // State for monthly revenue
  const itemsPerPage = 10;
  const recentItemsPerPage = 5;
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const bookingsData = await getAll();
        setBookings(bookingsData); // Set the booking details
        setFilteredBookings(bookingsData); // Set the filtered bookings
        setRecentBookings(bookingsData.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))); // Set the recent bookings sorted by creation date
        setTotalBookings(bookingsData.length); // Set the total number of bookings

        // Calculate popular services
        const serviceCount = bookingsData.reduce((acc, booking) => {
          acc[booking.service] = (acc[booking.service] || 0) + 1;
          return acc;
        }, {});

        const popularServicesData = Object.entries(serviceCount).map(([name, value]) => ({ name, value }));
        setPopularServices(popularServicesData); // Set the popular services

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

        // Calculate monthly revenue only for completed bookings
        const currentMonthRevenue = bookingsData
          .filter(booking => {
            const bookingDate = new Date(booking.date);
            return booking.status === 'completed' && bookingDate.getMonth() + 1 === currentMonth && bookingDate.getFullYear() === currentYear;
          })
          .reduce((acc, booking) => acc + booking.price, 0);

        setMonthlyRevenue(currentMonthRevenue); // Set the monthly revenue
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

   // Calculate the recent bookings to display on the current page
   const recentStartIndex = (recentPage - 1) * recentItemsPerPage;
   const recentEndIndex = recentStartIndex + recentItemsPerPage;
   const currentRecentBookings = recentBookings.slice(recentStartIndex, recentEndIndex);
 
   // Calculate the total number of pages for recent bookings
   const recentTotalPages = Math.ceil(recentBookings.length / recentItemsPerPage);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  
  const handleRecentPageChange = (page) => {
    setRecentPage(page);
  };

  return (
    <div>
      <div className="flex font-bold">
        <h1>Dashboard</h1>
      </div>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="text-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-slate-50">
              {bookingGrowthPercentage > 0 ? '+' : ''}{bookingGrowthPercentage}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="text-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">
              Monthly Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyBookings}</div>
          </CardContent>
        </Card>

        <Card className="text-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">
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
            <CardTitle className="text-2xl font-bold">
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


      <section className="border-primary grid gap-4 md:grid-cols-1 lg:grid-cols-2 my-10">   

        <Card className="bg-transparent">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-small">
              Recent Bookings
            </CardTitle>
            <CardDescription>
              You have New Bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentBookings
              data={currentRecentBookings}
              itemsPerPage={recentItemsPerPage}
              totalPages={recentTotalPages}
              currentPage={recentPage}
              onPageChange={handleRecentPageChange}
            />
          </CardContent>
        </Card>

        <section className="border-primary grid gap-4 md:grid-cols-1 lg:grid-cols-2 lg:grid-rows-2">
          <Card className="bg-transparent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">
                Popular Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Chart data={popularServices} />
            </CardContent>
          </Card>

          <Card className="bg-transparent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-2xl font-bold">
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">You made ${monthlyRevenue} this month</div> {/* Display monthly revenue */}
            </CardContent>
          </Card>  

          <Card className="bg-transparent lg:col-span-2 lg:row-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-2xl font-bold">
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              
            </CardContent>
          </Card>        
        </section>

        
      </section>
    </div>
  );
}
